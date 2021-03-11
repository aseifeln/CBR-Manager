import React from 'react';
import {Container} from 'reactstrap';
import AdminSideBar from '../components/AdminSideBar';

function WorkerListPage() {

    return(
        <>
        <AdminSideBar/>
        <Container className="main-content">
            <h1>Worker List</h1>
        </Container>
        </>
    )
}

export default WorkerListPage;