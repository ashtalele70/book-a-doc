import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import Rating from "react-rating";
import starempty from "./images/star-empty.png";
import starfull from "./images/star-full.png";
import { firestore } from "../firebase";
import {
  IonButton,
  IonIcon,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonPage,
  IonItemDivider,
  IonAvatar,
  IonRow,
  IonGrid,
  IonCol,
  IonCard,
  IonCardContent,
  IonText,
} from "@ionic/react";
import "./styleSheet.css";

const Doctors: React.FC = () => {
  const [entry, setEntry] = useState<any>();
  useEffect(() => {
    firestore
      .collection("doctors")
      .where("doctorId", "==", "1")
      .get()
      .then((snapshot) => {
        const entry = snapshot.docs[0].data();
        //const entry = 1;
        console.log(entry);
        setEntry(entry);
        console.log(entry.doctorName);
        // doc.data() is never undefined for query doc snapshots
      });
  }, []);

  return (
    <IonContent
      scrollEvents={true}
      onIonScrollStart={() => {}}
      onIonScroll={() => {}}
      onIonScrollEnd={() => {}}
    >
      <IonItemDivider color="primary">
        <IonLabel></IonLabel>
      </IonItemDivider>
    </IonContent>
  );
};

export default Doctors;
