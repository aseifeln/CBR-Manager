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
              "FoodStatus" : "Adequate",
              "MonthlyFoodAccess" : true,
              "ChildNutritionStatus" : "N/A",
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
                  <td>Food security level</td>
                  <td>{NutritionSurvey?.FoodStatus ? NutritionSurvey.FoodStatus : "--"}</td>
                </tr>
                <tr>
                  <td>Enough food every month</td>
                  <InsertYesOrNoImg bool={NutritionSurvey?.MonthlyFoodAccess}/>
                </tr>
                <tr>
                  <td>If child, nutrition status</td>
                  <td>{NutritionSurvey?.ChildNutritionStatus ? NutritionSurvey.ChildNutritionStatus : "--"}</td>

                </tr>
              </tbody>
            </Table>
        </div>
    );
    // if malnourished, link referral here as a suggestion - or list referral
}

export default NutritionSurvey;