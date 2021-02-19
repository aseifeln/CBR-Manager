import React, {useEffect,useState} from 'react';
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';
import { Link } from 'react-router-dom';
import "../css/Login.css";
import axios from 'axios';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function PriorityClients(){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const [location, setLocation] = useState("BidiBidi Zone 1");
    const [data, setData]= useState([]);
    var pClientList=[{
        name:"John Doe",
        location:"Bididi",
        risk:3
    },
    {
        name:"Michael Jackson",
        location:"Bididi",
        risk:2
    }
]


    useEffect(()=>{
        axios.get(`/clients/location/${location}`)
        .then(res =>{
            setData(res.data);
            console.log(data);
        })
      },[location]);

    


    return(
        <div>
            <h5>Priority Clients   <Link to="/client/new">Link to new client</Link></h5>
            <div>Current Location: {location}</div> 
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>Location</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={()=>setLocation("BidiBidi Zone 1")}> BidiBidi Zone 1</DropdownItem>
                    <DropdownItem onClick={()=>setLocation("BidiBidi Zone 2")}> BidiBidi Zone 2</DropdownItem>
                    <DropdownItem onClick={()=>setLocation("BidiBidi Zone 3")}> BidiBidi Zone 3</DropdownItem>
                    <DropdownItem onClick={()=>setLocation("BidiBidi Zone 4")}> BidiBidi Zone 4</DropdownItem>
                    <DropdownItem onClick={()=>setLocation("BidiBidi Zone 5")}> BidiBidi Zone 5</DropdownItem>
                    <DropdownItem onClick={()=>setLocation("Palorinya Basecamp")}> Palorinya Basecamp</DropdownItem>
                    <DropdownItem onClick={()=>setLocation("Palorinya Zone 1")}> Palorinya Zone 1</DropdownItem>
                    <DropdownItem onClick={()=>setLocation("Palorinya Zone 2")}> Palorinya Zone 2</DropdownItem>
                    <DropdownItem onClick={()=>setLocation("Palorinya Zone 3")}> Palorinya Zone 3</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <ListGroup>
                {pClientList.map((client)=>
                    <ListGroupItem key={client.name} >
                        <ListGroupItemHeading> {client.name} </ListGroupItemHeading>
                        <ListGroupItemHeading> ID: {client.id}</ListGroupItemHeading>
                        <ListGroupItemText>
                            <p>Location: {client.location}</p>
                            <p>Risk: {client.risk}</p>
                        </ListGroupItemText>
                    </ListGroupItem>
                    )
                }
            </ListGroup>
        </div>
    );
}

export default PriorityClients;