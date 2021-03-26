import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
	apiKey: "AIzaSyDmDxh0c8ZRkdVWEXy2o6OfCjz6HfhMk7A",
	authDomain: "cmpe280-book-doc.firebaseapp.com",
	projectId: "cmpe280-book-doc",
	storageBucket: "cmpe280-book-doc.appspot.com",
	messagingSenderId: "716530406390",
	appId: "1:716530406390:web:560c7dbc5fc0822de7add7"
  };
  
// uncomment when the 300 USD are used from 1st account

// const firebaseConfig = {
// 	apiKey: "AIzaSyDbqB_NcBGaccL28L4vMbOWAoEgWG3J6c8",
// 	authDomain: "cmpe280-doc.firebaseapp.com",
// 	projectId: "cmpe280-doc",
// 	storageBucket: "cmpe280-doc.appspot.com",
// 	messagingSenderId: "485443750362",
// 	appId: "1:485443750362:web:80188501b3b5242a1ed8e3"
//   };

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();
