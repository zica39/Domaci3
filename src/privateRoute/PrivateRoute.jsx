import React,{Suspense} from 'react';
import {Route,useHistory,useLocation} from 'react-router-dom';
import Forbidden from "../pages/forbidden/Forbidden";
import AuthLayout from "../components/layout/AuthLayout";
import BasicLayout from "../components/layout/BasicLayout";
import {loadFromStorage} from "../functions/tools";

const PrivateRoute = ({component: Component, isPrivate, ...rest}) => {
    const Layout = isPrivate ? AuthLayout : BasicLayout;
    const history  = useHistory();
	const location = useLocation();
	
    if(loadFromStorage('role') && !isPrivate)history.push('/');
	if(!loadFromStorage('role') && isPrivate && location.pathname === '/')history.push('/login');

    return <Route {...rest} component={() => {
        if(isPrivate && loadFromStorage('role')) return <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                <Component {...rest}/>
        </Suspense></Layout>;
        else if( isPrivate &&  !loadFromStorage('role') )  return <Forbidden/>;
        else if(loadFromStorage('role') && !isPrivate) return <></>;
        else return <Layout>
                <Suspense fallback={<div>Loading...</div>}>
                <Component {...rest}/>
            </Suspense>
        </Layout>;
    }}/>
}

export default PrivateRoute;
