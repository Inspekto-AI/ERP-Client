import { Select, MenuItem, Avatar } from '@material-ui/core';
import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InfoModal from 'components/InfoModal';

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
    height: '40px',
    width: '40px',
    backgroundColor: '#00A86B',
    margin: '0px',
    padding: '0px',
    marginLeft: '10px',
    cursor: 'pointer'
  },
  avatarDisabled: {
    height: '40px',
    width: '40px',
    backgroundColor: '#778899',
    margin: '0px',
    padding: '0px',
    marginLeft: '10px',
    cursor: 'pointer'
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
    fontSize: '20px',
    padding: '20px'
  },
  transpatentBorder: {
    outline: '2px solid black'
  },
  td7: {
    outline: '2px solid black',
    maxWidth: '8vw',
    width: '10vh'
  }
}));

function LoaderAnalysisRow({
  data,
  BAG_TYPES,
  handleNewShipment,
  index,
  rackNo,
  vehicleType,
  handleBagDone,
  handleBagIncrement,
  handleBeltReset
}) {
  const classes = useStyles();
  const [bagType, setBagType] = useState('');
  const [wagonno, setWagonno] = useState('');
  const [bagCount, setBagCount] = useState('');
  const [addBagCount, setAddBagCount] = useState('');
  const [detailModalOpen, setDetailModalOpen] = useState(null);

  const handleAddButton = async () => {
    // console.log(addBagCount);
    if (addBagCount === '0' || addBagCount === 0 || addBagCount === '') {
      return;
    }
    await handleBagIncrement(
      {
        transaction_id: data?.shipment_id,
        new_bag_limit: parseInt(addBagCount, 10),
        old_limit: data?.bag_limit,
        belt_id: data?.vehicle_id,
        comment: 'test'
      },
      true
    );
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
      bagType,
      bagCount,
      wagonno: vehicleType === 1 ? wagonno : '',
      rackno: vehicleType === 1 ? rackNo : null,
      gateno: 'default',
      labelExample: 'default'
    });
    setWagonno('');
    setBagCount('');
    setBagType('');
  };

  const handleValueChange = (e, setterFunction) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setterFunction(e.target.value);
    }
    // console.log(!Number.isNaN(parseInt(e.target.value)));
    // if (!Number.isNaN(parseInt(e.target.value)) || e.target.value === '') {
    //   setterFunction(e.target.value);
    // }
    // console.log(bagCount);
  };

  return (
    <>
      <tr className="custom-table">
        <td className={classes.td1}>{index}</td>
        <td
          className={classes.td2}
          style={{
            background: data?.shipment_id
              ? data?.is_shipment_complete
                ? 'yellow'
                : data?.is_belt_running
                ? 'green'
                : 'red'
              : 'white'
          }}
        >
          {data?.id}
        </td>
        {data?.shipment_id ? (
          <td className={classes.transpatentBorder}>{data?.bag_type}</td>
        ) : (
          <Select
            className={classes.td3}
            variant="outlined"
            value={bagType === '' ? 0 : bagType}
            disabled={data?.shipment_id}
            onChange={e => setBagType(e.target.value)}
          >
            <MenuItem className="table-button" value={0}>
              Select Grade
            </MenuItem>
            {BAG_TYPES.map((e, idx) => (
              <MenuItem className="table-button" value={e} key={idx}>
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
              placeholder={
                vehicleType === 1 ? 'Add Wagon No.' : 'Add Truck No.'
              }
              onChange={
                // vehicleType === 1
                //   ? (e) => handleValueChange(e, setWagonno)
                //   :
                e => {
                  setWagonno(e.target.value);
                }
              }
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
              // onChange={e => setAddBagCount(e.target.value)}
            />
            <Avatar
              // disabled={null}
              className={
                addBagCount === '0' || addBagCount === ''
                  ? classes.avatarDisabled
                  : classes.avatar
              }
              onClick={handleAddButton}
            >
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
            <Button
              disabled={bagCount === '' || bagCount === 0 || bagCount === '0'}
              className={classes.root}
              onClick={handleSubmit}
            >
              START
            </Button>
          )}
        </td>
        <td>
          <Button
            className={classes.root}
            disabled={!data.shipment_id || data.is_belt_running}
            onClick={() =>
              setDetailModalOpen({
                issue_with_belt: data?.issue_with_belt,
                belt_id: data?.id,
                transaction_id: data?.shipment_id
              })
            }
          >
            VIEW
          </Button>
        </td>
      </tr>
      {detailModalOpen ? (
        <InfoModal
          open={detailModalOpen}
          close={() => setDetailModalOpen(null)}
          hideComment
          hideModify
          jamReset
          title="Belt Stopped"
          handleBeltReset={handleBeltReset}
        >
          <>
            <p style={{ textAlign: 'center' }}>
              {detailModalOpen?.issue_with_belt} -{detailModalOpen?.belt_id}
            </p>
          </>
        </InfoModal>
      ) : null}
    </>
  );
}

export default LoaderAnalysisRow;
