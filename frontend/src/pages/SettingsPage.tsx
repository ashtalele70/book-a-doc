import {
	IonButton,
	IonContent,
	IonHeader,
	IonIcon,
	IonLabel,
	IonPage,
	IonTitle,
	IonToolbar,
  } from '@ionic/react';
import { logOut } from 'ionicons/icons';
  import React from 'react';
  import { useHistory } from "react-router-dom";
  import { auth } from '../firebase';
  
  const SettingsPage: React.FC = () => {
	let history = useHistory();
	const logout = () => {
		auth.signOut();
		history.push("/home");
	}
	
	return (
	  <IonPage>
		<IonHeader>
		  <IonToolbar>
			<IonTitle>Settings</IonTitle>
		  </IonToolbar>
		</IonHeader>
		<IonContent className="ion-padding">
		  <IonButton color="medium" expand="block"
			onClick={() => logout()}>

			<IonIcon icon={logOut} />
			<IonLabel>Logout</IonLabel>
		  </IonButton>
		</IonContent>
	  </IonPage>
	);
  };
  
  export default SettingsPage;
  