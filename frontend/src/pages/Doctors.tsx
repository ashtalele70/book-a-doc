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
type props = {
  doctorInfo: any[];
  timeSlotInfo: any[];
};
const Doctors: React.FC<props> = (props: props): any => {
  // const {doctorInfo, timeSlotInfo} = props;
  const [entry, setEntry] = useState([]);
  const [timeSlot, settimeSlot] = useState([]);
  const [showMore, setShowMore] = useState([]);
  const [text, setText] = useState("Read More");

  useEffect(() => {
    setEntry(props.doctorInfo);
    settimeSlot(props.timeSlotInfo);
    setShowMore(Array.from({ length: entry.length }, (i) => (i = false)));

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

  function daysOfWeek() {
    let startDate = new Date();
    let dates = [];
    let i;
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

  function handleClick(index) {
    let newArr = [...showMore];
    newArr[index] = !showMore[index];
    setShowMore(newArr);

    let id = "myBtn" + index;
    var btnText = document.getElementById(id).innerText;
    console.log(btnText);

    let value = showMore[index] ? "READ MORE" : "READ LESS";
    document.getElementById(id).innerText = value;
    //setText(value);
  }

  function scheduleAppointment(appointmentTime, noOfDays) {
    console.log(appointmentTime);
    console.log(noOfDays);
    let newDate = new Date(appointmentTime.getTime());
    newDate.setDate(newDate.getDate() + noOfDays);
    alert(newDate);
  }

  function getRows(timeslots, index) {
    let table = [];
    console.log("called");

    // timeslots &&
    //   Object.keys(timeslots).map((key, value) => {
    let i;
    const numberOfItems = showMore[index] ? timeslots.length : 5;
    // console.log(timeslotArray);

    for (i = 0; i < numberOfItems; i++) {
      let j;
      let children = [];
      let tempDate = timeslots[i];
      let arr = new Array(7).fill(tempDate);

      children = arr.map((child, childIndex) => (
        <IonCol size="0.9">
          <IonButton
            onClick={() => scheduleAppointment(child, Number(childIndex))}
            size="small"
            color="warning"
          >
            {timeslots[i] &&
              timeslots[i].toLocaleTimeString([], {
                timeStyle: "short",
              })}
            {/*                 
                {timeSlot[key][i].toLocaleTimeString([], {
                  timeStyle: "short",
                })} */}
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

  const list = Object.keys(entry).map((key, value) => {
    return (
      <IonItem>
        <IonGrid>
          <IonCol size="6">
            Dr. {entry[key].info && entry[key].info.firstname}{" "}
            {entry[key].info && entry[key].info.lastname}
            <IonButton color="warning">Talk now</IonButton>
          </IonCol>

          {/*<table>{getRows()}</table>*/}
          <IonCol size="6">
            <IonGrid id="scheduleTable">
              {getRows(timeSlot[value], value)}
            </IonGrid>
            <IonButton id={"myBtn" + key} onClick={() => handleClick(key)}>
              Read More
            </IonButton>
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
        <IonLabel>25 Entries</IonLabel>

        <div className="row">
          {/**
              <IonCol>
                <IonIcon icon={back}></IonIcon>
              </IonCol>
              */}
          <IonGrid>
            {" "}
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
          </IonGrid>
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
