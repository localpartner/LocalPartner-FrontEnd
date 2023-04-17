import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../common/utils";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import UserLinks from "../core/UserLink";
import ProfileHome from "../core/ProfileHome";
import { read,getUserDetailsByMobile } from "../customer/apiUser";

const UserInfo = () => {
    const [userInfo ,setUserInfo] = useState({})
    console.log("userInfo",userInfo)
    const { user, token } = isAuthenticated();

    const listOfUserInfo = () => {
        read(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setUserInfo(data);
            }
        });

        /*getUserDetailsByMobile(user.mobile, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setUserInfo(data);
            }
        });*/
    };

    useEffect(() => {
        // listOfUserInfo()
    }, []);

    return (
        <Layout
            title="Dashboard"
            // description={`G'day ${user.firstName + ' ' + user.lastName}!`}
            className="container-fluid"
        >
            <ProfileHome
                profile="My Profile"
            />

            <div className="bz_product_grid_content_main_wrapper float_left">
                <div className="container custom_container">
                    <div className="row">
                    <div className="col-3"><UserLinks/></div>
                        <div className="col-9">
                            <form>
                                <div className="white-box">
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <h3 className="col-lg-10">Personal Information</h3>
                                            {/* <Link className="edit-link col-lg-2" to={`/user/profile/${user._id}`}>
                                                <b>Edit</b>
                                            </Link> */}
                                        </div>
                                        <div className="border-bottom"></div>
                                        <div className="row">
                                            <div className="form-group col-lg-6">
                                                <h6><b>First Name</b></h6>
                                                <input disabled className="form-control" value={userInfo.firstName}/>
                                            </div>
                                            
                                            <div className="form-group col-lg-6">
                                                <h6><b> Last Name</b></h6>
                                                <input disabled className="form-control" value={userInfo.lastName}/>
                                            </div> 

                                            <div className="form-group col-lg-6">
                                                <h6><b> Email Address</b></h6>
                                                <input disabled className="form-control" value={userInfo.email}/>
                                            </div>

                                            <div className="form-group col-lg-6">
                                                <h6><b> Mobile Number</b></h6>
                                                <input disabled className="form-control" value={userInfo.mobile}/>
                                            </div>

                                            <div className="form-group col-lg-6">
                                                <h6><b> Gender</b></h6>
                                                <input disabled className="form-control" value={userInfo.gender}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>  
        </Layout>
    );
    
};

export default UserInfo;