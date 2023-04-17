
import React, { useState, useEffect } from "react";
import {  useRecoilValue,useRecoilState } from "recoil";
import { progressBarState } from "../recoil/atom/progressBarState";
import ReactLoading from "react-loading";
import  '../progressbar.css'; 
const Loading = ()=>{
    //console.log(styles.overlay,"Stles")
    let showProgressBar = useRecoilValue(progressBarState)
    let cmp = showProgressBar== true ? 
        <div style={{width:"100%",zIndex:"1", height:"100%",justifyContent:"center", alignItems:"center", top:"0",left:"0", position:"fixed", opacity:"0.5"}}>
            <ReactLoading type="bars" color="#01a5ed" /> 
        </div>
    : null;
    return (
     cmp
    )

}

export default Loading;