import React, { useState , useEffect} from "react";
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'
=======
import { Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';
>>>>>>> origin/master

import AppNavbar from "../components/AppNavbar";
import "../css/Login.css";

function Login(props) {
    const WRONGPASSWORD = '0'
    const UNREGISTERED = '2'
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
        const user = {
            username: username, //test this?
            password: password,
        }
        axios.post('/users/login',{user})
            .then(res => {
                if(!authPasses()){
                    alert("Username or password is invalid size");
                }
                else if(res.data == WRONGPASSWORD){
                    alert("Wrong Password");
                    props.history.push("/login");
                } 
                else if(res.data == UNREGISTERED) {
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
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/master
                <Button type="submit" onClick={handleSubmit}>Login</Button>
                <Link to="/signup">Create Account</Link>
            </Form>
        </div>
    )

}

export default Login;