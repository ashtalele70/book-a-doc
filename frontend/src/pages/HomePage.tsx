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

const HomePage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [doctorInfo, setDoctorInfo] = useState([]);
  // const [doctorSnapshot, setDoctorSnapshot] = useState({});
  const [timeSlotInfo, setTimeslotInfo] = useState([]);

  // useEffect(() => {

  // 	(async function getDoctors() {
  // 		//const specialties = data[searchText];
  // 		let arr = [];
  // 		firestore.collection("doctors").get().then(snapshot => {
  // 			snapshot.forEach((doc) => {
  // 			  //if(doc.data().specialties.some(specialty => specialties.indexOf(specialty) >= 0)) {
  // 				let doctor = {
  // 					id: doc.id,
  // 					info: doc.data(),
  // 				};
  // 				arr.push(doctor);
  // 			 // }
  // 			})
  // 			setDoctorInfo(arr);
  // 			setTimeslotInfo(timeSlotInfo);
  // 		});

  // 		// const doctorsRef = firestore.doc('doctors/1nOipQQaw5Zgd12zStb0dAxvR5x1');
  // 		// doctorDocumentSnapshot = await doctorsRef.get();
  // 	})();
  // }, []);

  const onChangeHandler = (e) => {
    setSearchText(e.detail.value);
  };

  const onClickHandler = async () => {
    const specialties = data[searchText];
    let doctors = [], times = [];
    // firestore
    //   .collection("doctors")
    //   .get()
    //   .then((snapshot) => {
    //     snapshot.forEach((doc) => {
    //       if (
    //         doc
    //           .data()
    //           .specialties.some(
    //             (specialty) => specialties.indexOf(specialty) >= 0
    //           )
    //       ) {
    //         let doctor = {
    //           id: doc.id,
    //           info: doc.data()
    //         };
            
	// 		let timeslots = [];
    //         doc.ref
    //           .collection("timeslots")
    //           .get()
    //           .then((innerQuerySnapshot) => {
    //             innerQuerySnapshot.forEach((timeslot) => {
    //               let timehhmm = timeslot.data().time.split(":");
    //               var d = new Date();
    //               d.setHours(timehhmm[0], timehhmm[1], 0, 0);
    //               console.log(d);
    //               timeslots.push(d);
    //             });
    //             timeslots.sort();
    //             times.push(timeslots);
    //           })
	// 		  .finally(() => {
	// 			setTimeslotInfo(times);
	// 			arr.push(doctor);
	// 		  	setDoctorInfo(arr);
	// 		  });
			  
    //       }
    //     });
    //   });

	const doctorRef = await firestore.collection("doctors").get();
	doctorRef.forEach(doc => {
		if(doc.data().specialties.some(specialty => specialties.indexOf(specialty) >= 0)) {
			let doctor = {
				id: doc.id,
				info: doc.data()
			};
			doctors.push(doctor);
		}
	});

	for(let doctor of doctors) {
		const timeslotRef = await firestore.collection("doctors/" + doctor.id + "/timeslots").get();
		let timeslots = [];
		timeslotRef.forEach(doc => {
			let timehhmm = doc.data().time.split(":");
			var d = new Date();
			d.setHours(timehhmm[0], timehhmm[1], 0, 0);
			console.log(d);
			timeslots.push(d);
		});
		timeslots.sort();
		times.push(timeslots);
	}

	setDoctorInfo(doctors);
	setTimeslotInfo(times);
    // let docs = [];
    // docs.push(doctorDocumentSnapshot.data());
    // doctorInfo = docs.filter(doctor => doctor.specialties.some(specialty => specialties.indexOf(specialty) >= 0));
	
  };

  return (
    <IonPage>
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
          {/* <IonRow> */}
            {timeSlotInfo.length > 0 && doctorInfo.length > 0 && (
              <Doctors timeSlotInfo={timeSlotInfo} doctorInfo={doctorInfo} />
            )}
          {/* </IonRow> */}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
