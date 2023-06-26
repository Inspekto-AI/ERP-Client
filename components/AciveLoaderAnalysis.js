import { useState, Fragment, use, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { Avatar } from '@material-ui/core';
import AddMoreBagsModal from 'components/AddMoreBagsModal';

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
  td1: {
    backgroundColor: '#69E866',
    width: '150px'
  },
  td2: {
    outline: '2px solid black'
  },
  td3: {
    outline: '2px solid black'
  },
  td4: {
    outline: '2px solid #6B4EFF'
  }
}));

function ShipmentAnalysisRow({
  ongoingTransactions,
  handleBagDone,
  handleBagIncrement,
  index,
  vehicleType
}) {
  const classes = useStyles();
  const [bagCount, setBagCount] = useState(null);
  const [startTime, setStartTime] = useState(null);

  const [bagModifyModalOpen, setBagModifyModalOpen] = useState(null);

  const handleAddButton = async () => {
    await handleBagIncrement({
      transaction_id: ongoingTransactions?.id,
      new_bag_limit: +bagCount,
      old_limit: ongoingTransactions?.bag_limit,
      comment: 'test'
    });
    setBagCount('');
  };

  const handleReset = () => {
    console.log(1);
    handleBagDone(ongoingTransactions?.id, ongoingTransactions?.vehicle_id);
  };

  useEffect(() => {
    function formatTime(timestamp) {
      const date = new Date(timestamp);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }

    setStartTime(formatTime(ongoingTransactions?.created_at));
  }, []);

  return (
    <>
      <tr className="custom-table">
        <td>{index + 1}</td>
        <td className={classes.td1}>{ongoingTransactions?.vehicle_id}</td>
        <td className={classes.td1}> {ongoingTransactions?.bag_type}</td>
        <td className={classes.td3}>
          {vehicleType === 0
            ? ongoingTransactions?.wagon_no
            : ongoingTransactions?.licence_number}
        </td>
        <td className={classes.td4}>{ongoingTransactions?.bag_limit}</td>
        <td style={{ outline: '2px solid #6B4EFF' }}>
          {ongoingTransactions?.bag_count}
        </td>
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
            value={bagCount}
            placeholder="&nbsp;&nbsp;&nbsp;&nbsp;-"
            style={{
              width: '100px',
              fontSize: '20px'
            }}
            onChange={e => setBagCount(e.target.value)}
          />
          <Avatar
            style={{
              height: '40px',
              width: '40px',
              marginLeft: '20px',
              backgroundColor: '#00A86B'
            }}
            onClick={() => {
              handleAddButton();
            }}
          >
            <IoMdAdd />
          </Avatar>
        </td>

        <td>{startTime}</td>
        <td>
          <Button className={classes.root} onClick={handleReset}>
            RESET
          </Button>
        </td>
        <td>
          <Button className={classes.root}>VIEW</Button>
        </td>
      </tr>
      {bagModifyModalOpen ? (
        <AddMoreBagsModal
          onlyBags
          open={bagModifyModalOpen}
          close={() => setBagModifyModalOpen(null)}
          handleSubmit={e => {
            console.log(e);
            handleBagIncrement(e);
            setBagModifyModalOpen(null);
          }}
        />
      ) : null}
    </>
  );
}

export default ShipmentAnalysisRow;
