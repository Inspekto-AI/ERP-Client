// import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InfoModal from 'components/InfoModal';
// import { msToTime } from 'utils/globalFunctions';

function AddMoreBagsModal({
  open,
  close,
  heading,
  onlyBags,
  handleStop,
  hideConfirm,
  handleSubmit,
  showDivision,
  hideModify,
  handleBagDone,
}) {
  // const [timeDifference, setTimeDifference] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(
  //     () => setTimeDifference(new Date(open?.created_at).toLocaleTimeString()),
  //     1000
  //   );
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [open?.created_at]);

  return (
    <InfoModal
      open={open}
      buttonText="Save"
      onlyBags={onlyBags}
      close={() => close()}
      bagCount={open.limit}
      handleStop={handleStop}
      hideModify={hideModify}
      hideConfirm={hideConfirm}
      handleSubmit={handleSubmit}
      showDivision={showDivision}
      title={heading || 'Add more bags'}
      currentCount={
        open?.is_bag_belt_active ? open?.bag_count : open?.printing_count
      }
      handleBagDone={handleBagDone}
    >
      {onlyBags ? null : (
        <div className="card-info-container">
          <div className="hint-container">
            <div className="hints" style={{ marginRight: '10px' }}>
              <div className="key">Loader ID</div>
              <div className="value">{open.vehicle_id}</div>
            </div>
            <div className="hints">
              <div className="key">Printing Belt ID</div>
              <div className="value">{open.printing_id}</div>
            </div>
          </div>
          <div className="hint-container">
            <div className="hints" style={{ marginRight: '10px' }}>
              <div className="key">Vehicle Details</div>
              <div className="value">
                {open.licence_number === ''
                  ? `Wagon No.- ${open.wagon_no} | Rake No.- ${open.rack_no} | Gate/Door No.- ${open.gate_no}`
                  : `Truck No.- ${open.licence_number}`}
              </div>
            </div>
            <div className="hints">
              <div className="key">Bags Filled</div>
              <div className="value">
                {open.bag_count}
                {' '}
                /
                {open.bag_limit}
              </div>
            </div>
          </div>
          <div className="hint-container">
            <div className="hints" style={{ marginRight: '10px' }}>
              <div className="key">Bag Type</div>
              <div className="value">{open.bag_type}</div>
            </div>
            <div className="hints">
              <div className="key">Incorrect Bags</div>
              <div className="value">{open.missed_label_count}</div>
            </div>
          </div>
        </div>
      )}
    </InfoModal>
  );
}

AddMoreBagsModal.propTypes = {
  open: PropTypes.any,
  close: PropTypes.func,
  onlyBags: PropTypes.bool,
  heading: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleStop: PropTypes.any,
  printingCard: PropTypes.bool,
  hideModify: PropTypes.bool,
  handleBagDone: PropTypes.func,
};

export default AddMoreBagsModal;
