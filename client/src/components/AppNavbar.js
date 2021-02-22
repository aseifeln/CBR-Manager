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
            <Navbar color="dark" dark expand="lg" className="mb-5">
            <Container>
                    <Link to="/dashboard">
                        <NavbarBrand>CBR Manager</NavbarBrand>
                    </Link>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to="/dashboard" className="nav-link">
                                Dashboard
                            </Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>Clients</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem tag={Link} to="/client/new">
                                        Add new client
                                </DropdownItem>
                                <DropdownItem tag={Link} to="/client-list"> 
                                        All clients
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
            </Container>
            </Navbar>
        </div>
    );
}


export default AppNavbar