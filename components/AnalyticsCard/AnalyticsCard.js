import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GrFlag } from 'react-icons/gr';
import { IoMdAdd } from 'react-icons/io';
import { Avatar, Button, LinearProgress } from '@material-ui/core';
import { BiRightArrowAlt } from 'react-icons/bi';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { msToTime } from 'utils/globalFunctions';
import { PACKER_LIMIT } from 'utils/constants';
import Container from './AnalyticsCard.styles';
import FrinksButton from 'components/FrinksButton';

export const getStatus = progressPercentage => {
  if (progressPercentage <= 20) {
    return {
      colorCode: '#FF3945',
      status: 'Poor'
    };
  }
  if (progressPercentage <= 40) {
    return {
      colorCode: '#F9D907',
      status: 'Better'
    };
  }
  if (progressPercentage <= 60) {
    return {
      colorCode: '#00B2CF',
      status: 'Good'
    };
  }
  if (progressPercentage <= 80) {
    return {
      colorCode: '#8264C0',
      status: 'Average'
    };
  }
  return {
    colorCode: '#00C1A3',
    status: 'Excellent'
  };
};

const AnalyticsCard = ({
  // isError,
  data,
  status,
  loaderCard,
  packerCard,
  printingCard,
  rejectModalOpen,
  bagModifyModalOpen,
  setDetailModalOpen,
  setReverseShipmentFormOpen,
  handleBagDone
}) => {
  const [timeDifference, setTimeDifference] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setTimeDifference(
          data.created_at
            ? msToTime(new Date().getTime() - data.created_at)
            : '00:00:00'
        ),
      1000
    );
    return () => clearInterval(interval);
  }, [data?.created_at]);

  return (
    <Container
      packerCard={packerCard}
      progressBackground={
        getStatus(Math.min((data.count * 100) / PACKER_LIMIT, 100)).colorCode
      }
      status={status}
      countReached={data.bag_limit === data.bag_count}
      printingCard={printingCard}
    >
      <div className="error">
        <div className="title">
          <GrFlag />
          Error Occured
        </div>
        <div className="know-more-button">
          <p>Know more</p>
        </div>
      </div>
      <div className="head" style={{ flexDirection: 'row' }}>
        <div className="id-container">
          <div className="status" />
          <div className="id">
            {packerCard ? (
              <p>{data?.id}</p>
            ) : (
              <>
                {printingCard || packerCard ? null : (
                  <p className="bag-id">{data?.vehicle_id}</p>
                )}
                {status < 2 && loaderCard ? (
                  <p className="tag-id">{data?.printing_id}</p>
                ) : printingCard ? (
                  <p className="tag-id">{data?.printing_id}</p>
                ) : null}
              </>
            )}
          </div>
        </div>
        <div className="timer">
          {printingCard || status > 0 ? null : (
            <>
              {data?.count_finished_at
                ? msToTime(data?.count_finished_at - data?.created_at)
                : timeDifference}
            </>
          )}
        </div>
      </div>
      {status > 1 ? null : (
        <div className="count-container">
          <h2 className="count">
            {printingCard ? data?.tag_count || 0 : data?.bag_count || 0}
            {printingCard ? null : `/${data?.bag_limit}`}
          </h2>
          {printingCard ? null : (
            <Avatar onClick={bagModifyModalOpen}>
              <IoMdAdd />
            </Avatar>
          )}
        </div>
      )}
      {packerCard ? null : (
        <>
          {status > 1 ? null : (
            <>
              <div className="type">
                {printingCard ? null : (
                  <>
                    <span>Bag type: </span> {data.bag_type}
                  </>
                )}
              </div>
              {status > 0 ? null : (
                <div className="rejected">
                  <div className="count">
                    <Avatar>{data?.missed_label_count || 0}</Avatar>
                    <h6>Misprint bags</h6>
                  </div>
                  <Button variant="text" onClick={rejectModalOpen}>
                    View
                  </Button>
                </div>
              )}
            </>
          )}
          {printingCard ? null : (
            <div className="action-buttons">
              {status > 1 ? (
                <Button
                  variant="contained"
                  className="view-button"
                  onClick={() => setReverseShipmentFormOpen(data?.id)}
                >
                  Create shipment <IoMdAddCircleOutline />
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  className="view-button"
                  onClick={setDetailModalOpen}
                >
                  {status == 0
                    ? data.bag_limit === data.bag_count
                      ? 'View'
                      : 'View Details'
                    : 'Edit Shipment'}{' '}
                  {data.bag_limit === data.bag_count ? null : (
                    <BiRightArrowAlt />
                  )}
                </Button>
              )}
              {data.bag_limit === data.bag_count && status === 0 ? (
                <FrinksButton
                  variant="outlined"
                  className="view-button"
                  onClick={() => handleBagDone(data.id)}
                  text="Done"
                  style={{
                    borderTopWidth: '3px',
                    borderRightWidth: '3px',
                    borderBottomWidth: '3px',
                    borderLeftWidth: '3px',
                    padding: '5px 15px',
                    width: '48%',
                    height: '35px'
                  }}
                />
              ) : null}
            </div>
          )}
        </>
      )}
      {packerCard ? (
        <div className="progress-container">
          <div className="progress-bar">
            <LinearProgress
              variant="determinate"
              value={Math.min((data.count * 100) / PACKER_LIMIT, 100)}
            />
          </div>
          <div className="productivity">
            <span className="bold">Productivity:&nbsp;</span>
            <span>
              {
                getStatus(Math.min((data.count * 100) / PACKER_LIMIT, 100))
                  .status
              }
            </span>
          </div>
        </div>
      ) : null}
    </Container>
  );
};

AnalyticsCard.propTypes = {
  // isError: PropTypes.bool,
  printingCard: PropTypes.bool,
  packerCard: PropTypes.bool,
  data: PropTypes.any,
  rejectModalOpen: PropTypes.func,
  bagModifyModalOpen: PropTypes.func,
  setDetailModalOpen: PropTypes.func,
  loaderCard: PropTypes.bool,
  setReverseShipmentFormOpen: PropTypes.func,
  handleBagDone: PropTypes.func
};

export default AnalyticsCard;
