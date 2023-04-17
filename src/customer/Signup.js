import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth/Cutomer';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
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
                        <h3>Signup</h3>
                        <form>
                            <div className="form-group row">
                                <div className="col-12">
                                    <label>Name*</label>
                                </div>
                                <div className="col-12">
                                    <input placeholder="Enter you name here" onChange={handleChange('name')} type="text" className="form-control" value={name} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-12">
                                    <label>Email*</label>
                                </div>
                                <div className="col-12">
                                    <input placeholder="Enter you email here" onChange={handleChange('email')} type="email" className="form-control" value={email} />
                                </div>
                            </div> 
                            <div className="form-group row">
                                <div className="col-12">
                                    <label>Password*</label>
                                </div>
                                <div className="col-12">
                                    <input placeholder="Enter your password here" onChange={handleChange('password')} type="password" className="form-control" value={password} />
                                </div>
                            </div>                          
                            <button onClick={clickSubmit} className="submit_btn">
                                Submit
                            </button>
                        </form>              
        
                        <p>Alreay have an account? <a href="/signin">Signin</a></p>
                    </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                    <div className="login_side_img">
                        <img className="img-fluid" src="../assets/images/login_img.jpg" alt="online-shopping" style={{height:'569px'}}/>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const showError = () => (
        <div className="alert alert-danger clearfix" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info clearfix" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return (
        // <Layout
        //     title="Signup"
        //     description="Signup to Node React E-commerce App"
        //     className="container col-md-8 offset-md-2"
        // >
        //     {showSuccess()}
        //     {showError()}
        //     {signUpForm()}
        // </Layout>
        <Layout>
            <div className="bz_inner_page_navigation float_left">
               <div className="container custom_container">
                  <div className="inner_menu float_left">
                     <ul>
                        <li><a href="/"> <span><i className="fas fa-home"></i></span> </a></li>
                        <li className="active"><a href="#"> <span><i className="fas fa-angle-right"></i></span> Signup</a></li>
                     </ul>
                  </div>
               </div>
            </div>
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
};

export default Signup;
