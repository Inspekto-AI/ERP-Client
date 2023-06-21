import { Select, MenuItem } from '@material-ui/core';
import { useState, Fragment, use, useEffect } from 'react';

const ShipmentAnalysisRow = ({
  data,
  BAG_TYPES,
  handleNewShipment,
  index,
  rackNo,
  vehicleType
}) => {
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
      bagType: bagType,
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
    <Fragment>
      <tr className="custom-table">
        <td>{index}</td>
        <td>{data?.id}</td>
        <td style={{ width: '150px' }}>
          <Select
            variant="outlined"
            value={bagType}
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
        </td>
        <td style={{ width: '220px' }}>
          <input
            value={wagonno}
            placeholder={vehicleType == 0 ? 'Add Wagon No.' : 'Add Truck No.'}
            onChange={e => {
              setWagonno(e.target.value);
            }}
          ></input>
        </td>
        <td>
          <input
            style={{ width: '55px' }}
            placeholder="Target"
            value={bagCount}
            onChange={e => {
              setBagCount(e.target.value);
            }}
          ></input>
        </td>
        <td style={{ width: '60px' }}>-</td>
        <td style={{ width: '160px' }}>-</td>
        <td style={{ width: '180px' }}>-</td>
        <td
          className="table-button"
          style={{
            backgroundColor:
              rackNo !== null &&
              wagonno !== null &&
              bagCount !== null &&
              rackNo !== '' &&
              bagCount !== ''
                ? '#008847'
                : 'white',
            color:
              rackNo !== null &&
              wagonno !== null &&
              bagCount !== null &&
              rackNo !== '' &&
              bagCount !== ''
                ? 'white'
                : 'black'
          }}
          onClick={handleSubmit}
        >
          START
        </td>
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
