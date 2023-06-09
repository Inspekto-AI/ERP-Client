import SummaryMeter from './SummaryMeter';
import { Grid } from '@material-ui/core';

const SummaryAnalysis = ({ filter }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <div
          className="count-block"
          style={{
            background: '#B5179E',
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '15px',
            height: '100px'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p className="count_summary">661</p>
            <p className="description_summary">Packer</p>
          </div>
          <div>
            <p className="count_summary">20,500 Bags</p>
            <p className="description_summary">
              {filter === 0 ? 'Total Production' : 'Total Dispatch'}
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <SummaryMeter progress={-0.6} />
            <p className="description_summary_">
              {filter === 0 ? 'Total Production' : 'Total Dispatch'}
            </p>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default SummaryAnalysis;
