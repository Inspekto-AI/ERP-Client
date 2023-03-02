import FrinksButton from 'components/FrinksButton';
import PropTypes from 'prop-types';
import Container from './MaintenanceTicket.styles';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { put } from 'utils/api';

const MaintenanceTicket = ({ data, isActive }) => {
  // const [maintenancedata, setMaintenanaceData] = useState(data);

  const handleTicketResolved = async data => {
    // console.log(maintenancedata, '=======');
    try {
      await put('/api/transaction/maintenance', {
        id: data?.id,
        printing_belt_id: data?.printing_belt_id,
        loader_belt_id: data?.loader_belt_id
      });
      // setMaintenanaceData(data);
      console.log(data, '===============');
    } catch (err) {
      console.log(err);
    }
  };
  console.log(data);
  return (
    <Container isActive={isActive}>
      <div className="left">
        <div className="title">Ticket # {data.id} </div>
        <div className="sub-title">{data.reason}</div>
        <div className="time">
          {moment(new Date(data.duration)).format('h:mm A')}
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
