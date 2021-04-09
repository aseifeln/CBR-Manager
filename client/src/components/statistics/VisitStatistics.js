import React, { useEffect, useState } from 'react';
import { Container, Table, Label, Input } from 'reactstrap'
import { VisitBarChart } from '../graphs/VisitsGraph';
import axios from 'axios';

function VisitStatistics() {

    const [ stats, setStats ] = useState([]);
    const [ maxCount, setMaxCount ] = useState(0);
    const [ sortBy, setSortBy ] = useState('Total'); // Need this state for sorting statistics even though it isn't used

    useEffect(() => {
        axios.get('/visits')
        .then((response) => {
            generateStats(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    // Also counts max value
    function convertToArray(data) {
        let count = 0;
        let dataArr = [];
        for (var i in data) {
            data[i]['Location'] = i;
            dataArr.push(data[i]);

            if (data[i]['Total'] > count)
                count = data[i]['Total'];
        }

        setStats(dataArr);
        setMaxCount(count);
    }

    function generateStats(visitData) {
        const data = {};
        visitData.forEach((visit) => {
            if (!(visit.Client?.Location in data)) {
                data[visit.Client?.Location] = {Total: 0, HealthFormId: 0, EducationFormId: 0, SocialFormId: 0};
            }

            data[visit.Client?.Location].Total += 1;    

            if (visit.HealthFormId !== null)
                data[visit.Client?.Location].HealthFormId += 1;
            if (visit.EducationFormId !== null)
                data[visit.Client?.Location].EducationFormId += 1;
            if (visit.SocialFormId !== null)
                data[visit.Client?.Location].SocialFormId += 1;
        })

        // Need to convert to array to be used by the table / graph
        convertToArray(data);
    }

    // Reference: https://stackoverflow.com/a/46848788
    function sortByStats(sortBy) {
        stats.sort((a, b) => {
            if (a[sortBy] < b[sortBy])
                return 1;
            else if (a[sortBy] > b[sortBy])
                return -1;
            else
                return 0;
        })
        setStats(stats);
    }

    return (
        <Container>
            <div style={{height: '400px'}}>
                <VisitBarChart data={stats} keys={['Total', 'HealthFormId', 'EducationFormId', 'SocialFormId']} maxValue={maxCount}/>
            </div>
            <Label>Sort by</Label>
            <Input type="select"
             onChange={(e) => {
                setSortBy(e.target.value);
                sortByStats(e.target.value);
             }}>
                <option value="Total">Total</option>
                <option value="HealthFormId">HealthFormId</option>
                <option value="EducationFormId">EducationFormId</option>
                <option value="SocialFormId">SocialFormId</option>
            </Input>
            <Table>
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Total</th>
                        <th>HealthFormId</th>
                        <th>EducationFormId</th>
                        <th>SocialFormId</th>
                    </tr>
                </thead>
                <tbody>
                {stats.map(({Location, Total, HealthFormId, EducationFormId, SocialFormId}) => (
                    <tr>
                        <td>{Location}</td>
                        <td>{Total}</td>
                        <td>{HealthFormId}</td>
                        <td>{EducationFormId}</td>
                        <td>{SocialFormId}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default VisitStatistics;
