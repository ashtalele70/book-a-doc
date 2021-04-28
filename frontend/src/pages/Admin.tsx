import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import Rating from "react-rating";
import starempty from "./images/star-empty.png";
import starfull from "./images/star-full.png";
import { firestore } from "../firebase";
import { useAuth } from "../auth";
import moment from "moment";
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

    var entryData = [...entry];
    entryData.splice(key, 1);
    setEntry(entryData);
  }

  const list = Object.keys(entry).map((key, value) => {
    return (
      <IonRow>
        <IonCol size="2">
          Dr. {entry[key].info && entry[key].info.firstname}{" "}
          {entry[key].info && entry[key].info.lastname}
        </IonCol>
        <IonCol size="2">
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
        <IonCol size="2">
          <details>
            <summary>show</summary>

            <ul>
              {entry[key].info &&
                entry[key].info.educations.map((row, index) => <li>{row} </li>)}
            </ul>
          </details>
        </IonCol>
        <IonCol size="1">
          <mark>{entry[key].info && entry[key].info.npiNumber}</mark>
        </IonCol>
        <IonCol size="1.5">
          <IonButton id={entry[key].id} onClick={() => handleApprove(key)}>
            Approve
          </IonButton>
        </IonCol>
        <IonCol size="1.5">
          <IonButton id={entry[key].id} onClick={() => handleReject(key)}>
            Reject
          </IonButton>
        </IonCol>
      </IonRow>
    );
  });
  return (
    <React.Fragment>
      <header>
        <h3 style={{ color: "#2dd36f", fontWeight: 600 }}>Book-a-Doc</h3>
      </header>
      <IonItem>
        <IonToolbar>
          <IonTitle color="primary">{entry && entry.length} results</IonTitle>
        </IonToolbar>
      </IonItem>
      <IonGrid>
        <strong>
          <IonRow>
            <IonCol size="2">
              <IonLabel>Doctor's Name</IonLabel>
            </IonCol>
            <IonCol size="2">
              <IonLabel>Specialities</IonLabel>
            </IonCol>
            <IonCol size="2">
              <IonLabel>Education</IonLabel>
            </IonCol>
            <IonCol size="1">
              <IonLabel>Npi number</IonLabel>
            </IonCol>
          </IonRow>
        </strong>

        {list}
      </IonGrid>
    </React.Fragment>
  );
};

export default Admin;
