import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import DropdownElement from "../Dropdown/Dropdown";
import {Link, useRouteMatch} from 'react-router-dom';
import {Person, Book, Film} from 'react-bootstrap-icons';
import logo from './logo192.png';

const NavbarTop = () => {
    const data = useRouteMatch();

    return <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
            <img src={logo} alt='React-app' className="m-1" style={{width:28}} />
            <Link className={(data.path==='/')?'':'text-light'} to='/home'>React-App</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link><Link className={(data.path.startsWith('/movies'))?'':'text-light'} to="/movies"><Film/> Movies</Link></Nav.Link>
                <Nav.Link><Link className={(data.path.startsWith('/books'))?'':'text-light'} to="/books"><Book/> Books</Link></Nav.Link>
                <Nav.Link><Link className={(data.path.startsWith('/people'))?'':'text-light'} to="/people"><Person/> People</Link></Nav.Link>
            </Nav>
            <DropdownElement/>
        </Navbar.Collapse>
    </Navbar>
}

export default NavbarTop;