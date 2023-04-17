import React from "react";
import Routes from "./Routes";
import Loading from "./core/Loading";
import {
    RecoilRoot
  } from 'recoil';
  
const App = () => (
    <RecoilRoot>
        {/* <Loading></Loading> */}
        <Routes></Routes>
    </RecoilRoot>
)
export default App;
