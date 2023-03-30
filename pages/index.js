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
import { ServiceQuery } from 'reactQueries/shipmentQueries';
import PackerAnalysis from 'components/PackerAnalysis';
import SystemHealth from 'components/SystemHealth';
import { IS_AWS_FRONTEND, DEACTIVATE_PRINTING_SOLUTION } from 'utils/constants';
import { SocketContext } from 'context/SocketContext';
import LoaderAnalysis from 'components/LoaderAnalysis';
import InfoModal from 'components/InfoModal/InfoModal';
import { useState, useContext, useEffect } from 'react';

import Alert from '@material-ui/lab/Alert';
import { Button } from '@material-ui/core';

const DashboardComponent = ({
  activeSection,
  // activeTransactions,
  handleBagIncrement,
  handleStop,
  printingBelts,
  backgroundTransactions,
  vehicleBelts,
  setReverseShipmentFormOpen,
  ongoingTransactions,
  queuedTransactions,
  handleBagDone
}) => {
  if (activeSection === 0) {
    return (
      <LoaderAnalysis
        vehicleBelts={vehicleBelts}
        backgroundTransactions={backgroundTransactions}
        setReverseShipmentFormOpen={setReverseShipmentFormOpen}
        ongoingTransactions={ongoingTransactions}
        queuedTransactions={queuedTransactions}
        handleBagIncrement={handleBagIncrement}
        handleBagDone={handleBagDone}
      />
    );
  }
  if (activeSection === 1) {
    return (
      <PrintingAnalysis
        printingBelts={printingBelts}
        backgroundTransactions={backgroundTransactions}
      />
    );
  }
  if (activeSection === 2) {
    return (
      <PackerAnalysis
        // activeTransactions={activeTransactions}
        // handleBagIncrement={handleBagIncrement}
        handleStop={handleStop}
      />
    );
  }
  if (activeSection === 3) {
    return <Summary />;
  }
  if (activeSection == 5) {
    return <SystemHealth />;
  }
  return <Report />;
};

const Index = () => {
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
  const [backgroundTransactions, setBackgroundTransactions] = useState(null);
  const [activeSection, setActiveSection] = useState(IS_AWS_FRONTEND ? 4 : 0);
  const [reverseShipmentFormOpen, setReverseShipmentFormOpen] = useState(null);
  const [missPrintTransactionId, setmissPrintTransactionId] = useState({});
  const [ongoingTransactions, setOngoingTransactions] = useState(null);
  const [queuedTransactions, setQueuedTransactions] = useState(null);
  const [alertCounter, setAlertCounter] = useState(0);

  const handleBagDone = async (
    transaction_id,
    vehicle_id,
    printing_belt_id,
    machine_id,
    vehicle_type,
    comment
  ) => {
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

  const handleNewShipment = async data => {
    serviceMutation.mutate(data);
  };

  const alertsnooze = e => {
    const transactiondata = missPrintTransactionId;
    delete transactiondata[e];
    setmissPrintTransactionId(transactiondata);
    setAlertCounter(prevState => prevState - 1);
  };

  useEffect(() => {
    if (serviceMutation.isSuccess) {
      serviceMutation.reset();
      setShipmentFormOpen(false);
      setReverseShipmentFormOpen(null);
    }
  }, [serviceMutation]);

  const handleBagIncrement = async data => {
    setIsLoading(true);
    try {
      await post('/api/transaction/bag-change', data);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleStop = async () => {
    // setIsLoading(true);
    // post('/api/transaction/belt-stop', data);
    // const updatedTransactions = activeTransactions;
    // delete updatedTransactions[data?.transaction_id];
    // setActiveTransactions(updatedTransactions);
    // setIsLoading(false);
  };

  useEffect(() => {
    const getActiveTransactions = async () => {
      const res = await get('/api/shipment');
      const backgroundTransactionsRes = res?.data?.data?.backgroundInfo;
      setBackgroundTransactions(backgroundTransactionsRes);
      setPrintingBelts(res?.data?.data?.printingBeltRes);
      setVehicleBelts(res?.data?.data?.vehicleBeltRes);
      setOngoingTransactions(res?.data?.data?.ongoingTransactions);
      setQueuedTransactions(res?.data?.data?.queuedTransactions);
    };
    getActiveTransactions();
  }, []);

  useEffect(() => {
    socket.on('bag-entry', data => {
      const transaction_id = parseInt(data?.transaction_id, 10);
      setOngoingTransactions(prevState => {
        if (!prevState) return null;
        if (prevState && Object.keys(prevState).length === 0) return {};
        if (!(transaction_id in prevState)) return prevState;
        return {
          ...prevState,
          [transaction_id]: {
            ...prevState[transaction_id],
            bag_count: data?.count
          }
        };
      });

      if (DEACTIVATE_PRINTING_SOLUTION) {
        setPrintingBelts(prevState => {
          const belt_id = parseInt(data?.belt_id, 10);
          if (!prevState) return null;
          return {
            ...prevState,
            [belt_id]: {
              ...prevState[belt_id],
              tag_count: data?.count
            }
          };
        });
      }
    });
    socket.on('tag-entry', data => {
      const transaction_id = parseInt(data?.transaction_id, 10);
      let machine_id = null;
      setOngoingTransactions(prevState => {
        if (!prevState) return null;
        if (prevState && Object.keys(prevState).length === 0) return {};
        else if (!(transaction_id in prevState)) return prevState;
        machine_id = prevState[transaction_id]?.printing_id;
        return {
          ...prevState,
          [transaction_id]: {
            ...prevState[transaction_id],
            missed_label_count: data?.transactionMissed,
            tag_count: data.tag_count
          }
        };
      });
      if (data.transactionMissed > 0 && data.transactionMissed % 10 === 0) {
        // setAlertCounter(Object.keys(missPrintTransactionId).length + 1);
        setAlertCounter(prevState => prevState + 1);

        setmissPrintTransactionId(prevState => {
          return {
            ...prevState,
            [transaction_id]: {
              belt_id: data?.belt_id,
              machine_id,
              missed_count: data?.transactionMissed
            }
          };
        });
      }
      const belt_id = data?.belt_id;
      setPrintingBelts(prevState => {
        if (!prevState) return null;
        return {
          ...prevState,
          [belt_id]: {
            ...prevState[belt_id],
            tag_count: data?.count,
            missed_label_count: data?.missed_count
          }
        };
      });
    });
    socket.on('tag-entry-deactivated', data => {
      const belt_id = data?.belt_id;
      setPrintingBelts(prevState => {
        if (!prevState) return null;
        return {
          ...prevState,
          [belt_id]: {
            ...prevState[belt_id],
            tag_count: data?.count,
            missed_label_count: data?.missed_count
          }
        };
      });
    });
    socket.on('service', data => {
      const tra_id = parseInt(data?.id, 10);
      setOngoingTransactions(prevState => {
        if (!prevState) return null;
        return {
          ...prevState,
          [tra_id]: data
        };
      });
      setVehicleBelts(prevState => {
        if (!prevState) return null;
        const newBelts = prevState.filter(e => {
          if (e.id !== data.bag_counting_belt_id) {
            return e;
          }
        });
        return newBelts;
      });
    });
    socket.on('background-reset', () => {
      setPrintingBelts(prevState => {
        if (!prevState) return null;
        const newState = {};
        Object.keys(prevState).forEach(e => {
          newState[e] = {
            printing_id: prevState[e]?.printing_id,
            missed_label_count: 0,
            tag_count: 0,
            id: e
          };
        });
        return newState;
      });
    });
    socket.on('release-belt', data => {
      const activateBelts = new Set(data.activate_loading_ids);
      const deactivateBelts = new Set(data.deactivate_loading_ids);
      setVehicleBelts(prevState => prevState?.map(e => {
        if (activateBelts.has(e?.id)) {
          return { ...e, is_active: 1 };
        }
        else if (deactivateBelts.has(e?.id)) return { ...e, is_active: 0 };
        return e;
      }));
    })

    socket.on('bag-done', (data) => {
      const { transaction_id, vehicle_id, machine_id, vehicle_type } = data;
      setOngoingTransactions(prevState => {
        const currData = { ...prevState };
        delete currData[transaction_id];
        return currData;
      });
      setVehicleBelts(prevState => {
        const currData = [...prevState];
        currData.push({
          id: vehicle_id,
          vehicle_id: machine_id,
          vehicle_type
        });
        return currData;
      });
      setIsLoading(false);
    });

    socket.on('bag-update', (data) => {
      setOngoingTransactions(prevState => {
        const updatedTransactions = Object.keys(prevState).map(e => {
          if (prevState[e].id === data.transaction_id) {
            // modify this entity
            return {
              ...prevState[e],
              bag_limit: parseInt(data?.new_bag_limit)
            };
          }
          return prevState[e];
        });
        return updatedTransactions;
      });
      setIsLoading(false);
    });
  }, [socket]);

  if (shipmentFormOpen || reverseShipmentFormOpen) {
    return (
      <Config
        close={() => setShipmentFormOpen(false)}
        handleSubmit={handleNewShipment}
        reverseShipmentFormOpen={reverseShipmentFormOpen}
        setReverseShipmentFormOpen={e => setReverseShipmentFormOpen(e)}
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
          {IS_AWS_FRONTEND ? null : (
            <>
              <div
                className={`option ${activeSection === 0 ? 'active' : ''}`}
                onClick={() => setActiveSection(0)}
                onKeyPress={() => setActiveSection(0)}
                role="button"
                tabIndex={0}
              >
                <h6 style={{ textAlign: 'center' }}>Loader belt</h6>
              </div>
              {DEACTIVATE_PRINTING_SOLUTION ? (null) : (
                <div
                  className={`option ${activeSection === 1 ? 'active' : ''}`}
                  onClick={() => setActiveSection(1)}
                  onKeyPress={() => setActiveSection(1)}
                  role="button"
                  tabIndex={0}
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
            </>
          )}
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
        </div>
        <DashboardComponent
          activeSection={activeSection}
          // activeTransactions={activeTransactions}
          handleBagIncrement={handleBagIncrement}
          handleStop={handleStop}
          printingBelts={printingBelts}
          backgroundTransactions={backgroundTransactions}
          vehicleBelts={vehicleBelts}
          setReverseShipmentFormOpen={e => setReverseShipmentFormOpen(e)}
          ongoingTransactions={ongoingTransactions}
          queuedTransactions={queuedTransactions}
          handleBagDone={handleBagDone}
        />
        {alertCounter != 0 ? (
          <div className="alert">
            {Object.keys(missPrintTransactionId).map((e, index) => {
              return (
                <Alert
                  severity="warning"
                  style={{ backgroundColor: 'red', marginBottom: '0.938em', width: '500px' }}
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
              );
            })}
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
};

DashboardComponent.propTypes = {
  activeSection: PropTypes.number,
  // activeTransactions: PropTypes.any,
  handleBagIncrement: PropTypes.func,
  handleStop: PropTypes.any,
  printingBelts: PropTypes.any,
  backgroundTransactions: PropTypes.any,
  vehicleBelts: PropTypes.any,
  setReverseShipmentFormOpen: PropTypes.func,
  ongoingTransactions: PropTypes.any,
  queuedTransactions: PropTypes.any,
  handleBagDone: PropTypes.func,
  alertsnooze: PropTypes.func
};

export default Index;
