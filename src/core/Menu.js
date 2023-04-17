import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { Link, withRouter } from "react-router-dom";
import { signout } from "../auth/Cutomer";
import { isAuthenticated } from "../common/utils"
import { itemTotal } from "./cartHelpers";
import RegistrationModal from "./RegistrationModal";
import Login from "./Login";
import { useRecoilState , useRecoilValue  } from 'recoil';
import { cartFetchData,cartList } from '../recoil/carts/cartHelpers';


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};



const Menu = ({ history }) => {
   const [cartItem, setCartItem] = useRecoilState(cartList);
    const {clength} = useRecoilValue(cartFetchData);
    const { user, token } = isAuthenticated();
    const [showLoginModal , setShowLoginModal] = useState(false);
    const [showRegistrationModal , setShowRegistrationModal] = useState(false);
    const handleLoginModalShow = () =>{
        setShowLoginModal(true);
    }

    const handleLoginModalClose = () => {
        setShowLoginModal(false);
    }
    
    const handleRegistartionModalShow = () =>{
        setShowRegistrationModal(true)
    }
    const handleRegistartionModalClose = () =>{
        setShowRegistrationModal(false)
    }
  
    
    const logout = () => {
        if(clength!= 0 && user){
            setCartItem([]);
        }
        localStorage.removeItem('jwt');
        // <Redirect to="/" />
    };

    return (
        <div>
            <ul className="login f-r">

                {!isAuthenticated() && (
                    <li className="nav-item margin-t-15 f-l">
                    <Link to="#" onClick={handleLoginModalShow} >
                            Login
                    </Link>
                    {showLoginModal === true ? <Login show={showLoginModal} close={handleLoginModalClose} registrationModal={handleRegistartionModalShow} location="/user/profile" /> : null}
                    </li>
                )}
                {!isAuthenticated() && (
                    <li className="nav-item margin-t-15 f-l">
                        <Link to="#">/</Link>
                    </li>
                )}
                {!isAuthenticated() && (
                    <li className="nav-item margin-t-15 f-l">
                    <Link to="#" onClick={handleRegistartionModalShow} >
                         Register
                    </Link>
                        <RegistrationModal show={showRegistrationModal} close={handleRegistartionModalClose} loginModal={handleLoginModalShow}/>
                    </li>
                )}
            </ul>
            {isAuthenticated() && (
                <div className="cart_shop f-r margin-t-15">
                    <Link to="#" style={{'textTransform':'capitalize'}}>
                        {/* +" "+user.lastName */}
                        {/* <span>{console.log("user.firstName",user.firstName)} &nbsp;<i className="fas fa-angle-down"></i></span> */}
                    </Link>
                    <div className="cart_details" style={{ width: '160px' }}>
                        <ul>
                            <li className="profile-link"><Link to="/user/profile">My Profile</Link></li>
                            <li className="profile-link"><Link to="/user/orders">My Orders</Link></li>
                            <li className="profile-link"><Link to="/wishlist">Wishlist</Link></li>
                            <li className="profile-link"><Link to="#">Conatct Us</Link></li>
                            <li className="profile-link"><Link to="#" onClick={logout}>Logout</Link></li>
                        </ul>
                    </div>
                </div>
            )
            }
        </div>
    );

}

export default withRouter(Menu);
