import { useState, useContext, useEffect } from 'react';
import Layout from 'components/Layout';
import Container from 'styles/homepage.styles';
import AlertModal from 'components/AlertModal/AlertModal';
import InfoModal from 'components/InfoModal/InfoModal';
import { SocketContext } from 'context/SocketContext';
import Config from 'components/Config';
import Maintenance from 'components/Maintenance';
import Notification from 'components/Notification';
import ShipmentAnalysis from 'components/ShipmentAnalysis';
import PrintingAnalysis from 'components/PrintingAnalysis';
import MaintenanceForm from 'components/MaintenanceForm';
import { ServiceQuery } from 'reactQueries/shipmentQueries';
import PropTypes from 'prop-types';
import { get, post } from 'utils/api';
import Loader from 'components/Loader';
import Summary from 'components/Summary';
import Report from 'components/Report';
import PackerAnalysis from 'components/PackerAnalysis';

const DashboardComponent = ({
  activeSection,
  activeTransactions,
  handleBagIncrement,
  handleStop
}) => {
  if (activeSection === 0) {
    return (
      <ShipmentAnalysis
        activeTransactions={activeTransactions}
        handleBagIncrement={handleBagIncrement}
        handleStop={handleStop}
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
  if (activeSection === 4) {
    return <Report />;
  }
  return (
    <PrintingAnalysis
      activeTransactions={activeTransactions}
      handleBagIncrement={handleBagIncrement}
      handleStop={handleStop}
    />
  );
};

const Index = () => {
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [shipmentFormOpen, setShipmentFormOpen] = useState(false);
  const [maintenanceFormOpen, setMaintenanceFormOpen] = useState(false);
  const [notificationsFormOpen, setNotificationsFormOpen] = useState(false);
  const [maintenanceForm, setMaintenanceForm] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [activeTransactions, setActiveTransactions] = useState(null);
  const socket = useContext(SocketContext);
  const [isLoading, setIsLoading] = useState(false);
  const serviceMutation = ServiceQuery();

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
      setActiveTransactions(res?.data?.data);
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
      // console.log(data, 'tag-entry');
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
  }, [socket]);

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
          <div
            className={`option ${activeSection === 0 ? 'active' : ''}`}
            onClick={() => setActiveSection(0)}
            onKeyPress={() => setActiveSection(0)}
            role="button"
            tabIndex={0}
          >
            <h6>Shipment tracking</h6>
          </div>
          <div
            className={`option ${activeSection === 1 ? 'active' : ''}`}
            onClick={() => setActiveSection(1)}
            onKeyPress={() => setActiveSection(1)}
            role="button"
            tabIndex={0}
          >
            <h6>Printing belt</h6>
          </div>
          <div
            className={`option ${activeSection === 2 ? 'active' : ''}`}
            onClick={() => setActiveSection(2)}
            onKeyPress={() => setActiveSection(2)}
            role="button"
            tabIndex={0}
          >
            <h6>Packer analytics</h6>
          </div>
          <div
            className={`option ${activeSection === 3 ? 'active' : ''}`}
            onClick={() => setActiveSection(3)}
            onKeyPress={() => setActiveSection(3)}
            role="button"
            tabIndex={0}
          >
            <h6>Summary</h6>
          </div>
          <div
            className={`option ${activeSection === 4 ? 'active' : ''}`}
            onClick={() => setActiveSection(4)}
            onKeyPress={() => setActiveSection(4)}
            role="button"
            tabIndex={0}
          >
            <h6>Reports</h6>
          </div>
        </div>
        <DashboardComponent
          activeSection={activeSection}
          activeTransactions={activeTransactions}
          handleBagIncrement={handleBagIncrement}
          handleStop={handleStop}
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
  handleStop: PropTypes.any
};

export default Index;
