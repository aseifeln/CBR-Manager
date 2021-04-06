import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table} from 'reactstrap'
import axios from 'axios';

function ReferralStatistics(props) {

    const [ stats, setStats ] = useState([]);

    useEffect(() => {
        axios.get('/referrals')
        .then((response) => {
            generateStats(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    function generateStats(referralData) {
        const data = {};
        referralData.forEach((ref) => {
            if (!(ref.Client?.Location in data)) {
                data[ref.Client?.Location] = {All: 0, Made: 0, Resolved: 0};
            }

            data[ref.Client?.Location].All += 1;    

            if (ref.Status === 'Made')
                data[ref.Client?.Location].Made += 1;
            else
                data[ref.Client?.Location].Resolved += 1;
        })

        let dataArr = [];
        for (var i in data)
        {
            data[i]['Location'] = i;
            dataArr.push(data[i]);
        }

        console.log(dataArr);
        setStats(dataArr);
    }

    return (
        <Container>
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
                {stats.map(({Location, All, Made, Resolved}) => (
                    <tr>
                        <td>{Location}</td>
                        <td>{All}</td>
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