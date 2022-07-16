import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Button, TextField } from '@material-ui/core';
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
    justifyContent: 'center'
  },
  paper: {
    position: 'relative',
    background: 'white',
    padding: '20px 40px',
    color: 'black',
    fontSize: '15px',
    borderRadius: '8px',
    marginTop: '30px',
    minWidth: '650px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& h3': {
      color: theme.palette.trypanBlue.main,
      fontWeight: '900'
    },
    '& .MuiButton-label': {
      fontWeight: '900',
      color: '#646464'
    }
  },
  btnContainer: {
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .MuiButton-root': {
      padding: '5px 20px'
    }
  },
  children: {
    padding: '20px 0',
    '& p': {
      fontSize: '18px',
      opacity: '0.6',
      fontWeight: '500',
      height: '80px'
    }
  },
  counterContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& .MuiFormControl-root': {
      width: '90px',
      margin: '0 10px'
    },
    '& .MuiOutlinedInput-input': {
      padding: '10px'
    },
    '& .MuiInputBase-root': {
      fontSize: '25px'
    },
    '& span': {
      cursor: 'pointer'
    }
  },
  division: {
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 'thin',
    borderBottomWidth: 0,
    marginBottom: '15px'
  }
}));

const InfoModal = ({
  open,
  close,
  title,
  children,
  hideConfirm,
  handleSubmit,
  buttonText,
  bagCount,
  showDivision,
  onlyBags,
  transactionId,
  currentCount,
  handleStop
}) => {
  const classes = useStyles();
  const [newBagCount, setNewBagCount] = useState(bagCount);

  const handleFormSubmit = async () => {
    await handleSubmit({
      transaction_id: transactionId,
      new_bag_count: newBagCount
    });
  };

  const handleFormStop = async () => {
    await handleStop({
      transaction_id: transactionId
    });
  };

  return (
    <Modal
      open={open}
      closeAfterTransition
      className={classes.modal}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <div
          className={classes.paper}
          style={{ minHeight: `${onlyBags ? '197px' : '250px'}` }}
        >
          <div className={classes.header}>
            <div className="title">
              <h3>{title}</h3>
            </div>
            <div className={classes.closeBtn}>
              <Button variant="text" onClick={() => close()}>
                X Close
              </Button>
            </div>
          </div>
          <div className={classes.children}>{children}</div>
          {showDivision && !onlyBags ? (
            <hr className={classes.division} />
          ) : null}
          {!hideConfirm ? (
            <div className={classes.btnContainer}>
              {bagCount ? (
                <div className={classes.counterContainer}>
                  <Image
                    src="subtract_KLMfUKuhe.svg"
                    loader={ImageKitLoader}
                    layout="fixed"
                    height={40}
                    width={40}
                    onClick={() =>
                      setNewBagCount(Math.max(1, parseInt(newBagCount - 1, 10)))
                    }
                  />
                  <TextField
                    type="number"
                    variant="outlined"
                    value={newBagCount}
                    onChange={e => setNewBagCount(e.target.value)}
                  />
                  <Image
                    src="add_W7hvn9BT_.svg"
                    loader={ImageKitLoader}
                    layout="fixed"
                    height={40}
                    width={40}
                    onClick={() =>
                      setNewBagCount(parseInt(newBagCount + 1, 10))
                    }
                  />
                </div>
              ) : (
                <div />
              )}
              <div>
                {onlyBags ? (
                  <FrinksButton
                    text={currentCount >= bagCount ? 'Done' : 'Stop'}
                    onClick={handleFormStop}
                    variant="outlined"
                    style={{ marginRight: '10px' }}
                  />
                ) : null}
                <FrinksButton
                  text={buttonText || 'Confirm'}
                  onClick={handleFormSubmit}
                />
              </div>
            </div>
          ) : null}
        </div>
      </Fade>
    </Modal>
  );
};

InfoModal.propTypes = {
  open: PropTypes.any,
  close: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.any,
  hideConfirm: PropTypes.bool,
  handleSubmit: PropTypes.func,
  buttonText: PropTypes.string,
  bagCount: PropTypes.number,
  showDivision: PropTypes.bool,
  onlyBags: PropTypes.bool,
  transactionId: PropTypes.any,
  currentCount: PropTypes.any,
  handleStop: PropTypes.any
};
export default InfoModal;
