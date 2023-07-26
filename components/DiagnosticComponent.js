import { Input, Button, InputLabel, makeStyles } from '@material-ui/core';
import { useDebugValue, useEffect, useState } from 'react';
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

function DiagnosticComponent({ item, beltType }) {
  const classes = useStyles();

  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalysing, setIsAnalysing] = useState(1);

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

        // console.log(response.data.message);
        // Display a success message or perform other actions upon successful upload.
      } catch (error) {
        console.error('Error uploading video:', error.message);
        // Handle errors accordingly.
      }
    }
  };

  const handleDownload = async () => {
    const url = `http://localhost:9000/api/analyse/download?beltId=${
      beltType === 0 ? item?.machine_id : item?.printing_belt_id
    }`;

    const link = document.createElement('a');
    link.href = url;
    link.download = 'video';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchAnalysingStatus = async () => {
    const res = await get('/api/analyse/get-analyse-status', {
      beltId: beltType === 0 ? item?.machine_id : item?.printing_belt_id,
      beltType: beltType
    });
    setIsAnalysing(res?.data[0]?.is_analysing);
  };
  useEffect(() => {
    fetchAnalysingStatus();
  });

  return (
    <tr>
      <td>{beltType === 0 ? item?.machine_id : item?.printing_belt_id}</td>

      <Input
        // className={classes.input}
        type="file"
        onChange={handleFileChange}
        placeholder="Select Video"
        accept="video/*"
      />
      <Button onClick={handleUpload}>Submit</Button>
      <Button disabled={isAnalysing} onClick={handleDownload}>
        Download
      </Button>
    </tr>
  );
}

export default DiagnosticComponent;
