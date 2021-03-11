import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';

function OutRef(){

    const [ outstandingRefs, setOutstandingRefs ] = useState([]);
 
    useEffect(() => {
        axios.get("/referrals/outstanding")
        .then((response) => {
            setOutstandingRefs(response.data);
        })
        .catch((error) => {
            console.log(error)
        })

    }, [])

    return(
        <div>
            <h4 style={{color:"#9646b7"}}>Outstanding Referrals</h4>
            <div style={{maxHeight: "35em", overflowY: "auto", maxWidth:"100%",border:"1px solid grey"}}>
            <ListGroup>
            {outstandingRefs.length>0?outstandingRefs.map((referral)=>{
                        return(
                        // TODO: Add link to referral page when that code is merged
                        <ListGroupItem>
                            <ListGroupItemHeading> {referral.Client.FirstName} {referral.Client.LastName} </ListGroupItemHeading>
                            <ListGroupItemText>
                                <p style={{margin:"0"}}>Date: {referral.Date}</p>
                                <p style={{margin:"0"}}>Services: {(referral.ServiceRequired || []).join(', ')}</p>
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

export default OutRef;