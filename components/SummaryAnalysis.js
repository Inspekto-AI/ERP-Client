import { Grid } from '@material-ui/core';
import SummaryMeter from './SummaryMeter';

function SummaryAnalysis({
  filter,
  key1,
  value,
  bagType,
  runTimePackerSummary,
  perHourDispatch
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
            height: '100px'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p className="count_summary">{key1}</p>
            <p className="description_summary">Packer</p>
          </div>
          <div>
            <p className="count_summary">
              {value !== null
                ? bagType === 0
                  ? `${value} Bags`
                  : `${value / 20} Tones`
                : 'NA'}
            </p>
            <p className="description_summary">
              {filter === 0 ? 'Total Production' : 'Total Dispatch'}
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            {filter === 0 && (
              <div>
                <SummaryMeter
                  progress={
                    -1 +
                    (runTimePackerSummary[key1] === 0
                      ? 0
                      : (value * 12 * 60) /
                        perHourDispatch[key1] /
                        runTimePackerSummary[key1])
                  }
                />
                <p className="description_summary_">
                  Packer Efficiency ={' '}
                  {runTimePackerSummary[key1] === 0
                    ? 0
                    : (
                        (value * 12 * 60 * 100) /
                        perHourDispatch[key1] /
                        runTimePackerSummary[key1]
                      ).toFixed(2)}{' '}
                  %
                </p>
              </div>
            )}
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default SummaryAnalysis;
