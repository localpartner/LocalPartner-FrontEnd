import React, { useState, useEffect } from 'react';
import { getProducts, getBraintreeClientToken, processPayment, createOrder } from './apiCore';
import { emptyCart } from './cartHelpers';
import Card from './Card';
import { isAuthenticated } from '../common/utils';
import { Link } from 'react-router-dom';
// import "braintree-web"; // not using this package
//import DropIn from 'braintree-web-drop-in-react';
import Layout from './Layout';
import { cartFetchData,cartList } from '../recoil/carts/cartHelpers';
import { useRecoilState , useRecoilValue ,useResetRecoilState } from 'recoil';
import YourOrder from './YourOrder';

const placeOrder = (e) => {
   e.preventDefault();
   alert('Your Order has been placed successfully.')
   window.location='/';
};

const CheckoutOld = ({ products, setRun = f => f, run = undefined }) => {
   const { cartData, clength, total } = useRecoilValue(cartFetchData);
   const [quantity, setQuantity] = useState(1);
   const { user ,token } = isAuthenticated();
   const userId = user._id;

   const [cartItem, setCartItem] = useRecoilState(cartList);
   const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    const removeCartItem = (productId) => (e) => {
      e.preventDefault();
      setCartItem((cartItem) => cartItem.filter((item) => item.id !== productId));
    };
  
    const quantityIncrement = (productId) => (e) => {
      e.preventDefault();
      if (cartItem.some((item) => item.id === productId && item.quantity >= 1)) {
        setCartItem((cartItem) =>
          cartItem.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
        setQuantity(quantity + 1);
      }
      setRun(!run);
    };
  
    const quantityDecrement = (productId) => (e) => {
      e.preventDefault();
      if (cartItem.some((item) => item.id === productId && item.quantity > 1)) {
        setCartItem((cartItem) =>
          cartItem.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
        setQuantity(quantity - 1);
      }
      setRun(!run);
    };

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
         //   console.log("----data",data)
         //    if (data.error) {
         //        console.log(data.error);
         //        setData({ ...data, error: data.error });
         //    } else {
         //        console.log(data);
         //        setData({ clientToken: data.clientToken });
         //    }
        });
    };

    useEffect(() => {
        getToken(user._id, token);
    }, []);

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };

    let deliveryAddress = data.address;

    const buy = () => {
        setData({ loading: true });
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                // console.log(data);
                nonce = data.nonce;
                // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
                // and also total to be charged
                // console.log(
                //     "send nonce and total to process: ",
                //     nonce,
                //     getTotal(products)
                // );
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };

                processPayment(userId, token, paymentData)
                    .then(response => {
                        console.log(response);
                        // empty cart
                        // create order

                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        };

                        createOrder(userId, token, createOrderData)
                            .then(response => {
                                emptyCart(() => {
                                    setRun(!run); // run useEffect in parent Cart
                                    console.log('payment success and empty cart');
                                    setData({
                                        loading: false,
                                        success: true
                                    });
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                setData({ loading: false });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        setData({ loading: false });
                    });
            })
            .catch(error => {
                // console.log("dropin error: ", error);
                setData({ ...data, error: error.message });
            });
    };

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                    </div>

                    
                    <button onClick={buy} className="btn btn-success btn-block">
                        Pay
                    </button>
                </div>
            ) : null}
        </div>
    );

    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Thanks! Your payment was successful!
        </div>
    );

    const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;

    return (
        
<Layout
   title=""
   description=""
   className="container-fluid"
>
   {/*<div>
   <h2>Total: ${getTotal()}</h2>
   {showLoading(data.loading)}
   {showSuccess(data.success)}
   {showError(data.error)}
   {showCheckout()}
   </div>*/}
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
                        <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                           <div className="card-body">
                              <div className="billing_info float_left">
                              <div className="table table-responsive">
                                 <table className="table table-borderless">
                                    <thead>
                                    <tr>
                                       <th className="text-right">Product</th>
                                       <th></th>
                                       <th>Quantity</th>
                                       <th>Unit Price</th>
                                       <th>Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cartData.map((product, i) => (
                                       <tr key={i}>
                                          <td>
                                          <Link to="#" onClick={removeCartItem(product.id)}>
                                             x
                                          </Link>{" "}
                                          <img
                                             className="img-fluid"
                                             src={product.image}
                                             alt={product.name}
                                          />
                                          </td>
                                          <td>{product.name}</td>
                                          <td>
                                          <div className="number_pluse">
                                             <div className="nice-number">
                                                <button
                                                type="button"
                                                onClick={quantityDecrement(product.id)}
                                                >
                                                -
                                                </button>
                                                <input type="number" value={product.quantity} />
                                                <button
                                                type="button"
                                                onClick={quantityIncrement(product.id)}
                                                >
                                                +
                                                </button>
                                             </div>
                                          </div>
                                          </td>
                                          <td>
                                          <i className="fas fa-rupee-sign fa-sm"></i>
                                          {product.price} x {product.quantity}
                                          </td>
                                          <td>
                                          <i className="fas fa-rupee-sign fa-sm"></i>
                                          {product.price * product.quantity}
                                          </td>
                                       </tr>
                                    ))}
                                    </tbody>
                                 </table>
                                 </div>
                                 <a className="submit_btn" href="#">Continue</a>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="card checkout_accord">
                        <div className="card-header" id="headingThree">
                           <h2 className="mb-0">
                              <button type="button" className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree"> Shipping Information <span><i className="fa fa-plus"></i></span> </button>                     
                           </h2>
                        </div>
                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                           <div className="card-body">
                              <div className="billing_info float_left">
                                 <form>
                                    <div className="form-group row">
                                       <div className="col-md-6 col-12">
                                          <label>First Name<span className='error'>*</span></label>
                                          <input type="text" className="form-control" value={user.firstName}  placeholder="Enter here"/>
                                       </div>
                                       <div className="col-md-6 col-12">
                                          <label>Last Name<span className='error'>*</span></label>
                                          <input type="text" className="form-control" value={user.lastName} placeholder="Enter here"/>
                                       </div>
                                    </div>
                                    <div className="form-group row">
                                       <div className="col-md-6 col-12">
                                          <label>Email<span className='error'>*</span></label>
                                          <input type="email" className="form-control" placeholder="Enter here"/>
                                       </div>
                                       <div className="col-md-6 col-12">
                                          <label>Phone No.<span className='error'>*</span></label>
                                          <input type="text" className="form-control" value={user.mobileNo_} placeholder="Enter here"/>
                                       </div>
                                    </div>
                                    <div className="form-group row">
                                       <div className="col-md-6 col-12">
                                          <label>Select your Country<span className='error'>*</span></label>
                                          <input type="text" className="form-control" placeholder="Enter here"/>
                                       </div>
                                       <div className="col-md-6 col-12">
                                          <label>City<span className='error'>*</span></label>
                                          <input type="text" className="form-control" placeholder="Enter here"/>
                                       </div>
                                    </div>
                                    <div className="form-group row">
                                       <div className="col-md-6 col-12">
                                          <label>State<span className='error'>*</span></label>
                                          <input type="text" className="form-control" placeholder="Enter here"/>
                                       </div>
                                       <div className="col-md-6 col-12">
                                          <label>Zip Code<span className='error'>*</span></label>
                                          <input type="text" className="form-control" placeholder="Enter here"/>
                                       </div>
                                    </div>
                                    <div className="form-group row">
                                       <div className="col-md-12 col-12">
                                          <label>Address<span className='error'>*</span></label>
                                          <textarea className="form-control" rows="4"></textarea>
                                       </div>
                                    </div>
                                 </form>
                                 <a className="submit_btn" href="#">Continue</a>
                              </div>
                           </div>
                        </div>
                     </div>
                     
                     <div className="card checkout_accord">
                        <div className="card-header" id="headingFour">
                           <h2 className="mb-0">
                              <button type="button" className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour"> Payment Method <span><i className="fa fa-plus"></i></span> </button>                     
                           </h2>
                        </div>
                        <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                           <div className="card-body">
                              <div className="payment_method float_left">
                                 <form>
                                    <p>
                                       <input type="radio" id="test3" name="radio-group" defaultChecked="checked"/>
                                       <label className="direct_bank" htmlFor="test3">Direct Bank Transfer
                                       <span className="small-text">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</span>
                                       </label>
                                    </p>
                                    <p>
                                       <input type="radio" id="test4" name="radio-group"/>
                                       <label htmlFor="test4">Cheque Payments
                                       <span className="small-text">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</span>
                                       </label>
                                    </p>
                                    <p>
                                       <input type="radio" id="test5" name="radio-group"/>
                                       <label htmlFor="test5">Cash On Delivery
                                       <span className="small-text">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</span>
                                       </label>
                                    </p>
                                    <p>
                                       <input type="radio" id="test6" name="radio-group"/>
                                       <label htmlFor="test6">Pay Pal</label>
                                    </p>
                                 </form>
                                 <div className="payment_card">
                                    <img className="img-fluid" src="../assets/images/payment_card.png" alt="card"/>
                                    <a className="submit_btn" href="#">Place Order</a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <YourOrder total={total} placeOrder={placeOrder}/>
         </div>
      </div>
   </div>
</Layout>
    );
};

export default CheckoutOld;
