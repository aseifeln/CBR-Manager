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
            "name": "Test1",
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
   const [ searchFilter, setSearchFilter ] = useState('name');
   const [ searchField, setSearchField ] = useState('');
   const [ radioFilter, setRadioFilter ] = useState('');


    useEffect(() => {
        // TODO get all clients from the database everytime the component is updated.
    });

    function filterList(event) {
        console.log(searchFilter, searchField, radioFilter);
        event.preventDefault();
        // TODO implement sorting
    }

    return (
        <>
        <AppNavbar />
        <Container>
            <div>
                <h1>Client List</h1>
                <Button href="/client/new">Create New Client</Button>
            </div>
            <Form onSubmit={filterList}>
                <FormGroup>
                    <Input type="text" id="searchField"
                           value={searchField}
                           onChange={(event) => setSearchField(
                               event.target.value)}
                           placeholder="Search for Client" />
                </FormGroup>
                <FormGroup>
                    <Label for="searchFilter">Search by</Label>
                    <Input type="select" id="searchFilter"
                           value={searchFilter}
                           onChange={(event) =>
                                setSearchFilter(event.target.value)}>
                        <option value="name">Name</option>
                        <option value="age">Age</option>
                        <option value="gender">Gender</option>
                        <option value="zone">Zone</option>
                        <option value="village_number">Village Number</option>
                        <option value="type_of_disability">Type of Disability</option>
                    </Input>
                </FormGroup>
                <FormGroup tag="radioFilter"
                           value={radioFilter}
                           onChange={(event) => setRadioFilter(event.target.value)} >
                    <legend>Sort</legend>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" value="by_priority"/>
                            By Priority
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" value="recently_added"/>
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
                    <PaginationLink href="#1">
                        1
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#2">
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#3">
                        3
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#4">
                        4
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#5">
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