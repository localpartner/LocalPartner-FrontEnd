import React from "react";
import Menu from "./Menu";
import "../styles.css";
import Header from "./Header";
import Footer from "./Footer";
import FooterNew from "./FooterNew";

const Layout = ({
    title = "",
    description = "",
    className,
    children
}) => (
    <div>
        <Header />
        <div className="jumbotron_1">
            {/* <h2>{title}</h2> */}
            {/* <p className="lead">{description}</p> */}
        </div>
        <div className={className}>{children}</div>
        <FooterNew />
    </div>
);

export default Layout;
