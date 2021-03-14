import React, {useState, useEffect, useContext} from 'react';
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
import { UserContext } from '../components/UserContext';

// Dropdown functionality from:
//https://reactstrap.github.io/components/navbar/

function AppNavbar(props) {
    const context = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false)
    const [refresh, setRefresh] = useState(0)

    useEffect(() => {
        if(context.Role === 'Admin'){
            setIsAdmin(true)
            setRefresh(refresh + 1)
        }
    }, [refresh])
    return(
        <div>
            <Navbar expand="lg" style={{backgroundColor:"#22a9ba",color:"inherit",marginBottom:"40px",padding:"15px"}}>
            <Container>
                    <Link to={isAdmin ? '/admin/dashboard' : '/'}>
                        <NavbarBrand style={{color:"white"}}>CBR Manager</NavbarBrand>
                    </Link>

                    <Nav className="ml-auto" navbar>
                        {!isAdmin ?
                        <NavItem>
                            <Link to="/dashboard" className="nav-link" style={{color:"#c7eabe"}}>
                                Dashboard
                            </Link>
                        </NavItem>
                        :""}
                        {!isAdmin ?
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
                        : ""}
                        <NavItem>
                            <Link to="/logout" className="nav-link" style={{color:"#000000"}}>
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