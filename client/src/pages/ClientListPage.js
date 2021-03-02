import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from "axios";
import ReactPaginate from 'react-paginate';

import { Form,
        FormGroup,
        Label,
        Input,
        Row,
        Col,
        Container,
        Button,
        Table,
        Collapse } from 'reactstrap';

import "../css/ClientList.css";

const buttonColor={color:"white",backgroundColor:"#46ad2f"}

function ClientListPage() {

   const [ refresh, setRefresh ] = useState(0);
   const [ offset, setOffset ] = useState(0);
   const [ pageCount, setPageCount ] = useState(0);
   const [ clients, setClients ] = useState([]);
   const [ currentPageClients, setCurrentPageClients ] = useState([]);
   const [ filteredClients, setFilteredClients ] = useState(['']);

   const [ radioFilter, setRadioFilter ] = useState('');
   const [ searchName, setSearchName ] = useState('');
   const [ searchAge, setSearchAge ] = useState(0);
   const [ searchGender, setSearchGender ] = useState('');
   const [ searchLocation, setSearchLocation ] = useState('BidiBidi Zone 1');
   const [ searchVillageNo, setSearchVillageNo ] = useState('');
   const [ searchDisability, setSearchDisability ] = useState('Amputee');

   const [isOpenAge, setIsOpenAge] = useState(false);
   const [isOpenGender, setIsOpenGender] = useState(false);
   const [isOpenLocation, setIsOpenLocation] = useState(false);
   const [isOpenVillageNo, setIsOpenVillageNo] = useState(false);
   const [isOpenDisability, setIsOpenDisability] = useState(false);

   const history = useHistory();
   const clientsPerPage = 30;

    useEffect(() => {
        axios.get('/clients')
            .then(function (res) {
            setClients(res.data);
            if (filteredClients[0] === '') {
                setFilteredClients(res.data);
                setClientPages(res.data);
            }
            })
            .catch(function (err) {
                console.log(err);
            });
    }, [refresh]);


    useEffect(() => {
        setClientPages(filteredClients);
    }, [offset]);

    useEffect(() => {
        document.title="Client List"
      }, [])

    function setClientPages(relevantClients) {
        setPageCount(Math.ceil(relevantClients.length / clientsPerPage));
        let currentPage = relevantClients.slice(offset, offset + clientsPerPage);
        setCurrentPageClients(currentPage);
    }

    function searchFor(client) {
        let lowerSearchName = searchName.toLowerCase().split(' ');
        let lowerClientFirstName = client.FirstName.toLowerCase();
        let lowerClientLastName = client.LastName.toLowerCase();
        let numFilters = 0;
        let numFiltersMatching = 0;

        if (isOpenAge) {
            if (client.Age === searchAge) {
                numFiltersMatching++;
            }
            numFilters++;
        }
        if (isOpenGender) {
            if (client.Gender === searchGender) {
                numFiltersMatching++;
            }
            numFilters++;
        }
        if (isOpenLocation) {
            if (client.Location === searchLocation) {
                numFiltersMatching++;
            }
            numFilters++;
        }
        if (isOpenVillageNo) {
            if (client.VillageNo === searchVillageNo) {
                numFiltersMatching++;
            }
            numFilters++;
        }
        if (isOpenDisability) {
            if (client.DisabilityType === searchDisability) {
                numFiltersMatching++;
            }
            numFilters++;
        }
        lowerSearchName.forEach(name => {
            if (name === lowerClientFirstName || name === lowerClientLastName || name === '') {
                numFilters++;
                numFiltersMatching++;
            } else {
                numFiltersMatching--;
            }
        });


        return numFilters === numFiltersMatching;
    }

    function sortBy(property) {
        return function(a, b) {
            if (a[ property ] < b[ property ]) {
                return 1;
            } else if (a[ property ] > b[ property ]) {
                return -1;
            } else {
                return 0;
            }
        }
    }

    function filterList(event) {
        event.preventDefault();
        setRefresh(refresh + 1);
        setOffset(0);

        let sorted_clients;
        let searched_clients;
        sorted_clients = clients.sort(sortBy(radioFilter));
        searched_clients = sorted_clients.filter(searchFor);
        setFilteredClients(searched_clients);
        setClientPages(searched_clients);
    }

    function resetFilters() {
        setIsOpenAge(false);
        setIsOpenGender(false);
        setIsOpenLocation(false);
        setIsOpenVillageNo(false);
        setIsOpenDisability(false);
        setSearchName('');
        setSearchGender('');
        setRadioFilter('');
        setSearchAge(0);
        setSearchLocation('BidiBidi Zone 1');
        setSearchVillageNo(0);
        setSearchDisability('Amputee');


        setOffset(0);
        setFilteredClients(clients);
        setClientPages(clients);
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

    function handlePageClick(event) {
        setOffset(event.selected * clientsPerPage);
    }

    function convertFiltersToJSON() {
        // TODO add the order by after filters
        let names = searchName.split(' ');
        let filters = '{';
        for (let i = 0; i < names.length; i++) {
            names[i] = names[i].charAt(0).toUpperCase() + names[i].slice(1).toLowerCase();
            if (i > 1) {
                names.splice(i);
            }
        }

        if(isOpenAge) {
            filters = filters.concat(`"Age": ${searchAge},`);
        }
        if(isOpenGender) {
            filters = filters.concat(`"Gender": "${searchGender}",`);
        }
        if(isOpenLocation) {
            filters = filters.concat(`"Location": "${searchLocation}",`);
        }
        if(isOpenVillageNo) {
            filters = filters.concat(`"VillageNo": "${searchVillageNo}",`);
        }
        if(isOpenDisability) {
            filters = filters.concat(`"DisabilityType": "${searchDisability}",`);
        }
        if (names.length === 2) {
            filters = filters.concat(`"FirstName": "${names[0]}", "LastName": "${names[1]}"`);
        } else {
            if (!(names[0] === '')) {
                filters = filters.concat(`"FirstName": "${names[0]}"`);
            }
        }
        if (filters.endsWith(',')) {
            filters = filters.replace(',', '');
        }

        filters = filters.concat('}');

        filters = JSON.parse(filters);

        return filters;
    }

    // Download excel file
    // Modified from Reference: https://stackoverflow.com/questions/41938718/how-to-download-files-using-axios
    function downloadExcelWorkbook() {
        // Not allowed to create an empty workbook
        if (filteredClients.length === 0) {
            alert("Cannot export an empty list");
            return;
        }

        let filters = convertFiltersToJSON();

        axios.request({url: '/excel',
                             method: 'GET',
                             params: filters,
                             responseType: 'blob',
            })
            .then(function (res) {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'clients.xlsx'); // TODO create modal that gets the name for the file
                document.body.appendChild(link);
                link.click();
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    return (
        <>
        <Container className='ClientList'>
            <Container className='Title'>
                <h1 style={{color:"#9646b7f"}}>Client List</h1>
                <Link to="/client/new" style={{color:"#22a9ba"}}>+ Create new client</Link>
            </Container>
            <Form onSubmit={filterList}>
                <FormGroup className="SearchName">
                    <Input type="text" id="searchName"
                           value={searchName}
                           onChange={(event) => setSearchName(
                               event.target.value)}
                           placeholder="Search by name" />
                    <Input type="submit" hidden />
                    <button onClick={(e) =>
                    {setSearchName('');
                    e.preventDefault();
                    }} >X</button>



                </FormGroup>
                <Container className='SortSection'>
                    <FormGroup tag="radioFilter"
                               value={radioFilter}
                               onChange={(event) => setRadioFilter(event.target.value)} >
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="sortRadio" value="Priority"
                                       checked={radioFilter === 'Priority'} />
                                By Priority
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="sortRadio" value="DateCreated"
                                       checked={radioFilter === 'DateCreated'} />
                                Recently Added
                            </Label>
                        </FormGroup>
                    </FormGroup>
                </Container>
                <Container className='ChooseFilters'>
                    <Label>Filters</Label>
                    <Button style={{color:"white", backgroundColor:"red"}}
                            onClick={downloadExcelWorkbook}>Export</Button>
                    <Button onClick={filterList} style={buttonColor}>Apply Filters</Button>
                    <Button onClick={resetFilters} style={buttonColor}>Reset</Button>
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
                    <Collapse isOpen={isOpenAge}>
                        <FormGroup>
                            <Label>Age</Label>
                            <Input type="number"
                                   value={searchAge}
                                   onChange={(event) => setSearchAge(
                                       Number(event.target.value))}
                                   placeholder="Age" />
                        </FormGroup>
                    </Collapse>
                    <Collapse isOpen={isOpenGender}>
                        <FormGroup onChange={(event) => setSearchGender(event.target.value)}>
                            <Label>Gender</Label>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="genderRadio" value="Male"
                                           checked={searchGender === 'Male'}/>
                                    Male
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="genderRadio" value="Female"
                                           checked={searchGender === 'Female'}/>
                                    Female
                                </Label>
                            </FormGroup>
                        </FormGroup>
                    </Collapse>
                    <Collapse isOpen={isOpenLocation}>
                        <FormGroup>
                            <Label>Zone</Label>
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
                        </FormGroup>
                    </Collapse>
                    <Collapse isOpen={isOpenVillageNo}>
                        <FormGroup>
                            <Label>Village No</Label>
                            <Input type="text"
                                   value={searchVillageNo}
                                   onChange={(event) => setSearchVillageNo(
                                       event.target.value)}
                                   placeholder="Village Number" />
                        </FormGroup>
                    </Collapse>
                    <Collapse isOpen={isOpenDisability}>
                        <FormGroup>
                            <Label>Disability Type</Label>
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
                        </FormGroup>
                    </Collapse>
                </Container>
            </Form>
            <Table>
                <thead>
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Location</th>
                        <th>VillageNo</th>
                        <th>DisabilityType</th>
                    </tr>
                </thead>
                <tbody>
                        {currentPageClients.map(({FirstName, LastName, Age, Gender,
                                          Location, VillageNo,
                                          DisabilityType, ClientId}) => (
                            <tr>
                                        <td>{FirstName}</td>
                                        <td>{LastName}</td>
                                        <td>{Age}</td>
                                        <td>{Gender}</td>
                                        <td>{Location}</td>
                                        <td>{VillageNo}</td>
                                        <td>{DisabilityType}</td>
                                        <Button onClick={() => history.push(`/client/${ClientId}`)}
                                                style={{'float': 'right' ,color:"white",backgroundColor:"#46ad2f"}}>View</Button>
                                    </tr>
                        ))}
                </tbody>
            </Table>

            <ReactPaginate previousLabel={'Previous'}
                           nextLabel={'Next'}
                           breakLabel={'...'}
                           pageCount={pageCount}
                           pageRangeDisplayed={5}
                           marginPagesDisplayed={2}
                           onPageChange={handlePageClick}
                           forcePage={offset / clientsPerPage}
                           containerClassName={'pagination'}
                           subContainerClassName={'pages pagination'}
                           activeClassName={'pagination_active'}/>

        </Container>
        </>
    )
}

export default ClientListPage;