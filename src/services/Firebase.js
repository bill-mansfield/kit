import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import 'firebase/firebase-storage';
import * as Constants from '../utils/Constants';

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

    goalRef() {
        return this.db.collection(`users/${this.auth.currentUser.uid}/goals`);
    }

    async writeGoal(goal) {
        return await this.db
            .collection(`users/${this.auth.currentUser.uid}/goals`)
            .add(goal);
    }

    async getAllGoals() {
        const goalRef = this.goalRef();
        return await goalRef.get().then(function (querySnapshot) {
            let goals = [];

            querySnapshot.forEach(function (doc) {
                goals.push(doc.data());
            });
            return goals;
        });
    }

    ascentsRef() {
        return this.db.collection(
            `users/${this.auth.currentUser.uid}/ascents`,
        );
    }

    successfulAscentsRef() {
        return this.ascentsRef().where(
            'ascentType',
            'in',
            Constants.SUCCESSFUL_TICK_TYPE,
        );
    }

    async writeAscents(ascent) {
        return await this.db
            .collection(`users/${this.auth.currentUser.uid}/ascents`)
            .add(ascent);
    }

    async getAllAscents() {
        const ascentsRef = this.ascentsRef();
        return await this.getRequestAscents(ascentsRef);
    }

    async getRouteAscents() {
        const ascentsRef = this.ascentsRef().where('isBoulder', '==', false);
        return await this.getRequestAscents(ascentsRef);
    }

    async getBoulderAscents() {
        const ascentsRef = this.ascentsRef().where('isBoulder', '==', true);
        return await this.getRequestAscents(ascentsRef);
    }

    async getAscentsOfTickType(tickType) {
        const ascentsRef = this.ascentsRef()
            .where('ascentType', '==', tickType)
            .where('isBoulder', '==', false);
        return await this.getRequestAscents(ascentsRef);
    }

    async getBoulderAscentsOfTickType(tickType) {
        const ascentsRef = this.ascentsRef()
            .where('ascentType', '==', tickType)
            .where('isBoulder', '==', true);
        return await this.getRequestAscents(ascentsRef);
    }

    async getSuccessfulAscents() {
        const ascentsRef = this.successfulAscentsRef();
        return await this.getRequestAscents(ascentsRef);
    }

    async getSuccessfulBoulderAscents() {
        const ascentsRef = this.ascentsRef()
            .where('ascentType', 'in', Constants.SUCCESSFUL_TICK_TYPE)
            .where('isBoulder', '==', true);
        return await this.getRequestAscents(ascentsRef);
    }

    async getRequestAscents(ref) {
        const response = await ref.get().then(function (querySnapshot) {
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
}

export default new Firebase();
