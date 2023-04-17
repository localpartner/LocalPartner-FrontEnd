import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './customer/Signup';
import Signin from './customer/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Shop from './core/Shop';
import Product from './core/Product';
import MyCart from './core/MyCart';
import UserProfile from './core/UserProfile'
import MyOrders from './core/orders';
import Profile from './customer/Profile';
import Checkout from './core/Checkout';
import ManageAddress from './core/ManageAddress';
import Wishlist from './core/Wishlist';
import UpdateAddress from './core/UpdateAddress';
import mappage from './core/Mappage';
import  PlaceOrder  from './core/PlaceOrder';
import Address from './core/Address';
import OrderHistory from './core/OrderHistory';
import DisplayOrder from './core/DisplayOrder';
const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop/1/:category/2/:name" exact component={Shop} />
                <Route path="/shop/1/:category" exact component={Shop} />
                <Route path="/shop/2/:name" exact component={Shop} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/mappage" exact component={mappage} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/product/:productId" exact component={Product} />
                <PrivateRoute path="/mycart" exact component={MyCart} />
                <PrivateRoute path="/user/address" exact component={ManageAddress}/>
                <PrivateRoute path="/address/:userId" exact component={ManageAddress}/>
                <PrivateRoute path="/user/profile" exact component={UserProfile} />
                <PrivateRoute path="/user/orders" exact component={MyOrders} />
                <PrivateRoute path="/user/profile/:userId" exact component={Profile} />
                <PrivateRoute path="/user/updateaddress" exact component={UpdateAddress} />
                <PrivateRoute path="/orders/:userId" exact component={MyOrders} />
                <PrivateRoute path="/checkout" exact component={Checkout} />
                <Route path="/wishlist" exact component={Wishlist} />
                <Route path="/placeorder" exact component={PlaceOrder} />
                <Route path="/checkoutProduct" exact component={Address} />
                <Route path="/orderhistory" exact component={OrderHistory} />
                <Route path="/displayorder:id" exact component={DisplayOrder} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
