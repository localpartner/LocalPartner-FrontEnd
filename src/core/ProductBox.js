import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartList } from "../recoil/carts/cartHelpers";
import { addProdcutToWishlist, createCart, getProducts, getproductsByCode, getProductByCode,addtocart } from "./apiCore";
import { isAuthenticated } from '../common/utils';
import RegistrationModal from "./RegistrationModal";
import Login from "./Login";

const ProductBox = ({ image, productId, name, category, price, product, productCode }) => {
  //const [productCode, setProductCode] = useState();
  const params = useParams();

  const { user, token } = isAuthenticated();
  const accessToken = JSON.parse(localStorage.getItem("jwt"));
  const [cartItem, setCartItem] = useRecoilState(cartList);
  const history = useHistory();
  let discount_ = 0;

  if (product.discount != 0 && product.discount != "") {
    discount_ = price - (price * product.discount / 100)
  }

  const userId = (user !== undefined) ? user._id : '0';

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleLoginModalShow = () => {
    setShowLoginModal(true);
  }

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  }

  const handleRegistartionModalShow = () => {
    setShowRegistrationModal(true)
  }
  const handleRegistartionModalClose = () => {
    setShowRegistrationModal(false)
  }
  
  console.log("Shanikaproduct", product)
  
  // const accessToken = JSON.parse(localStorage.getItem("jwt"));
  const addToCart = () => {
    addtocart({
      productCode: productCode,
      options: [],
      units: 1
    }, accessToken).then(response => {
      console.log(response, "response.status")
      

      if (product == false) {
        alert(
          "Error occured while adding product into your Cart, Please try again."
        );
      } else {
        alert("Product Successfully Add In Your Cart");
        history.push('/placeorder');
      }
      console.log("currentProductDetails",product)
    })
    // console.log("alert message", productDetails)

  }

  const addToWishlist = productId => (e) => {
    e.preventDefault();
    const productData = {
      product: productId,
      user: userId
    };
    addProdcutToWishlist(userId, token, productData).then(data => {
      if (data.status == false) {
        alert('Error occured while adding product into your wishlist, Please try again.')
      }
      else {
        alert('Product has been added successfully into your wishlist.')
        history.push('/');
      }
    });
    //history.push('/user/wishlist');
  }


  const init = () => {
    
  }
  console.log(productCode, "productCode")
  async function fetchData() {

    // You can await here


  }

  async function fetchData1(productList) {
    // const response = await getproductsByCode(productList);
    // setSomeProduct(response.data.result)
    console.log("hello")
  }
  useEffect(() => {
    init()

  }, [])
  console.log(product,"product tyty")
  return (
    <div className="container-fluid">
    <div className="product_box">
      <div className="product_img">

        {/* {image && Object.values(image).map((res, i) =>
          i == 0 ? (
            <img
              key={i}
              src={res[0]}
              className="img-fluid"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              alt={name}
            />
          ) : null
        )} */}
        <img
          src={image}
          className="img-fluid"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
          alt="Product Image"
        />
        {userId == '0' ?
          <div className="top_icon" onClick={handleLoginModalShow}>
            <p className="new">new</p>
            <span>
              <i className="far fa-heart"></i>
            </span>
          </div>
          :
          <div className="top_icon" onClick={addToWishlist(productId)}>
            <p className="new">new</p>
            <span>
              <i className="far fa-heart"></i>
            </span>
          </div>
        }

        <div className="product_overlay">
          <div className="search_icon">
            <Link to={`/product/${productCode}`}>
              <i className="fa fa-search"
                onClick={fetchData()}></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="product_content">
        <span className="category-list">{category}</span>
        <Link to={`/product/${productCode}`}>
          <h3 className="woocommerce-loop-product__title" onClick={fetchData}>{name}</h3>
        </Link>
        <ul className="star">
          <li>
            <a href="#">
              <i className="fas fa-star"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-star"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-star"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-star"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-star"></i>
            </a>
          </li>
        </ul>
        <h4>
        ₹{price}
        </h4>
        <Link to="" onClick={(e, product) => addToCart(product)} className="add_btn custom_btn">
          Add to Cart
        </Link>
      </div>
      {showLoginModal === true ? <Login show={showLoginModal} close={handleLoginModalClose} registrationModal={handleRegistartionModalShow} location={"/"} /> : null}
      {showRegistrationModal === true ? <RegistrationModal show={showRegistrationModal} close={handleRegistartionModalClose} loginModal={handleLoginModalShow} /> : null}
    </div>
    </div>
  );
};

export default ProductBox;
