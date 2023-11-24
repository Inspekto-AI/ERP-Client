import { get } from 'utils/api';
import { useState, useEffect } from 'react';
import { SYSTEM_REFETCH_TIMEOUT_MS } from 'utils/constants';
import AlertModal from 'components/AlertModal/AlertModal';
import Card from './Card';
import Container from './SystemHealth.styles';

function SystemHealth() {
  const [healthData, setHealthData] = useState(null);
  const [defected, setDefected] = useState(null);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const fetchHealth = async () => {
      const data = await get('/api/stats/inoperational-device-stats');
      setHealthData(data?.data?.data);
      console.log(data);
    };
    fetchHealth();
  }, []);

  useEffect(() => {
    const fetchHealth = async () => {
      const data = await get('/api/stats/inoperational-device-stats');
      setHealthData(data?.data?.data);
    };
    const interval = setInterval(() => fetchHealth(), SYSTEM_REFETCH_TIMEOUT_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (healthData) {
      const defectiveElements = [];
      Object.values(healthData).forEach((e) => {
        e.forEach((ele) => {
          if (ele.started_at && !ele.ended_at) {
            defectiveElements.push(ele);
          }
        });
      });
      setDefected(defectiveElements);
    }
  }, [healthData]);

  useEffect(() => {
    // fetch('../../../cement-health-backend/state_change_logs/loading_TX_15.txt')
    fetch('./Card.js')
      .then((response) => {
        if (!response.ok) {
          throw new Error('File not found or could not be loaded.');
        }
        return response.text();
      })
      .then((text) => {
        console.log(text, 'text');
        // setFileContent(text);
        // set(true);
      })
      .catch((error) => {
        console.error('Error loading file:', error);
      });
  }, [modalData]);

  return (
    <Container>
      <div className="container">
        <h1 className="heading">System Health Monitoring</h1>
      </div>
      {/* {defected && defected.length > 0 && (
        <div>
          <div className="sub-header">
            <h3 className="sub-heading">Not Functioning</h3>
            <hr className="divider" />
          </div>
          <div className="card-container">
            {defected.map((e, index) => (
              <Card
                id={e.id}
                active={!(e.started_at && !e.ended_at)}
                type={e.entity_type}
                name={e.entity_name}
                ip={e.ip_address}
                key={index}
                index={index}
                started_at={e.started_at}
                handleModalData={(data) => setModalData(data)}
              />
            ))}
          </div>
        </div>
      )} */}
      {healthData &&
        Object.keys(healthData).map((ele, idx) => (
          <div key={idx}>
            <div className="sub-header">
              <h3 className="sub-heading">{ele}</h3>
              <hr className="divider" />
            </div>
            <div className="card-container">
              {healthData[ele].map((e, index) => (
                <Card
                  id={e.id}
                  active={!(e.started_at && !e.ended_at)}
                  type={e.entity_type}
                  name={e.entity_name}
                  ip={e.ip_address}
                  key={index}
                  index={index}
                  started_at={e.started_at}
                  handleModalData={(data) => setModalData(data)}
                />
              ))}
            </div>
          </div>
        ))}
      {modalData && <AlertModal open={modalData} close={() => setModalData(null)} />}
    </Container>
  );
}

export default SystemHealth;
