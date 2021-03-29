import React, {useState} from 'react';
import { Container, Button} from 'reactstrap';
import AdminSideBar from '../../components/AdminSideBar';
import CookieChecker from '../../components/CookieChecker';
import CreateAdminAccount from '../../components/CreateAdminAccount';

function AdminDashboard() {

    const [toggleCreateAdmin, setToggleCreateAdmin] = useState(false);

    return(
        <>
            <CookieChecker></CookieChecker>
            <AdminSideBar/>
            {toggleCreateAdmin ?
            <CreateAdminAccount onClick={() => setToggleCreateAdmin(false)}
            onSuccess={() => setToggleCreateAdmin(false)}/>
            : ''}
            <Container>
                <div className="main-content">
                    <h1>Dashboard</h1>
                    <Button onClick={() => setToggleCreateAdmin(true)}>Create New Admin</Button>
                </div>
            </Container>
        </>
    )
}

export default AdminDashboard;