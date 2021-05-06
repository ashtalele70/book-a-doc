import {
    IonContent,
    IonPage,
    IonTitle,
    IonToolbar,
    IonText,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent
  } from "@ionic/react";
  import React, { useEffect, useState } from "react";
  import { firestore } from "../firebase";
  import { useAuth } from '../auth';
  import { Chart } from "react-google-charts";
  
  const PatientHistory: React.FC = () => {
    const { userId } = useAuth();
    const [notes, setNotes] = useState([]);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        let notesInfo = [];
        const func = async () => {
            const summaryRef = await firestore.collection("doctors/" + userId + "/summary").get();
            if(summaryRef?.docs?.length == 0) setShowMessage(true);
            summaryRef.forEach(doc => {
                let data = doc.data();
                notesInfo.push(data.notes);
            });

            setNotes(notesInfo);
        };

        func();

    }, []);

    let list = notes.map(note => {
        return <IonCol size="2">
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                    <IonCardTitle>Card Title</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                    {note}
                </IonCardContent>
            </IonCard>
        </IonCol>
    });

    return (
      <IonPage>
        <IonToolbar>
          <IonTitle color="success" className="ion-float-left">Book-A-Doc</IonTitle>
          <IonTitle color="success" className="ion-float-right">Hello, {sessionStorage.getItem('firstname')}</IonTitle>
        </IonToolbar>
        {showMessage && <IonContent><IonText color="warning" className="ion-text-center">
			<h4>You have no patients!!!</h4>
		</IonText></IonContent>}
        {!showMessage && <IonContent>
        <IonText color="warning" className="ion-text-center">
			<h4>Patient History</h4>
		</IonText>
        <IonRow>
            {list}
        </IonRow>
        </IonContent>}
      </IonPage>
    );
  };
  
  export default PatientHistory;
  