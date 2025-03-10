import React, { useEffect, useRef } from "react";
import "../PaypalAndShipping/PaypalAndShipping.css";

function PaypalAndShipping({ selectedRelease }) {
  const paypal = useRef();

  useEffect(() => {
    let paypalButton;
    if (selectedRelease && selectedRelease.hostedButtonId) {
      paypalButton = window.paypal.HostedButtons({
        hostedButtonId: selectedRelease.hostedButtonId,
      });
      paypalButton.render(paypal.current);
    }
    return () => {
      if (paypal.current) {
        paypal.current.innerHTML = "";
      }
    };
  }, [selectedRelease]);

  return (
    <>
      {/* PAYPAL BUTTON GOES HERE */}
      <div ref={paypal}></div>
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
