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
    opacity: '0.4',
    fontWeight: 200
  },

  td1: {
    backgroundColor: '#69E866',
    width: '8vw'
  },
  td2: {
    outline: '2px solid black'
  },
  td3: {
    outline: '2px solid black',
    maxWidth: '6vw'
  },
  td4: {
    outline: '2px solid #6B4EFF'
  },
  avatar: {
    height: '40px',
    width: '40px',
    marginLeft: '-1px',
    backgroundColor: '#00A86B',
    margin: '0px',
    padding: '0px'
  },
  td5: {
    width: '8vw',
    display: 'flex',
    height: '40px',
    maxHeight: '40px',
    margin: '0px',
    padding: '0px'
  },
  td6: {
    outline: '2px solid #6B4EFF'
  },
  addBagInput: {
    width: '6vw',
    fontSize: '20px'
  }
}));

const LoaderAnalysisRow = ({
  data,
  BAG_TYPES,
  handleNewShipment,
  index,
  rackNo,
  vehicleType,
  handleBagDone,
  handleBagIncrement,
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
    handleBagDone(data?.shipment_id, data?.vehicle_id, null, data?.vehicle_id, data?.vehicle_type, '', data?.bag_count, data?.bag_limit);
  };

  const handleSubmit = async (e) => {
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
  }

  return (
    <Fragment>
      <tr className="custom-table">
        <td className={classes.td1}>{index}</td>
        <td className={classes.td2} style={{ background: data?.shipment_id ? data?.is_belt_running ? 'green' : 'red' : 'white' }} >{data?.id}</td>
        {data?.shipment_id ? (data?.bag_type) : (
          <Select
            variant="outlined"
            value={bagType}
            disabled={data?.shipment_id}
            className="table-button"
            onChange={e => setBagType(e.target.value)}
          >
            {BAG_TYPES.map((e, index) => (
              <MenuItem className="table-button" value={e} key={index}>
                {e}
              </MenuItem>
            ))}
          </Select>
        )}
        <td className={classes.td4}>
          {data?.shipment_id ? (data?.wagon_no || data?.licence_number) : (
            <input
              value={wagonno}
              disabled={data?.shipment_id}
              placeholder={vehicleType == 1 ? 'Add Wagon No.' : 'Add Truck No.'}
              onChange={e => handleValueChange(e, setWagonno)}
            />
          )}
        </td>
        <td>
          {data?.shipment_id ? (data?.bag_limit) : (
            <input
              style={{ width: '55px' }}
              placeholder="Target"
              value={bagCount}
              disabled={data?.shipment_id}
              onChange={e => handleValueChange(e, setBagCount)}
            />
          )}
        </td>
        <td className={classes.td6}>{data?.shipment_id ? data?.bag_count : '-'}</td>
        {data?.shipment_id ? (
          <td className={classes.td5}>
            <input
              value={addBagCount}
              className={classes.addBagInput}
              onChange={e => handleValueChange(e, setAddBagCount)}
            ></input>
            <Avatar
              className={classes.avatar}
              onClick={handleAddButton}
            >
              <IoMdAdd />
            </Avatar>
          </td>
        ) : (
          <td>-</td>
        )}
        <td>{data?.created_at ? new Date(data?.created_at).toLocaleTimeString() : '-'}</td>
        {data?.shipment_id ? (
          <Button className={classes.root} onClick={handleReset}>
            RESET
          </Button>
        ) : (
          <Button className={classes.root} onClick={handleSubmit}>
            START
          </Button>
        )}
        <Button className={classes.root} disabled={!data?.shipment_id || data?.is_belt_running} >VIEW</Button>
      </tr>
    </Fragment>
  );
};

export default LoaderAnalysisRow;
