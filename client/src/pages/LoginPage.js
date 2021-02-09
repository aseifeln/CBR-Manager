import React, { useState } from "react";
import { Button } from 'reactstrap';

import AppNavbar from "../components/AppNavbar";
import "../css/Login.css";

function Login(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function btnClicked() {
        if (authPasses()) {
            props.history.push("/");
            return;
        }
        alert("Username or password is invalid size");
    }

    function authPasses() {
        console.log(username.length, password.length);
        return username.length > 0 && password.length > 0;
    }

    return (
        <div id='login'>
            <AppNavbar />
            <div className='Login'>
                <label>Username: </label>
                <input
                    type="text"
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <label>Password: </label>
                    <input
                    type="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Button block size="lg" color="primary" type="submit" onClick={btnClicked}>Login</Button>
            </div>
        </div>
    )

}

export default Login;