import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts,getProductsBySerachCrteria } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import $ from 'jquery';
import { useParams } from "react-router-dom";
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
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    let { category,name } = useParams();
     
    const init = async () => {
      getCategories().then(data => {
         if (data && data.error) {
             setError(data.error);
         } 
         else {
             setCategories(data);
         }
     });
    };

    
    const loadFilteredResults = async (category,name) => {
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
        let data = await getProductsBySerachCrteria(category,name);
        console.log("filtered result : ", data)
        if (data && data.error) {
         setError(data.error);
         return [];
        } else if(data && data.result) {
              return data.result;
              
         }
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    useEffect(async () => {
     
        await init();
        //await loadFilteredResults(category,name);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    useEffect(async ()=>{

      let resp = await loadFilteredResults(category,name);
      setFilteredResults(resp)
      console.log("resp",resp)
      resp.map((product, i) => {
        
         console.log(`product ${i}`,product)
      })
      
    },[category,name])

   //  return(
   //    <div className="upperPadding" style={{ padding: "0%" }}>
             
   //    <div className="bz_newproduct_main_wrapper float_left">
      
   //        <div className="container custom_container">
   //        <div className="row1">
   //          <div className="col-md-12 col-12">
   //            <div className="new_product_tabs">
               
   //              <div className="tab-content" id="">
   //                <div
   //                  id="home"
   //                  className="tab-pane active show"
   //                  role="tabpanel"
   //                  aria-labelledby="home-tab"
   //                >
   //                  <div className="product_slider">
                      
                        

                              
   //                              <div
   //                               //  key={index}
   //                                className="item"
                                 
   //                              >
   //                               {filteredResults.map((item, index) => (
   //                                <ProductBox
   //                                  image={item.images.length != 0 ? item.images[0].content : "No image to display"}
   //                                  productId={item._id}
   //                                  name={item.name}
   //                                  price={item.price}
   //                                  productCode={item.code}
   //                                  // category={ele.category.name}
   //                                  product={item}
   //                                  keyID={index}
   //                                />
   //                                 ))}  
   //                              </div> 
                               
   //                  </div>
   //                </div>
   //              </div>
   //            </div>
   //          </div>
   //        </div>
      
        
   //    </div>
   //    </div>
   //    </div>
   //  )
    
    console.log(filteredResults,"dlsfksof")
    
   
    return (

      // <div className="upperPadding" style={{ padding: "0%" }}>
             
      // <div className="bz_newproduct_main_wrapper float_left">
      
      //     <div className="container custom_container">
      //     <div className="row1">
      //       <div className="col-md-12 col-12">
      //         <div className="new_product_tabs">
               
      //           <div className="tab-content" id="">
      //             <div
      //               id="home"
      //               className="tab-pane active show"
      //               role="tabpanel"
      //               aria-labelledby="home-tab"
      //             >
      //               <div className="product_slider">
                      
                        

                              
      //                           <div
      //                            //  key={index}
      //                             className="item"
      //                             style={{ width: "130%" }}
      //                           >
      //                            {filteredResults.map((item, index) => (
      //                             <ProductBox
      //                               image={item.images.length != 0 ? item.images[0].content : "No image to display"}
      //                               productId={item._id}
      //                               name={item.name}
      //                               price={item.price}
      //                               productCode={item.code}
      //                               // category={ele.category.name}
      //                               product={item}
      //                               keyID={index}
      //                             />
      //                              ))}  
      //                           </div> 
                               
      //               </div>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      
        
      // </div>
      // </div>
      // </div>
        <Layout
            title=""
            description=""
            className=""
        >
            {/*
            <div className="row">
                <div className="col-4">
                    <h4>Filter by categories</h4>
                    <ul>
                        <Checkbox
                            categories={categories}
                            handleFilters={filters =>
                                handleFilters(filters, "category")
                            }
                        />
                    </ul>

                    <h4>Filter by price range</h4>
                    <div>
                        <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")
                            }
                        />
                    </div>
                </div>

                <div className="col-8">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResults.map((product, i) => (
                            <div key={i} className="col-4 mb-3">
                                <Card product={product} />
                            </div>
                        ))}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
            */}


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
                                    <div className="card-header accord_header" id="headingOne">
                                       <h2 className="mb-0">
                                          Categories                       
                                       </h2>
                                    </div>
                                    <div className="card-body accord_body">
                                       <div className="categories_blog">
                                          <ul>
                                             <li><i className="fa fa-caret-right"></i>  <a href="#">Womens</a>  <span>[245]</span>
                                             </li>
                                             <li><i className="fa fa-caret-right"></i>  <a href="#">Electronic</a>  <span>[142]</span>
                                             </li>
                                             <li><i className="fa fa-caret-right"></i>  <a href="#">Fashion</a>  <span>[654]</span>
                                             </li>
                                             <li><i className="fa fa-caret-right"></i>  <a href="#">Artical</a>  <span>[50]</span>
                                             </li>
                                             <li><i className="fa fa-caret-right"></i>  <a href="#">Offers </a>  <span>[225]</span>
                                             </li>
                                             <li><i className="fa fa-caret-right"></i>  <a href="#">Shopping Store</a>  <span>[741]</span>
                                             </li>
                                          </ul>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="accordian_first_wrapper float_left">
                                 <div className="card checkout_accord">
                                    <div className="card-header accord_header" id="headingTwo">
                                       <h2 className="mb-0">
                                          Price
                                       </h2>
                                    </div>
                                    <div className="card-body accord_body price_range">
                                       <div id="slider-range"></div>
                                       <p> Price <span><input type="text" id="amount"/></span> </p>
                                    </div>
                                 </div>
                              </div>
                              <div className="accordian_first_wrapper float_left">
                                 <div className="card checkout_accord">
                                    <div className="card-header accord_header" id="headingThree">
                                       <h2 className="mb-0">
                                          Brand              
                                       </h2>
                                    </div>
                                    <div className="card-body accord_body">
                                       <div className="select_categories">
                                          <p className="cc_pc_color7">
                                             <input type="checkbox" id="c37" name="cb"/>
                                             <label htmlFor="c37">Phone (22)</label>
                                          </p>
                                          <p className="cc_pc_color8">
                                             <input type="checkbox" id="38" name="cb"/>
                                             <label htmlFor="38">Sony (245)</label>
                                          </p>
                                          <p className="cc_pc_color9">
                                             <input type="checkbox" id="39" name="cb"/>
                                             <label htmlFor="39">FabAlley (11)</label>
                                          </p>
                                          <p className="cc_pc_color10">
                                             <input type="checkbox" id="40"/>
                                             <label htmlFor="40">Vero Moda (78)</label>
                                          </p>
                                          <p className="cc_pc_color11">
                                             <input type="checkbox" id="41"/>
                                             <label htmlFor="41">DressBerry (36)</label>
                                          </p>
                                          <p><a href="#">+12 More</a></p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="accordian_first_wrapper float_left">
                                 <div className="card checkout_accord">
                                    <div className="card-header accord_header" id="headingFour">
                                       <h2 className="mb-0">
                                          Offers                
                                       </h2>
                                    </div>
                                    <div className="card-body accord_body">
                                       <div className="select_categories">
                                          <p className="cc_pc_color12">
                                             <input type="checkbox" id="c42" name="cb"/>
                                             <label htmlFor="c42">Phone (22)</label>
                                          </p>
                                          <p className="cc_pc_color13">
                                             <input type="checkbox" id="43" name="cb"/>
                                             <label htmlFor="43">Sony (245)</label>
                                          </p>
                                          <p className="cc_pc_color14">
                                             <input type="checkbox" id="44" name="cb"/>
                                             <label htmlFor="44">FabAlley (11)</label>
                                          </p>
                                          <p className="cc_pc_color15">
                                             <input type="checkbox" id="45"/>
                                             <label htmlFor="45">Vero Moda (78)</label>
                                          </p>
                                          <p className="cc_pc_color16">
                                             <input type="checkbox" id="46"/>
                                             <label htmlFor="46">DressBerry (36)</label>
                                          </p>
                                          <p><a href="#">+12 More</a></p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="accordian_first_wrapper float_left">
                                 <div className="card checkout_accord">
                                    <div className="card-header accord_header" id="headingFive">
                                       <h2 className="mb-0">
                                          Availability
                                       </h2>
                                    </div>
                                    <div className="card-body accord_body">
                                       <div className="select_categories">
                                          <p className="cc_pc_color17">
                                             <input type="checkbox" id="c47" name="cb"/>
                                             <label htmlFor="c47">Phone (22)</label>
                                          </p>
                                          <p className="cc_pc_color18">
                                             <input type="checkbox" id="48" name="cb"/>
                                             <label htmlFor="48">Sony (245)</label>
                                          </p>
                                          <p className="cc_pc_color19">
                                             <input type="checkbox" id="49" name="cb"/>
                                             <label htmlFor="49">FabAlley (11)</label>
                                          </p>
                                          <p className="cc_pc_color20">
                                             <input type="checkbox" id="50"/>
                                             <label htmlFor="50">Vero Moda (78)</label>
                                          </p>
                                          <p className="cc_pc_color21">
                                             <input type="checkbox" id="51"/>
                                             <label htmlFor="51">DressBerry (36)</label>
                                          </p>
                                          <p><a href="#">+12 More</a></p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="accordian_first_wrapper float_left">
                                 <div className="card checkout_accord">
                                    <div className="card-header accord_header" id="headingSix">
                                       <h2 className="mb-0">
                                          Colors
                                       </h2>
                                    </div>
                                    <div className="card-body accord_body">
                                       <div className="color_slide">
                                          <label className="main_box_color">
                                          <input type="checkbox" defaultChecked="checked"/>
                                          <span className="checkmark red"></span>
                                          </label>
                                          <label className="main_box_color">
                                          <input type="checkbox"/>
                                          <span className="checkmark green"></span>
                                          </label>
                                          <label className="main_box_color">
                                          <input type="checkbox"/>
                                          <span className="checkmark yellow"></span>
                                          </label>
                                          <label className="main_box_color">
                                          <input type="checkbox"/>
                                          <span className="checkmark blue"></span>
                                          </label>
                                          <label className="main_box_color">
                                          <input type="checkbox"/>
                                          <span className="checkmark pink"></span>
                                          </label>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="offer_slider float_left">
                        <OwlCarousel className='owl-carousel owl-theme' loop margin={10} items={1} autoplay={true}>
                              <div className="item">
                                 <div className="offer_box">
                                    <img className="img-fluid" src="../assets/images/product.jpg" alt="offer"/>
                                    <div className="offer_content">
                                       <div className="left_offer">
                                          <p>40% Off</p>
                                          <h4>Fashion</h4>
                                       </div>
                                    </div>
                                    <div className="right_offer">
                                       <h3>$492.00 <span><del>$379.00</del></span> </h3>
                                       <a href="#">Buy Now</a>
                                    </div>
                                 </div>
                              </div>
                              <div className="item">
                                 <div className="offer_box">
                                    <img className="img-fluid" src="../assets/images/product.jpg" alt="offer"/>
                                    <div className="offer_content">
                                       <div className="left_offer">
                                          <p>40% Off</p>
                                          <h4>Fashion</h4>
                                       </div>
                                    </div>
                                    <div className="right_offer">
                                       <h3>$492.00 <span><del>$379.00</del></span> </h3>
                                       <a href="#">Buy Now</a>
                                    </div>
                                 </div>
                              </div>
                              <div className="item">
                                 <div className="offer_box">
                                    <img className="img-fluid" src="../assets/images/product.jpg" alt="offer"/>
                                    <div className="offer_content">
                                       <div className="left_offer">
                                          <p>40% Off</p>
                                          <h4>Fashion</h4>
                                       </div>
                                    </div>
                                    <div className="right_offer">
                                       <h3>$492.00 <span><del>$379.00</del></span> </h3>
                                       <a href="#">Buy Now</a>
                                    </div>
                                 </div>
                              </div>
                           </OwlCarousel>
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
                                 {/* <div className="bz_product_view_grip_wrapper float_left">
                                    <div className="row">
                                       <div className="col-lg-4 col-md-6 col-12">
                                          <div className="product_box">
                                             <div className="product_img">
                                                <img className="img-fluid" src="../assets/images/product.jpg" alt="product img"/>
                                                <div className="top_icon">
                                                   <p className="new">new</p>
                                                   <span><i className="far fa-heart"></i></span>
                                                </div>
                                                <div className="product_overlay">
                                                   <div className="search_icon">
                                                      <a href="#" data-toggle="modal" data-target="#myModal"><i className="fa fa-search"></i></a>
                                                   </div>
                                                </div>
                                             </div>
                                             
                                             <div className="product_content">
                                                <span className="category-list">Headphones</span>
                                                <a href="/product/1">
                                                   <h3 className="woocommerce-loop-product__title">Supre Extra Base Sound.</h3>
                                                </a>
                                                <ul className="star">
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$492.00 <span> <del>$379.00</del> </span> </h4>
                                                <a className="add_btn custom_btn" href="/mycart">Add to Cart</a>
                                             </div>
                                          </div>
                                       </div>
                                       
                                       <div className="col-lg-4 col-md-6 col-12">
                                          <div className="product_box">
                                             <div className="product_img">
                                                <img className="img-fluid" src="../assets/images/product.jpg" alt="product img"/>
                                                <div className="top_icon">
                                                   <p>hot</p>
                                                   <span><i className="far fa-heart"></i></span>
                                                </div>
                                                <div className="product_overlay">
                                                   <div className="search_icon">
                                                      <a href="#" data-toggle="modal" data-target="#myModal"><i className="fa fa-search"></i></a>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="product_content">
                                                <span className="category-list">Earphones</span>
                                                <a href="/product/1">
                                                   <h3 className="woocommerce-loop-product__title">Blue, Wireles in the ear.</h3>
                                                </a>
                                                <ul className="star">
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$350.00 <span> <del>$379.00</del> </span> </h4>
                                                <a className="add_btn custom_btn" href="/mycart">Add to Cart</a>
                                             </div>
                                          </div>
                                       </div>
                                       
                                       <div className="col-lg-4 col-md-6 col-12">
                                          <div className="product_box">
                                             <div className="product_img">
                                                <img className="img-fluid" src="../assets/images/product.jpg" alt="product img"/>
                                                <div className="top_icon">
                                                   <p className="new">new</p>
                                                   <span><i className="far fa-heart"></i></span>
                                                </div>
                                                <div className="product_overlay">
                                                   <div className="search_icon">
                                                      <a href="#" data-toggle="modal" data-target="#myModal1"><i className="fa fa-search"></i></a>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="product_content">
                                                <span className="category-list">Ultra HD Laptop</span>
                                                <a href="/product/1">
                                                   <h3 className="woocommerce-loop-product__title">4GB/TB HDD/Window 10</h3>
                                                </a>
                                                <ul className="star">
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$500.00 <span> <del>$550.00</del> </span> </h4>
                                                <a className="add_btn custom_btn" href="/mycart">Add to Cart</a>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div> */}
                                 
                                 {/* <div className="bz_product_view_grip_wrapper float_left">
                                    <div className="row">
                                       <div className="col-lg-4 col-md-6 col-12">
                                          <div className="product_box">
                                             <div className="product_img">
                                                <img className="img-fluid" src="../assets/images/product.jpg" alt="product img"/>
                                                <div className="top_icon">
                                                   <p className="new">new</p>
                                                   <span><i className="far fa-heart"></i></span>
                                                </div>
                                                <div className="product_overlay">
                                                   <div className="search_icon">
                                                      <a href="#" data-toggle="modal" data-target="#myModal"><i className="fa fa-search"></i></a>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="product_content">
                                                <span className="category-list">HD Camera</span>
                                                <a href="/product/1">
                                                   <h3 className="woocommerce-loop-product__title">20.1 MP Optical Zoom</h3>
                                                </a>
                                                <ul className="star">
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$450.00 <span> <del>$500.00</del> </span> </h4>
                                                <a className="add_btn custom_btn" href="/mycart">Add to Cart</a>
                                             </div>
                                          </div>
                                       </div>
                                       
                                       <div className="col-lg-4 col-md-6 col-12">
                                          <div className="product_box">
                                             <div className="product_img">
                                                <img className="img-fluid" src="../assets/images/product.jpg" alt="product img"/>
                                                <div className="top_icon">
                                                   <p className="new">new</p>
                                                   <span><i className="far fa-heart"></i></span>
                                                </div>
                                                <div className="product_overlay">
                                                   <div className="search_icon">
                                                      <a href="#" data-toggle="modal" data-target="#myModal"><i className="fa fa-search"></i></a>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="product_content">
                                                <span className="category-list">Headphones</span>
                                                <a href="/product/1">
                                                   <h3 className="woocommerce-loop-product__title"></h3>
                                                </a>
                                                <ul className="star">
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$492.00 <span> <del>$379.00</del> </span> </h4>
                                                <a className="add_btn custom_btn" href="/mycart">Add to Cart</a>
                                             </div>
                                          </div>
                                       </div>
                                       
                                       <div className="col-lg-4 col-md-6 col-12">
                                          <div className="product_box">
                                             <div className="product_img">
                                                <img className="img-fluid" src="../assets/images/product.jpg" alt="product img"/>
                                                <div className="top_icon">
                                                   <p>hot</p>
                                                   <span><i className="far fa-heart"></i></span>
                                                </div>
                                                <div className="product_overlay">
                                                   <div className="search_icon">
                                                      <a href="#"><i className="fa fa-search"></i></a>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="product_content">
                                                <span className="category-list">Washing Machine</span>
                                                <a href="/product/1">
                                                   <h3 className="woocommerce-loop-product__title">Automatic Load Washing Machines </h3>
                                                </a>
                                                <ul className="star">
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$492.00 <span> <del>$379.00</del> </span> </h4>
                                                <a className="add_btn custom_btn" href="/mycart">Add to Cart</a>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div> */}
                                 
                                 {/* <div className="bz_product_view_grip_wrapper float_left">
                                    <div className="row">
                                       <div className="col-lg-4 col-md-6 col-12">
                                          <div className="product_box">
                                             <div className="product_img">
                                                <img className="img-fluid" src="../assets/images/product.jpg" alt="product img"/>
                                                <div className="top_icon">
                                                   <p className="new">new</p>
                                                   <span><i className="far fa-heart"></i></span>
                                                </div>
                                                <div className="product_overlay">
                                                   <div className="search_icon">
                                                      <a href="#"><i className="fa fa-search"></i></a>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="product_content">
                                                <span className="category-list">Washing Machine</span>
                                                <a href="/product/1">
                                                   <h3 className="woocommerce-loop-product__title">Number of wash programs - 2</h3>
                                                </a>
                                                <ul className="star">
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$500.00 <span> <del>$679.00</del> </span> </h4>
                                                <a className="add_btn custom_btn" href="/mycart">Add to Cart</a>
                                             </div>
                                          </div>
                                       </div>
                                       
                                       <div className="col-lg-4 col-md-6 col-12">
                                          <div className="product_box">
                                             <div className="product_img">
                                                <img className="img-fluid" src="../assets/images/product.jpg" alt="product img"/>
                                                <div className="top_icon">
                                                   <p className="new">new</p>
                                                   <span><i className="far fa-heart"></i></span>
                                                </div>
                                                <div className="product_overlay">
                                                   <div className="search_icon">
                                                      <a href="#"><i className="fa fa-search"></i></a>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="product_content">
                                                <span className="category-list">Camera</span>
                                                <a href="/product/1">
                                                   <h3 className="woocommerce-loop-product__title">Effective Pixels: 20.1 MP</h3>
                                                </a>
                                                <ul className="star">
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$492.00 <span> <del>$379.00</del> </span> </h4>
                                                <a className="add_btn custom_btn" href="/mycart">Add to Cart</a>
                                             </div>
                                          </div>
                                       </div>
                                       
                                       <div className="col-lg-4 col-md-6 col-12">
                                          <div className="product_box">
                                             <div className="product_img">
                                                <img className="img-fluid" src="../assets/images/product.jpg" alt="product img"/>
                                                <div className="top_icon">
                                                   <p className="new">new</p>
                                                   <span><i className="far fa-heart"></i></span>
                                                </div>
                                                <div className="product_overlay">
                                                   <div className="search_icon">
                                                      <a href="#"><i className="fa fa-search"></i></a>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="product_content">
                                                <span className="category-list">Camera</span>
                                                <a href="/product/1">
                                                   <h3 className="woocommerce-loop-product__title">Optical Zoom: 6 | Digital Zoom: 12x</h3>
                                                </a>
                                                <ul className="star">
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$492.00 <span> <del>$379.00</del> </span> </h4>
                                                <a className="add_btn custom_btn" href="/mycart">Add to Cart</a>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div> */}
                                 {/* <div className="bz_product_view_grip_wrapper float_left">
                                    <div className="row">
                                       <div className="col-lg-4 col-md-6 col-12">
                                          <div className="product_box">
                                             <div className="product_img">
                                                <img className="img-fluid" src="../assets/images/product.jpg" alt="product img"/>
                                                <div className="top_icon">
                                                   <p className="new">new</p>
                                                   <span><i className="far fa-heart"></i></span>
                                                </div>
                                                <div className="product_overlay">
                                                   <div className="search_icon">
                                                      <a href="#" data-toggle="modal" data-target="#myModal"><i className="fa fa-search"></i></a>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="product_content">
                                                <span className="category-list">HD Camera</span>
                                                <a href="/product/1">
                                                   <h3 className="woocommerce-loop-product__title">20.1 MP Optical Zoom</h3>
                                                </a>
                                                <ul className="star">
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$450.00 <span> <del>$500.00</del> </span> </h4>
                                                <a className="add_btn custom_btn" href="/mycart">Add to Cart</a>
                                             </div>
                                          </div>
                                       </div>
                                       
                                       <div className="col-lg-4 col-md-6 col-12">
                                          <div className="product_box">
                                             <div className="product_img">
                                                <img className="img-fluid" src="../assets/images/product.jpg" alt="product img"/>
                                                <div className="top_icon">
                                                   <p className="new">new</p>
                                                   <span><i className="far fa-heart"></i></span>
                                                </div>
                                                <div className="product_overlay">
                                                   <div className="search_icon">
                                                      <a href="#" data-toggle="modal" data-target="#myModal"><i className="fa fa-search"></i></a>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="product_content">
                                                <span className="category-list">Headphones</span>
                                                <a href="/product/1">
                                                   <h3 className="woocommerce-loop-product__title">Supre Extra Base Sound.</h3>
                                                </a>
                                                <ul className="star">
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$492.00 <span> <del>$379.00</del> </span> </h4>
                                                <a className="add_btn custom_btn" href="/mycart">Add to Cart</a>
                                             </div>
                                          </div>
                                       </div>
                                       
                                       <div className="col-lg-4 col-md-6 col-12">
                                          <div className="product_box">
                                             <div className="product_img">
                                                <img className="img-fluid" src="../assets/images/product.jpg" alt="product img"/>
                                                <div className="top_icon">
                                                   <p>hot</p>
                                                   <span><i className="far fa-heart"></i></span>
                                                </div>
                                                <div className="product_overlay">
                                                   <div className="search_icon">
                                                      <a href="#"><i className="fa fa-search"></i></a>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="product_content">
                                                <span className="category-list">Washing Machine</span>
                                                <a href="/product/1">
                                                   <h3 className="woocommerce-loop-product__title">Automatic Load Washing Machines </h3>
                                                </a>
                                                <ul className="star">
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$492.00 <span> <del>$379.00</del> </span> </h4>
                                                <a className="add_btn custom_btn" href="/mycart">Add to Cart</a>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div> */}
                                 {/* <div className="bz_product_view_grip_wrapper float_left">
                                    <div className="row">
                                       <div className="col-lg-4 col-md-6 col-12">
                                          <div className="product_box">
                                             <div className="product_img">
                                                <img className="img-fluid" src="../assets/images/product.jpg" alt="product img"/>
                                                <div className="top_icon">
                                                   <p className="new">new</p>
                                                   <span><i className="far fa-heart"></i></span>
                                                </div>
                                                <div className="product_overlay">
                                                   <div className="search_icon">
                                                      <a href="#" data-toggle="modal" data-target="#myModal"><i className="fa fa-search"></i></a>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="product_content">
                                                <span className="category-list">HD Camera</span>
                                                <a href="/product/1">
                                                   <h3 className="woocommerce-loop-product__title">20.1 MP Optical Zoom</h3>
                                                </a>
                                                <ul className="star">
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$450.00 <span> <del>$500.00</del> </span> </h4>
                                                <a className="add_btn custom_btn" href="/mycart">Add to Cart</a>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-lg-4 col-md-6 col-12">
                                          <div className="product_box">
                                             <div className="product_img">
                                                <img className="img-fluid" src="../assets/images/product.jpg" alt="product img"/>
                                                <div className="top_icon">
                                                   <p className="new">new</p>
                                                   <span><i className="far fa-heart"></i></span>
                                                </div>
                                                <div className="product_overlay">
                                                   <div className="search_icon">
                                                      <a href="#" data-toggle="modal" data-target="#myModal"><i className="fa fa-search"></i></a>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="product_content">
                                                <span className="category-list">Headphones</span>
                                                <a href="/product/1">
                                                   <h3 className="woocommerce-loop-product__title">Supre Extra Base Sound.</h3>
                                                </a>
                                                <ul className="star">
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$492.00 <span> <del>$379.00</del> </span> </h4>
                                                <a className="add_btn custom_btn" href="/mycart">Add to Cart</a>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-lg-4 col-md-6 col-12">
                                          <div className="product_box">
                                             <div className="product_img">
                                                <img className="img-fluid" src="../assets/images/product.jpg" alt="product img"/>
                                                <div className="top_icon">
                                                   <p>hot</p>
                                                   <span><i className="far fa-heart"></i></span>
                                                </div>
                                                <div className="product_overlay">
                                                   <div className="search_icon">
                                                      <a href="#"><i className="fa fa-search"></i></a>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="product_content">
                                                <span className="category-list">Washing Machine</span>
                                                <a href="/product/1">
                                                   <h3 className="woocommerce-loop-product__title">Automatic Load Washing Machines </h3>
                                                </a>
                                                <ul className="star">
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                   <li><a href="#"><i className="fas fa-star"></i></a></li>
                                                </ul>
                                                <h4>$492.00 <span> <del>$379.00</del> </span> </h4>
                                                <a className="add_btn custom_btn" href="/mycart">Add to Cart</a>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div> */}
                              </div>
                              {/* <div id="list" className="tab-pane fade">
                                 <div className="product_details float_left">
                                    <div className="img_product">
                                       <img className="img-fluid" src="../assets/images/product.jpg" alt="img"/>
                                       <div className="top_icon">
                                          <p>new</p>
                                       </div>
                                       <div className="overlay_post"></div>
                                    </div>
                                    <div className="product_content">
                                       <a href="/product/1">
                                                   <h3>Blue, Wireles in the ear.</h3></a>
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
                                       <div className="rate">
                                          <h3>$492.00 <span><del>$379.00</del></span></h3>
                                          <p>Pellentesque habitant morbi tristique senectus et netus etmalesu fames acturpis egestas. Vestibulum tortor quam.</p>
                                          <a className="addto_btn" href="#">Add to Bag</a>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="product_details float_left">
                                    <div className="img_product">
                                       <img className="img-fluid" src="../assets/images/product.jpg" alt="img"/>
                                       <div className="top_icon">
                                          <p>new</p>
                                       </div>
                                       <div className="overlay_post"></div>
                                    </div>
                                    <div className="product_content">
                                       <a href="/product/1">
                                                   <h3>4GB/TB HDD/Window 10</h3></a>
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
                                       <div className="rate">
                                          <h3>$492.00 <span><del>$379.00</del></span></h3>
                                          <p>Pellentesque habitant morbi tristique senectus et netus etmalesu fames acturpis egestas. Vestibulum tortor quam.</p>
                                          <a className="addto_btn" href="#">Add to Bag</a>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="product_details float_left">
                                    <div className="img_product">
                                       <img className="img-fluid" src="../assets/images/product.jpg" alt="img"/>
                                       <div className="top_icon">
                                          <p>new</p>
                                       </div>
                                       <div className="overlay_post"></div>
                                    </div>
                                    <div className="product_content">
                                       <a href="/product/1">
                                                   <h3>20.1 MP Optical Zoom</h3></a>
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
                                       <div className="rate">
                                          <h3>$492.00 <span><del>$379.00</del></span></h3>
                                          <p>Pellentesque habitant morbi tristique senectus et netus etmalesu fames acturpis egestas. Vestibulum tortor quam.</p>
                                          <a className="addto_btn" href="#">Add to Bag</a>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="product_details float_left">
                                    <div className="img_product">
                                       <img className="img-fluid" src="../assets/images/product.jpg" alt="img"/>
                                       <div className="top_icon">
                                          <p>new</p>
                                       </div>
                                       <div className="overlay_post"></div>
                                    </div>
                                    <div className="product_content">
                                       <a href="/product/1">
                                                   <h3>Supre Extra Base Sound.</h3></a>
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
                                       <div className="rate">
                                          <h3>$492.00 <span><del>$379.00</del></span></h3>
                                          <p>Pellentesque habitant morbi tristique senectus et netus etmalesu fames acturpis egestas. Vestibulum tortor quam.</p>
                                          <a className="addto_btn" href="#">Add to Bag</a>
                                       </div>
                                    </div>
                                 </div>
                              </div> */}
                              {/* <div className="page_pagination">
                                 <ul>
                                    <li className="border_show"><a href="#">Previous</a></li>
                                    <li><a href="#">1</a></li>
                                    <li className="active"><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#">4</a></li>
                                    <li><a href="#">5</a></li>
                                    <li className="border_show"><a href="#">Next</a></li>
                                 </ul>
                              </div> */}
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
                                             <img className="d-block w-100" src="../assets/images/product.jpg" alt="First slide"/>
                                          </div>
                                          <div className="carousel-item">
                                             <img className="d-block w-100" src="../assets/images/product.jpg" alt="Second slide"/>
                                          </div>
                                          <div className="carousel-item">
                                             <img className="d-block w-100" src="../assets/images/product.jpg" alt="Third slide"/>
                                          </div>
                                          <div className="carousel-item">
                                             <img className="d-block w-100" src="../assets/images/product.jpg" alt="Third slide"/>
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
                                                <img src="../assets/images/product.jpg" className="img-fluid" alt="img" data-target="#carouselExampleIndicators" data-slide-to="0"/>
                                             </div>
                                             <div className="item">
                                                <img src="../assets/images/product.jpg" className="img-fluid" alt="img" data-target="#carouselExampleIndicators" data-slide-to="1"/>
                                             </div>
                                             <div className="item">
                                                <img src="../assets/images/product.jpg" className="img-fluid" alt="img" data-target="#carouselExampleIndicators" data-slide-to="2"/>
                                             </div>
                                             <div className="item">
                                                <img src="../assets/images/product.jpg" className="img-fluid" alt="img" data-target="#carouselExampleIndicators" data-slide-to="3"/>
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
                                    <div className="nice-number"><button type="button">-</button><input type="number" defaultValue="1"/><button type="button">+</button></div>
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
                                             <img className="d-block w-100" src="../assets/images/product.jpg" alt="First slide"/>
                                          </div>
                                          <div className="carousel-item">
                                             <img className="d-block w-100" src="../assets/images/product.jpg" alt="Second slide"/>
                                          </div>
                                          <div className="carousel-item">
                                             <img className="d-block w-100" src="../assets/images/product.jpg" alt="Third slide"/>
                                          </div>
                                          <div className="carousel-item">
                                             <img className="d-block w-100" src="../assets/images/product.jpg" alt="Third slide"/>
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
                                                <img src="../assets/images/product.jpg" className="img-fluid" alt="img" data-target="#carouselExampleIndicators1" data-slide-to="0"/>
                                             </div>
                                             <div className="item">
                                                <img src="../assets/images/product.jpg" className="img-fluid" alt="img" data-target="#carouselExampleIndicators1" data-slide-to="1"/>
                                             </div>
                                             <div className="item">
                                                <img src="../assets/images/product.jpg" className="img-fluid" alt="img" data-target="#carouselExampleIndicators1" data-slide-to="2"/>
                                             </div>
                                             <div className="item">
                                                <img src="../assets/images/product.jpg" className="img-fluid" alt="img" data-target="#carouselExampleIndicators1" data-slide-to="3"/>
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
                                       <input type="number" defaultValue="1"/>
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
