import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts, getProductsBySerachCrteria } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import $ from 'jquery';
import { useParams } from "react-router-dom";
import { topCategories } from "../recoil/atom/topCategories";
import { useRecoilState } from "recoil";
import ProductBox from "./ProductBox";
// $(document).ready(function(){
//     $( "#slider-range" ).slider({
//         range: true,
//         min: 0,
//         max: 500,
//         values: [ 75, 300 ],
//         slide: function( event, ui ) {
//         $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
//         }
//     });
//     $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
//         " - $" + $( "#slider-range" ).slider( "values", 1 ) );
// })    

const Shop = () => {
   const [myFilters, setMyFilters] = useState({
      filters: { category: [], price: [] }
   });
   
   //const [categories, setCategories] = useState([]);
   const [error, setError] = useState(false);
   const [limit, setLimit] = useState(6);
   const [skip, setSkip] = useState(0);
   const [size, setSize] = useState(0);
   const [filteredResults, setFilteredResults] = useState([]);
   let { category, name } = useParams();
  
   // setCategory(categoryparam)
   //    setName(nameparam)
 
 
   


   const loadFilteredResults = async (category, name) => {
      // console.log(newFilters);
      /*getFilteredProducts(skip, limit, newFilters).then(data => {
          if (data && data.error) {
              setError(data.error);
          } else {
              setFilteredResults(data && data.data);
              setSize(data && data.size);
              setSkip(0);
          }
      });*/
      let data = await getProductsBySerachCrteria(category, name);
      console.log("filtered result : ", data)
      if (data && data.error) {
         setError(data.error);
         return [];
      } else if (data && data.result) {
         return data.result;

      }
   };


   useEffect( () => {
      const fetchData =async ()=>{
         const response =  await loadFilteredResults(category,name)
         setFilteredResults(response)
      }

      fetchData();
      //const response =  await init();
      //await loadFilteredResults(category,name);
   }, []);

   
   
   

   useEffect(() => {
      async function fetchData() {
        let resp = await loadFilteredResults(category, name);
        setFilteredResults(resp)
      }
      fetchData()
   }, [category,name])

  

   //  return(

   //  )

   


   return (


      <Layout
         title=""
         description=""
         className="container-fluid"
      >



         <div className="bz_inner_page_navigation float_left">
            <div className="container custom_container">
               <div className="inner_menu float_left">
                  <ul>
                     <li><a href="/"> <span><i className="fas fa-home"></i></span> </a></li>
                     <li><a href="/"> <span><i className="fas fa-angle-right"></i></span> Home</a></li>
                     <li className="active"><a href="#"> <span><i className="fas fa-angle-right"></i></span> Shop</a></li>
                  </ul>
               </div>
            </div>
         </div>

         <div className="bz_product_grid_content_main_wrapper float_left">
            <div className="container custom_container">
               <div className="row">
                  <div className="col-lg-3 col-md-3 col-12 order-sm-9 order-xs-9 order-12 order-lg-0 order-md-0">
                     <div className="checkout_form float_left">
                        <div className="accordion" id="accordionExample">

                           <div className="accordian_first_wrapper float_left">
                              <div className="card checkout_accord">
                                 <div className="card-header accord_header" id="headingTwo">
                                    <h2 className="mb-0">
                                       Price
                                    </h2>
                                 </div>
                                 <div className="card-body accord_body price_range">
                                    <div id="slider-range"></div>
                                    <p> Price <span><input type="text" id="amount" /></span> </p>
                                 </div>
                              </div>
                           </div>




                        </div>
                     </div>
                     
                  </div>

                  <div className="col-lg-9 col-md-9 col-12">
                     <div className="bz_grid_menu_main_wrapper float_left">
                        <div className="menu_tabs">
                           <div className="row">
                              <div className="col-md-7 col-12">
                                 <div className="select_search">
                                    <label>Sort by:</label>
                                    <select id="country">
                                       <option>Summer Wear</option>
                                       <option>Kids Wear</option>
                                       <option>Men's Wear</option>
                                       <option>Sports Wear</option>
                                       <option>fashion wear</option>
                                    </select>
                                 </div>
                              </div>
                              <div className="col-md-5 col-8 pl-0">
                                 <div className="number_pegination resp-mr">
                                    <p>Showing 1-15 of 66 Total</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="tab-content">
                           <div id="grid" className="tab-pane fade in active show">
                              <div className="upperPadding" style={{ padding: "0%" }}>
                                 <div className="row">
                                    <div className="bz_newproduct_main_wrapper float_left">

                                       <div className="container custom_container">
                                          <div className="row">
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

                                                            {filteredResults.map((item, index) => (
                                                               <div
                                                                  //  key={index}
                                                                  className="item"

                                                               >
                                                                  <ProductBox
                                                                     image={item.images.length != 0 ? item.images[0].content : "No image to display"}
                                                                     productId={item._id}
                                                                     name={item.name}
                                                                     price={item.price}
                                                                     productCode={item.code}
                                                                     // category={ele.category.name}
                                                                     product={item}
                                                                     keyID={index}
                                                                  />

                                                               </div>
                                                            ))}
                                                         </div>


                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>

                                       </div>
                                    </div>
                                 </div>
                              </div>

                              
                              
                           </div>
                           
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="modal" id="myModal">
               <div className="modal-dialog product_modal">
                  <div className="modal-content">
                     <div className="modal-body">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <div className="row">
                           <div className="col-lg-5 col-md-5 col-12">
                              <div className="sell_slider">
                                 <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner">
                                       <div className="carousel-item active">
                                          <img className="d-block w-100" src="../assets/images/product.jpg" alt="First slide" />
                                       </div>
                                       <div className="carousel-item">
                                          <img className="d-block w-100" src="../assets/images/product.jpg" alt="Second slide" />
                                       </div>
                                       <div className="carousel-item">
                                          <img className="d-block w-100" src="../assets/images/product.jpg" alt="Third slide" />
                                       </div>
                                       <div className="carousel-item">
                                          <img className="d-block w-100" src="../assets/images/product.jpg" alt="Third slide" />
                                       </div>
                                    </div>
                                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                       <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                       <span className="sr-only">Previous</span>
                                    </a>
                                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                       <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                       <span className="sr-only">Next</span>
                                    </a>
                                    <div className="container pt-4 pb-5 small_slider">
                                       <div className="row carousel-indicators">
                                          <div className="item">
                                             <img src="../assets/images/product.jpg" className="img-fluid" alt="img" data-target="#carouselExampleIndicators" data-slide-to="0" />
                                          </div>
                                          <div className="item">
                                             <img src="../assets/images/product.jpg" className="img-fluid" alt="img" data-target="#carouselExampleIndicators" data-slide-to="1" />
                                          </div>
                                          <div className="item">
                                             <img src="../assets/images/product.jpg" className="img-fluid" alt="img" data-target="#carouselExampleIndicators" data-slide-to="2" />
                                          </div>
                                          <div className="item">
                                             <img src="../assets/images/product.jpg" className="img-fluid" alt="img" data-target="#carouselExampleIndicators" data-slide-to="3" />
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="col-lg-7 col-md-7 col-12">
                              <div className="b_product_sell_details_wrapper float_left">
                                 <div className="bz_product_heading float_left">
                                    <h3>Boat Rockerz 450 Bluetooth Headset</h3>
                                    <ul className="review">
                                       <li>
                                          <ul className="star">
                                             <li><a href="#"><i className="fas fa-star"></i></a></li>
                                             <li><a href="#"><i className="fas fa-star"></i></a></li>
                                             <li><a href="#"><i className="fas fa-star"></i></a></li>
                                             <li><a href="#"><i className="fas fa-star"></i></a></li>
                                             <li><a href="#"><i className="fas fa-star"></i></a></li>
                                          </ul>
                                       </li>
                                       <li><a href="#">1 customer review</a></li>
                                       <li><a href="#">Add a review</a></li>
                                    </ul>
                                    <h3>$492.00 <span><del>$379.00</del></span> </h3>
                                    <p>Set your mind ablaze with the slick sound and expansive design that has culminated into the boAt Rockerz 450, adding luxury to your sound. Propelled by crystal clear 40mm dynamic drivers, slip into an alternate HD Immersive Audio reality. The soft cornered matte black finish allows for a comfortable fit, propagated by plush foam in an adaptive and adjustable design. Choose your mode, go wireless with Bluetooth V4.2 or connect an aux wire that cause any drain on the 300mAh Rechargeable Lithium Battery.</p>
                                 </div>
                                 <div className="color_code float_left">
                                    <label>Color :</label>
                                    <ul className="color_change">
                                       <li className="black-co"><a href="#"></a></li>
                                       <li className="grey-co"><a href="#"></a></li>
                                       <li className="pink-co"><a href="#"></a></li>
                                       <li className="pink-co"><a href="#"></a></li>
                                    </ul>
                                    <p>Categories: <span><a href="#">Electronic</a></span></p>
                                    <p>Tag: <span><a href="#">Electronic,</a> <a href="#">Mobile,</a> <a href="#">Fashion cloth</a></span></p>
                                 </div>
                                 <div className="number_pluse float_left">
                                    <div className="nice-number"><button type="button">-</button><input type="number" defaultValue="1" /><button type="button">+</button></div>
                                    <a href="/mycart" className="cart_btn">Add To Cart</a>
                                 </div>
                                 <div className="share_icon float_left">
                                    <p>Share:</p>
                                    <ul>
                                       <li>
                                          <a href="#"><i className="fab fa-facebook-f"></i></a>
                                          <a href="#"><i className="fab fa-twitter"></i></a>
                                          <a href="#"><i className="fab fa-instagram"></i></a>
                                          <a href="#"><i className="fab fa-youtube"></i></a>
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="modal" id="myModal1">
               <div className="modal-dialog product_modal">
                  <div className="modal-content">
                     <div className="modal-body">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <div className="row">
                           <div className="col-lg-5 col-md-5 col-12">
                              <div className="sell_slider">
                                 <div id="carouselExampleIndicators1" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner">
                                       <div className="carousel-item active">
                                          <img className="d-block w-100" src="../assets/images/product.jpg" alt="First slide" />
                                       </div>
                                       <div className="carousel-item">
                                          <img className="d-block w-100" src="../assets/images/product.jpg" alt="Second slide" />
                                       </div>
                                       <div className="carousel-item">
                                          <img className="d-block w-100" src="../assets/images/product.jpg" alt="Third slide" />
                                       </div>
                                       <div className="carousel-item">
                                          <img className="d-block w-100" src="../assets/images/product.jpg" alt="Third slide" />
                                       </div>
                                    </div>
                                    <a className="carousel-control-prev" href="#carouselExampleIndicators1" role="button" data-slide="prev">
                                       <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                       <span className="sr-only">Previous</span>
                                    </a>
                                    <a className="carousel-control-next" href="#carouselExampleIndicators1" role="button" data-slide="next">
                                       <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                       <span className="sr-only">Next</span>
                                    </a>
                                    <div className="container pt-4 pb-5 small_slider">
                                       <div className="row carousel-indicators">
                                          <div className="item">
                                             <img src="../assets/images/product.jpg" className="img-fluid" alt="img" data-target="#carouselExampleIndicators1" data-slide-to="0" />
                                          </div>
                                          <div className="item">
                                             <img src="../assets/images/product.jpg" className="img-fluid" alt="img" data-target="#carouselExampleIndicators1" data-slide-to="1" />
                                          </div>
                                          <div className="item">
                                             <img src="../assets/images/product.jpg" className="img-fluid" alt="img" data-target="#carouselExampleIndicators1" data-slide-to="2" />
                                          </div>
                                          <div className="item">
                                             <img src="../assets/images/product.jpg" className="img-fluid" alt="img" data-target="#carouselExampleIndicators1" data-slide-to="3" />
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="col-lg-7 col-md-7 col-12">
                              <div className="b_product_sell_details_wrapper float_left">
                                 <div className="bz_product_heading float_left">
                                    <h3>Window 10 I3 4rth Generation  </h3>
                                    <ul className="review">
                                       <li>
                                          <ul className="star">
                                             <li><a href="#"><i className="fas fa-star"></i></a></li>
                                             <li><a href="#"><i className="fas fa-star"></i></a></li>
                                             <li><a href="#"><i className="fas fa-star"></i></a></li>
                                             <li><a href="#"><i className="fas fa-star"></i></a></li>
                                             <li><a href="#"><i className="fas fa-star"></i></a></li>
                                          </ul>
                                       </li>
                                       <li><a href="#">1 customer review</a></li>
                                       <li><a href="#">Add a review</a></li>
                                    </ul>
                                    <h3>$800.00 <span><del>$850.00</del></span> </h3>
                                    <p>For on-the-go fast computing, easy multitasking, and reliable performance, you need the 14Q laptop that features multiple impressive features. This laptop has a 256 GB SSD to store music, videos, and much more. Also, it has a 3 cell 41 WHr Li-ion fast-charge battery and the Windows 10 OS to perform a number of tasks uninterruptedly and effortlessly.</p>
                                 </div>
                                 <div className="color_code float_left">
                                    <label>Color :</label>
                                    <ul className="color_change">
                                       <li className="black-co"><a href="#"></a></li>
                                       <li className="grey-co"><a href="#"></a></li>
                                       <li className="pink-co"><a href="#"></a></li>
                                       <li className="pink-co"><a href="#"></a></li>
                                    </ul>
                                    <p>Categories: <span><a href="#">Electronic</a></span></p>
                                    <p>Tag: <span><a href="#">Electronic,</a> <a href="#">Mobile,</a> <a href="#">Fashion cloth</a></span></p>
                                 </div>
                                 <div className="number_pluse float_left">
                                    <input type="number" defaultValue="1" />
                                    <a href="/mycart" className="cart_btn">Add To Cart</a>
                                 </div>
                                 <div className="share_icon float_left">
                                    <p>Share:</p>
                                    <ul>
                                       <li>
                                          <a href="#"><i className="fab fa-facebook-f"></i></a>
                                          <a href="#"><i className="fab fa-twitter"></i></a>
                                          <a href="#"><i className="fab fa-instagram"></i></a>
                                          <a href="#"><i className="fab fa-youtube"></i></a>
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default Shop;
