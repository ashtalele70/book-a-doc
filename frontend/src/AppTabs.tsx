import {
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
  } from '@ionic/react';
  import { search as homeIcon, settings as settingsIcon, personCircleOutline, timeOutline } from 'ionicons/icons';
  import React from 'react';
  import { Redirect, Route } from 'react-router-dom';
  import { useAuth } from './auth';
  import AppointmentsPage from './pages/AppointmentsPage';
  import HomePage from './pages/HomePage';
  import LoginDoctorPage from './pages/LoginDoctorPage';
  import LoginPage from './pages/LoginPage';
  import LoginSignUpPage from './pages/LoginSignUpPage';
  import PatientProfilePage from './pages/PatientProfilePage';
  import RegisterDoctorPage from './pages/RegisterDoctorPage';
  import RegisterPage from './pages/RegisterPage';
  import SettingsPage from './pages/SettingsPage';
  
  const AppTabs: React.FC = () => {
	const { loggedIn } = useAuth();
	// if (!loggedIn) {
	//   return <Redirect to="/home" />;
	// }
	return (
	  <IonTabs>
		<IonRouterOutlet>
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
		</IonRouterOutlet>
		<IonTabBar slot="bottom">
		  <IonTabButton tab="home" href="/home">
			<IonIcon icon={homeIcon} />
			<IonLabel>Search</IonLabel>
		  </IonTabButton>
		  
		  
		  <IonTabButton tab="appointments" href="/appointments">
			<IonIcon icon={timeOutline} />
			<IonLabel>Appointments</IonLabel>
		  </IonTabButton>
		  { !loggedIn && <IonTabButton tab="login-signup" href="/login-signup">
			<IonIcon icon={personCircleOutline} />
			<IonLabel>Sign Up/ Login</IonLabel>
		  </IonTabButton>}
		  { loggedIn && <IonTabButton tab="settings" href="/settings">
			<IonIcon icon={settingsIcon} />
			<IonLabel>Settings</IonLabel>
		  </IonTabButton>}
		</IonTabBar>
	  </IonTabs>
	);
  };
  
  export default AppTabs;
  