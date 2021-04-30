import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Rating from "react-rating";
import starempty from "./images/star-empty.png";
import starfull from "./images/star-full.png";
import { firestore } from "../firebase";
import { Helmet } from "react-helmet";
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
  IonHeader,
} from "@ionic/react";
import "./styleSheet.css";
interface IState {
  info?: any[];
}

const DoctorProfile: React.FC = (): any => {
  const [entry, setEntry] = useState([]);
  const location = useLocation<IState>();

  useEffect(() => {
    console.log("here");
    console.log("kk");
    console.log("jj");
    console.log(location.state.info);

    setEntry(location.state.info);
    console.log(location.state.info);
    // // firestore
    // //   .collection("doctors")
    // //   .where("doctorId", "==", "1")
    // //   .get()
    // //   .then((snapshot) => {
    // //     const entry = snapshot.docs[0].data();
    // //     //const entry = 1;
    // //     console.log(entry);
    // //     setEntry(entry);
    // //     console.log(entry.doctorName);
    // //     // doc.data() is never undefined for query doc snapshots
    //   });
  });

  return (
    <IonContent
      scrollEvents={true}
      onIonScrollStart={() => {}}
      onIonScroll={() => {}}
      onIonScrollEnd={() => {}}
    >
      <Helmet>
        <meta
          name="description"
          content="This page allows users to view doctor's profile and the reviews of other patients."
        />
      </Helmet>
      <IonHeader>
        <h1 style={{ color: "#2dd36f", fontWeight: 600 }}>Book-a-Doc</h1>
      </IonHeader>

      <IonItem>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonAvatar>
                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
              </IonAvatar>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonLabel id="doctor-name">
              Dr. {entry && entry["firstname"]} {entry && entry["lastname"]}, MD
            </IonLabel>
          </IonRow>
          <IonRow>
            <IonLabel id="doctor-title">
              Primary Care Doctor, Family Physician
            </IonLabel>
          </IonRow>
          <IonRow>
            <IonLabel class="grey-label">
              {entry &&
                entry["doctorAddress"] &&
                entry["doctorAddress"]["state"]}
            </IonLabel>
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonItem>
        <IonGrid>
          <IonRow>
            <IonLabel class="heading">Overall Rating</IonLabel>
          </IonRow>

          <IonRow>
            <IonText id="rating">4.75</IonText>
          </IonRow>
          <IonRow>
            <Rating
              emptySymbol={<img src={starempty} className="icon" />}
              fullSymbol={<img src={starfull} className="icon" />}
              initialRating={4.75}
              readonly={true}
            />
          </IonRow>
          <IonRow>
            <IonLabel class="heading">Recent Reviews</IonLabel>
          </IonRow>

          <IonRow>
            <p>
              {entry &&
                entry["doctorRating"] &&
                entry["doctorRating"][0]["reviewComment"]}
            </p>
          </IonRow>
          <IonRow>
            <IonLabel class="grey-label">
              {entry &&
                entry["doctorRating"] &&
                entry["doctorRating"][0]["patientName"]}
              &nbsp;&nbsp;{" "}
              {entry &&
                entry["doctorRating"] &&
                new Date(
                  entry["doctorRating"][0]["date"].seconds * 1000
                ).toLocaleDateString("en-US")}
            </IonLabel>
          </IonRow>
          <IonRow>
            <IonButton size="small" color="light">
              Read more Reviews
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonItem>
        <IonGrid>
          <IonRow>
            <IonLabel class="heading">About Dr. Ramandeep Kaur</IonLabel>
          </IonRow>
          <IonRow>
            <p>{entry && entry["about"]}</p>
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonItem>
        <IonGrid>
          <IonRow>
            <IonLabel class="heading">Education and background</IonLabel>
          </IonRow>
          <IonRow>
            <IonLabel class="sub-heading">Specialities</IonLabel>
          </IonRow>
          {entry &&
            entry["specialties"] &&
            entry["specialties"].map((row, index) => (
              <IonRow class="EBinfor">{row}</IonRow>
            ))}

          <IonRow>
            <IonLabel class="sub-heading">Education and training</IonLabel>
          </IonRow>
          {entry &&
            entry["educations"] &&
            entry["educations"].map((row, index) => (
              <IonRow class="EBinfor">{row}</IonRow>
            ))}

          <IonRow>
            <IonLabel class="sub-heading">Languages Spoken</IonLabel>
          </IonRow>
          {entry &&
            entry["languages"] &&
            entry["languages"].map((row, index) => (
              <IonRow class="EBinfor">{row}</IonRow>
            ))}

          <IonRow>
            <IonLabel class="sub-heading">Provider's gender</IonLabel>
          </IonRow>
          <IonRow class="EBinfor">{entry && entry["gender"]}</IonRow>
          <IonRow>
            <IonLabel class="sub-heading">NPI number</IonLabel>
          </IonRow>
          <IonRow class="EBinfor">{entry && entry["npiNumber"]}</IonRow>
        </IonGrid>
      </IonItem>
      <IonItem>
        <IonGrid>
          <IonLabel class="heading">Patient Reviews</IonLabel>

          {entry &&
            entry["doctorRating"] &&
            entry["doctorRating"].map((row, index) => (
              <IonRow>
                <p>{row.reviewComment}</p>
              </IonRow>
            ))}
        </IonGrid>
      </IonItem>
    </IonContent>
  );
};

export default DoctorProfile;
