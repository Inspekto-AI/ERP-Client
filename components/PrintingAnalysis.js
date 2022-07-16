import { useState } from 'react';
import { Grid } from '@material-ui/core';
import AnalyticsCard from 'components/AnalyticsCard';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import PropTypes from 'prop-types';
import AddMoreBagsModal from 'components/AddMoreBagsModal';
import DefectiveBags from 'components/DefectiveBags';
import InfoModal from 'components/InfoModal';

const PrintingAnalysis = ({
  activeTransactions,
  handleBagIncrement,
  handleStop
}) => {
  // const [search, setSearch] = useState('');
  const [detailModalOpen, setDetailModalOpen] = useState(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(null);
  const [bagModifyModalOpen, setBagModifyModalOpen] = useState(null);

  return (
    <>
      <div className="analysis-container">
        <div className="head">
          <h2>Printing belt</h2>
          <div className="search-container">
            {/* <p>Search</p>
            <TextField
              type="text"
              variant="outlined"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            /> */}
          </div>
        </div>
        <div className="analytics">
          {activeTransactions &&
          Object.keys(activeTransactions)?.length === 0 ? (
            <p style={{ fontSize: '20px', textAlign: 'center', color: 'gray' }}>
              <AiOutlineExclamationCircle style={{ fontSize: '70px' }} />
              <br />
              No shipment created.
              <br />
              Please create a shipment first.
            </p>
          ) : (
            <Grid container>
              {activeTransactions &&
                Object.keys(activeTransactions)?.map((e, index) => (
                  <Grid item xs={3} key={index}>
                    <AnalyticsCard
                      data={{
                        transaction_id: e,
                        ...activeTransactions[e]
                      }}
                      rejectModalOpen={() =>
                        setRejectModalOpen({
                          transaction_id: e,
                          ...activeTransactions[e]
                        })
                      }
                      bagModifyModalOpen={() =>
                        setBagModifyModalOpen({
                          transaction_id: e,
                          ...activeTransactions[e]
                        })
                      }
                      setDetailModalOpen={() =>
                        setDetailModalOpen({
                          transaction_id: e,
                          ...activeTransactions[e]
                        })
                      }
                      printingCard
                    />
                  </Grid>
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
          handleSubmit={e => {
            handleBagIncrement(e);
            setDetailModalOpen(null);
          }}
          handleStop={e => {
            handleStop(e);
            setDetailModalOpen(null);
          }}
        />
      ) : null}
      {rejectModalOpen ? (
        <InfoModal
          open={rejectModalOpen}
          close={() => setRejectModalOpen(null)}
          title="Rejected bags"
          hideConfirm
        >
          <DefectiveBags transaction_id={rejectModalOpen?.transaction_id} />
        </InfoModal>
      ) : null}
      {bagModifyModalOpen ? (
        <AddMoreBagsModal
          open={bagModifyModalOpen}
          close={() => setBagModifyModalOpen(null)}
          onlyBags
          handleSubmit={e => {
            handleBagIncrement(e);
            setBagModifyModalOpen(null);
          }}
        />
      ) : null}
    </>
  );
};

PrintingAnalysis.propTypes = {
  activeTransactions: PropTypes.any,
  handleBagIncrement: PropTypes.func,
  handleStop: PropTypes.any
};

export default PrintingAnalysis;
