import Image from 'next/image';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Hidden, Button, Popper, Fade } from '@material-ui/core';
import { BsFillTriangleFill } from 'react-icons/bs';
import { IoIosMenu } from 'react-icons/io';

import ImageKitLoader from 'utils/ImageLoader';
import PropTypes from 'prop-types';
import BypassSystem from 'components/BypassSystem';
import { GlobalContext } from 'context/GlobalContext';
import Container from './Header.styles';
import HeaderDrawer from './HeaderDrawer';

function Header({
  openShipmentForm,
  openMaintenanceForm,
  openNotificationForm,
  maintenanceForm
}) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [headerDropDownVisible, setHeaderDropDownVisible] = useState(false);
  const [bypassSystem, setBypassSystem] = useState(false);

  const { trippingStatus, setTrippingStatus, beltTrippingEnabled } =
    useContext(GlobalContext);

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  return (
    <Container>
      <nav>
        <div
          className="logo"
          href="/"
          onClick={() => router.push('/')}
          onKeyPress={() => router.push('/')}
          role="button"
          tabIndex={0}
        >
          <Image
            src="high_res_logo.svg"
            loader={ImageKitLoader}
            objectFit="cover"
            layout="fill"
          />
        </div>

        <Hidden smDown>
          <div className="links">
            {beltTrippingEnabled && (
              <Button
                variant="contained"
                color="primary"
                className={trippingStatus ? 'red-button' : 'purple-button'}
                onClick={() => setBypassSystem(true)}
              >
                <p className="button-label">
                  {trippingStatus ? 'BYPASSED' : 'BYPASS SYSTEM'}
                </p>
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={() => openShipmentForm()}
            >
              <p className="button-label">+ NEW SHIPMENT</p>
            </Button>
            {/* <Button
              variant="contained"
              color="primary"
              className="purple-button"
              onClick={() => maintenanceForm()}
            >
              <p className="button-label">+ NEW MAINTENANCE TICKET</p>
            </Button> */}
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
            <Button className="menu-button" onClick={handleClick}>
              <Image
                src="DotsThreeOutlineVertical_yfCTGQ8ny.svg"
                loader={ImageKitLoader}
                layout="fixed"
                height={20}
                width={20}
              />
            </Button>
            <Popper
              id={id}
              open={open}
              anchorEl={anchorEl}
              transition
              placement="bottom-end"
              disablePortal
              modifiers={{
                flip: {
                  enabled: false
                },
                preventOverflow: {
                  enabled: true,
                  boundariesElement: 'viewport'
                }
              }}
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <div className="popper">
                    <span style={{ cursor: 'pointer' }}>
                      <BsFillTriangleFill className="arrow" />
                      Need Help?
                    </span>
                    <hr />
                  </div>
                </Fade>
              )}
            </Popper>
          </div>
        </Hidden>

        <Hidden mdUp>
          <Button
            className="hamburger-menu"
            onClick={() => setHeaderDropDownVisible(true)}
          >
            <IoIosMenu />
          </Button>
          close
        </Hidden>
      </nav>
      <Hidden mdUp>
        <HeaderDrawer
          open={headerDropDownVisible}
          close={() => setHeaderDropDownVisible(false)}
          openShipmentForm={openShipmentForm}
          openMaintenanceForm={openMaintenanceForm}
          openNotificationForm={openNotificationForm}
          maintenanceForm={maintenanceForm}
          // bypassSystem={bypassSystem}
        />
      </Hidden>
      {bypassSystem ? (
        <BypassSystem
          open={bypassSystem}
          close={() => setBypassSystem(false)}
          trippingStatus={trippingStatus}
          setTrippingStatus={e => setTrippingStatus(e)}
        />
      ) : null}
    </Container>
  );
}

Header.propTypes = {
  openShipmentForm: PropTypes.func,
  openMaintenanceForm: PropTypes.func,
  openNotificationForm: PropTypes.func,
  maintenanceForm: PropTypes.func,
  bypassSystem: PropTypes.bool,
  Closebypass: PropTypes.func
};

export default Header;
