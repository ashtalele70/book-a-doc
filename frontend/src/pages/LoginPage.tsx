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
const LoginPage: React.FC = () => {
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
    } catch (error) {
      setStatus({ loading: false, error: true });
      setErrorMessage(error.message);
      console.log("error:", error);
    }
  };

  // 	if (loggedIn) {
  // 	  return <Redirect to="/doctorHome" />;
  // 	}
  // 	return (
  // 	  <IonPage>
  // 		<IonHeader>
  // 		  <IonToolbar>
  // 			<IonTitle>Login</IonTitle>
  // 		  </IonToolbar>
  // 		</IonHeader>
  // 		<IonContent className="ion-padding">
  // 		  <IonList>
  // 			<IonItem>
  // 			  <IonLabel position="stacked">Email</IonLabel>
  // 			  <IonInput type="email" value={email}
  // 				onIonChange={(event) => setEmail(event.detail.value)}
  // 			  />
  // 			</IonItem>
  // 			<IonItem>
  // 			  <IonLabel position="stacked">Password</IonLabel>
  // 			  <IonInput type="password" value={password}
  // 				onIonChange={(event) => setPassword(event.detail.value)}
  // 			  />
  // 			</IonItem>
  // 		  </IonList>
  // 		  {status.error &&
  // 			<IonText color="danger">{errorMessage}</IonText>
  // 		  }
  // 		  <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
  // 		  <IonButton expand="block" fill="clear" routerLink="/register">
  // 			Don't have an account?
  // 		  </IonButton>
  // 		  <IonLoading isOpen={status.loading} />
  // 		</IonContent>
  // 	  </IonPage>
  // 	);
  //   };

  if (loggedIn) {
    return <Redirect to="/home" />;
  }
  return (
    <IonPage>
      <Helmet>
        <meta
          name="description"
          content="This page allows patients to Login and schedule appointments with doctors, 
		  meet doctors during the scheduled appointments or instantly talk to a doctor."
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
        <IonButton expand="block" fill="clear" routerLink="/register">
          Don't have an account?
        </IonButton>
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
