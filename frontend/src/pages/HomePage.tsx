import {
	IonContent,
	IonItem,
	IonList,
	IonPage,
	IonTitle,
	IonToolbar,
  } from '@ionic/react';
  import React from 'react';
  
  const HomePage: React.FC = () => {
	return (
	  <IonPage>
		  <IonToolbar>
		  	<IonTitle color="success">Book-A-Doc</IonTitle>
		  </IonToolbar>
		  
		<IonContent className="ion-padding">

		</IonContent>
	  </IonPage>
	);
  };
  
  export default HomePage;
  