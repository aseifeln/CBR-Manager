import React from 'react';
import { Container } from 'reactstrap';

import AppNavbar from '../components/AppNavbar';

function NewVisit() {
  return (
    <div>
        <AppNavbar/>
        <Container>
            This is the new visit page.
        </Container>
    </div>
  )
}

export default NewVisit;