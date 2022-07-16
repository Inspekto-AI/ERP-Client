import Layout from 'components/Layout';
import Container from 'styles/maintenance.styles';
import MaintenanceTicket from 'components/MaintenanceTicket';
import PropTypes from 'prop-types';

const Maintenance = ({ close }) => {
  return (
    <Layout
      alternateHeader
      title="Maintenance Requests"
      hideFooter
      close={close}
    >
      <Container>
        <div className="heading">Active Tickets</div>
        <MaintenanceTicket isActive />
        <div className="heading">Previous Tickets</div>
        <div className="previous-tickets">
          <MaintenanceTicket />
          <MaintenanceTicket />
          <MaintenanceTicket />
          <MaintenanceTicket />
        </div>
      </Container>
    </Layout>
  );
};

Maintenance.propTypes = {
  close: PropTypes.func
};

export default Maintenance;
