import { useState, useContext, useEffect } from 'react';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';
import Container from 'styles/homepage.styles';
import AlertModal from 'components/AlertModal/AlertModal';
import InfoModal from 'components/InfoModal/InfoModal';
import { SocketContext } from 'context/SocketContext';
import Config from 'components/Config';
import Maintenance from 'components/Maintenance';
import Notification from 'components/Notification';
// import ShipmentAnalysis from 'components/ShipmentAnalysis';
import PrintingAnalysis from 'components/PrintingAnalysis';
import MaintenanceForm from 'components/MaintenanceForm';
import { ServiceQuery } from 'reactQueries/shipmentQueries';
import PropTypes from 'prop-types';
import { get, post } from 'utils/api';
import Loader from 'components/Loader';
import Summary from 'components/Summary';
import Report from 'components/Report';
import PackerAnalysis from 'components/PackerAnalysis';
import SystemHealth from 'components/SystemHealth/SystemHealth';
import { IS_AWS_FRONTEND } from 'utils/constants';
import { GlobalContext } from 'context/GlobalContext';
import LoaderAnalysis from 'components/LoaderAnalysis';

const DashboardComponent = ({
  activeSection,
  activeTransactions,
  handleBagIncrement,
  handleStop,
  printingBelts,
  backgroundTransactions,
  vehicleBelts
}) => {
  if (activeSection === 0) {
    return (
      <PrintingAnalysis
        printingBelts={printingBelts}
        backgroundTransactions={backgroundTransactions}
      />
    );
  }
  if (activeSection === 1) {
    return (
      <LoaderAnalysis
        vehicleBelts={vehicleBelts}
        backgroundTransactions={backgroundTransactions}
      />
    );
  }
  if (activeSection === 2) {
    return (
      <PackerAnalysis
        activeTransactions={activeTransactions}
        handleBagIncrement={handleBagIncrement}
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
  const [activeTransactions, setActiveTransactions] = useState({});
  const [maintenanceFormOpen, setMaintenanceFormOpen] = useState(false);
  const [notificationsFormOpen, setNotificationsFormOpen] = useState(false);
  const [backgroundTransactions, setBackgroundTransactions] = useState(null);
  const [activeSection, setActiveSection] = useState(IS_AWS_FRONTEND ? 4 : 0);

  const handleNewShipment = async data => {
    serviceMutation.mutate(data);
  };

  useEffect(() => {
    if (serviceMutation.isSuccess) {
      setActiveTransactions({
        ...activeTransactions,
        [serviceMutation?.data?.data?.id]: {
          ...serviceMutation?.data?.data
        }
      });
      serviceMutation.reset();
      setShipmentFormOpen(false);
    }
  }, [activeTransactions, serviceMutation]);

  const handleBagIncrement = async data => {
    setIsLoading(true);
    const res = await post('/api/transaction/bag-change', data);
    if (res.data.success) {
      // modify existing data
      setActiveTransactions({
        ...activeTransactions,
        [data.transaction_id]: {
          ...activeTransactions[data.transaction_id],
          limit: data.new_bag_count
        }
      });
    }
    setIsLoading(false);
  };

  const handleStop = async data => {
    setIsLoading(true);
    post('/api/transaction/belt-stop', data);
    const updatedTransactions = activeTransactions;
    delete updatedTransactions[data?.transaction_id];
    setActiveTransactions(updatedTransactions);
    setIsLoading(false);
  };

  useEffect(() => {
    const getActiveTransactions = async () => {
      const res = await get('/api/transaction');
      setActiveTransactions(res?.data?.data?.transactionRes);
      const backgroundTransactionsRes = res?.data?.data?.backgroundInfo;
      setBackgroundTransactions(backgroundTransactionsRes);
      const beltMasterRes = {};
      const vehicleBeltMasterRes = {};
      const printing_data = res?.data?.data?.printingBeltRes;
      const vehicle_data = res?.data?.data?.vehicleBeltRes;
      printing_data?.forEach(e => {
        beltMasterRes[e?.id] = {
          tag_machine_id: e?.machine_id,
          missed_labels: 0,
          printing_count: 0
        };
      });
      vehicle_data?.forEach(e => {
        vehicleBeltMasterRes[e?.id] = {
          bag_machine_id: e?.machine_id,
          count: 0
        };
      });
      if (backgroundTransactionsRes) {
        Object.keys(backgroundTransactionsRes).forEach(e => {
          beltMasterRes[e] = {
            ...beltMasterRes[e],
            missed_labels: backgroundTransactionsRes[e]?.missed_labels,
            printing_count: backgroundTransactionsRes[e]?.printing_count,
            tag_machine_id: backgroundTransactionsRes[e]?.tag_machine_id,
            transaction_id: backgroundTransactionsRes[e]?.transaction_id
          };
        });
      }
      setPrintingBelts(beltMasterRes);
      setVehicleBelts(vehicleBeltMasterRes);
    };
    getActiveTransactions();
  }, []);

  useEffect(() => {
    socket.on('bag-entry', data => {
      // console.log(data, 'bag-entry');
      const transaction_id = parseInt(data?.transaction_id, 10);
      setActiveTransactions(prevState => {
        return {
          ...prevState,
          [transaction_id]: {
            ...prevState[transaction_id],
            bag_count: data?.bag_count
          }
        };
      });
    });
    socket.on('tag-entry', data => {
      const transaction_id = parseInt(data?.transaction_id, 10);
      setActiveTransactions(prevState => {
        return {
          ...prevState,
          [transaction_id]: {
            ...prevState[transaction_id],
            printing_count: data?.bag_count,
            missed_labels: data?.missed_labels
          }
        };
      });
      const belt_id = parseInt(data?.belt_id, 10);
      setPrintingBelts(prevState => {
        return {
          ...prevState,
          [belt_id]: {
            ...prevState[belt_id],
            printing_count: data?.bag_count_background,
            missed_labels: data?.missed_labels_background
          }
        };
      });
    });
    socket.on('tag-entry-deactivated', data => {
      const belt_id = parseInt(data?.belt_id, 10);
      setPrintingBelts(prevState => {
        return {
          ...prevState,
          [belt_id]: {
            ...prevState[belt_id],
            printing_count: data?.bag_count,
            missed_labels: data?.missed_labels
          }
        };
      });
    });
    socket.on('new_tag_deactivated_transaction', data => {
      const belt_id = parseInt(data?.belt_id, 10);
      setPrintingBelts(prevState => {
        return {
          ...prevState,
          [belt_id]: {
            ...prevState[belt_id],
            transaction_id: data?.transaction_id
          }
        };
      });
    });
    socket.on('stop', data => {
      const transaction_id = parseInt(data?.transaction_id, 10);
      setActiveTransactions(prevState => {
        if (data?.is_bag_belt) {
          // data of stop is coming from bag belt
          return {
            ...prevState,
            [transaction_id]: {
              ...prevState[transaction_id],
              bag_count_finished_at: new Date()
            }
          };
        }
        return {
          ...prevState,
          [transaction_id]: {
            ...prevState[transaction_id],
            tag_count_finished_at: new Date()
          }
        };
      });
    });
    socket.on('background-reset', () => {
      setPrintingBelts(prevState => {
        const newState = {};
        Object.keys(prevState).forEach(e => {
          newState[e] = {
            tag_machine_id: prevState[e]?.tag_machine_id,
            missed_labels: 0,
            printing_count: 0
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

  if (shipmentFormOpen) {
    return (
      <Config
        close={() => setShipmentFormOpen(false)}
        handleSubmit={handleNewShipment}
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
                <h6 style={{ textAlign: 'center' }}>Printing belt</h6>
              </div>
              <div
                className={`option ${activeSection === 1 ? 'active' : ''}`}
                onClick={() => setActiveSection(1)}
                onKeyPress={() => setActiveSection(1)}
                role="button"
                tabIndex={0}
              >
                <h6 style={{ textAlign: 'center' }}>Loader belt</h6>
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
          activeTransactions={activeTransactions}
          handleBagIncrement={handleBagIncrement}
          handleStop={handleStop}
          printingBelts={printingBelts}
          backgroundTransactions={backgroundTransactions}
          vehicleBelts={vehicleBelts}
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
  activeTransactions: PropTypes.any,
  handleBagIncrement: PropTypes.func,
  handleStop: PropTypes.any,
  printingBelts: PropTypes.any,
  backgroundTransactions: PropTypes.any,
  vehicleBelts: PropTypes.any
};

export default Index;
