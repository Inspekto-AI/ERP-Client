import { useState } from 'react';
import { Grid } from '@material-ui/core';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import AnalyticsCard from 'components/AnalyticsCard';
import PropTypes from 'prop-types';
import AddMoreBagsModal from 'components/AddMoreBagsModal';
import DefectiveBags from 'components/DefectiveBags';
import InfoModal from 'components/InfoModal';

function ShipmentTracking({
  activeTransactions,
  handleBagIncrement,
  handleStop,
}) {
  const [detailModalOpen, setDetailModalOpen] = useState(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(null);
  const [bagModifyModalOpen, setBagModifyModalOpen] = useState(null);

  return (
    <>
      <div className="analysis-container">
        <div className="head">
          <h2>Shipment tracking</h2>
          <div className="search-container" />
        </div>
        <div className="analytics">
          {activeTransactions
          && Object.keys(activeTransactions)?.length === 0 ? (
            <p style={{ fontSize: '20px', textAlign: 'center', color: 'gray' }}>
              <AiOutlineExclamationCircle style={{ fontSize: '70px' }} />
              <br />
              No shipment created.
              <br />
              Please create a shipment first.
            </p>
            ) : (
              <Grid container className="par">
                {activeTransactions
                && Object.keys(activeTransactions)?.map((e, index) => (
                  <div key={index} className="childd">
                    <AnalyticsCard
                      data={{
                        transaction_id: e,
                        ...activeTransactions[e],
                      }}
                      rejectModalOpen={() => setRejectModalOpen({
                        transaction_id: e,
                        ...activeTransactions[e],
                      })}
                      bagModifyModalOpen={() => setBagModifyModalOpen({
                        transaction_id: e,
                        ...activeTransactions[e],
                      })}
                      setDetailModalOpen={() => setDetailModalOpen({
                        transaction_id: e,
                        ...activeTransactions[e],
                      })}
                    />
                  </div>
                ))}
              </Grid>
            )}
        </div>
      </div>
      {detailModalOpen ? (
        <AddMoreBagsModal
          open={detailModalOpen}
          close={() => setDetailModalOpen(null)}
          heading="Transaction details"
          handleSubmit={(e) => {
            handleBagIncrement(e);
            setDetailModalOpen(null);
          }}
          handleStop={(e) => {
            handleStop(e);
            setDetailModalOpen(null);
          }}
        />
      ) : null}
      {rejectModalOpen ? (
        <InfoModal
          open={rejectModalOpen}
          close={() => setRejectModalOpen(null)}
          title="Misprint bags"
          hideConfirm
          hideComment
        >
          <DefectiveBags transaction_id={rejectModalOpen?.transaction_id} />
        </InfoModal>
      ) : null}
      {bagModifyModalOpen ? (
        <AddMoreBagsModal
          open={bagModifyModalOpen}
          close={() => setBagModifyModalOpen(null)}
          onlyBags
          handleSubmit={(e) => {
            handleBagIncrement(e);
            setBagModifyModalOpen(null);
          }}
        />
      ) : null}
    </>
  );
}

ShipmentTracking.propTypes = {
  activeTransactions: PropTypes.objectOf(PropTypes.object),
  handleBagIncrement: PropTypes.func,
  handleStop: PropTypes.func,
};

export default ShipmentTracking;
