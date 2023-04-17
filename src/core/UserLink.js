import React from "react";
import { isAuthenticated } from "../common/utils";
import { Link } from "react-router-dom";
import { FaFirstOrderAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { AiFillSetting } from 'react-icons/ai';
import { SiMaterialdesignicons } from 'react-icons/si';

const userLinks = () => {
    // const {
    //     user : { _id, firstName, lastName}
    // } = isAuthenticated();
    // const token = isAuthenticated().token;

    return (
        <>
        <div className="row">
            <div className="card profile">
                <img className="profile-img" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-female_0627fd.svg"/>
                <div className="profile-name">
                    <div className="pro-desc">Hello,</div>
                    {/* <div className="pro-naming">{firstName +' '+ ' '+lastName}</div> */}
                </div>
            </div>
        </div>

        <div className="card row">
            <div className="pro-myorder hover-link">
                <div className="pro-order">
                    <span><FaFirstOrderAlt/></span>
                    <Link to="/user/orders" className="order-link hover-link">MY ORDERS</Link>
                </div>
            </div>
            <div className="border-bottom"></div>
            <div className="pro-myorder">
                <div className="pro-order">
                    <span><AiFillSetting/></span>
                    <Link className="order-link ">ACCOUNT SETTING</Link>
                </div>
                <div>
                    <Link to='/user/profile'>
                        <div className="account-setting hover-link">Profile Information</div>
                    </Link>
                    <Link to='/user/address'>
                        <div className="account-setting hover-link">Manage Address</div>
                    </Link>
                    {/* <Link>
                        <div className="account-setting hover-link">PAN Card Information</div>
                    </Link> */}
                </div>
            </div>
            <div className="border-bottom"></div>

            {/* <div className="pro-myorder">
                <div className="pro-order">
                    <span><MdPayment/></span>
                    <Link className="order-link">Payment</Link>
                </div>
                <div>
                    <Link>
                        <div className="account-setting hover-link">Gift Card</div>
                    </Link>
                    <Link>
                        <div className="account-setting hover-link">Saved UPI</div>
                    </Link>
                    <Link>
                        <div className="account-setting hover-link">Saved Cards</div>
                    </Link>
                </div>
            </div> */}
            {/* <div className="border-bottom"></div> */}

            {/* <div className="pro-myorder hover-link">
                <div className="pro-order">
                    <BsFillChatDotsFill/>
                    <Link className="order-link hover-link">ALL CHATS</Link>
                </div>
            </div>
            <div className="border-bottom"></div> */}

            <div className="pro-myorder">
                <div className="pro-order">
                    <span><SiMaterialdesignicons/></span>
                    <Link to="" className="order-link">MY STUFF</Link>
                </div>
                <div>
                    <Link to='/mycart'>
                        <div className="account-setting hover-link">My Cart</div>
                    </Link>
                    {/* <Link to='/cart'>
                        <div className="account-setting hover-link">My Coupons</div>
                    </Link>
                    <Link>
                        <div className="account-setting hover-link">My Reviews and Ratings</div>
                    </Link>
                    <Link>
                        <div className="account-setting hover-link">All Notifications</div>
                    </Link> */}
                    <Link to='/wishlist'>
                        <div className="account-setting hover-link">My Wishlist</div>
                    </Link>
                </div>
            </div>
            <div className="border-bottom"></div>

            <div className="pro-myorder hover-link">
                <div className="pro-order">
                    <span><FiLogOut/></span>
                    <Link to='/logout' className="order-link hover-link">LOGOUT</Link>
                </div>
            </div>
            {/* <ul className="list-group">
                <li className="list-group-item">
                    <Link className="nav-link" to="/cart">
                        My Cart
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to={`/profile/${_id}`}>
                        Update Profile
                    </Link>
                </li>
            </ul> */}
        </div>
        </>
    );
};
export default userLinks;