import React, { useState , useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';

import "../css/Login.css";

function Login(props) {
    const WRONGPASSWORD = '0'
    const UNREGISTERED = '2'
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const[usernameErr, setUsernameErr] = useState(false);
    const[passwordErr, setPasswordErr] = useState(false);

    useEffect(() => {
        document.title="Login"
      }, [])

    function initialErrState(){
        setUsernameErr(false)
        setPasswordErr(false)
    }

    function handleSubmit(event) {
        event.preventDefault();
        initialErrState();

        if (authPasses()) {
            const user = {
                username: username, 
                password: password,
            }
            axios.post('/users/login',{user})
                .then(res => {
                    if(res.data == WRONGPASSWORD){
                        alert("Wrong Password");
                        props.history.push("/");
                    } 
                    else if(res.data == UNREGISTERED) {
                        alert("User is not registered");
                        props.history.push("/");
                    } else { 
                        document.cookie="cookiename=cookievalue;max-age="+(60 * 15); //15 mins
                        props.history.push("/dashboard");
                    }
                    
                    return;
                  })
                .catch( err => {
                    console.log(err);
                })
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
                <Link to="/signup" style={{color:"#22a9ba"}}>Create Account</Link>
            </Form>
        </div>
    )

}

export default Login;