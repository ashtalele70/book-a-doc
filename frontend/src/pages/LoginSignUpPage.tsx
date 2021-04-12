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
  import { pencilSharp, personCircle } from 'ionicons/icons';
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
					<IonLabel>Login</IonLabel>
					<IonButton color="primary" className="ion-margin" routerLink="/login">Patients</IonButton>
    				<IonButton color="secondary" className="ion-margin" routerLink="/loginDoctor">Doctors</IonButton>
				</IonItem>
				<IonItem>
					<IonIcon icon={personCircle} />
					<IonLabel>SignUp</IonLabel>
					<IonButton color="primary" className="ion-margin" routerLink="/register">Patients</IonButton>
    				<IonButton color="secondary" className="ion-margin" routerLink="/registerDoctor">Doctors</IonButton>
				</IonItem>
			</IonList>		
		</IonContent>
	  </IonPage>
	);
  }
  
  export default LoginSignUpPage;
  