import React from 'react';
import {
UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import { Link } from 'react-router-dom';


// Dropdown functionality from:
//https://reactstrap.github.io/components/navbar/

function AppNavbar(props) {

    return(
        <div>
            <Navbar expand="lg" style={{backgroundColor:"#22a9ba",color:"inherit",marginBottom:"40px",padding:"15px"}}>
            <Container>
                    <Link to="/dashboard">
                        <NavbarBrand style={{color:"white"}}>CBR Manager</NavbarBrand>
                    </Link>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to="/dashboard" className="nav-link" style={{color:"#c7eabe"}}>
                                Dashboard
                            </Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret style={{color:"#c7eabe"}}>Clients</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem tag={Link} to="/client/new">
                                        Add new client
                                </DropdownItem>
                                <DropdownItem tag={Link} to="/client-list"> 
                                        All clients
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem>
                            <Link to="/" className="nav-link" style={{color:"#c7eabe"}}>
                                Logout
                            </Link>
                        </NavItem>
                    </Nav>
            </Container>
            </Navbar>
        </div>
    );
}


export default AppNavbar