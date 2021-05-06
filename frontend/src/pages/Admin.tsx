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
  IonRadioGroup,
  IonRadio,
} from "@ionic/react";
import "./styleSheet.css";
import axios from "axios";
import { rooturl } from "../config";
import { useTranslation } from "react-i18next";

const Admin: React.FC = (): any => {
  // const {doctorInfo, timeSlotInfo} = props;
  const { t, i18n } = useTranslation();
  const [entry, setEntry] = useState<any>([]);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    axios.get(rooturl + "/getEntries").then((res) => {
      if (res.status === 200) {
        setEntry(res.data);
      }
    });
  }, []);

  const handleLanguageChange = (newlang) => {
    setLanguage(newlang);
    i18n.changeLanguage(newlang);
  };

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
                {t("Name")}:
              </IonCol>
              <IonCol size="2.4">
                {t('Dr.')} {entry[key].info && t(entry[key].info.firstname + " " + entry[key].info.lastname)}
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol id="heading" size="1.2">
                {t("Specialities")}:
              </IonCol>
              <IonCol size="2.4">
                <details>
                  <summary>{t('show')}</summary>

                  {/* <datalist>
                    {entry[key].info &&
                      entry[key].info.specialties.map((row, index) => (
                        <option>{row} </option>
                      ))}
                  </datalist> */}

                  <ul>
                    {entry[key].info &&
                      entry[key].info.specialties.map((row, index) => (
                        <li>{t(row)} </li>
                      ))}
                  </ul>
                </details>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol id="heading" size="1.2">
                {t("Education")}:
              </IonCol>
              <IonCol size="2.4">
                <details>
                  <summary>{t('show')}</summary>

                  {/* <datalist>
                    {entry[key].info &&
                      entry[key].info.educations.map((row, index) => (
                        <option>{row} </option>
                      ))}
                  </datalist> */}
                  <ul>
                    {entry[key].info &&
                      entry[key].info.educations.map((row, index) => (
                        <li>{t(row)} </li>
                      ))}
                  </ul>
                </details>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol id="heading" size="1.2">
                {t("NPI")}:
              </IonCol>
              <IonCol size="2.4">
                <mark>{entry[key].info && entry[key].info.npiNumber}</mark>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonButton id={entry[key].id} onClick={() => handleApprove(key)}>
                {t("Approve")}
              </IonButton>
              <IonButton id={entry[key].id} onClick={() => handleReject(key)}>
                {t("Reject")}
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
        <h1 style={{ color: "#2dd36f", fontWeight: 600 }}>{t('Book-a-Doc')}</h1>
		<caption style={{ color: "#2dd36f", width: 100 }}>{t('Doctor List')}</caption>
        <IonTitle color="primary">{entry && entry.length} {t('results')}</IonTitle>
        <IonRadioGroup value={language} onIonChange={e => handleLanguageChange(e.detail.value)}>
                <IonRow>
                  <IonCol>
                    <IonLabel>
                        {t('Select Language')}
                    </IonLabel>
                  </IonCol>

                  <IonCol>
                    <IonItem>
                        <IonLabel>{t('English')}</IonLabel>
                        <IonRadio value="en" />
                    </IonItem>
                  </IonCol>

                  <IonCol>
                    <IonItem>
                        <IonLabel>{t('Hindi')}</IonLabel>
                        <IonRadio value="hin" />
                    </IonItem>
                  </IonCol>
                  </IonRow>
              </IonRadioGroup>
      </IonHeader>

      <IonContent>{list}</IonContent>
    </IonPage>
  );
};

export default Admin;
