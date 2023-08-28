import { put } from 'utils/api';
import FrinksButton from './FrinksButton';
import { useState } from 'react';
import ShipmentOverFlowModal from './ShipmentOverFlowModal';

function UpdateDatabase() {
  const [error, setError] = useState(null);
  const updateFunc = async () => {
    const res = await put('/api/configuration/update-database');
    console.log(res);
    setError(res?.data?.message);

    //   window.location.replace('/');
  };

  return (
    <div className="center">
      {error && (
        <ShipmentOverFlowModal
          open={error}
          close={() => {
            setError(false);
          }}
          error={error}
        />
      )}
      <p className="update-scope">
        Updates database values by fetching info from AWS and restarts necessary
        modules
      </p>
      <FrinksButton text="Update Database" onClick={updateFunc} />
    </div>
  );
}

export default UpdateDatabase;
