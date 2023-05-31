import PropTypes from 'prop-types';

import Header from 'components/Header';
import Footer from 'components/Footer';
import SettingHeader from 'components/SettingHeader';

function Layout({
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
  disableMinimumHeight,
  viewAllFunc,
  style,
}) {
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
              viewAllFunc={viewAllFunc}
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
          minHeight: `${disableMinimumHeight ? 'auto' : '70vh'}`,
          ...style,
        }}
      >
        {children}
      </div>
      {hideFooter ? null : <Footer />}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.objectOf(PropTypes.object),
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
  disableMinimumHeight: PropTypes.bool,
  viewAllFunc: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.object),
};

export default Layout;
