import React, { useEffect, useState } from 'react'
import Header from './Header'
import { getOrderDetails } from "./apiCore";
import { AiFillEye } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { deleteOrder } from "./apiCore";
import swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import DisplayOrder from './DisplayOrder';
import { useHistory } from "react-router-dom";
import './loader.css';



const OrderHistory = () => {
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  const whitebox = {
    background: " #fff",
    padding: "25px",
    marginBottom: "30px",
    border: "none",
    borderRadius: "8px"
  };

  const wrapper = {
    background: "#f4f8f9",
    paddingBottom: "60px",
    paddingTop: "145px"
  };

  const [orders, setOrders] = useState([]);
  console.log(orders,"sjkjkdsjk")

  const orderHistory = () => {
    getOrderDetails().then((res) => {
      console.log(res, "responsedata")
      if (res.status === 401) {
        alert("Your Token has expired. Please login again")
        history.push("/")
      }
      if (res == false) {
        alert(
          "error"
        );
      }
      setOrders(res.result)
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    orderHistory();
  }, []);

  if (orders.length === 0 ) {
    return (
      <>
      <Header/>
      <div> Please order </div>
      </>
    )
  }

  // const handleDelete = (event) => {
  //   console.log(event.target.value, "orders")
  //   let orderId = event.target.value
  //   deleteOrder(orderId).then(response => {
  //     console.log(response, "response.status")
  //   })
  //   // await cancelOrder();

  // }

  const handleDelete = (event) => {
    let orderId = event.target.value
    swal.fire({
      title: 'Do you really want to cancel your order?',
      text: "If so, please click 'Yes' to proceed with the cancellation",
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrder(orderId).then(response => {
          console.log(response, "response.status")
          window.location.reload("")
        })
      }
    })
  }

  const DisplayOrder = (event) => {
    console.log(event, "jsdyhjh")
    let oredrId = event
    history.push(`/displayorder${oredrId}`);
  }

  const getDate = (date) => {
    const newDate = date.split('T')[0];
    const DATE = newDate.split('-');
    return DATE[2] + '-' + DATE[1] + '-' + DATE[0];
}

  return (
    <div>
      <Header />

      {/* <div class="container">
    <article class="card" style={{top:"30px"}}>
        <header class="card-header"> My Orders </header>
        <div class="card-body">
        {orders.map((order) => (
              <div>
              <h6>Order ID: #{order.orderId}</h6>
              <article class="card">
                  <div class="card-body row">
                      <div class="col"> <strong>Date</strong> <br></br>02 feb 2023 </div>
                      <div class="col"> <strong>Payment Type</strong> <br></br> {order.paymentDetails && order.paymentDetails.paymentType}</div>
                      <div class="col"> <strong>Amount</strong> <br></br> ₹ {order.orderTotal}</div>
                      <div class="col"> <strong>Status</strong> <br></br> {order.orderStatus} </div>
                      <div class="col"> <strong>Action</strong> <br></br>
                      <button type="button" class="btn btn-info" ><AiFillEye/></button>
                      <button type="button" class="btn btn-danger" style={{marginLeft:'10px'}} value={order.orderId} onClick={(event) => handleDelete( event)}>Cancel</button> </div>
                  </div>
              </article>
              <hr/>
              </div>
        ))}
        <a href="#" class="btn btn-warning" data-abc="true"> <i class="fa fa-chevron-left"></i> Back to orders</a>  
        </div> 
    </article>
    </div> */}
      {!loading ? (
        <div style={wrapper}>
          <div style={whitebox}>
            <div style={{ marginBottom: "10px", padding: "10px", width: "90%", margin: "auto" }}><label for="search-bar-0" class="search-label"><span id="search-bar-0-label" class="sr-only">Search this table</span>
              <input id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" class="form-control " placeholder="Search" /></label></div>
            <table class="table table-striped" style={{ textAlign: 'center', width: "90%", margin: "auto", border: "1px solid #8080802b" }}>
              <thead>
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Date</th>
                  <th scope="col">Payment Type</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr>
                    <td >#{order.orderId}</td>
                    <td >{getDate(order.createdAt)}</td>
                    {/* <td>{order.paymentDetails && order.paymentDetails.paymentType}</td> */}
                    <td>Razorpay</td>
                    <td> ₹ {order.orderTotal}</td>
                    <td>{order.orderStatus}</td>
                    <OverlayTrigger overlay={<Tooltip><span style={{ backgroundColor: 'blue !important' }}>Display Order</span></Tooltip>}>
                      <span >
                        <button type="button" class="btn btn-info" style={{ marginTop: "6px" }} onClick={() => DisplayOrder(order.orderId)}><AiFillEye /></button>
                      </span>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip><span style={{ backgroundColor: 'blue !important' }}>Cancel Order</span></Tooltip>}>
                      <span >
                        <button type="button" class="btn btn-danger" style={{ marginLeft: '10px', marginTop: "6px" }} value={order.orderId} onClick={(event) => handleDelete(event)} ><MdCancel /></button>
                      </span>
                    </OverlayTrigger>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          <div className='loading'></div>;
        </>
      )}
    </div>

  )
}

export default OrderHistory
