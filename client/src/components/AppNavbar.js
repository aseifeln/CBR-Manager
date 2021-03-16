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

    useEffect(() => {
        if(context.Role === 'Admin'){
            setIsAdmin(true)
        }
    }, [])
    return(
        <div>
            <Navbar expand="lg" style={{backgroundColor:"#585858",color:"inherit",marginBottom:"40px",padding:"15px"}}>
            <Container>
                    <Link to={isAdmin ? '/admin/dashboard' : '/'}>
                        <NavbarBrand style={{color:"white"}}> <img src="favicon.ico" style={{display:"inline"}}/>CBR Manager</NavbarBrand>
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
                            <Link to="/logout" className="nav-link" style={{color:"#c7eabe"}}>
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