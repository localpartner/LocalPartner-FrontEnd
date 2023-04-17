import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../common/utils";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import UserLinks from "../core/UserLink";
import ProfileHome from "../core/ProfileHome"
import Orders from "../user/Orders";

const MyOrders = () => {
    const { user} = isAuthenticated();
    
    return (
        <Layout
            title="Dashboard"
            description={` ${user.firstName + ' ' + user.lastName}!`}
            className="container-fluid"
        >
            <ProfileHome
                profile="My Orders"
            />

            <div className="bz_product_grid_content_main_wrapper float_left">
                <div className="container custom_container">
                    <div className="row">
                    <div className="col-3"><UserLinks/></div>
                        <div className="col-9">
                            <div className="white-box">
                                <Orders/>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>  
            
        </Layout>
    );
    
};

export default MyOrders;