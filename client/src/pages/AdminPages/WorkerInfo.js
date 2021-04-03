import React, { useState, useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Badge, Table, Button, Media } from 'reactstrap';
import classnames from 'classnames';
import CookieChecker from '../../components/CookieChecker';
import AdminSideBar from '../../components/AdminSideBar';
import { WorkerStatsGraph } from '../../components/graphs/WorkerGraphs';
import { Link } from 'react-router-dom';
import '../../css/WorkerInfo.css';
import axios from 'axios';
import ChangePassword from '../../components/ChangePassword';
import NotFoundPage from '../404';

const data = [
    {
      "id": "Visits made",
      "color": "#5f27cd",
      "data": [
        {
          "x": "plane",
          "y": 275
        },
        {
          "x": "helicopter",
          "y": 143
        },
        {
          "x": "boat",
          "y": 4
        },
        {
          "x": "train",
          "y": 299
        },
        {
          "x": "subway",
          "y": 252
        },
        {
          "x": "bus",
          "y": 138
        },
        {
          "x": "car",
          "y": 292
        },
        {
          "x": "moto",
          "y": 269
        },
        {
          "x": "bicycle",
          "y": 132
        },
        {
          "x": "horse",
          "y": 8
        },
        {
          "x": "skateboard",
          "y": 80
        },
        {
          "x": "others",
          "y": 22
        }
      ]
    },
    {
      "id": "New Clients",
      "color": "#ff9f43",
      "data": [
        {
          "x": "plane",
          "y": 130
        },
        {
          "x": "helicopter",
          "y": 65
        },
        {
          "x": "boat",
          "y": 152
        },
        {
          "x": "train",
          "y": 266
        },
        {
          "x": "subway",
          "y": 0
        },
        {
          "x": "bus",
          "y": 31
        },
        {
          "x": "car",
          "y": 144
        },
        {
          "x": "moto",
          "y": 59
        },
        {
          "x": "bicycle",
          "y": 162
        },
        {
          "x": "horse",
          "y": 42
        },
        {
          "x": "skateboard",
          "y": 124
        },
        {
          "x": "others",
          "y": 122
        }
      ]
    },
    {
      "id": "Referals made",
      "color": "#ee5253",
      "data": [
        {
          "x": "plane",
          "y": 130
        },
        {
          "x": "helicopter",
          "y": 205
        },
        {
          "x": "boat",
          "y": 151
        },
        {
          "x": "train",
          "y": 195
        },
        {
          "x": "subway",
          "y": 141
        },
        {
          "x": "bus",
          "y": 282
        },
        {
          "x": "car",
          "y": 149
        },
        {
          "x": "moto",
          "y": 178
        },
        {
          "x": "bicycle",
          "y": 217
        },
        {
          "x": "horse",
          "y": 137
        },
        {
          "x": "skateboard",
          "y": 214
        },
        {
          "x": "others",
          "y": 37
        }
      ]
    },
    {
      "id": "Referrals resolved",
      "color": "#1dd1a1",
      "data": [
        {
          "x": "plane",
          "y": 294
        },
        {
          "x": "helicopter",
          "y": 276
        },
        {
          "x": "boat",
          "y": 58
        },
        {
          "x": "train",
          "y": 141
        },
        {
          "x": "subway",
          "y": 41
        },
        {
          "x": "bus",
          "y": 156
        },
        {
          "x": "car",
          "y": 33
        },
        {
          "x": "moto",
          "y": 181
        },
        {
          "x": "bicycle",
          "y": 40
        },
        {
          "x": "horse",
          "y": 114
        },
        {
          "x": "skateboard",
          "y": 280
        },
        {
          "x": "others",
          "y": 120
        }
      ]
    }
]

function WorkerInfo(props) {
    const [activeTab, setActiveTab] = useState('1');
    const [activeSubTab, setActiveSubTab] = useState('1');
    const [worker, setWorker] = useState({});
    const [visits, setVisits] = useState([]);
    const [referrals, setReferrals] = useState([]);
    const [workerFound, setWorkerFound] = useState(false);
    const [username, setUsername] = useState("");
    const toggle = (tab) => { if (activeTab !== tab) setActiveTab(tab); }
    const toggleSubTab = (subTab) => { if (activeSubTab !== subTab) setActiveSubTab(subTab); }

    useEffect(() => {
      axios.get('/users/worker/' + props.match.params.id)
          .then((response) => {
              setWorker(response.data[0].Worker);
              setWorkerFound(true);
              setUsername(response.data[0].Username);
              document.title = "CBR Worker | " + response.data[0].Worker.FirstName + " " + response.data[0].Worker.LastName;
          })
          .catch((error) => {
              console.log(error);
          })
      
      axios.get('/workers/' + props.match.params.id + '/visits')
          .then((response) => {
              setVisits(response.data);
          })
          .catch((error) => {
              console.log(error);
          })

      axios.get('/workers/' + props.match.params.id + '/referrals')
          .then((response) => {
              setReferrals(response.data);
          })
          .catch((error) => {
              console.log(error);
          })
      
  }, []);

  if (!workerFound) {
    return (
        <NotFoundPage/>
    )
  }

  return (
      <div>
        <CookieChecker/>
        <div className='main-content'>
          <AdminSideBar/>

          <div className='admin-container'>
              <div class='avatar-desc'>
                <Media src={`data:image/jpeg;base64,${worker.Photo}`} alt="Profile photo" height="80px" width="80px" style={{borderRadius: "50%"}}/>
                <div>
                  <ChangePassword username={username}/>
                  <Badge pill>Worker</Badge>
                  <h2>Denis Onyango</h2>
                  <h5><b>Location:</b> BidiBidi Zone 1</h5>
                </div>
              </div>

              <div class='admin-card' data-title='Worker Statistics (Last 7 days)'>
                  <div style={{ height: 500 }}>
                      <WorkerStatsGraph data={data}/>
                  </div>
              </div>

              {/* TODO: Replace stock data with actual data */}
              <div className="summary-stats">
                  <div className="stat-count" style={{background: '#5f27cd'}}>
                      <div className='count-number'>123</div>
                      <h6>Visits made in the past week</h6>
                  </div>
                  <div className="stat-count" style={{background: '#ff9f43'}}>
                      <div className='count-number'>123</div>
                      <h6>New clients in the past week</h6>
                  </div>
                  <div className="stat-count" style={{background: '#ee5253'}}>
                      <div className='count-number'>123</div>
                      <h6>Referrals made in the past week</h6>
                  </div>
                  <div className="stat-count" style={{background: '#1dd1a1'}}>
                      <div className='count-number'>123</div>
                      <h6>Referrals resolved in the past week</h6>
                  </div>
              </div>

              <Nav tabs>
                  <NavItem>
                  <NavLink
                      className={classnames({ active: activeTab === '1' }, 'tab-link')}
                      onClick={() => { toggle('1'); }}
                  >
                      Visits
                  </NavLink>
                  </NavItem>
                  <NavItem>
                  <NavLink
                      className={classnames({ active: activeTab === '2' }, 'tab-link')}
                      onClick={() => { toggle('2'); }}
                  >
                      Referrals
                  </NavLink>
                  </NavItem>
                  <NavItem>
                  </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                  <TabPane className="tab-content" tabId="1">
                    <Table>
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {visits.map(({VisitId, Date, Client}) => (
                            <tr>
                                <td>{Client?.FirstName + ' ' + Client?.LastName}</td>
                                <td>{Date}</td>
                                <td><Link to={"/visit/" + VisitId}><Button color="success" style={{float: 'right'}}>View</Button></Link></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                  </TabPane>
                  <TabPane className="tab-content" tabId="2">
                      <Nav tabs>
                          <NavItem>
                          <NavLink
                              className={classnames({ active: activeSubTab === '1' }, 'tab-link')}
                              onClick={() => { toggleSubTab('1'); }}
                          >
                              All
                          </NavLink>
                          </NavItem>
                          <NavItem>
                          <NavLink
                              className={classnames({ active: activeSubTab === '2' }, 'tab-link')}
                              onClick={() => { toggleSubTab('2'); }}
                          >
                              Made
                          </NavLink>
                          </NavItem>
                          <NavItem>
                          <NavLink
                              className={classnames({ active: activeSubTab === '3' }, 'tab-link')}
                              onClick={() => { toggleSubTab('3'); }}
                          >
                              Resolved
                          </NavLink>
                          </NavItem>
                      </Nav>
                      <TabContent activeTab={activeSubTab}>
                          <TabPane className="tab-content" tabId="1">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Client</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {referrals.map(({ReferralId, Date, Client}) => (
                                    <tr>
                                        <td>{Client?.FirstName + ' ' + Client?.LastName}</td>
                                        <td>{Date}</td>
                                        <td><Link to={"/referral/" + ReferralId}><Button color="success" style={{float: 'right'}}>View</Button></Link></td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                          </TabPane>
                          <TabPane className="tab-content" tabId="2">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Client</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {referrals.map(({ReferralId, Date, Client, Status}) => (
                                    (Status === 'Made') ? (
                                        <tr>
                                            <td>{Client?.FirstName + ' ' + Client?.LastName}</td>
                                            <td>{Date}</td>
                                            <td><Link to={"/referral/" + ReferralId}><Button color="success" style={{float: 'right'}}>View</Button></Link></td>
                                        </tr>
                                    ) : ("")
                                ))}
                                </tbody>
                            </Table>
                          </TabPane>
                          <TabPane className="tab-content" tabId="3">
                            <Table>
                              <thead>
                                  <tr>
                                      <th>Client</th>
                                      <th>Date</th>
                                      <th></th>
                                  </tr>
                              </thead>
                              <tbody>
                              {referrals.map(({ReferralId, Date, Client, Status}) => (
                                  (Status === 'Resolved') ? (
                                      <tr>
                                          <td>{Client?.FirstName + ' ' + Client?.LastName}</td>
                                          <td>{Date}</td>
                                          <td><Link to={"/referral/" + ReferralId}><Button color="success" style={{float: 'right'}}>View</Button></Link></td>
                                      </tr>
                                  ) : ("")
                              ))}
                              </tbody>
                            </Table>
                          </TabPane>
                      </TabContent>
                  </TabPane>
                </TabContent>
            </div>                
        </div>
      </div>
    );
  }

export default WorkerInfo