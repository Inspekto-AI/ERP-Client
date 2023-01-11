import PropTypes from 'prop-types';
import { get, post, put } from 'utils/api';
import Report from 'components/Report';
import Loader from 'components/Loader';
import Layout from 'components/Layout';
import Config from 'components/Config';
import { useRouter } from 'next/router';
import Summary from 'components/Summary';
import Container from 'styles/homepage.styles';
import Maintenance from 'components/Maintenance';
import Notification from 'components/Notification';
import PrintingAnalysis from 'components/PrintingAnalysis';
import MaintenanceForm from 'components/MaintenanceForm';
import { ServiceQuery } from 'reactQueries/shipmentQueries';
import PackerAnalysis from 'components/PackerAnalysis';
import SystemHealth from 'components/SystemHealth';
import { IS_AWS_FRONTEND } from 'utils/constants';
import { SocketContext } from 'context/SocketContext';
import { GlobalContext } from 'context/GlobalContext';
import LoaderAnalysis from 'components/LoaderAnalysis';
import InfoModal from 'components/InfoModal/InfoModal';
import { useState, useContext, useEffect } from 'react';
import AlertModal from 'components/AlertModal/AlertModal';

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
  const router = useRouter();
  const serviceMutation = ServiceQuery();
  const socket = useContext(SocketContext);
  const { userData } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [printingBelts, setPrintingBelts] = useState({});
  const [vehicleBelts, setVehicleBelts] = useState(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [maintenanceForm, setMaintenanceForm] = useState(false);
  const [shipmentFormOpen, setShipmentFormOpen] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  // const [activeTransactions, setActiveTransactions] = useState({});
  const [maintenanceFormOpen, setMaintenanceFormOpen] = useState(false);
  const [notificationsFormOpen, setNotificationsFormOpen] = useState(false);
  const [backgroundTransactions, setBackgroundTransactions] = useState(null);
  const [activeSection, setActiveSection] = useState(IS_AWS_FRONTEND ? 4 : 0);
  const [reverseShipmentFormOpen, setReverseShipmentFormOpen] = useState(null);
  const [ongoingTransactions, setOngoingTransactions] = useState(null);
  const [queuedTransactions, setQueuedTransactions] = useState(null);

  const handleBagDone = async (
    transaction_id,
    vehicle_id,
    printing_belt_id,
    machine_id,
    comment
  ) => {
    setIsLoading(true);
    await put('/api/transaction/shipment-done', {
      transaction_id,
      comment,
      vehicle_id,
      printing_belt_id
    });
    setOngoingTransactions(prevState => {
      const currData = prevState;
      delete currData[transaction_id];
      return currData;
    });
    setVehicleBelts(prevState => {
      const currData = prevState;
      currData.push({
        id: vehicle_id,
        vehicle_id: machine_id
      });
      return currData;
    });
    setIsLoading(false);
  };

  const handleNewShipment = async data => {
    serviceMutation.mutate(data);
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
    const res = await post('/api/transaction/bag-change', data);
    setOngoingTransactions(
      Object.keys(ongoingTransactions).map(e => {
        if (ongoingTransactions[e].id === data.transaction_id) {
          // modify this entity
          return {
            ...ongoingTransactions[e],
            bag_limit: parseInt(data?.new_bag_limit) + parseInt(data?.old_limit)
          };
        }
        return ongoingTransactions[e];
      })
    );
    setIsLoading(false);
  };

  const handleStop = async data => {
    setIsLoading(true);
    // post('/api/transaction/belt-stop', data);
    // const updatedTransactions = activeTransactions;
    // delete updatedTransactions[data?.transaction_id];
    // setActiveTransactions(updatedTransactions);
    setIsLoading(false);
  };

  useEffect(() => {
    const getActiveTransactions = async () => {
      const res = await get('/api/transaction');
      // setActiveTransactions(res?.data?.data?.transactionRes);
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
      console.log(data, '----bag-entry');
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
    });
    socket.on('tag-entry', data => {
      console.log(data, '----tag-entry');
      const transaction_id = parseInt(data?.transaction_id, 10);
      setOngoingTransactions(prevState => {
        if (!prevState) return null;
        if (prevState && Object.keys(prevState).length === 0) return {};
        else if (!(transaction_id in prevState)) return prevState;
        return {
          ...prevState,
          [transaction_id]: {
            ...prevState[transaction_id],
            missed_label_count: data?.transactionMissed
          }
        };
      });
      const belt_id = parseInt(data?.belt_id, 10);
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
      const belt_id = parseInt(data?.belt_id, 10);
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
    // socket.on('new_tag_deactivated_transaction', data => {
    //   const belt_id = parseInt(data?.belt_id, 10);
    //   setPrintingBelts(prevState => {
    //     return {
    //       ...prevState,
    //       [belt_id]: {
    //         ...prevState[belt_id],
    //         transaction_id: data?.transaction_id
    //       }
    //     };
    //   });
    // });
    // socket.on('stop', data => {
    //   const transaction_id = parseInt(data?.transaction_id, 10);
    //   setActiveTransactions(prevState => {
    //     if (data?.is_bag_belt) {
    //       // data of stop is coming from bag belt
    //       return {
    //         ...prevState,
    //         [transaction_id]: {
    //           ...prevState[transaction_id],
    //           bag_count_finished_at: new Date()
    //         }
    //       };
    //     }
    //     return {
    //       ...prevState,
    //       [transaction_id]: {
    //         ...prevState[transaction_id],
    //         tag_count_finished_at: new Date()
    //       }
    //     };
    //   });
    // });
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
  }, [socket]);

  if (!userData) {
    return <Loader />;
  }

  if (userData.isLoggedIn === false) {
    router.push('/login');
    return <Loader />;
  }

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
              <div
                className={`option ${activeSection === 1 ? 'active' : ''}`}
                onClick={() => setActiveSection(1)}
                onKeyPress={() => setActiveSection(1)}
                role="button"
                tabIndex={0}
              >
                <h6 style={{ textAlign: 'center' }}>Printing belt</h6>
              </div>
              {/* <div
                className={`option ${activeSection === 2 ? 'active' : ''}`}
                onClick={() => setActiveSection(2)}
                onKeyPress={() => setActiveSection(2)}
                role="button"
                tabIndex={0}
              >
                <h6 style={{ cursor: 'inherit' }}>Packer analytics</h6>
              </div> */}
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
        {alertModalVisible ? (
          <AlertModal
            open={alertModalVisible}
            close={() => setAlertModalVisible(false)}
          />
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
  handleBagDone: PropTypes.func
};

export default Index;
