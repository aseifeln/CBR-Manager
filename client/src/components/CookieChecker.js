import React, { useEffect }from 'react';
import { useHistory, Link } from 'react-router-dom';

function CookieChecker(props) {
    const history = useHistory();
    useEffect(logoutUser, []);

    //Reference: https://stackoverflow.com/questions/5968196/how-do-i-check-if-a-cookie-exists#:~:text=You%20can%20call%20the%20function,see%20if%20it%20is%20%3D%20null.&text=Put%20your%20cookie%20name%20in%20in%20place%20of%20MyCookie%20.
    function getCookie(name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null;
        }
        else
        {
            begin += 2;
            var end = document.cookie.indexOf(";", begin);
            if (end == -1) {
            end = dc.length;
            }
        }
        return decodeURI(dc.substring(begin + prefix.length, end));
    } 
    function logoutUser(){
        console.log("nice")
        if(getCookie("cookiename") == null){
            history.push("/");
        }
    }
    return(
        <div>
            {props.children}
        </div>
    );
}


export default CookieChecker;