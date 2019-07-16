import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

//this config is being used for both development and production environment. Though, it is a best practice creating a second project and have two configs: one for production (prodConfig) and another for development (devConfig), so you choose the config based on the environment.

const config = {
  apiKey: "AIzaSyDq9pr3L6F6OqpB3dxIjgKz8-Y4e77vJSw",
  authDomain: "oioioi-8aa5b.firebaseapp.com",
  databaseURL: "https://oioioi-8aa5b.firebaseio.com",
  projectId: "oioioi-8aa5b",
  storageBucket: "oioioi-8aa5b.appspot.com",
  messagingSenderId: "743144200050",
  appId: "1:743144200050:web:1dc1cea5c58ec097"

};

if (!firebase.apps.length) {
  //initializing with the config object
  firebase.initializeApp(config);
}

//separting database API and authentication
const db = firebase.database();
const auth = firebase.auth();

const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, auth, GoogleAuthProvider };
