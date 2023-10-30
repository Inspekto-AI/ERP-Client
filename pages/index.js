import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import { get, post, put } from 'utils/api';
import Report from 'components/Report';
import Loader from 'components/Loader';
import Layout from 'components/Layout';
import Config from 'components/Config';
import Summary from 'components/Summary';
import Container from 'styles/homepage.styles';
import Maintenance from 'components/Maintenance';
import Notification from 'components/Notification';
import PrintingAnalysis from 'components/PrintingAnalysis';
import ServiceQuery from 'reactQueries/shipmentQueries';
import SystemHealth from 'components/SystemHealth';
import { SocketContext } from 'context/SocketContext';
import InfoModal from 'components/InfoModal/InfoModal';
import { GlobalContext } from 'context/GlobalContext';
import ShipmentOverFlowModal from 'components/ShipmentOverFlowModal';
import WhatsappRecipient from 'components/WhatsAppRecipient';

import Alert from '@material-ui/lab/Alert';
import { Button } from '@material-ui/core';
import ShipmentTracking from 'components/ShipmentAnalysis';
import LoaderRelation from 'components/LoaderRelation';

function DashboardComponent({
  activeSection,
  handleBagIncrement,
  printingBelts,
  vehicleBelts,
  handleBagDone,
  handleBeltReset,
  handleNewShipment,
  handleFlag,
}) {
  // console.log(handleBeltReset);
  if (activeSection === 0) {
    return (
      <ShipmentTracking
        vehicleType={0}
        vehicleBelts={vehicleBelts}
        handleNewShipment={handleNewShipment}
        handleFlag={handleFlag}
        handleBagDone={handleBagDone}
        handleBagIncrement={handleBagIncrement}
        handleBeltReset={handleBeltReset}
      />
    );
  }
  if (activeSection === 1) {
    return (
      <ShipmentTracking
        vehicleType={1}
        vehicleBelts={vehicleBelts}
        handleNewShipment={handleNewShipment}
        handleFlag={handleFlag}
        handleBagDone={handleBagDone}
        handleBagIncrement={handleBagIncrement}
        handleBeltReset={handleBeltReset}
      />
    );
  }
  if (activeSection === 2) {
    return <PrintingAnalysis printingBelts={printingBelts} handleBeltReset={handleBeltReset} />;
  }
  if (activeSection === 3) {
    return <Summary />;
  }
  if (activeSection === 4) {
    return <Report />;
  }
  if (activeSection === 5) {
    return <SystemHealth />;
  }
  return <LoaderRelation />;
}

function Index() {
  const serviceMutation = ServiceQuery();
  const socket = useContext(SocketContext);
  const [isLoading, setIsLoading] = useState(false);
  const [printingBelts, setPrintingBelts] = useState({});
  const [vehicleBelts, setVehicleBelts] = useState(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [shipmentFormOpen, setShipmentFormOpen] = useState(false);
  const [maintenanceFormOpen, setMaintenanceFormOpen] = useState(false);
  const [notificationsFormOpen, setNotificationsFormOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [reverseShipmentFormOpen, setReverseShipmentFormOpen] = useState(null);
  const [missPrintTransactionId, setmissPrintTransactionId] = useState({});
  const [alertCounter, setAlertCounter] = useState(0);
  const [shipmentError, setShipmentError] = useState(null);
  const [bagDoneModalOpen, setBagDoneModalOpen] = useState(null);
  const [bagIncrementModalOpen, setBagIncrementModalOpen] = useState(null);
  const [showTruckLoader, setShowTruckLoader] = useState(true);
  const [showWagonLoader, setShowWagonLoader] = useState(true);
  const [showPrinting, setShowPrinting] = useState(true);

  const {
    setBeltTrippingEnabled,
    deactivatePrintingSolution: DEACTIVATE_PRINTING_SOLUTION,
    setShipmentOverflow,
    shipmentOverflow,
    isQfullError,
    setIsQfullError,
  } = useContext(GlobalContext);

  const handleBeltReset = async (id, bag_counting_belt_id, printing_belt_id, transaction_id) => {
    try {
      const data = await put('/api/shipment/reset-belt', {
        belt_id: printing_belt_id || bag_counting_belt_id || id,
        transaction_id,
      });
      if (data?.data?.data?.error) {
        setShipmentError(data?.data?.data?.error);
        setShipmentOverflow(true);
      }
      // on success reset belt
      if (bag_counting_belt_id) {
        setVehicleBelts((prevState) => {
          if (!prevState) return null;
          const newState = { ...prevState };
          if (newState[bag_counting_belt_id]) {
            newState[bag_counting_belt_id] = {
              ...newState[bag_counting_belt_id],
              is_belt_running: true,
              issue_with_belt: null,
              is_shipment_complete: false,
            };
          }
          return newState;
        });
      } else {
        setPrintingBelts((prevState) => {
          if (!prevState) return null;
          return {
            ...prevState,
            [printing_belt_id || id]: {
              ...prevState[printing_belt_id || id],
              is_belt_running: true,
            },
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBagDone = async (
    transaction_id,
    vehicle_id,
    printing_belt_id,
    machine_id,
    vehicle_type,
    comment,
    current_count,
    bag_limit,
  ) => {
    if (typeof current_count !== 'undefined' && typeof bag_limit !== 'undefined') {
      if (current_count < bag_limit) {
        setBagDoneModalOpen({
          transaction_id,
          vehicle_id,
          printing_belt_id,
          machine_id,
          vehicle_type,
        });
        return;
      }
    }
    setIsLoading(true);
    await put('/api/shipment/done', {
      transaction_id,
      comment,
      vehicle_id,
      printing_belt_id,
      machine_id,
      vehicle_type,
    });
  };

  const handleNewShipment = async (data) => {
    serviceMutation.mutate(data);
  };

  const alertsnooze = (e) => {
    const transactiondata = missPrintTransactionId;
    delete transactiondata[e];
    setmissPrintTransactionId(transactiondata);
    setAlertCounter((prevState) => prevState - 1);
  };

  useEffect(() => {
    if (serviceMutation.isSuccess) {
      serviceMutation.reset();
      setShipmentFormOpen(false);
      setReverseShipmentFormOpen(null);
    } else if (serviceMutation.isError) {
      serviceMutation.reset();
      setShipmentOverflow(true);
      setShipmentError(serviceMutation?.error?.response?.data?.message);
      setShipmentFormOpen(false);
      setReverseShipmentFormOpen(null);
    }
  }, [serviceMutation]);

  const handleBagIncrement = async (data, flag) => {
    if (flag === true) {
      // console.log('hey');
      setBagIncrementModalOpen(data);
      return;
    }
    setIsLoading(true);
    try {
      await post('/api/shipment/bag-change', data);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getActiveTransactions = async () => {
      const res = await get('/api/shipment');
      setPrintingBelts(res?.data?.data?.printingBeltRes);
      setVehicleBelts(res?.data?.data?.vehicleBeltRes);
      setBeltTrippingEnabled(res?.data?.data?.enableBeltTripping);
      setShowPrinting(!res?.data?.data?.showPrinting);
      setShowTruckLoader(res?.data?.data?.showLoader === 0 && res?.data?.data.truckLoaders > 0);
      setShowWagonLoader(res?.data?.data?.showLoader === 0 && res?.data?.data.wagonLoaders > 0);

      // console.log(res?.data?.data.truckLoaders);
      // setShowTruckLoader(
      //   res?.data?.data.truckLoaders === 0 ? false : showTruckLoader
      // );
      // setShowWagonLoader(
      //   res?.data?.data.wagonLoaders === 0 ? false : showWagonLoader
      // );
    };
    getActiveTransactions();
    // console.log(showTruckLoader, showWagonLoader, showPrinting);
    // if (!showTruckLoader && showWagonLoader) {
    //   setActiveSection(1);
    // } else if (!showTruckLoader && !showWagonLoader && showPrinting) {
    //   setActiveSection(2);
    // } else if (!showTruckLoader && !showWagonLoader && !showPrinting) {
    //   setActiveSection(3);
    // }
  }, []);

  useEffect(() => {
    // console.log(showTruckLoader, showWagonLoader, showPrinting);
    if (!showTruckLoader && showWagonLoader) {
      setActiveSection(1);
    } else if (!showTruckLoader && !showWagonLoader && showPrinting) {
      setActiveSection(2);
    } else if (!showTruckLoader && !showWagonLoader && !showPrinting) {
      setActiveSection(3);
    }
  }, [showTruckLoader, showWagonLoader, showPrinting]);

  useEffect(() => {
    socket.on('bag-entry', (data) => {
      if (data?.error) {
        setShipmentError(data?.error);
        setShipmentOverflow(true);
      }
      setVehicleBelts((prevState) => {
        if (!prevState) return null;
        const newState = { ...prevState };
        if (newState[data?.belt_id]) {
          newState[data?.belt_id] = {
            ...newState[data?.belt_id],
            bag_count: data?.count,
          };
        }
        return newState;
      });
    });
    socket.on('tag-entry', (data) => {
      const transaction_id = parseInt(data?.transaction_id, 10);
      const belt_id = data?.belt_id;
      if (data.transactionMissed > 0 && data.transactionMissed % 10 === 0) {
        setAlertCounter((prevState) => prevState + 1);
        setmissPrintTransactionId((prevState) => ({
          ...prevState,
          [transaction_id]: {
            belt_id,
            machine_id: belt_id,
            missed_count: data?.transactionMissed,
          },
        }));
      }
      setPrintingBelts((prevState) => {
        if (!prevState) return null;
        return {
          ...prevState,
          [belt_id]: {
            ...prevState[belt_id],
            tag_count: data?.count,
            missed_label_count: data?.missed_count,
          },
        };
      });
    });
    socket.on('tag-entry-deactivated', (data) => {
      const belt_id = data?.belt_id;
      setPrintingBelts((prevState) => {
        if (!prevState) return null;
        return {
          ...prevState,
          [belt_id]: {
            ...prevState[belt_id],
            tag_count: data?.count,
            missed_label_count: data?.missed_count,
          },
        };
      });
    });
    socket.on('service', (data) => {
      if (data?.error) {
        setShipmentError(data?.error);
        setShipmentOverflow(true);
      }
      setVehicleBelts((prevState) => {
        if (!prevState) return null;
        const newState = { ...prevState };
        if (newState[data?.vehicle_id]) {
          newState[data?.vehicle_id] = {
            ...newState[data?.vehicle_id],
            shipment_id: data?.transaction_id,
            wagon_no: data?.wagon_no,
            licence_number: data?.licence_number,
            bag_type: data?.bag_type,
            bag_limit: data?.bag_limit,
            bag_count: data?.bag_count,
            created_at: data?.created_at,
            state: data?.state,
            is_belt_running: true,
          };
        }
        return newState;
      });
    });
    socket.on('background-reset', () => {
      setPrintingBelts((prevState) => {
        if (!prevState) return null;
        const newState = {};
        Object.keys(prevState).forEach((e) => {
          newState[e] = {
            printing_id: prevState[e]?.printing_id,
            missed_label_count: 0,
            tag_count: 0,
            id: e,
          };
        });
        return newState;
      });
    });
    // socket.on('release-belt', () => {
    //   console.log("Feature removed --- Release Maintenence Belt");
    // });
    socket.on('bag-done', (data) => {
      if (data?.error) {
        setShipmentError(data?.error);
        setShipmentOverflow(true);
      }
      const { vehicle_id, vehicle_type } = data;
      setVehicleBelts((prevState) => {
        if (!prevState) return null;
        const newState = { ...prevState };
        if (newState[vehicle_id]) {
          newState[vehicle_id] = {
            id: vehicle_id,
            vehicle_id,
            vehicle_type,
            is_active: 1,
          };
        }
        return newState;
      });
      setIsLoading(false);
    });
    socket.on('shipment-complete', (data) => {
      const { belt_id } = data;
      setVehicleBelts((prevState) => {
        if (!prevState) return null;
        const newState = { ...prevState };
        if (newState[belt_id]) {
          newState[belt_id] = {
            ...newState[belt_id],

            is_belt_running: false,
            is_shipment_complete: true,
          };
        }
        return newState;
      });
      setIsLoading(false);
    });
    socket.on('bag-update', (data) => {
      if (data?.error) {
        setShipmentError(data?.error);
        setShipmentOverflow(true);
      }
      setVehicleBelts((prevState) => {
        if (!prevState) return null;
        const newState = { ...prevState };
        if (newState[data?.belt_id]) {
          newState[data?.belt_id] = {
            ...newState[data?.belt_id],
            bag_limit: parseInt(data?.new_bag_limit, 10),
            is_shipment_complete: false,
            is_belt_running: true,
          };
        }
        return newState;
      });
      setIsLoading(false);
    });
    socket.on('tripping_belt', ({ belt_id, issue_with_belt }) => {
      setPrintingBelts((prevState) => {
        if (!prevState) return null;
        return {
          ...prevState,
          [belt_id]: {
            ...prevState[belt_id],
            is_belt_running: false,
            issue_with_belt,
          },
        };
      });
    });
    socket.on('bag-congestion-frontend', ({ belt_id, issue_with_belt, error }) => {
      console.log('bag congestion:', { belt_id, issue_with_belt, error });
      if (error) {
        setShipmentError(error);
        setShipmentOverflow(true);
      }
      setVehicleBelts((prevState) => {
        if (!prevState) return null;
        const newState = { ...prevState };
        if (newState[belt_id]) {
          newState[belt_id] = {
            ...newState[belt_id],
            is_belt_running: false,
            issue_with_belt,
          };
        }
        return newState;
      });
    });
    socket.on('qfull', (data) => {
      setIsQfullError(data?.error);
    });
  }, [socket]);

  if (shipmentFormOpen || reverseShipmentFormOpen) {
    return (
      <Config
        close={() => setShipmentFormOpen(false)}
        handleSubmit={handleNewShipment}
        reverseShipmentFormOpen={reverseShipmentFormOpen}
        setReverseShipmentFormOpen={(e) => setReverseShipmentFormOpen(e)}
      />
    );
  }

  if (maintenanceFormOpen) {
    return <Maintenance close={() => setMaintenanceFormOpen(false)} />;
  }

  if (notificationsFormOpen) {
    return <Notification close={() => setNotificationsFormOpen(false)} />;
  }

  return (
    <>
      {shipmentOverflow && (
        <ShipmentOverFlowModal
          open={shipmentOverflow}
          close={() => {
            setShipmentOverflow(false);
          }}
          error={shipmentError}
        />
      )}
      {isQfullError && (
        <ShipmentOverFlowModal
          open={isQfullError}
          close={() => {
            setIsQfullError(false);
          }}
          error={isQfullError}
        />
      )}
      <Layout
        openShipmentForm={() => setShipmentFormOpen(true)}
        openMaintenanceForm={() => setMaintenanceFormOpen(true)}
        openNotificationForm={() => setNotificationsFormOpen(true)}
      >
        <Container>
          {isLoading ? <Loader /> : null}
          <div className="trackbar" data-testid="trackbar">
            {showTruckLoader && (
              <div
                className={`option ${activeSection === 0 ? 'active' : ''}`}
                onClick={() => setActiveSection(0)}
                onKeyPress={() => setActiveSection(0)}
                role="button"
                tabIndex={0}
              >
                <h6 style={{ textAlign: 'center' }}>Truck Loader</h6>
              </div>
            )}
            {showWagonLoader && (
              <div
                className={`option ${activeSection === 1 ? 'active' : ''}`}
                onClick={() => setActiveSection(1)}
                onKeyPress={() => setActiveSection(1)}
                role="button"
                tabIndex={0}
              >
                <h6 style={{ textAlign: 'center' }}>Wagon Loader</h6>
              </div>
            )}
            {/* {DEACTIVATE_PRINTING_SOLUTION */}
            {!showPrinting ? null : (
              <div
                className={`option ${activeSection === 2 ? 'active' : ''}`}
                onClick={() => setActiveSection(2)}
                onKeyPress={() => setActiveSection(2)}
                role="button"
                tabIndex={0}
                data-testid={'printing_belt'}
              >
                <h6 style={{ textAlign: 'center' }}>Printing belt</h6>
              </div>
            )}
            <div
              className={`option ${activeSection === 3 ? 'active' : ''}`}
              onClick={() => setActiveSection(3)}
              onKeyPress={() => setActiveSection(3)}
              role="button"
              tabIndex={0}
            >
              <h6 style={{ textAlign: 'center' }}>Summary</h6>
            </div>
            <div
              className={`option ${activeSection === 4 ? 'active' : ''}`}
              onClick={() => setActiveSection(4)}
              onKeyPress={() => setActiveSection(4)}
              role="button"
              tabIndex={0}
            >
              <h6 style={{ textAlign: 'center' }}>Reports</h6>
            </div>
            <div
              className={`option ${activeSection === 5 ? 'active' : ''}`}
              onClick={() => setActiveSection(5)}
              onKeyPress={() => setActiveSection(5)}
              role="button"
              tabIndex={0}
            >
              <h6 style={{ textAlign: 'center' }}>System Health</h6>
            </div>
            <div
              className={`option ${activeSection === 6 ? 'active' : ''}`}
              onClick={() => setActiveSection(6)}
              onKeyPress={() => setActiveSection(6)}
              role="button"
              tabIndex={0}
            >
              <h6 style={{ textAlign: 'center' }}>Loader Relation</h6>
            </div>
          </div>
          <DashboardComponent
            activeSection={activeSection}
            handleBagIncrement={handleBagIncrement}
            printingBelts={printingBelts}
            vehicleBelts={vehicleBelts}
            setReverseShipmentFormOpen={(e) => setReverseShipmentFormOpen(e)}
            handleBagDone={handleBagDone}
            handleBeltReset={handleBeltReset}
            handleNewShipment={handleNewShipment}
          />
          {alertCounter !== 0 ? (
            <div className="alert">
              {Object.keys(missPrintTransactionId).map((e, index) => (
                <Alert
                  severity="warning"
                  style={{
                    backgroundColor: 'red',
                    marginBottom: '0.938em',
                    width: '500px',
                  }}
                  action={
                    <Button
                      color="inherit"
                      size="small"
                      onClick={() => alertsnooze(e)}
                      style={{ backgroundColor: 'white' }}
                    >
                      Snooze
                    </Button>
                  }
                  key={index}
                >
                  {`${missPrintTransactionId[e].missed_count} misprint bags passed from - ${missPrintTransactionId[e].machine_id}`}
                </Alert>
              ))}
            </div>
          ) : null}
          {infoModalOpen ? (
            <InfoModal
              open={infoModalOpen}
              close={() => setInfoModalOpen(false)}
              title="Confirm changes"
            >
              <>
                <p>Do you want to go ahead and save the changes you made?</p>
              </>
            </InfoModal>
          ) : null}
          {bagDoneModalOpen ? (
            <InfoModal
              open={bagDoneModalOpen}
              close={() => setBagDoneModalOpen(null)}
              handleBagDone={handleBagDone}
              title="Stop Shipment?"
              hideModify
            />
          ) : null}

          {bagIncrementModalOpen ? (
            <InfoModal
              open={bagIncrementModalOpen}
              close={() => setBagIncrementModalOpen(null)}
              handleBagDone={handleBagIncrement}
              title="Increase Bags"
              hideModify
              incrementModal
            />
          ) : null}
        </Container>
      </Layout>
    </>
  );
}

DashboardComponent.propTypes = {
  activeSection: PropTypes.number,
  handleBagIncrement: PropTypes.func,
  printingBelts: PropTypes.any,
  vehicleBelts: PropTypes.any,
  handleBagDone: PropTypes.func,
  handleBeltReset: PropTypes.func,
};

export default Index;
