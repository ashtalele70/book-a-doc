// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';
import MyCheckoutForm from "./MyCheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('pk_test_pIyIr91FGLJrCF19i5YTS0G200SH7hUusd');

const Wallet = () => {
  return (
    <div></div>
    // <Elements stripe={stripePromise}>
    //   <MyCheckoutForm />
    // </Elements>
  );
};

export default Wallet;