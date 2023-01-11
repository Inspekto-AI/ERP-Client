import Card from './Card';
import { get } from 'utils/api';
import { useState, useEffect } from 'react';
import Container from './SystemHealth.styles';

const SystemHealth = () => {
  const [healthData, setHealthData] = useState(null);
  const [defected, setDefected] = useState(null);

  useEffect(() => {
    const fetchHealth = async () => {
      const data = await get('/api/analysis/health');
      setHealthData(data?.data?.data);
    };
    if (!healthData) {
      fetchHealth();
    }
  }, [healthData]);

  useEffect(() => {
    if(healthData){
      const defectiveElements = [];
      Object.values(healthData).forEach(e => {
        e.forEach(ele => {
          if(ele.started_at && !ele.ended_at){
            defectiveElements.push(ele);
          } 
        })
      })
      setDefected(defectiveElements);
    }
  }, [healthData])

  return (
    <Container>
      <div className="container">
        <h1 className="heading">System Health Monitoring</h1>
      </div>
      {defected && (<>
        <h3 className="sub-heading">Not Functioning</h3>
        <hr className="divider" />
        <div className="card-container">
          {defected.map((e, index) => {
            return (
              <Card active={e.started_at && !e.ended_at?false:true} type={e.entity_type} name={e.entity_name} ip={e.ip_address} key={index} index={index} started_at={e.started_at} />
            )
          })}
        </div>
      </>)}
      {healthData && Object.keys(healthData).map((ele) => {
        return (
          <>
            <h3 className="sub-heading">{ele}</h3>
            <hr className="divider" />
            <div className="card-container">
              {healthData[ele].map((e, index) => {
                return (
                  <Card active={e.started_at && !e.ended_at?false:true} type={e.entity_type} name={e.entity_name} ip={e.ip_address} key={index} index={index} started_at={e.started_at} />
                )
              })}
            </div>
          </>
        )
      })}
    </Container>
  );
};

export default SystemHealth;
