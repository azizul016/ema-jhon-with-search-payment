import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCartForm from './SimpleCartForm';
import SplitCardForm from './SplitCardForm';


const stripePromise = loadStripe('pk_test_51HZgZlJTe3qbqZDwAuyT5832sJXlwDNEO1szzknvgNr06qSbEFr2PT5rJfuuMRJpUG2mX32cFRsmMIaz1Ny7oGUS00BxV44QNE');

const ProcessPayment = ({ handlePayment }) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCartForm handlePayment={handlePayment}></SimpleCartForm>
        </Elements>
    );
};

export default ProcessPayment;