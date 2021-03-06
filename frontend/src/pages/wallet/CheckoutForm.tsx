import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import { IonButton, IonGrid, IonRow, IonContent, IonCol, IonToast, IonText } from '@ionic/react';
import { useHistory } from "react-router-dom";

const CheckoutForm = () => {
    const history = useHistory();
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
        setTimeout(() => history.push('/home'), 1000);
      }
      setShowAlert(true);
    };
  
    return (
      <IonContent>
          <IonGrid className='paymentForm'>
            <IonText color="secondary" className="ion-text-center">
                <h3>Complete Payment</h3>
            </IonText>
              <IonText color="tertiary" className="ion-text-center">
                <h6>Consultation Fee: $15.00</h6>
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

export default CheckoutForm;