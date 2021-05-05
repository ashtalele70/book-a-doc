import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
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
import axios from "axios";
import { rooturl } from "../config";

const Admin: React.FC = (): any => {
  // const {doctorInfo, timeSlotInfo} = props;
  const [entry, setEntry] = useState<any>([]);

  useEffect(() => {
    axios.get(rooturl + "/getEntries").then((res) => {
      if (res.status === 200) {
        setEntry(res.data);
      }
    });
  }, []);

  function handleApprove(key) {
    axios.post(rooturl + "/approve", { id: entry[key].id }).then((res) => {
      if (res.status === 200) {
        var templateParams = {
          to_email: "testbeta442@gmail.com",
          to_name:
            "Dr." +
            entry[key].info["firstname"] +
            " " +
            entry[key].info["lastname"],
          message: "Your application as doctor is verified.",
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

        var entryData = [...entry];
        entryData.splice(key, 1);
        setEntry(entryData);
      }
    });
  }
  function handleReject(key) {
    axios.post(rooturl + "/reject", { id: entry[key].id }).then((res) => {
      if (res.status === 200) {
        var templateParams = {
          to_email: "testbeta442@gmail.com",
          to_name:
            "Dr." +
            entry[key].info["firstname"] +
            " " +
            entry[key].info["lastname"],
          message: "You application as doctor is rejected.",
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
        var entryData = [...entry];
        entryData.splice(key, 1);
        setEntry(entryData);
      }
    });
  }

  const list = Object.keys(entry).map((key, value) => {
    return (
      <IonItem id="admin">
        <Helmet>
          <meta name="robots" content="noindex"></meta>
        </Helmet>
        <IonGrid>
          <IonCol>
            <IonRow>
              <IonCol id="heading" size="1.2">
                Name:
              </IonCol>
              <IonCol size="2.4">
                Dr. {entry[key].info && entry[key].info.firstname}{" "}
                {entry[key].info && entry[key].info.lastname}
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol id="heading" size="1.2">
                Specialities:
              </IonCol>
              <IonCol size="2.4">
                <details>
                  <summary>show</summary>

                  <datalist>
                    {entry[key].info &&
                      entry[key].info.specialties.map((row, index) => (
                        <option>{row} </option>
                      ))}
                  </datalist>
                </details>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol id="heading" size="1.2">
                Education:
              </IonCol>
              <IonCol size="2.4">
                <details>
                  <summary>show</summary>

                  <datalist>
                    {entry[key].info &&
                      entry[key].info.educations.map((row, index) => (
                        <option>{row} </option>
                      ))}
                  </datalist>
                </details>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol id="heading" size="1.2">
                NPI:
              </IonCol>
              <IonCol size="2.4">
                <mark>{entry[key].info && entry[key].info.npiNumber}</mark>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonButton id={entry[key].id} onClick={() => handleApprove(key)}>
                Approve
              </IonButton>
              <IonButton id={entry[key].id} onClick={() => handleReject(key)}>
                Reject
              </IonButton>
            </IonRow>
          </IonCol>
        </IonGrid>
      </IonItem>
    );
  });
  return (
    <IonPage>
      <IonHeader>
        <h1 style={{ color: "#2dd36f", fontWeight: 600 }}>Book-a-Doc</h1>
        <caption style={{ color: "#2dd36f", width: 100 }}>Doctor List</caption>
        <IonTitle color="primary">{entry && entry.length} results</IonTitle>
      </IonHeader>

      <IonContent>{list}</IonContent>
    </IonPage>
  );
};

export default Admin;
