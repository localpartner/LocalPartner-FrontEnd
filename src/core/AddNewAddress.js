import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postcustomeraddress } from "./apiCore";
import { useRecoilState } from "recoil";
import { setManageAddress } from "../recoil/atom/setManageAddress";
import { useForm, ErrorMessage } from "react-hook-form";


const AddNewAddress = (props) => {
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    nickname:""
  });
  console.log(values, "values");
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(false);
  const addresstype = (value) => {
    setValues({ ...values, addressType: value });
    console.log(values, "show values");
    setIsActive((current) => !current);
  };
  const [coilAddress, setCoilAddress] = useRecoilState(setManageAddress);
  const handleChange = (data) => (event) => {
    setValues({ ...values, [data]: event.target.value });
  };
  // const {handleSubmit, register, formState : {errors} } = useForm();
  const {

    city,
    state,
    pincode,
    nickname,
    country,
    fname,
    lname,
    mobile,
    email,
    address,
  } = values;
  // const addresses = [
  //   {
  //     addressType,
  //     addressLine1,
  //     addressLine2,
  //     city,
  //     state,
  //     pincode,
  //     country,
  //   },
  // ];

  const clickSubmit = (data) => {
  if(!fname || !lname || !mobile || !email || !city ||  !state || !pincode || !nickname || !country || !address){
      setError(true)
      return(false)
    }
 
    postcustomeraddress({ fname, lname, mobile, email, city, state, pincode, nickname, country, address,}).then(
      (res) => {
        console.log(res.data._id);
        localStorage.setItem("mobileNumber", mobile);
        // localStorage.setItem("id", res.data._id)
        setCoilAddress(coilAddress.concat(res));
        props.recordAdded();
      }
    );
  };

  return (
    <div>
      <div className="col-lg-12 order-address">
        <h3>Shipping Address</h3>
        <hr></hr>
        <div className="row">
          <div className="form-group col-lg-6">
            <label>
              First Name<span className="error">*</span>
            </label>
            <input
              onChange={handleChange("fname")}
              name="firstname"
              className="form-control"
            />
          { error && !fname && <p style={{color:'red'}}>*First name is required</p>}
          </div>
          {/* <input onChange={handleChange('firstName')} name="fname" {...register("fname", {required: true})} className="form-control" value={address.fname}/> */}

          <div className="form-group col-lg-6">
            <label>
              Last Name<span className="error">*</span>
            </label>
            <input
              onChange={handleChange("lname")}
              name="lastname"
              className="form-control"
            />
            { error && !lname && <p style={{color:'red'}}>First name is required</p>}
          </div>

          <div className="form-group col-lg-6">
            <label>
              Email<span className="error">*</span>
            </label>
            <input
              type="email"
              onChange={handleChange("email")}
              name="email"
              className="form-control"
            />
            { error && !lname && <p style={{color:'red'}}>Last name is required</p>}
          </div>

          <div className="form-group col-lg-6">
            <label>
              Phone No.<span className="error">*</span>
            </label>
            <input
              type="number"
              onChange={handleChange("mobile")}
              name="mobile"
              maxLength={10}
              className="form-control"
            />
            { error && !mobile && <p style={{color:'red'}}>Please enter mobile number</p>}
          </div>
          <div className="form-group col-lg-12">
            <label>
              Address<span className="error">*</span>
            </label>
            <input
              onChange={handleChange("address")}
              placeholder="House Number ,Building Name"
              name="address"
              className="form-control"
            />
           { error && !address && <p style={{color:'red'}}>Please enter Address</p>}
          </div>
          {/* <div className="form-group col-lg-12">
            <label>
              Address<span className="error">*</span>
            </label>
            <input
              onChange={handleChange("addressLine2")}
              placeholder="Road Name ,Area Colony"
              name="addressLine2"
              className="form-control"
            />
          </div> */}
          <div className="form-group col-lg-6">
            <label>
              City<span className="error">*</span>
            </label>
            <input
              onChange={handleChange("city")}
              name="city"
              className="form-control"
            />
             { error && !city && <p style={{color:'red'}}>Please enter city name</p>}
          </div>

          <div className="form-group col-lg-6">
            <label>
              Country<span className="error">*</span>
            </label>
            <input
              onChange={handleChange("country")}
              name="country"
              className="form-control"
            />
           { error && !country && <p style={{color:'red'}}>Please enter country name</p>}
          </div>

          <div className="form-group col-lg-6">
            <label>
              State<span className="error">*</span>
            </label>
            <input
              onChange={handleChange("state")}
              name="state"
              className="form-control"
            />
          { error && !state && <p style={{color:'red'}}>Please enter state name</p>}
          </div>

          <div className="form-group col-lg-6">
            <label>
              Pin Code<span className="error">*</span>
            </label>
            <input
              onChange={handleChange("pincode")}
              name="pincode"
              type="number"
              className="form-control"
            />
          { error && !pincode && <p style={{color:'red'}}>Please enter state name</p>}
          </div>

          <div className="form-group col-lg-12">
            <label>
            Nickname<span className="error">*</span>
            </label>
            <input
              onChange={handleChange("nickname")}
              placeholder="Address Name"
              name="nickname"
              className="form-control"
            />
           { error && !nickname && <p style={{color:'red'}}>Please enter state name</p>}
          </div>

        {/* <div className="form-group col-lg-12">
        <input type="checkbox"/>
              <label>   Shipping address is same as billing address</label>
        </div> */}
        
          {/* <div className="form-group col-lg-6">
            <label>
              Type of address<span className="error">*</span>
            </label>
            <div className="d-flex align-items-center mb-2">
            <label for="child">office</label>
              <div
                className="p-2 text-center typeaddresselect  mr-2"
                onClick={() => addresstype("office")}
              >
                <input type="radio" id="child" name="age" value="child" />
              </div>
              <label for="child">home</label>
              <div
                className="p-2 text-center typeaddresselect  "
               
                onClick={() => addresstype("home")}
              >
                 <input type="radio" id="child" name="age" value="child" />
              </div>
            </div>
          </div> */}
        
        </div>
        <button className="submit_btn" onClick={clickSubmit}>
          Save
        </button>

        {/* <Link className="cancel_btn">
                    Cancle
                </Link> */}
      </div>
    
    </div>
  );
};

export default AddNewAddress;
