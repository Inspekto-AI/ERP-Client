import { Select, MenuItem, Avatar } from '@material-ui/core';
import { useState, Fragment } from 'react';
import { IoMdAdd } from 'react-icons/io';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    color: 'black',
    padding: '5px 10px',
    fontSize: '18px',
    fontWeight: 200,
    width: '2vw'
  },

  td1: {
    backgroundColor: '#69E866',
    width: '3vw'
  },
  td3: {
    outline: '2px solid transparent',
    width: '100%',
    background: 'white'
  },
  td4: {
    outline: '2px solid #6B4EFF',
    maxWidth: '8vw'
  },
  td4Inactive: {
    outline: '2px solid transparent',
    maxWidth: '8vw'
  },
  avatar: {
    height: '1vh',
    width: '1vh',
    marginLeft: '-1px',
    backgroundColor: '#00A86B',
    margin: '0px',
    padding: '0px',
    marginLeft: '10px'
  },
  td5: {
    width: '8vw',
    display: 'flex',
    height: '40px',
    maxHeight: '40px',
    margin: '0px',
    padding: '0px',
    backgroundColor: 'transparent'
  },
  td6: {
    outline: '2px solid #6B4EFF'
  },
  addBagInput: {
    width: '7vw',
    fontSize: '20px'
  },
  transpatentBorder: {
    outline: '2px solid black'
  },
  td7: {
    outline: '2px solid black',
    maxWidth: '8vw',
    width: '10vh'
  },
}));

const LoaderAnalysisRow = ({
  data,
  BAG_TYPES,
  handleNewShipment,
  index,
  rackNo,
  vehicleType,
  handleBagDone,
  handleBagIncrement
}) => {
  const classes = useStyles();
  const [bagType, setBagType] = useState(BAG_TYPES ? BAG_TYPES[0] : '');
  const [wagonno, setWagonno] = useState('');
  const [bagCount, setBagCount] = useState('');
  const [addBagCount, setAddBagCount] = useState('');

  const handleAddButton = async () => {
    await handleBagIncrement({
      transaction_id: data?.shipment_id,
      new_bag_limit: parseInt(addBagCount, 10),
      old_limit: data?.bag_limit,
      belt_id: data?.vehicle_id,
      comment: 'test'
    });
    setAddBagCount('');
  };

  const handleReset = () => {
    handleBagDone(
      data?.shipment_id,
      data?.vehicle_id,
      null,
      data?.vehicle_id,
      data?.vehicle_type,
      '',
      data?.bag_count,
      data?.bag_limit
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (rackNo === null && vehicleType === 1) {
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
      licenceNumber: vehicleType === 0 ? wagonno : '',
      bagType: bagType,
      bagCount,
      wagonno: vehicleType === 1 ? wagonno : '',
      rackno: rackNo,
      gateno: '12',
      labelExample: '123'
    });
    setWagonno('');
    setBagCount('');
    setBagType(BAG_TYPES ? BAG_TYPES[0] : '');
  };

  const handleValueChange = (e, setterFunction) => {
    if (!isNaN(e.target.value) || e.target.value === '') {
      setterFunction(e.target.value);
    }
  };

  return (
    <Fragment>
      <tr className="custom-table">
        <td className={classes.td1}>{index}</td>
        <td
          className={classes.td2}
          style={{
            background: data?.shipment_id
              ? data?.is_belt_running
                ? 'green'
                : 'red'
              : 'white'
          }}
        >
          {data?.id}
        </td>
        {data?.shipment_id ? (
          <td className={classes.transpatentBorder}>
            {data?.bag_type}
          </td>
        ) : (
          <Select
            className={classes.td3}
            variant="outlined"
            value={bagType}
            disabled={data?.shipment_id}
            onChange={e => setBagType(e.target.value)}
          >
            {BAG_TYPES.map((e, index) => (
              <MenuItem className="table-button" value={e} key={index}>
                {e}
              </MenuItem>
            ))}
          </Select>
        )}
        <td className={data?.shipment_id ? classes.td7 : classes.td4Inactive}>
          {data?.shipment_id ? (
            data?.wagon_no || data?.licence_number
          ) : (
            <input
              value={wagonno}
              disabled={data?.shipment_id}
              placeholder={vehicleType == 1 ? 'Add Wagon No.' : 'Add Truck No.'}
              onChange={e => handleValueChange(e, setWagonno)}
            />
          )}
        </td>
        <td className={data?.shipment_id ? classes.td7 : classes.td4Inactive}>
          {data?.shipment_id ? (
            data?.bag_limit
          ) : (
            <input
              style={{ width: '55px' }}
              placeholder="Target"
              value={bagCount}
              disabled={data?.shipment_id}
              onChange={e => handleValueChange(e, setBagCount)}
            />
          )}
        </td>
        <td className={data?.shipment_id ? classes.td4 : classes.td4Inactive}>
          {data?.shipment_id ? data?.bag_count : '-'}
        </td>
        {data?.shipment_id ? (
          <td className={classes.td5}>
            <input
              value={addBagCount}
              className={classes.addBagInput}
              onChange={e => handleValueChange(e, setAddBagCount)}
            />
            <Avatar className={classes.avatar} onClick={handleAddButton}>
              <IoMdAdd />
            </Avatar>
          </td>
        ) : (
          <td className={classes.td4Inactive}>-</td>
        )}
        <td>
          {data?.created_at
            ? new Date(data?.created_at).toLocaleTimeString()
            : '-'}
        </td>
        <td>
          {data?.shipment_id ? (
            <Button className={classes.root} onClick={handleReset}>
              RESET
            </Button>
          ) : (
            <Button className={classes.root} onClick={handleSubmit}>
              START
            </Button>
          )}
        </td>
        <td>
          <Button className={classes.root} disabled={!data.shipment_id || data.is_belt_running} >VIEW</Button>
        </td>
      </tr>
    </Fragment>
  );
};

export default LoaderAnalysisRow;
