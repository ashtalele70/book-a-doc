import {
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
import { Redirect } from "react-router";
import { useAuth } from "../auth";
import { auth } from "../firebase";
import { Helmet } from "react-helmet";
import axios from "axios";
import { rooturl } from "../config";

const LoginDoctorPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: false });
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      setStatus({ loading: true, error: false });
      const credential = await auth.signInWithEmailAndPassword(email, password);
      console.log("credential:", credential);
	  let userData = new URLSearchParams();
	  userData.set("id", credential?.user?.uid);
	axios.get(rooturl + "/getUser?" + userData.toString()).then((res) => {
	if (res.status === 200) {

		if(res.data.isPatient && !res.data.isAdmin) {
			//patient
			let userData = new URLSearchParams();
			userData.set("id", credential?.user?.uid);
			axios.get(rooturl + "/getPatient?" + userData.toString()).then((res) => {
			  if (res.status === 200) {
				sessionStorage.setItem("firstname", res.data.firstname);
				sessionStorage.setItem("lastname", res.data.lastname);
			  }
			});	
	
		} else if(!res.data.isPatient && !res.data.isAdmin){
			//doctor
			let userData = new URLSearchParams();
			userData.set("id", credential?.user?.uid);
			axios.get(rooturl + "/getDoctor?" + userData.toString()).then((res) => {
			  if (res.status === 200) {
        sessionStorage.setItem("firstname", res.data.firstname);
				sessionStorage.setItem("lastname", res.data.lastname);
			  }
			});	
		}
	}
	});
    } catch (error) {
      setStatus({ loading: false, error: true });
      setErrorMessage(error.message);
      console.log("error:", error);
    }
  };

  if (loggedIn) {
    return <Redirect to="/home" />;
  }
  return (
    <IonPage>
      <Helmet>
        <meta
          name="description"
          content="This page allows doctors to Login and view patient information and speak to patients, "
        />
      </Helmet>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
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
        <IonButton expand="block" onClick={handleLogin}>
          Login
        </IonButton>
        <IonButton expand="block" fill="clear" routerLink="/registerDoctor">
          Don't have an account?
        </IonButton>
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default LoginDoctorPage;
