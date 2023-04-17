import React from 'react';
import { useForm } from 'react-hook-form';

const PaymentMethods = () => {
   const { register } = useForm();

   return (
        <>
            <p>
                <input type="radio" id="test3" value="1"  name="paymentType" {...register("paymentType")} defaultChecked="checked" readOnly={true}/>
                <label className="direct_bank" htmlFor="test3">Direct Bank Transfer
                <span className="small-text">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</span>
                </label>
            </p>
            <p>
                <input type="radio" id="test4" value="2" name="paymentType" {...register("paymentType")} readOnly={true}/>
                <label htmlFor="test4">Cheque Payments
                <span className="small-text">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</span>
                </label>
            </p>
            <p>
                <input type="radio" id="test5" value="3" name="paymentType" {...register("paymentType")} checked={true}/>
                <label htmlFor="test5">Cash On Delivery
                <span className="small-text">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</span>
                </label>
            </p>
            <p>
                <input type="radio" id="test6" value="4" name="paymentType" {...register("paymentType")} defaultChecked="cashOnDeliver" readOnly={true} />
                <label htmlFor="test6">Pay Pal</label>
            </p>
            
        </>
        
   );
};

export default PaymentMethods;
