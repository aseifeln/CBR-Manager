import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import BarChart from '../graphs/BarGraph';
import axios from 'axios';

function CBRPerformance() {

    const [mostVisits, setMostVisits] = useState([])
    const [leastVisits, setLeastVisits] = useState([])
    const [mostReferrals, setMostReferrals] = useState([])
    const [leastReferrals, setLeastReferrals] = useState([])

    useEffect(() => {
        axios.get('/workers/mostVisits')
        .then(response => {
            const stats = extractStats(response.data)
            setMostVisits(stats)
        })
        .catch(error => console.log(error))

        axios.get('/workers/leastVisits')
        .then(response => {
            const stats = extractStats(response.data)
            setLeastVisits(stats)
        })
        .catch(error => console.log(error))

        axios.get('/workers/mostReferrals')
        .then(response => {
            const stats = extractStats(response.data)
            setMostReferrals(stats)
        })
        .catch(error => console.log(error))

        axios.get('/workers/leastReferrals')
        .then(response => {
            const stats = extractStats(response.data)
            setLeastReferrals(stats)
        })
        .catch(error => console.log(error))
    }, [])

    function extractStats(workers) {
        let stats = []
        workers.forEach(worker => {
            let stat = {}
            stat['Worker'] = worker.Worker.FirstName + ' ' + worker.Worker.LastName
            stat['Count'] = worker.statcount
            stats.push(stat)
        })

        return stats
    }

    return (
        <Container>
            <div style={{height: '400px', marginBottom: '50px'}}>
                <h5 style={{textAlign: 'center'}}><b>Top 5 CBR Workers Carrying The Most Visits</b></h5>
                <BarChart data={mostVisits} keys={['Count']} keyAttr="Count" groupBy="Worker" xAxisLabel="Worker" yAxisLabel="Count"/>
            </div>
            <div style={{height: '400px', marginBottom: '50px'}}>
                <h5 style={{textAlign: 'center'}}><b>Top 5 CBR Workers Carrying The Least Visits</b></h5>
                <BarChart data={leastVisits} keys={['Count']} keyAttr="Count" groupBy="Worker" xAxisLabel="Worker" yAxisLabel="Count"/>
            </div>
            <div style={{height: '400px', marginBottom: '50px'}}>
                <h5 style={{textAlign: 'center'}}><b>Top 5 CBR Workers Carrying The Most Referrals</b></h5>
                <BarChart data={mostReferrals} keys={['Count']} keyAttr="Count" groupBy="Worker" xAxisLabel="Worker" yAxisLabel="Count"/>
            </div>
            <div style={{height: '400px', marginBottom: '50px'}}>
                <h5 style={{textAlign: 'center'}}><b>Top 5 CBR Workers Carrying The Least Referrals</b></h5>
                <BarChart data={leastReferrals} keys={['Count']} keyAttr="Count" groupBy="Worker" xAxisLabel="Worker" yAxisLabel="Count"/>
            </div>
        </Container>
    )
}

export default CBRPerformance;