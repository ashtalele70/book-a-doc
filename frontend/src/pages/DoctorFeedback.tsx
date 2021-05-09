import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonCol,
  IonTextarea,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../auth";
import { auth, firestore } from "../firebase";

const DoctorFeedback: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [gender, setGender] = useState<string>("female");
  const [age, setAge] = useState("");
  const [condition, setCondition] = useState("");
  const [notes, setNotes] = useState("");
  const [visit, setVisit] = useState("yes");
  const { userId } = useAuth();

  const handleSubmit = async () => {
    const summaryData = { name, gender, age, condition, notes, visit };

    firestore
      .collection("doctors")
      .doc(userId)
      .collection("summary")
      .add(summaryData)
      .then(() => {
        console.log("Document successfully written!");
        history.push("/doctorHome");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

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
      <IonContent className="ion-padding">
        <IonText color="warning" className="ion-text-center">
          <h4>Enter Meeting Summary</h4>
        </IonText>
        <IonList>
          <IonItem>
            <IonLabel>Patient Name</IonLabel>
            <IonInput
              type="text"
              value={name}
              onIonChange={(event) => setName(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonRadioGroup
              value={gender}
              onIonChange={(e) => setGender(e.detail.value)}
            >
              <IonRow>
                <IonCol>
                  <IonLabel>Gender</IonLabel>
                </IonCol>

                <IonCol>
                  <IonItem>
                    <IonLabel>Female</IonLabel>
                    <IonRadio value="female" />
                  </IonItem>
                </IonCol>

                <IonCol>
                  <IonItem>
                    <IonLabel>Male</IonLabel>
                    <IonRadio value="male" />
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonRadioGroup>
          </IonItem>
          <IonItem>
            <IonLabel>Age</IonLabel>
            <IonInput
              type="text"
              value={age}
              onIonChange={(event) => setAge(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel>Condition</IonLabel>
            <IonInput
              type="text"
              value={condition}
              onIonChange={(event) => setCondition(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel>Notes</IonLabel>
            <IonTextarea
              value={notes}
              onIonChange={(e) => setNotes(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
          <IonItem>
            <IonRadioGroup
              value={visit}
              onIonChange={(e) => setVisit(e.detail.value)}
            >
              <IonRow>
                <IonCol>
                  <IonLabel>First visit?</IonLabel>
                </IonCol>

                <IonCol>
                  <IonItem>
                    <IonLabel>Yes</IonLabel>
                    <IonRadio value="yes" />
                  </IonItem>
                </IonCol>

                <IonCol>
                  <IonItem>
                    <IonLabel>No</IonLabel>
                    <IonRadio value="no" />
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonRadioGroup>
          </IonItem>
        </IonList>
        {/* {status.error &&
			<IonText color="danger">{errorMessage}</IonText>
		  } */}
        <IonButton expand="block" onClick={handleSubmit}>
          Submit
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default DoctorFeedback;
