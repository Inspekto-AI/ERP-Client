import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GrFlag } from 'react-icons/gr';
import { IoMdAdd } from 'react-icons/io';
import { Avatar, Button, Grid, LinearProgress } from '@material-ui/core';
import { BiRightArrowAlt } from 'react-icons/bi';
import { msToTime } from 'utils/globalFunctions';
import { PACKER_LIMIT } from 'utils/constants';
import Container from './AnalyticsCard.styles';
import FrinksButton from 'components/FrinksButton';
import Image from 'next/image';
import ImageKitLoader from 'utils/ImageLoader';

export const getStatus = progressPercentage => {
  if (progressPercentage <= 20) {
    return { colorCode: '#FF3945', status: 'Poor' };
  }
  if (progressPercentage <= 40) {
    return { colorCode: '#F9D907', status: 'Better' };
  }
  if (progressPercentage <= 60) {
    return { colorCode: '#00B2CF', status: 'Good' };
  }
  if (progressPercentage <= 80) {
    return { colorCode: '#8264C0', status: 'Average' };
  }
  return { colorCode: '#00C1A3', status: 'Excellent' };
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
  handleBagDone,
  filter
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
      countReached={data.bag_limit <= data.bag_count}
      printingCard={printingCard}
    >
      {' '}
      <div className="error">
        {' '}
        <div className="title">
          {' '}
          <GrFlag />
          Error Occured{' '}
        </div>
        <div className="know-more-button">
          <p>Know more</p>{' '}
        </div>{' '}
      </div>
      <div className="head" style={{ flexDirection: 'row' }}>
        <div className="id-container">
          <div className="status" />{' '}
          <div className="id">
            {' '}
            {packerCard ? (
              <p> {data?.id}</p>
            ) : (
              <>
                {' '}
                {printingCard || packerCard ? null : (
                  <div className="bag-id">
                    <div
                      style={{
                        display: 'flex',
                        marginLeft: '2px',
                        alignItems: 'center'
                      }}>
                      {' '}
                      <span>{data?.vehicle_id}&nbsp;</span>{' '}
                      {data?.vehicle_type === 1 ? (
                        <Image
                          src="freight-wagon(1).png"
                          alt="(Wl)"
                          loader={ImageKitLoader}
                          layout="fixed"
                          height={22}
                          width={22}
                        />
                      ) : (
                        <Image
                          src="van.png"
                          alt="(TL)"
                          loader={ImageKitLoader}
                          layout="fixed"
                          height={22}
                          width={22}
                        />
                      )}{' '}
                    </div>{' '}
                  </div>
                )}
                {status < 2 && loaderCard ? (
                  <p className="tag-id">{data?.printing_id}</p>
                ) : printingCard ? (
                  <p className="tag-id">{data?.printing_id}</p>
                ) : null}{' '}
              </>
            )}{' '}
          </div>
        </div>{' '}
        <div className="timer">
          {' '}
          {printingCard || status > 1 ? null : (
            <>
              {' '}
              {data?.count_finished_at
                ? msToTime(data?.count_finished_at - data?.created_at)
                : timeDifference}{' '}
            </>
          )}{' '}
        </div>
      </div>
      {status === 0 && !printingCard && (
        <div
          className="rejected"
          style={{
            top: '75px',
            justifyContent: 'center'
          }}
        >
          <div className="count">
            <h6>
              {' '}
              {data?.vehicle_type === 1
                ? `Wagon No.- ${data?.wagon_no}`
                : `Truck No.- ${data?.licence_number}`}{' '}
            </h6>
          </div>
        </div>
      )}
      {status > 1 ? null : (
        <div className="count-container">
          <h2 className="count">
            {' '}
            {printingCard ? data?.tag_count || 0 : data?.bag_count || 0}
            {printingCard ? null : `/${data?.bag_limit || '0'}`}{' '}
          </h2>
          {printingCard ? null : (
            <Avatar onClick={bagModifyModalOpen}>
              <IoMdAdd />
            </Avatar>
          )}{' '}
        </div>
      )}
      {packerCard ? null : (
        <>
          {' '}
          {status > 1 ? null : (
            <>
              <div className="type">
                {' '}
                {printingCard ? null : (
                  <>
                    <span>Bag type:</span>
                    {data.bag_type}{' '}
                  </>
                )}{' '}
              </div>
              {status > 1 ? null : (
                <div
                  className="rejected"
                  style={{
                    bottom: printingCard ? '30px' : '80px'
                  }}
                >
                  <div className="count">
                    <Avatar> {data?.missed_label_count || 0}</Avatar>
                    <h6>Rejected bags</h6>
                  </div>
                  <Button
                    variant="text"
                    onClick={rejectModalOpen}
                    style={{ backgroundColor: '#E6C5FC' }}
                  >
                    View
                  </Button>
                </div>
              )}{' '}
            </>
          )}
          {printingCard ? null : (
            <div className="action-buttons">
              {' '}
              {status > 1 ? (
                <Button
                  variant="contained"
                  className="view-button"
                  onClick={() => setReverseShipmentFormOpen(data?.id)}
                  style={{
                    color: '#008847',
                    borderColor: '#008847',
                    margin: '0px 30px'
                  }}
                >
                  Create
                </Button>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    className="view-button"
                    onClick={setDetailModalOpen}
                  >
                    {' '}
                    {status == 0
                      ? data.bag_limit <= data.bag_count
                        ? 'View'
                        : 'View Details'
                      : 'Edit'}{' '}
                    {data.bag_limit <= data.bag_count || status == 1 ? null : (
                      <BiRightArrowAlt />
                    )}{' '}
                  </Button>
                  {status == 1 && (
                    <Button
                      className="view-button"
                      variant="outlined"
                      style={{
                        color: 'white',
                        background: '#26A84A',
                        borderColor: '#008847',
                        marginLeft: '10px'
                      }}
                    >
                      Start
                    </Button>
                  )}{' '}
                </>
              )}
              {data.bag_limit <= data.bag_count && status === 0 ? (
                <FrinksButton
                  variant="filled"
                  className="view-button"
                  onClick={() =>
                    handleBagDone(
                      data?.id,
                      data?.bag_counting_belt_id,
                      data?.printing_belt_id,
                      data?.vehicle_id
                    )
                  }
                  text="Done"
                  style={{
                    borderTopWidth: '3px',
                    borderRightWidth: '3px',
                    borderBottomWidth: '3px',
                    borderLeftWidth: '3px',
                    padding: '5px 15px',
                    width: '48%',
                    height: '45px',
                    color: 'white'
                  }}
                />
              ) : null}{' '}
            </div>
          )}{' '}
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
              {' '}
              {
                getStatus(Math.min((data.count * 100) / PACKER_LIMIT, 100))
                  .status
              }{' '}
            </span>
          </div>
        </div>
      ) : null}{' '}
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
