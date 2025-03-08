import React from "react";
import "../PaypalAndShipping/PaypalAndShipping.css";
import PayPalButton from "./PayPalButton";

function PaypalAndShipping({ selectedRelease }) {
  return (
    <>
      {/* this section handles the payment options and the 'icons' will be controlled by the Buy Now button with a state called showIcons. when btn is clicked, setShowIcons is 'true' and relevant icons are displayed */}
      {/* default: hidden when true && no link present. if link present, show when showIcons is true and hide when showIcons is false */}

      {/* PAYPAL BUTTON GOES HERE */}

      <br />
      <section className="orderCD">
        You can easily order this CD by mail: Send a check or money order to $
        {selectedRelease.price || 10} and include $2.50 shipping and handling
        for the first disc. (Add $1 for each additional disc.)
        <br />
        Payments can be made out to:
        <br />
        Colin James McCaffrey
        <address>PO Box 58, Montpelier, VT 05651</address>
      </section>
    </>
  );
}

export default PaypalAndShipping;
