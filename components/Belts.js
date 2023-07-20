import { Select, MenuItem, makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { get, post, put } from 'utils/api';
import { BASE_URL } from 'utils/constants';
import BeltsLoading from './BeltsLoading';

const useStyles = makeStyles(theme => ({
  input: {
    border: '1px solid black',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    width: '200px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    // marginTop: '80x',
    margin: '20px',
    fontSize: '20px'
  },
  button: {
    border: '1px solid black',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    width: '100px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    // marginTop: '80x',
    margin: '20px',
    height: '48px',
    fontSize: '20px'
  }
}));

function Belts() {
  const classes = useStyles();
  const [beltType, setBeltType] = useState(0);
  const [loadingBelts, setLoadingBelts] = useState(null);

  const fetchLoadingBelts = async () => {
    const res = await get(`${BASE_URL}/api/shipment/all-vehicle`);

    console.log(res?.data?.data);
  };

  useEffect(() => {
    fetchLoadingBelts();
  }, []);

  return (
    <div style={{ marginTop: '120px' }}>
      <Select>
        <MenuItem value={0}>Loading Belts</MenuItem>
        <MenuItem value={1}>Printing Belts</MenuItem>
        <MenuItem value={1}>Packer Belts</MenuItem>
      </Select>
      {beltType === 0 &&
        loadingBelts?.map(item => {
          return <BeltsLoading />;
        })}
    </div>
  );
}

export default Belts;
