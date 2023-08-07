import { Input, Button, InputLabel, makeStyles } from '@material-ui/core';
import { useDebugValue, useEffect, useState, useContext } from 'react';
import { get, post, put } from 'utils/api';
import { BASE_URL } from 'utils/constants';
import { SocketContext } from 'context/SocketContext';
import ShipmentOverFlowModal from './ShipmentOverFlowModal';

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

function DiagnosticComponent({ item, beltType }) {
  const classes = useStyles();
  const socket = useContext(SocketContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalysing, setIsAnalysing] = useState(1);

  const [shipmentOverflow, setShipmentOverflow] = useState(null);

  const handleFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    // console.log(beltType);
    if (selectedFile) {
      const formData = new FormData();
      formData.append('video', selectedFile);
      formData.append(
        'beltId',
        beltType === 0 ? item?.machine_id : item?.printing_belt_id
      );
      formData.append('tcpPort', item?.frame_tcp_port);
      formData.append('frameHeight', item?.frame_height);
      formData.append('frameWidth', item?.frame_width);
      formData.append('isPrinting', beltType === 1);
      // formData.append('description', videoData.description);

      try {
        const response = await post('/api/analyse/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('response', response);
        if (response?.data?.data !== 'done') {
          setShipmentOverflow(response?.data?.data);
        } else {
          setIsAnalysing(true);
        }
        // console.log(response.data.message);
        // Display a success message or perform other actions upon successful upload.
      } catch (error) {
        console.error('Error uploading video:', error.message);
        // Handle errors accordingly.
      }
    }
  };

  const handleDownload = async () => {
    const isVideoPresent = await get('/api/analyse/is-video-present', {
      beltId: beltType === 0 ? item?.machine_id : item?.printing_belt_id
    });

    // console.log(isVideoPresent);

    if (isVideoPresent?.data === 'no video') {
      return;
    }

    const url = `http://localhost:9000/api/analyse/download?beltId=${
      beltType === 0 ? item?.machine_id : item?.printing_belt_id
    }`;

    const link = document.createElement('a');
    link.href = url;
    link.download = `local_${item?.machine_id}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchAnalysingStatus = async () => {
    const res = await get('/api/analyse/get-analyse-status', {
      beltId: beltType === 0 ? item?.machine_id : item?.printing_belt_id,
      beltType
    });
    setIsAnalysing(res?.data[0]?.is_local_analysing);
  };
  useEffect(() => {
    fetchAnalysingStatus();
  });
  useEffect(() => {
    socket.on('analysis-complete', data => {
      setIsAnalysing(false);
    });
  }, [socket]);
  return (
    <tr>
      {shipmentOverflow && (
        <ShipmentOverFlowModal
          open={shipmentOverflow}
          close={() => {
            setShipmentOverflow(false);
          }}
          error={shipmentOverflow}
        />
      )}
      <td>{beltType === 0 ? item?.machine_id : item?.printing_belt_id}</td>
      <td>
        <Input
          // className={classes.input}
          type="file"
          onChange={handleFileChange}
          placeholder="Select Video"
          accept="video/*"
        />
      </td>
      <td>
        <Button onClick={handleUpload}>Submit</Button>
      </td>
      <td>
        {' '}
        <Button disabled={isAnalysing} onClick={handleDownload}>
          Download
        </Button>
      </td>
    </tr>
  );
}

export default DiagnosticComponent;
