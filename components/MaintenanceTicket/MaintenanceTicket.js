import FrinksButton from 'components/FrinksButton';
import PropTypes from 'prop-types';
import Container from './MaintenanceTicket.styles';
import moment from 'moment';
import { put } from 'utils/api';

const MaintenanceTicket = ({ data, isActive, removeMaintenanceTicket }) => {

  const handleTicketResolved = async data => {
    try {
      await put('/api/maintenance', { id: data?.id });
      // maintenance done remove the ticket
      removeMaintenanceTicket(data?.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container isActive={isActive}>
      <div className="left">
        <div className="title">Ticket # {data.id} </div>
        <div className="sub-title">{data.printing_belt_id ? `Printing belt - ${data.printing_belt_id} under maintenance | Reason - ${data.reason}` : `Loading belt - ${data.loading_belt_id} under maintenance | Reason - ${data.reason}`}</div>
        <div className="time">
          {moment(new Date(data.duration)).format('DD-MM-YYYY HH:mm:ss')}
        </div>
      </div>
      <div className="right">
        <FrinksButton
          text={isActive ? 'Mark Complete' : 'View Details'}
          variant={isActive ? 'contained' : 'outlined'}
          onClick={() => handleTicketResolved(data)}
        />
      </div>
    </Container>
  );
};

MaintenanceTicket.propTypes = {
  isActive: PropTypes.bool
};

export default MaintenanceTicket;
