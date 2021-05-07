import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import {
  search as homeIcon,
  settings as settingsIcon,
  personCircleOutline,
  timeOutline,
  folderOpenOutline,
  peopleOutline,
  analyticsOutline,
} from "ionicons/icons";
import React, { useState, useEffect } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { useAuth } from "./auth";
import AppointmentsPage from "./pages/AppointmentsPage";
import HomePage from "./pages/HomePage";
import LoginDoctorPage from "./pages/LoginDoctorPage";
import LoginPage from "./pages/LoginPage";
import LoginSignUpPage from "./pages/LoginSignUpPage";
import PatientProfilePage from "./pages/PatientProfilePage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import RegisterDoctorPage from "./pages/RegisterDoctorPage";
import RegisterPage from "./pages/RegisterPage";
import SettingsPage from "./pages/SettingsPage";
import DoctorFeedback from "./pages/DoctorFeedback";
import ZoomComponent from "./pages/ZoomMeeting";
import Wallet from "./pages/wallet/Wallet";
import DoctorProfile from "./pages/DoctorProfile";
import PatientFeedback from "./pages/PatientFeedback";
import DoctorHomePage from "./pages/DoctorHomePage";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import { toUser, User } from "./models/user";
import axios from "axios";
import { rooturl } from "./config";
import PatientHistory from "./pages/PatientHistory";

const AppTabs: React.FC = () => {
  const { loggedIn, userId } = useAuth();
  const [user, setUser] = useState<User>();

  useEffect(() => {
	  if(loggedIn) {
		let userData = new URLSearchParams();
		userData.set("id", userId);
	
		axios.get(rooturl + "/getUser?" + userData.toString()).then((res) => {
		  if (res.status === 200) {
			setUser(toUser(res.data));
		  }
		});

	  }
    
  }, [userId, loggedIn]);

//   useEffect(() => {

// 	sessionStorage.setItem("isAdmin", user?.isAdmin?.toString());
// 	sessionStorage.setItem("isPatient", user?.isPatient?.toString());

//   }, [user]);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          <Redirect exact path="/" to="/home" />
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/settings">
            <SettingsPage />
          </Route>
          <Route exact path="/login-signup">
            <LoginSignUpPage />
          </Route>
          <Route exact path="/appointments">
            <AppointmentsPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/loginDoctor">
            <LoginDoctorPage />
          </Route>
          <Route exact path="/registerDoctor">
            <RegisterDoctorPage />
          </Route>
          <Route exact path="/patientProfile">
            <PatientProfilePage />
          </Route>
          <Route exact path="/doctorProfile">
            <DoctorProfilePage />
          </Route>
          <Route exact path="/zoom">
            <ZoomComponent />
          </Route>
          <Route exact path="/payment">
            <Wallet />
          </Route>
          <Route exact path="/viewProfile">
            <DoctorProfile />
          </Route>
          <Route exact path="/patientFeedback">
            <PatientFeedback />
          </Route>
          <Route exact path="/feedback">
            <DoctorFeedback />
          </Route>
          <Route exact path="/doctorHome">
            <DoctorHomePage />
          </Route>
          <Route exact path="/patientHistory">
            <PatientHistory />
          </Route>
          {/* {loggedIn && sessionStorage.getItem("isAdmin") == "true" && ( */}
			{loggedIn && (
            <Route exact path="/admin">
              <Admin />
            </Route>
          )}
          {!loggedIn && (
            <Route exact path="/loginAdmin">
              <AdminLogin />
            </Route>
          )}
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
	  {(!loggedIn || (user?.isPatient && !user?.isAdmin))&& (
	  	<IonTabButton tab="home" href="/home">
          <IonIcon icon={homeIcon} />
          <IonLabel>Search</IonLabel>
        </IonTabButton>
	  )}
        {/* {loggedIn && sessionStorage.getItem("isPatient") == "false" && ( */}
			{loggedIn && !user?.isPatient && (
          <IonTabButton tab="doctorHomec" href="/doctorHome">
            <IonIcon icon={analyticsOutline} />
            <IonLabel>Patient Summary</IonLabel>
          </IonTabButton>
        )}
        {/* {loggedIn && sessionStorage.getItem("isPatient") == "false" && ( */}
			{loggedIn && !user?.isPatient && (
          <IonTabButton tab="patientHistory" href="/patientHistory">
            <IonIcon icon={peopleOutline} />
            <IonLabel>Patient History</IonLabel>
          </IonTabButton>
        )}

		{loggedIn && user?.isAdmin && (
          <IonTabButton tab="adminHome" href="/admin">
            <IonIcon icon={peopleOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
        )}
        {/* {loggedIn && sessionStorage.getItem("isAdmin") == "false" && ( */}
			{loggedIn && !user?.isAdmin && (
          <IonTabButton tab="appointments" href="/appointments">
            <IonIcon icon={timeOutline} />
            <IonLabel>Appointments</IonLabel>
          </IonTabButton>
        )}

        {loggedIn && (
          <IonTabButton tab="settings" href="/settings">
            <IonIcon icon={settingsIcon} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        )}

        {!loggedIn && (
          <IonTabButton tab="login-signup" href="/login-signup">
            <IonIcon icon={personCircleOutline} />
            <IonLabel>Sign Up/ Login</IonLabel>
          </IonTabButton>
        )}
      </IonTabBar>
    </IonTabs>
  );
};

export default AppTabs;
