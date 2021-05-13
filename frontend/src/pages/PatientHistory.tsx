import {
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonRow,
  IonCol,
  IonCard,
  IonHeader,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonToast
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { useAuth } from "../auth";
import { sendEmail } from "../data/email";
import { frontendurl } from "../config";

const PatientHistory: React.FC = () => {
  const { userId } = useAuth();
  const [patientInfo, setPatientInfo] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    let info = [];
    const func = async () => {
      const summaryRef = await firestore
        .collection("doctors/" + userId + "/summary")
        .get();
      if (summaryRef?.docs?.length == 0) setShowMessage(true);
      summaryRef.forEach((doc) => {
        let data = doc.data();
        info.push(data);
      });

      setPatientInfo(info);
    };

    func();
  }, []);

  const handleClick = async (patientInfo) => {
    let status = await sendEmail(
      patientInfo.name,
      "How are you feeling after your last visit? Please schedule a follow-up appointment with Dr. " +
        sessionStorage.getItem("firstname") +
        " " +
        sessionStorage.getItem("lastname") +
        " at the link here: " +
        frontendurl
    );
    if(status) {
      setAlertMessage(status);
      setShowAlert(true);
    }
  };

  let list = patientInfo.map((info) => {
    return (
      <IonCol size="2">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{info.name}</IonCardTitle>
            <IonCardSubtitle>Condition: {info.condition}</IonCardSubtitle>
            <IonButton color="primary" onClick={() => handleClick(info)}>
              Follow Up
            </IonButton>
          </IonCardHeader>

          <IonCardContent>{info.notes}</IonCardContent>
        </IonCard>
      </IonCol>
    );
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="success" className="ion-float-left">
            Book-A-Doc
          </IonTitle>
          <IonTitle color="success" className="ion-float-right">
            Hello, {sessionStorage.getItem("firstname")}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      {showMessage && (
        <IonContent>
          <IonText color="warning" className="ion-text-center">
            <h4>You have no patients!!!</h4>
          </IonText>
        </IonContent>
      )}
      {!showMessage && (
        <IonContent>
          <IonText color="warning" className="ion-text-center">
            <h4>Patient History</h4>
          </IonText>
          <IonRow className="ion-justify-content-center">{list}</IonRow>
          <IonToast
              isOpen={showAlert}
              onDidDismiss={() => setShowAlert(false)}
              message={alertMessage}
              color={alertMessage == 'Success' ? 'success' : 'danger'}
              duration={1000}
          />
        </IonContent>
      )}
    </IonPage>
  );
};

export default PatientHistory;
