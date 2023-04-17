import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin } from "../auth/Cutomer";
import { authenticate ,isAuthenticated } from '../common/utils';

const Signin = () => {
    const [values, setValues] = useState({
        email: "roshan@gmail.com",
        password: "rrrrrr9",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signUpForm = () => (
        <div className="bz_product_grid_content_main_wrapper float_left">
               <div className="container custom_container">
                  <div className="row">
                     <div className="col-lg-6 col-md-6 col-12">
                        <div className="login_form">
                           <h3>Signin</h3>
                            <form>
                                <div className="form-group row">
                                    <div className="col-12">
                                        <label>Email*</label>
                                    </div>
                                    <div className="col-12">
                                        <input 
                                        onChange={handleChange("email")}
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        placeholder="Enter your email here"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-12">
                                        <label>Password*</label>
                                    </div>
                                    <div className="col-12">
                                        <input 
                                        placeholder="Enter your password here"
                                        onChange={handleChange("password")}
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        />
                                        <a href="#">Forgot Password!</a>
                                    </div>
                                </div>                           
                                <button onClick={clickSubmit} className="submit_btn">
                                    Submit
                                </button>
                            </form>
                            <p>Don't have an account? <a href="/signup">Signup</a></p>
                        </div>
                     </div>
                     <div className="col-lg-6 col-md-6 col-12">
                        <div className="login_side_img">
                            <img className="img-fluid" src="../assets/images/login_img.jpg" alt="online-shopping" style={{height:'500px'}}/> 
                        </div>
                     </div>
                  </div>
               </div>
            </div>
    );

    const showError = () => (
        <div
            className="alert alert-danger clearfix"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-info clearfix">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
              //  return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/profile" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        
        <Layout>
            <div className="bz_inner_page_navigation float_left">
               <div className="container custom_container">
                  <div className="inner_menu float_left">
                     <ul>
                        <li><a href="/"> <span><i className="fas fa-home"></i></span> </a></li>
                        <li className="active"><a href="#"> <span><i className="fas fa-angle-right"></i></span> Signin</a></li>
                     </ul>
                  </div>
               </div>
            </div>
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signin;
