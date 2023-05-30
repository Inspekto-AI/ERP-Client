import Layout from 'components/Layout';
import Container from 'styles/maintenance.styles';
import MaintenanceTicket from 'components/MaintenanceTicket';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { get } from 'utils/api';

function Maintenance({ close }) {
  const [activemaintenance, setActiveMaintenance] = useState(null);

  useEffect(() => {
    const maintenance = async () => {
      try {
        const result = await get('/api/maintenance');
        setActiveMaintenance(result?.data?.data);
      } catch (error) {
        console.log(error, 'maintenanceTicket,-----------------------');
      }
    };
    maintenance();
  }, []);

  const removeMaintenanceTicket = (id) => {
    setActiveMaintenance(activemaintenance.filter((e) => {
      if (e?.id != id) return e;
    }));
  };

  return (
    <Layout
      alternateHeader
      title="Maintenance Requests"
      hideFooter
      close={close}
    >
      <Container>
        <div className="heading">Active Tickets</div>
        {activemaintenance && activemaintenance.length > 0
          ? activemaintenance.map((e, index) => (
            <MaintenanceTicket data={e} isActive index={index} removeMaintenanceTicket={(id) => removeMaintenanceTicket(id)} key={index} />
          ))
          : (
            <div className="no-tickets">
              No active maintenance tickets
            </div>
          )}

        {/* <div className="heading">Previous Tickets</div>
        <div className="previous-tickets">
          <MaintenanceTicket />
          <MaintenanceTicket />
          <MaintenanceTicket />
          <MaintenanceTicket />
        </div> */}
      </Container>
    </Layout>
  );
}

Maintenance.propTypes = {
  close: PropTypes.func,
};

export default Maintenance;
