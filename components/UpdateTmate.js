import { useState } from 'react';
import { put } from 'utils/api';
import { TextField } from '@material-ui/core';
import FrinksButton from './FrinksButton';

function UpdateTmate() {
  const [key, setKey] = useState('');
  const [name, setName] = useState('');

  const updateFunc = async () => {
    const res = await put('/api/configuration/update-tmate', {
      key,
      name,
    });
    if (res.data.success) {
      alert('Tmate updated please restart');
      setKey('');
      setName('');
    }
  };

  return (
    <div className="center">
      <p className="update-scope">
        Updates tmate key
      </p>
      <TextField
        variant="outlined"
        placeholder="Tmate Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <br />
      <TextField
        variant="outlined"
        placeholder="Tmate Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <FrinksButton text="Update Tmate" onClick={updateFunc} />
    </div>
  );
}

export default UpdateTmate;
