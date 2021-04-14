import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import Rating from "react-rating";
import starempty from "./images/star-empty.png";
import starfull from "./images/star-full.png";
import { firestore } from "../firebase";
import moment from "moment";
import {
  heart,
  chevronBackOutline as back,
  chevronForwardOutline as front,
} from "ionicons/icons";
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
} from "@ionic/react";
import "./styleSheet.css";

const Doctors: React.FC = () => {
  const [entry, setEntry] = useState([]);
  const [timeSlot, settimeSlot] = useState([]);
  const [showMore, setshowMore] = useState(false);

  useEffect(() => {
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
          console.log(typeof entry);
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
                console.log(d);
                /*
                if (d > new Date()) {
                 
                }*/
                timeSlotInfo.push(d);
                console.log(timeSlotInfo);
              });
              timeSlotInfo.sort();
              settimeSlot((timeSlot) => [...timeSlot, timeSlotInfo]);
            });
        });
      });
  }, []);

  function daysOfWeek() {
    let startDate = new Date();
    let dates = [];
    let i;
    console.log("today's date");
    console.log(startDate);
    console.log(Object.values(timeSlot));

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
  function handleClick() {
    setshowMore(!showMore);
    var btnText = document.getElementById("myBtn");
    btnText.innerHTML = showMore ? "Read More" : "Read Less";
  }
  function getRows() {
    let table = [];
    console.log("called");

    timeSlot &&
      Object.keys(timeSlot).map((key, value) => {
        let i;
        const numberOfItems = showMore ? timeSlot[key].length : 5;
        for (i = 1; i <= numberOfItems; i++) {
          let j;
          let children = [];
          for (j = 1; j <= 7; j++) {
            children.push(
              <td>
                <IonButton color="warning">
                  {timeSlot[key][j].toLocaleTimeString([], {
                    timeStyle: "short",
                  })}
                </IonButton>
              </td>
            );
          }

          table.push(<tr>{children}</tr>);
          <button onClick={() => handleClick()}>Show more</button>;
        }
      });
    console.log(table);
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

  const list = Object.keys(entry).map((key, value) => {
    return (
      <IonItem>
        <div className="row">
          Dr. {entry[key].info.firstname} {entry[key].info.lastname}
          <IonButton color="warning">Talk now</IonButton>
        </div>

        <div className="row">
          <table>{getRows()}</table>
          <IonButton onClick={() => handleClick()} id="myBtn">
            Read more
          </IonButton>
        </div>
      </IonItem>
    );
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
        <div className="row">25 Entries</div>
        <div className="row">
          {/**
              <IonCol>
                <IonIcon icon={back}></IonIcon>
              </IonCol>
              */}
          <table>
            <tr>
              {daysOfWeek().map(function (name, index) {
                return (
                  <th>
                    <IonLabel>{name.split(",")[0]}</IonLabel>
                  </th>
                );
              })}
            </tr>
            <tr>
              {daysOfWeek().map(function (name, index) {
                return (
                  <th>
                    <IonLabel>{name.split(",")[1]}</IonLabel>
                  </th>
                );
              })}
            </tr>
          </table>
          {/*<IonCol>
                <IonIcon icon={front}></IonIcon>
              </IonCol>*/}
        </div>
      </IonItem>
      {list}
    </IonContent>
  );
};

export default Doctors;
