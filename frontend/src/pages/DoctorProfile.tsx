import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Rating from "react-rating";
import starempty from "./images/star-empty.png";
import starfull from "./images/star-full.png";
import starYellow from "./images/star-yellow.png";
import { firestore } from "../firebase";
import { Helmet } from "react-helmet";
// import SvgIcon from "@material-ui/core";
import ReactStars from "react-rating-stars-component";
import { informationCircleOutline } from "ionicons/icons";

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
  IonHeader,
  IonIcon,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import "./styleSheet.css";
interface IState {
  info?: any[];
  reviewInfo?: any[];
}

const DoctorProfile: React.FC = (): any => {
  const [entry, setEntry] = useState([]);
  const [reviews, setReviews] = useState([]);
  const location = useLocation<IState>();
  const appointments = [];
  useEffect(() => {
    setEntry(location.state.info);
    setReviews(location.state.reviewInfo);
    console.log(reviews);
    let ratings = reviews?.map(function (element) {
      return element["rating"];
    });
    // firestore
    //   .collection("doctors/" + "1nOipQQaw5Zgd12zStb0dAxvR5x1" + "/reviews")
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       // doc.data() is never undefined for query doc snapshots
    //       console.log(reviews);
    //       console.log(doc.data());
    //       setReviews((reviews) => [...reviews, doc.data()]);
    //       console.log(reviews);
    //     });
    //   });
  }, []);
  function getRating() {
    let ratings = reviews?.map(function (element) {
      return element["rating"];
    });
    console.log(ratings);
    return ratings.reduce((a, b) => a + b, 0) / ratings.length;
  }
  return (
    <IonContent
      scrollEvents={true}
      onIonScrollStart={() => {}}
      onIonScroll={() => {}}
      onIonScrollEnd={() => {}}
    >
      <Helmet>
        <meta
          name="description"
          content="This page allows users to view doctor's profile and the reviews of other patients."
        />
      </Helmet>
      {/* <IonHeader>
        <h1 style={{ color: "#2dd36f", fontWeight: 600 }}>Book-a-Doc</h1>
      </IonHeader> */}
      <IonHeader>
      <IonToolbar>
        <IonTitle color="success" className="ion-float-left">
          Book-A-Doc
        </IonTitle>
        <IonTitle color="success" className="ion-float-right">
          Hello, {sessionStorage.getItem("firstname")}
        </IonTitle>
      </IonToolbar>
      </IonHeader>
      

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
          {entry &&
            entry["specialties"] &&
            entry["specialties"].map((row, index) => (
              <IonRow class="EBinfor">{row}</IonRow>
            ))}
        </IonGrid>
      </IonItem>
      <IonItem>
        <IonGrid>
          <IonRow>
            <IonLabel class="heading">About</IonLabel>
          </IonRow>

          <IonRow>
            <IonText>entry["about"]</IonText>
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonItem>
        <IonGrid>
          <IonRow>
            <IonLabel class="heading">Overall Rating</IonLabel>
          </IonRow>

          <IonRow>
            <IonText id="rating">{getRating()}</IonText>
          </IonRow>
          <IonRow>
            <ReactStars
              count={5}
              size={50}
              value={4.5}
              isHalf={true}
              edit={false}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
          </IonRow>
          {/*<IonRow>
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
          </IonRow> */}
        </IonGrid>
      </IonItem>
      {reviews.length != 0 && (
        <IonItem>
          <IonGrid>
            <IonLabel class="heading">Patient Reviews</IonLabel>

            {reviews &&
              reviews.map((row, index) => (
                <div>
                  <IonRow>
                    <p>{row["review"]}</p>
                  </IonRow>
                  <IonRow>
                    <IonCol size="2.5">
                      <ReactStars
                        count={5}
                        size={24}
                        value={row["rating"]}
                        isHalf={true}
                        edit={false}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                      />
                    </IonCol>
                    <IonCol size="2.5">
                      <p>
                        {row["date"].toDate().toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </IonCol>
                  </IonRow>
                </div>
              ))}
          </IonGrid>
        </IonItem>
      )}
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
            <div className="tooltip">
              <IonLabel class="sub-heading">
                NPI number
                <span className="tooltiptext">
                  National Provider Identifier
                </span>
              </IonLabel>
            </div>
          </IonRow>
          <IonRow class="EBinfor">{entry && entry["npiNumber"]}</IonRow>
        </IonGrid>
      </IonItem>
    </IonContent>
  );
};

export default DoctorProfile;
