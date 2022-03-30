import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import './stripe-button.styles.scss';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey =
        'pk_test_51KiiogL0USOHfA9hGmKKMyJbj5Iv656iLUkzVEgyAAVDmxsGVuDBr8bwsIUkeUXMSZ15HDIKEBiSP7THW1EPZPfi002xC58H9G';

    const onToken = (token) => {
        console.log(token);
        alert('Payment Successful');
    };

    return (
        <StripeCheckout
            label="Pay Now"
            name="Crown Clothing"
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        ></StripeCheckout>
    );
};

export default StripeCheckoutButton;
