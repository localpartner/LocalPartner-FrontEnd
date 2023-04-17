import React from "react";

const ProfileHome= (props) =>{
    return(
        <div className="bz_inner_page_navigation float_left">
            <div className="container custom_container">
                <div className="inner_menu float_left">
                    <ul>
                        <li>
                            <a href="#">
                            {" "}
                            <span>
                                <i className="fas fa-home"></i>
                            </span>{" "}
                            </a>
                        </li>
                        <li className="active">
                            <a href="#">
                            {" "}
                            <span>
                                <i className="fas fa-angle-right"></i>
                            </span>{" "}
                            {/* My Profile */}
                            {props.profile}
                            </a>
                        </li>
                        <li className="active">
                        <a href="#">
                        {" "}
                        <span>
                            <i className="fas fa-angle-right"></i>
                        </span>{" "}
                        {props.Update}
                        {/* Profile Update */}
                        </a>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProfileHome;