import { Grid } from '@material-ui/core';
import FireTruckOutlinedIcon from '@mui/icons-material/FireTruckOutlined';
const SummaryLoaderAnalysis = ({ filter }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <div
          className="count-block"
          style={{
            background: '#B5179E',
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '15px',
            height: '90px'
          }}
        >
          <div>
            <FireTruckOutlinedIcon
              style={{ height: '60px', width: '60px', marginTop: '-15px' }}
            />
            <p className="description_summary" style={{ marginTop: '-8px' }}>
              683LM1
            </p>
          </div>
          <div>
            <p className="count_summary">20,500 Bags</p>
            <p className="description_summary">
              {filter === 0 ? 'Total Production' : 'Total Dispatch'}
            </p>
          </div>
        </div>
      </Grid>
      <Grid item xs={6}>
        <div
          className="count-block"
          style={{
            background: '#B5179E',
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '15px',
            height: '90px'
          }}
        >
          <div>
            <FireTruckOutlinedIcon
              style={{ height: '60px', width: '60px', marginTop: '-15px' }}
            />
            <p className="description_summary" style={{ marginTop: '-8px' }}>
              683LM1
            </p>
          </div>
          <div>
            <p className="count_summary">20,500 Bags</p>
            <p className="description_summary">
              {filter === 0 ? 'Total Production' : 'Total Dispatch'}
            </p>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default SummaryLoaderAnalysis;
