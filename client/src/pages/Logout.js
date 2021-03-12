import React,{useEffect} from 'react';
import axios from 'axios'

function Logout(props) {
    function logout() {
        axios.post('/users/logout')
            .then(res => {
                console.log(res);
                document.cookie="cookiename=cookievalue;max-age="+(0);
                document.cookie="Role=;max-age="+(0);
                document.cookie="WorkerId=;max-age="+(0);
                window.location.replace("/login");
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