import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { getAddressMobile, updateAddress, updateAddressById } from "./apiCore";
import { isAuthenticated } from "../common/utils";
import Layout from "../core/Layout";
import UserLinks from "../core/UserLink";
import ProfileHome from "../core/ProfileHome";
import swal from 'sweetalert2';

const UpdateAddress = ({ match }) => {
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
  const params = useParams();
console.log(values,"ldkdjksdjk")
  // const [address, setAddress] = useState();

  const { user, token } = isAuthenticated();
  let history = useHistory();

  function ClickToCancle(e) {
    e.preventDefault();
  }

  const handleChange = data => event => {
    setValues({ ...values, [data]: event.target.value });
};

  useEffect(() => {
    getAddres();
  }, []);

  const getAddres = () => {
    updateAddressById(params.addressId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,

          fname: data.data.fname,
          lname: data.data.lname,
          mobile: data.data.mobile,
          email: data.data.email,
          address: data.data.address,
          city:data.data.city,
          state:data.data.state,
          pincode:data.data.pincode,
          country:data.data.country,
          nickname:data.data.nickname
          // addressLine1: data.data.result.addresses[0].addressLine1,
          // addressLine2: data.data.result.addresses[0].addressLine2,
          // city: data.data.result.addresses[0].city,
          // state: data.data.result.addresses[0].state,
          // pincode:data.data.result.addresses[0].pincode,
          // country: data.data.result.addresses[0].country,
        });
      }
    });
  };
  const { address, city, state, pincode, country, fname, lname, mobile, email, nickname } = values;
//   const addresses = [
//     {
//         address,  city, state, pincode, country
//     }
// ]

  // const clickSubmit = (event) => {
  //   event.preventDefault();
    
  //   updateAddressById(params._id,{ fname, lname, mobile, email, city, state, pincode, country, nickname, address }).then((data) => {
  //     console.log(data);
  //   });
  //   history.push("/user/address");   
  // };


  const clickSubmit =  (event) => {
    event.preventDefault();
    swal.fire({
        title: 'Update Address',
        text: "Do you really want to Update this Address?",
        // icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Yes'
    }).then ((result) => {
        if (result.isConfirmed) {
          updateAddressById(params._id,{ fname, lname, mobile, email, city, state, pincode, country, nickname, address }).then((data) => {
            console.log(data);
            history.push("/user/address");   
          });
        }
    })
}

  return (
    <Layout
      title="Dashboard"
      description={` ${user.fName + " " + user.lName}!`}
      className="container-fluid"
    >
      <ProfileHome profile="Manage Address" Update="Update Address" />

      <div className="bz_product_grid_content_main_wrapper float_left">
        <div className="container custom_container">
          <div className="row">
            <div className="col-3">
              <UserLinks />
            </div>
            <div className="col-9">
              <form>
                <div className="white-box">
                  <div className="col-lg-12 order-address">
                    <div className="row">
                      <h3 className="col-lg-10">Update Address </h3>
                    </div>
                    <div className="border-bottom"></div>
                    <div className="row">
                      <div className="form-group col-lg-6">
                        <label>First Name</label>
                        <input
                          onChange={handleChange('fname')}
                          name="fname"
                          className="form-control"
                          value={values.fname}
                        />
                      </div>
                      <div className="form-group col-lg-6">
                        <label>Last Name</label>
                        <input
                          onChange={handleChange('lname')}
                          name="lname"
                          className="form-control"
                          value={values.lname}
                        />
                      </div>
                      <div className="form-group col-lg-6">
                        <label>Email</label>
                        <input
                         onChange={handleChange('email')}
                          name="email"
                          className="form-control"
                          type="email"
                          value={values.email}
                        />
                      </div>
                      <div className="form-group col-lg-6">
                        <label> Mobile</label>
                        <input
                          onChange={handleChange('mobile')}
                          name="mobile"
                          type="mobile"
                          className="form-control"
                          value={values.mobile}
                        />
                      </div>
                      <div className="form-group col-lg-12">
                        <label>
                          Address<span className="error">*</span>
                        </label>
                        <input
                        onChange={handleChange('address')}
                          value={values.address}
                          placeholder="House Number ,Building Name"
                          name="address"
                          className="form-control"
                        />
                        {/* {errors.address && <span className='error'>Address is required</span>} */}
                      </div>
                    
                      <div className="form-group col-lg-6">
                        <label>
                          City<span className="error">*</span>
                        </label>
                        <input
                        onChange={handleChange('city')}
                          value={values.city}
                          name="city"
                          className="form-control"
                        />
                        {/* {errors.city && <span className='error'>City is required</span>} */}
                      </div>
                      <div className="form-group col-lg-6">
                        <label>
                          Country<span className="error">*</span>
                        </label>
                        <input
                        onChange={handleChange('country')}
                          value={values.country}
                          name="country"
                          className="form-control"
                        />
                        {/* {errors.country && <span className='error'>Country is required</span>} */}
                      </div>
                      <div className="form-group col-lg-6">
                        <label>
                          State<span className="error">*</span>
                        </label>
                        <input
                        onChange={handleChange('state')}
                          value={values.state}
                          name="state"
                          className="form-control"
                        />
                        {/* {errors.state && <span className='error'>State is required</span>} */}
                      </div>
                      <div className="form-group col-lg-6">
                        <label>
                          Pin Code<span className="error">*</span>
                        </label>
                        <input
                        onChange={handleChange('pincode')}
                        value={values.pincode}
                          name="pincode"
                          type="number"
                          className="form-control"
                        />
                        {/* {errors.pincode && <span className='error'>PinCode is required</span>} */}
                      </div>{" "}
                     
                      <div className="form-group col-lg-12">
                        <label>
                          Nickname<span className="error">*</span>
                        </label>
                        <input
                        onChange={handleChange('nickname')}
                          value={values.nickname}
                          placeholder="Road Name ,Area Colony"
                          name="addressLine2"
                          className="form-control"
                        />
                        {/* {errors.address && <span className='error'>Address is required</span>} */}
                      </div>
                    </div>
                    <button onClick={clickSubmit} className="submit_btn">
                      Submit
                    </button>

                    {/* <Link onClick={ClickToCancle} className="cancel_btn">
                      Cancle
                    </Link> */}
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

export default UpdateAddress;
