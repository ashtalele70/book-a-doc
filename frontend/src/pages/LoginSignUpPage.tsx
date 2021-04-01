import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
  } from '@ionic/react';
  import React from 'react';
  
  const LoginSignUpPage: React.FC = () => {
	return (
	  <IonPage>
		  <IonToolbar>
		  	<IonTitle color="warning">My account</IonTitle>
		  </IonToolbar>
		  
		<IonContent className="ion-padding">
		
		</IonContent>
	  </IonPage>
	);
  };
  
  export default LoginSignUpPage;
  