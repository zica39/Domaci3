import React,{useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useHistory} from "react-router-dom";
import {saveToStorage, swalAlert} from "../../functions/tools";
import { Lock,BoxArrowRight } from 'react-bootstrap-icons';
import {login} from '../../services/auth';
import {Link} from 'react-router-dom'
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";


const Login = () => {
    const history = useHistory();
    const[disabled,setDisabled] = useState(false);

    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    });

    const {register,formState: { errors }, handleSubmit} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:{
            username:'',
            password:'',
            rememberMe: false
        }
    });
    const onSubmit = (data) => {

        setDisabled(true);
        login(data).then(function(response){

            saveToStorage('id_token',response?.data?.id_token);
            saveToStorage('username',data.username);
            saveToStorage('role','admin');

            history.push('/');

        }).catch(function (error) {
            swalAlert('error', 'Error', error?.response?.data?.detail);
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
                  {...register('username')}
            />
            <small className="text-danger text-left"> {errors?.username?.message}</small>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"  className="w-75 m-auto"
                  {...register('password')}
            />
            <small className="text-danger text-left"> {errors?.password?.message}</small>
        </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember Me"
                            {...register('rememberMe')}
                />
            </Form.Group>

        <Button disabled={disabled} variant="primary" type="submit" onClick={handleSubmit(onSubmit)}>
             {disabled?
            <div className="spinner-border"/>:
            <span>LogIn <BoxArrowRight/></span>}
        </Button>
    </Form>
            <div className="footer mt-3">
                <p>Don't have an Account! <Link to="register">Sign Up Here</Link></p>
            </div>
    </div>
    </div>
}

export default Login;