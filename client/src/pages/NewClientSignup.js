import React from 'react';
import { Link } from 'react-router-dom';

function NewClientSignup() {
  return (
    <div id="new-client">
      <p>New Client Page</p>
      <Link to="/">Link to dashboard</Link>
    </div>
  )
}

export default NewClientSignup;