import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from 'context/GlobalContext';
import LoaderAnalysisRow from './LoaderAnalysisRow';
import { setLocalStorage, getLocalStorage } from 'utils/storage';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Define styles using makeStyles
const useStyles = makeStyles(() => ({
  rackContainer: {
    marginTop: '120px',
    marginLeft: '80px',
    fontSize: '24px',
    fontWeight: '800'
  },
  rackContainer1: {
    marginTop: '120px',
    marginLeft: '80px',
    fontSize: '24px',
    fontWeight: '800',
    height: '20px'
  },
  inputRackNo: {
    marginTop: '20px',
    height: '30px',
    fontSize: '20px',
    marginRight: '10px',
    marginLeft: '5px',
    borderRadius: '6px',
    width: '130px',
    border: 'none',
    padding: '0 10px'
  },
  rackButton: {
    backgroundColor: '#008847',
    fontSize: '20px',
    borderRadius: '6px',
    // padding: '2px 9px',
    fontWeight: '700',
    border: 'none',
    height: '30px'
  },
  editRackButton: {
    backgroundColor: '#69E866',
    fontSize: '20px',
    borderRadius: '6px',
    // padding: '2px 9px',
    fontWeight: '700',
    border: 'none',
    height: '30px'
  },
  tableContainer: {
    marginTop: '140px'
    // marginLeft: '80px',
    // fontSize: '24px',
    // fontWeight: '800'
  },
  tableDiv: {
    paddingBottom: '30px'
  }
}));

function ShipmentAnalysis({
  vehicleType,
  vehicleBelts,
  handleNewShipment,
  handleFlag,
  handleBagDone,
  handleBagIncrement
}) {
  const classes = useStyles();
  const { bagTypes: BAG_TYPES } = useContext(GlobalContext);
  const [filterButton, setFilterButton] = useState(2);
  const [filterVehicle, setFiltervehicle] = useState();
  const [rackNo, setRackNo] = useState('');
  const [rackNoModified, setRackNoModified] = useState(false);
  const [savedRackNo, setSavedRackNo] = useState('');

  useEffect(() => {
    setFilterButton(vehicleType);
  }, [vehicleType]);

  useEffect(() => {
    const filtertedLoaders = {};
    if (vehicleBelts) {
      Object.values(vehicleBelts).forEach(element => {
        if (element.vehicle_type === filterButton) {
          filtertedLoaders[element.vehicle_id] = element;
        }
      });
      setFiltervehicle(filtertedLoaders);
    }
  }, [vehicleBelts, filterButton]);

  useEffect(() => {
    setSavedRackNo(getLocalStorage('rackno'));
    setRackNo(getLocalStorage('rackno'));
  }, []);

  return (
    <>
      {vehicleType === 1 && (
        <div className={classes.rackContainer}>
          RACK NUMBER :{' '}
          <input
            className={classes.inputRackNo}
            placeholder="Rack No."
            onChange={e => {
              setRackNo(e.target.value);
              setRackNoModified(true);
            }}
            value={rackNo}
          />
          {rackNoModified ? (
            <Button
              className={classes.editRackButton}
              onClick={() => {
                setRackNoModified(false);
                setLocalStorage('rackno', rackNo);
                setSavedRackNo(rackNo);
              }}
            >
              SAVE
            </Button>
          ) : null}
        </div>
      )}
      {vehicleType === 0 && <div className={classes.rackContainer1}></div>}
      <div className={classes.tableDiv}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>LODNO</th>
              <th>GRADE</th>
              <th>{vehicleType === 1 ? 'WAGON NO' : 'TRUCK NO'}</th>
              <th>TARGET</th>
              <th>ACTUAL</th>
              <th>ADD BAG</th>
              <th>START TIME</th>
              <th>SET</th>
              <th>VIEW</th>
            </tr>
          </thead>
          <tbody>
            {filterVehicle &&
              Object.values(filterVehicle).map((e, index) => {
                return (
                  <LoaderAnalysisRow
                    key={index}
                    data={e}
                    BAG_TYPES={BAG_TYPES}
                    handleNewShipment={arg => handleNewShipment(arg)}
                    handleFlag={handleFlag}
                    index={index + 1}
                    rackNo={savedRackNo}
                    vehicleType={vehicleType}
                    handleBagDone={handleBagDone}
                    handleBagIncrement={handleBagIncrement}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShipmentAnalysis;
