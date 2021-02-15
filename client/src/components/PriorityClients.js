import React from 'react';
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';
import { Link } from 'react-router-dom';
import "../css/Login.css";

function PriorityClients(props){
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


    return(
        <div>
            <h5>Priority Clients   <Link to="/client/new">Link to new client</Link></h5>
            <ListGroup>
                {pClientList.map((client)=>
                    <ListGroupItem key={client.name} >
                        <ListGroupItemHeading> {client.name} </ListGroupItemHeading>
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