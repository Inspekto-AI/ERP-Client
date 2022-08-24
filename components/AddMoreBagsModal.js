// import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InfoModal from 'components/InfoModal';
// import { msToTime } from 'utils/globalFunctions';

const AddMoreBagsModal = ({
  open,
  close,
  onlyBags,
  heading,
  handleSubmit,
  handleStop,
  printingCard
}) => {
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
      close={() => close()}
      title={heading || 'Add more bags'}
      buttonText="Save"
      bagCount={open.limit}
      showDivision
      onlyBags
      transactionId={open?.transaction_id}
      handleSubmit={handleSubmit}
      currentCount={
        open?.is_bag_belt_active ? open?.bag_count : open?.printing_count
      }
      handleStop={handleStop}
      printingCard={printingCard}
    >
      {onlyBags ? null : (
        <div className="card-info-container">
          <div className="hint-container">
            {printingCard ? null : (
              <div className="hints" style={{ marginRight: '10px' }}>
                <div className="key">Loader ID</div>
                <div className="value">{open.bag_machine_id}</div>
              </div>
            )}
            <div className="hints">
              <div className="key">Printing Belt ID</div>
              <div className="value">{open.tag_machine_id}</div>
            </div>
          </div>
          {open.vehicle_type === 1 ? (
            <div className="hint-container">
              {printingCard ? null : (
                <div className="hints">
                  <div className="key">Vehicle Details</div>
                  <div className="value" style={{ fontWeight: '900' }}>
                    Wagon Number | {open.gate_no} Gate
                  </div>
                </div>
              )}
            </div>
          ) : null}
          <div className="hint-container">
            {printingCard ? null : (
              <div className="hints" style={{ marginRight: '10px' }}>
                <div className="key">Vehicle Details</div>
                <div className="value">
                  {/* {open?.count_finished_at
                  ? msToTime(
                      new Date(open?.count_finished_at).getTime() -
                        new Date(open?.created_at).getTime()
                    )
                  : timeDifference} */}
                </div>
              </div>
            )}
            <div className="hints">
              <div className="key">Bags Filled</div>
              <div className="value">
                {open.printing_count}
                {printingCard ? null : <>/{open.limit}</>}
              </div>
            </div>
          </div>
          <div className="hint-container">
            {printingCard ? null : (
              <div className="hints" style={{ marginRight: '10px' }}>
                <div className="key">Bag Type</div>
                <div className="value">{open.bag_type}</div>
              </div>
            )}
            <div className="hints">
              <div className="key">Incorrect Bags</div>
              <div className="value">{open.missed_labels}</div>
            </div>
          </div>
        </div>
      )}
    </InfoModal>
  );
};

AddMoreBagsModal.propTypes = {
  open: PropTypes.any,
  close: PropTypes.func,
  onlyBags: PropTypes.bool,
  heading: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleStop: PropTypes.any,
  printingCard: PropTypes.bool
};

export default AddMoreBagsModal;
