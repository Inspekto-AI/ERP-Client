import PropTypes from 'prop-types';

import Header from 'components/Header';
import Footer from 'components/Footer';
import SettingHeader from 'components/SettingHeader';

const Layout = ({
  children,
  alternateHeader,
  title,
  counter,
  changeBackground,
  hideHeader,
  hideFooter,
  close,
  openShipmentForm,
  openMaintenanceForm,
  openNotificationForm,
  maintenanceForm,
  summaryHeader,
  disableMinimumHeight
}) => {
  return (
    <>
      {hideHeader ? null : (
        <>
          {alternateHeader ? (
            <SettingHeader
              title={title}
              counter={counter}
              close={close}
              summaryHeader={summaryHeader}
            />
          ) : (
            <Header
              openShipmentForm={openShipmentForm}
              openMaintenanceForm={openMaintenanceForm}
              openNotificationForm={openNotificationForm}
              maintenanceForm={maintenanceForm}
            />
          )}
        </>
      )}
      <div
        style={{
          background: `${changeBackground ? 'white' : '#E5E5E5'}`,
          minHeight: `${disableMinimumHeight ? 0 : '60vh'}`
        }}
      >
        {children}
      </div>
      {hideFooter ? null : <Footer />}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
  alternateHeader: PropTypes.bool,
  title: PropTypes.string,
  counter: PropTypes.number,
  changeBackground: PropTypes.bool,
  hideHeader: PropTypes.bool,
  hideFooter: PropTypes.bool,
  close: PropTypes.func,
  openShipmentForm: PropTypes.func,
  openMaintenanceForm: PropTypes.func,
  openNotificationForm: PropTypes.func,
  maintenanceForm: PropTypes.func,
  summaryHeader: PropTypes.bool,
  disableMinimumHeight: PropTypes.bool
};

export default Layout;
