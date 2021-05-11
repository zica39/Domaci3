import React from 'react';
import {useHistory} from "react-router-dom";
import {XOctagon, Lock} from "react-bootstrap-icons";

const Forbidden = () => {
    const history = useHistory();
    return <div className="container py-5">
        <div className="row">
            <div className="col-md-2 text-center">
               <h1><XOctagon/></h1><p>Status Code: 403</p>
            </div>
            <div className="col-md-10">
                <h3>OPPSSS!!!! Sorry...</h3>
                <p>Sorry, your access is refused due to security reasons of our server and also our sensitive data.<br/>Please
                    login.</p>
                <button className="btn btn-danger" onClick={()=>history.push('/login')}><Lock/> Login</button>
            </div>
        </div>
    </div>


}

export default Forbidden;