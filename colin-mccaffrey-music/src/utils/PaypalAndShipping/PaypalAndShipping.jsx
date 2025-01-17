import React from 'react'
import '../PaypalAndShipping/PaypalAndShipping.css';

function PaypalAndShipping({props}) {
  return (
    <section className="orderCD">
     You can easily order this CD by mail: 
     Send a check or money order to 
     ${props.price || 10} and include $2.50 shipping and handling 
     for the first disc. (Add $1 for each additional disc.)
     <br />
     Payments can be made out to:
     <br/> 
     Colin James McCaffrey
     <address>PO Box 58, Montpelier, VT 05651</address>
     </section>
  )
}

export default PaypalAndShipping
