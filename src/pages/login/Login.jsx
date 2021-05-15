import React,{useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useHistory} from "react-router-dom";
import {saveToStorage} from "../../functions/tools";
import { Lock,BoxArrowRight } from 'react-bootstrap-icons';
import {login} from '../../services/auth';

const Login = () => {
    const history = useHistory();
    const[loginData,setLoginData] = useState({
        username:'',
        password:'',
        rememberMe: false
    });
    const[disabled,setDisabled] = useState(false);


    const onSubmit = () => {

        setDisabled(true);
        login(loginData).then(function(response){

            saveToStorage('id_token',response?.data?.id_token);
            saveToStorage('username',loginData.username);
            saveToStorage('role','admin');

            history.push('/');

        }).catch(function (error) {
            alert(error?.response?.data?.detail);
            setDisabled(false);
        });

    }

    return <div className='container-fluid'>

        <div className='col-sm-10 offset-sm-1 col-md-6 offset-md-3 border-dark shadow-lg py-3'>
            <p className='h3'><Lock/>Member login</p>
        <Form className={"mt-3"}>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" className="w-75 m-auto"
                          value={loginData.username}
                          onChange={(e) => setLoginData(prevState => {
                              return{
                                  ...prevState,
                                  'username': e.target.value
                              }
                          })}
            />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"  className="w-75 m-auto"
                          value={loginData.password}
                          onChange={(e) => setLoginData(prevState => {
                              return{
                                  ...prevState,
                                  'password': e.target.value
                              }
                          })}
            />
        </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember Me"
                            value={loginData.rememberMe}
                            onChange={(e) => setLoginData(prevState => {
                                return{
                                    ...prevState,
                                    'rememberMe': e.target.value
                                }
                            })}
                />
            </Form.Group>

        <Button disabled={disabled} variant="primary" type="button" onClick={() => onSubmit()}>
             {disabled?
            <div className="spinner-border"/>:
            <span>LogIn <BoxArrowRight/></span>}
        </Button>
    </Form>
    </div>
    </div>
}

export default Login;