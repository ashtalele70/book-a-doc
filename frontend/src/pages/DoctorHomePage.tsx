import {
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonRow,
  IonHeader,
  IonCol,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { useAuth } from "../auth";
import { Chart } from "react-google-charts";

const DoctorHomePage: React.FC = () => {
  const { userId } = useAuth();
  const [genderData, setGenderData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [conditionData, setConditionData] = useState([
    ["Condition", "Per Month"],
  ]);
  const [visitData, setVisitData] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const titles = ["Gender", "Age", "Condition", "New v/s Repeat Patients"];
  const options = {
    title: "",
    pieHole: 0.4,
    is3D: true,
  };

  useEffect(() => {
    const func = async () => {
      const summaryRef = await firestore
        .collection("doctors/" + userId + "/summary")
        .get();
      let noOfMales = 0,
        noOfFemales = 0;
      let below18 = 0,
        above18 = 0;
      let newVisit = 0,
        repeatVisit = 0;
      let conditionMap = new Map();
      let conditionCount = 0;
      if (summaryRef?.docs?.length == 0) setShowMessage(true);
      summaryRef.forEach((doc) => {
        let data = doc.data();
        noOfMales = data.gender == "male" ? noOfMales + 1 : noOfMales;
        noOfFemales = data.gender == "female" ? noOfFemales + 1 : noOfFemales;
        below18 = Number(data.age) < 18 ? below18 + 1 : below18;
        above18 = Number(data.age) > 17 ? above18 + 1 : above18;
        conditionCount = conditionMap.has(data.condition)
          ? conditionMap.get(data.condition)
          : 1;
        conditionMap.set(data.condition, conditionCount);
        newVisit = data.visit == "yes" ? newVisit + 1 : newVisit;
        repeatVisit = data.visit == "no" ? repeatVisit + 1 : repeatVisit;
      });

      setGenderData([
        ["Gender", "Per Month"],
        ["Male", noOfMales],
        ["Female", noOfFemales],
      ]);

      setAgeData([
        ["Age", "Per Month"],
        ["Below 18", below18],
        ["18 and Above", above18],
      ]);

      let conditionInfo = [];
      for (let [key, value] of conditionMap) {
        let condition = [key, value];
        conditionInfo.push(condition);
      }

      setConditionData(conditionData.concat(conditionInfo));

      setVisitData([
        ["Visit", "Per Month"],
        ["New", newVisit],
        ["Repeat", repeatVisit],
      ]);
    };

    func();
  }, []);

  return (
    <IonPage>
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
      {showMessage && (
        <IonContent>
          <IonText color="warning" className="ion-text-center">
            <h4>You have no patients!!!</h4>
          </IonText>
        </IonContent>
      )}
      {!showMessage && (
        <IonContent>
          <IonText color="warning" className="ion-text-center">
            <h4>Patient Summary</h4>
          </IonText>
          <IonRow>
            <IonCol size="6">
              <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={genderData}
                options={{ ...options, title: titles[0] }}
              />
            </IonCol>
            <IonCol size="6">
              <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={ageData}
                options={{ ...options, title: titles[1] }}
              />
            </IonCol>
            <IonCol size="6">
              <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={conditionData}
                options={{ ...options, title: titles[2] }}
              />
            </IonCol>
            <IonCol size="6">
              <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={visitData}
                options={{ ...options, title: titles[3] }}
              />
            </IonCol>
          </IonRow>
        </IonContent>
      )}
    </IonPage>
  );
};

export default DoctorHomePage;
