import { Grid } from '@material-ui/core';
import SummaryMeter from './SummaryMeter';

function SummaryAnalysis({
  filter, key1, value, bagType,
}) {
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
            height: '100px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p className="count_summary">{key1}</p>
            <p className="description_summary">Packer</p>
          </div>
          <div>
            <p className="count_summary">
              {value !== null
                ? bagType === 0 ? `${value} Bags` : `${value / 20} Tones`
                : 'NA'}
            </p>
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
}

export default SummaryAnalysis;
