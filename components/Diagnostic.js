import { Select, MenuItem, makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { get, post, put } from 'utils/api';
import { BASE_URL } from 'utils/constants';
import DiagnosticComponent from './DiagnosticComponent';

const useStyles = makeStyles((theme) => ({
  input: {
    border: '1px solid black',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    width: '200px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    // marginTop: '80x',
    margin: '20px',
    fontSize: '20px',
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
    fontSize: '20px',
  },
}));

function Diagnostic() {
  const classes = useStyles();
  const [beltType, setBeltType] = useState(0);
  const [loadingBelts, setLoadingBelts] = useState(null);
  const [printingBelts, setPrintingBelts] = useState(null);

  const fetchLoadingBelts = async () => {
    const res = await get(`${BASE_URL}/api/shipment/all-vehicle`);

    setLoadingBelts(res?.data?.data);
  };

  const fetchPrintingBelts = async () => {
    const res = await get(`${BASE_URL}/api/shipment/all-printing-belt`);
    setPrintingBelts(res?.data?.data);
  };

  useEffect(() => {
    fetchLoadingBelts();
    fetchPrintingBelts();
  }, []);

  return (
    <div style={{ marginTop: '120px' }}>
      <Select
        className={classes.input}
        value={beltType}
        onChange={(e) => {
          setBeltType(e.target.value);
        }}
      >
        <MenuItem value={0}>Loading Belts</MenuItem>
        <MenuItem value={1}>Printing Belts</MenuItem>
        {/* <MenuItem value={2}>Packer Belts</MenuItem> */}
      </Select>
      {beltType === 0 && (
        <table className="custom-table">
          <thead>
            <tr>
              <th>Loader Id</th>
              {/* <th>Is Active</th>
              <th>Vehicle Type</th> */}
              <th>Select Video</th>
              <th>Uplaod and test</th>
              <th>Download</th>
              {/* <th>Belt Direction</th>
              <th>Belt ROI</th>
              <th>Frame TCP Port</th>
              <th>Camera IP</th>
              <th>Camera Username</th>
              <th>Camera Password</th>
              <th>Frame Height</th>
              <th>Frame Width</th>
              <th>Relay ID</th> */}
            </tr>
          </thead>

          {loadingBelts?.map((item) => (
            <DiagnosticComponent item={item} beltType={0} />
          ))}
        </table>
      )}
      {beltType === 1 && (
        <table className="custom-table">
          <thead>
            <tr>
              <th>Printing Belt Id</th>
              {/* <th>Is Active</th>
              <th>Packer ID</th> */}
              <th>Test Belt</th>
              {/* <th>Belt Direction</th>
              <th>Belt ROI</th>
              <th>Frame TCP Port</th>
              <th>Camera IP</th>
              <th>Camera Username</th>
              <th>Camera Password</th>
              <th>Frame Height</th>
              <th>Frame Width</th>
              <th>Relay ID</th> */}
            </tr>
          </thead>

          {printingBelts?.map((item) => (
            <DiagnosticComponent item={item} beltType={1} />
          ))}
        </table>
      )}
    </div>
  );
}

export default Diagnostic;
