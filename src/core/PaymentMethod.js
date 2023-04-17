import React,{useState} from 'react';
import {useRecoilState, useRecoilValue } from "recoil";
import { shippingAddressState, billingAddressState, productListState, paymentMethodState } from "../recoil/atom/placeOrderState";
import axios from 'axios';


const PaymentMethod = () => {
  let total = 0
  let Item = []

  const productList = useRecoilValue(productListState)
  console.log("Payment : ", productList);

  if (productList) {
    Item = productList.map((pred) => {
        total = parseInt(total) + parseInt(pred.unitPrice * pred.units)
    }
    )
}

  // for razorpay ..............................................//
  const [disable, setDisable] = React.useState(true);
  const [loading, setLoading] = useState(false);
  // for razorpay ..............................................//

  const [paymentDetails, setPaymentDetails] = useRecoilState(paymentMethodState)
  const initialFormData = Object.freeze({
    paymentType:"",
    paymentCardHolderName: "",
    paymentCardNumber:"",
    validmonth:"",
    paymentAmount:"",
    cvv:"",
   
  });

  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    setPaymentDetails(formData)
    setDisable(false)
    // ... submit to API or something
  };

// for razorpay ..............................................//

  function loadRazorpay() {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => {
      alert('Razorpay SDK failed to load. Are you online?');
    };
    script.onload = async () => {
      try {
        setLoading(true);
        const result = await axios.post('http://localhost:5000/create-order', {
          amount: total *100,
          currency:'INR',
          name: 'example name',
          description: 'example transaction',
          order_id: 50
        });
        console.log(result+"Order")

        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get('http://localhost:5000/get-razorpay-key');

        const options = {
          key: razorpayKey,
          amount: amount,
          currency: currency,
          name: 'example name',
          description: 'example transaction',
          order_id: order_id,                                                                                                                                                                     
          handler: async function (response) {
            const result = await axios.post('http://localhost:5000/pay-order', {
              amount: total*100,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              address: response.razorpay_address,
            });
           
          },
          prefill: {
            name: 'example name',
            email: 'email@example.com',
            contact: '111111',
          },
          notes: {
            address: 'example address',
          },
          theme: {
            color: '#80c0f0',
          },
        };  

        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        
        alert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
    setDisable(false)
  }
// for razorpay ..................end............................//

  return (
    <div>
      <div class="card ">
        <div class="card-header" id="headingThree" style={{ backgroundColor: "#2874f0" }}>
          <h2 class="mb-0">
            <button class="btn btn-link btn-block text-left collapsed" type="button" style={{ color: "white", textDecoration: "none", }}>
              <b>3 PAYMENT OPTION</b>
            </button>
          </h2>
        </div>
        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
          <div class="card-body" style={{ color: "black" }}>
            {/* <form>
             <div className='container'>
              <div class="form-row">
              <div class="form-group col-md-12">
                  <label for="inputState">Type</label>
                  <select id="inputState" class="form-control" name="paymentType"  onChange={handleChange}>
                    <option selected>Choose...</option>
                    <option value="creditCard">Credit Card</option>
                    <option value="debitCard">Debit Card</option>
                  </select>
                 
                </div>
                <div class="form-group col-md-6">
                  <label for="inputHolderName">Card Holder Name</label>
                  <input type="text" class="form-control" id="inputHolderName" name="paymentCardHolderName" placeholder=" Enter Card Holder Name"  onChange={handleChange}/>
                  
                </div>
                <div class="form-group col-md-6">
                  <label for="inputCardNumber">Card Number</label>
                  <input type="number" class="form-control" id="inputCardNumber" name="paymentCardNumber" placeholder=" Enter Card Number" onChange={handleChange}/>
            
                </div>
              </div>
              <div class="form-row">
              <div class="form-group col-md-3">
              <label for="inputMonth">Valid Through</label>
                <input type="month" class="form-control" id="inputMonth" name="validmonth" placeholder="Month" onChange={handleChange}/>
                
              </div>
              <div class="form-group col-md-3">
              <label for="inputYear">Amount</label>
                <input type="number" class="form-control" name="paymentAmount" placeholder="Amount" onChange={handleChange}/>
               
              </div>
              <div class="form-group col-md-4">
              <label for="inputCVV"> CVV </label>
                <input type="text" class="form-control" id="inputCVV" name="cvv" placeholder="Enter CVV" onChange={handleChange}/>
              
              </div>
              </div>
              <button type="submit" onClick={handleSubmit} class="btn btn-primary">Submit</button>
              <button class="btn btn-primary btn-lg btn-block" disabled={loading} onClick={loadRazorpay}>Proceed to payment</button>
              </div>
            </form> */}
              <button type="submit"  class="btn btn-danger" disabled={loading} onClick={loadRazorpay}>Proceed to payment</button>


            <div style={{ marginBottom: "30px" }}>
              <button type="button" disabled={disable} data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" class="btn btn-primary float-right ml-4">Next</button>
              <button type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" class="btn btn-primary float-right">Previous</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethod
