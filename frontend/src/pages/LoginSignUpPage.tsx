import {
	IonButton,
	IonContent,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonPage,
	IonTitle,
	IonToolbar,
  } from '@ionic/react';
  import { pencilSharp } from 'ionicons/icons';
  import React from 'react';
  
  const LoginSignUpPage: React.FC = () => {
	return (
	  <IonPage>
		  <IonToolbar>
		  	<IonTitle color="warning">My account</IonTitle>
		  </IonToolbar>
		  
		<IonContent className="ion-padding">
			<IonList>
				<IonItem>
					<IonIcon icon={pencilSharp} />
					<IonLabel>Login/ Sign Up</IonLabel>
					<IonButton color="primary" className="ion-margin" routerLink="/login">Patients</IonButton>
    				<IonButton color="secondary" className="ion-margin" routerLink="/loginDoctor">Doctors</IonButton>
				</IonItem>
			</IonList>		
		</IonContent>
	  </IonPage>
	);
  };
  
  export default LoginSignUpPage;
  