import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Container, Row, Col, Pagination, PaginationItem, PaginationLink, ListGroup, ListGroupItem, Button } from 'reactstrap';

import AppNavbar from '../components/AppNavbar';

function ClientListPage() {
    return (
        <>
        <AppNavbar />
        <Container>
            <div>
                <h1>Client List</h1>
                <Button href="/client/new">Create New Client</Button>
            </div>
            <Form>
                <FormGroup>
                    <Input type="text" id="clientSearchField" placeholder="Search for Client" />
                </FormGroup>
                <FormGroup>
                    <Label for="clientSearchFilter">Search by</Label>
                    <Input type="select" id="clientSearchFilter">
                        <option>Name</option>
                        <option>Age</option>
                        <option>Gender</option>
                        <option>Zone</option>
                        <option>Village Number</option>
                        <option>Type of Disability</option>
                    </Input>
                </FormGroup>
                <FormGroup>
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
                <ListGroupItem>
                    List each individual Client here
                </ListGroupItem>
            </ListGroup>
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