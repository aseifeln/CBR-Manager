import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, FormText, Input, Label } from 'reactstrap';

import AppNavbar from "../components/AppNavbar";
import "../css/SignUp.css";

function SignUpPage(props) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [location, setLocation] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (authPasses()) {
            props.history.push("/");
            return;
        }
        alert("Username or password is invalid size");
    }

    function authPasses() {
        return username.length > 0 && password.length > 0;
    }

    return (
        <div className='SignUp'>
            <AppNavbar />
            <Form onSubmit={handleSubmit}>
                <h2><b>Create CRB Account</b></h2>
                <FormGroup>
                    <Label>First name</Label>
                    <Input type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="First name" />
                </FormGroup>
                <FormGroup>
                    <Label>Last name</Label>
                    <Input type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="Last name" />
                </FormGroup>
                <FormGroup>
                    <Label>Username</Label>
                    <Input type="text"
                        id="userName"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Username" />
                    <FormText><i>Add username to easily log in</i></FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="profilePhoto">Profile Picture</Label>
                    <Input type="file" name="profilePhoto" id="profilePhoto" />
                </FormGroup>
                <FormGroup>
                    <Label for="location">Location</Label>
                    <Input type="select"
                        id="location"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                    <FormText><i>Assigned zone. This can be changed later</i></FormText>
                </FormGroup>
                <FormGroup>
                    <label>Password</label>
                    <Input type="text"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password" />
                    <Input type="text"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        placeholder="Confirm password" />
                </FormGroup>
                <Button
                    type="submit" id="submitBtn" onClick={handleSubmit}>Create Account</Button>
                <Link to="/login">Login instead</Link>
            </Form>
        </div>
    )

}

export default SignUpPage;