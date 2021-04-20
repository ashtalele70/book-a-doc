//import "./Zoom.css";
import { ZoomMtg } from "@zoomus/websdk";
import React, { useEffect } from "react";
import { Zoom } from "@ionic-native/zoom";

// need to generate based on meeting id - using - role by default 0 = javascript

const ZoomComponent: React.FC = () => {
  var API_KEY = "S9-p4L87SFWDpFkpsUj9fg";
  var API_SECRET = "v3CPKnBmKcReC5GJEaSwapLRNzquN3a7H2H1";
  var meetingNumber = "6806336868";
  var leaveUrl = "http://localhost:3000"; // our redirect url
  var userName = "WebSDK";
  var userEmail = "terrylinda13@gmail.com";
  var password = "hH6BwE";
  var displayName = "displayName";
  var meetingPassword = "random";

  Zoom.initialize(API_KEY, API_SECRET)
    .then((success: any) => console.log(success))
    .catch((error: any) => console.log(error));

  // Log user in with Zoom username and password.
  Zoom.login(userName, password)
    .then((success: any) => console.log(success))
    .catch((error: any) => console.log(error));

  // Log user out.
  Zoom.logout()
    .then((success: boolean) => console.log(success))
    .catch((error: any) => console.log(error));

  // Check whether user is logged in.
  Zoom.isLoggedIn()
    .then((success: boolean) => console.log(success))
    .catch((error: any) => console.log(error));

  // meeting options (Only available for Android)
  let options = {
    no_driving_mode: true,
    no_invite: true,
    no_meeting_end_message: true,
    no_titlebar: false,
    no_bottom_toolbar: false,
    no_dial_in_via_phone: true,
    no_dial_out_to_phone: true,
    no_disconnect_audio: true,
    no_share: true,
    no_audio: true,
    no_video: true,
    no_meeting_error_message: true,
  };

  // Join meeting.
  Zoom.joinMeeting(meetingNumber, meetingPassword, displayName, options)
    .then((success: any) => console.log(success))
    .catch((error: any) => console.log(error));

  // // Start an existing meeting for non-login user.
  // Zoom.startMeetingWithZAK(
  //   meetingNumber,
  //   displayName,
  //   zoomToken,
  //   zoomAccessToken,
  //   userId,
  //   options
  // )
  //   .then((success: any) => console.log(success))
  //   .catch((error: any) => console.log(error));

  // // Start an existing meeting for logged in user.
  // Zoom.startMeeting(meetingNumber, vanityId, options)
  //   .then((success: any) => console.log(success))
  //   .catch((error: any) => console.log(error));

  // // Start an instant meeting for logged in user.
  // Zoom.startInstantMeeting()
  //   .then((success: anu) => console.log(success))
  //   .catch((error: any) => console.log(error));

  // // Set language.
  // Zoom.setLanguage("en-US")
  //   .then((success: any) => console.log(success))
  //   .catch((error: any) => console.log(error));
  return <div>Zoom</div>;
};

export default ZoomComponent;
