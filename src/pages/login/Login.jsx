import React,{useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useHistory} from "react-router-dom";
import {saveToStorage} from "../../functions/tools";
import { Lock,BoxArrowRight } from 'react-bootstrap-icons';

const Login = () => {
    const history = useHistory();
    const[username,setUsername] = useState('');

    const onLogin = () => {
        if(!username){
            alert('Username filed is required!');
            return false;
        }
            saveToStorage('role','admin');
            saveToStorage('username',username);

            history.push('/');
    }

    return <div className='container-fluid'>

        <div className='col-sm-10 offset-sm-1 col-md-6 offset-md-3 border-dark shadow-lg py-3'>
            <p className='h3'><Lock/>Member login</p>
        <Form className={"mt-3"}>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" className="w-75 m-auto"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
            />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"  className="w-75 m-auto"/>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={() => onLogin()}>
            LogIn <BoxArrowRight/>
        </Button>
    </Form>
    </div>
    </div>
}

export default Login;