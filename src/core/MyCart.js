import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../common/utils";
import Layout from "../core/Layout";
import UserLinks from "../core/UserLink";
import ProfileHome from "../core/ProfileHome"
import Cart from "./Cart";

const MyCart = () => {
    const {
        user : {_id, firstName, lastName}
    } = isAuthenticated();
    const token = isAuthenticated().token;
    
    return (
        <Layout
            title="Dashboard"
            description={`G'day ${firstName + ' ' + lastName}!`}
            className="container-fluid"
        >
            <ProfileHome
                profile="My Cart"
                Update="Shopping Cart"
            />

            <div className="bz_product_grid_content_main_wrapper float_left">
                <div className="container custom_container">
                    <div className="row">
                    <div className="col-3"><UserLinks/></div>
                        <div className="col-9">
                            <div className="white-box">
                                <Cart/>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>  
            
        </Layout>
    );
    
};

export default MyCart;