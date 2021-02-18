import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form,
        FormGroup,
        Label,
        Input,
        Row,
        Col,
        Container,
        Pagination,
        PaginationItem,
        PaginationLink,
        ListGroup,
        ListGroupItem,
        Button,
        Collapse } from 'reactstrap';

import AppNavbar from '../components/AppNavbar';

function ClientListPage() {
    const junkData = [{
        "FirstName": "Test1",
        "LastName": "TestLast",
        "ClientId": 3,
        "Gender": "Male",
        "Location": "BidiBidi Zone 3",
        "Age": 11,
        "DateCreated": 1,
        "ContactNo": 6,
        "DisabilityType": "Amputee",
        "VillageNo": 2,
        "priority": 3
    },
        {
            "FirstName": "Test2",
            "LastName": "TestLast",
            "ClientId": 2,
            "Gender": "Male",
            "Location": "BidiBidi Zone 1",
            "Age": 13,
            "DateCreated": 2,
            "ContactNo": 6,
            "DisabilityType": "Amputee",
            "VillageNo": 3,
            "priority": 2
        },
        {
            "FirstName": "Test3",
            "LastName": "TestLast",
            "ClientId": 3,
            "Gender": "Female",
            "Location": "BidiBidi Zone 2",
            "Age": 10,
            "DateCreated": 3,
            "ContactNo": 6,
            "DisabilityType": "Cerebral Palsy",
            "VillageNo": 1,
            "priority": 1
        }
    ]
   const [ clients, setClients ] = useState(junkData);
   const [ searchFilter, setSearchFilter ] = useState('FirstName');
   const [ searchField, setSearchField ] = useState('');
   const [ radioFilter, setRadioFilter ] = useState('');
   const [ forceRenderValue, setForceRenderValue ] = useState(0);

   const history = useHistory();


    useEffect(() => {
        // TODO get all clients from the database everytime the component is updated.
    });

    function searchFor(property, search) {
        return function(a, b) {
            let propertyA = a[ property ];
            let propertyB = b[ property ];

            if (typeof(a[ property ]) === 'number') {
                search = Number(search);
            } else {
              search = search.toLowerCase();
              propertyA = propertyA.toLowerCase();
              propertyB = propertyB.toLowerCase();
            }

            if(propertyA !== search) {
                return 1;
            } else if (propertyB === search) {
                return -1;
            } else {
                return 0;
            }
        }
    }

    function sortBy(property) {
        return function(a, b) {
            if (a[ property ] > b[ property ]) {
                return 1;
            } else if (a[ property ] < b[ property ]) {
                return -1;
            } else {
                return 0;
            }
        }
    }

    function forceRender() {
        setForceRenderValue(forceRenderValue + 1);
    }

    function filterList(event) {
        event.preventDefault();

        let sorted_clients;
        sorted_clients = clients.sort(sortBy(radioFilter));
        sorted_clients = sorted_clients.sort(searchFor(searchFilter, searchField));
        setClients(sorted_clients);
        setSearchField('');

        // Needed because react does not rerender automatically when the order of a state array is changed
        forceRender();
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
                <Label>Choose Filters</Label>
                    <FormGroup onChange={setFilters}>
                        <Row>
                            <Col xs="auto">
                                <Input type="checkbox" value="Age"/>
                                Age
                            </Col>
                            <Col xs="auto">
                                <Input type="checkbox" value="Gender"/>
                                Gender
                            </Col>
                            <Col xs="auto">
                                <Input type="checkbox" value="Location"/>
                                Zone
                            </Col>
                            <Col xs="auto">
                                <Input type="checkbox" value="VillageNo"/>
                                Village Number
                            </Col>
                            <Col xs="auto">
                                <Input type="checkbox" value="DisabilityType"/>
                                Type of Disability
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" id="searchField"
                               value={searchField}
                               onChange={(event) => setSearchField(
                                   event.target.value)}
                               placeholder="Name" />
                    </FormGroup>
                <Collapse isOpen={isOpenAge}>
                    <FormGroup>
                        <Input type="number"
                               value={searchField}
                               onChange={(event) => setSearchField(
                                   event.target.value)}
                               placeholder="Age" />
                    </FormGroup>
                </Collapse>
                <Collapse isOpen={isOpenGender}>
                    <FormGroup onChange={(event) => setSearchField(event.target.value)}>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1" value="Male"/>
                                Male
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1" value="Female"/>
                                Female
                            </Label>
                        </FormGroup>
                    </FormGroup>
                </Collapse>
                <Collapse isOpen={isOpenLocation}>
                    <Input type="select"
                           value={searchField}
                           onChange={(event) => setSearchField(event.target.value)}>
                        <option value="BidiBidi Zone 1">BidiBidi Zone 1</option>
                        <option value="BidiBidi Zone 2">BidiBidi Zone 2</option>
                        <option value="BidiBidi Zone 3">BidiBidi Zone 3</option>
                        <option value="BidiBidi Zone 4">BidiBidi Zone 4</option>
                        <option value="BidiBidi Zone 5">BidiBidi Zone 5</option>
                        <option value="Palorinya Basecamp">Palorinya Basecamp</option>
                        <option value="Palorinya Zone 1">Palorinya Zone 1</option>
                        <option value="Palorinya Zone 2">Palorinya Zone 2</option>
                        <option value="Palorinya Zone 3">Palorinya Zone 3</option>
                    </Input>
                </Collapse>
                <Collapse isOpen={isOpenVillageNo}>
                    <FormGroup>
                        <Input type="number"
                               onChange={(event) => setSearchField(
                                   event.target.value)}
                               placeholder="Village Number" />
                    </FormGroup>
                </Collapse>
                <Collapse isOpen={isOpenDisability}>
                    <Input type="select"
                           value={searchField}
                           onChange={(event) => setSearchField(event.target.value)}>
                        <option value="Amputee">Amputee</option>
                        <option value="Polio">Polio</option>
                        <option value="Spinal Cord Injury">Spinal Cord Injury</option>
                        <option value="Cerebral Palsy">Cerebral Palsy</option>
                        <option value="Spina Bifida">Spina Bifida</option>
                        <option value="Hydrocephalus">Hydrocephalus</option>
                        <option value="Visual Impairment">Visual Impairment</option>
                        <option value="Hearing Impairment">Hearing Impairment</option>
                        <option value="Don\'t Know">Don\'t Know</option>
                        <option value="Other">Other</option>
                    </Input>
                </Collapse>
                <FormGroup tag="radioFilter"
                           value={radioFilter}
                           onChange={(event) => setRadioFilter(event.target.value)} >
                    <legend>Sort</legend>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" value="priority"/>
                            By Priority
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" value="DateCreated"/>
                            Recently Added
                        </Label>
                    </FormGroup>
                </FormGroup>

                <Button onClick={filterList}>Apply Filters</Button>

            </Form>
            <ListGroup>
                {clients.map(({FirstName, Age, Gender,
                                  Location, VillageNo,
                                  DisabilityType, ClientId}) => (
                        <ListGroupItem onClick={() => history.push(`/client/${ClientId}`)}>
                            {FirstName}, {Age}, {Gender}, {Location}, {VillageNo}, {DisabilityType}
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