import { useState } from 'react';
import { Grid } from '@material-ui/core';
import AnalyticsCard from 'components/AnalyticsCard';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import PropTypes from 'prop-types';
import AddMoreBagsModal from 'components/AddMoreBagsModal';
import DefectiveBags from 'components/DefectiveBags';
import InfoModal from 'components/InfoModal';

const PrintingAnalysis = ({ printingBelts }) => {
  // const [search, setSearch] = useState('');
  const [detailModalOpen, setDetailModalOpen] = useState(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(null);

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
          {printingBelts && Object.keys(printingBelts)?.length === 0 ? (
            <p style={{ fontSize: '20px', textAlign: 'center', color: 'gray' }}>
              <AiOutlineExclamationCircle style={{ fontSize: '70px' }} />
              <br />
              No shipment created.
              <br />
              Please create a shipment first.
            </p>
          ) : (
            <Grid container>
              {printingBelts &&
                Object.keys(printingBelts)?.map((e, index) => (
                  <Grid item xs={3} key={index}>
                    <AnalyticsCard
                      data={{
                        ...printingBelts[e]
                      }}
                      rejectModalOpen={() =>
                        setRejectModalOpen({
                          ...printingBelts[e],
                          printing_belt_id: e
                        })
                      }
                      // bagModifyModalOpen={() =>
                      //   setBagModifyModalOpen({
                      //     transaction_id: e,
                      //     ...printingBelts[e]
                      //   })
                      // }
                      setDetailModalOpen={() =>
                        setDetailModalOpen({
                          transaction_id: e,
                          ...printingBelts[e]
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
          handleSubmit={() => {
            // handleBagIncrement(e);
            setDetailModalOpen(null);
          }}
          handleStop={() => {
            // handleStop(e);
            setDetailModalOpen(null);
          }}
          printingCard
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
      {/* {bagModifyModalOpen ? (
        <AddMoreBagsModal
          open={bagModifyModalOpen}
          close={() => setBagModifyModalOpen(null)}
          onlyBags
          handleSubmit={e => {
            handleBagIncrement(e);
            setBagModifyModalOpen(null);
          }}
        />
      ) : null} */}
    </>
  );
};

PrintingAnalysis.propTypes = {
  printingBelts: PropTypes.any
};

export default PrintingAnalysis;
