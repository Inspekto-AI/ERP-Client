import React from 'react';
import Card from './Card';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function SystemHealth() {
  const offline = [1, 2, 3];
  const camera = [1, 2, 3, 4, 5, 6, 7, 8];
  const transmission = [1, 2, 3, 4];
  const server = [1, 2];

  const [value, setValue] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div style={{ padding: '20px 5px 20px 20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingRight: '30px',
            marginTop: '20px'
          }}
        >
          <h1 style={{ color: '#7209B7', paddingBottom: '20px' }}>
            System Health Monitoring
          </h1>
          <DatePicker
            label="Select Date"
            value={value}
            onChange={newValue => {
              setValue(newValue);
            }}
            renderInput={params => <TextField {...params} />}
          />
        </div>
        <h3 style={{ float: 'left', color: '#5A5A5A' }}>Offline</h3>
        <hr
          style={{
            margin: '20px 70px 20px 100px',
            height: '3px',
            background: '#050317'
          }}
        />
        <div
          style={{ display: 'flex', flexWrap: 'wrap', paddingBottom: '20px' }}
        >
          {offline.map((obj, i) => (
            <Card active={false} type={'camera'} name={'Xyz Name'} />
          ))}
        </div>
        <h3 style={{ float: 'left', color: '#5A5A5A' }}>Camera</h3>
        <hr
          style={{
            margin: '20px 70px 20px 100px',
            height: '3px',
            background: '#050317'
          }}
        />
        <div
          style={{ display: 'flex', flexWrap: 'wrap', paddingBottom: '20px' }}
        >
          {camera.map((obj, i) => (
            <Card active={true} type={'camera'} name={'691LM1'} />
          ))}
        </div>
        <h3 style={{ float: 'left', color: '#5A5A5A' }}>Transmission Device</h3>
        <hr
          style={{
            margin: '20px 70px 20px 250px',
            height: '3px',
            background: '#050317'
          }}
        />
        <div
          style={{ display: 'flex', flexWrap: 'wrap', paddingBottom: '20px' }}
        >
          {transmission.map((obj, i) => (
            <Card active={true} type={'transmission'} name={'691LM1'} />
          ))}
        </div>
        <h3 style={{ float: 'left', color: '#5A5A5A' }}>Server</h3>
        <hr
          style={{
            margin: '20px 70px 20px 100px',
            height: '3px',
            background: '#050317'
          }}
        />
        <div
          style={{ display: 'flex', flexWrap: 'wrap', paddingBottom: '20px' }}
        >
          {server.map((obj, i) => (
            <Card active={true} type={'server'} name={'691LM1'} />
          ))}
        </div>
      </div>
    </LocalizationProvider>
  );
}
