import { Select, MenuItem, Avatar } from '@material-ui/core';
import { useState, Fragment, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';

const ShipmentAnalysisRow = ({
  data,
  BAG_TYPES,
  handleNewShipment,
  index,
  rackNo,
  vehicleType,
  handleBagDone,
  handleBagIncrement,
}) => {
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
    handleBagDone(data?.shipment_id, data?.vehicle_id, null, data?.vehicle_id, data?.vehicle_type, 'test');
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
        <td>{index}</td>
        <td style={{ background: data?.shipment_id ? data?.is_belt_running ? 'green' : 'red' : 'white' }} >{data?.id}</td>
        <td style={{ width: '150px' }}>
          {data?.shipment_id ? (data?.bag_type) : (
            <Select
              variant="outlined"
              value={bagType}
              disabled={data?.shipment_id}
              className="table-button"
              onChange={e => setBagType(e.target.value)}
              style={{
                width: '250px',
                height: '40px',
                padding: '0px',
                margin: '0px',
                fontWeight: '600',
                outline: 'none'
              }}
            >
              {BAG_TYPES.map((e, index) => (
                <MenuItem className="table-button" value={e} key={index}>
                  {e}
                </MenuItem>
              ))}
            </Select>
          )}
        </td>
        <td style={{ width: '220px' }}>
          {data?.shipment_id ? (data?.wagon_no||data?.licence_number) : (
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
        <td style={{ width: '60px' }}>{data?.shipment_id ? data?.bag_count : '-'}</td>
        {data?.shipment_id ? (
          <td
            style={{
              height: '40px',
              width: '60px',
              display: 'flex',
              maxHeight: '40px',
              padding: '0',
              margin: '0'
            }}
          >
            <input
              value={addBagCount}
              placeholder="&nbsp;&nbsp;&nbsp;&nbsp;-"
              style={{
                width: '100px',
                fontSize: '20px'
              }}
              onChange={e => handleValueChange(e, setAddBagCount)}
            ></input>
            <Avatar
              style={{
                height: '40px',
                width: '40px',
                marginLeft: '20px',
                backgroundColor: '#00A86B'
              }}
              onClick={handleAddButton}
            >
              <IoMdAdd />
            </Avatar>
          </td>
        ) : (
          <td style={{ width: '160px' }}>-</td>
        )}
        <td style={{ width: '180px' }}>{data?.created_at ? new Date(data?.created_at).toLocaleTimeString() : '-'}</td>
        {data?.shipment_id ? (
          <td
            className="table-button"
            onClick={handleReset}
          >
            RESET
          </td>
        ) : (
          <td
            className="table-button"
            style={{
              backgroundColor:
                rackNo !== null &&
                  wagonno !== null &&
                  bagCount !== null &&
                  bagCount !== ''
                  ? '#008847'
                  : 'white',
              color:
                rackNo !== null &&
                  wagonno !== null &&
                  bagCount !== null &&
                  bagCount !== ''
                  ? 'white'
                  : 'black'
            }}
            onClick={handleSubmit}
          >
            START
          </td>)}
        <td>
          <button className="table-button" style={{ fontWeight: '600' }}>
            VIEW
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

export default ShipmentAnalysisRow;
