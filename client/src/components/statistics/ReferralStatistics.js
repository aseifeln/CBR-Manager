import React, { useEffect, useState } from 'react';
import { Container, Table, Label, Input } from 'reactstrap'
import BarChart from '../graphs/BarGraph';
import axios from 'axios';

function ReferralStatistics() {

    const [ stats, setStats ] = useState([]);
    const [ sortBy, setSortBy ] = useState('Total'); // Need this state for sorting statistics even though it isn't used

    useEffect(() => {
        axios.get('/referrals')
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

    function generateStats(referralData) {
        const data = {};
        referralData.forEach((ref) => {
            if (!(ref.Client?.Location in data)) {
                data[ref.Client?.Location] = {Total: 0, Made: 0, Resolved: 0};
            }

            data[ref.Client?.Location].Total += 1;    

            if (ref.Status === 'Made')
                data[ref.Client?.Location].Made += 1;
            else
                data[ref.Client?.Location].Resolved += 1;
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
                <BarChart data={stats} keys={['Total', 'Made', 'Resolved']} keyAttr="Total" groupBy="Location" xAxis="Location" yAxis="Count"/>
            </div>
            <Label>Sort by</Label>
            <Input type="select"
             onChange={(e) => {
                setSortBy(e.target.value);
                sortByStats(e.target.value);
             }}>
                <option value="Total">Total</option>
                <option value="Made">Made</option>
                <option value="Resolved">Resolved</option>
            </Input>
            <Table>
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Total</th>
                        <th>Made</th>
                        <th>Resolved</th>
                    </tr>
                </thead>
                <tbody>
                {stats.map(({Location, Total, Made, Resolved}) => (
                    <tr>
                        <td>{Location}</td>
                        <td>{Total}</td>
                        <td>{Made}</td>
                        <td>{Resolved}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default ReferralStatistics;
