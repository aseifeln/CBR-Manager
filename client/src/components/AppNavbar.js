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
            <Navbar expand="lg" style={{backgroundColor:"#22a9ba",color:"inherit",marginBottom:"40px",padding:"15px"}}>
            <Container>
                    <NavbarBrand href="/" style={{color:"white"}}>CBR Manager</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/" style={{color:"#c7eabe"}}>Dashboard</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret style={{color:"#c7eabe"}}>Clients</DropdownToggle>
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