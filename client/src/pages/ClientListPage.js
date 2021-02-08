import React, { useState, useEffect } from 'react';
import { Form,
        FormGroup,
        Label,
        Input,
        Container,
        Pagination,
        PaginationItem,
        PaginationLink,
        ListGroup,
        ListGroupItem,
        Button } from 'reactstrap';

import AppNavbar from '../components/AppNavbar';

function ClientListPage() {
    const junkData = [{
        "name": "Test3",
        "id": 1,
        "location": 373,
        "priority": 1
    },
        {
            "name": "Tes1",
            "id": 2,
            "location": 371,
            "priority": 1
        },
        {
            "name": "Test2",
            "id": 3,
            "location": 374,
            "priority": 1
        }
    ]
   const [ clients, getClients ] = useState(junkData);
   const [ searchFilter, setSearchFilter ] = useState('');
   const [ searchField, setSearchField ] = useState('');
   const [ radioFilter, setRadioFilter ] = useState('');


    useEffect(() => {
        // TODO get all clients from the database everytime the component is updated.
    });

    function filterList() {
        // TODO implement
    }

    return (
        <>
        <AppNavbar />
        <Container>
            <div>
                <h1>Client List</h1>
                <Button href="/client/new">Create New Client</Button>
            </div>
            <Form onSubmit={filterList()}>
                <FormGroup>
                    <Input type="text" id="searchField" placeholder="Search for Client" />
                </FormGroup>
                <FormGroup>
                    <Label for="searchFilter">Search by</Label>
                    <Input type="select" id="searchFilter"
                           value={searchFilter} onChange={() =>
                           setSearchFilter('test')}>
                        <option>Name</option>
                        <option>Age</option>
                        <option>Gender</option>
                        <option>Zone</option>
                        <option>Village Number</option>
                        <option>Type of Disability</option>
                    </Input>
                </FormGroup>
                <FormGroup tag="radioFilter">
                    <legend>Sort</legend>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />
                            By Priority
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />
                            Recently Added
                        </Label>
                    </FormGroup>
                </FormGroup>

            </Form>
            <ListGroup>
                {clients.map(({id, name, location}) => (
                        <ListGroupItem>
                            {name}, {id}, {location}
                        </ListGroupItem>
                ))}
            </ListGroup>
            {/*TODO set this up for overflowing clients*/}
            <Pagination aria-label="Client List Pages">
                <PaginationItem>
                    <PaginationLink previous href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">
                        1
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">
                        3
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">
                        4
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">
                        5
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink next href="#" />
                </PaginationItem>
            </Pagination>

        </Container>
        </>
    )
}

export default ClientListPage;