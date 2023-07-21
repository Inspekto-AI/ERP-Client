import {
  Input, Button, InputLabel, makeStyles,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { get, post, put } from 'utils/api';
import { BASE_URL } from 'utils/constants';

const useStyles = makeStyles((theme) => ({
  label: {
    marginLeft: '20px',
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
    fontSize: '20px',
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
    fontSize: '20px',
  },
}));

function DiagnosticComponent({ item, beltType }) {
  const classes = useStyles();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    // console.log(beltType);
    if (selectedFile) {
      const formData = new FormData();
      formData.append('video', selectedFile);
      formData.append(
        'beltId',
        beltType === 0 ? item?.machine_id : item?.printing_belt_id,
      );
      formData.append('tcpPort', item?.frame_tcp_port);
      formData.append('frameHeight', item?.frame_height);
      formData.append('frameWidth', item?.frame_width);
      formData.append('isPrinting', beltType === 1);
      // formData.append('description', videoData.description);

      try {
        const response = await post('/api/analyse/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // console.log(response.data.message);
        // Display a success message or perform other actions upon successful upload.
      } catch (error) {
        console.error('Error uploading video:', error.message);
        // Handle errors accordingly.
      }
    }
  };
  return (
    <tr>
      <td>{beltType === 0 ? item?.machine_id : item?.printing_belt_id}</td>
      {/* <td>{item?.is_active === 0 ? 'No' : 'Yes'}</td>
      <td>
        {beltType === 0
          ? item?.vehicle_type === 0
            ? 'Truck'
            : 'Wagon'
          : item?.packer_id}
      </td> */}
      {/* <td>{item?.belt_direction === 0 ? 'Left to Right' : 'Right to Left'}</td>
      <td>{item?.belt_roi}</td>
      <td>{item?.frame_tcp_port}</td>
      <td>{item?.camera_ip}</td>
      <td>{item?.camera_username}</td>
      <td>{item?.camera_password}</td>
      <td>{item?.frame_height}</td>
      <td>{item?.frame_width}</td>
      <td>{item?.relay_id}</td> */}
      {/* <Button>Test Belt</Button> */}
      <Input
        // className={classes.input}
        type="file"
        onChange={handleFileChange}
        placeholder="Select Video"
        accept="video/*"
      />
      <Button onClick={handleUpload}>Submit</Button>
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

export default DiagnosticComponent;
