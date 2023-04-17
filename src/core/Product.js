import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../common/utils";
import Layout from "./Layout";

import { currentProductState } from './../recoil/atom/cartState'
import {
  getproductsByCode,
  addProdcutToWishlist,
  addrating_api,
  createCart,
  addtocart,
  getProductByCode,
} from "./apiCore";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link, useParams } from "react-router-dom";
import { DefaultValue, useRecoilState, useRecoilValue } from "recoil";
import { cartList, cartFetchData } from "../recoil/carts/cartHelpers";
import { useHistory } from "react-router-dom";
import RegistrationModal from "./RegistrationModal";
import Login from "./Login";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import StarRatingComponent from 'react-star-rating-component';
import AddCartLeftContainer from "./AddCartLeftContainer";
import { data } from "jquery";
import { AiOutlineShoppingCart } from "react-icons/ai";


const { user, token } = isAuthenticated();



function ProductBreadcrumb(props) {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/"><span> <i className="fas fa-home"></i></span></Breadcrumb.Item>
      <Breadcrumb.Item href="/">Product</Breadcrumb.Item>

    </Breadcrumb>
  );
}



const ProductDescriptionTab = (props) => {
  return (
    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
      <div className="content_single_product">
        <p dangerouslySetInnerHTML={{ __html: props.product.description }} />
      </div>
    </div>
  )
}
const ProductOptions = (props) => {
  console.log(props.details && props.details.options,"props data")
  
  const [currentProductDetails, setCurrentProductDetails] = useRecoilState(currentProductState)
 
  console.log(currentProductDetails,"currentProductDetails")
  const onOptionChange = (e) => {
    console.log(currentProductDetails,"currentProductDetails")
    let currentOpt = e.target.name

    if (currentProductDetails && currentProductDetails.options) {
      let temp = { ...currentProductDetails }
      let filteredOtions = temp.options.filter((opt) => {
        return opt.optionName != currentOpt

      })
      console.log(temp,"filteredOtions")
      filteredOtions.push({ "optionName": e.target.name, "optionValue": e.target.value})
      temp.options = filteredOtions;
      setCurrentProductDetails(temp)
    }

  }

  let product = props.details;

  let options = product.options.map((opt) => {
  
    if (opt.type == "radio") {
      let valueArray = opt.data.map((d) => {   
        return (<p>
          <input type="radio" id="test2" name="radio-group" required />
          <label for="test2">&nbsp;&nbsp;{d.value}</label>
        </p>
        )
      })

      return (
        <div style={{ border: "2px solid #f0f0f0", paddingLeft: "5px" }}>
          <p><h3 style={{ "color": "black", marginbottom: "10px", borderBottom: "2px solid #f0f0f0", padding: "10px" }}><b>Options:</b></h3></p>

          <div style={{ border: "2px solid #f0f0f0", paddingLeft: "10px" }}>
            <table style={{ width: "100%", marginTop: "10px", }}>
              <tbody>
                <p><strong style={{ "color": "black" }}>{opt.displayName} :</strong></p>
                {valueArray}



              </tbody>
            </table>
          </div>
        </div>)

    }

    if (opt.type == "dropdown") {


      return (
        <div style={{ border: "0.5px solid #f0f0f0", paddingLeft: "5px" }}>
          <div style={{ border: "0.5px solid #f0f0f0", paddingLeft: "5px" }}>
            <table style={{ width: "100%", marginTop: "10px", }}>
              <tbody>
                <p><strong style={{ "color": "black" }}>{opt.displayName} :</strong></p>

                <select name={opt.displayName} style={{ marginBottom: "15px", width: "50%" }} className=' form-control border-0 p-0' onChange={onOptionChange} >

                  {opt.data.map((d) => {
                    // setCurrentProductDetails(d.price)
                    return (
                      <>
                        <option value={d.value}>{d.value}/{d.price}</option>


                      </>

                    )
                  })
                  }
                </select>

              </tbody>
            </table>
          </div>
        </div>)

    }

  })
  return (

    options

  )

}
const ProductSpecials = (props) => {
  let specialsInfo = props.specials

  return (
    specialsInfo.map((data, i) => {
      console.log("props.specials", specialsInfo)
      return (
        <label>{data.price}</label>
      )
    })

  )
}
const ProductSpecifications = (props) => {
  let specicationInfo = props.specifications
  return (
    <div style={{ border: "2px solid #f0f0f0", paddingLeft: "5px" }}>
      <p><h3 style={{ "color": "black", marginbottom: "10px", borderBottom: "2px solid #f0f0f0", padding: "10px" }}><b>Specifications:</b></h3></p>

      <div style={{ paddingLeft: "5px" }}>

        {specicationInfo != null ? (
          <>
            <div className="d-flex justify-content-around" >
              <table className="table  table-borderless">
                <tbody>
                  {specicationInfo.map((data, i) => {
                    console.log("props.specifications", specicationInfo)
                    return (
                      <>
                        {data.header == true && i == 0 && <tr><td style={{ padding: "0.2rem", borderBottom: "1px solid #e5e5e5", fontSize: "13px", }} colSpan={2}><strong>{data.name}</strong></td> </tr>}
                        {data.header == true && i > 0 && <tr><td style={{ padding: "0.2rem", borderBottom: "1px solid #e5e5e5", paddingTop: "20px", fontSize: "13px", }} colSpan={2}><strong>{data.name}</strong></td> </tr>}
                        {data.header == false && <tr>
                          <td style={{ width: "40%", fontSize: "13px", padding: "0.2rem" }}>{data.name}</td>
                          <td style={{ width: "60%", fontSize: "13px", padding: "0.2rem" }}>{data.value}</td>
                        </tr>}




                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <h3>No Specification To Display</h3>
        )}
      </div>
    </div>
  )
}
const ProductFeatures = (props) => {
  return (

    <div style={{ border: "2px solid #f0f0f0", paddingLeft: "5px" }}>

     

{props.features.length > 0 ? (

        <>

              <p><h3 style={{ "color": "black", marginbottom: "10px", borderBottom: "2px solid #f0f0f0", padding: "10px" }}><b>Features:</b></h3></p>

          {props.features.map((data, i) => {
            console.log("props.features", props.features)
            return (
              <>
                <div class="half-half-image-text">
                  <div class="container">
                    {(i % 2 == 0) &&
                      <div style={{ borderBottom: "1px solid #f0f0f0" }} class="row">
                        <div class="col-md-8">
                          <div class="content">

                            <h1 style={{ fontSize: "15px" }}><strong>{data.title}</strong> </h1>
                            <p style={{ fontSize: "13px" }}><li>{data.description}</li></p>

                          </div>
                        </div>
                        <div class="col-md-4 ">
                          <img style={{ float: "left", padding: "10px", }} src={data.data}></img>
                        </div>
                      </div>}
                    {(i % 2 == 1) &&
                      <div style={{ borderBottom: "1px solid #f0f0f0" }} class="row">

                        <div class="col-md-4 ">
                          <img style={{ float: "left", padding: "10px", }} src={data.data}></img>
                        </div>
                        <div class="col-md-8">
                          <div class="content">

                            <h1 style={{ fontSize: "15px" }}><strong>{data.title}</strong> </h1>
                            <p style={{ fontSize: "13px" }}><li>{data.description}</li></p>

                          </div>
                        </div>
                      </div>}
                  </div>
                </div>


              </>
            );
          })}
        </>
      ) : (
       <></>
      )
      }
    </div>
   
  )
}

const ProductHighlights = (props) => {
  
  return (

    <div style={{ border: "2px solid #f0f0f0", paddingLeft: "5px" }}>
    

      {props.highlights.length > 0 ? (
       
       
        <>
      <p><h3 style={{ "color": "black", marginbottom: "10px", borderBottom: "2px solid #f0f0f0", padding: "10px" }}><b>Highlights:</b></h3></p>

          {props.highlights.map((j) => {
            console.log("props.highlights", props.highlights)

            return (
              <>


                <h1 style={{ fontSize: "13px", paddingLeft: "25px" }}><li>{j}</li></h1>
              </>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </div>
    // </div>
  )
}

const ProductImages = (props) => {
  let productImages = props.images;
  let details = props.productDetails
  const accessToken = JSON.parse(localStorage.getItem("jwt"));
  console.log("details", details)

  const [productImage, setProductImage] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProductDetails, setCurrentProductDetails] = useRecoilState(currentProductState)

  const history = useHistory()
  useEffect(() => {
    if (productImages && productImages.length > 0) {
      console.log(productImages, "images")
      setProductImage(productImages[0].content)
    }

  }, [productImages])

  const handelChangeImage = (e) => {
    console.log(e)
    //setCurrentIndex(e.target.key)
    setProductImage(e.target.src);
  };

  var items = [
    currentProductDetails
  ]

  console.log(currentProductDetails,"currentProductDetails22")
  const addToCart = () => {
    addtocart(currentProductDetails, accessToken).then(response => {
      console.log(response, "response.status")

      if (currentProductDetails == false) {
        alert(
          "Error occured while adding product into your Cart, Please try again."
        );
        
      } else {
        alert("Product Successfully Add In Your Cart");
        history.push('/placeorder');
      }
    })
    // console.log("alert message", productDetails)

  }

  // const addToCart = (accessToken)=>{
  //   this.setState((state)=>{
  //     // if cart already contains item
  //     if(state.cart.some(itm=>itm.product_name == item.product_name)) {
  //         return {}; // do not update state
  //     } else {
  //         return {cart: state.cart.concat(item)}; // add item to cart
  //     }
  // }
  // }




  // addToCart(currentProductDetails, token)
  // .then(response => {
  //     console.log(response);

  // })




  return (
    <div className="row">
      <div className="col-md-4">
        {productImages.length != 0
          ? productImages.map((ele, i) => (
            <div className="item" key={i}>
              <div className="product-img">
                <img
                  src={ele.content}
                  alt={ele.name}
                  className="d-block w-100"
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                  }}
                  key={i}

                  onMouseOver={handelChangeImage}
                />
              </div>
            </div>
          ))
          : "No Images"}

      </div>
      <div className="col-md-8" style={{ position: "sticky", top: "10px", bottom: "0", zIndex: "2", webkitalignSelf: " flex-start", alignSelf: "flex-start" }}>
        <div className="product-img">
          <img
            src={productImages.length != 0 ? productImage : null}

            className="d-block w-100 img-fluid"
            style={{ maxHeight: "100%", maxWidth: "100%", }}
          />
        </div>
        <div className="row" style={{ marginTop: "15px" }}>
          <div className="col-6"  >
            <button className="btn btn-dark btn-lg" style={{ fontSize: "15px" }}
              onClick={(e, details) => addToCart(details)}>ADD TO CART  </button>
            
          </div>
          <div className="col-6">
            <button className="btn btn-primary btn-lg" style={{ fontSize: "15px" }}>ADD TO WISHLIST</button>
          </div>
        </div>
      </div>


    </div>
  )
}

const Product = (props) => {
  const params = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [values, setValues] = useState({
    name_rating: "",
    email_rating: "",
    comment_rating: "",
  });
  const [color, setColor] = useState([]);

  const [category, setCategory] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);
  const [colorProductImages, setColorProductImages] = useState([]);
  const [cartItem, setCartItem] = useRecoilState(cartList);
  let history = useHistory();
  const { cartData } = useRecoilValue(cartFetchData);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(null);
  const { user, token } = isAuthenticated();
  const userId = user !== undefined ? user._id : "0";
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [productImg, setProductImg] = useState();

  const handleLoginModalShow = () => {
    setShowLoginModal(true);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const handleRegistartionModalShow = () => {
    setShowRegistrationModal(true);
  };
  const handleRegistartionModalClose = () => {
    setShowRegistrationModal(false);
  };

  const getQuantityOfProduct = (productId) => {
    cartData.map((item) =>
      item.id == productId ? setQuantity(item.quantity) : 1
    );
  };

  const loadSingleProduct = (productId) => {
    const colorArray = [];
  };

  const state_3 = {
    responsive: {
      0: {
        items: 2,
        dots: true,
      },
      450: {
        items: 2,
        dots: true,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 5,
      },
    },
  };


  const [getdetails, setGetDetails] = useState([]);
  const [specicationInfo, setSpecificationInfo] = useState();
  const [optionInfo, setOptionInfo] = useState();
  const [discountprice, setdiscountprice] = useState();
  const [currentProductDetails, setCurrentProductDetails] = useRecoilState(currentProductState)

  const getPoductDetails = async () => {

    let data = await getProductByCode(params.productId);
    let product = data.data.result;
    console.log("Product : ", data.data.result);
    setProductDetails(product);
    setProductImages(product.images);
    if (product.images && product.images.length > 0) {
      let primaryImage = product.images.find((img) => {
        return img.primaryImage === true;
      })
      if (primaryImage) {
        setProductImg(primaryImage)
      } else {
        setProductImg(product.images[0])
      }
    }

    // set discount

    if (product.discount && product.discount.length > 0) {


    }


    // Set Specifications
    let array = [];
    for (const key in product.specifications) {
      if (product.specifications.hasOwnProperty(key)) {
        array.push({ name: key, header: true })
        product.specifications[key].map((spec) => {
          array.push({ name: spec.name, value: spec.value, header: false })
        })

      }
    }

    setSpecificationInfo(array);

    // set Current Product Details Options

    let options = []
    if (product && product.options) {
      product.options.map((opt) => {
        console.log(opt,"hfgfhgf")
        let selectedValue = opt.data && opt.data[0] && opt.data[0].value
        console.log(selectedValue,"selectedValue")
        let selectedPrice = opt.data && opt.data[0] && opt.data[0].price
        console.log(selectedPrice,"jkdj")
        options.push({ "optionName": opt.displayName, "optionValue": selectedValue, "optionPrice": selectedPrice})

      })
      let obj = { "productCode": product.code, "options": options, "units": 1 }
      setCurrentProductDetails(obj)
    }


  }
  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
    setReload(true);
    getQuantityOfProduct(productId);
    getPoductDetails();
    /*const getalldetails = () => {
      getproductcode(params.productId).then((data) => {
        setGetDetails(data.data.result);
        setSpecificationInfo(data.data.result.specifications);

        let discountdataprice = "";
        if (data.data.result.discount.length != 0) {
          discountdataprice =
            (data.data.result.price * data.data.result.discount[0].discount) /
            100;
          discountdataprice = data.data.result.price - discountdataprice;
          setdiscountprice(discountdataprice);
        }
      });
    };
    getalldetails(); */
  }, []);
  const addToCart = (e) => {
    alert("Hi")

  }
  const addToCart1 = (e) => {
    alert()
    e.preventDefault();
    const productId = props.match.params.productId;
    if (cartItem.some((item) => item.id === productId)) {
      setCartItem((cartItem) =>
        cartItem.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const cartItemData = {
        product: productId,
        quantity: 1,
        user: user._id,
      };
      createCart(cartItemData).then((res) => {
        console.log(res);
      });
    }
    history.push("/cart");
  };

  const addToWishlist = (e) => {
    e.preventDefault();
    const productData = {
      product: props.match.params.productId,
      user: userId,
    };
    addProdcutToWishlist(userId, token, productData).then((data) => {
      if (data.status == false) {
        alert(
          "Error occured while adding product into your wishlist, Please try again."
        );
      } else {
        alert("Product has been added successfully into your wishlist.");
        history.push("/wishlist");
      }
    });
    //history.push('/cart');
  };
  //Onchange

  //onchanges text box value add here
  const handleChange = (event, name) => {
    //CHeck box name checked here
    //console.log(event, name)
    console.log(name);
    setValues({ ...values, [name]: event.target.value });
  };

  //
  const {
    name_rating,
    success,
    email_rating,
    comment_rating,
    redirectToProfile,
  } = values;

  const addrating = (e) => {
    //setValues({ ...values, error: false });
    e.preventDefault();
    const productData = {
      product: props.match.params.productId,
      user: userId,
      comment_rating: comment_rating,
      name_rating: name_rating,
      email_rating: email_rating,
    };
    //console.log(comment_rating);
    //const productId = props.match.params.productId;
    //return false;
    addrating_api(userId, token, productData).then((data) => {
      if (data.status == false) {
        alert(
          "Error occured while adding product into your wishlist, Please try again."
        );
      } else {
        alert("Product has been added successfully into your wishlist.");
        //history.push('/wishlist');
      }
    });
    //history.push('/cart');
  };

  const addToCartSubProduct = (productId) => (e) => {
    e.preventDefault();
    //   read(productId).then((data) => {
    //     var i = 0;
    //     let img = '';
    //     Object.values(data.images).map(res => {
    //       if(i == 0){
    //         img = res[0];
    //         i++;
    //       }
    //     })
    //     //Add to cart
    //     if(cartItem.some(item => item.id == data._id)){
    //     setCartItem(cartItem => cartItem.map(item => item.id === data._id ? {...item, quantity : item.quantity + 1 } : item ))
    //     }else{
    //     setCartItem((oldCartItem) => [
    //       ...oldCartItem,
    //       {
    //         id: productId,
    //         name: data.name,
    //         description: data.description,
    //         category: data.category.name,
    //         image: img,
    //         price: data.price,
    //         quantity: 1,
    //       },
    //     ]);
    //   }
    alert("hi")

    //history.push("/cart");
  };

  if (productImages.length != 0) {
    var imagecount = productImages.length;
  }

  const quantityIncrement = () => {
    const productId = props.match.params.productId;
    if (cartItem.some((item) => item.id === productId && quantity >= 1)) {
      setCartItem((cartItem) =>
        cartItem.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      setQuantity(quantity + 1);
    } else if (quantity >= 1) {
      setQuantity(quantity + 1);
    }
  };

  const quantityDecrement = () => {
    const productId = props.match.params.productId;
    if (cartItem.some((item) => item.id === productId && quantity > 1)) {
      setCartItem((cartItem) =>
        cartItem.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
      setQuantity(quantity - 1);
    } else if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handelImages = (color) => (e) => {
    e.preventDefault();
    Object.entries(productImages).forEach((data, key) => {
      if (data[0] === color) {
        setColorProductImages(data[1]);
      }
    });
  };

  const handelChangeImage = (e) => {
    setCurrentImage(e.target.src);
    setProductImg(e.target.src);
  };
  const accessToken = JSON.parse(localStorage.getItem("jwt"));
  const addItemToCart = (details) => {
    var items = [];
    var options = [];

    var temp = productDetails.options
    if (productDetails.options != undefined) {
      productDetails.options.forEach(element => {
        let optionName = element.displayName
        options.push({
          optionName: optionName,
        });

        console.log("okok : " + element.displayName);

      });
    }

    items.push({
      productCode: productDetails.code,
      options: options,
      units: "1",
      // selectedOption: selectoption
    });
    // alert( productDetails.name)

    addtocart({}, accessToken).then(data => { })
    // console.log("alert message", productDetails)

  }

  // let pro = productDetails;
  // console.log(pro,"hello")

  // if (pro.length>0) {
  // }
 

  return (
    <Layout title={productDetails.name} className="container-fluid">
      <ProductBreadcrumb name={productDetails.name}></ProductBreadcrumb>
      <div className="row">
        <div className="col-md-5" >
          <ProductImages images={productImages} productDetails={productDetails} addToCart={addItemToCart} />

        </div>

        <div className="col-md-7" >
          <div className="row">
            <div className="col-12"><h3>{productDetails.name}</h3></div>
            <StarRatingComponent name="rate2" editing={false} starCount={5} value={4.25} emptyStarColor={"#999"} /> &nbsp;|&nbsp;
            <Link to="#">1 customer review</Link> &nbsp;|&nbsp;
            <Link to="#">Add a review</Link>
            <div className="col-12" style={{ "border-bottom": "1px solid #eee", "height": "1px" }}></div>
            <div className="col-12">
              <div className="content_single_product">
                {productDetails.specials && productDetails.specials.price != 0 && productDetails.specials != 0 && productDetails.discount != 0 ? (

                  <h3>
                    <p class="text-success" style={{ "font-size": "13px" }}> Special price </p>
                    <i className="fas fa-rupee-sign fa-sm" style={{ "font-size": "30px" }}>
                      {productDetails.specials && <span class="text-success"><ProductSpecials specials={productDetails.specials}></ProductSpecials></span>}
                    </i>
                    <s>
                      <i className="text-danger mx-3" style={{ "font-size": "20px" }}>
                        <i className="fas fa-rupee-sign fa-sm"></i>
                        {productDetails.price}
                      </i>
                    </s>
                    {productDetails.length != 0 &&
                      productDetails.discount != 0
                      ? productDetails.discount[0].discount + "% off"
                      : null}


                    <div><h4 className="" style={{ alignItems: "left", "color": "black", "font-size": "16px" }}><b>Brand Name : {productDetails.links && productDetails.links.brand}</b></h4></div>
                    <div><h4 className="" style={{ alignItems: "left", "color": "black", "font-size": "16px" }}><b>Sold By: {productDetails && productDetails.storeName}</b></h4></div>
                  </h3>

                ) : (productDetails.length != 0 &&
                  productDetails.discount != 0 && productDetails.price != 0) ?
                  <>
                    <div className="d-flex">

                      <h3>
                        <i className="fas fa-rupee-sign fa-sm"></i>

                        {discountprice}
                      </h3>

                      <h3 className="text-danger mx-3">

                        {/* <i className="fas fa-rupee-sign fa-sm"></i> */}

                        {productDetails.price}

                      </h3>
                      <h3 className="">
                        {productDetails.length != 0 &&
                          productDetails.discount != 0
                          ? productDetails.discount[0].discount + "% off"
                          : null}
                      </h3>

                    </div>

                    <div><h4 className="" style={{ alignItems: "left", "color": "black", "font-size": "16px" }}><b>Brand Name : {productDetails.links && productDetails.links.brand}</b></h4></div>
                    <div><h4 className="" style={{ alignItems: "left", "color": "black", "font-size": "16px" }}><b>Sold By: {productDetails && productDetails.storeName}</b></h4></div>

                  </>

                  : (
                    <div>
                      <h3>
                        <i className="fas fa-rupee-sign fa-sm"></i>
                        {productDetails.price}
                        <div><h4 className="" style={{ alignItems: "left", "color": "black", "font-size": "16px" }}><b>Brand Name : {productDetails.links && productDetails.links.brand}</b></h4></div>
                        <div><h4 className="" style={{ alignItems: "left", "color": "black", "font-size": "16px" }}><b>Sold By: {productDetails && productDetails.storeName}</b></h4></div>
                      </h3>

                    </div>
                  )}

                <div style={{ border: "2px solid #f0f0f0", paddingLeft: "5px" }}>
                  <table style={{ width: "100%", marginTop: "10px", }}>
                    <tbody>

                      <p><h3 style={{ "color": "black", marginbottom: "10px", borderBottom: "2px solid #f0f0f0", padding: "10px" }}><b>Description :</b></h3></p>

                      <p style={{ fontSize: "13px", }} dangerouslySetInnerHTML={{ __html: productDetails.description }} />
                    </tbody>
                  </table>
                </div>
                <div>

                </div>
                &nbsp;
              
                {productDetails.options && <ProductOptions details={productDetails}></ProductOptions>}
                &nbsp;


                {/* {productDetails && <ProductHighlights highlights={productDetails.highlights}></ProductHighlights>}
                &nbsp;  */}

              
               
               {productDetails.highlights && <ProductHighlights highlights={productDetails.highlights}></ProductHighlights>}
                &nbsp; 
             

                {/* { this.state.productDetails.highlights ? <ProductHighlights /> : null } */}

                {productDetails.features && <ProductFeatures features={productDetails.features}></ProductFeatures>}
                &nbsp;
                {/*<div style={{ border: "2px solid #f0f0f0", paddingLeft: "5px" }}>
                  <table style={{ width: "100%", marginTop: "10px", }}>
                    <tbody>
                      <p><h3 style={{ "color": "black" }}><b>Options :</b></h3></p>
                    </tbody>
                  </table>
                </div>*/}


                {/*<div style={{ border: "2px solid #f0f0f0", paddingLeft: "5px" }}>
                  <table style={{ width: "100%", marginTop: "10px", }}>
                    <tbody>
                      <p><h3 style={{ "color": "black" }}><b>Specifications :</b></h3></p>
                    </tbody>
                  </table>
              </div>*/}
                {/* <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" style={{border:"2px solid #f0f0f0",paddingLeft:"5px"}}> */}
                {specicationInfo && <ProductSpecifications specifications={specicationInfo}></ProductSpecifications>}
                {/* </div> */}
              </div>

            </div>
            &nbsp;
            <div style={{ border: "2px solid #f0f0f0", paddingLeft: "5px" }}>
              <table style={{ width: "100%", marginTop: "10px", }}>
                <tbody>
                  <div>
                    <div className="content_single_product" >
                      <p><u><h3 style={{ "color": "black", marginbottom: "10px", borderBottom: "2px solid #f0f0f0", padding: "10px" }}><b>Rating & Reviews :</b> </h3></u></p></div>
                    <div className="content_single_product float_left">
                      <h4>
                        2 review for Ultimate 3D Bluetooth Headphone
                      </h4>
                      <div className="post_product float_left">
                        <div className="post_img">
                          <img
                            className="img-fluid"
                            src="../assets/images/product.jpg"
                            alt="img"
                          />
                        </div>
                        <div className="post_details">
                          <h5>
                            Spiritinsire <span>April 10, 2020</span>
                          </h5>
                          <ul className="star">
                            <li>
                              <i className="fas fa-star"></i>
                            </li>
                            <li>
                              <i className="fas fa-star"></i>
                            </li>
                            <li>
                              <i className="fas fa-star"></i>
                            </li>
                            <li>
                              <i className="fas fa-star-half-alt"></i>
                            </li>
                            <li>
                              <i className="far fa-star"></i>
                            </li>
                          </ul>
                          <p>
                            It is a long established fact that a reader
                            will be distracted by the readable <br />
                            content of a page when looking at its layout.
                          </p>
                        </div>
                      </div>
                      <div className="post_product float_left">
                        <div className="post_img">
                          <img
                            className="img-fluid"
                            src="../assets/images/product.jpg"
                            alt="img"
                          />
                        </div>
                        <div className="post_details">
                          <h5>
                            Spiritinsire <span>April 10, 2020</span>
                          </h5>
                          <ul className="star">
                            <li>
                              <i className="fas fa-star"></i>
                            </li>
                            <li>
                              <i className="fas fa-star"></i>
                            </li>
                            <li>
                              <i className="fas fa-star"></i>
                            </li>
                            <li>
                              <i className="fas fa-star-half-alt"></i>
                            </li>
                            <li>
                              <i className="far fa-star"></i>
                            </li>
                          </ul>
                          <p>
                            It is a long established fact that a reader
                            will be distracted by the readable <br />
                            content of a page when looking at its layout.
                          </p>
                        </div>
                      </div>
                      <div className="bz_contact_main_wrapper float_left">
                        <h4>Add a review</h4>
                        <form>
                          <h3>Your Rating* :</h3>
                          <fieldset className="rating">
                            <input
                              type="radio"
                              id="star5"
                              name="rating"
                              value="5"
                            />
                            <label
                              className="full"
                              htmlFor="star5"
                              title="Awesome - 5 stars"
                            ></label>
                            <input
                              type="radio"
                              id="star4half"
                              name="rating"
                              value="4 and a half"
                            />
                            <label
                              className="half"
                              htmlFor="star4half"
                              title="Pretty good - 4.5 stars"
                            ></label>
                            <input
                              type="radio"
                              id="star4"
                              name="rating"
                              value="4"
                            />
                            <label
                              className="full"
                              htmlFor="star4"
                              title="Pretty good - 4 stars"
                            ></label>
                            <input
                              type="radio"
                              id="star3half"
                              name="rating"
                              value="3 and a half"
                            />
                            <label
                              className="half"
                              htmlFor="star3half"
                              title="Meh - 3.5 stars"
                            ></label>
                            <input
                              type="radio"
                              id="star3"
                              name="rating"
                              value="3"
                            />
                            <label
                              className="full"
                              htmlFor="star3"
                              title="Meh - 3 stars"
                            ></label>
                            <input
                              type="radio"
                              id="star2half"
                              name="rating"
                              value="2 and a half"
                            />
                            <label
                              className="half"
                              htmlFor="star2half"
                              title="Kinda bad - 2.5 stars"
                            ></label>
                            <input
                              type="radio"
                              id="star2"
                              name="rating"
                              value="2"
                            />
                            <label
                              className="full"
                              htmlFor="star2"
                              title="Kinda bad - 2 stars"
                            ></label>
                            <input
                              type="radio"
                              id="star1half"
                              name="rating"
                              value="1 and a half"
                            />
                            <label
                              className="half"
                              htmlFor="star1half"
                              title="Meh - 1.5 stars"
                            ></label>
                            <input
                              type="radio"
                              id="star1"
                              name="rating"
                              value="1"
                            />
                            <label
                              className="full"
                              htmlFor="star1"
                              title="Sucks big time - 1 star"
                            ></label>
                            <input
                              type="radio"
                              id="starhalf"
                              name="rating"
                              value="half"
                            />
                            <label
                              className="half"
                              htmlFor="starhalf"
                              title="Sucks big time - 0.5 stars"
                            ></label>
                          </fieldset>
                          <div className="form-group row">
                            <div className="col-12">
                              <label>Your review*</label>
                            </div>
                            <div className="col-12">
                              <textarea
                                rows="5"
                                onChange={(e) =>
                                  handleChange(e, "comment_rating")
                                }
                                value={values.comment_rating}
                              ></textarea>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-12">
                              <label>Name*</label>
                            </div>
                            <div className="col-12">
                              <input
                                type="text"
                                onChange={(e) =>
                                  handleChange(e, "name_rating")
                                }
                                value={values.name_rating}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-12">
                              <label>Emali*</label>
                            </div>
                            <div className="col-12">
                              <input
                                type="email"
                                onChange={(e) =>
                                  handleChange(e, "email_rating")
                                }
                                value={values.email_rating}
                              />
                            </div>
                          </div>
                          <p>
                            Save my name, email, and website in this
                            browser for the next time I comment.
                          </p>
                          <Link
                            className="custom_btn"
                            to="#"
                            onClick={addrating}
                          >
                            Submit
                          </Link>
                        </form>
                      </div>
                    </div>

                  </div>
                </tbody>
              </table>
            </div>

          </div>
        </div>
        {/* <div className="col-md-2">
          <div className="row">
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-dark" onClick={addToCart}>Add To Cart</button>
              <button className="btn btn-primary" onClick={addToWishlist}>Add To wishlist</button>
            </div>
          </div>
        </div> */}
        {/* <AddCartLeftContainer product={productDetails} /> */}

      </div>
      <div className="bz_single_product_main_wrapper bz_fashion_single_product bz_cosmetic_single_product float_left">
        <div className="container custom_container">


          <div className="shoping_box float_left">
            <div className="row">

              <div className="col-lg-6 col-md-6 col-12">
                <div className="b_product_sell_details_wrapper float_left">
                  <div className="bz_product_heading float_left">
                    {/* <h3>{product.name}</h3>
                    <ul className="review">
                      <li>
                        <ul className="star">
                          <li>
                            <Link to="#">
                              <i className="fas fa-star"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="fas fa-star"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="fas fa-star"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="fas fa-star"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="fas fa-star"></i>
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link to="#">1 customer review</Link>
                      </li>
                      <li>
                        <Link to="#">Add a review</Link>
                      </li>
                    </ul> */}

                    {/* {productDetails.length != 0 &&
                    productDetails.discount != 0 ? (
                      <>
                        <div className="d-flex">
                          <h3>
                            <i className="fas fa-rupee-sign fa-sm"></i>

                            {discountprice}
                          </h3>

                          <h3 className="text-danger mx-3">
                            <s>
                              <i className="fas fa-rupee-sign fa-sm"></i>

                              {productDetails.price}
                            </s>
                          </h3>
                          <h3 className="">
                            {productDetails.length != 0 &&
                            productDetails.discount != 0
                              ? productDetails.discount[0].discount + "% off"
                              : null}
                          </h3>
                        </div>
                      </>
                    ) : (
                      <h3>{productDetails.price}</h3>
                    )} */}

                    {getdetails.length != 0 &&
                      getdetails.stock.oosMessage != "No" ? (
                      <>
                        <div>
                          <h3>Out Of Stock</h3>
                          <span>
                            {getdetails.length != 0
                              ? getdetails.stock.oosMessage
                              : null}
                          </span>
                        </div>
                      </>
                    ) : null}

                    <h3>{console.log("productDetails", productDetails)}</h3>
                  </div>
                  {/* <div className="color_code float_left">
                    <div className="fashion_color">
                      <label>Color :</label>
                      <ul className="color_change">
                        {
                          color.length != 0 ?
                            color.map((ele, i) => (
                              <Link onClick={handelImages(ele)} style={{ padding: "3px" }}>
                                <li key={i} onClick={handelImages(ele)} style={{ background: ele, padding: "10px", borderRadius: "50%" }}>
                                  {/* <Link to="#" onClick={handelImages(ele)}></Link> */}
                  {/* </li>
                              </Link>
                            ))
                            : null
                        }
                      </ul>
                    </div> 

                  </div> */}
                  {productDetails.links && productDetails.links.brand &&
                    <div>
                      {/* <div><label>Manufacturer Name : {productDetails.links.brand}</label></div> */}
                    </div>}
                  <div className="fashion_count float_left">
                    <div className="number_pluse fashion_number">
                      <div className="nice-number">
                        <button type="button" onClick={quantityDecrement}>
                          -
                        </button>
                        <input type="text" value={quantity} />
                        <button type="button" onClick={quantityIncrement}>
                          +
                        </button>
                      </div>
                    </div>
                    <div className="share_icon">
                      <p>Share:</p>
                      <ul>
                        <li>
                          <Link to="#">
                            <i className="fab fa-facebook-f"></i>
                          </Link>
                          <Link to="#">
                            <i className="fab fa-twitter"></i>
                          </Link>
                          <Link to="#">
                            <i className="fab fa-instagram"></i>
                          </Link>
                          <Link to="#">
                            <i className="fab fa-youtube"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* <div className="fashion_product_details cosmetics_product_details float_left">
                    <nav>
                      <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                        <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab"
                          href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                          Description
                        </a>
                        <a
                          className="nav-item nav-link"
                          id="nav-profile-tab"
                          data-toggle="tab"
                          href="#nav-profile"
                          role="tab"
                          aria-controls="nav-profile"
                          aria-selected="false"
                        >
                          Specifications
                        </a>
                        <a
                          className="nav-item nav-link"
                          id="nav-contact-tab"
                          data-toggle="tab"
                          href="#nav-contact"
                          role="tab"
                          aria-controls="nav-contact"
                          aria-selected="false"
                        >
                          Reviews
                        </a>
                      </div>
                      <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                        <ProductDescriptionTab product={productDetails} />
                        {/* <ProductSpecificationTab specifications={specicationInfo}></ProductSpecificationTab> */}

                  <div
                    className="tab-pane fade"
                    id="nav-contact"
                    role="tabpanel"
                    aria-labelledby="nav-contact-tab"
                  >
                    {/* <div className="content_single_product float_left">
                            <h4>
                              2 review for Ultimate 3D Bluetooth Headphone
                            </h4>
                            <div className="post_product float_left">
                              <div className="post_img">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/product.jpg"
                                  alt="img"
                                />
                              </div>
                              <div className="post_details">
                                <h5>
                                  Spiritinsire <span>April 10, 2020</span>
                                </h5>
                                <ul className="star">
                                  <li>
                                    <i className="fas fa-star"></i>
                                  </li>
                                  <li>
                                    <i className="fas fa-star"></i>
                                  </li>
                                  <li>
                                    <i className="fas fa-star"></i>
                                  </li>
                                  <li>
                                    <i className="fas fa-star-half-alt"></i>
                                  </li>
                                  <li>
                                    <i className="far fa-star"></i>
                                  </li>
                                </ul>
                                <p>
                                  It is a long established fact that a reader
                                  will be distracted by the readable <br />
                                  content of a page when looking at its layout.
                                </p>
                              </div>
                            </div>
                            <div className="post_product float_left">
                              <div className="post_img">
                                <img
                                  className="img-fluid"
                                  src="../assets/images/product.jpg"
                                  alt="img"
                                />
                              </div>
                              <div className="post_details">
                                <h5>
                                  Spiritinsire <span>April 10, 2020</span>
                                </h5>
                                <ul className="star">
                                  <li>
                                    <i className="fas fa-star"></i>
                                  </li>
                                  <li>
                                    <i className="fas fa-star"></i>
                                  </li>
                                  <li>
                                    <i className="fas fa-star"></i>
                                  </li>
                                  <li>
                                    <i className="fas fa-star-half-alt"></i>
                                  </li>
                                  <li>
                                    <i className="far fa-star"></i>
                                  </li>
                                </ul>
                                <p>
                                  It is a long established fact that a reader
                                  will be distracted by the readable <br />
                                  content of a page when looking at its layout.
                                </p>
                              </div>
                            </div>
                            <div className="bz_contact_main_wrapper float_left">
                              <h4>Add a review</h4>
                              <form>
                                <h3>Your Rating* :</h3>
                                <fieldset className="rating">
                                  <input
                                    type="radio"
                                    id="star5"
                                    name="rating"
                                    value="5"
                                  />
                                  <label
                                    className="full"
                                    htmlFor="star5"
                                    title="Awesome - 5 stars"
                                  ></label>
                                  <input
                                    type="radio"
                                    id="star4half"
                                    name="rating"
                                    value="4 and a half"
                                  />
                                  <label
                                    className="half"
                                    htmlFor="star4half"
                                    title="Pretty good - 4.5 stars"
                                  ></label>
                                  <input
                                    type="radio"
                                    id="star4"
                                    name="rating"
                                    value="4"
                                  />
                                  <label
                                    className="full"
                                    htmlFor="star4"
                                    title="Pretty good - 4 stars"
                                  ></label>
                                  <input
                                    type="radio"
                                    id="star3half"
                                    name="rating"
                                    value="3 and a half"
                                  />
                                  <label
                                    className="half"
                                    htmlFor="star3half"
                                    title="Meh - 3.5 stars"
                                  ></label>
                                  <input
                                    type="radio"
                                    id="star3"
                                    name="rating"
                                    value="3"
                                  />
                                  <label
                                    className="full"
                                    htmlFor="star3"
                                    title="Meh - 3 stars"
                                  ></label>
                                  <input
                                    type="radio"
                                    id="star2half"
                                    name="rating"
                                    value="2 and a half"
                                  />
                                  <label
                                    className="half"
                                    htmlFor="star2half"
                                    title="Kinda bad - 2.5 stars"
                                  ></label>
                                  <input
                                    type="radio"
                                    id="star2"
                                    name="rating"
                                    value="2"
                                  />
                                  <label
                                    className="full"
                                    htmlFor="star2"
                                    title="Kinda bad - 2 stars"
                                  ></label>
                                  <input
                                    type="radio"
                                    id="star1half"
                                    name="rating"
                                    value="1 and a half"
                                  />
                                  <label
                                    className="half"
                                    htmlFor="star1half"
                                    title="Meh - 1.5 stars"
                                  ></label>
                                  <input
                                    type="radio"
                                    id="star1"
                                    name="rating"
                                    value="1"
                                  />
                                  <label
                                    className="full"
                                    htmlFor="star1"
                                    title="Sucks big time - 1 star"
                                  ></label>
                                  <input
                                    type="radio"
                                    id="starhalf"
                                    name="rating"
                                    value="half"
                                  />
                                  <label
                                    className="half"
                                    htmlFor="starhalf"
                                    title="Sucks big time - 0.5 stars"
                                  ></label>
                                </fieldset>
                                <div className="form-group row">
                                  <div className="col-12">
                                    <label>Your review*</label>
                                  </div>
                                  <div className="col-12">
                                    <textarea
                                      rows="5"
                                      onChange={(e) =>
                                        handleChange(e, "comment_rating")
                                      }
                                      value={values.comment_rating}
                                    ></textarea>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <div className="col-12">
                                    <label>Name*</label>
                                  </div>
                                  <div className="col-12">
                                    <input
                                      type="text"
                                      onChange={(e) =>
                                        handleChange(e, "name_rating")
                                      }
                                      value={values.name_rating}
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <div className="col-12">
                                    <label>Emali*</label>
                                  </div>
                                  <div className="col-12">
                                    <input
                                      type="email"
                                      onChange={(e) =>
                                        handleChange(e, "email_rating")
                                      }
                                      value={values.email_rating}
                                    />
                                  </div>
                                </div>
                                <p>
                                  Save my name, email, and website in this
                                  browser for the next time I comment.
                                </p>
                                <Link
                                  className="custom_btn"
                                  to="#"
                                  onClick={addrating}
                                >
                                  Submit
                                </Link>
                              </form>
                            </div>
                          </div> */}
                  </div>
                  {/* </div>
                    </nav>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bz_cosmetic_new_product_wraaper padd_bottom float_left">
        <div className="container custom_container">
          <div className="title-heading">
            <h3>
              <span
                style={{
                  borderBottom: "1px solid #01a5ed",
                  paddingBottom: "15px",
                }}
              >
                {/* Just in now/ */}
              </span>
            </h3>
            <br />
          </div>
          <div className="row">
            <OwlCarousel
              className="owl-theme"
              loop
              margin={10}
              nav
              items={4}
              dots={false}
            >
              {relatedProduct.length !== "0"
                ? relatedProduct.map((res, i) =>
                  res.deletedAt ? (
                    <div key={i} className="col-lg-3 col-md-6 col-12">
                      <div className="product_box" style={{ width: "660%" }}>
                        <div className="img_sales">
                          {relatedProduct !== ""
                            ? Object.values(res.images).map((img, j) => (
                              <div className="product-img" key={j}>
                                {j === 0 ? (
                                  <img
                                    src={img[0]}
                                    className="img-fluid"
                                    alt="My-image"
                                    style={{
                                      maxHeight: "100%",
                                      maxWidth: "100%",
                                    }}
                                  ></img>
                                ) : null}
                              </div>
                            ))
                            : null}
                          <div className="overlay_sales">
                            <div className="upper">
                              <Link to="#">New</Link>
                              <ul className="side_icon">
                                <li>
                                  <Link to="#">
                                    <i className="fas fa-search"></i>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <i className="far fa-heart"></i>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <i className="fa fa-link"></i>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="content_sales">
                          <p>
                            <Link to="#">Electronic</Link>
                          </p>
                          <Link
                            to={`/product/${res._id}`}
                            onClick={() => setReload(!reload)}
                          >
                            <h3 className="woocommerce-loop-product__title">
                              {res.name}
                            </h3>
                          </Link>
                          <ul className="star">
                            <li>
                              <Link to="#">
                                <i className="fas fa-star"></i>
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <i className="fas fa-star"></i>
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <i className="fas fa-star"></i>
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <i className="fas fa-star"></i>
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <i className="fas fa-star"></i>
                              </Link>
                            </li>
                          </ul>
                          <h4>
                            <del>
                              <i className="fas fa-rupee-sign fa-sm"></i>
                              {res.price}
                            </del>
                          </h4>
                          <div className="custom_btn">
                            <Link
                              to="#"
                              onClick={addToCartSubProduct(res._id)}
                            >
                              <i className="fas fa-shopping-cart"></i>
                              &nbsp;&nbsp;Add To Cart
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null
                )
                : null}
            </OwlCarousel>
          </div>
        </div>
      </div>
      {showLoginModal === true ? (
        <Login
          show={showLoginModal}
          close={handleLoginModalClose}
          registrationModal={handleRegistartionModalShow}
          location={"/product/" + props.match.params.productId}
        />
      ) : null}
      {showRegistrationModal === true ? (
        <RegistrationModal
          show={showRegistrationModal}
          close={handleRegistartionModalClose}
          loginModal={handleLoginModalShow}
        />
      ) : null}
    </Layout>
  );
};

export default Product;
