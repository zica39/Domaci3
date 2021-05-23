import {destroyData, loadFromStorage} from "../../functions/tools";
import DropdownButton from "react-bootstrap/DropdownButton";
import React, {useEffect, useState} from "react";
import {getUser} from "../../services/auth";
import {useHistory} from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { Key,Person,At } from 'react-bootstrap-icons';

const DropdownElement = () => {
    const [userData,setUserData] = useState({});
    const history = useHistory();
    useEffect(()=>{
        getUser(loadFromStorage('username')).then(res => {
            setUserData(res.data);
        });
    },[]);

    return <DropdownButton eventKey={3} variant="dark" menuAlign={{md: 'right'}} title={loadFromStorage('username')}>
        <Dropdown.Item disabled={true}><Person/> {userData?.firstName + ' '+ userData?.lastName}</Dropdown.Item>
        <Dropdown.Item disabled={true}><At/> {userData?.email}</Dropdown.Item>
        <Dropdown.Item onClick={() => {
            destroyData('role');
            destroyData('id_token');
            history.push("/login");
        }}><Key/> Logout</Dropdown.Item>
    </DropdownButton>;
}

export default DropdownElement;