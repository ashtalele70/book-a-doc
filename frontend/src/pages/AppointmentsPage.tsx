import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonHeader,
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
import axios from "axios";
import { rooturl, zoomurl } from "../config";
import { Helmet } from "react-helmet";
import { sendEmail } from "../data/email";

const AppointmentsPage: React.FC = () => {
  const history = useHistory();
  const { loggedIn, userId } = useAuth();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [currentAppointments, setCurrentAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    let userData = new URLSearchParams();
    userData.set("id", userId);

    axios.get(rooturl + "/getUser?" + userData.toString()).then((res) => {
      if (res.status === 200) {
        // console.log(res);
        setUser(toUser(res.data));
      }
    });
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
            doctorID: doc.data().doctorID,
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
            doctorID: doc.data().doctorID,
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
            doctorID: doc.data().doctorID,
          }))
        )
      );
  }, [user?.isPatient, userId]);

  const joinNow = (appointment) => {
    // fetch doctor from doct table
    if (user.isPatient) {
      let userData = new URLSearchParams();
      userData.set("id", appointment.doctorID);
      sessionStorage.setItem("doctorID", appointment.doctorID);
      axios.get(rooturl + "/getDoctor?" + userData.toString()).then((res) => {
        if (res.status === 200) {
          // console.log(res);
          sendEmail(
            "Dr. " + res.data.firstname + " " + res.data.lastname,
            "Patient " +
              sessionStorage.getItem("firstname") +
              " " +
              sessionStorage.getItem("lastname") +
              " is waiting to meet you. Please join you meeting room" +
              zoomurl
          );
        }
      });
    }
    history.push("/zoom");
  };

  // const AppointmentsPage: React.FC = () => {
  //   const history = useHistory();
  //   const { loggedIn, userId } = useAuth();
  //   const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  //   const [currentAppointments, setCurrentAppointments] = useState([]);
  //   const [pastAppointments, setPastAppointments] = useState([]);
  //   const [user, setUser] = useState<User>();
  //   useEffect(() => {
  //     const userRef = firestore.collection("users").doc(userId);
  //     userRef.get().then((doc) => setUser(toUser(doc)));
  //   }, [userId]);
  //   useEffect(() => {
  //     let appointmentsRef;
  //     if (user?.isPatient) {
  //       appointmentsRef = firestore
  //         .collection("patients")
  //         .doc(userId)
  //         .collection("appointments");
  //     } else if (!user?.isPatient) {
  //       appointmentsRef = firestore
  //         .collection("doctors")
  //         .doc(userId)
  //         .collection("appointments");
  //     }
  //     let currentDate = new Date();
  //     let lateDate = new Date(currentDate);
  //     lateDate.setMinutes(currentDate.getMinutes() - 29);
  //     console.log(currentDate);
  //     return appointmentsRef
  //       .where("date", "<", lateDate)
  //       .orderBy("date", "desc")
  //       .onSnapshot(({ docs }) =>
  //         setPastAppointments(
  //           docs.map((doc) => ({
  //             id: doc.id,
  //             date: doc.data().date,
  //           }))
  //         )
  //       );
  //   }, [user?.isPatient, userId]);
  //   useEffect(() => {
  //     let appointmentsRef;
  //     if (user?.isPatient) {
  //       appointmentsRef = firestore
  //         .collection("patients")
  //         .doc(userId)
  //         .collection("appointments");
  //     } else if (!user?.isPatient) {
  //       appointmentsRef = firestore
  //         .collection("doctors")
  //         .doc(userId)
  //         .collection("appointments");
  //     }
  //     let currentDate = new Date();
  //     console.log(currentDate);
  //     return appointmentsRef
  //       .where("date", ">", currentDate)
  //       .orderBy("date", "asc")
  //       .onSnapshot(({ docs }) =>
  //         setUpcomingAppointments(
  //           docs.map((doc) => ({
  //             id: doc.id,
  //             date: doc.data().date,
  //           }))
  //         )
  //       );
  //   }, [user?.isPatient, userId]);
  //   useEffect(() => {
  //     let appointmentsRef;
  //     if (user?.isPatient) {
  //       appointmentsRef = firestore
  //         .collection("patients")
  //         .doc(userId)
  //         .collection("appointments");
  //     } else if (!user?.isPatient) {
  //       appointmentsRef = firestore
  //         .collection("doctors")
  //         .doc(userId)
  //         .collection("appointments");
  //     }
  //     let currentDate = new Date();
  //     let lateDate = new Date(currentDate);
  //     lateDate.setMinutes(currentDate.getMinutes() - 30);
  //     console.log("current", currentDate);
  //     console.log("late", lateDate);
  //     return appointmentsRef
  //       .where("date", ">=", lateDate)
  //       .where("date", "<=", currentDate)
  //       .orderBy("date", "desc")
  //       .onSnapshot(({ docs }) =>
  //         setCurrentAppointments(
  //           docs.map((doc) => ({
  //             id: doc.id,
  //             date: doc.data().date,
  //           }))
  //         )
  //       );
  //   }, [user?.isPatient, userId]);

  return (
    <IonPage>
      <Helmet>
        <meta name="robots" content="noindex"></meta>
      </Helmet>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="warning" className="ion-float-left">
            Appointments
          </IonTitle>
          <IonTitle color="success" className="ion-float-right">
            Hello, {sessionStorage.getItem("firstname")}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {!loggedIn && (
          <IonButton expand="block" fill="clear" routerLink="/login">
            Already have an account?
          </IonButton>
        )}
        {!user?.isPatient && (
          <IonButton color="warning" onClick={() => history.push("/zoom")}>
            Talk now
          </IonButton>
        )}
        {loggedIn &&
          (currentAppointments.length == 0 &&
          upcomingAppointments.length == 0 &&
          pastAppointments.length == 0 ? (
            <IonListHeader>
              <h2>You have no appointments!!!</h2>
            </IonListHeader>
          ) : (
            <div>
              <IonList>
                <IonListHeader lines="inset">
                  <IonLabel>Current Appointments</IonLabel>
                </IonListHeader>
                {currentAppointments.length == 0 ? (
                  <IonListHeader>
                    <h6>You have no current appointments!!!</h6>
                  </IonListHeader>
                ) : (
                  currentAppointments.map((appointment) => (
                    <IonItem key={appointment.id}>
                      <IonLabel>
                        {/* <h2>{formatDate(entry.date)}</h2>
						<h3>{entry.title}</h3> */}
                        {formatDate(
                          new Date(
                            appointment.date.seconds * 1000
                          ).toISOString()
                        )}
                      </IonLabel>
                      <IonButton
                        color="warning"
                        onClick={() => joinNow(appointment)}
                      >
                        Join now
                      </IonButton>
                    </IonItem>
                  ))
                )}
              </IonList>
              <IonList>
                <IonListHeader lines="inset">
                  <IonLabel>Upcoming Appointments</IonLabel>
                </IonListHeader>
                {upcomingAppointments.length == 0 ? (
                  <IonListHeader>
                    <h6>You have no upcoming appointments!!!</h6>
                  </IonListHeader>
                ) : (
                  upcomingAppointments.map((appointment) => (
                    <IonItem key={appointment.id}>
                      <IonLabel>
                        {/* <h2>{formatDate(entry.date)}</h2>
						<h3>{entry.title}</h3> */}
                        {formatDate(
                          new Date(
                            appointment.date.seconds * 1000
                          ).toISOString()
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
                  ))
                )}
              </IonList>
              <IonList>
                <IonListHeader lines="inset">
                  <IonLabel>Past Appointments</IonLabel>
                </IonListHeader>
                {pastAppointments.length == 0 ? (
                  <IonListHeader>
                    <h6>You have no past appointments!!!</h6>
                  </IonListHeader>
                ) : (
                  pastAppointments.map((appointment) => (
                    <IonItem key={appointment.id}>
                      <IonLabel>
                        {/* <h2>{formatDate(entry.date)}</h2>
						<h3>{entry.title}</h3> */}
                        {formatDate(
                          new Date(
                            appointment.date.seconds * 1000
                          ).toISOString()
                        )}
                      </IonLabel>
                    </IonItem>
                  ))
                )}
              </IonList>
            </div>
          ))}
      </IonContent>
    </IonPage>
  );
};

export default AppointmentsPage;
