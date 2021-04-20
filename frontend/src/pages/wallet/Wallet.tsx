import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { IonPage, IonContent, IonGrid, IonHeader, IonRow, IonCol, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonCard, IonImg, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton } from "@ionic/react";
import React from "react";
import MyCheckoutForm from "./MyCheckoutForm";
import MyForm from "./MyForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_pIyIr91FGLJrCF19i5YTS0G200SH7hUusd');

const Wallet: React.FC = () => {
  
  return (
    // <React.Fragment>
    // <IonHeader>
    //   <IonToolbar color="primary">
    //     <IonButtons slot="start">
    //       <IonMenuButton></IonMenuButton>
    //     </IonButtons>
    //     <IonTitle>
    //       Stripe for PWA
    //     </IonTitle>
    //   </IonToolbar>
    // </IonHeader>

    // <IonContent>
    //   <IonGrid text-center>
    //     <IonRow>
    //       <IonCol>
    //         Use this Pay button in your PWA's payment page with the attached logic.
    //       </IonCol>
    //     </IonRow>
    //   </IonGrid>
    //   <IonCard class="welcome-card">
    //     <IonImg src="/assets/stripe.png"></IonImg>
    //     <IonCardHeader>
    //       <IonCardSubtitle>Get Started</IonCardSubtitle>
    //       <IonCardTitle>Stripe Sample</IonCardTitle>
    //       <IonRow>
    //         <IonCol>Total Payment</IonCol>
    //         <IonCol> {{currencyIcon}}{{paymentAmount}} </IonCol>
    //       </IonRow>
    //     </IonCardHeader>
    //     <IonCardContent>
    //       <form action="/" method="post" id="payment-form">
    //         <div className="form-row">
    //           <div id="card-element"> a Stripe Element will be inserted here. </div>
    //           {/* Used to display Element errors */}
    //           <div id="card-errors" role="alert"></div>
    //         </div>
    //         <IonButton type="submit" color="success" expand="full">Make Payment</IonButton>
    //       </form>
    //     </IonCardContent>
    //   </IonCard>
    // </IonContent>
    // </React.Fragment>
    <IonPage>
      <IonToolbar>
        <IonTitle color="success">Book-A-Doc</IonTitle>
      </IonToolbar>
    <Elements stripe={stripePromise}>
      {/* <MyCheckoutForm /> */}
      <MyForm />
    </Elements>
    </IonPage>
  );
};

export default Wallet;