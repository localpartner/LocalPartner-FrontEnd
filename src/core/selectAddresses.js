import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../common/utils";
import { readAddress, removeAddressById } from "../customer/apiUser";
import { BsThreeDotsVertical} from 'react-icons/bs'
import { useRecoilState } from "recoil";
import { setManageAddress } from "../recoil/atom/setManageAddress";

const SelectAddress = ( {getSelectedAddress}) => {
    const [ userInfo ,setUserInfo] = useRecoilState(setManageAddress)
    const { user, token } = isAuthenticated();

    const listOfUserInfo = () => {
        readAddress(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setUserInfo(data);
            }
        });
    };

    const handalAddressById=(e)=>{
        getSelectedAddress(e.target.value)
    }

    const removeAddress = (addressId) => {
        const address = {
            addressId: addressId
        };
        removeAddressById(address,addressId).then(data => {
            if (data.error) {                  
                console.log(data.error);
            } else {
                window.confirm('Are you sure you want to delete this Address?')
                listOfUserInfo()
            }
        });
    };

    useEffect(() => {
        listOfUserInfo()
    }, []);
    
    return (
        <>
            {userInfo.map((add, index)=>(
                <>
                    <div className="address-menu">
                        <ul id="top_access">
                            <li><span><Link to="#"><BsThreeDotsVertical/></Link></span>
                                <ul>
                                <Link to={`/user/updateaddress/${add._id}`}>Edit</Link>
                                <Link onClick={() => removeAddress(add._id)}>Delete</Link>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="order-address" key={index}>
                        <div className="row" >
                            <input name="address" type="radio" value={add._id} onChange={handalAddressById}/>
                            <div className="order-addressInfo">
                                <div className="userName">
                                    <span><b>{add.fname+' '+ add.lname}</b></span>
                                    <b>{add.mobile}</b>
                                </div>
                                <div>
                                    {add.address+' '+' '+add.city+' '+', '+add.country}
                                </div>
                                <div>
                                    {add.state+' '+', '}<b>{add.pincode}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ))}
        </>   
    );
};

export default SelectAddress;