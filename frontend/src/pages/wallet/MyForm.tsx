import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import {IonLabel, IonButton, IonGrid, IonRow, IonContent, IonCol, IonToast, IonText } from '@ionic/react';

const MyForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      const cardElement = elements.getElement(CardElement);
  
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
  
      if (error) {
        setAlertMessage(error.message);
      } else {
        setAlertMessage("Payment Successful.");
      }
      setShowAlert(true);
    };
  
    return (
      <IonContent>
          <IonGrid className='paymentForm'>
            <IonText color="secondary" className="ion-text-center">
                <h3>Complete Payment</h3>
            </IonText>
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
                    <IonToast
                        isOpen={showAlert}
                        onDidDismiss={() => setShowAlert(false)}
                        message={alertMessage}
                        color={alertMessage == 'Payment Successful.' ? 'success' : 'danger'}
                        duration={1000}
                    />
                    </IonCol>
              </IonRow>
          </IonGrid>
      </IonContent>
    );
};

export default MyForm;