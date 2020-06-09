const admin = require('firebase-admin');
const serviceAccount = require('../firebase-service-account/workspace-83667-firebase-adminsdk-kg22p-e8f59a7e8a.json');

const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://kitt-da2fa.firebaseio.com',
});

module.exports = firebaseAdmin;
