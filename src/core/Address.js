import React, { useEffect, useState } from 'react'
import Header from './Header'
import { postcustomeraddress, getAddressMobile, getcustomeraddress } from "./apiCore";

import { setManageAddress } from "../recoil/atom/setManageAddress";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import AddNewAddress from "./AddNewAddress";
import PlaceOrder from './PlaceOrder.js';
import OrderSummary from './OrderSummary';
import PaymentMethod from './PaymentMethod';
import { useHistory  } from "react-router-dom"
import {useRecoilState, useRecoilValue } from "recoil";
import { billingAddressState,shippingAddressState, paymentMethodState,productListState } from "../recoil/atom/placeOrderState";



const Address = (props) => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    addressType: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });
  const [showAddress, setShowAddress] = useState(true);
  const params = useParams();
  console.log(values, "values");
  const [isActive, setIsActive] = useState(false);
  const [userInfo1, setUserInfo] = useState([]);
  const [Check, setCheck] = useState(false);
  const [selectAdd, setSelectAdd] = useState(false)
  const [selectedValue, setSelectedValue] = useState('');
  const [error, setError] = useState('');
  const [disable, setDisable] = React.useState(true);
  console.log(Check, "check");
  const history = useHistory();
  const [shippingAddress, setShippingAddress] = useRecoilState(shippingAddressState)
  const [billingAddress, setBillingAddress] = useRecoilState(billingAddressState)
 
  const listOfUserInfo = () => {
    getAddressMobile().then((res) => {
      console.log(res.data, "responsedata")
      setUserInfo(res.data);
      // console.log(res.data._id,"jfsdkhf")
     
    });
  };

  useEffect(() => {
    listOfUserInfo();
  }, []);

  function handleAdd() {
    history.push("/user/address")
   // setShowAddress(!showAddress);
  }

  function handleRecordAdded(address) {
    setShowAddress(true)
  }
  console.log(userInfo1, "userinfoo")

  const update = (event) =>{
    console.log(event.target.id)
    localStorage.setItem('id',event.target.id )
    history.push("/user/updateaddress")
    }

  const selectedAddress = (event,selectedAdd,type)=>{
    setDisable(false)
    if(event.target.checked ===true){
      if(type==="Shipping"){
        setShippingAddress(selectedAdd)
      }
      else{
        setBillingAddress(selectedAdd)
      }
    }
  }

  

  console.log(selectAdd)

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedValue) {
      setError('Please select an option');
    } else {
      setError('');
      // submit form data
    }
  };
  return (        
    <React.Fragment>
      {/* <Header/> */}
      <div className="col-lg-12 mx-auto w-70 p-3  text-white " onSubmit={handleSubmit}>
        <div class="accordion" id="accordionExample">
          <div class="card">
            <div class="card-header" id="headingOne" style={{ backgroundColor: "#2874f0" }}>
              <h2 class="mb-0">
                <button class="btn btn-link btn-block text-left" type="button"  style={{ color: "white", textDecoration: "none", }}>
                  <b>1 SHIPPING ADDRESS</b>
                </button>
              </h2>
            </div>
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
              <div class="card-body">

                <div id="headingOne" style={{ padding: "10px" }}>
                  <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{ color: "black", textDecoration: "none", }}>
                      {/* <b>Deliver to: {userInfo1.firstname}, {userInfo1.mobile}</b>
                      {userInfo1.addresses && userInfo1.addresses.map(user => { */}
                    </button>
                  </h2>
                  {
                        userInfo1.map((user) => {
                          return (
                            <>
                            <div style={{color:"black"}}  
                            // onClick = {selectedAddress}
                            onChange={(e) => selectedAddress(e,user,"Shipping")} >
                             <input type="radio" name="select" value={JSON.stringify(user)} style={{marginRight:"10px"}} required></input>
                              <b >Deliver to: {user.fname}, {user.mobile} <span style={{ background: "#f0f2f5", padding: "4px 8px" }}>{user.nickname}</span></b>
                             <button  id={user._id} onClick = {update} style={{float:"right",color:"blue", border:"none", background:"none"}}>Edit</button>
                              <p style={{marginLeft:"20px"}}>{user.address}, {user.city},  {user.state}, {user.pincode} </p>
                             <br></br>
                             {/* {
                              selectAdd ? (
                                <button>Deliver here</button>
                              ):null
                             } */}
                          
                             </div>
                            </> 
                          )
                          
                        })}
                  {/* <div> <br></br>
                    <input type="checkbox" onChange={(e) => setCheck(e.target.checked)} />
                    <label><b style={{ color: "black" }}> Shipping address is same as billing address</b></label>
                  </div> */}
                  <div className="addresslink">
                    <Link className="address" onClick={() => handleAdd()}>
                      <MdAdd className="addicon" /><b>ADD A NEW ADDRESS</b>
                    </Link>
                  </div>
                  {showAddress == false ? (
                    <AddNewAddress recordAdded={handleRecordAdded} />
                  ) : null}

                </div>
                
                  <button class="btn btn-primary float-right" disabled={disable}  onClick={selectedAddress}
                  type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style={{ marginTop: "20px", marginBottom:"17px"}}>
                  Next
                </button>
                
               
              </div>
            </div>
          </div>
          <br></br>
          <div class="card">
            <div class="card-header" id="headingTwo" style={{ backgroundColor: "#2874f0" }}>
              <h2 class="mb-0">
                <button class="btn btn-link btn-block text-left collapsed" type="button" style={{ color: "white", textDecoration: "none", }}>
                  <b>2 BILLING ADDRESS</b>
                </button>
              </h2>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
              <div class="card-body">
                {/* <h1>Billing Address</h1> */}
                {
                        userInfo1.map((user) => {
                          return (
                            <>
                            <div style={{color:"black"}}  
                            // onClick = {selectedAddress}
                            onChange={(e) => selectedAddress(e,user,"Billing")} >
                             <input type="radio" name="select" value={JSON.stringify(user)}  style={{marginRight:"10px"}} ></input>
                              <b >Deliver to: {user.fname}, {user.mobile} <span style={{ background: "#f0f2f5", padding: "4px 8px" }}>{user.nickname}</span></b>
                             <button  id={user._id} onClick = {update} style={{float:"right",color:"blue", border:"none", background:"none"}}>Edit</button>
                              <p>{user.address}, {user.city},  {user.state}, {user.pincode} </p>
                             <br></br>
                             {/* {
                              selectAdd ? (
                                <button>Deliver here</button>
                              ):null
                             } */}
                          
                             </div>
                            </> 
                          )
                          
                        })}

               
                       <div style={{ marginBottom:"30px"}}>
                        
                       <button type="button" disabled={disable} data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" class="btn btn-primary float-right ml-4">Next</button>
                  <button type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" class="btn btn-primary float-right">Previous</button>
                </div>
                 
                       
                       
              </div>
            </div>
          </div>
          <br></br>
          <PaymentMethod />
          <br></br>
          <OrderSummary />
        </div>
      </div>


    </React.Fragment>
  )
}

export default Address



