import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Modal, Backdrop, Fade, Button, TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import FrinksButton from 'components/FrinksButton';
import theme from 'styles/theme';
import Image from 'next/image';
import ImageKitLoader from 'utils/ImageLoader';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    padding: '10px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'relative',
    background: 'white',
    padding: '20px 40px',
    color: 'black',
    fontSize: '15px',
    borderRadius: '8px',
    marginTop: '30px',
    // minWidth: '650px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& h3': {
      color: theme.palette.trypanBlue.main,
      fontWeight: '900',
    },
    '& .MuiButton-label': {
      fontWeight: '900',
      color: '#646464',
    },
  },
  btnContainer: {
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .MuiButton-root': {
      padding: '5px 20px',
    },
  },
  children: {
    padding: '20px 0',
    '& p': {
      fontSize: '18px',
      opacity: '0.6',
      fontWeight: '500',
      height: '80px',
    },
  },
  counterContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: '50px',
    '& .MuiFormControl-root': {
      width: '90px',
      margin: '0 10px',
    },
    '& .MuiOutlinedInput-input': {
      padding: '10px',
    },
    '& .MuiInputBase-root': {
      fontSize: '25px',
    },
    '& span': {
      cursor: 'pointer',
    },
  },
  division: {
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 'thin',
    borderBottomWidth: 0,
    marginBottom: '15px',
  },
  title: {
    marginRight: '65px',
  },
  commentField: {
    width: '100%',
    marginBottom: '10px',
  },
  error: {
    marginBottom: '20px',
    color: 'red',
  },
}));

function ConfirmationPreview({ data }) {
  const {
    printingId,
    loaderId,
    licenceNumber,
    wagonNo,
    rackNo,
    gateNo,
    bagType,
    bagCount,
  } = data;

  return (
    <div>
      <div className="card-info-container">
        <div className="hint-container">
          <div className="hints" style={{ marginRight: '10px' }}>
            <div className="key">Loader ID</div>
            <div className="value">{loaderId}</div>
          </div>
          <div className="hints">
            <div className="key">Printing Belt ID</div>
            <div className="value">{printingId}</div>
          </div>
        </div>
        <div className="hint-container">
          <div className="hints" style={{ marginRight: '10px' }}>
            <div className="key">Vehicle Details</div>
            <div className="value">
              {licenceNumber === ''
                ? `Wagon No.- ${wagonNo} | Rake No.- ${rackNo} | Gate/Door No.- ${gateNo}`
                : `Truck No.- ${licenceNumber}`}
            </div>
          </div>
          <div className="hints">
            <div className="key">Bags Filled</div>
            <div className="value">{bagCount}</div>
          </div>
        </div>
        <div className="hint-container">
          <div className="hints" style={{ marginRight: '10px' }}>
            <div className="key">Bag Type</div>
            <div className="value">{bagType}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoModal({
  open,
  close,
  title,
  children,
  bagCount,
  onlyBags,
  hideModify,
  buttonText,
  hideComment,
  hideConfirm,
  handleSubmit,
  currentCount,
  showDivision,
  handleBagDone,
  dataToDisplay,
}) {
  const classes = useStyles();
  const [newBagCount, setNewBagCount] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = async () => {
    // if (
    //   !dataToDisplay &&
    //   (comment === '' || newBagCount === 0 || newBagCount === '0')
    // ) {
    //   setError('* All fields are required');
    //   return;
    // }
    await handleSubmit({
      transaction_id: open.id || open.transaction_id,
      new_bag_limit: newBagCount,
      old_limit: open.bag_limit,
      comment,
    });
  };

  const handleTransactionStop = async () => {
    if (comment === '') {
      setError('* All fields are required');
      return;
    }
    handleBagDone(
      open.transaction_id || open.id,
      open?.bag_counting_belt_id,
      open?.printing_belt_id,
      open?.vehicle_id,
      open?.vehicle_type,
      comment,
    );
    close();
  };

  return (
    <Modal
      open={open}
      closeAfterTransition
      className={classes.modal}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div
          className={classes.paper}
          style={{ minHeight: `${onlyBags ? '197px' : '250px'}` }}
        >
          <div className={classes.header}>
            <div className="title">
              <h3 className={classes.title}>{title}</h3>
            </div>
            <div className={classes.closeBtn}>
              <Button variant="text" onClick={() => close()}>
                X Close
              </Button>
            </div>
          </div>
          <div className={classes.children}>
            {dataToDisplay ? (
              <ConfirmationPreview data={dataToDisplay} />
            ) : (
              children
            )}
          </div>
          {dataToDisplay || hideComment ? null : (
            <>
              <TextField
                multiline
                rows={4}
                variant="filled"
                placeholder="Enter comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={classes.commentField}
                inputProps={{ maxLength: 500 }}
                error={error !== ''}
              />
              <p className={classes.error}>{error}</p>
            </>
          )}
          {showDivision && !onlyBags ? (
            <hr className={classes.division} />
          ) : null}
          {!hideConfirm ? (
            <div className={classes.btnContainer}>
              {open.bag_limit && !hideModify ? (
                <div className={classes.counterContainer}>
                  <Image
                    src="subtract_KLMfUKuhe.svg"
                    loader={ImageKitLoader}
                    layout="fixed"
                    height={40}
                    width={40}
                    onClick={() => setNewBagCount(Math.max(1, parseInt(newBagCount, 10) - 1))}
                  />
                  <TextField
                    variant="outlined"
                    value={newBagCount}
                    onChange={(e) => {
                      if (e.target.value === '') setNewBagCount(1);
                      else if (!isNaN(e.target.value)) {
                        setNewBagCount(
                          Math.max(
                            1,
                            Math.min(parseInt(e.target.value, 10), 100),
                          ),
                        );
                      }
                    }}
                    InputProps={{
                      inputProps: { min: 1, max: 100 },
                    }}
                  />
                  <Image
                    src="add_W7hvn9BT_.svg"
                    loader={ImageKitLoader}
                    layout="fixed"
                    height={40}
                    width={40}
                    onClick={() => setNewBagCount(parseInt(newBagCount, 10) + 1)}
                  />
                </div>
              ) : (
                <div />
              )}
              {hideConfirm ? null : (
                <div>
                  {!onlyBags ? (
                    <FrinksButton
                      text={currentCount >= bagCount ? 'Done' : 'Stop'}
                      onClick={handleTransactionStop}
                      variant="outlined"
                      style={{ marginRight: '10px' }}
                    />
                  ) : null}
                  {hideModify ? null : (
                    <FrinksButton
                      text={buttonText || 'Confirm'}
                      onClick={handleFormSubmit}
                    />
                  )}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </Fade>
    </Modal>
  );
}

InfoModal.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.objectOf(PropTypes.object()),
  hideConfirm: PropTypes.bool,
  handleSubmit: PropTypes.func,
  buttonText: PropTypes.string,
  bagCount: PropTypes.number,
  showDivision: PropTypes.bool,
  onlyBags: PropTypes.bool,
  currentCount: PropTypes.number,
  handleBagDone: PropTypes.func,
  dataToDisplay: PropTypes.object,
  hideConfirm: PropTypes.bool,
};
export default InfoModal;
