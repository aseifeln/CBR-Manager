import React, { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Button, Form, FormGroup, FormFeedback, FormText, Input, Label } from 'reactstrap';


import "../css/SignUp.css";



function SignUpPage(props) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [location, setLocation] = useState("");
    const [photo, setPhoto] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [firstNameErr, setFirstNameErr] = useState(false);
    const [lastNameErr, setLastNameErr] = useState(false);
    const [usernameErr, setUsernameErr] = useState(false);
    const [photoErr, setPhotoErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [confirmPasswordErr, setConfirmPasswordErr] = useState(false);

    useEffect(() => {
        document.title="Create CBR Account"
      }, [])
    
    function initialErrState(){
        setFirstNameErr(false)
        setLastNameErr(false)
        setUsernameErr(false)
        setPhotoErr(false)
        setPasswordErr(false)
        setConfirmPasswordErr(false)
    }

    async function handleSubmit(event) {
        event.preventDefault();
        initialErrState();

        if (authPasses()) {
            const user = {
                firstname: firstName,
                lastname: lastName,
                username: username,
                location: document.getElementById('location').value,
                photo: document.getElementById('profilePhoto').value,
                password: password,
                confirm_password: confirmPassword
            }
            axios.post('/users/register', {user})
            .then(async res => {
                const REGISTERED = '3'
                if(res.data == REGISTERED){
                    alert("Username is already taken");
                    await props.history.push("/signup");
                    return;
                }
            })
            .catch( err => {
                console.log(err);
            })
            await props.history.push("/signup");
            login(user);
            return;
        }
        props.history.push("/signup");
    }

    async function login(user){
        axios.post('/users/login',{user})
            .then(res => {
                document.cookie="cookiename=cookievalue;max-age="+(60 * 15); //15 mins
                props.history.push("/");
                console.log(res.data)
            })
            .catch( err => {
                console.log(err);
            })
        alert("User is successfully registered");
    }

    function authPasses() { 
        var PASS = true
        if(!firstName.length > 0){
            setFirstNameErr(true)
            PASS = false
        }
        if(!lastName.length > 0){
            setLastNameErr(true)
            PASS = false
        }
        if(!username.length > 0){
            setUsernameErr(true)
            PASS = false
        }
        if(password.length <= 5){
            setPasswordErr(true)
            PASS = false
        }
        if(confirmPassword !== password){
            setConfirmPasswordErr(true)
            PASS = false
        }
        return PASS
    }

    return (
        
        <div className='SignUp'>
            <Form onSubmit={handleSubmit}>
                <h2><b>Create CBR Account</b></h2>
                <FormGroup>
                    <Label for="firstName">First name</Label>
                    <Input invalid={firstNameErr} type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="First name"/>
                    <FormFeedback>Please enter your first name!</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last name</Label>
                    <Input invalid={lastNameErr} type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="Last name"/>
                    <FormFeedback>Please enter your last name!</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="userName">Username</Label>
                    <Input invalid={usernameErr} type="text"
                        id="userName"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Username" />
                    <FormFeedback>Please enter a username!</FormFeedback>
                    <FormText><i>Add username to easily log in</i></FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="profilePhoto">Profile Picture</Label>
                    <Input invalid={photoErr} 
                        type="file" 
                        name="profilePhoto" 
                        id="profilePhoto"
                        onChange={(event) => setPhoto(event.target.files[0])}
                         />
                    <FormText><i>Optional</i></FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="location">Location</Label>
                    <Input type="select"
                        id="location"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}>
                        <option>BidiBidi Zone 1</option>
                        <option>BidiBidi Zone 2</option>
                        <option>BidiBidi Zone 3</option>
                        <option>BidiBidi Zone 4</option>
                        <option>BidiBidi Zone 5</option>
                        <option>Palorinya Basecamp</option>
                        <option>Palorinya Zone 1</option>
                        <option>Palorinya Zone 2</option>
                        <option>Palorinya Zone 3</option>
                    </Input>
                    <FormText><i>Choose your assigned zone.</i></FormText>
                </FormGroup>
                <FormGroup>
                    <Label  for="password">Password</Label>
                    <Input invalid={passwordErr} type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password" />
                    <FormFeedback>Password must be more than 5 characters</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label  for="confirmPassword">Confirm Password</Label>
                    <Input invalid={confirmPasswordErr} type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        placeholder="Confirm password" />
                    <FormFeedback>Passwords don't match</FormFeedback>
                </FormGroup>
                <Button
                    type="submit" id="submitBtn" onClick={handleSubmit}>Create Account</Button>
                <Link to="/login" style={{color:"#22a9ba"}}>Login instead</Link>
            </Form>
        </div>
    )

}

export default SignUpPage;
