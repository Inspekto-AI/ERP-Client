import { Select, MenuItem } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Define styles using makeStyles
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'white',
    color: 'black',
    padding: '5px 10px',

    fontSize: '18px',
    opacity: '0.4',
    fontWeight: 200
  },
  tableButton: {
    width: '280px',
    height: '40px',
    padding: '0px',
    margin: '0px',
    fontWeight: '600',
    outline: 'none'
  },
  input1: {
    width: '100px'
  },
  input2: {
    width: '160px'
  },
  input3: {
    width: '180px'
  },
  bagCount: {
    width: '100px'
  }
}));
function ShipmentAnalysisRow({
  data,
  BAG_TYPES,
  handleNewShipment,
  index,
  rackNo,
  vehicleType
}) {
  const classes = useStyles();

  const [bagType, setBagType] = useState(BAG_TYPES ? BAG_TYPES[0] : '');
  const [wagonno, setWagonno] = useState(null);
  const [bagCount, setBagCount] = useState(null);

  const handleSubmit = async () => {
    if (rackNo === null) {
      alert('Enter Rack no');
      return;
    }
    if (wagonno === null) {
      alert('Enter wagon no');
      return;
    }
    if (bagCount === null) {
      alert('Enter target');
      return;
    }

    await handleNewShipment({
      printingId: null,
      loaderId: data?.id,
      licenceNumber: vehicleType === 1 ? wagonno : 'test',
      bagType,
      bagCount,
      wagonno: vehicleType === 0 ? wagonno : 'test',
      rackno: rackNo,
      gateno: '12',
      labelExample: '123'
    });
    setWagonno('');
    setBagCount('');
    setBagType(BAG_TYPES ? BAG_TYPES[0] : '');
  };

  return (
    <>
      <tr className="custom-table">
        <td>{index}</td>
        <td>{data?.id}</td>
        <td>
          <Select
            variant="outlined"
            value={bagType}
            className={classes.tableButton}
            onChange={e => setBagType(e.target.value)}
          >
            {BAG_TYPES.map((e, i) => (
              <MenuItem className="tableButton" value={e} key={i}>
                {e}
              </MenuItem>
            ))}
          </Select>
        </td>
        <td>
          <input
            value={wagonno}
            placeholder={vehicleType === 0 ? 'Add Wagon No.' : 'Add Truck No.'}
            onChange={e => {
              setWagonno(e.target.value);
            }}
          />
        </td>
        <td>
          <input
            className={classes.bagCount}
            placeholder="Target"
            value={bagCount}
            onChange={e => {
              setBagCount(e.target.value);
            }}
          />
        </td>
        <td className={classes.input1}>-</td>
        <td>-</td>
        <td>-</td>
        <td>
          <Button className={classes.root} onClick={handleSubmit}>
            START
          </Button>
        </td>
        <td>
          <Button className={classes.root}>VIEW</Button>
        </td>
      </tr>
    </>
  );
}

export default ShipmentAnalysisRow;
