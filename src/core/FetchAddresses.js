import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../common/utils";
import { getAddressMobile, deleteAddress } from "./apiCore";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { setManageAddress } from "../recoil/atom/setManageAddress";
import { data } from "jquery";
import { useHistory  } from "react-router-dom"


const FetchAddress = () => {
  const [userInfo, setUserInfo] = useState([]);
  const { user, token } = isAuthenticated();
  const history = useHistory();
  console.log(userInfo.addresses);
  const listOfUserInfo = () => {
    getAddressMobile().then((res) => {
      console.log(res.data, "responsedata")
      setUserInfo(res.data);
      // console.log(res.data._id,"jfsdkhf")
     
    });
  };

  useEffect(() => {
    listOfUserInfo();
  }, []);
  // getcustomeraddress(user._id, token).then(res => {
  //     if (res.error) {
  //         console.log(res.error);
  //     } else {
  //         setUserInfo(res);
  //     }
  // });

  const removeAddress = (number) => {
    // console.log(index, "checking for index");
    // console.log("hello");
    deleteAddress(number).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        listOfUserInfo();
      }
    });
  };

  const update = (event) =>{
    console.log(event.target.id)
    localStorage.setItem('id',event.target.id )
    history.push("/user/updateaddress")
    }


 

  return (
    <>
      <div className="cart ">
        {userInfo.map((item, index) => {
          console.log(index);
          return (
            <>
              <div class="card my-2">
                <div class="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p class="card-text">
                      <p style={{ background: "#f0f2f5", padding: "4px 8px" , width:"67px"}}>{item.nickname}</p>
                        <b>{item.fname} {item.mobile}</b>
                      </p>
                      <p class="card-text">{item.address}, {item.city}, {item.state} - <b>{item.pincode}</b></p>
                      <p class="card-text">{item.email}</p>
                      {/* {item.addresses.length != 0 ? (
                        <>{item.addresses.addressLine1}</>
                      ) : null} */}
                      {/* {item.addresses.length != 0 ? (
                        <>
                          {item.addresses.map((item) => {
                            return (
                              <>
                                <p>
                                  {item.addressLine1} {item.addressLine2}
                                </p>
                                <p>{item.city}</p>
                                <p>{item.pincode}</p>
                                <p>{item.state}</p>
                                {item.addressType !== undefined ? (
                                  <>
                                    {" "}
                                    {item.addressType == "Home" ? (
                                      <>
                                    
                                        <div className="mt-2">
                                          <span className=" backgroundcolor p-2">
                                            Home
                                          </span>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="mt-2">
                                          <span className=" backgroundcolor p-2">
                                            Office
                                          </span>
                                        </div>{" "}
                                    
                                      </>
                                    )}
                                  </>
                                ) : null}
                              </>
                            );
                          })}
                        </>
                      ) : null} */}
            
                    </div>
                    <div className="d-flex">
                      <div className="mr-2 border rounded-circle">
                        {/* <Link to={`/user/updateaddress/${item.mobile}`}> */}
                          <button className="btn ">
                            <i  id={item._id} onClick = {update} class="fa fa-pencil" aria-hidden="true"></i>
                          </button>
                        {/* </Link> */}
                      </div>
                      <div className="border rounded-circle ">
                        <button
                          className="btn "
                          onClick={() => {
                            removeAddress(item.mobile);
                          }}
                        >
                          <i
                            class="fa fa-trash  alert-danger"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default FetchAddress;
  