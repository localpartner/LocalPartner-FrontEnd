import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { Link, useParams } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { getproductsByCode } from './apiCore';
import ShowImage from "./ShowImage";


const ProductDetailsModal = ({ showModel, close, productId, category }) => {
  const params = useParams();
  console.log(params, "parmas")
  console.log("hi product description")
  const [productData, setProductData] = useState();


  const [product, setProduct] = useState(false);
  const [error, setError] = useState('');
  const productArray = { _id: productId }
  const init = () => {
    getproductsByCode().then(data => {

    });
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      size="xl"
      show={showModel}
      onHide={close}
    >
      <div className="product_modal">
        <Modal.Body>
          <button type="button" className="close" onClick={close}>
            &times;
          </button>
          <Container>
            <Row>
              <Col lg={5} md={5} xs={12}>
                <div className="sell_slider">
                  <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <ShowImage item={productArray} url="product" className="d-block w-100" />
                      </div>
                      <div className="carousel-item">
                        <img
                          className="d-block w-100"
                          src="../assets/images/product.jpg"
                          alt="Second slide"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          className="d-block w-100"
                          src="../assets/images/product.jpg"
                          alt="Third slide"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          className="d-block w-100"
                          src="../assets/images/product.jpg"
                          alt="Third slide"
                        />
                      </div>
                    </div>
                    <a
                      className="carousel-control-prev"
                      href="#carouselExampleIndicators"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#carouselExampleIndicators"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Next</span>
                    </a>
                    <div className="container pt-4 pb-5 small_slider">
                      <div className="row carousel-indicators">
                        <div className="col-lg-12 col-md-12 col-12 no_padd">
                          <OwlCarousel
                            className="owl-theme"
                            loop
                            margin={10}
                            nav
                            items={4}
                          >
                            <div className="item">
                              <ShowImage item={productArray} url="product" className="d-block w-100" />
                            </div>
                            <div className="item">
                              <ShowImage item={productArray} url="product" className="d-block w-100" />
                            </div>
                            <div className="item">
                              <ShowImage item={productArray} url="product" className="d-block w-100" />
                            </div>
                            <div className="item">
                              <ShowImage item={productArray} url="product" className="d-block w-100" />
                            </div>
                          </OwlCarousel>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={7} md={7} xs={12}>
                <div className="b_product_sell_details_wrapper float_left">
                  <div className="bz_product_heading float_left">
                    <h3>{product.name}</h3>
                    <ul className="review">
                      <li>
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
                      </li>
                      <li>
                        <a href="#">1 customer review</a>
                      </li>
                      <li>
                        <a href="#">Add a review</a>
                      </li>
                    </ul>
                    <h3>
                      <i className="fas fa-rupee-sign fa-sm"></i>{product.price}{" "}
                      <span>
                        <del>
                          <i className="fas fa-rupee-sign fa-sm"></i>379.00
                        </del>
                      </span>{" "}
                    </h3>
                    <p>
                      {product.description}
                    </p>
                  </div>
                  <div className="color_code float_left">
                    <label>Color :</label>
                    <ul className="color_change">
                      <li className="black-co">
                        <a href="#"></a>
                      </li>
                      <li className="grey-co">
                        <a href="#"></a>
                      </li>
                      <li className="pink-co">
                        <a href="#"></a>
                      </li>
                      <li className="pink-co">
                        <a href="#"></a>
                      </li>
                    </ul>
                    <p>
                      Categories:{" "}
                      <span>
                        <a href="#">
                          {category}
                        </a>
                      </span>
                    </p>
                    <p>
                      Tag:{" "}
                      <span>
                        <a href="#">Electronic,</a> <a href="#">Mobile,</a>{" "}
                        <a href="#">Fashion cloth</a>
                      </span>
                    </p>
                  </div>
                  <div className="number_pluse float_left">
                    <div className="nice-number">
                      <button type="button">-</button>
                      <input type="number" defaultValue="1" />
                      <button type="button">+</button>
                    </div>
                    <a href="/mycart" className="cart_btn">
                      Add To Cart
                    </a>
                  </div>
                  <div className="share_icon float_left">
                    <p>Share:</p>
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#">
                          <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#">
                          <i className="fab fa-youtube"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>

          </Container>
        </Modal.Body>
      </div>
    </Modal>
  );
};
export default ProductDetailsModal;
