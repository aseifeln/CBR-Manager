import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import AdminSideBar from '../components/AdminSideBar';

function AdminDashboard() {

    return(
        <>
        <AdminSideBar/>
        <Container className="main-content">
            <h1>Dashboard</h1>
        </Container>
        </>
    )
}

export default AdminDashboard;