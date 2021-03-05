import React,{useEffect} from 'react';
import axios from 'axios'

function Logout() {
    function logout() {
        axios.post('/users/logout')
            .then(res => {
                console.log(res);
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