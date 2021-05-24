import React,{useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link, useHistory} from "react-router-dom";
import {generateFormData, swalAlert} from "../../functions/tools";
import { Person,BoxArrowRight } from 'react-bootstrap-icons';
import {registerUser} from "../../services/auth";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import user_model from "../../constants/user_model";

const Register = () => {
    const history = useHistory();
    const[disabled,setDisabled] = useState(false);

    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        login: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
    });


    const {register,formState: { errors }, handleSubmit} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:generateFormData(user_model)
    });

    const onSubmit = (data) => {

        delete data.passwordConfirmation;
        setDisabled(true);

        registerUser(data).then(function(response){
            swalAlert('info','User registered successfully!','You will get a confirmation email to activate your account').then(()=>{
                history.push('/login');
            });

        }).catch( (error)=> {
            swalAlert('error', 'Error', error.response?.data?.title);
            setDisabled(false);
        });

    }

    return <div className='container-fluid'>

        <div className='col-sm-10 offset-sm-1 col-md-6 offset-md-3 border-dark shadow-lg py-3'>
            <p className='h3'><Person/>Member register</p>
            <Form className={"mt-3"}>
                <Form.Group controlId="firstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter FirstName" className="w-75 m-auto"
                        {...register('firstName')}
                    />
                    <small className="text-danger text-left"> {errors?.firstName?.message}</small>
                </Form.Group>

                <Form.Group controlId="lastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter LastName" className="w-75 m-auto"
                        {...register('lastName')}
                    />
                    <small className="text-danger text-left"> {errors?.lastName?.message}</small>
                </Form.Group>

                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" className="w-75 m-auto"
                          {...register('login')}
                    />
                    <small className="text-danger text-left"> {errors?.login?.message}</small>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" className="w-75 m-auto"
                        {...register('email')}
                    />
                    <small className="text-danger text-left"> {errors?.email?.message}</small>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"  className="w-75 m-auto"
                        {...register('password')}
                    />
                    <small className="text-danger text-left"> {errors?.password?.message}</small>
                </Form.Group>

                <Form.Group controlId="passwordConfirmation">
                    <Form.Label>Confirmation password</Form.Label>
                    <Form.Control type="password" placeholder="Confirmation password"  className="w-75 m-auto"
                                  {...register('passwordConfirmation')}
                    />
                    <small className="text-danger text-left"> {errors?.passwordConfirmation?.message}</small>
                </Form.Group>

                <Button disabled={disabled} variant="primary" type="submit" onClick={handleSubmit(onSubmit)}>
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
