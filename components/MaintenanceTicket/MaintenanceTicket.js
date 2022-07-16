import FrinksButton from 'components/FrinksButton';
import PropTypes from 'prop-types';
import Container from './MaintenanceTicket.styles';

const MaintenanceTicket = ({ isActive }) => {
  return (
    <Container isActive={isActive}>
      <div className="left">
        <div className="title">Ticket #123</div>
        <div className="sub-title">Printing belt | belt jammed</div>
        <div className="time">00:32:44</div>
      </div>
      <div className="right">
        <FrinksButton
          text={isActive ? 'Mark Complete' : 'View Details'}
          variant={isActive ? 'contained' : 'outlined'}
        />
      </div>
    </Container>
  );
};

MaintenanceTicket.propTypes = {
  isActive: PropTypes.bool
};

export default MaintenanceTicket;
