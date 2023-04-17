import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../common/utils';
import Layout from './Layout';
import { cartFetchData, cartList} from '../recoil/carts/cartHelpers';
import { useRecoilValue  } from 'recoil';
import YourOrder from './YourOrder';
import { useForm } from "react-hook-form";
import { createOrder, removeCartItems, getCartList } from './apiCore';
import OrderInfo from "./OrderInfo"
import PaymentMethods from './PaymentMethods';
import SelectAddress from './selectAddresses';
import { Link } from "react-router-dom";
import { MdAdd } from 'react-icons/md';
import AddNewAddress from "./AddNewAddress";
import { readAddress } from "../customer/apiUser";
import { useRecoilState } from "recoil";
import { setManageAddress } from "../recoil/atom/setManageAddress";
import { useHistory } from 'react-router-dom';

const Checkout = () => {
   const { handleSubmit, formState : {errors} } = useForm();
   //payment
   const { cartData, total } = useRecoilValue(cartFetchData);
   const [cartItem, setCartItem] = useRecoilState(cartList);
   const { user ,token } = isAuthenticated();
   const userId = user._id;
   const [ showAddress, setShowAddress] = useState(true);
   const [ userInfo ,setUserInfo] = useRecoilState(setManageAddress)
   const [ address ,setAddress] = useState(null)//for show selected addressId
   let history = useHistory()
   function handleAdd() {
      setShowAddress(!showAddress);
   }

   function handleRecordAdded() {
      setShowAddress(true)
   }

   useEffect(() => {
      listOfUserInfo()
      listOfCartInfo()
   }, []);

   const listOfUserInfo = () => {
      readAddress(user._id, token).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setUserInfo(data);
          }
      });
   };
   
  
   const listOfCartInfo = () => {
      getCartList(user._id).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
          setCartItem(data);
        }
      });
   };

   const placeOrderOnClick =()=>{
      const createOrderData = {
         products: cartData,
         transaction_id: "123",
         amount: total,
         addressId: address,
         user : userId
      };
      createOrder(userId, token, createOrderData)
      .then(response => {
         console.log(response)
      }) 
      removeCartItems(userId).then(data => {
         if (data.error) {                  
           console.log(data.error);
         } else {
           listOfCartInfo()
         }
      });
      history.push('/user/orders')
   }

   return (
      <Layout
      title=""
      description=""
      className="container-fluid"
      >
          <div className='row'>
         <div className="bz_inner_page_navigation float_left">
            <div className="container custom_container">
               <div className="inner_menu float_left">
                  <ul>
                     <li><a href="#"> <span><i className="fas fa-home"></i></span> </a></li>
                     <li className="active"><a href="#"> <span><i className="fas fa-angle-right"></i></span> Checkout</a></li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="bz_product_grid_content_main_wrapper float_left">
            <div className="container custom_container">
               <div className="row">
                  <div className="col-lg-8 col-md-12 col-12">
                     <div className="bz_checkout_main_wrapper float_left">
                        <div className="accordion" id="accordionExample">
                           <div className="card checkout_accord">
                              <div className="card-header" id="headingTwo">
                                 <h2 className="mb-0">
                                    <button type="button" className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo">Order Information <span><i className="fa fa-minus"></i></span> </button>
                                 </h2>
                              </div>
                              <div id="collapseTwo" className="collapse show bg-white" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                 <OrderInfo/>
                              </div>
                           </div>
                           {userInfo.length > 0 ?
                              <div className="card checkout_accord">
                                 <div className="card-header" id="headingThree">
                                    <h2 className="mb-0">
                                       <button type="button" className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree"> Delivery Address<span><i className="fa fa-plus"></i></span> </button>                     
                                    </h2>
                                 </div>
                                 <div id="collapseThree" className="collapse bg-white" aria-labelledby="headingThree" data-parent="#accordionExample">
                                    <SelectAddress getSelectedAddress={setAddress}/>
                                    <div className="addresslink">
                                       <Link className="address" onClick={() => handleAdd()}>
                                          <MdAdd className="addicon"/><b>ADD A NEW ADDRESS</b>
                                       </Link> 
                                    </div>
                                    {showAddress == false ?(
                                          <AddNewAddress customer={user._id} recordAdded={handleRecordAdded} />
                                    ):null}
                                 </div>
                              </div>
                              :
                              <div className="card checkout_accord" style={{border:'none'}}>
                                 <div className="card-header" id="headingThree">
                                    <h2 className="mb-0">
                                       <button type="button" onClick={() => handleAdd()} className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree"> Delivery Information <span><i className="fa fa-plus"></i></span> </button>                     
                                    </h2>
                                 </div>
                                 <div id="collapseThree" className="collapse bg-white" aria-labelledby="headingThree" data-parent="#accordionExample">
                                    {showAddress == false ?(
                                       <AddNewAddress customer={user._id} recordAdded={handleRecordAdded}/>
                                    ):null}
                                 </div>
                              </div> 
                           }
                           
                           <div className="card checkout_accord">
                              <div className="card-header" id="headingFour">
                                 <h2 className="mb-0">
                                    <button type="button" className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour"> Payment Method <span><i className="fa fa-plus"></i></span> </button>                     
                                 </h2>
                              </div>
                              <div id="collapseFour" className="collapse bg-white" aria-labelledby="headingFour" data-parent="#accordionExample">
                                 <div className="card-body">
                                    <div className="payment_method float_left">
                                       <PaymentMethods/>
                                       <div className="payment_card">
                                          <img className="img-fluid" src="../assets/images/payment_card.png" alt="card"/>
                                       </div>
                                    </div>
                                 </div>   
                              </div>
                           </div>
                        </div>
                     </div>
                     <button onClick={placeOrderOnClick} className="submit_btn" >Place Order</button>
                  </div>
                  <YourOrder total={total}/>
               </div>
            </div>
         </div>
         </div>
      </Layout>
   );
};

export default Checkout;
