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


    addAscents(file) {
        return this.db.collection(`users/${this.auth.currentUser.uid}/ascents`).add({
            file,
        });
    }

    async getCurrentUserAscents() {
        let ascentsRef = this.db.collection('users').doc(`${this.auth.currentUser.uid}`).collection('ascents');
        await ascentsRef.get().then(token => {return token.docs.map(doc => doc.data())});
        
        // .then(function(doc) {
        //     if(doc.exists) {
        //         console.log("Document data:", doc.data());
        //     } else {
        //         console.log('no doc')
        //     }
        // });
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

    getStorageRef() {
        const storageRef = this.storage.ref();
        return storageRef.child(`usercsvs/${this.auth.currentUser.uid}.csv`);
    }

    // getDataDownloadURL() {
    //     this.getStorageRef.getDownloadURL().then(function(url) {
    //         return (url);
    //       }).catch(function(error) {

    //         switch (error.code) {
    //           case 'storage/object-not-found':
    //             console.log('not found');
    //             break;
          
    //           case 'storage/unauthorized':
    //             console.log('not authorizes');
    //             break;
          
    //           case 'storage/canceled':
    //             console.log('cancelled');
    //             break;
    //           case 'storage/unknown':
    //             console.log('not found');
    //             break;
    //         }
    //       });
    // }
}

export default new Firebase();
