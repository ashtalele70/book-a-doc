import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Rating from "react-rating";
import starempty from "./images/star-empty.png";
import starfull from "./images/star-full.png";
import { firestore } from "../firebase";
import { useAuth } from "../auth";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  IonButton,
  IonHeader,
  IonLabel,
  IonToolbar,
  IonTitle,
  IonPage,
  IonTextarea,
  IonRow,
  IonGrid,
  IonCol,
} from "@ionic/react";
import "./styleSheet.css";
import axios from "axios";
import { rooturl } from "../config";

const PatientFeedback: React.FC = (): any => {
  const { userId } = useAuth();
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState(3);
  const history = useHistory();

  function handleSaveDetails() {
    const userData = {
      userId: sessionStorage.getItem("doctorID"),
      date: new Date(),
      patientID: userId,
      review: comments,
      rating: rating,
    };
    axios.post(rooturl + "/addFeedback", userData).then((res) => {
      if (res.status === 200) {
        console.log("Saved:");
        history.push("/payment");
      }
    });
  }
  return (
    <IonPage>
      <Helmet>
        <meta name="robots" content="noindex"></meta>
      </Helmet>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="warning">How was your visit?</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonGrid id="feedback">
        <IonRow>
          <IonCol>
            <IonLabel position="stacked">
              How would you rate this doctor?
            </IonLabel>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <Rating
              emptySymbol={<img src={starempty} className="icon" />}
              fullSymbol={<img src={starfull} className="icon" />}
              initialRating={rating}
              onChange={(e) => setRating(e)}
            />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonLabel>Comments:</IonLabel>
            <IonTextarea
              rows={8}
              cols={40}
              clearOnEdit={true}
              value={comments}
              onIonChange={(e) => setComments(e.detail.value!)}
              id="textArea"
            ></IonTextarea>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonButton expand="block" onClick={handleSaveDetails}>
            Submit Feedback
          </IonButton>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
};

export default PatientFeedback;
