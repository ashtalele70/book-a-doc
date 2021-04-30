import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Rating from "react-rating";
import starempty from "./images/star-empty.png";
import starfull from "./images/star-full.png";
import {
  IonButton,
  IonContent,
  IonLabel,
  IonItem,
  IonItemDivider,
  IonAvatar,
  IonRow,
  IonGrid,
  IonCol,
  IonText,
} from "@ionic/react";
import "./styleSheet.css";
interface IState {
  info?: any[];
}

const DoctorProfile: React.FC = (): any => {
  const [entry, setEntry] = useState([]);
  const location = useLocation<IState>();

  useEffect(() => {
    setEntry(location.state.info);
  });

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
