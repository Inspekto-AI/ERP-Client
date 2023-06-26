import React, { useEffect, useState, useContext, Fragment } from 'react';
import { GlobalContext } from 'context/GlobalContext';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ShipmentAnalysisRow from './AciveLoaderAnalysis';
import ShipmentInactiveAnalysis from './InAciveLoaderAnalysis';

// Define styles using makeStyles
const useStyles = makeStyles(theme => ({
  rackContainer: {
    marginTop: '120px',
    marginLeft: '80px',
    fontSize: '24px',
    fontWeight: '800'
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
  }
}));

function ShipmentAnalysis({
  ongoingTransactions,
  vehicleType,
  vehicleBelts,
  handleNewShipment,
  handleFlag,
  handleBagDone,
  handleBagIncrement
}) {
  const classes = useStyles();

  const {
    getLocalStorage,
    setLocalStorage,
    bagTypes: BAG_TYPES
  } = useContext(GlobalContext);

  const [filterButton, setFilterButton] = useState(2);
  const [filterVehicle, setFiltervehicle] = useState();
  const [rackNo, setRackNo] = useState(getLocalStorage('rackNo'));
  const [rackNoSaved, setRackNoSaved] = useState(getLocalStorage('rackNo'));
  const [edit, setEdit] = useState(false);
  let len = 0;

  useEffect(() => {
    setFilterButton(vehicleType);
  }, [vehicleType]);

  useEffect(() => {
    if (filterButton === 2) {
      setFiltervehicle(vehicleBelts);
    } else {
      setFiltervehicle(
        vehicleBelts && vehicleBelts.length !== 0
          ? vehicleBelts.filter(
              vehicle => vehicle.vehicle_type === filterButton
            )
          : null
      );
    }
    setRackNoSaved(getLocalStorage('rackNo'));
    setRackNo(getLocalStorage('rackNo'));
  }, [vehicleBelts, filterButton]);

  return (
    <>
      {vehicleType === 0 && (
        <div className={classes.rackContainer}>
          RACK NUMBER :{' '}
          <input
            className={classes.inputRackNo}
            placeholder="Rack No."
            onChange={e => setRackNo(e.target.value)}
            value={rackNo}
          />
          <Button
            className={edit ? classes.editRackButton : classes.rackButton}
            onClick={e => {
              setLocalStorage('rackNo', rackNo);
              setRackNoSaved(rackNo);
              setEdit(true);
              setTimeout(() => {
                setEdit(false);
              }, 1000);
            }}
          >
            {edit === true ? 'SAVED' : rackNoSaved === null ? 'SAVE' : 'EDIT'}
          </Button>
        </div>
      )}
      <div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>LODNO</th>
              <th>GRADE</th>
              <th>{vehicleType === 0 ? 'WAGON NO' : 'TRUCK NO'}</th>
              <th>TARGET</th>
              <th>ACTUAL</th>
              <th>ADD BAG</th>
              <th>START TIME</th>
              <th>SET</th>
              <th>VIEW</th>
            </tr>
          </thead>
          <tbody>
            {ongoingTransactions &&
              Object.keys(ongoingTransactions)
                ?.filter(
                  e => ongoingTransactions[e].vehicle_type === vehicleType
                )
                ?.map((e, index) => {
                  len++;
                  return (
                    <ShipmentAnalysisRow
                      ongoingTransactions={ongoingTransactions[e]}
                      BAG_TYPES={BAG_TYPES}
                      handleBagDone={handleBagDone}
                      handleBagIncrement={handleBagIncrement}
                      index={index}
                      vehicleType={vehicleType}
                    />
                  );
                })}

            {filterVehicle &&
              filterVehicle?.map((e, index) => {
                len++;
                return (
                  <ShipmentInactiveAnalysis
                    data={e}
                    BAG_TYPES={BAG_TYPES}
                    handleNewShipment={arg => handleNewShipment(arg)}
                    handleFlag={handleFlag}
                    index={len}
                    rackNo={rackNoSaved}
                    vehicleType={vehicleType}
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
