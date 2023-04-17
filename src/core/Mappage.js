
import Geocode from "react-geocode";
import React, { useState, useEffect } from 'react';
import Header from "./Header";
import { Link } from "react-router-dom";
import Search from "./Search";
import {  useRecoilValue } from "recoil";
import Menu from "./Menu"
import { cartFetchData } from "../recoil/carts/cartHelpers";
//import { signout, isAuthenticated } from "../auth";
import {isAuthenticated } from "../common/utils"
import GoogleMapReact from 'google-map-react';
// const AnyReactComponent = ({ text }) => <div>{text}</div>;
const mappage = () => {
  const {
    clength,
    total
} = useRecoilValue(cartFetchData);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [status, setStatus] = useState();
  const logout = () => {
    localStorage.removeItem('jwt');
    window.location.reload();
    //alert('Register Successfully');
};
  // Geocode.setApiKey("AIzaSyAJayZKZCKq1PeopI6NTAJXDVIN7FMiUW8");
  // Geocode.setLanguage("en");
  // Geocode.setLocationType("ROOFTOP");
  // const defaultProps = {
  //   center: {
  //     lat: 10.99835602,
  //     lng: 77.01502627
  //   },
  //   zoom: 11
  // };
  // Geocode.fromLatLng("29.775034", "80.056290").then(
  //   (response) => {
  //     const address = response.results[0].formatted_address;
  //     console.log(address);
  //   },
  //   (error) => {
  //     console.error(error);
  //   }
  // );
  const key = "AIzaSyC1Km9NyWwNCSAuCRbDhTcncGNu0D91hIk"
  const getLocation = () => {
    // if (!navigator.geolocation) {
    //   console.log("geo not")
    //   setStatus('Geolocation is not supported by your browser');
    // } else {
      setStatus('Locating...');
      console.log("geo")
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude
        const ifameData = document.getElementById("iframeId")

        ifameData.src = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;&output=embed`


      }, () => {
        setStatus('Unable to retrieve your location');
      });
    // }
  }
  useEffect(() => {
    const ifameDat = document.getElementById("iframeId")

  ifameDat.src = `https://maps.google.com/maps?q=10.99835602,77.01502627&hl=es;&output=embed`

    // fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${29.775034},${80.056290}&location_type=ROOFTOP&result_type=street_address&key=${key}`)
    //   .then(response => response.json()).then(data => console.log(data))

  },[])
  return (
    <div className="App">
      <div className="bg-dark w-100 mx-auto">
      <div className="d-flex justify-content-between align-items-center ">
                        <div className="col-md-2 col-12 ml-4">
                            <div className="logo">
                                <Link to="/"><h1 className="white">Logo</h1></Link>
                            </div>
                        </div>
                        <div className="col-md-3 col-12" style={{padding: '0px' }}>
                            <div className="cart_shop f-l">
                                <Link to="/placeorder">
                                <i className="fas fa-shopping-cart fa-2x white mx-2"></i>
                                  {/* <span className="cart-count" style={{display: 'inline', background : "red" , padding : "0px 2px" }}> {clength} </span>   */}
                                {/* <span>Your Cart <small><i className="fas fa-rupee-sign fa-sm"></i>{total}</small> </span> */}
                                </Link>          
                                <i className="fas fa-user fa-2x white"></i>
                            </div>
                            {/* <Menu/> */}
                        </div>
                    </div>
      </div>


      <div className="position-relative ">
      <iframe id="iframeId" height="580px" width="100%" className=""></iframe>
      <div className="cartbox">
        <div className="py-4 ">
        <h2 className="px-2">From Where You Want To Buy?</h2>
          <p className="p-2 bg-light d-flex text-dark cursor mb-2" onClick={getLocation}>
          <div className="circle mr-2"><i class="fa fa-map-marker mt-1 text-light ml-2" aria-hidden="true"></i></div>
          Allow location Access</p>
          {/* <p className="px-2 bg-dark text-light">Set location on map</p> */}
        </div>
      </div>
      </div>
      
      
      {/* <h1>Coordinates</h1>
      <p>{status}</p>
      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Longitude: {lng}</p>} */}
    </div>
  );
}

export default mappage;
