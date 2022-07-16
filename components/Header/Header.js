import Image from 'next/image';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Popper, Fade } from '@material-ui/core';
import { BsFillTriangleFill } from 'react-icons/bs';

import { LogoutQuery } from 'reactQueries/authQueries';
import ImageKitLoader from 'utils/ImageLoader';
import { removeLocalStorage } from 'utils/storage';
import { GlobalContext } from 'context/GlobalContext';
import PropTypes from 'prop-types';
import Container from './Header.styles';

const Header = ({
  openShipmentForm,
  openMaintenanceForm,
  openNotificationForm,
  maintenanceForm
}) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const logoutMutation = LogoutQuery();
  const { setUserData } = useContext(GlobalContext);

  useEffect(() => {
    if (logoutMutation?.isSuccess) {
      setUserData({ isLoggedIn: false });
      removeLocalStorage('jwt');
      router.replace('/login');
    }
  }, [logoutMutation?.isSuccess, router, setUserData]);

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
        <div className="links">
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
                  <div
                    className="logout-container"
                    onClick={() => logoutMutation.mutate({})}
                    onKeyPress={() => logoutMutation.mutate({})}
                    tabIndex={0}
                    role="button"
                  >
                    Logout
                    <Image
                      src="UploadSimple_nuAcn_fBm.svg"
                      loader={ImageKitLoader}
                      layout="fixed"
                      height={20}
                      width={20}
                    />
                  </div>
                </div>
              </Fade>
            )}
          </Popper>
        </div>
      </nav>
    </Container>
  );
};

Header.propTypes = {
  openShipmentForm: PropTypes.func,
  openMaintenanceForm: PropTypes.func,
  openNotificationForm: PropTypes.func,
  maintenanceForm: PropTypes.func
};

export default Header;
