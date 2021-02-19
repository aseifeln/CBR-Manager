import React, { useState , useEffect} from "react";
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'

import AppNavbar from "../components/AppNavbar";
import "../css/Login.css";

function Login(props) {
    const WRONGPASSWORD = '0'
    const SUCCESS = '1'
    const UNREGISTERED = '2'
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const user = {
            username: document.getElementById('userName').value,
            password: document.getElementById('password').value,
        }
        axios.post('http://localhost:5000/users/login',{user})
            .then(res => {
                if(!authPasses()){
                    alert("Username or password is invalid size");
                }
                else if(res.data == WRONGPASSWORD){
                    alert("Wrong Password");
                    props.history.push("/login");
                } else if(res.data == UNREGISTERED) {
                    alert("User is not registered");
                    props.history.push("/login");
                } else { //SUCCESS
                    props.history.push("/");
                }
                return;
              })
            .catch( err => {
                console.log(err);
            })

        
    }

    function authPasses() {
        return username.length > 0 && password.length > 0;
    }

    return (
        
        <div className='Login'>
            <AppNavbar />
            <Form onSubmit={handleSubmit}>
                <Label>Username: </Label>
                <Input
                    type="text"
                    id="userName"
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Username"
                />
                <Label>Password: </Label>
                    <Input
                    type="password"
                    id="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                />
                <Button type="submit" onClick={handleSubmit}>Login</Button>
                <Link to="/signup">Create Account</Link>
            </Form>
        </div>
    )

}

export default Login;