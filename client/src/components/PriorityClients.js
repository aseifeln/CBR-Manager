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
    const [data, setData]= useState(['']);

    useEffect(()=>{
        axios.get(`/clients/location/${location}`)
        .then(res =>{setData(res.data)});
      },[location]);

    


    return(
        <div>
            <h4 style={{color:"#9646b7"}}>Priority Clients</h4>
            <Link to="/client-list" style={{color:"#22a9ba", fontSize:"1rem"}}>See All Clients</Link>
            <div>Current Location: {location}</div> 
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret style={{backgroundColor:"#46ad2f",margin:"10px"}}>Location</DropdownToggle>
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
            <div style={{maxHeight: "35em", overflowY: "auto", maxWidth:"100%",border:"1px solid grey"}}>
                <ListGroup>
                    {data.length>0?data.map((client)=>{
                        return(
                        <ListGroupItem key={client.ClientId} tag={Link} to={`/client/${client.ClientId}`} action>
                            <ListGroupItemHeading> {client.FirstName} {client.LastName} </ListGroupItemHeading>
                            <ListGroupItemText>
                                <p style={{margin:"0"}}>Gender: {client.Gender}</p>
                                <p style={{margin:"0"}}>Disability Type: {client.DisabilityType}</p>
                            </ListGroupItemText>
                            <ListGroupItemText style={
                                (client.HealthStatus==="Critical Risk")?{color:"red"}:
                                (client.HealthStatus==="High Risk")?{color:"orange"}:
                                (client.HealthStatus==="Medium Risk")?{color:"black"}:
                                {color:"green"}
                                }>
                                <span style={{color:"#9646b7"}}>Health Status: </span> {client.HealthStatus}
                            </ListGroupItemText>
                            <ListGroupItemText style={
                                (client.SocialStatus==="Critical Risk")?{color:"red"}:
                                (client.SocialStatus==="High Risk")?{color:"orange"}:
                                (client.SocialStatus==="Medium Risk")?{color:"black"}:
                                {color:"green"}
                                }>
                                <span style={{color:"#9646b7"}}>Social Status: </span> {client.SocialStatus}
                            </ListGroupItemText>
                            <ListGroupItemText style={
                                (client.EducationStatus==="Critical Risk")?{color:"red"}:
                                (client.EducationStatus==="High Risk")?{color:"orange"}:
                                (client.EducationStatus==="Medium Risk")?{color:"black"}:
                                {color:"green"}
                                }>
                                <span style={{color:"#9646b7"}}>Education Status: </span> {client.EducationStatus}
                            </ListGroupItemText>
                        </ListGroupItem>
                        )
                    })
                    :<ListGroupItem>Empty</ListGroupItem>}
                </ListGroup>
            </div>
        </div>
    );
}

export default PriorityClients;