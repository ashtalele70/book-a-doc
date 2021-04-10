import {
	IonButton,
	IonContent,
	IonItem,
	IonList,
	IonPage,
	IonTitle,
	IonToolbar,
  } from '@ionic/react';
  import React from 'react';
import { useAuth } from '../auth';
  
  const AppointmentsPage: React.FC = () => {
	const { loggedIn } = useAuth();
	return (
	  <IonPage>
		  <IonToolbar>
		  	<IonTitle color="warning">Appointments</IonTitle>
		  </IonToolbar>
		  {!loggedIn && <IonButton expand="block" fill="clear" routerLink="/login">
			Already have an account?
		  </IonButton>}
		<IonContent className="ion-padding">

		</IonContent>
	  </IonPage>
	);
  };
  
  export default AppointmentsPage;
  