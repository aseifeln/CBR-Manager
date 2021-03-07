import React, { useState } from "react";
import {
  UncontrolledDropdown,
  NavbarToggler,
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import { NavLink as RRNavLink } from 'react-router-dom';
import '../css/AdminSideBar.css';
import { FaTachometerAlt, FaRegChartBar, FaBars, FaBriefcase, FaComment, FaUser } from 'react-icons/fa';


function AdminSideBar() {

    return (
        <div>
        <Nav vertical className="SideNav">
            <NavItem className="sidenav-item">
            <NavLink className="sidenav-link" activeClassName="active" tag={RRNavLink} to="/admin/dashboard">
                <FaTachometerAlt className= "icon" size="25"/>Dashboard
            </NavLink>
            </NavItem>
            <NavItem className="sidenav-item">
            <NavLink className="sidenav-link" activeClassName="active" tag={RRNavLink} to="/admin/insights">
                <FaRegChartBar className= "icon" size="25"/>Insights
            </NavLink>
            </NavItem>
            <NavItem className="sidenav-item">
            <NavLink className="sidenav-link" activeClassName="active" tag={RRNavLink} to="/admin/workers">
                <FaBriefcase className= "icon" size="25"/>Workers
            </NavLink>
            </NavItem>
            <NavItem className="sidenav-item">
            <NavLink className="sidenav-link" activeClassName="active" tag={RRNavLink} to="/client-list">
                <FaUser className= "icon" size="25"/>Clients
            </NavLink>
            </NavItem>
            <NavItem className="sidenav-item">
            <NavLink className="sidenav-link" activeClassName="active" tag={RRNavLink} to="/admin/messaging">
                <FaComment className= "icon" size="25"/>Messaging
            </NavLink>
            </NavItem>
        </Nav>
        </div>
    );
}

export default AdminSideBar;
