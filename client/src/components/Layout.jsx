import React from "react";
import NavBar from "./NavBar/NavBar";

const Layout = (props) => {
    return (
        <>
            <NavBar from={props.from} />
            {props.children}
        </>
    );
};

export default Layout;
