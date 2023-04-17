import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../common/utils";
import { Link } from "react-router-dom";
import { getWishlist,removeFromWishlist } from "../customer/apiUser";
import moment from "moment";
import ProfileHome from "./ProfileHome";

const Wishlist = () => { 
    const [wishlist, setWishlist] = useState([]);

    const {
        user : { _id, firstName, lastName, mobileNo_, role }
    } = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getWishlist(userId, token).then(data => {
            console.log("purches---",data);
            if (data.error) {
                console.log(data.error);
            } else {
              setWishlist(data);
            }
        });
    };

    const remove = wishlistId => {
      if(window.confirm('Are you sure you want to delete this record?'))
      {
          const wishlist = {
              wishlistId: wishlistId
          };
          removeFromWishlist(wishlist,wishlistId).then(data => {
              if (data.error) {                  
                  console.log(data.error);
              } else {
                alert('Product has been deleted succfully from wishlist.');
                window.location.reload();
              }
          });
      }
  };

    useEffect(() => {
        init(_id, token);
    }, []);

    return (
      <Layout title="" description="" className="container-fluid">

      <ProfileHome profile="Wishlist"/>

      <div className="bz_product_grid_content_main_wrapper float_left">
        <div className="container custom_container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12 bg-white">
              <div className="bz_cart_main_wrapper float_left">
                <div className="cart_tbl">
                  <div className="table table-responsive">
                    <table className="table table-borderless">
                      <thead>
                        <tr>
                          <th style={{width: '10%'}}>Product</th>
                          <th></th>
                          <th style={{width: '15%'}}>Unit Price</th>
                          <th style={{width: '15%'}}>Total</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                      {wishlist.map((w, i) => (
                      <tr key={i}>
                        <td>
                          <img
                            className="img-fluid"
                            src={w.image}
                            alt={w.name}
                          />
                        </td>
                        <td>{w.name}</td>
                        <td>
                          <i className="fas fa-rupee-sign fa-sm"></i>
                          0
                        </td>
                        <td>
                          <i className="fas fa-rupee-sign fa-sm"></i>
                          0
                        </td>
                        <td class="text-center">
                         <Link style={{fontSize: '12px', padding: '0 5px'}} to="#" title="Place Order" className="btn btn-success btn-sm">
                            Add To Cart
                          </Link>{" "}
                          <Link style={{fontSize: '12px', minWidth: '75px', padding: '0 5px'}} to="#" title="Remove Item" onClick={() => remove(w._id)} className="btn btn-danger btn-sm">
                            Remove
                          </Link>{" "}
                        </td>
                      </tr>
                    ))}
                      </tbody>
                    </table>
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

export default Wishlist;
