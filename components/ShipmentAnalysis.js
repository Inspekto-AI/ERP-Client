import React, { useEffect, useState, useContext, Fragment } from 'react';
import { GlobalContext } from 'context/GlobalContext';
import ShipmentAnalysisRow from './AciveLoaderAnalysis';
import ShipmentInactiveAnalysis from './InAciveLoaderAnalysis';

function ShipmentAnalysis({
  ongoingTransactions,
  vehicleType,
  vehicleBelts,
  handleNewShipment,
  handleFlag,
  handleBagDone,
  handleBagIncrement
}) {
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
    <Fragment>
      {vehicleType === 0 && (
        <div
          style={{
            marginTop: '120px',
            marginLeft: '80px',
            fontSize: '24px',
            fontWeight: '800'
          }}
        >
          RACK NUMBER :{' '}
          <input
            style={{
              marginTop: '20px',
              height: '30px',
              fontSize: '20px',
              marginRight: '10px',
              marginLeft: '5px',
              borderRadius: '6px',
              width: '130px',
              border: 'none',
              padding: '0 10px'
            }}
            placeholder="&nbsp;&nbsp;&nbsp;Enter Rack No."
            onChange={e => setRackNo(e.target.value)}
            value={rackNo}
          ></input>
          <button
            style={{
              backgroundColor: edit === true ? '#008847' : '#69E866',
              fontSize: '20px',
              borderRadius: '6px',
              padding: '2px 9px',
              fontWeight: '700',
              border: 'none'
            }}
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
          </button>
        </div>
      )}
      <div
        style={{
          height: '810px',
          maxWidth: '1900px',
          overflowX: 'auto',
          maxHeight: '810px',
          overflowY: 'auto',
          marginTop: vehicleType === 0 ? '0' : '130px'
        }}
      >
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
                  // console.log(ongoingTransactions[e]);
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
    </Fragment>
  );
}

export default ShipmentAnalysis;
