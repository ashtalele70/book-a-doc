import {
  IonContent,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import data from "../data/conditionSpecialtyMap";
import Doctors from "./Doctors";
import { Helmet } from "react-helmet";

const HomePage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [doctorInfo, setDoctorInfo] = useState([]);
  const [timeSlotInfo, setTimeslotInfo] = useState([]);
  const [appointmentInfo, setAppointmentInfo] = useState([]);

  const onChangeHandler = (e) => {
    setSearchText(e.detail.value);
  };

  const onClickHandler = async () => {
    const specialties = data[searchText];
    let doctors = [],
      times = [],
      appointments = [];

    const doctorRef = await firestore.collection("doctors").get();
    doctorRef.forEach((doc) => {
      if (
        doc
          .data()
          .specialties.some((specialty) => specialties.indexOf(specialty) >= 0)
      ) {
        let doctor = {
          id: doc.id,
          info: doc.data(),
        };
        doctors.push(doctor);
      }
    });

    for (let doctor of doctors) {
      const timeslotRef = await firestore
        .collection("doctors/" + doctor.id + "/timeslots")
        .get();
      let timeslots = [];
      timeslotRef.forEach((doc) => {
        let timehhmm = doc.data().time.split(":");
        var d = new Date();
        d.setHours(timehhmm[0], timehhmm[1], 0, 0);
        timeslots.push(d);
      });
      timeslots.sort();
      times.push(timeslots);

      const appointmentRef = await firestore
        .collection("doctors/" + doctor.id + "/appointments")
        .get();
      let apts = [];
      appointmentRef.forEach((doc) => {
        apts.push(doc.data().date.seconds);
        console.log(doc.data().date.seconds);
        console.log(doc.data().date);
      });
      appointments.push(apts);
    }

    setDoctorInfo(doctors);
    setTimeslotInfo(times);
    setAppointmentInfo(appointments);
  };

  return (
    <IonPage>
      <Helmet>
        <meta
          name="description"
          content="This page allows users to search for verified doctors, schedule appointement or instant chat with them if they are available"
        />
      </Helmet>
      <IonToolbar>
        <IonTitle color="success">Book-A-Doc</IonTitle>
      </IonToolbar>

      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonSearchbar
                value={searchText}
                onIonChange={(e) => onChangeHandler(e)}
              ></IonSearchbar>
            </IonCol>
            <IonCol size="3" className="ion-align-self-end">
              <IonButton color="primary" onClick={onClickHandler}>
                Search
              </IonButton>
            </IonCol>
          </IonRow>
          {timeSlotInfo.length > 0 && doctorInfo.length > 0 && (
            <Doctors
              timeSlotInfo={timeSlotInfo}
              doctorInfo={doctorInfo}
              appointmentInfo={appointmentInfo}
            />
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
