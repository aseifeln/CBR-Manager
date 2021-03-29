import React, {useContext, useEffect,useState} from 'react';
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import {Table} from 'reactstrap';
import axios from 'axios';

function SocialSurvey(props){

    const [ SocialSurvey, setSocialSurvey ] = useState({});
    const [ SocialSurveyFound, setSocialSurveyFound ] = useState(false);

    const [ client, setClient ] = useState({});

    useEffect(() => {
        axios.get('baselineSurvey/' + props.id + '/socialSurvey')
        .then(response => {
            setSocialSurvey(response.data[0]);
            setSocialSurveyFound(true);
        })
        .catch(error => {
            createSurvey();
            //console.log(error);
            //document.title = "Baseline survey not found";
        })
    },[])

    function createSurvey() {
        setSocialSurvey(
          {
              "ValuedCommunityMember" : null,
              "Independence" : true,
              "CommunityParticipation" : false,
              "DisabilityImpact" : false,
              "Discrimination" : true,
            }
        )
    }

    function InsertYesOrNoImg(props) {

        if (props.bool == undefined) {
            return (<td>--</td>);
        }

        if (props.bool) {
            //image: https://www.flaticon.com/free-icon/check-mark_1722017
            return (<td> <img src="/checkmark.png" style={{width:22}}/> </td>)
        }

        return (<td> <img src="/redX.png" style={{width:22}}/> </td>);
    }

    return(
        <div>
            <Row>
                <Col><h4>Baseline Survey</h4></Col>
            </Row>
            <Table size="sm">
              <thead>
                <tr>
                  <th>Inquiry</th>
                  <th>Response</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Feel valued as a community member</td>
                    <InsertYesOrNoImg bool={SocialSurvey?.ValuedCommunityMember}/>
                </tr>
                <tr>
                  <td>Feel independent</td>
                    <InsertYesOrNoImg bool={SocialSurvey?.Independence}/>
                </tr>
                <tr>
                  <td>Able to participate in community/social events</td>
                    <InsertYesOrNoImg bool={SocialSurvey?.CommunityParticipation}/>
                </tr>
                <tr>
                  <td>Does disability affect ability to interact socially?</td>
                  <InsertYesOrNoImg bool={SocialSurvey?.DisabilityImpact}/>
                </tr>
                <tr>
                  <td>Experienced discrimination because of your disability</td>
                  <InsertYesOrNoImg bool={SocialSurvey?.Discrimination}/>
                </tr>
              </tbody>
            </Table>
        </div>
    );
}

export default SocialSurvey;