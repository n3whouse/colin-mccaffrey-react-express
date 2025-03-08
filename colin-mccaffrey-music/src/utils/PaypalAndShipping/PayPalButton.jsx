import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PortableText } from "@portabletext/react";
import DOMPurify from "dompurify";

function PayPalButton({ selectedRelease }) {
  return (
    <>
      {/* This needs to be written into a PortableText by way of adding a "Paypal" field to the New Release fieldset in "Releases" object, so that buttons can be copied in in this format and "PayPalButtons" probably covers any other kinds */}

      <script src="https://www.paypal.com/sdk/js?client-id=BAA5crOsb-xXNCjuzA2VY-eS7Oj_B6Mo28dicfXYUsK6uH5QzEr5ORQNr47_fg0PbgmUL6Zd5ctaKuPoZg&components=hosted-buttons&enable-funding=venmo&currency=USD"></script>
      <div id="paypal-container-UWJR6JFLGWZMU"></div>
    </>
  );
}

export default PayPalButton;
