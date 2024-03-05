import * as React from 'react';

export const PricingPage = () => {
  const email = localStorage.getItem("account-email");

  return (
    <stripe-pricing-table
      pricing-table-id="prctbl_1OpT1dJLbW0QVEc9uGbT0Q0k"
      publishable-key="pk_test_51KBYkQJLbW0QVEc9dSkB5oLc2VLDIzxFpsW2IiierSXmIjkgsgaTak02IMBgwTFK3liAej5uZqlbBiG4fDGFmCXY00a99bQYNB"
      customer-email={email}
    >
    </stripe-pricing-table>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export default PricingPage;
