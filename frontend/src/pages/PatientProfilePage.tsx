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
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { firestore } from "../firebase";
import { User, toUser } from "../models/user";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { rooturl } from "../config";
import { Helmet } from "react-helmet";

const PatientProfilePage: React.FC = () => {
  const { userId } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState<User>();
  const [date, setDate] = useState("");
  const [gender, setGender] = useState<string>("male");
  const history = useHistory();

  const validate = async () => {
	if(firstName == "") {
		alert("Enter first name")
		return false;
	}

	if(lastName == "") {
		alert("Enter last name")
		return false;
	}

	if(date == "") {
		alert("Enter date of birth")
		return false;
	}

	if(gender == "") {
		alert("Enter gender")
		return false;
	}

	return true;

  }
  const handleSaveDetails = async () => {
	if(await validate()) {
    const userData = {
      userId: userId,
      firstname: firstName,
      lastname: lastName,
      dob: date,
      gender: gender,
    };

    axios
      .post(rooturl + "/patientDetails", userData)
      .then((res) => {
        if (res.status === 200) {
          history.push("/home");
        }
      })
      .catch((e) => console.log(e));
	}
  };
  /*
  const handleSaveDetails = async () => {
    firestore
      .collection("patients")
      .doc(userId)
      .set({
        firstname: firstName,
        lastname: lastName,
        dob: date,
        gender: gender,
      })
      .then(() => history.push("/home"))
      .catch((e) => console.log(e));
  };
*/
  useEffect(() => {
    let userData = new URLSearchParams();
    userData.set("id", userId);

    axios.get(rooturl + "/getUser?" + userData.toString()).then((res) => {
      if (res.status === 200) {
        // console.log(res);
        setUser(toUser(res.data));
      }
    });
  }, []);

  return (
    <IonPage>
      <Helmet>
        <meta name="robots" content="noindex"></meta>
      </Helmet>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="warning" className="ion-float-left">Create an account</IonTitle>
          <IonTitle color="success" className="ion-float-right">Hello, {sessionStorage.getItem('firstname')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput type="email" value={user?.email} readonly />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="fixed">First Name</IonLabel>
                <IonInput
                  value={firstName}
                  onIonChange={(event) => setFirstName(event.detail.value)}
                />
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="fixed">Last Name</IonLabel>
                <IonInput
                  value={lastName}
                  onIonChange={(event) => setLastName(event.detail.value)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Date of Birth</IonLabel>
                <IonDatetime
                  value={date}
                  onIonChange={(event) => setDate(event.detail.value)}
                />
              </IonItem>
            </IonCol>
            <IonCol>
              <IonCol>
                <IonRadioGroup
                  value={gender}
                  onIonChange={(e) => setGender(e.detail.value)}
                >
                  <IonLabel>Gender</IonLabel>

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
