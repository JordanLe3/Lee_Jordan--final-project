import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink as RouteLink } from 'react-router-dom'
import userIcon from '../images/user.svg'

function Navigation (props) {
    return (
    <div className='navbar-color'>
        <Navbar>
            <Container>
            <NavbarBrand tag={RouteLink} to="/">Jordan Lee</NavbarBrand>
                <Nav>
                    <NavItem>
                        <NavLink tag={RouteLink} to="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={RouteLink} to="/Portfolio">Portfolio</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink tag={RouteLink} to="/Resume">Resume</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={RouteLink} to="/Contact">Contact</NavLink>
                    </NavItem>
                    {props.setLoggedIn &&
                    <NavItem>
                        <NavLink tag={RouteLink} to="/Login">Login</NavLink>
                    </NavItem>
                    }
                    {props.setLoggedIn && 
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            <img src={userIcon} alt=''/>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem tag={RouteLink} to="/Submissions">
                                Submissions
                            </DropdownItem>
                            <DropdownItem tag={RouteLink} to="/AddUser">
                                Add User
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={sessionStorage.removeItem('token')} tag={RouteLink} to="/">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    }

                </Nav>
            </Container>
        </Navbar>
    </div>
    );
}
export default Navigation;