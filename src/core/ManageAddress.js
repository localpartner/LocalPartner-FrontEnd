import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../common/utils";
import Layout from "../core/Layout";
import UserLinks from "../core/UserLink";
import ProfileHome from "../core/ProfileHome";
import { Link } from "react-router-dom";
import { MdAdd } from 'react-icons/md';
import AddNewAddress from "./AddNewAddress";
import FetchAddress from "./FetchAddresses";

const ManageAddress = () => {
    const { user, token } = isAuthenticated();
    const [ showAddress, setShowAddress] = useState(true);

    function handleAdd() {
        setShowAddress(!showAddress);
    }

    function handleRecordAdded(address) {
        setShowAddress(true)
    }

    return (
        <Layout
            title="Dashboard"
            // description={`${user.firstName+' '+user.lastName}!`}
            className="container-fluid"
        >
            <ProfileHome profile="Manage Address" />
            
            <div className="bz_product_grid_content_main_wrapper float_left">
                <div className="container custom_container">
                    <div className="row">
                        <div className="col-3"><UserLinks/></div>
                        <div className="col-9">
                            <div className="white-box">
                                <h3>Manage Address</h3>
                                <div className="addresslink">
                                    <Link className="address" onClick={() => handleAdd()}>
                                        <MdAdd className="addicon"/><b>ADD A NEW ADDRESS</b>
                                    </Link> 
                                </div>
                                
                                {showAddress == false ?(
                                    <AddNewAddress recordAdded={handleRecordAdded} />
                                ):null}
                                 {/* customer={user._id} */}
                                <FetchAddress />
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </Layout>
    );
    
};

export default ManageAddress;