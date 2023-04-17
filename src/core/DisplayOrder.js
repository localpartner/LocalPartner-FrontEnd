import React, { useState, useEffect } from 'react'
import Header from './Header'
import {
  useParams,
} from "react-router-dom";
import { getOrderByOrderId } from "./apiCore";
import './loader.css';

const DisplayOrder = () => {
  const [loading, setLoading] = useState(true);

  let index = 1

  const [view, setView] = useState("");
  let { id } = useParams();

  const displayData = () => {
    getOrderByOrderId(id).then(response => {
      console.log(response.result, "response.status")
      if (response.status === 401) {
        alert("Your Token has expired. Please login again")
        
      }
      if (response === false) {
        alert(
          "error"
        );
      } else {
        setView(response.result)
        setLoading(false);
      }
    })
  };

  useEffect(() => {
    setLoading(true);
    displayData();
  }, []);


  return (
    <div>
      <div>
        <Header />
      </div>
      <div class="container">
        <article class="card" style={{ top: "30px" }}>
          <header class="card-header"><b> Order Details</b></header>
          <div class="card-body">
            {view && view.products.map((item) => (
              <div>
                <article class="card">
                  <div class="card-body row">
                    <div class="col"> <strong>Index</strong> <br></br>{index++}</div>
                    <div class="col"> <strong>Product Name</strong> <br></br> {item.code}</div>
                    <div class="col"> <strong>Quantity</strong> <br></br>{item.quantity}</div>
                    <div class="col"> <strong>Price</strong> <br></br>₹{item.unitPrice} </div>
                    <div class="col"> <strong>Total</strong> <br></br>₹{item.unitPrice * item.quantity}</div>
                  </div>
                </article>
              <br></br>
              </div>
            ))}
            <div style={{ marginBottom:"20px"}} class="row">
              <div class="col-6">
              <header class="card-header" style={{border:"1px solid rgba(0,0,0,.125)"}}><b>Shipping Address</b></header>
              <article class="card" style={{padding:"20px"}}>
              {/* <h4>Shipping Address</h4> */}
                <b>Address: {view.shippingAddress && view.shippingAddress.addressLine1} , {view.shippingAddress && view.shippingAddress.addressLine1}</b>
                <p>City : {view.shippingAddress && view.shippingAddress.city}<br></br> 
                 State : {view.shippingAddress && view.shippingAddress.state}<br></br> 
                 pincode:  {view.shippingAddress && view.shippingAddress.pincode}</p>
                </article>
              </div>
              <div class="col-6" >
              <header class="card-header" style={{border:"1px solid rgba(0,0,0,.125)"}}><b>Billing Address</b></header>
              <article class="card" style={{padding:"20px"}}>
                <b >Address: {view.billingAddress && view.billingAddress.addressLine1} , {view.billingAddress && view.billingAddress.addressLine2}</b>
                <p> City : {view.billingAddress && view.billingAddress.city}<br></br> 
                State : {view.billingAddress && view.billingAddress.state} <br></br>
                pincode: {view.billingAddress && view.billingAddress.pincode} </p>
                </article>
              </div>
            </div>
            <hr></hr>
            <a href="/orderHistory" class="btn btn-warning" data-abc="true"> <i class="fa fa-chevron-left"></i> Back to orders</a>
          </div>
        </article>
      </div>

      {/* {
        !loading ? (
          <div className='container' style={{marginTop:"20px"}}>
             <h2 style={{ backgroundColor: "#8080804f", padding: "20px !important", textAlign:"center" }}>Order Details</h2> 
            <div className='row' style={{border:"2px solid grey"}}>
              <div class="col-sm-3 col-md-6 col-lg-6" style={{ color: "black" }}>
                <h4>Shipping Address</h4>
                <b >Deliver to: {view.shippingAddress && view.shippingAddress.addressLine1} , {view.shippingAddress && view.shippingAddress.addressLine1}</b>
                <p>{view.shippingAddress && view.shippingAddress.city}, {view.shippingAddress && view.shippingAddress.state}, {view.shippingAddress && view.shippingAddress.pincode}</p>
              </div>
              <div class="col-sm-3 col-md-6 col-lg-6" style={{ color: "black" }}>
                <h4>Billing Address</h4>
                <b >Deliver to: {view.billingAddress && view.billingAddress.addressLine1} , {view.billingAddress && view.billingAddress.addressLine2}</b>
                <p> {view.billingAddress && view.billingAddress.city},  {view.billingAddress && view.billingAddress.state}, {view.billingAddress && view.billingAddress.pincode} </p>
              </div>
              <table class="col-sm-3 col-md-6 col-lg-12" style={{ color: "black", marginTop: "30px", padding: "8px", border: "1px solid #ddd" }}>

                <tr style={{ backgroundColor: "#8080804f", padding: "20px !important" }}>
                  <th>S.no.</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
                {view && view.products.map((item) => (
                  <tr>
                    <td style={{ padding: "8px", border: "2px solid #8080804a" }}>{index++}</td>
                    <td style={{ padding: "8px", border: "2px solid #8080804a" }}>{item.code}</td>
                    <td style={{ padding: "8px", border: "2px solid #8080804a" }}>{item.quantity}</td>
                    <td style={{ padding: "8px", border: "2px solid #8080804a" }}>{item.unitPrice}</td>
                    <td style={{ padding: "8px", border: "2px solid #8080804a" }}>{item.unitPrice * item.quantity}</td>
                  </tr>
                ))
                }
              </table>
            </div>
          </div>
        ) : (<>
          <div className='loading'></div>;
        </>)} */}

    </div>
  )
}

export default DisplayOrder
