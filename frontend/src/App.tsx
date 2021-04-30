import { IonApp, IonLoading } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Route } from "react-router-dom";
import AppTabs from "./AppTabs";
import { AuthContext, useAuthInit } from "./auth";
import { Helmet } from "react-helmet";

const App: React.FC = () => {
  const { loading, auth } = useAuthInit();
  if (loading) {
    return <IonLoading isOpen />;
  }
  console.log(`rendering App with auth:`, auth);
  return (
    <IonApp>
      <Helmet>
        <title>Book-A-Doc</title>
        <meta
          name="description"
          content="This app allows patients to meet doctors online at any time of the day. They can either book an appointment or speak to the doctor instantly if the doctor is availble. The can search for doctors based on illness and video chat with doctor for 30 minutes  "
        />
        <script src="snippet.js" type="application/ld+json" />
      </Helmet>
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
