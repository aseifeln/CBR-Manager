import React, { useEffect, useState } from 'react';
import { Container, Table } from 'reactstrap';
import BarChart from '../graphs/BarGraph';
import axios from 'axios';

function VisitStatistics() {

    const [ stats, setStats ] = useState([]);

    useEffect(() => {
        axios.get('/visits/stats/location')
        .then((response) => {
            setStats(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <Container>
            <div style={{height: '400px'}}>
                <BarChart data={stats} keys={['count']} keyAttr="count" groupBy="Location" xAxis="Location" yAxis="Count"/>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                {stats.map(({Location, count}) => (
                    <tr>
                        <td>{Location}</td>
                        <td>{count}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default VisitStatistics;