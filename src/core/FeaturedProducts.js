import React, { useEffect, useState, memo } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ProductBox from "./ProductBox";
import ProductDetailsModal from "./ProductDetailsModal";
import { sliderList, advertiseListAPI, getProducts,getFeaturedProduct } from "./apiCore";

const SliderImages = (props)=>{
  return (
    <div className="col-lg-12 col-md-12 col-12 no_padd" >
        <OwlCarousel
          className="owl-theme"
          loop
          margin={10}
          items={1}
          autoplay={true}
        >
          {props && props.sliderImages.length >0
            ? props.sliderImages.map((res, i) => (
              <div className="item" key={i}>
                <img className="img-fluid" src={res.image} alt="logo" />
              </div>
            ))
            : null}
        </OwlCarousel>
      </div>
  )
}

const FeaturedProducts = (props) => {
  const [productList, setFeaturedProductList] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [advertisImage, setAdvertiseImage] = useState([]);

  const SliderLists = () => {
    sliderList().then((data) => {
      setSliderImages(  data && data.result);
    });
  };

  const advertiseList = () => {
    advertiseListAPI().then((data) => {
      setAdvertiseImage(data.res_);
    });
  };

  const featuredProductsLists = () => {
    getFeaturedProduct().then((data) =>{
      if(data && data.data && data.data.result){
        let filteredArray = data.data.result.filter((ele)=> ele != null)
        console.log("filteredArray",filteredArray)
        setFeaturedProductList(filteredArray)
      }
    })
  }
  console.log("productList",productList)
  useEffect(() => {
    //const interval = setInterval(() => {
    SliderLists();
    advertiseList();
    featuredProductsLists();
    //}, 50000);  
    //SliderLists();
    //advertiseList();
    // async function fetchData() {
    //   // You can await here
    //   const response = await getProducts();
    //   setProductList(response.result)
    //   // ...
    // }
    //fetchData();

    // return () => clearInterval(interval);
  }, []);
  const state = {
    responsive: {
      0: {
        items: 1,
      },
      450: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };

  return (
    <div className="container-fluid" >
      <SliderImages sliderImages={sliderImages}/>
      <div className="" >
        <div className="container1 custom_container1">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="new_product_tabs">
                <div className="justify-content-end" style={{height:"68px"}}>
                  <h3 className="title" >
                   
                    <span >
                      <i className="fas fa-gift"></i>
                    </span>
                    Featured Products
                  </h3>
                </div>
                <div className="tab-content" id="">
                  <div
                    id="home"
                    className="tab-pane active show"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="product_slider">
                      <OwlCarousel
                        className="owl-carousel owl-theme"
                        nav={true}
                        dot={"false"}
                        margin={10}
                        items={4}
                      // responsive={state.responsive}
                      
                      >
                       
                        {
                          
                          productList != "" 
                            ? productList.map((ele, i) => (

                              !ele.deletedAt ?
                                <div
                                  key={i}
                                  className="item"
                                  style={{ width: "99%" }}
                                >
                                  <ProductBox
                                    image={ ele.image.length != 0 ? ele.image.content && ele.image.content : ""}
                                    productId={ele._id}
                                    name={ele.name}
                                    price={ele.unitPrice}
                                    productCode={ele.code}
                                    // category={ele.category.name}
                                    product={ele}
                                    keyID={i}
                                  />
                                </div> 
                                : null
                            ))
                            : null}
                      </OwlCarousel>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- The Modal --> */}
        {/* <ProductDetailsModal /> */}
      </div>
      {advertisImage.length > 0 &&
        <div className="bz_section_innerbox_main_wrapper float_left">
          <div className="container custom_container">
            <div className="row">
              {advertisImage.length != 0
                ? advertisImage.map((res, i) => (
                  <div className="col-lg-4 col-md-6 col-12" key={i}>
                    <div className="add_post">
                      <div className="img_hover">
                        <img className="img-fluid" src={res.image} alt="add" />
                      </div>
                      <div className="post_content color_change">
                        <p>Amazing Discount</p>
                        <h2>
                          Digital <span>Camera</span>{" "}
                        </h2>
                        <a className="custom_btn" href="#">
                          Buy Now
                        </a>
                      </div>
                    </div>
                  </div>
                ))
                : null}
            </div>
          </div>
        </div>
      }
      <div className="bz_section_style_main_wrapper float_left">
        <div className="container custom_container">
          <div className="row">
            <div className="col-md-5 col-12">
              <div className="style_img">
                <img
                  className="img-fluid"
                  src="../assets/images/style-img.png"
                  alt="style"
                />
              </div>
            </div>
            <div className="col-md-7 col-12">
              <div className="style_heading">
                <h2>Sleek, Stylish &amp; Quality Powerful</h2>
                <p>
                  Save on innovative &amp; cutting-edge Bazooka applians that
                  make life good.
                </p>
                <a className="custom_btn" href="#">
                  Buy now
                </a>
              </div>
              <div className="sale_bg">
                <img
                  className="img-fluid"
                  src="../assets/images/sale.png"
                  alt="sale"
                />
                <div className="tag_heading">
                  <p>
                    <strong>Special</strong> sale <span>up to 50%</span>{" "}
                  </p>
                </div>
              </div>
              <div id="clockdiv" className="product_timer float_left">
                <div className="da">
                  <span className="days wow fadeInUp">103</span>
                  <div className="smalltext wow fadeInUp">Days</div>
                </div>
                <div className="ho">
                  <span className="hours wow fadeInUp">19</span>
                  <div className="smalltext wow fadeInUp">Hrs</div>
                </div>
                <div className="min">
                  <span className="minutes wow fadeInUp">44</span>
                  <div className="smalltext wow fadeInUp">Mins</div>
                </div>
                <div className="second">
                  <span className="seconds wow fadeInUp">47</span>
                  <div className="smalltext wow fadeInUp">Secs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FeaturedProducts);
