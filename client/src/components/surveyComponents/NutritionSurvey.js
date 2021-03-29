import React, {useContext, useEffect,useState} from 'react';
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import {Table} from 'reactstrap';
import axios from 'axios';

function NutritionSurvey(props){

    const [ NutritionSurvey, setNutritionSurvey ] = useState({});
    const [ NutritionSurveyFound, setNutritionSurveyFound ] = useState(false);

    useEffect(() => {

        axios.get('baselineSurvey/' + props.id + '/NutritionSurvey')
        .then(response => {
            setNutritionSurvey(response.data[0]);
            setNutritionSurveyFound(true);
        })
        .catch(error => {
            createSurvey();
            //console.log(error);
            //document.title = "Baseline survey not found";
        })
    },[])

    function createSurvey() {
        setNutritionSurvey(
          {
              "FoodStatus" : "",
              "MonthlyFoodAccess" : "",
              "ChildNutritionStatus" : "",
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
                  <td>Food security level</td>
                  <td>{NutritionSurvey?.FoodStatus ? NutritionSurvey.FoodStatus : ""}</td>
                </tr>
                <tr>
                  <td>Enough food every month</td>
                  <td>{NutritionSurvey?.MonthlyFoodAccess ? NutritionSurvey.MonthlyFoodAccess : ""}</td>
                </tr>
                <tr>
                  <td>If child, nutrition status</td>
                  <td>{NutritionSurvey?.ChildNutritionStatus ? NutritionSurvey.ChildNutritionStatus : ""}</td>

                </tr>
              </tbody>
            </Table>
        </div>
    );
    // if malnourished, link referral here as a suggestion - or list referral
}

export default NutritionSurvey;