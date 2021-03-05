import React,{useEffect} from 'react';
import axios from 'axios'

function Logout(props) {
    function logout() {
        axios.post('/users/logout')
            .then(res => {
                console.log(res);
                props.history.push("/");
            })
            .catch(err => {
                console.log(err);
            })
    }
    logout();

  return (
    <div className='Logout'>
        
    </div>
  )
}

export default Logout;