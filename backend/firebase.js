const firebase = require('firebase');
//ashwiniulhas.talele@gmail.com
//Fall@2019
const firebaseConfig = {
	apiKey: <API_KEY>,
	authDomain: <AUTH_DOMAIN>,
	projectId: <PROJECT_ID>,
	storageBucket: <BUCKET>,
	messagingSenderId: <SENDER_ID>,
	appId: <APP_ID>
  };
 

const app = firebase.initializeApp(firebaseConfig);
module.exports.auth = app.auth();
module.exports.firestore = app.firestore();
