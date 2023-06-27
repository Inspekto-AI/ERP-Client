import React, { useEffect, useState, useContext, Fragment } from 'react';
import { GlobalContext } from 'context/GlobalContext';
import ShipmentAnalysisRow from './LoaderAnalysisRow';
import { setLocalStorage, getLocalStorage } from 'utils/storage';

function ShipmentAnalysis({
  vehicleType,
  vehicleBelts,
  handleNewShipment,
  handleFlag,
  handleBagDone,
  handleBagIncrement
}) {
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
  }, [])

  return (
    <Fragment>
      {vehicleType === 1 && (
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
              width: '160px',
              border: 'none',
              padding: '0 10px'
            }}
            placeholder="Enter Rack No."
            onChange={e => {
              setRackNo(e.target.value);
              setRackNoModified(true);
            }}
            value={rackNo}
          />
          {rackNoModified ? (
            <button
              style={{
                backgroundColor: '#69E866',
                fontSize: '20px',
                borderRadius: '6px',
                padding: '2px 9px',
                fontWeight: '700',
                border: 'none'
              }}
              onClick={() => {
                setRackNoModified(false);
                setLocalStorage('rackno', rackNo);
                setSavedRackNo(rackNo);
              }}
            >
              SAVE
            </button>) : null}
        </div>
      )}
      <div
        style={{
          height: '810px',
          maxWidth: '1900px',
          overflowX: 'auto',
          maxHeight: '810px',
          overflowY: 'auto',
          marginTop: vehicleType === 1 ? '0' : '120px'
        }}
      >
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
            {filterVehicle && Object.values(filterVehicle).map((e, index) => {
              return (
                <ShipmentAnalysisRow
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
              )
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default ShipmentAnalysis;
