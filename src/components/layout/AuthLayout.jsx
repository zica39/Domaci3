import React from 'react';
import NavbarTop from "../navbarTop/NavbarTop";

const AuthLayout = ({children}) => {
    return <div>
        <NavbarTop/>
        {children}
    </div>
}

export default AuthLayout;
