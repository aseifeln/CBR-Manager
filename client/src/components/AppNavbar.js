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


// Dropdown functionality from:
//https://reactstrap.github.io/components/navbar/

function AppNavbar(props) {

    return(
        <div>
            <Navbar color="dark" dark expand="lg" className="mb-5">
            <Container>
                    <NavbarBrand href="/">CBR Manager</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/">Dashboard</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>Clients</DropdownToggle>
                            <DropdownMenu>
                            <DropdownItem href="/client/new">Add new client</DropdownItem>
                            <DropdownItem tag="a" href="/client-list">All clients</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
            </Container>
            </Navbar>
        </div>
    );
}


export default AppNavbar