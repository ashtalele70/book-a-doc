<<<<<<< HEAD
import { IonApp, IonLoading } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AppTabs from "./AppTabs";
import { AuthContext, useAuthInit } from "./auth";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import DoctorProfile from "./pages/DoctorProfile";

const App: React.FC = () => {
  const { loading, auth } = useAuthInit();
  if (loading) {
    return <IonLoading isOpen />;
  }
  console.log(`rendering App with auth:`, auth);
  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
        <IonReactRouter>
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route path="/">
              <AppTabs />
            </Route>
            <Redirect exact path="/" to="/home" />
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
=======
import {
	IonApp, IonLoading,
  } from '@ionic/react';
  import { IonReactRouter } from '@ionic/react-router';
  import React from 'react';
  import { Route } from 'react-router-dom';
  import AppTabs from './AppTabs';
  import { AuthContext, useAuthInit } from './auth';
  
  const App: React.FC = () => {
	const { loading, auth } =  useAuthInit();
	if (loading) {
	  return <IonLoading isOpen />;
	}
	console.log(`rendering App with auth:`, auth);
	return (
	  <IonApp>
		<AuthContext.Provider value={auth}>
		  <IonReactRouter>
			  <Route path="/">
				<AppTabs />
			  </Route>
		  </IonReactRouter>
		</AuthContext.Provider>
	  </IonApp>
	);
  };
  
  export default App;
  
>>>>>>> bc0e2f5a7f7e1fec00a1d8edde9e20e5bd89a70b
