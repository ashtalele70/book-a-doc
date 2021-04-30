import {
<<<<<<< HEAD
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../auth";
import { auth, firestore } from "../firebase";
import { Helmet } from "react-helmet";
const RegisterDoctorPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: false });
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
=======
	IonButton,
	IonContent,
	IonHeader,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
	IonLoading,
	IonPage,
	IonText,
	IonTitle,
	IonToolbar,
  } from '@ionic/react';
import axios from 'axios';
  import React, { useState } from 'react';
  import { useHistory } from 'react-router-dom'
  import { useAuth } from '../auth';
import { rooturl } from '../config';
  import { auth, firestore } from '../firebase';
  
  const RegisterDoctorPage: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [status, setStatus] = useState({ loading: false, error: false });
	const [errorMessage, setErrorMessage] = useState('');
	const history = useHistory()
  
	const handleRegister = async () => {
	  try {
		setStatus({ loading: true, error: false });
		const credential = await auth.createUserWithEmailAndPassword(email, password);
		console.log('credential:', credential);

		const userData = { email, isPatient: false, credential, isVerified: "1"};
		axios.post(rooturl + '/registerDoctor', userData)
		.then(res => {
			if(res.status === 200) {
				console.log('Saved:');
				history.push('/doctorProfile')
			}
		})
>>>>>>> 71975dc600cae41f7319558d0e85d18649cb67ef

  const handleRegister = async () => {
    try {
      setStatus({ loading: true, error: false });
      const credential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log("credential:", credential);
      const usersRef = firestore.collection("users");
      const userData = { email, isPatient: false, isVerified: "1" };
      await usersRef.doc(credential?.user?.uid).set(userData);
      console.log("Saved:");
      history.push("/doctorProfile");
    } catch (error) {
      setStatus({ loading: false, error: true });
      setErrorMessage(error.message);
      console.log("error:", error);
    }
  };

  // if (loggedIn) {
  //   return <Redirect to="/home" />;
  // }
  return (
    <IonPage>
      <Helmet>
        <meta name="robots" content="noindex"></meta>
      </Helmet>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="warning">Create an account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(event) => setEmail(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(event) => setPassword(event.detail.value)}
            />
          </IonItem>
        </IonList>
        {status.error && <IonText color="danger">{errorMessage}</IonText>}
        <IonButton expand="block" onClick={handleRegister}>
          Create Account
        </IonButton>
        <IonButton expand="block" fill="clear" routerLink="/login">
          Already have an account?
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RegisterDoctorPage;
