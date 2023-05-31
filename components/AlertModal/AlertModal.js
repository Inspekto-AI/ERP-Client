import { makeStyles } from '@material-ui/core/styles';
import {
  Modal, Backdrop, Fade, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Image from 'next/image';
import theme from 'styles/theme';

import ImageKitLoader from 'utils/ImageLoader';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    padding: '10px',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  paper: {
    position: 'relative',
    background: theme.palette.error.main,
    width: '34%',
    color: 'black',
    fontSize: '0.78125vw',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '0.625em',
    marginTop: '3.75em',
    marginLeft: '60%',
  },
  close: {
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    position: 'absolute',
  },
  imgContainer: {
    textAlign: 'center',
    '&:img': {
      width: '60px',
    },
  },
  button: {
    textTransform: 'capitalize',
    borderRadius: '1.25em',
    marginTop: '0.625em',
    color: 'white',
    background: 'yellow',
    '&:hover': {
      background: 'pink',
    },
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    marginLeft: '2.5em',
  },
  bold: {
    fontWeight: '900',
  },
  subHeading: {
    marginTop: '1.25em',
    fontSize: '0.8333333333333334vw',
  },
  actionButton: {
    background: 'white',
    color: theme.palette.byzantine.main,
    fontWeight: '900',
    height: '2.0833333333333335vw',
    width: '10.416666666666666vw',
    marginRight: '1em',
    borderRadius: '0.75em',

    '&:hover': {
      background: theme.palette.gradient.pink,
      color: 'white',
    },
  },
  h4: {
    fontSize: '1.4583333333333333vw',
    lineHeight: '1.71875vw',
  },

}));

function AlertModal({ open, close, alertsnooze }) {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={() => close()}
      closeAfterTransition
      className={classes.modal}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
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
              <h4 className={classes.h4}>
                Loader #6:
                {' '}
                <span className={classes.bold}>Incorrect bags</span>
              </h4>
              <p className={classes.subHeading}>
                Here is a subtitle for this table
              </p>
            </div>
          </div>
          <div>
            {/* <Button variant="contained" className={classes.actionButton}>
              Mark Solved
            </Button> */}
            <Button variant="contained" className={classes.actionButton} onClick={alertsnooze}>
              Snooze
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>

  // <MuiAlert
  //   className={classes.alert}
  //   open={open}
  //   // onClose={() => handleClose(alert)}
  //   id={alert.id}
  //   elevation={6}
  //   variant="filled"
  //   severity={alert.type}
  // >
  //   <AlertTitle>hello</AlertTitle>
  //   alert
  // </MuiAlert>
  );
}

AlertModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};
export default AlertModal;
