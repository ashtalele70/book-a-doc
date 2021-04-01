import {
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
  } from '@ionic/react';
  import { home as homeIcon, settings as settingsIcon, personCircleOutline } from 'ionicons/icons';
  import React from 'react';
  import { Redirect, Route } from 'react-router-dom';
  import { useAuth } from './auth';
  import HomePage from './pages/HomePage';
  import LoginSignUpPage from './pages/LoginSignUpPage';
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
		</IonRouterOutlet>
		<IonTabBar slot="bottom">
		  <IonTabButton tab="home" href="/home">
			<IonIcon icon={homeIcon} />
			<IonLabel>Home</IonLabel>
		  </IonTabButton>
		  <IonTabButton tab="login-signup" href="/login-signup">
			<IonIcon icon={personCircleOutline} />
			<IonLabel>Sign Up/ Login</IonLabel>
		  </IonTabButton>
		  <IonTabButton tab="settings" href="/settings">
			<IonIcon icon={settingsIcon} />
			<IonLabel>Settings</IonLabel>
		  </IonTabButton>
		</IonTabBar>
	  </IonTabs>
	);
  };
  
  export default AppTabs;
  