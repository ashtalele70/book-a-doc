import { IonPage } from "@ionic/react";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { firestore } from "../firebase";
import { User, toUser } from "../models/user";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ZoomMtg } from "@zoomus/websdk";
import { zoomMeetingNumber } from "../config";

const crypto = require("crypto");

const ZoomMeeting: React.FC = () => {
  const { userId } = useAuth();
  const zoomUserName = localStorage.getItem("firstname") + " " + localStorage.getItem("lastname");
  //const [isPatient, setIsPatient] = useState(false);
  const [leaveUrl, setLeaveUrl] = useState("http://localhost:3000/feedback");
  // const [doctorID, setDoctorID] = useState("");
  // const [patientName, setPatientName] = useState("");
  // const location = useLocation<IState>();

  useEffect(() => {
    firestore
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        //setIsPatient(doc.data()["isPatient"]);

        doc.data()["isPatient"]
          ? setLeaveUrl("http://localhost:3000/patientFeedback")
          : setLeaveUrl("http://localhost:3000/feedback");

        console.log(leaveUrl);
        showZoomDIv();
        ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.0/lib", "/av");
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
        initiateMeeting(leaveUrl);
      })
      .catch((e) => console.log(e));
    //console.log(isPatient);

    // console.log(isPatient === true);
    console.log(leaveUrl);
  }, [leaveUrl]);

  const showZoomDIv = () => {
    document.getElementById("zmmtg-root").style.display = "block";
  };
  function generateSignature(apiKey, apiSecret, meetingNumber, role) {
    return new Promise((res, rej) => {
      // Prevent time sync issue between client signature generation and zoom
      const timestamp = new Date().getTime() - 30000;
      const msg = Buffer.from(
        apiKey + meetingNumber + timestamp + role
      ).toString("base64");
      const hash = crypto
        .createHmac("sha256", apiSecret)
        .update(msg)
        .digest("base64");
      const signature = Buffer.from(
        `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
      ).toString("base64");

      res(signature);
    });
  }

  var apiKey = "S9-p4L87SFWDpFkpsUj9fg";
  var apiSecret = "v3CPKnBmKcReC5GJEaSwapLRNzquN3a7H2H1";
  var meetingNumber = zoomMeetingNumber;

  var userName = zoomUserName;
  var userEmail = "terrylinda13@gmail.com";
  var passWord = "hH6BwE";

  var signature = "";
  generateSignature(apiKey, apiSecret, meetingNumber, 0).then((res: string) => {
    signature = res;
  }); // need to generate based on meeting id - using - role by default 0 = javascript
  const initiateMeeting = (leaveUrl) => {
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: zoomUserName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <IonPage>
      <Helmet>
        <meta name="robots" content="noindex"></meta>
      </Helmet>
      <div></div>
    </IonPage>
  );
};

export default ZoomMeeting;
