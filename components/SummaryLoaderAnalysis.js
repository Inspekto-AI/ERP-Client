import { Grid } from '@material-ui/core';
import FireTruckOutlinedIcon from '@mui/icons-material/FireTruckOutlined';
import ImageKitLoader from 'utils/ImageLoader';
import Image from 'next/image';

// import wagonIcon from 'public/icons/wagon.png';
function SummaryLoaderAnalysis({
  filter, key1, value, bagType, vehicleType,
}) {
  // console.log(value)
  return (
    <Grid item xs={6}>
      <div
        className="count-block"
        style={{
          background: '#B5179E',
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '15px',
          height: '90px',
        }}
      >
        <div>
          {/* <FireTruckOutlinedIcon
            style={{ height: '60px', width: '60px', marginTop: '-15px' }}
          /> */}
          {vehicleType === 1 ? (
            <Image
              src="freight-wagon(2).png"
              alt="(Wl)"
              loader={ImageKitLoader}
              height={40}
              width={40}
            />
          ) : (
            <Image
              src="van(1).png"
              alt="(TL)"
              loader={ImageKitLoader}
              height={40}
              width={40}
            />
          )}

          {/* <Image src="high_res_logo.svg"></Image> */}
          <p className="description_summary" style={{ marginTop: '-8px' }}>
            {key1}
          </p>
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
      </div>
    </Grid>
  );
}

export default SummaryLoaderAnalysis;
