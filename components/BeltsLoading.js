import { Input, Button, InputLabel, makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { get, post, put } from 'utils/api';
import { BASE_URL } from 'utils/constants';

const useStyles = makeStyles(theme => ({
  input: {
    border: '1px solid black',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    width: '200px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    // marginTop: '80x',
    margin: '20px',
    fontSize: '20px'
  },
  button: {
    border: '1px solid black',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    width: '100px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    // marginTop: '80x',
    margin: '20px',
    height: '48px',
    fontSize: '20px'
  }
}));

function BeltsLoading({ item }) {
  const classes = useStyles();

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Input
          placeholder="Enter name"
          className={classes.input}
          disableUnderline
          //   value={name1}
          //   onChange={e => setName1(e.target.value)}
          disabled={isEdit1 && isEditButton1}
        />
      </div>
    </div>
  );
}

export default BeltsLoading;
