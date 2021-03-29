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
              "ValuedCommunityMember" : "Y",
              "Independence" : "Y",
              "CommunityParticipation" : "Y",
              "DisabilityImpact" : "N",
              "Discrimination" : "Y",
            }
        )
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
                  <td>{SocialSurvey?.ValuedCommunityMember ? SocialSurvey.ValuedCommunityMember : ""}</td>
                </tr>
                <tr>
                  <td>Feel independent</td>
                  <td>{SocialSurvey?.Independence ? SocialSurvey.Independence : ""}</td>
                </tr>
                <tr>
                  <td>Able to participate in community/social events</td>
                  <td>{SocialSurvey?.CommunityParticipation ? SocialSurvey.CommunityParticipation : ""}</td>
                </tr>
                <tr>
                  <td>Does disability affect ability to interact socially?</td>
                  <td>{SocialSurvey?.DisabilityImpact ? SocialSurvey.DisabilityImpact : ""}</td>
                </tr>
                <tr>
                  <td>Experienced discrimination because of your disability</td>
                  <td>{SocialSurvey?.Discrimination ? SocialSurvey.Discrimination : ""}</td>
                </tr>
              </tbody>
            </Table>
        </div>
    );
}

export default SocialSurvey;