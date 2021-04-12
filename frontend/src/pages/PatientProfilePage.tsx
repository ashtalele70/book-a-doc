import {
	IonButton,
	IonContent,
	IonHeader,
	IonInput,
	IonItem,
	IonLabel,
	IonGrid,
	IonPage,
	IonTitle,
	IonToolbar,
	IonRow,
	IonCol,
	IonDatetime,
	IonRadioGroup,
	IonRadio,
  } from '@ionic/react';
  import React, { useEffect, useState } from 'react';
  import { useAuth } from '../auth';
  import { firestore } from '../firebase';
  import { User, toUser } from '../models/user';
  import { useHistory } from 'react-router-dom'
  
  const PatientProfilePage: React.FC = () => {
	const { userId } = useAuth();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [user, setUser] = useState<User>();
	const [date, setDate] = useState('');
	const [gender, setGender] = useState<string>('male');
	const history = useHistory()

	const handleSaveDetails = async () => {
		  firestore.collection('patients').doc(userId).set({
			firstname: firstName,
			lastname: lastName,
			dob: date,
			gender: gender
		  })
		  .then(() =>
		  	history.push('/home'))
		  .catch((e) => console.log(e))
	  };

	useEffect(() => {
		
		firestore.collection('users').doc(userId)
		.get().then((doc) => setUser(toUser(doc)));

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
					<IonInput type="email" value={user?.email} readonly/>
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
						onIonChange={(event) => setLastName(event.detail.value)}/>
					</IonItem>
				</IonCol>
			</IonRow>
			<IonRow>
				<IonCol>
					<IonItem>
						<IonLabel>
							Date of Birth
						</IonLabel>
						<IonDatetime value={date} 
						onIonChange={(event) => setDate(event.detail.value)}/>
					</IonItem>
				</IonCol>
				<IonCol>
					<IonCol>
						<IonRadioGroup value={gender} onIonChange={e => setGender(e.detail.value)}>
							<IonLabel>
								Gender
							</IonLabel>

							<IonItem>
								<IonLabel>Female</IonLabel>
								<IonRadio value="female" />
							</IonItem>

							<IonItem>
								<IonLabel>Male</IonLabel>
								<IonRadio value="male" />
							</IonItem>
						</IonRadioGroup>
					</IonCol>
				</IonCol>
			</IonRow>
		  </IonGrid>
		  <IonButton expand="block" onClick={handleSaveDetails}>
			Save Details
		  </IonButton>
		</IonContent>
	  </IonPage>
	);
  };
  
  export default PatientProfilePage;
  