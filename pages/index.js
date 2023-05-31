import PropTypes from 'prop-types';
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
import MaintenanceForm from 'components/MaintenanceForm';
import ServiceQuery from 'reactQueries/shipmentQueries';
import PackerAnalysis from 'components/PackerAnalysis';
import SystemHealth from 'components/SystemHealth';
import { SocketContext } from 'context/SocketContext';
import LoaderAnalysis from 'components/LoaderAnalysis';
import InfoModal from 'components/InfoModal/InfoModal';
import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from 'context/GlobalContext';

import Alert from '@material-ui/lab/Alert';
import { Button } from '@material-ui/core';

function DashboardComponent({
  activeSection,
  // activeTransactions,
  handleBagIncrement,
  printingBelts,
  vehicleBelts,
  setReverseShipmentFormOpen,
  ongoingTransactions,
  queuedTransactions,
  handleBagDone,
  handleBeltReset,
}) {
  if (activeSection === 0) {
    return (
      <LoaderAnalysis
        vehicleBelts={vehicleBelts}
        setReverseShipmentFormOpen={setReverseShipmentFormOpen}
        ongoingTransactions={ongoingTransactions}
        queuedTransactions={queuedTransactions}
        handleBagIncrement={handleBagIncrement}
        handleBagDone={handleBagDone}
        handleBeltReset={handleBeltReset}
        vehicleType={0} // DISPLAY ALL TRUCKS
      />
    );
  }
  if (activeSection === 1) {
    return (
      <LoaderAnalysis
        vehicleBelts={vehicleBelts}
        setReverseShipmentFormOpen={setReverseShipmentFormOpen}
        ongoingTransactions={ongoingTransactions}
        queuedTransactions={queuedTransactions}
        handleBagIncrement={handleBagIncrement}
        handleBagDone={handleBagDone}
        handleBeltReset={handleBeltReset}
        vehicleType={1} // DISPLAY ALL WAGONS
      />
    );
  }
  if (activeSection === 2) {
    return (
      <PrintingAnalysis
        printingBelts={printingBelts}
        handleBeltReset={handleBeltReset}
      />
    );
  }
  if (activeSection === 3) {
    return (
      <PackerAnalysis />
    );
  }
  if (activeSection === 4) {
    return <Summary />;
  }
  if (activeSection === 5) {
    return <Report />;
  }
  return <SystemHealth />;
}

function Index() {
  const serviceMutation = ServiceQuery();
  const socket = useContext(SocketContext);
  const [isLoading, setIsLoading] = useState(false);
  const [printingBelts, setPrintingBelts] = useState({});
  const [vehicleBelts, setVehicleBelts] = useState(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [maintenanceForm, setMaintenanceForm] = useState(false);
  const [shipmentFormOpen, setShipmentFormOpen] = useState(false);
  const [maintenanceFormOpen, setMaintenanceFormOpen] = useState(false);
  const [notificationsFormOpen, setNotificationsFormOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [reverseShipmentFormOpen, setReverseShipmentFormOpen] = useState(null);
  const [missPrintTransactionId, setmissPrintTransactionId] = useState({});
  const [ongoingTransactions, setOngoingTransactions] = useState(null);
  const [queuedTransactions, setQueuedTransactions] = useState(null);
  const [alertCounter, setAlertCounter] = useState(0);
  const {
    setBeltTrippingEnabled,
    deactivatePrintingSolution: DEACTIVATE_PRINTING_SOLUTION,
  } = useContext(GlobalContext);

  const handleBeltReset = async (
    id,
    bagCountingBeltId,
    printingBeltId,
  ) => {
    try {
      await put('/api/shipment/reset-belt', {
        belt_id: printingBeltId || id,
      });
      // on success reset belt
      setPrintingBelts((prevState) => {
        if (!prevState) return null;
        return {
          ...prevState,
          [printingBeltId || id]: {
            ...prevState[printingBeltId || id],
            is_belt_running: true,
          },
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBagDone = async (
    transactionId,
    vehicleId,
    printingBeltId,
    machineId,
    vehicleType,
    comment,
  ) => {
    setIsLoading(true);
    await put('/api/shipment/done', {
      transaction_id: transactionId,
      comment,
      vehicle_id: vehicleId,
      printing_belt_id: printingBeltId,
      machine_id: machineId,
      vehicle_type: vehicleType,
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
    }
  }, [serviceMutation]);

  const handleBagIncrement = async (data) => {
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
      setOngoingTransactions(res?.data?.data?.ongoingTransactions);
      setQueuedTransactions(res?.data?.data?.queuedTransactions);
      setBeltTrippingEnabled(res?.data?.data?.enableBeltTripping);
    };
    getActiveTransactions();
  }, []);

  useEffect(() => {
    socket.on('bag-entry', (data) => {
      const transactionId = parseInt(data?.transactionId, 10);
      setOngoingTransactions((prevState) => {
        if (!prevState) return null;
        if (prevState && Object.keys(prevState).length === 0) return {};
        if (!(transactionId in prevState)) return prevState;
        return {
          ...prevState,
          [transactionId]: {
            ...prevState[transactionId],
            bag_count: data?.count,
          },
        };
      });

      if (DEACTIVATE_PRINTING_SOLUTION) {
        setPrintingBelts((prevState) => {
          const belt_id = parseInt(data?.belt_id, 10);
          if (!prevState) return null;
          return {
            ...prevState,
            [belt_id]: {
              ...prevState[belt_id],
              tag_count: data?.count,
            },
          };
        });
      }
    });
    socket.on('tag-entry', (data) => {
      const transactionId = parseInt(data?.transactionId, 10);
      let machineId = null;
      setOngoingTransactions((prevState) => {
        if (!prevState) return null;
        if (prevState && Object.keys(prevState).length === 0) return {};
        if (!(transactionId in prevState)) return prevState;
        machineId = prevState[transactionId]?.printing_id;
        return {
          ...prevState,
          [transactionId]: {
            ...prevState[transactionId],
            missed_label_count: data?.transactionMissed,
            tag_count: data.tag_count,
          },
        };
      });
      if (data.transactionMissed > 0 && data.transactionMissed % 10 === 0) {
        // setAlertCounter(Object.keys(missPrintTransactionId).length + 1);
        setAlertCounter((prevState) => prevState + 1);

        setmissPrintTransactionId((prevState) => ({
          ...prevState,
          [transactionId]: {
            belt_id: data?.belt_id,
            machineId,
            missed_count: data?.transactionMissed,
          },
        }));
      }
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
      const traId = parseInt(data?.id, 10);
      setOngoingTransactions((prevState) => {
        if (!prevState) return null;
        return {
          ...prevState,
          [traId]: data,
        };
      });
      setVehicleBelts((prevState) => {
        if (!prevState) return null;
        const newBelts = prevState.filter((e) => {
          if (e.id !== data.bagCountingBeltId) {
            return e;
          }
          return null;
        });
        return newBelts;
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
    socket.on('release-belt', (data) => {
      const activateBelts = new Set(data.activate_loading_ids);
      const deactivateBelts = new Set(data.deactivate_loading_ids);
      setVehicleBelts((prevState) => prevState?.map((e) => {
        if (activateBelts.has(e?.id)) {
          return { ...e, is_active: 1 };
        } if (deactivateBelts.has(e?.id)) return { ...e, is_active: 0 };
        return e;
      }));
    });

    socket.on('bag-done', (data) => {
      const {
        transactionId, vehicleId, machineId, vehicleType,
      } = data;
      setOngoingTransactions((prevState) => {
        const currData = { ...prevState };
        delete currData[transactionId];
        return currData;
      });
      setVehicleBelts((prevState) => {
        const currData = [...prevState];
        if (currData.filter((e) => e.id === vehicleId).length === 0) {
          currData.push({
            id: vehicleId,
            vehicleId: machineId,
            vehicleType,
            is_active: 1,
          });
        }
        return currData;
      });
      setIsLoading(false);
    });

    socket.on('bag-update', (data) => {
      setOngoingTransactions((prevState) => {
        const updatedTransactions = Object.keys(prevState).map((e) => {
          if (prevState[e].id === data.transactionId) {
            // modify this entity
            return {
              ...prevState[e],
              bag_limit: parseInt(data?.new_bag_limit, 10),
            };
          }
          return prevState[e];
        });
        return updatedTransactions;
      });
      setIsLoading(false);
    });

    socket.on('tripping_belt', ({ belt_id }) => {
      setPrintingBelts((prevState) => {
        if (!prevState) return null;
        return {
          ...prevState,
          [belt_id]: {
            ...prevState[belt_id],
            is_belt_running: false,
          },
        };
      });
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

  if (maintenanceForm) {
    return <MaintenanceForm close={() => setMaintenanceForm(false)} />;
  }
  return (
    <Layout
      openShipmentForm={() => setShipmentFormOpen(true)}
      openMaintenanceForm={() => setMaintenanceFormOpen(true)}
      openNotificationForm={() => setNotificationsFormOpen(true)}
      maintenanceForm={() => setMaintenanceForm(true)}
    >
      <Container>
        {isLoading ? <Loader /> : null}
        <div className="trackbar">
          <div
            className={`option ${activeSection === 0 ? 'active' : ''}`}
            onClick={() => setActiveSection(0)}
            onKeyPress={() => setActiveSection(0)}
            role="button"
            tabIndex={0}
          >
            <h6 style={{ textAlign: 'center' }}>Truck belts</h6>
          </div>
          <div
            className={`option ${activeSection === 1 ? 'active' : ''}`}
            onClick={() => setActiveSection(1)}
            onKeyPress={() => setActiveSection(1)}
            role="button"
            tabIndex={0}
          >
            <h6 style={{ textAlign: 'center' }}>Wagon belts</h6>
          </div>
          {DEACTIVATE_PRINTING_SOLUTION ? (null) : (
            <div
              className={`option ${activeSection === 2 ? 'active' : ''}`}
              onClick={() => setActiveSection(2)}
              onKeyPress={() => setActiveSection(2)}
              role="button"
              tabIndex={0}
            >
              <h6 style={{ textAlign: 'center' }}>Printing belt</h6>
            </div>
          )}
          <div
            className={`option ${activeSection === 4 ? 'active' : ''}`}
            onClick={() => setActiveSection(4)}
            onKeyPress={() => setActiveSection(4)}
            role="button"
            tabIndex={0}
          >
            <h6 style={{ textAlign: 'center' }}>Summary</h6>
          </div>
          <div
            className={`option ${activeSection === 5 ? 'active' : ''}`}
            onClick={() => setActiveSection(5)}
            onKeyPress={() => setActiveSection(5)}
            role="button"
            tabIndex={0}
          >
            <h6 style={{ textAlign: 'center' }}>Reports</h6>
          </div>
          <div
            className={`option ${activeSection === 6 ? 'active' : ''}`}
            onClick={() => setActiveSection(6)}
            onKeyPress={() => setActiveSection(6)}
            role="button"
            tabIndex={0}
          >
            <h6 style={{ textAlign: 'center' }}>System Health</h6>
          </div>
        </div>
        <DashboardComponent
          activeSection={activeSection}
          // activeTransactions={activeTransactions}
          handleBagIncrement={handleBagIncrement}
          printingBelts={printingBelts}
          vehicleBelts={vehicleBelts}
          setReverseShipmentFormOpen={(e) => setReverseShipmentFormOpen(e)}
          ongoingTransactions={ongoingTransactions}
          queuedTransactions={queuedTransactions}
          handleBagDone={handleBagDone}
          handleBeltReset={handleBeltReset}
        />
        {alertCounter !== 0 ? (
          <div className="alert">
            {Object.keys(missPrintTransactionId).map((e, index) => (
              <Alert
                severity="warning"
                style={{ backgroundColor: 'red', marginBottom: '0.938em', width: '500px' }}
                action={(
                  <Button
                    color="inherit"
                    size="small"
                    onClick={() => alertsnooze(e)}
                    style={{ backgroundColor: 'white' }}
                  >
                    Snooze
                  </Button>
                  )}
                key={index}
              >
                {`${missPrintTransactionId[e].missed_count} misprint bags passed from - ${missPrintTransactionId[e].machineId}`}
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
      </Container>
    </Layout>
  );
}

DashboardComponent.propTypes = {
  activeSection: PropTypes.number,
  // activeTransactions: PropTypes.any,
  handleBagIncrement: PropTypes.func,
  printingBelts: PropTypes.string,
  vehicleBelts: PropTypes.string,
  setReverseShipmentFormOpen: PropTypes.func,
  ongoingTransactions: PropTypes.object,
  queuedTransactions: PropTypes.object,
  handleBagDone: PropTypes.func,
  handleBeltReset: PropTypes.func,
};

export default Index;
