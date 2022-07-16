import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import Image from 'next/image';
import theme from 'styles/theme';

import ImageKitLoader from 'utils/ImageLoader';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    padding: '10px',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  paper: {
    position: 'relative',
    background: theme.palette.error.main,
    padding: '20px',
    width: '95%',
    color: 'black',
    fontSize: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '10px',
    marginTop: '30px'
  },
  close: {
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    position: 'absolute'
  },
  imgContainer: {
    textAlign: 'center',
    '&:img': {
      width: '60px'
    }
  },
  button: {
    textTransform: 'capitalize',
    borderRadius: '20px',
    marginTop: '10px',
    color: 'white',
    background: 'yellow',
    '&:hover': {
      background: 'pink'
    }
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  },
  heading: {
    color: 'white',
    marginLeft: '40px'
  },
  bold: {
    fontWeight: '900'
  },
  subHeading: {
    marginTop: '20px',
    fontSize: '16px'
  },
  actionButton: {
    background: 'white',
    color: theme.palette.byzantine.main,
    fontWeight: '900',
    height: '40px',
    width: '200px',
    marginRight: '16px',
    borderRadius: '12px',

    '&:hover': {
      background: theme.palette.gradient.pink,
      color: 'white'
    }
  }
}));

const AlertModal = ({ open, close }) => {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={() => close()}
      closeAfterTransition
      className={classes.modal}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <div className={classes.title}>
            <div className="icon">
              <Image
                src="icons/bell_RT6oBFUYV.svg"
                loader={ImageKitLoader}
                layout="fixed"
                height={120}
                width={120}
              />
            </div>
            <div className={classes.heading}>
              <h4>
                Loader #6: <span className={classes.bold}>Incorrect bags</span>
              </h4>
              <p className={classes.subHeading}>
                Here is a subtitle for this table
              </p>
            </div>
          </div>
          <div>
            <Button variant="contained" className={classes.actionButton}>
              Mark Solved
            </Button>
            <Button variant="contained" className={classes.actionButton}>
              Snooze
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

AlertModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};
export default AlertModal;
