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
    IonCardContent,
    IonButton
  } from "@ionic/react";
  import React, { useEffect, useState } from "react";
  import { firestore } from "../firebase";
  import { useAuth } from '../auth';
  import { sendEmail } from "../data/email";
  import { rooturl } from "../config";
  
  const PatientHistory: React.FC = () => {
    const { userId } = useAuth();
    const [patientInfo, setPatientInfo] = useState([]);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        let info = [];
        const func = async () => {
            const summaryRef = await firestore.collection("doctors/" + userId + "/summary").get();
            if(summaryRef?.docs?.length == 0) setShowMessage(true);
            summaryRef.forEach(doc => {
                let data = doc.data();
                info.push(data);
            });

            setPatientInfo(info);
        };

        func();

    }, []);

    const handleClick = (patientInfo) => {
        sendEmail(
            patientInfo.name,
			"How are you feeling after your last visit? Please schedule a follow-up appointment with Dr. " + sessionStorage.getItem("firstname") + " " + sessionStorage.getItem("lastname") + " at the link here: " 
            + rooturl)
    }

    let list = patientInfo.map(info => {
        return <IonCol size="2">
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>{info.name}</IonCardTitle>
                    <IonCardSubtitle>{info.condition}</IonCardSubtitle>
                    <IonButton color="primary" onClick={() => handleClick(info)}>Follow Up</IonButton>
                </IonCardHeader>

                <IonCardContent>
                    {info.notes}
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
  