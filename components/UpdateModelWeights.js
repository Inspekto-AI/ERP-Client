import { put } from 'utils/api';
import FrinksButton from './FrinksButton';

function UpdateAll() {
  const updateFunc = async () => {
    await put('/api/configuration/update-weights');
    window.location.replace('/');
  };

  return (
    <div className="center">
      <p className="update-scope">
        Updates all weight files
      </p>
      <FrinksButton text="Update Weights" onClick={updateFunc} />
    </div>
  );
}

export default UpdateAll;
