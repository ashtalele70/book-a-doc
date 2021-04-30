import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { firestore } from "../firebase";
import { formatDate } from "../data/date";
import { useHistory } from "react-router-dom";
import { toUser, User } from "../models/user";
import { Helmet } from "react-helmet";

const AppointmentsPage: React.FC = () => {
  const history = useHistory();
  const { loggedIn, userId } = useAuth();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [currentAppointments, setCurrentAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const userRef = firestore.collection("users").doc(userId);
    userRef.get().then((doc) => setUser(toUser(doc)));
  }, [userId]);
  useEffect(() => {
    let appointmentsRef;
    if (user?.isPatient) {
      appointmentsRef = firestore
        .collection("patients")
        .doc(userId)
        .collection("appointments");
    } else if (!user?.isPatient) {
      appointmentsRef = firestore
        .collection("doctors")
        .doc(userId)
        .collection("appointments");
    }
    let currentDate = new Date();
    let lateDate = new Date(currentDate);
    lateDate.setMinutes(currentDate.getMinutes() - 29);
    console.log(currentDate);
    return appointmentsRef
      .where("date", "<", lateDate)
      .orderBy("date", "desc")
      .onSnapshot(({ docs }) =>
        setPastAppointments(
          docs.map((doc) => ({
            id: doc.id,
            date: doc.data().date,
          }))
        )
      );
  }, [user?.isPatient, userId]);
  useEffect(() => {
    let appointmentsRef;
    if (user?.isPatient) {
      appointmentsRef = firestore
        .collection("patients")
        .doc(userId)
        .collection("appointments");
    } else if (!user?.isPatient) {
      appointmentsRef = firestore
        .collection("doctors")
        .doc(userId)
        .collection("appointments");
    }
    let currentDate = new Date();
    console.log(currentDate);
    return appointmentsRef
      .where("date", ">", currentDate)
      .orderBy("date", "asc")
      .onSnapshot(({ docs }) =>
        setUpcomingAppointments(
          docs.map((doc) => ({
            id: doc.id,
            date: doc.data().date,
          }))
        )
      );
  }, [user?.isPatient, userId]);
  useEffect(() => {
    let appointmentsRef;
    if (user?.isPatient) {
      appointmentsRef = firestore
        .collection("patients")
        .doc(userId)
        .collection("appointments");
    } else if (!user?.isPatient) {
      appointmentsRef = firestore
        .collection("doctors")
        .doc(userId)
        .collection("appointments");
    }
    let currentDate = new Date();
    let lateDate = new Date(currentDate);
    lateDate.setMinutes(currentDate.getMinutes() - 30);
    console.log("current", currentDate);
    console.log("late", lateDate);
    return appointmentsRef
      .where("date", ">=", lateDate)
      .where("date", "<=", currentDate)
      .orderBy("date", "desc")
      .onSnapshot(({ docs }) =>
        setCurrentAppointments(
          docs.map((doc) => ({
            id: doc.id,
            date: doc.data().date,
          }))
        )
      );
  }, [user?.isPatient, userId]);

  return (
    <IonPage>
      <Helmet>
        <meta name="robots" content="noindex"></meta>
      </Helmet>
      <IonToolbar>
        <IonTitle color="warning">Appointments</IonTitle>
      </IonToolbar>
      {!loggedIn && (
        <IonButton expand="block" fill="clear" routerLink="/login">
          Already have an account?
        </IonButton>
      )}
      {loggedIn && (
        <IonContent className="ion-padding">
          <IonList>
            <IonListHeader lines="inset">
              <IonLabel>Current Appointments</IonLabel>
            </IonListHeader>
            {currentAppointments.map((appointment) => (
              <IonItem key={appointment.id}>
                <IonLabel>
                  {/* <h2>{formatDate(entry.date)}</h2>
						<h3>{entry.title}</h3> */}
                  {formatDate(
                    new Date(appointment.date.seconds * 1000).toISOString()
                  )}
                </IonLabel>
                <IonButton
                  color="warning"
                  onClick={() => history.push("/zoom")}
                >
                  Join now
                </IonButton>
              </IonItem>
            ))}
          </IonList>
          <IonList>
            <IonListHeader lines="inset">
              <IonLabel>Upcoming Appointments</IonLabel>
            </IonListHeader>
            {upcomingAppointments.map((appointment) => (
              <IonItem key={appointment.id}>
                <IonLabel>
                  {/* <h2>{formatDate(entry.date)}</h2>
						<h3>{entry.title}</h3> */}
                  {formatDate(
                    new Date(appointment.date.seconds * 1000).toISOString()
                  )}
                </IonLabel>
                <IonButton
                  color="warning"
                  disabled
                  onClick={() => history.push("/zoom")}
                >
                  Scheduled
                </IonButton>
              </IonItem>
            ))}
          </IonList>
          <IonList>
            <IonListHeader lines="inset">
              <IonLabel>Past Appointments</IonLabel>
            </IonListHeader>
            {pastAppointments.map((appointment) => (
              <IonItem key={appointment.id}>
                <IonLabel>
                  {/* <h2>{formatDate(entry.date)}</h2>
						<h3>{entry.title}</h3> */}
                  {formatDate(
                    new Date(appointment.date.seconds * 1000).toISOString()
                  )}
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      )}
    </IonPage>
  );
};

export default AppointmentsPage;
