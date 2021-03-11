import React, { useState , useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { UserContext } from '../components/UserContext';
import { Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';

import "../css/Login.css";

function Login(props) {
    const WRONGPASSWORD = '0'
    const UNREGISTERED = '2'
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const[usernameErr, setUsernameErr] = useState(false);
    const[passwordErr, setPasswordErr] = useState(false);

    const context = useContext(UserContext);

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
                        props.history.push("/login");
                    } 
                    else if(res.data == UNREGISTERED) {
                        alert("User is not registered");
                        props.history.push("/login");
<<<<<<< HEAD
                    } else { 
                        document.cookie="cookiename=cookievalue;max-age="+(60 * 60); //60 mins
=======
                    } else {
                        document.cookie="cookiename=cookievalue;max-age="+(60 * 15); // 15 mins
                        axios.get('users/session', {params: {username: user.username}})
                            .then(res => {
                                document.cookie=`Role=${res.data[0].Role};max-age=`+(60 * 15); // 15 mins
                                document.cookie=`WorkerId=${res.data[0].WorkerId};max-age=`+(60 * 15); // 15 mins
                            })
                            .catch(err => console.log(err))
>>>>>>> origin/master
                        props.history.push("/");
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