import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import 'firebase/firebase-storage';

const config = {
    apiKey: 'AIzaSyD0YqoUlO-xijvUZUgTNxdRfRwapoTKVnw',
    authDomain: 'kitt-da2fa.firebaseapp.com',
    databaseURL: 'https://kitt-da2fa.firebaseio.com',
    projectId: 'kitt-da2fa',
    storageBucket: 'kitt-da2fa.appspot.com',
    messagingSenderId: '739682532519',
    appId: '1:739682532519:web:fc2749cbbaebbdfe1d2f82',
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        return this.auth.signOut();
    }

    async register(name, email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password);
        return this.auth.currentUser.updateProfile({
            displayName: name,
        });
    }

    isInitialized() {
        return new Promise((resolve) => {
            this.auth.onAuthStateChanged(resolve);
        });
    }

    ascentsRef() {
        return this.db.collection(`users/${this.auth.currentUser.uid}/ascents`);
    }

    writeAscents(ascent) {
        return this.db
            .collection(`users/${this.auth.currentUser.uid}/ascents`)
            .add(ascent);
    }

    async getCurrentUserAscents() {
        const ascentsRef = this.ascentsRef();

        const response = await ascentsRef.get().then(function (querySnapshot) {
            let ascents = [];
            querySnapshot.forEach(function (doc) {
                ascents.push(doc.data());
            });
            return ascents;
        });
        return response;
    }

    async getRouteAscents() {
        const ascentsRef = this.ascentsRef().where('isBoulder', '==', false);

        const response = await ascentsRef.get().then(function (querySnapshot) {
            let ascents = [];
            querySnapshot.forEach(function (doc) {
                ascents.push(doc.data());
            });
            return ascents;
        });
        return response;
    }

    async getBoulderAscents() {
        const ascentsRef = this.ascentsRef().where('isBoulder', '==', true);

        const response = await ascentsRef.get().then(function (querySnapshot) {
            let ascents = [];
            querySnapshot.forEach(function (doc) {
                ascents.push(doc.data());
            });
            return ascents;
        });
        return response;
    }

    getCurrentUsername() {
        return this.auth.currentUser && this.auth.currentUser.displayName;
    }

    addQuote(quote) {
        if (!this.auth.currentUser) {
            return alert('Not authorized');
        }

        return this.db.doc(`users_quote/${this.auth.currentUser.uid}`).set({
            quote,
        });
    }

    async getCurrentUserQuote() {
        const quote = await this.db
            .doc(`users_quote/${this.auth.currentUser.uid}`)
            .get();
        return quote.get('quote');
    }
}

export default new Firebase();
