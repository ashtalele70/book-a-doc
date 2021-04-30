import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { IonPage, IonToolbar, IonTitle } from "@ionic/react";
import React from "react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe('pk_test_pIyIr91FGLJrCF19i5YTS0G200SH7hUusd');

const Wallet: React.FC = () => {
  
  return (
    <IonPage>
      <IonToolbar>
        <IonTitle color="success">Book-A-Doc</IonTitle>
      </IonToolbar>
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
    </IonPage>
  );
};

export default Wallet;