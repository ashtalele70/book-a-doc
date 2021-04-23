import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import Rating from "react-rating";
import starempty from "./images/star-empty.png";
import starfull from "./images/star-full.png";
import { firestore } from "../firebase";
import { useAuth } from "../auth";
import moment from "moment";
import { useHistory } from "react-router-dom";
import {
  heart,
  chevronBackOutline as back,
  chevronForwardOutline as front,
} from "ionicons/icons";
import {
  IonAlert,
  IonButton,
  useIonAlert,
  IonIcon,
  IonSplitPane,
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
type props = {
  doctorInfo: any[];
  timeSlotInfo: any[];
  appointmentInfo: any[];
};


const Doctors: React.FC<props> = (props: props): any => {
  // const {doctorInfo, timeSlotInfo} = props;
  const [entry, setEntry] = useState([]);
  const [timeSlot, settimeSlot] = useState([]);
  const [showMore, setShowMore] = useState([]);
  const [text, setText] = useState("Read More");
  const [present] = useIonAlert();
  const { userId } = useAuth();
  const history = useHistory();

  useEffect(() => {
    setEntry(props.doctorInfo);
    settimeSlot(props.timeSlotInfo);
    setShowMore(Array.from({ length: entry.length }, (i) => (i = false)));
    console.log(props.doctorInfo);
    /*
    firestore
      .collection("doctors")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          let doctorInfo = {
            id: doc.id,
            info: doc.data(),
          };
          console.log(doctorInfo);
          setEntry((entry) => [...entry, doctorInfo]);

          let timeSlotInfo = [];
          doc.ref
            .collection("timeslots")
            .get()
            .then((innerQuerySnapshot) => {
              innerQuerySnapshot.forEach((timeslot) => {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", timeslot.data());
                let timehhmm = timeslot.data().time.split(":");
                var d = new Date();

                d.setHours(timehhmm[0], timehhmm[1], 0, 0);

               
                if (d > new Date()) {
                 
                }
                timeSlotInfo.push(d);
              });
              timeSlotInfo.sort();
              settimeSlot((timeSlot) => [...timeSlot, timeSlotInfo]);
            });
        });
      });*/
  }, [entry]);
  useEffect(() => {});
  function daysOfWeek() {
    let startDate = new Date();
    let dates = [];
    let i;
    //console.log(Object.values(timeSlot));

    for (i = 1; i <= 7; i++) {
      console.log(startDate.getDate());

      dates.push(
        startDate.toLocaleString("default", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
      startDate.setDate(startDate.getDate() + 1);
    }

    return dates;
  }

  function handleClick(index) {
    let newArr = [...showMore];
    newArr[index] = !showMore[index];
    setShowMore(newArr);

    let id = "myBtn" + index;
    var btnText = document.getElementById(id).innerText;
    //console.log(btnText);

    let value = showMore[index] ? "READ MORE" : "READ LESS";
    document.getElementById(id).innerText = value;
    //setText(value);
  }

  function scheduleAppointment(appointmentTime, noOfDays, doctorID) {
    console.log(appointmentTime);
    console.log(userId);
    let newDate = new Date(appointmentTime.getTime());
    newDate.setDate(newDate.getDate() + noOfDays);

    firestore
      .collection("doctors")
      .doc(doctorID)
      .collection("appointments")
      .add({
        date: newDate,
        patientID: userId,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

    firestore
      .collection("patients")
      .doc(userId)
      .collection("appointments")
      .add({
        date: newDate,
        patientID: doctorID,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  function getRows(timeslots, index, doctorID) {
    let table = [];
    //console.log("called");
    //console.log(timeslots.length);
    //console.log(timeSlot);
    // timeslots &&
    //   Object.keys(timeslots).map((key, value) => {
    let i;
    let numberOfItems = showMore[index]
      ? timeslots.length
      : timeslots.length > 5
      ? 5
      : timeslots.length; //timeslots.length > 5 ? 5 : timeslots.length;
    // console.log(timeslotArray); 2.3 for iphone .9 for web
    table.push(
      <IonRow>
        {daysOfWeek().map(function (name, index) {
          return (
            <IonCol size="0.9" col-12 col-xl-2 col-lg-3 col-md-4>
              <IonLabel>{name.split(",")[0]}</IonLabel>
            </IonCol>
          );
        })}
      </IonRow>
    );
    table.push(
      <IonRow>
        {daysOfWeek().map(function (name, index) {
          return (
            <IonCol size="0.9" col-12 col-xl-2 col-lg-3 col-md-4>
              <IonLabel>{name.split(",")[1]}</IonLabel>
            </IonCol>
          );
        })}
      </IonRow>
    );
    for (i = 0; i < numberOfItems; i++) {
      let j;
      let children = [];
      let currentTime = new Date();
      let tempDate = timeslots[i];
      let arr = new Array(7).fill(tempDate);
      //data to be added
      let grey = [1618849800000, 1619037000000];
      children = arr.map((child, childIndex) => (
        <IonCol size="0.9" col-12 col-xl-2 col-lg-3 col-md-4>
          <IonButton
            disabled={
              grey.includes(
                child.getTime() + childIndex * 24 * 60 * 60 * 1000
              ) ||
              child.getTime() + childIndex * 24 * 60 * 60 * 1000 <
                currentTime.getTime()
                ? true
                : false
            }
            expand="block"
            color="warning"
            onClick={() =>
              present({
                cssClass: "my-css",
                header: "Confirm Appointment",
                message: "Are you sure about" + child,
                buttons: [
                  "Cancel",
                  {
                    text: "Ok",
                    handler: (d) =>
                      scheduleAppointment(child, Number(childIndex), doctorID),
                  },
                ],
                onDidDismiss: (e) => console.log("did dismiss"),
              })
            }
          >
            {timeslots[i] &&
              timeslots[i].toLocaleTimeString([], {
                timeStyle: "short",
              })}
          </IonButton>
        </IonCol>
      ));

      // for (j = 0; j <= 6; j++) {
      //   tempDate.setDate(tempDate.getDate() + 1);
      //   console.log(tempDate);
      //   children.push(
      //     <IonCol size="0.9">
      //       <IonButton
      //         onClick={() => scheduleAppointment(tempDate, j)}
      //         size="small"
      //         color="warning"
      //       >
      //         {timeSlot[key][i].toLocaleTimeString([], {
      //           timeStyle: "short",
      //         })}
      //       </IonButton>
      //     </IonCol>
      //   );
      // }

      table.push(<IonRow>{children}</IonRow>);
    }
    //table.push();
    // });

    return table;
  }

  function myFunction() {
    var dots = document.getElementById("dots");
    var btnText = document.getElementById("myBtn");
    var moreText = document.getElementById("more");

    if ((btnText.innerHTML = "Read more")) {
      dots.style.display = "inline";

      moreText.style.display = "none";
    } else {
      btnText.innerHTML = "Read less";
      dots.style.display = "none";
      moreText.style.display = "inline";
    }
  }

  function zoomMeeting() {
    history.push("/zoom");
  }

  function viewProfile(key) {
    history.replace({
      pathname: "/viewProfile",
      state: { info: entry[key].info },
    });
    // history.push("/viewProfile")
  }

  const list = Object.keys(entry).map((key, value) => {
    return (
      <IonItem>
        <IonGrid>
          <IonCol size="6">
            <IonRow>
              <IonAvatar>
                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
              </IonAvatar>
              <h2>
                Dr. {entry[key].info && entry[key].info.firstname}{" "}
                {entry[key].info && entry[key].info.lastname}
              </h2>
            </IonRow>

            <IonRow>
              <IonButton onClick={() => viewProfile(key)}>
                View Profile
              </IonButton>
            </IonRow>
            {entry[key].info &&
              entry[key].info.specialties.map((row, index) => (
                <IonLabel class="EBinfor">{row}</IonLabel>
              ))}
            {2 > 1 && (
              <IonButton color="warning" onClick={() => history.push("/zoom")}>
                Talk now
              </IonButton>
            )}
          </IonCol>

          {/*<table>{getRows()}</table>*/}
          <IonCol size="6">
            <IonGrid id="scheduleTable">
              {getRows(timeSlot[value], value, entry[key].id)}
            </IonGrid>
            {timeSlot[value].length > 5 && (
              <IonButton id={"myBtn" + key} onClick={() => handleClick(key)}>
                Read More
              </IonButton>
            )}
          </IonCol>
        </IonGrid>
      </IonItem>
    );
  });
  return (
    <React.Fragment>
      <IonItemDivider color="primary">
        <IonLabel></IonLabel>
      </IonItemDivider>

      <IonItem>
        <IonLabel>{entry && entry.length} results</IonLabel>

        <div className="row">
          {/**
              <IonCol>
                <IonIcon icon={back}></IonIcon>
              </IonCol>
              */}
          {/* <IonGrid>
         
            
            <IonRow>
              {daysOfWeek().map(function (name, index) {
                return (
                  <IonCol>
                    <IonLabel>{name.split(",")[0]}</IonLabel>
                  </IonCol>
                );
              })}
            </IonRow>
            <IonRow>
              {daysOfWeek().map(function (name, index) {
                return (
                  <IonCol>
                    <IonLabel>{name.split(",")[1]}</IonLabel>
                  </IonCol>
                );
              })}
            </IonRow>
          </IonGrid> */}
          {/*<IonCol>
                <IonIcon icon={front}></IonIcon>
              </IonCol>*/}
        </div>
      </IonItem>
      {list}
    </React.Fragment>
  );
};

export default Doctors;
