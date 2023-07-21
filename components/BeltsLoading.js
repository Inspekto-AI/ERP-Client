import { Input, Button, InputLabel, makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { get, post, put } from 'utils/api';
import { BASE_URL } from 'utils/constants';

const useStyles = makeStyles(theme => ({
  label: {
    marginLeft: '20px'
  },
  input: {
    border: '1px solid black',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    width: '100px',
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

function BeltsLoading({ item, beltType }) {
  const classes = useStyles();

  return (
    <tr>
      <td>{beltType === 0 ? item?.machine_id : item?.printing_belt_id}</td>
      <td>{item?.is_active === 0 ? 'No' : 'Yes'}</td>
      <td>
        {beltType === 0
          ? item?.vehicle_type === 0
            ? 'Truck'
            : 'Wagon'
          : item?.packer_id}
      </td>
      <td>{item?.belt_direction === 0 ? 'Left to Right' : 'Right to Left'}</td>
      <td>{item?.belt_roi}</td>
      <td>{item?.frame_tcp_port}</td>
      <td>{item?.camera_ip}</td>
      <td>{item?.camera_username}</td>
      <td>{item?.camera_password}</td>
      <td>{item?.frame_height}</td>
      <td>{item?.frame_width}</td>
      <td>{item?.relay_id}</td>
    </tr>
    // <div>
    //   <div
    //     style={{
    //       display: 'flex',
    //       alignItems: 'center'
    //     }}
    //   >
    //     <div>
    //       <InputLabel className={classes.label}>Loader Id</InputLabel>
    //       <Input
    //         placeholder="Enter name"
    //         className={classes.input}
    //         disableUnderline
    //         value={item?.machine_id}
    //         //   onChange={e => setName1(e.target.value)}
    //         //   disabled={isEdit1 && isEditButton1}
    //         disabled={true}
    //       />
    //     </div>
    //     <div>
    //       <InputLabel className={classes.label}>Vehicle Type</InputLabel>

    //       <Input
    //         placeholder="Enter name"
    //         className={classes.input}
    //         disableUnderline
    //         value={item?.vehicle_type === 0 ? 'Truck' : 'Wagon'}
    //         //   onChange={e => setName1(e.target.value)}
    //         //   disabled={isEdit1 && isEditButton1}
    //         disabled={true}
    //       />
    //     </div>
    //     <div>
    //       <InputLabel className={classes.label}>Belt Direction</InputLabel>

    //       <Input
    //         placeholder="Enter name"
    //         className={classes.input}
    //         style={{ width: '150px' }}
    //         disableUnderline
    //         value={
    //           item?.belt_direction === 0 ? 'Left to Right' : 'Right to Left'
    //         }
    //         //   onChange={e => setName1(e.target.value)}
    //         //   disabled={isEdit1 && isEditButton1}
    //         disabled={true}
    //       />
    //     </div>
    //     <div>
    //       <InputLabel className={classes.label}>Belt ROI</InputLabel>

    //       <Input
    //         placeholder="Enter name"
    //         className={classes.input}
    //         disableUnderline
    //         value={item?.belt_roi}
    //         //   onChange={e => setName1(e.target.value)}
    //         //   disabled={isEdit1 && isEditButton1}
    //         disabled={true}
    //       />
    //     </div>
    //     <div>
    //       <InputLabel className={classes.label}>Camera IP</InputLabel>

    //       <Input
    //         placeholder="Enter name"
    //         className={classes.input}
    //         disableUnderline
    //         value={item?.camera_ip}
    //         //   onChange={e => setName1(e.target.value)}
    //         //   disabled={isEdit1 && isEditButton1}
    //         disabled={true}
    //       />
    //     </div>
    //     <div>
    //       <InputLabel className={classes.label}>Frame Height</InputLabel>

    //       <Input
    //         placeholder="Enter name"
    //         className={classes.input}
    //         disableUnderline
    //           value={item?.frame_height}
    //         //   onChange={e => setName1(e.target.value)}
    //         //   disabled={isEdit1 && isEditButton1}
    //         disabled={true}
    //       />
    //     </div>
    //     <div>
    //       <InputLabel className={classes.label}>Frame Width</InputLabel>

    //       <Input
    //         placeholder="Enter name"
    //         className={classes.input}
    //         disableUnderline
    //         //   value={item?.}
    //         //   onChange={e => setName1(e.target.value)}
    //         //   disabled={isEdit1 && isEditButton1}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}

export default BeltsLoading;
