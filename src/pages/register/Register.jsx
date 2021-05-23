import React,{useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link, useHistory} from "react-router-dom";
import {swalAlert} from "../../functions/tools";
import { Lock,BoxArrowRight } from 'react-bootstrap-icons';
import {register} from '../../services/auth';

const Register = () => {
    const history = useHistory();
    const[registerData,setRegisterData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        login:'',
        authorities:["ROLE_USER"],
        lang_key:'en'
    });
    const[disabled,setDisabled] = useState(false);

    const onSubmit = () => {

        console.log(3);

        setDisabled(true);
        register(registerData).then(function(response){
            
            history.push('/login');
            swalAlert('success','Good job!','User registered successfully');

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
                    <Form.Label>FirstName</Form.Label>
                    <Form.Control type="text" placeholder="Enter FirstName" className="w-75 m-auto"
                                  value={registerData.firstName}
                                  onChange={(e) => setRegisterData(prevState => {
                                      return{
                                          ...prevState,
                                          'firstName': e.target.value
                                      }
                                  })}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>LastName</Form.Label>
                    <Form.Control type="text" placeholder="Enter LastName" className="w-75 m-auto"
                                  value={registerData.lastName}
                                  onChange={(e) => setRegisterData(prevState => {
                                      return{
                                          ...prevState,
                                          'lastName': e.target.value
                                      }
                                  })}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" className="w-75 m-auto"
                                  value={registerData.login}
                                  onChange={(e) => setRegisterData(prevState => {
                                      return{
                                          ...prevState,
                                          'login': e.target.value
                                      }
                                  })}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" className="w-75 m-auto"
                                  value={registerData.email}
                                  onChange={(e) => setRegisterData(prevState => {
                                      return{
                                          ...prevState,
                                          'email': e.target.value
                                      }
                                  })}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"  className="w-75 m-auto"
                                  value={registerData.password}
                                  onChange={(e) => setRegisterData(prevState => {
                                      return{
                                          ...prevState,
                                          'password': e.target.value
                                      }
                                  })}
                    />
                </Form.Group>

                <Button disabled={disabled} variant="primary" type="button" onClick={() => onSubmit()}>
                    {disabled?
                        <div className="spinner-border"/>:
                        <span>Register <BoxArrowRight/></span>}
                </Button>
            </Form>
            <div className="footer mt-3">
                <p>Already have an account?<Link to="login"> Sign in here.</Link></p>
            </div>
        </div>
    </div>
}

export default Register;
