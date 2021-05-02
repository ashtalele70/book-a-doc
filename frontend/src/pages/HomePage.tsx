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
  IonCardContent,
  IonCard,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import data from "../data/conditionSpecialtyMap";
import Doctors from "./Doctors";
import { useAuth } from "../auth";
import { Helmet } from "react-helmet";

const HomePage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [doctorInfo, setDoctorInfo] = useState([]);
  const [timeSlotInfo, setTimeslotInfo] = useState([]);
  const [appointmentInfo, setAppointmentInfo] = useState([]);
  const [hideTitle, setHideTitle] = useState(false);
  const { loggedIn } = useAuth();
  const onChangeHandler = (e) => {
    setSearchText(e.detail.value);
  };

  const onClickHandler = async () => {
    setHideTitle(true);

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

      {!hideTitle && loggedIn && (
        <div>
          <IonToolbar>
            <IonTitle id="AppTitle" size="large" color="success">
              Connect with Doctors 24*7
            </IonTitle>
          </IonToolbar>
        </div>
      )}

      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonSearchbar
                value={searchText}
                onIonChange={(e) => onChangeHandler(e)}
                placeholder="condition"
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

        <IonGrid>
          <IonTitle>Top Searched Conditions</IonTitle>

          <IonRow id="specialties">
            {Object.keys(data).map(function (name, index) {
              return (
                <IonCol>
                  <IonCard color="warning" style={{ Size: "2em" }}>
                    <IonCardContent>
                      {(name.length % 3 == 0 && (
                        <h1>{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
                      )) ||
                        (name.length % 2 == 0 && (
                          <h5>
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                          </h5>
                        )) || (
                          <h2>
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                          </h2>
                        )}
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
