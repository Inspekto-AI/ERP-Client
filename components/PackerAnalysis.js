import { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import AnalyticsCard from 'components/AnalyticsCard';
import PropTypes from 'prop-types';
import AddMoreBagsModal from 'components/AddMoreBagsModal';
import DefectiveBags from 'components/DefectiveBags';
import InfoModal from 'components/InfoModal';
import { get } from 'utils/api';

function PackerAnalysis({ handleBagIncrement, handleStop }) {
  const [detailModalOpen, setDetailModalOpen] = useState(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(null);
  const [bagModifyModalOpen, setBagModifyModalOpen] = useState(null);
  const [packerData, setPackerData] = useState(null);
  const [packerList, setPackerList] = useState(null);

  useEffect(() => {
    const fetchPackerList = async () => {
      const data = await get('/api/transaction/packers');
      const packerObj = {};
      data?.data?.data?.forEach((e) => {
        packerObj[e.id] = {
          count: 0,
          machine_id: e?.machine_id,
        };
      });
      setPackerList(packerObj);
    };
    if (!packerList) {
      fetchPackerList();
    }
  }, [packerList]);

  useEffect(() => {
    const fetchPackerSummary = async () => {
      const data = await get('/api/transaction/packer-analytics');
      const analytics = packerList;
      data?.data?.data?.forEach((e) => {
        analytics[e?.packer_id] = {
          ...analytics[e?.packer_id],
          count: e?.count,
          machine_id: e?.machine_id,
        };
      });
      setPackerData(analytics);
    };
    if (packerList) {
      fetchPackerSummary();
    }
  }, [packerList]);

  return (
    <>
      <div className="analysis-container">
        <div className="head">
          <h2>Packer Analytics</h2>
          <div className="search-container" />
        </div>
        <div className="analytics">
          <Grid container>
            {packerData
              && Object.values(packerData).map((e, index) => (
                <Grid item xs={3} key={index}>
                  <AnalyticsCard
                    data={{
                      id: e?.machine_id,
                      count: e?.count,
                    }}
                    packerCard
                  />
                </Grid>
              ))}
          </Grid>
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

PackerAnalysis.propTypes = {
  handleBagIncrement: PropTypes.func,
  handleStop: PropTypes.any,
};

export default PackerAnalysis;
