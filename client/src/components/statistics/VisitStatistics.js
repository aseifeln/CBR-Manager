import React, { useEffect, useState } from 'react';
import { Container, Table, Label, Input } from 'reactstrap'
import axios from 'axios';

function VisitStatistics() {

    const [ stats, setStats ] = useState([]);

    useEffect(() => {
        axios.get('/visits')
        .then((response) => {
            console.log(response.data)
            generateStats(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    })

    function generateStats(visits) {
        let data = {};
        
        visits.forEach((visit) => {
            if (!(visit?.Location in data))
                data[visit?.Location] = {Count: 0};

            data[visit?.Location].Count += 1;
        })

        let dataArr = [];
        for (var i in data) {
            data[i]['Location'] = i;
            dataArr.push(data[i]);
        }

        setStats(dataArr);
    }

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                {stats.map(({Location, Count}) => (
                    <tr>
                        <td>{Location}</td>
                        <td>{Count}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default VisitStatistics;