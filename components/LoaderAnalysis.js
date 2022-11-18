import { useState } from 'react';
import { Grid } from '@material-ui/core';
import AnalyticsCard from 'components/AnalyticsCard';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import PropTypes from 'prop-types';
import AddMoreBagsModal from 'components/AddMoreBagsModal';
import DefectiveBags from 'components/DefectiveBags';
import InfoModal from 'components/InfoModal';

const LoaderAnalysis = ({
  vehicleBelts,
  handleBagIncrement,
  ongoingTransactions,
  setReverseShipmentFormOpen,
  handleBagDone
  // queuedTransactions
}) => {
  const [detailModalOpen, setDetailModalOpen] = useState(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(null);
  const [bagModifyModalOpen, setBagModifyModalOpen] = useState(null);

  return (
    <>
      <div className="analysis-container">
        <div className="head">
          <h2>Loader Analysis</h2>
          <div className="search-container"></div>
        </div>
        <div className="analytics">
          <div className="shipment-type">
            <span className="category-name">Active loaders</span> <hr />
          </div>
          {ongoingTransactions &&
          Object.keys(ongoingTransactions)?.length === 0 ? (
            <p style={{ fontSize: '20px', textAlign: 'center', color: 'gray' }}>
              <AiOutlineExclamationCircle style={{ fontSize: '70px' }} />
              <br />
              No shipment created.
              <br />
              Please create a shipment first.
            </p>
          ) : (
            <Grid container spacing={2}>
              {ongoingTransactions &&
                Object.keys(ongoingTransactions)?.map((e, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <AnalyticsCard
                      data={{
                        ...ongoingTransactions[e]
                      }}
                      rejectModalOpen={() =>
                        setRejectModalOpen(ongoingTransactions[e])
                      }
                      setDetailModalOpen={() =>
                        setDetailModalOpen(ongoingTransactions[e])
                      }
                      bagModifyModalOpen={() =>
                        setBagModifyModalOpen(ongoingTransactions[e])
                      }
                      handleBagDone={handleBagDone}
                      loaderCard
                      status={0}
                    />
                  </Grid>
                ))}
            </Grid>
          )}
          {/* <div className="shipment-type">
            <span className="category-name">Queued loaders</span> <hr />
          </div>
          {queuedTransactions && queuedTransactions?.length === 0 ? (
            <p style={{ fontSize: '20px', textAlign: 'center', color: 'gray' }}>
              <AiOutlineExclamationCircle style={{ fontSize: '70px' }} />
              <br />
              No shipment created.
              <br />
              Please create a shipment first.
            </p>
          ) : (
            <Grid container spacing={2}>
              {queuedTransactions &&
                queuedTransactions?.map((e, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <AnalyticsCard
                      data={e}
                      rejectModalOpen={() =>
                        setRejectModalOpen({
                          ...vehicleBelts[e],
                          printing_belt_id: e
                        })
                      }
                      setDetailModalOpen={() => setDetailModalOpen(e)}
                      bagModifyModalOpen={() =>
                        setBagModifyModalOpen({
                          transaction_id: 1,
                          is_bag_belt_active: true,
                          bag_count: 300,
                          bag_machine_id: 20,
                          vehicle_type: 1,
                          limit: 1000
                        })
                      }
                      loaderCard
                      status={1}
                    />
                  </Grid>
                ))}
            </Grid>
          )} */}
          <div className="shipment-type">
            <span className="category-name">Inactive loaders</span> <hr />
          </div>
          {vehicleBelts && vehicleBelts?.length === 0 ? (
            <p style={{ fontSize: '20px', textAlign: 'center', color: 'gray' }}>
              <AiOutlineExclamationCircle style={{ fontSize: '70px' }} />
              <br />
              No shipment created.
              <br />
              Please create a shipment first.
            </p>
          ) : (
            <Grid container spacing={2}>
              {vehicleBelts &&
                vehicleBelts?.map((e, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <AnalyticsCard
                      data={e}
                      setReverseShipmentFormOpen={setReverseShipmentFormOpen}
                      loaderCard
                      status={2}
                    />
                  </Grid>
                ))}
            </Grid>
          )}
        </div>
      </div>
      {detailModalOpen ? (
        <AddMoreBagsModal
        showDivision
          open={detailModalOpen}
          close={() => setDetailModalOpen(null)}
          heading="Transaction details"
          handleSubmit={() => {
            // handleBagIncrement(e);
            setDetailModalOpen(null);
          }}
          handleStop={() => {
            // handleStop(e);
            setDetailModalOpen(null);
          }}
          handleBagDone={handleBagDone}
          hideModify
        />
      ) : null}
      {rejectModalOpen ? (
        <InfoModal
          open={rejectModalOpen}
          close={() => setRejectModalOpen(null)}
          title="Rejected bags"
          hideConfirm
        >
          <DefectiveBags printingBeltId={rejectModalOpen?.printing_belt_id} />
        </InfoModal>
      ) : null}
      {bagModifyModalOpen ? (
        <AddMoreBagsModal
        onlyBags
          open={bagModifyModalOpen}
          close={() => setBagModifyModalOpen(null)}
          handleSubmit={e => {
            handleBagIncrement(e);
            setBagModifyModalOpen(null);
          }}
        />
      ) : null}
    </>
  );
};

LoaderAnalysis.propTypes = {
  vehicleBelts: PropTypes.any,
  setReverseShipmentFormOpen: PropTypes.func,
  ongoingTransactions: PropTypes.object,
  handleBagDone: PropTypes.func
};

export default LoaderAnalysis;
