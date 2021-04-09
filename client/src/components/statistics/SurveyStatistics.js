import React, { useEffect, useState } from 'react';
import { Container, Table, Label, Input, TabContent, TabPane, Nav, NavItem, NavLink, Button} from 'reactstrap'
import classnames from 'classnames';
import { ReferralBarChart } from '../graphs/ReferralsGraph';
import axios from 'axios';

function ReferralStatistics() {

    const [activeTab, setActiveTab] = useState('1');
    const [activeSubTab, setActiveSubTab] = useState('1');
    const toggle = (tab) => { if (activeTab !== tab) setActiveTab(tab); }

    const [ stats, setStats ] = useState([]);
    const [ total, setTotal ] = useState(1);
    const [ maxCount, setMaxCount ] = useState(0);

    useEffect(() => {
        console.log("response data")
            axios.get('/surveyStats/')
            .then((response) => {
                setStats(response.data);
                setTotal(response.data.Total);
            })
            .catch((error) => {
                console.log("api error",error);
            })
    }, [])

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

    function getPercent(num, denom) {
        return (num/denom) * 100;
    }

    function ShowHealthStats() {
        const HealthStats = stats['HealthStats'];

        return(
        <div>
            <Table size="sm">
              <thead>
                <tr>
                  <th>Stat</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{getPercent(HealthStats?.RehabilitationAccessCount, total)}%</td>
                  <td>Has access to rehabilitation services</td>
                </tr>
                <tr>
                  <td>{getPercent(HealthStats?.RehabilitationAccessNeededCount, total)}%</td>
                  <td>Needs access to rehabilitation services</td>
                </tr>
                <tr>
                  <td>{getPercent(HealthStats?.AssistiveDeviceCount, total)}%</td>
                  <td>Has assistive device</td>
                </tr>
                <tr>
                  <td>{getPercent(HealthStats?.AssistiveDeviceWorkingCount, total)}%</td>
                  <td>Assistive device working</td>
                </tr>
                <tr>
                  <td>{getPercent(HealthStats?.AssistiveDeviceNeededCount, total)}%</td>
                  <td>Assistive device needed</td>
                </tr>
              </tbody>
            </Table>
        </div>
      );
    }

  function ShowSocialStats() {
      const SocialStats = stats['SocialStats'];
      return(
          <div>
              <Table size="sm">
                <thead>
                  <tr>
                      <th>Stat</th>
                      <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{getPercent(SocialStats?.ValuedCommunityMemberCount, total)}%</td>
                    <td>Feel valued as a community member</td>
                  </tr>
                  <tr>
                    <td>{getPercent(SocialStats?.IndependenceCount, total)}%</td>
                    <td>Feel independent</td>
                  </tr>
                  <tr>
                    <td>{getPercent(SocialStats?.CommunityParticipationCount, total)}%</td>
                    <td>Able to participate in community/social events</td>
                  </tr>
                  <tr>
                    <td>{getPercent(SocialStats?.DisabilityImpactCount, total)}%</td>
                    <td>Disability affects ability to interact socially</td>
                  </tr>
                  <tr>
                    <td>{getPercent(SocialStats?.DiscriminationCount, total)}%</td>
                    <td>Experienced discrimination because of your disability</td>
                  </tr>
                </tbody>
              </Table>
          </div>
      );
  }

  function ShowEducationStats() {
      const EducationStats = stats['EducationStats'];

      return(
          <div>
              <Table size="sm">
                <thead>
                  <tr>
                    <th>Stat</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{getPercent(EducationStats?.SchoolStateCount, total)}%</td>
                    <td>Goes to school</td>
                  </tr>
                  <tr>
                    <td>{getPercent(EducationStats?.WantSchoolCount, total)}%</td>
                    <td>Has ever attended school</td>
                  </tr>
                  <tr>
                    <td>{getPercent(EducationStats?.SchoolBeforeCount, total)}%</td>
                    <td>Wants to go to school</td>
                  </tr>
                </tbody>
              </Table>
          </div>
      );
  }

  function ShowLivelihoodStats() {
      const LivelihoodStats = stats['LivelihoodStats'];

      return(
          <div>
              <Table size="sm">
                <thead>
                  <tr>
                    <th>Stat</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{getPercent(LivelihoodStats?.WorkStatusCount, total)}%</td>
                    <td>Currently working</td>
                  </tr>
                  <tr>
                    <td>{getPercent(LivelihoodStats?.FinancialNeedsMetCount, total)}%</td>
                    <td>Meet financial needs with current work</td>
                  </tr>
                  <tr>
                    <td>{getPercent(LivelihoodStats?.DisabilityImpactCount, total)}%</td>
                    <td>Disability affects ability to work</td>
                  </tr>
                  <tr>
                    <td>{getPercent(LivelihoodStats?.WorkWantedCount, total)}%</td>
                    <td>Wants to work</td>
                  </tr>
                </tbody>
              </Table>
          </div>
      );
  }

  function ShowNutritionStats() {
      const NutritionStats = stats['NutritionStats'];

      return(
          <div>
              <Table size="sm">
                <thead>
                  <tr>
                    <th>Stat</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{getPercent(NutritionStats?.MonthlyFoodAccessCount, total)}%</td>
                    <td>Have enough food every month</td>
                  </tr>
                </tbody>
              </Table>
          </div>
      );
  }
      //const ShelterStats = stats['ShelterStats'];

  function ShowEmpowermentStats() {
      const EmpowermentStats = stats['EmpowermentStats'];

      return(
          <div>
              <Table size="sm">
                <thead>
                  <tr>
                    <th>Stats</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{getPercent(EmpowermentStats?.DisabilityOrganizationMemberCount, total)}%</td>
                    <td>Is a member of a disability organization</td>
                  </tr>
                  <tr>
                    <td>{getPercent(EmpowermentStats?.AwareDisabilityRightsCount, total)}%</td>
                    <td>Aware of rights</td>
                  </tr>
                  <tr>
                    <td>{getPercent(EmpowermentStats?.InfluentialCount, total)}%</td>
                    <td>Feel able to influence people around</td>
                  </tr>
                </tbody>
              </Table>
          </div>
      );
  }

  function ShowShelterStats() {
      const ShelterStats = stats['ShelterStats'];

      return(
          <div>
              <Table size="sm">
                <thead>
                  <tr>
                    <th>Stat</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{getPercent(ShelterStats?.ShelterAccessCount, total)}%</td>
                    <td>Adequate shelter</td>
                  </tr>
                  <tr>
                    <td>{getPercent(ShelterStats?.EssentialsAccessCount, total)}%</td>
                    <td>Access to essential household items</td>
                  </tr>
                </tbody>
              </Table>
          </div>
      );
  }

    return (
        <Container>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}>
                Health
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}>
                Social
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => { toggle('3'); }}>
                Education
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '4' })}
                onClick={() => { toggle('4'); }}>
                Livelihood
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '5' })}
                onClick={() => { toggle('5'); }}>
                Other Stats
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
                <ShowHealthStats/>
            </TabPane>
            <TabPane tabId="2">
                <ShowSocialStats/>
            </TabPane>
            <TabPane tabId="3">
                <ShowEducationStats/>
            </TabPane>
            <TabPane tabId="4">
                <ShowLivelihoodStats/>
            </TabPane>
            <TabPane tabId="5">
                <h4>Nutrition Stats</h4>
                <ShowNutritionStats/>
                <h4>Empowerment Stats</h4>
                <ShowEmpowermentStats/>
                <h4>Shelter Stats</h4>
                <ShowShelterStats/>
            </TabPane>
          </TabContent>
        </Container>
    )



}

export default ReferralStatistics;
