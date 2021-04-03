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
  