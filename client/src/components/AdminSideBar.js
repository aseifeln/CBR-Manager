import React, { useState } from "react";
import {
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { NavLink as RRNavLink } from 'react-router-dom';
import '../css/AdminSideBar.css';
import { FaTachometerAlt, FaRegChartBar, FaBars, FaBriefcase, FaComment, FaUser } from 'react-icons/fa';


function AdminSideBar() {

    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <>
            <Nav vertical className={`SideNav ${isCollapsed ? "collapsed" : ""}`}>
                <div className="sidenav-top-space">
                    <FaBars className="hamburger-icon" onClick={()=> setIsCollapsed(!isCollapsed)} size="27"/>
                </div>
                
                <NavItem className={`sidenav-item ${isCollapsed ? "collapsed-link" : ""}`}>
                    <NavLink className="sidenav-link" activeClassName="active" tag={RRNavLink} to="/admin/dashboard">
                        <FaTachometerAlt className={`icon ${isCollapsed ? "collapsed-icon" : ""}`} size="25"/>{isCollapsed ? "" : "Dashboard"}
                    </NavLink>
                </NavItem>

                <NavItem className={`sidenav-item ${isCollapsed ? "collapsed-link" : ""}`}>
                    <NavLink className="sidenav-link" activeClassName="active" tag={RRNavLink} to="/admin/insights">
                        <FaRegChartBar className={`icon ${isCollapsed ? "collapsed-icon" : ""}`} size="25"/>{isCollapsed ? "" : "Insights"}
                    </NavLink>
                </NavItem>

                <NavItem className={`sidenav-item ${isCollapsed ? "collapsed-link" : ""}`}>
                    <NavLink className="sidenav-link" activeClassName="active" tag={RRNavLink} to="/admin/worker-list">
                        <FaBriefcase className={`icon ${isCollapsed ? "collapsed-icon" : ""}`} size="25"/>{isCollapsed ? "" : "Workers"}
                    </NavLink>
                </NavItem>

                <NavItem className={`sidenav-item ${isCollapsed ? "collapsed-link" : ""}`}>
                    <NavLink className="sidenav-link" activeClassName="active" tag={RRNavLink} to="/client-list">
                        <FaUser className={`icon ${isCollapsed ? "collapsed-icon" : ""}`} size="25"/>{isCollapsed ? "" : "Clients"}
                    </NavLink>
                </NavItem>

                <NavItem className={`sidenav-item ${isCollapsed ? "collapsed-link" : ""}`}>
                    <NavLink className="sidenav-link" activeClassName="active" tag={RRNavLink} to="/admin/messaging">
                        <FaComment className={`icon ${isCollapsed ? "collapsed-icon" : ""}`} size="25"/>{isCollapsed ? "" : "Messaging"}
                    </NavLink>
                </NavItem>
            </Nav>
        </>
    );
}

export default AdminSideBar;
