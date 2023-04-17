import React, { useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { signin } from "../auth/Cutomer";
import { getResendOTP } from "../auth/Cutomer";
import { authenticate, isAuthenticated } from "../common/utils";
import { otpVerification,getToken } from "../auth/Cutomer";
import RegistrationModal from "./RegistrationModal";

const Login = (props) => {
  const [loginDisplay, setLoginDisplay] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const [values, setValues] = useState({
    mobile: "",
    mobileError: "",
  });

  const { mobile, mobileError } = values;
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
    formName: "login",
  });

  const {
    firstNumber,
    secondNumber,
    thirdNumber,
    fourthNumber,
    fifthNumber,
    sixthNumber,
    mobileNo,
    otpError,
    loading,
    redirectToReferrer,
    formName,
  } = otpValues;

  const handleRegistartionModalShow = (e) => {
    props.registrationModal();
    props.close();
  };
  const handleRegistartionModalClose = () => {
    setShowRegistrationModal(false);
  };

  const backRegistration = () => {
    setLoginDisplay(false);
  };
  const autoTab = (c) => (e) => {
    var d = c;
    if(e.keyCode === 37){ 
      // left arrow
    } else {
      const BACKSPACE_KEY = 8;
      const DELETE_KEY = 46;
      if (e.keyCode === BACKSPACE_KEY) {
        if(d=='otp_verify'){ d = 'otp_7'; } if(d=='otp_2') { d = 'otp_3'; }
        d = 'otp_'+(d.split('_')[1]-2);
        document.getElementById(d).focus();
      } else if (e.keyCode === DELETE_KEY) {
        //
      } else {
        if(d=='otp_verify') { d = 'otp_6'; }
        document.getElementById(d).focus();
      }
    }
  };

  //redirct of pages
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    setOtpValues({ ...otpValues, [name]: event.target.value });
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      props.close();
      return <Redirect to={props.location} />
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const sendOTPLogin = (event) => {
    event.preventDefault();
    const min = 100000;
    const max = 999999;
    const otp = Math.floor(min + Math.random() * (max - min));
    signin({ mobile, otp }).then((data) => {
      console.log("data",data)
      // localStorage.setItem("PhoneNumber",data.otpData.mobileNo)
      if (data.status == false) {
        setValues({
          ...values,
          mobileError: data.errors,
        });
      } else {
        console.log("loginData...", data.otpData.otp);
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
          mobileNo: data.otpData.mobileNo,
        });
        setValues({
          mobileError: "",
          mobile: "",
        });
        // setOtpValues({
        //   ...otpValues,
        //   mobileNo: data.otpData.mobileNo,
        // });
        setLoginDisplay(true);
      }
    });
  };

  const resendOTP = (event) => {
    event.preventDefault();
    const min = 100000;
    const max = 999999;
    const otp = Math.floor(min + Math.random() * (max - min));
    getResendOTP({ mobile: mobileNo, otp }).then((data) => {
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

  const verifyOTPLogin = (event) => {
    event.preventDefault();
    const otpNumber =
      firstNumber +
      secondNumber +
      thirdNumber +
      fourthNumber +
      fifthNumber +
      sixthNumber;
      getToken({
      mobileNo: mobileNo,
      otp: otpNumber,
      formName: formName,
    }).then((data) => {
      if (data.status == false) {
        console.log("data----", data);
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
        });
        //setShowForm(false);
      }
    });
  };

  const loginModel = () => {
    return (
      <div id="sendOTP">
        <h4>Login With Mobile Number</h4>
        <br />
        <p>Enter your mobile number we will send you OTP to verify</p>
        <br />
        <div className="form-group row">
          <div className="col-12">
            <label>
              Phone Number<span className="error">*</span>
            </label>
          </div>
          <div className="col-12">
            <input
              type="text"
              maxLength={10}
              className="form-control"
              placeholder="Enter here"
              value={mobile}
              onChange={handleChange("mobile")}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            <span className="error">{mobileError}</span>
          </div>
        </div>
        <button className="submit_btn ucfirst" onClick={sendOTPLogin}>
          Send OTP
        </button>
        <br />
        <br />
        <p>
          Don't have an account?{" "}
          <Link
            to="#"
            className="sky-blue"
            onClick={handleRegistartionModalShow}
          >
            {" "}
            Signup
          </Link>
          <RegistrationModal
            show={showRegistrationModal}
            close={handleRegistartionModalClose}
          />
        </p>
      </div>
    );
  };

  const otpVerifyModel = () => {
    return (
      <div id="verifyOTP">
        <h4>Login With Mobile Number</h4>
        <br />
        Please enter the OTP sent to your given number({otpValues.mobileNo}) or
        change mobile no. to{" "}
        <Link to="#" className="sky-blue" onClick={backRegistration}>
          click here
        </Link>{" "}
        <br />
        <div className="form-group row">
          <div className="col-12">
            <input
              type="text"
              autoComplete="new-password"
              className="form-control verify-otp-input"
              tabIndex={1}
              key={0}
              maxLength={1}
              id="otp_1"
              onKeyUp={autoTab('otp_2')}
              value={firstNumber}
              onChange={handleChange("firstNumber")}
            />
            <input
              type="text"
              autoComplete="new-password"
              className="form-control verify-otp-input"
              tabIndex={2}
              key={1}
              maxLength={1}
              id="otp_2"
              onKeyUp={autoTab('otp_3')}
              value={secondNumber}
              onChange={handleChange("secondNumber")}
            />
            <input
              type="text"
              autoComplete="new-password"
              className="form-control verify-otp-input"
              tabIndex={3}
              key={2}
              maxLength={1}
              id="otp_3"
              onKeyUp={autoTab('otp_4')}
              value={thirdNumber}
              onChange={handleChange("thirdNumber")}
            />
            <input
              type="text"
              autoComplete="new-password"
              className="form-control verify-otp-input"
              tabIndex={4}
              key={3}
              maxLength={1}
              id="otp_4"
              onKeyUp={autoTab('otp_5')}
              value={fourthNumber}
              onChange={handleChange("fourthNumber")}
            />
            <input
              type="text"
              autoComplete="new-password"
              className="form-control verify-otp-input"
              tabIndex={5}
              key={4}
              maxLength={1}
              id="otp_5"
              onKeyUp={autoTab('otp_6')}
              value={fifthNumber}
              onChange={handleChange("fifthNumber")}
            />
            <input
              type="text"
              autoComplete="new-password"
              className="form-control verify-otp-input"
              tabIndex={6}
              key={5}
              maxLength={1}
              id="otp_6"
              onKeyUp={autoTab('otp_verify')}
              value={sixthNumber}
              onChange={handleChange("sixthNumber")}
            />
          </div>
          <span className="error">{otpError}</span>
        </div>
        <input type="hidden" name="formName" value={formName} />
        <input type="hidden" name="mobileNo" value={mobileNo} />
        <button className="submit_btn ucfirst" id="otp_verify" onClick={verifyOTPLogin}>
          {" "}
          Verify{" "}
        </button>
        <br />
        <br />
        <p>
          Not received you code?{" "}
          <Link to="#" className="sky-blue" onClick={resendOTP}>
            Resend Code
          </Link>
        </p>
      </div>
    );
  };

  return (
    <>
      <Modal show={props.show} onHide={props.close} backdrop="static" size="lg">
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
              <Col lg={7} md={7} className="login-popup-left">
                {!loginDisplay ? loginModel() : otpVerifyModel()}
              </Col>
              <Col lg={5} md={7} className="login-popup-right">
                <div id="sendOTPText">
                  <br />
                  <h2 className="white">Login</h2>
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

export default Login;
