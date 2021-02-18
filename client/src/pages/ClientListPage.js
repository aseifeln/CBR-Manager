import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
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

   const [ refresh, setRefresh ] = useState(0);
   const [ clients, setClients ] = useState(['']);
   const [ filteredClients, setFilteredClients ] = useState(['']);
   const [ radioFilter, setRadioFilter ] = useState('');
   const [ searchName, setSearchName ] = useState('');
   const [ searchAge, setSearchAge ] = useState(0);
   const [ searchGender, setSearchGender ] = useState('');
   const [ searchLocation, setSearchLocation ] = useState('BidiBidi Zone 1');
   const [ searchVillageNo, setSearchVillageNo ] = useState(0);
   const [ searchDisability, setSearchDisability ] = useState('Amputee');

   const [isOpenAge, setIsOpenAge] = useState(false);
   const [isOpenGender, setIsOpenGender] = useState(false);
   const [isOpenLocation, setIsOpenLocation] = useState(false);
   const [isOpenVillageNo, setIsOpenVillageNo] = useState(false);
   const [isOpenDisability, setIsOpenDisability] = useState(false);

   const history = useHistory();


    useEffect(() => {
        axios.get('/clients')
            .then(function (res) {
            setClients(res.data);
            console.log(filteredClients.length)
            if (filteredClients.length === 0) {
                setFilteredClients(res.data);
            }
            })
            .catch(function (err) {
                console.log(err);
            });
    }, [refresh]);

    // TODO refactor
    function searchFor(client) {
        let lowerSearchName = searchName.toLowerCase();
        let lowerClientName = client.FirstName.toLowerCase();
        let x = 0;
        let y = 0;

        if (isOpenAge) {
            if (client.Age === searchAge) {
                y++;
            }
            x++;
        }
        if (isOpenGender) {
            if (client.Gender === searchGender) {
                y++;
            }
            x++;
        }
        if (isOpenLocation) {
            if (client.Location === searchLocation) {
                y++;
            }
            x++;
        }
        if (isOpenVillageNo) {
            if (client.VillageNo === searchVillageNo) {
                y++;
            }
            x++;
        }
        if (isOpenDisability) {
            if (client.DisabilityType === searchDisability) {
                y++;
            }
            x++;
        }
        if (lowerClientName === lowerSearchName || lowerSearchName === '') {
            x++;
            y++;
        } else {
            return false;
        }

        return x === y;
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

    function filterList(event) {
        event.preventDefault();

        let sorted_clients;
        let searched_clients;
        sorted_clients = clients.sort(sortBy(radioFilter));
        searched_clients = sorted_clients.filter(searchFor);
        setFilteredClients(searched_clients);
        setSearchName('');
    }

    function resetFilters() {
        setIsOpenAge(false);
        setIsOpenGender(false);
        setIsOpenLocation(false);
        setIsOpenVillageNo(false);
        setIsOpenDisability(false);
        setSearchName('');

        setFilteredClients(clients);
        setRefresh(refresh + 1);
    }

    function setFilters(event) {

        switch(event.target.value) {
            case 'Age':
                setIsOpenAge(!isOpenAge);
                break;
            case 'VillageNo':
                setIsOpenVillageNo(!isOpenVillageNo)
                break;
            case 'Gender':
                setIsOpenGender(!isOpenGender);
                break
            case 'Location':
                setIsOpenLocation(!isOpenLocation);
                break
            case 'DisabilityType':
                setIsOpenDisability(!isOpenDisability);
                break;
            default:
        }
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
                <Container>
                    <FormGroup onChange={setFilters}>
                        <Row>
                            <Col xs="auto">
                                <Input checked={isOpenAge} type="checkbox" value="Age"/>
                                Age
                            </Col>
                            <Col xs="auto">
                                <Input checked={isOpenGender} type="checkbox" value="Gender"/>
                                Gender
                            </Col>
                            <Col xs="auto">
                                <Input checked={isOpenLocation} type="checkbox" value="Location"/>
                                Zone
                            </Col>
                            <Col xs="auto">
                                <Input checked={isOpenVillageNo} type="checkbox" value="VillageNo"/>
                                Village Number
                            </Col>
                            <Col xs="auto">
                                <Input checked={isOpenDisability} type="checkbox" value="DisabilityType"/>
                                Type of Disability
                            </Col>
                        </Row>
                    </FormGroup>
                </Container>
                    <FormGroup>
                        <Input type="text" id="searchName"
                               value={searchName}
                               onChange={(event) => setSearchName(
                                   event.target.value)}
                               placeholder="Name" />
                    </FormGroup>
                <Collapse isOpen={isOpenAge}>
                    <FormGroup>
                        <Input type="number"
                               value={searchAge}
                               onChange={(event) => setSearchAge(
                                   Number(event.target.value))}
                               placeholder="Age" />
                    </FormGroup>
                </Collapse>
                <Collapse isOpen={isOpenGender}>
                    <FormGroup onChange={(event) => setSearchGender(event.target.value)}>
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
                           value={searchLocation}
                           onChange={(event) => setSearchLocation(event.target.value)}>
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
                               value={searchVillageNo}
                               onChange={(event) => setSearchVillageNo(
                                   Number(event.target.value))}
                               placeholder="Village Number" />
                    </FormGroup>
                </Collapse>
                <Collapse isOpen={isOpenDisability}>
                    <Input type="select"
                           value={searchDisability}
                           onChange={(event) => setSearchDisability(event.target.value)}>
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
                {filteredClients.map(({FirstName, Age, Gender,
                                  Location, VillageNo,
                                  DisabilityType, ClientId}) => (
                        <ListGroupItem onClick={() => history.push(`/client/${ClientId}`)}>
                            {FirstName}, {Age}, {Gender}, {Location}, {VillageNo}, {DisabilityType}
                            <Button style={{'float': 'right'}}>View</Button>
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