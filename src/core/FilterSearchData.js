import React, { useState, useEffect } from "react";
import { getTopCategories, getCategories, list, searchingData } from "./apiCore";
import Search from './Search.js'
import results from './Search.js'
import Card from "./Card";
import ProductBox from "./ProductBox";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ProductDetailsModal from "./ProductDetailsModal";
const data = ''

const FilterSearchData = (props) => {
    console.log(props.data, "FilteredData")
   
    return (
        
        <div className="upperPadding" style={{ padding: "0%" }}>
         
          <div className="bz_newproduct_main_wrapper float_left">
          
              <div className="container custom_container">
              <div className="row1">
                <div className="col-md-12 col-12">
                  <div className="new_product_tabs">
                   
                    <div className="tab-content" id="">
                      <div
                        id="home"
                        className="tab-pane active show"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <div className="product_slider">
                          
                            {
                              
                              props.data != ""
                                ?props.data && props.data.result.map((ele, i) => (
    
                                  
                                    <div
                                      key={i}
                                      className="item"
                                      style={{ width: "130%" }}
                                    >{console.log("props",props.data)} 
                                      <ProductBox
                                        image={ele.images.length != 0 ? ele.images[0].content : "No image to display"}
                                        productId={ele._id}
                                        name={ele.name}
                                        price={ele.price}
                                        productCode={ele.code}
                                        // category={ele.category.name}
                                        product={ele}
                                        keyID={i}
                                      />
                                    </div> 
                                ))
                                : null}
                              
                          
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          
            
          </div>
          </div>
          </div>
         

    );
   

}


export default FilterSearchData