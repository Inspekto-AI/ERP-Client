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
    fontWeight: 200,
    hover: 'none',
    margin: '0'
  },
  rootColored: {
    backgroundColor: '#008847',
    color: 'white',
    padding: '5px 10px',

    fontSize: '18px',
    opacity: '0.8',
    fontWeight: 200,
    hover: 'none',
    margin: '0'
  },
  tableButton: {
    width: '14vw',
    height: '40px',
    padding: '0px',
    margin: '0px',
    fontWeight: '600',
    outline: 'none'
  },
  input1: {
    width: '5vw'
  },
  input2: {
    width: '8vw'
  },
  input3: {
    width: '9vw'
  },
  bagCount: {
    width: '6vw'
  },
  bagTypeSelect: {
    width: '9vw'
  },
  wagnoNoSelect: {
    maxWidth: '7vw'
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
        <td className={classes.bagTypeSelect}>
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
            className={classes.wagnoNoSelect}
            value={wagonno}
            placeholder={vehicleType === 0 ? 'Wagon No.' : 'Truck No.'}
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
          <Button
            className={
              rackNo != null && wagonno != null && bagCount != null
                ? classes.rootColored
                : classes.root
            }
            onClick={handleSubmit}
          >
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
