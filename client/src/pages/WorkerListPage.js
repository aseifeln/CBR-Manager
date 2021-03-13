import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Button, Table, Form, FormGroup, Input, Label} from 'reactstrap';
import ReactPaginate from 'react-paginate';
import AdminSideBar from '../components/AdminSideBar';
import '../css/WorkerList.css';

function WorkerListPage() {
    const [offset, setOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [currentPageWorkers, setCurrentPageWorkers] = useState([]);


    const [searchName, setSearchName] = useState('')
    const [searchLocation, setSearchLocation] = useState('');

    const workersPerPage = 15;

    useEffect(() => {
        document.title = 'Workers List'
    },[])

    function handlePageClick(event) {
        setOffset(event.selected * workersPerPage);
    }

    function setWorkerPages(relevantWorkers) {
        setPageCount(Math.ceil(relevantWorkers.length / workersPerPage));
        let currentPage = relevantWorkers.slice(offset, offset + workersPerPage);
        setCurrentPageWorkers(currentPage);
    }

    function filterList(event){
        event.preventDefault();
    }

    function resetFilters() {
        setSearchName('');
        setSearchLocation('');
    }

    return(
        <>
        <AdminSideBar/>
        <Container className="main-content">
            <h1>Worker List</h1>
            <br/>
            <Form>
                <Row form>
                    <Col md={6}>
                        <FormGroup className="searchName">
                            <Input type="text" id="searchName"
                                    value={searchName}
                                    onChange={(e) => setSearchName(
                                        e.target.value)}
                                    placeholder="Search by name" />
                            <button onClick={(e) =>
                            {setSearchName('');
                            e.preventDefault();
                            }} >X</button>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Location</Label>
                            <Input type="select"
                                    value={searchLocation}
                                    onChange={(e) => setSearchLocation(e.target.value)}>
                                <option value="Choose Location">Choose Location</option>
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
                    </Col>
                </Row>
                
                <FormGroup>
                    <Row>
                        <Col xs="auto">
                            <Button color="success" onClick={filterList}>Search</Button>
                        </Col>
                        <Col xs="auto">
                            <Button onClick={resetFilters}>Reset</Button>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>

            <Table responsive className="workers-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Location</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>First Name 1</td>
                        <td>Last Name 1</td>
                        <td>BidiBidi Zone 1</td>
                        <td><Button color="success">View</Button></td>
                    </tr>
                    <tr>
                        <td>First Name 2</td>
                        <td>Last Name 2</td>
                        <td>BidiBidi Zone 1</td>
                        <td><Button color="success">View</Button></td>
                    </tr>  
                    <tr>
                        <td>First Name 3</td>
                        <td>Last Name 3</td>
                        <td>BidiBidi Zone 1</td>
                        <td><Button color="success">View</Button></td>
                    </tr>  
                </tbody>
            </Table>
            
            <ReactPaginate previousLabel={'Previous'}
                           nextLabel={'Next'}
                           breakLabel={'...'}
                           pageCount={pageCount}
                           pageRangeDisplayed={5}
                           marginPagesDisplayed={2}
                           onPageChange={handlePageClick}
                           forcePage={offset / workersPerPage}
                           containerClassName={'pagination'}
                           subContainerClassName={'pages pagination'}
                           activeClassName={'pagination_active'}/>
        </Container>
        </>
    )
}

export default WorkerListPage;