import {
	IonButton,
	IonContent,
	IonHeader,
	IonInput,
	IonItem,
	IonLabel,
	IonGrid,
	IonLoading,
	IonPage,
	IonText,
	IonTitle,
	IonToolbar,
	IonRow,
	IonCol,
  } from '@ionic/react';
  import React, { useEffect, useState } from 'react';
  import { useAuth } from '../auth';
  import { firestore } from '../firebase';
  
  const PatientProfilePage: React.FC = () => {
	const { userId } = useAuth();
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	useEffect(() => {
        // async function getEmail() {
		// 	console.log('userId', userId);
        //     const userRef = firestore.collection('users').doc(userId);

		// 	setEmail("asc@gmail.com")
        // }
        // getEmail();

		const userRef = firestore.collection('users').doc(userId);
		return userRef.onSnapshot((doc) => console.log(doc))
    }, []);

	return (
	  <IonPage>
		<IonHeader>
		  <IonToolbar>
			<IonTitle color="warning">Create an account</IonTitle>
		  </IonToolbar>
		</IonHeader>
		<IonContent className="ion-padding">
		  <IonGrid>
		    <IonRow>
				<IonCol>
					<IonLabel position="stacked">Email</IonLabel>
						<IonInput type="email" value={email} readonly/>
				</IonCol>
			</IonRow>
			<IonRow>
				<IonCol>
					<IonItem>
						<IonLabel position="floating">First Name</IonLabel>
						<IonInput value={firstName}
						onIonChange={(event) => setFirstName(event.detail.value)}
			  			/>
					</IonItem>
				</IonCol>
				<IonCol>
					<IonItem>
						<IonLabel position="floating">Last Name</IonLabel>
						<IonInput value={lastName}
						onIonChange={(event) => setLastName(event.detail.value)}
			  			/>
					</IonItem>
				</IonCol>
				{/* <IonCol>ion-col</IonCol>
				<IonCol>ion-col</IonCol>
				<IonCol>ion-col</IonCol> */}
			</IonRow>
			
			{/* <IonItem>
			  <IonLabel position="stacked">Email</IonLabel>
			  <IonInput type="email" value={email}
				onIonChange={(event) => setEmail(event.detail.value)}
			  />
			</IonItem>
			<IonItem>
			  <IonLabel position="stacked">Password</IonLabel>
			  <IonInput type="password" value={password}
				onIonChange={(event) => setPassword(event.detail.value)}
			  />
			</IonItem> */}
		  </IonGrid>
		  {/* {status.error &&
			<IonText color="danger">{errorMessage}</IonText>
		  } */}
		  {/* <IonButton expand="block" onClick={handleRegister}>
			Create Account
		  </IonButton>
		  <IonButton expand="block" fill="clear" routerLink="/login">
			Already have an account?
		  </IonButton> */}
		  {/* <IonLoading isOpen={status.loading} /> */}
		</IonContent>
	  </IonPage>
	);
  };
  
  export default PatientProfilePage;
  