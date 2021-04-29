import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { firestore } from "../firebase";
import emailjs from "emailjs-com";
import { useHistory } from "react-router-dom";
import {
  heart,
  chevronBackOutline as back,
  chevronForwardOutline as front,
} from "ionicons/icons";
import {
  IonButton,
  IonLabel,
  IonToolbar,
  IonTitle,
  IonItem,
  IonRow,
  IonGrid,
  IonCol,
  IonPage,
  IonHeader,
  IonContent,
} from "@ionic/react";
import "./styleSheet.css";
type props = {
  doctorInfo: any[];
  timeSlotInfo: any[];
  appointmentInfo: any[];
};

const Admin: React.FC = (): any => {
  // const {doctorInfo, timeSlotInfo} = props;
  const [entry, setEntry] = useState([]);

  useEffect(() => {
    firestore
      .collection("doctors")
      //.where("isVerified", "==","1" )
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          let doctorInfo = {
            id: doc.id,
            info: doc.data(),
          };
          setEntry((entry) => [...entry, doctorInfo]);
        });
      });
  }, []);

  function handleApprove(key) {
    firestore
      .collection("doctors")
      .doc(entry[key].id)
      .update({
        isVerified: "2",
      })
      .then(() => {
        var entryData = [...entry];
        entryData.splice(key, 1);
        setEntry(entryData);
        var templateParams = {
          to_email: "testbeta442@gmail.com",
          to_name:
            "Dr." +
            entry[key].info["firstname"] +
            " " +
            entry[key].info["lastname"],
          message: "Email verified.",
        };
        emailjs
          .send(
            "service_iwbj3qf",
            "template_clfu2qq",
            templateParams,
            "user_OmceiOldqPYmh6SrleowV"
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );
      })
      .catch((e) => console.log(e));
  }
  function handleReject(key) {
    firestore
      .collection("doctors")
      .doc(entry[key].id)
      .update({
        isVerified: "3",
      })
      .then(() => {
        var entryData = [...entry];
        entryData.splice(key, 1);
        setEntry(entryData);
        var templateParams = {
          to_email: "testbeta442@gmail.com",
          to_name:
            "Dr." +
            entry[key].info["firstname"] +
            " " +
            entry[key].info["lastname"],
          message: "You are rejected.",
        };
        emailjs
          .send(
            "service_iwbj3qf",
            "template_clfu2qq",
            templateParams,
            "user_OmceiOldqPYmh6SrleowV"
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );
      })
      .catch((e) => console.log(e));
  }

  const list = Object.keys(entry).map((key, value) => {
    return (
		<IonItem>
      <IonRow>
        <IonCol >
			
			Dr. {entry[key].info && entry[key].info.firstname}{" "}
          {entry[key].info && entry[key].info.lastname}
			
          
        </IonCol>
        <IonCol >
			<details>
            <summary>show</summary>

            <ul>
              {entry[key].info &&
                entry[key].info.specialties.map((row, index) => (
                  <li>{row} </li>
                ))}
            </ul>
          </details>
          
        </IonCol>
        <IonCol >
			<details>
            <summary>show</summary>

            <ul>
              {entry[key].info &&
                entry[key].info.educations.map((row, index) => <li>{row} </li>)}
            </ul>
          </details>
         
        </IonCol>
        <IonCol >
			<mark>{entry[key].info && entry[key].info.npiNumber}</mark>
			
          
        </IonCol>
        <IonCol >
			<IonButton id={entry[key].id} onClick={() => handleApprove(key)}>
            Approve
          </IonButton>
         
        </IonCol>
        <IonCol >
			
			<IonButton id={entry[key].id} onClick={() => handleReject(key)}>
            Reject
          </IonButton>
        
        </IonCol>
      </IonRow>
	  </IonItem>
    );
  });
  return (
    <IonPage>
      <IonHeader>
        <h3 style={{ color: "#2dd36f", fontWeight: 600 }}>Book-a-Doc</h3>
      </IonHeader>
	  <IonContent>
      <IonItem>
        <IonToolbar>
          <IonTitle color="primary">{entry && entry.length} results</IonTitle>
        </IonToolbar>
      </IonItem>
      <IonGrid>
		  
        <strong>
          <IonRow>
            <IonCol >
              <IonLabel>Doctor's Name</IonLabel>
            </IonCol>
            <IonCol >
              <IonLabel>Specialities</IonLabel>
            </IonCol>
            <IonCol >
              <IonLabel>Education</IonLabel>
            </IonCol>
            <IonCol >
              <IonLabel>Npi number</IonLabel>
            </IonCol>
          </IonRow>
        </strong>

        {list}
      </IonGrid>
	  </IonContent>
	</IonPage>
  );
};

export default Admin;
