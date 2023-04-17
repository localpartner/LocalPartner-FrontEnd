import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../common/utils";
import Layout from "../core/Layout";
import { useHistory } from "react-router-dom";
import UserLinks from "../core/UserLink";
import ProfileHome from "../core/ProfileHome"
import { read, update, updateUser } from '../customer/apiUser';

const UserUpdate = ({ match }) => {
    const [values, setValues] = useState({});
    const { token } = isAuthenticated();
    const { firstName, lastName, gender, email } = values;
    let history = useHistory();

    const init = userId => {
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, firstName: data.firstName,lastName:data.lastName,gender:data.gender, email:data.email });
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = name => e => {
        console.log(name)
        if(name=='gender') {
            setValues({ ...values, error: false, [name]: e.target.value });
        }
        else {
        setValues({ ...values, error: false, [name]: e.target.value });
        }
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { firstName, lastName,gender, email }).then(data => {
            if (data.error) {
                console.log(data)
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        firstName: data.firstName,
                        lastName:data.lastName,
                        gender:data.gender,
                        email: data.email,
                        success: true
                    });
                });
            }
        });
        history.push("/user/profile")
    };

    return (
        <Layout
            title="Dashboard"
            description={`G'day ${firstName + ' ' + lastName}!`}
            className="container-fluid"
        >
            <ProfileHome
                profile="My Profile"
                Update="Update Profile"
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
                                            <h3 className="col-lg-10">Update Personal Information</h3>
                                        </div>
                                        <div className="border-bottom"></div>
                                        <div className="row">
                                            <div className="form-group col-lg-6">
                                                <h6><b>First Name</b></h6>
                                                <input onChange={handleChange('firstName')} className="form-control" value={firstName}/>
                                            </div>
                                            
                                            <div className="form-group col-lg-6">
                                                <h6><b> Last Name</b></h6>
                                                <input onChange={handleChange('lastName')} className="form-control" value={lastName}/>
                                            </div> 

                                            <div className="form-group col-lg-6">
                                                <h6><b> Email Address</b></h6>
                                                <input onChange={handleChange('email')} className="form-control" value={email}/>
                                            </div>

                                            <div className="form-group col-lg-6">
                                                <h6><b> Gender</b></h6>
                                                <div style={{padding: '10px'}}>
                                                    <input onChange={handleChange('gender')} className="col-lg-6" name="gender" type="radio" value="M" style={{width: '15px', height:'15px'}} /> <b  style={{paddingRight: '40px'}}>Male</b>
                                                    <input onChange={handleChange('gender')} className="col-lg-6" name="gender" type="radio" value="F" style={{width: '15px', height:'15px'}} /> <b>Female</b>
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={clickSubmit} className="submit_btn">
                                            Submit
                                        </button>
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

export default UserUpdate;