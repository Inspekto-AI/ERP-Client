import { useState } from 'react';
import { Grid } from '@material-ui/core';
import AnalyticsCard from 'components/AnalyticsCard';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import PropTypes from 'prop-types';
import AddMoreBagsModal from 'components/AddMoreBagsModal';
import DefectiveBags from 'components/DefectiveBags';
import InfoModal from 'components/InfoModal';

const PrintingAnalysis = ({ printingBelts }) => {
  const [detailModalOpen, setDetailModalOpen] = useState(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(null);

  return (
    <>
      <div className="analysis-container">
        <div className="head">
          <h2>Printing Analysis</h2>
          <div className="search-container"></div>
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
            <Grid container className="par">
              {printingBelts &&
                Object.keys(printingBelts)?.map((e, index) => (
                  <div className="childd">
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
                      setDetailModalOpen={() =>
                        setDetailModalOpen({
                          transaction_id: e,
                          ...printingBelts[e]
                        })
                      }
                      printingCard
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
    </>
  );
};

PrintingAnalysis.propTypes = {
  printingBelts: PropTypes.any
};

export default PrintingAnalysis;
