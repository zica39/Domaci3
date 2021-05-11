import React from 'react';
import {Route, useRouteMatch} from 'react-router-dom';
import Forbidden from "../pages/forbidden/Forbidden";
import AuthLayout from "../components/layout/AuthLayout";
import BasicLayout from "../components/layout/BasicLayout";
import Login from "../pages/login/Login";
import {loadFromStorage} from "../functions/tools";


const PrivateRoute = ({component: Component, isPrivate, ...rest}) => {
    const Layout = isPrivate ? AuthLayout : BasicLayout;
    const data = useRouteMatch();

    return <Route {...rest} component={() => {
        return isPrivate ? loadFromStorage('role') ?
            <Layout><Component {...rest}/></Layout>
            :
            data.path==='/'?<Login/>:<Forbidden/>
            :
            <Layout><Component {...rest}/></Layout>
    }}/>
}

export default PrivateRoute;