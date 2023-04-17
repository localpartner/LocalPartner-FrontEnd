import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart, addItem } from "./cartHelpers";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartFetchData, cartList } from "../recoil/carts/cartHelpers";
import RegistrationModal from "./RegistrationModal";
import Login from "./Login";
import { isAuthenticated } from "../common/utils";
import YourOrder from "./YourOrder";
import { getCartList, removeCartItemById } from "./apiCore";

const Cart = () => {
  const [run, setRun] = useState(false);
  const [cartItem, setCartItem] = useRecoilState(cartList);
  const { cartData, clength, total } = useRecoilValue(cartFetchData);

  const [quantity, setQuantity] = useState(1);
  const [showLoginModal , setShowLoginModal] = useState(false);
  const [showRegistrationModal , setShowRegistrationModal] = useState(false);
  const { user ,token } = isAuthenticated();
   //login and registartion model hide/show

   const handleLoginModalShow = () =>{
      setShowLoginModal(true);
  }

  const handleLoginModalClose = () => {
      setShowLoginModal(false);
  }
  
  const handleRegistartionModalShow = () =>{
      setShowRegistrationModal(true)
  }

  const handleRegistartionModalClose = () =>{
      setShowRegistrationModal(false)
  }

  useEffect(() => {
    // listOfCartInfo()
  }, []);

  const listOfCartInfo = () => {
    getCartList(user._id).then(data => {
      if (data.error) {
          console.log(data.error);
      } else {
        setCartItem(data);
      }
    });
  };

  const removeCartItem = (id) => {
    removeCartItemById(user._id, id).then(data => {
      if (data.error) {                  
        console.log(data.error);
      } else {
        listOfCartInfo()
      }
    });
  };

  const quantityIncrement = (productId) => (e) => {
    e.preventDefault();
    if (cartItem.some((item) => item.product === productId && item.quantity >= 1)) {
      setCartItem((cartItem) =>
        cartItem.map((item) =>
          item.product === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      ); 
      setQuantity(quantity + 1);
    }
    setRun(run);
  };

  const quantityDecrement = (productId) => (e) => {
    e.preventDefault();
    if (cartItem.some((item) => item.product === productId && item.quantity > 1)) {
      setCartItem((cartItem) =>
        cartItem.map((item) =>
          item.product === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
      setQuantity(quantity - 1);
    }
    setRun(run);
  };

  const showItems = () => {
    return (
      <div className="row">
        <div className="col-lg-8 col-md-12 col-12 bg-white">
          <div className="bz_cart_main_wrapper float_left">
            <div className="cart_tbl">
              <div className="table table-responsive">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th style={{width: '10%'}}>Product</th>
                      <th></th>
                      <th>Quantity</th>
                      <th style={{width: '15%'}}>Unit Price</th>
                      <th style={{width: '15%'}}>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody style={{border:"2px solid black"}}>
                    {cartData.map((product, index) => (
                      <tr key={index}>
                        <td>
                          {product.productDetails[0].images && Object.values(product.productDetails[0].images).map((res, i) =>
                              i == 0 ? (
                                <img
                                  key={i}
                                  src={res}
                                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                                  alt={res.name}
                                />
                              ) : null
                            )
                          }
                        </td>
                        <td>{product.productDetails[0].name}</td>
                        <td>
                          <div className="number_pluse">
                            <div className="nice-number">
                              <button
                                type="button"
                                onClick={quantityDecrement(product.product)}//product is productId
                              >
                                -
                              </button>
                              <input type="number" value={product.quantity} />
                              <button
                                type="button"
                                onClick={quantityIncrement(product.product)}//product is productId
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <i className="fas fa-rupee-sign fa-sm"></i>
                          {product.productDetails[0].price.toFixed(2)}
                        </td>
                        <td>
                          <i className="fas fa-rupee-sign fa-sm"></i>
                          {(product.productDetails[0].price * product.quantity).toFixed(2)}
                        </td>
                        <td class="text-center">
                        <button style={{fontSize: '12px', minWidth: '75px', marginTop: '5px', padding: '0 5px'}} to="#" title="Remove Item" className="btn btn-danger btn-sm" onClick={(e)=> removeCartItem(product._id)}>
                          Remove
                        </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {
          !user?
          <YourOrder total={total.toFixed(2)} placeOrder={handleLoginModalShow} location=""/> :
          <YourOrder total={total.toFixed(2)} placeOrder='' location="/checkout"  />
        }
        {showLoginModal === true ? <Login show={showLoginModal} close={handleLoginModalClose} registrationModal={handleRegistartionModalShow} location="/checkout"/> : null}
        {showRegistrationModal===true? <RegistrationModal show={showRegistrationModal} close={handleRegistartionModalClose} loginModal={handleLoginModalShow}/> :null}
        
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
  );

  return (
    <>
      {cartItem.length != 0 ? showItems() : noItemsMessage()}
    </>
  );
};

export default Cart;
