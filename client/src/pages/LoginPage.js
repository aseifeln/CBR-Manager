import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';

import AppNavbar from "../components/AppNavbar";
import "../css/Login.css";

function Login(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const[usernameErr, setUsernameErr] = useState(false);
    const[passwordErr, setPasswordErr] = useState(false);

    function initialErrState(){
        setUsernameErr(false)
        setPasswordErr(false)
    }

    function handleSubmit(event) {
        event.preventDefault();
        initialErrState();

        if (authPasses()) {
            props.history.push("/");
            return;
        }
    }

    function authPasses() {
        let pass = true
        if(!username.length > 0){
            setUsernameErr(true)
            pass = false
        }
        if(!password.length > 0){
            setPasswordErr(true)
            pass = false
        }
        return pass
    }

    return (
        <div className='Login'>
            <AppNavbar />
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Username: </Label>
                    <Input
                        type="text"
                        invalid={usernameErr}
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Username"
                    />
                    <FormFeedback>Please enter your username!</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label>Password: </Label>
                        <Input
                        type="password"
                        invalid={passwordErr}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password"
                    />
                    <FormFeedback>Please enter your password!</FormFeedback>
                </FormGroup>
                <Button type="submit" onClick={handleSubmit}>Login</Button>
                <Link to="/signup">Create Account</Link>
            </Form>
        </div>
    )

}

export default Login;