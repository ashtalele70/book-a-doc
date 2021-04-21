import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonGrid,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonDatetime,
  IonRadioGroup,
  IonRadio,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { firestore } from "../firebase";
import { User, toUser } from "../models/user";
import { useHistory } from "react-router-dom";
import { ZoomMtg } from "@zoomus/websdk";

const crypto = require("crypto");

const ZoomMeeting: React.FC = () => {
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
  var meetingNumber = 8085861668;
  var leaveUrl = "http://localhost:3000/payment"; // our redirect url
  var userName = "WebSDK";
  var userEmail = "terrylinda13@gmail.com";
  var passWord = "hH6BwE";

  var signature = "";
  generateSignature(apiKey, apiSecret, meetingNumber, 0).then((res: string) => {
    signature = res;
  }); // need to generate based on meeting id - using - role by default 0 = javascript
  const initiateMeeting = () => {
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
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

  useEffect(() => {
    console.log("Yay");
    showZoomDIv();
    ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.0/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    initiateMeeting();
  }, []);

  return (
    <IonPage>
      <div>Zoom</div>
    </IonPage>
  );
};

export default ZoomMeeting;
