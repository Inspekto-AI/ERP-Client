import Image from 'next/image';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { IoIosMenu } from 'react-icons/io';
import { Button, Drawer, makeStyles } from '@material-ui/core';
import ImageKitLoader from 'utils/ImageLoader';
import customTheme from 'styles/theme';
import Container from './Header.styles';

const useStyles = makeStyles((theme) => ({
  item1: {
    order: 1,
    [theme.breakpoints.down('sm')]: {
      order: 2,
    },
  },
  item2: {
    order: 2,
    [theme.breakpoints.down('sm')]: {
      order: 1,
    },
  },
  circularProgress: {
    position: 'fixed',
    top: '45%',
    left: '45%',
  },
  drawer: {
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    background: customTheme.palette.royalBlue.main,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
  },
  headerImage: {
    width: '60px',
    marginLeft: '10px',
  },
  hamburgerMenuIcon: {
    fontSize: '30px',
    color: customTheme.palette.smokyWhite.main,
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  menuButton: {
    textTransform: 'capitalize',
    color: customTheme.palette.smokyWhite.main,
  },
}));

function HomepageDrawer({
  open,
  close,
  openShipmentForm,
  openMaintenanceForm,
  openNotificationForm,
  maintenanceForm,
}) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={close}
      classes={{ paper: classes.drawer }}
    >
      <Container>
        <div className={classes.header}>
          <div>
            <Image
              src="high_res_logo.svg"
              alt="Frinks"
              className={classes.headerImage}
              height={40}
              width={40}
              loader={ImageKitLoader}
              onClick={() => router.push('/')}
            />
          </div>
          <Button onClick={close}>
            <IoIosMenu className={classes.hamburgerMenuIcon} />
          </Button>
        </div>
        <div className={classes.links}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => openShipmentForm()}
          >
            <p className="button-label">+ NEW SHIPMENT</p>
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="purple-button"
            onClick={() => maintenanceForm()}
            style={{ margin: '20px 0' }}
          >
            <p className="button-label">+ NEW MAINTENANCE TICKET</p>
          </Button>
          <div className="notification">
            <div
              className="icon"
              onClick={() => openNotificationForm()}
              onKeyPress={() => openNotificationForm()}
              role="button"
              tabIndex={0}
            >
              {/* <div className="counter">20</div> */}
              <Image
                src="notification_fU5rQCmps.svg"
                loader={ImageKitLoader}
                layout="fixed"
                height={20}
                width={20}
              />
            </div>
            <hr />
            <div
              className="icon"
              onClick={() => openMaintenanceForm()}
              onKeyPress={() => openMaintenanceForm()}
              role="button"
              tabIndex={0}
            >
              {/* <div className="counter blue-counter">20</div> */}
              <Image
                src="warning_QhrmDxvk4.svg"
                loader={ImageKitLoader}
                layout="fixed"
                height={20}
                width={20}
              />
            </div>
          </div>
        </div>
      </Container>
    </Drawer>
  );
}

HomepageDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default HomepageDrawer;
