import React,{Component} from 'react';
import {Navbar,Nav} from 'react-bootstrap';

import {NavLink} from 'react-router-dom';


class NavBar extends Component{

    render = ()=>{
        return(
            <Navbar bg="dark" variant="dark" sticky="top">
                <Navbar.Brand href="#home"><NavLink to='/' className='nav-link'>Galaxy Guide Admin</NavLink></Navbar.Brand>
                <Nav className="mr-auto">
                    <NavLink to='/' className='nav-link'>Home</NavLink>
                    <NavLink to='/quizes' className='nav-link'>Quizes</NavLink>
                    <Nav.Link href="#pricing">Students</Nav.Link>
                    <Nav.Link href="#pricing">Website</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#deets">Log Out</Nav.Link>
                    
                </Nav>
            </Navbar>
        );
    }
}

export default NavBar;