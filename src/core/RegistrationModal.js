import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { signup } from "../auth/Cutomer";
import { otpVerification } from "../auth/Cutomer";
import { authenticate, isAuthenticated } from "../common/utils";
import Login from "./Login";
import { signin } from "../auth/Cutomer";
import { getResendOTP } from "../auth/Cutomer";
import { otp } from "../common/otp";

const RegistrationModal = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = isAuthenticated();

  const [values, setValues] = useState({
    mobile: "",
    mobile_error: "",
    firstName: "",
    firstName_error: "",
    lastName: "",
    lastName_error: "",
    error: "",
    success: false,
    otp: "",
  });

  const [otpValues, setOtpValues] = useState({
    firstNumber: "",
    secondNumber: "",
    thirdNumber: "",
    fourthNumber: "",
    fifthNumber: "",
    sixthNumber: "",
    mobileNo: "",
    otpError: "",
    loading: false,
    redirectToReferrer: false,
    formName : "registrion"
  });

  const { mobile, firstName, lastName, success, error } = values;

  const backRegistration = () => {
    setShowForm(false);
  };
  const handleLoginModalShow = () =>{
    props.loginModal();
    props.close();
}

const handleLoginModalClose = () => {
    setShowLoginModal(false);
}

  const handleChange = (name) => (event) => {
    setOtpValues({ ...otpValues, [name]: event.target.value });
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    const min = 100000;
    const max = 999999;
    const otp = Math.floor(min + Math.random() * (max - min));
    setValues({ ...values, error: false });
    signup({ mobile, firstName, lastName, otp }).then((data) => {
      console.log("data", data.mobile);
      // localStorage.setItem("MobileNumber",data.mobile)

      if (data.status == false) {
        setValues({
          ...values,
          mobile_error: data.errors.mobile,
          firstName_error: data.errors.firstName,
          lastName_error: data.errors.lastName,
          error: true,
          success: false,
        });
      } else {
        console.log("OTP-- ", data.otpData.otp);
        setValues({
          ...values,
          mobile_error: "",
          firstName_error: "",
          lastName_error: "",
          error: "",
          success: true,
        });
        setOtpValues({ ...otpValues, mobileNo: data.otpData.mobileNo });
        setShowForm(true);
      }
    });
  };

  const redirectUser = () => {
    if (otpValues.redirectToReferrer) {
      return <Redirect to="/user/profile" />;
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const resendOTP = (event) => {
    event.preventDefault();
    const min = 100000;
    const max = 999999;
    const otp = Math.floor(min + Math.random() * (max - min));

    getResendOTP({ mobile: otpValues.mobileNo, otp }).then((data) => {
      setOtpValues({
        ...otpValues,
        firstNumber: "",
        secondNumber: "",
        thirdNumber: "",
        fourthNumber: "",
        fifthNumber: "",
        sixthNumber: "",
        otpError: "",
        loading: false,
        redirectToReferrer: false,
      });
      console.log("-----", data.otpData.otp);
    });
  };

  const verifyOTPRegister = (event) => {
    event.preventDefault();
    const otpNumber =
      otpValues.firstNumber +
      otpValues.secondNumber +
      otpValues.thirdNumber +
      otpValues.fourthNumber +
      otpValues.fifthNumber +
      otpValues.sixthNumber;
    otpVerification({ mobileNo: otpValues.mobileNo, otp: otpNumber,formName : otpValues.formName }).then(
      (data) => {
        console.log("data", data);
        if (data.status == false) {
          setOtpValues({
            ...otpValues,
            otpError: data.message,
          });
        } else {
          authenticate(data, () => {
            setOtpValues({
              ...otpValues,
              firstNumber: "",
              secondNumber: "",
              thirdNumber: "",
              fourthNumber: "",
              fifthNumber: "",
              sixthNumber: "",
              otpError: "",
              loading: false,
              redirectToReferrer: true,
            });
            setValues({
              ...values,
              mobile: "",
              firstName: "",
              lastName: "",
            });
          });
          //setShowForm(false);
        }
      }
    );
  };

  const autoTab = (c) => (e) => {
    var d = c;
    if(e.keyCode === 37){ 
      // left arrow
    } else {
      const BACKSPACE_KEY = 8;
      const DELETE_KEY = 46;
      if (e.keyCode === BACKSPACE_KEY) {
        if(d=='otp_verify_signup'){ d = 'otp_7'; } if(d=='otp_2') { d = 'otp_3'; }
        d = 'otp_'+(d.split('_')[1]-2);
        document.getElementById(d).focus();
      } else if (e.keyCode === DELETE_KEY) {
        //
      } else {
        if(d=='otp_verify_signup') { d = 'otp_6'; }
        document.getElementById(d).focus();
      }
    }
  };

  const signUpForm = () => (
    <div>
      <form>
        <h4>New User, Signup with your mobile number to get started</h4>
        <br />
        <div className="form-group row">
          <div className="col-12">
            <label>
              Mobile Number<span className="error">*</span>
            </label>
          </div>
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              onChange={handleChange("mobile")}
              value={values.mobile}
              maxLength="10"
              placeholder="Enter mobile no(Ex.9999999999)"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            <div className="error">{values.mobile_error}</div>
          </div>
          <div className="col-12 margin-t-15">
            <div className="col-6 f-l" style={{ paddingLeft: "0px" }}>
              <label>
                First Name<span className="error">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                onChange={handleChange("firstName")}
                value={firstName}
                placeholder="Enter first Name"
              />
              <div className="error">{values.firstName_error}</div>
            </div>
            <div className="col-6 f-l" style={{ paddingRight: "0px" }}>
              <label>
                Last Name<span className="error">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                onChange={handleChange("lastName")}
                value={lastName}
                placeholder="Enter last name"
              />
              <div className="error">{values.lastName_error}</div>
            </div>
          </div>
        </div>
        <button className="submit_btn ucfirst" onClick={clickSubmit}>
          Send OTP
        </button>
        <br />
        <br />
        <p>
          Already have an account?{" "}
          <Link to="#" className="sky-blue" onClick={handleLoginModalShow}>
            {" "}
            Signin
          </Link>
          {showLoginModal === true ? <Login show={showLoginModal} close={handleLoginModalClose} /> : null}
        </p>
      </form>
    </div>
  );

  const verifyOTPRegisterForm = () => (
    <div>
      <form>
        <h4>Login With Mobile Number</h4>
        <br />
        <p>
          Please enter the OTP sent to your given number({otpValues.mobileNo})
          or change mobile no. to{" "}
          <Link to="#" className="sky-blue" onClick={backRegistration}>
            click here
          </Link>{" "}
        </p>
        <br />
        <div className="form-group row">
          <div className="col-12">
            <input
              type="text"
              maxLength="1"
              tabIndex={1}
              key={0}
              id="otp_1"
              onKeyUp={autoTab('otp_2')}
              value={otpValues.firstNumber}
              onChange={handleChange("firstNumber")}
              autoComplete="off"
              className="form-control verify-otp-input"
            />
            <input
              type="text"
              maxLength="1"
              tabIndex={2}
              key={1}
              id="otp_2"
              onKeyUp={autoTab('otp_3')}
              value={otpValues.secondNumber}
              onChange={handleChange("secondNumber")}
              autoComplete="off"
              className="form-control verify-otp-input"
            />
            <input
              type="text"
              maxLength="1"
              tabIndex={3}
              key={2}
              id="otp_3"
              onKeyUp={autoTab('otp_4')}
              value={otpValues.thirdNumber}
              onChange={handleChange("thirdNumber")}
              autoComplete="new-password"
              className="form-control verify-otp-input"
            />
            <input
              type="text"
              maxLength="1"
              tabIndex={4}
              key={3}
              id="otp_4"
              onKeyUp={autoTab('otp_5')}
              value={otpValues.fourthNumber}
              onChange={handleChange("fourthNumber")}
              autoComplete="new-password"
              className="form-control verify-otp-input"
            />
            <input
              type="text"
              maxLength="1"
              tabIndex={5}
              key={4}
              id="otp_5"
              onKeyUp={autoTab('otp_6')}
              value={otpValues.fifthNumber}
              onChange={handleChange("fifthNumber")}
              autoComplete="new-password"
              className="form-control verify-otp-input"
            />
            <input
              type="text"
              maxLength="1"
              tabIndex={6}
              key={5}
              id="otp_6"
              onKeyUp={autoTab('otp_verify_signup')}
              value={otpValues.sixthNumber}
              onChange={handleChange("sixthNumber")}
              autoComplete="new-password"
              className="form-control verify-otp-input"
            />
          </div>
          <span className="error">{otpValues.otpError}</span>
        </div>
        <input type="hidden" name="formName" value={otpValues.formName} />
        <input type="hidden" name="mobileNo" value={otpValues.mobileNo} />
        <button className="signup_btn ucfirst" id="otp_verify_signup" onClick={verifyOTPRegister}>
          Signup
        </button>
        <br />
        <br />
        <p>
          Not received you code?{" "}
          <Link to="#" className="sky-blue" onClick={resendOTP}>
            Resend Code
          </Link>
        </p>
      </form>
    </div>
  );

  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        show={props.show}
        size="lg"
        backdrop="static"
        onHide={props.close}
      >
        <Modal.Body className="no-padding">
          <button
            type="button"
            className="close"
            onClick={props.close}
            style={{
              zIndex: 1,
              position: "relative",
              top: "5px",
              right: "5px",
            }}
          >
            &times;
          </button>
          <Container>
            <Row>
              <Col lg={7} md={7} xs={12} className="login-popup-left">
                <div id="sendOTPRegister">
                  {!showForm ? signUpForm() : verifyOTPRegisterForm()}
                </div>
              </Col>
              <Col lg={5} md={5} xs={12} className="login-popup-right">
                <div>
                  <br />
                  <h2 className="white">Registration</h2>
                  <br />
                  <br />
                  <p className="login-text">
                    Get access to your Orders, Wishlist and Recommmendations
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
      {redirectUser()}
    </>
  );
};

export default RegistrationModal;
