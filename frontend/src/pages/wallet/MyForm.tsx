import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import {IonLabel, IonButton, IonGrid, IonRow, IonContent, IonCol, IonAlert } from '@ionic/react';

const MyForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMesage] = useState("");
  
    const handleSubmit = async (event) => {
      // Block native form submission.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
  
      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const cardElement = elements.getElement(CardElement);
  
      // Use your card Element with other Stripe.js APIs
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
  
      if (error) {
        //console.log('[error]', error);
        //setAlertMesage(error);
      } else {
        setAlertMesage("Payment Successful!");
        //console.log('[PaymentMethod]', paymentMethod);
      }
      setShowAlert(true);
    };
  
    return (
      <IonContent>
          <IonGrid >
              <IonRow className="ion-justify-content-center ion-padding-top">
                <IonCol size="5">
                    <CardElement
                        options={{
                            style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                            },
                        }}
                    />
                    </IonCol>
              </IonRow>
              <IonRow className="ion-justify-content-center">
                  <IonCol size="1">
                    <IonButton type="submit" disabled={!stripe} onClick={handleSubmit}>
                    Pay
                    </IonButton>
                    <IonAlert
                        isOpen={showAlert}
                        onDidDismiss={() => setShowAlert(false)}
                        cssClass='paymentAlert'
                        header={alertMessage == 'Payment Successful!' ? 'Thank you!' : 'Oops'}
                        subHeader={''}
                        message={alertMessage}
                        buttons={['OK']}
                    />
                    </IonCol>
              </IonRow>
          </IonGrid>
      </IonContent>
    );
};

export default MyForm;