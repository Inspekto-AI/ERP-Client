import { useContext, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Loader from 'components/Loader';
import { GlobalContext } from 'context/GlobalContext';
import Layout from 'components/Layout';
import Container from 'styles/admin.styles';
import { MdOutlineExpandMore } from 'react-icons/md';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  MenuItem,
  Modal,
  Select
} from '@material-ui/core';
import UpdateDatabase from 'components/UpdateDatabase';
import UpdateModelWeights from 'components/UpdateModelWeights';
import PythonDataExtraction from 'components/PythonDataExtraction';
import { get, getFile, getZipFile, post } from 'utils/api';
import UpdateTmate from 'components/UpdateTmate';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ShipmentOverFlowModal from './ShipmentOverFlowModal';

const useStyles = makeStyles(theme => ({
  select: {
    width: '300px',
    [theme.breakpoints.up(1550)]: {
      width: '450px',
      marginRight: '150px',
      marginLeft: '-40px'
    },
    [theme.breakpoints.down(1550)]: {
      // width: '450px',
      marginRight: 'auto'
    }
  },
  select_1: {
    width: '200px',
    [theme.breakpoints.up(1550)]: {
      width: '250px',
      marginRight: '-30px'
    }
  },
  select_2: {
    width: '100px',
    [theme.breakpoints.up(1550)]: {
      width: '125px'
    }
  },
  toggle: {
    margin: '50px'
  }
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  // bgcolor: 'background.paper',
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const downloadZIP = file => {
  const downloadLink = document.createElement('a');
  const fileName = 'report.zip';
  downloadLink.setAttribute('download', fileName);
  downloadLink.href = URL.createObjectURL(new Blob([file]));
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
};

function Admin() {
  const router = useRouter();
  const classes = useStyles();
  const iframeRef = useRef(null);

  const { userData } = useContext(GlobalContext);
  const [dataExtractionStatus, setDataExtractionStatus] = useState(false);
  const [imShow, setImShow] = useState(0);
  const [frameExtraction, setFrameExtraction] = useState(0);
  const [beltId, setBeltId] = useState(null);
  const [allBelts, setAllBelts] = useState(null);
  const [allPrintingBelts, setAllPrintingBelts] = useState(null);
  const [isWagon, setIsWagon] = useState(false);
  const [imShowError, setImShowError] = useState(null);
  const [showFrame, setShowFrame] = useState(null);
  const [wsURL, setwsURL] = useState('ws://192.168.69.150:8765');
  const [htmlContent, setHtmlContent] = useState('');

  const handleIsWagonChange = async () => {
    let flag = true;
    allPrintingBelts?.map(e => {
      if (e?.printing_belt_id === beltId) {
        flag = false;
      }
      return true;
    });
    if (flag) {
      setIsWagon(true);
    } else {
      setIsWagon(false);
    }
  };

  const handleImShowOff = async () => {
    setImShow(0);
    await post('api/configuration/toggle-imshow', {
      imShow: 0,
      beltId,
      isWagon
    });
  };

  const handleImShowOn = async () => {
    let flag = true;
    allPrintingBelts?.map(e => {
      if (e?.printing_belt_id === beltId) {
        flag = false;
      }
      return true;
    });

    const res = await post('api/configuration/toggle-imshow', {
      imShow: 1,
      beltId,
      isWagon: flag
    });
    // console.log(res?.data);
    if (res?.data !== 'done') {
      // console.log("Cmaera can't be displayed");
      setImShowError(res?.data);
    } else {
      setImShow(1);
      setShowFrame(true);
    }
  };
  const handleFrameExtractionOff = async () => {
    setFrameExtraction(0);
    await post('api/configuration/frame-extraction', {
      frameExtraction: 0
    });
  };

  const handleFrameExtractionOn = async () => {
    setFrameExtraction(1);
    await post('api/configuration/frame-extraction', {
      frameExtraction: 1
    });
  };

  const handleDownload = async () => {
    try {
      // // Send a GET request to the Node.js backend to trigger the download
      // const response = await get(
      //   'api/configuration/download-extracted-frames'
      //   // {
      //   //   responseType: 'arraybuffer' // Tell axios to expect binary data (a zip file)
      //   // }
      // );
      // // Create a Blob from the response data
      // const blob = new Blob([response.data], { type: 'application/zip' });
      // // Convert the Blob to a URL
      // const url = window.URL.createObjectURL(blob);
      // // Create an anchor element and trigger the download
      // const link = document.createElement('a');
      // link.href = url;
      // link.download = 'files.zip'; // Set the desired file name
      // document.body.appendChild(link);
      // link.click();
      // // Cleanup
      // window.URL.revokeObjectURL(url);
      // document.body.removeChild(link);
      // window.open =
      //   'http://localhost:9000/api/configuration/download-extracted-frames';
      // const link = document.createElement('a');
      // link.href =
      //   'http://localhost:9000/api/configuration/download-extracted-frames';
      // link.setAttribute('download', 'yourfile.zip');
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      // fetch('http://localhost:9000/api/configuration/download-extracted-frames')
      //   .then(response => {
      //     console.log('hello');
      //     console.log(response);
      //     return response.blob();
      //   })
      //   .then(blob => {
      //     console.log('hello');
      //     const url = window.URL.createObjectURL(blob);
      //     const a = document.createElement('a');
      //     a.href = url;
      //     a.download = 'abc.zip';
      //     a.click();
      //     window.URL.revokeObjectURL(url);
      //   });
      // window.location.href =
      //   'http://localhost:9000/api/configuration/download-extracted-frames';
      // const response = await getFile(
      //   '/api/configuration/download-extracted-frames'
      // );
      // console.log(response);

      const res = await getZipFile(
        '/api/configuration/download-extracted-frames'
      );
      console.log('response', res.data);
      downloadZIP(res.data);
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', 'file.zip'); // You can name the file
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
    } catch (error) {
      console.error('Error downloading the zip file:', error);
    }
  };

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await get('/api/configuration/data-extraction');
      setDataExtractionStatus(!!res?.data?.data?.dataExtractionStatus);
    };
    fetchStatus();

    const fetchBelts = async () => {
      const res = await get('/api/shipment/all-vehicle');
      setAllBelts(res?.data?.data);
    };
    fetchBelts();
    const fetchPrintingBelts = async () => {
      const res = await get('/api/shipment/all-printing-belt');
      setAllPrintingBelts(res?.data?.data);
    };
    fetchPrintingBelts();
    const fetchImShowFrameExtraction = async () => {
      const res = await get('/api/configuration/imshow-frame-extraction');
      // console.log(res?.data);

      setImShow(res?.data?.imShow === null ? 0 : res?.data?.imShow);
      setFrameExtraction(
        res?.data?.frameExtraction === null ? 0 : res?.data?.frameExtraction
      );
    };
    fetchImShowFrameExtraction();
  }, []);

  useEffect(() => {
    const fetchServerId = async () => {
      await handleIsWagonChange();
      const res = await get('/api/configuration/server-id', {
        beltId
      });
      const serverId = res?.data?.serverId;
      // console.log(isWagon == false);
      setwsURL(
        `ws://192.168.69.${150 + parseInt(serverId, 10)}:${
          isWagon == false ? 8765 : 8766
        }`
      );
    };

    fetchServerId();
  }, [beltId, isWagon]);

  useEffect(() => {
    // console.log(wsURL);
    axios
      .get('/receiver.html')
      .then(response => {
        const html = response.data.replace('%%WS_URL%%', wsURL);
        // console.log(html);
        setHtmlContent(html);
      })
      .catch(error => {
        console.error('An error occurred while fetching the HTML:', error);
      });
  }, [wsURL]);

  // if (!userData) {
  //   return <Loader />;
  // }

  // if (userData.isLoggedIn === false) {
  //   router.push('/login');
  //   return <Loader />;
  // }

  return (
    <>
      {imShowError && (
        <ShipmentOverFlowModal
          open={imShowError}
          close={() => {
            setImShowError(false);
          }}
          error={imShowError}
        />
      )}
      <Modal
        style={{ backgroundColor: 'white' }}
        open={showFrame}
        onClose={() => setShowFrame(null)}
      >
        <>
          <Button
            style={{ float: 'right', margin: '40px' }}
            onClick={() => setShowFrame(false)}
          >
            Close
          </Button>
          {/* <iframe
            ref={iframeRef}
            src="/receiver.html"
            width="1920px"
            height="1000px"
            frameBorder="0"
            scrolling="auto"
            title="Embedded Page"
          >
            Your browser does not support iframes.
          </iframe> */}
          {/* <iframe ref={iframeRef} width="400" height="300" /> */}
          <iframe
            title="I Frame"
            srcDoc={htmlContent}
            width="1280"
            height="720"
            style={{ border: '1px solid black' }}
          />
        </>
      </Modal>
      <Layout alternateHeader title="Admin Portal">
        <Container>
          <Accordion>
            <AccordionSummary expandIcon={<MdOutlineExpandMore />}>
              Real Time Video
            </AccordionSummary>
            <AccordionDetails>
              <div
                className="center"
                style={{ display: 'flex', flexDirection: 'row' }}
              >
                {/* <p className="update-scope">
                Updates database values by fetching info from AWS and restarts
                necessary modules
              </p> */}

                <Select
                  // className={classes.select_1}
                  // value={[beltId, isWagon]}
                  value={beltId === null ? 0 : beltId}
                  onChange={e => {
                    setBeltId(e.target.value);
                  }}
                  style={{
                    fontSize: '14px',
                    background: 'white',
                    width: '240px',
                    marginRight: '50px'
                    // marginRight: '-20px'
                  }}
                  variant="outlined"
                  // IconComponent={KeyboardArrowDownSharpIcon}
                >
                  <MenuItem value={0}>Select Belt</MenuItem>
                  {allBelts?.map((e, idx) => (
                    <MenuItem value={e?.machine_id} key={idx}>
                      {e?.machine_id}
                    </MenuItem>
                  ))}
                  {allPrintingBelts?.map((e, index) => (
                    <MenuItem value={e?.printing_belt_id}>
                      {e?.printing_belt_id}
                    </MenuItem>
                  ))}
                </Select>

                <ButtonGroup
                  // className={classes.select_1}
                  variant="contained"
                  aria-label="outlined primary button group"
                  // className={classes.toggle}
                >
                  <Button
                    className={classes.select_2}
                    style={{
                      backgroundColor: imShow == 1 ? '#B5179E' : '#F5F5F5',
                      color: imShow == 0 ? '#B5179E' : '#F5F5F5',
                      // width: '120px',
                      height: '50px'
                    }}
                    onClick={handleImShowOn}
                  >
                    On
                  </Button>
                  <Button
                    className={classes.select_2}
                    style={{
                      backgroundColor: imShow == 0 ? '#B5179E' : '#F5F5F5',
                      color: imShow == 1 ? '#B5179E' : '#F5F5F5',
                      // width: '120px',
                      height: '50px'
                    }}
                    onClick={handleImShowOff}
                  >
                    Off
                  </Button>
                </ButtonGroup>

                {/* <Button
                  className={classes.select_2}
                  style={{
                    backgroundColor: '#B5179E',
                    color: '#F5F5F5',
                    // width: '120px',
                    height: '50px',
                    marginLeft: '50px'
                  }}
                  onClick={() => setShowFrame(true)}
                >
                  Show
                </Button> */}
              </div>
            </AccordionDetails>
          </Accordion>{' '}
          <Accordion>
            <AccordionSummary expandIcon={<MdOutlineExpandMore />}>
              Frame Extraction
            </AccordionSummary>
            <AccordionDetails>
              <div
                className="center "
                style={{ display: 'flex', flexDirection: 'row' }}
              >
                {/* <p className="update-scope">
                Updates database values by fetching info from AWS and restarts
                necessary modules
              </p> */}
                <ButtonGroup
                  // className={classes.select_1}
                  variant="contained"
                  aria-label="outlined primary button group"
                  // className={classes.toggle}
                >
                  <Button
                    className={classes.select_2}
                    style={{
                      backgroundColor:
                        frameExtraction == 1 ? '#B5179E' : '#F5F5F5',
                      color: frameExtraction == 0 ? '#B5179E' : '#F5F5F5',
                      // width: '120px',
                      height: '50px'
                    }}
                    onClick={handleFrameExtractionOn}
                  >
                    On
                  </Button>
                  <Button
                    className={classes.select_2}
                    style={{
                      backgroundColor:
                        frameExtraction == 0 ? '#B5179E' : '#F5F5F5',
                      color: frameExtraction == 1 ? '#B5179E' : '#F5F5F5',
                      // width: '120px',
                      height: '50px'
                    }}
                    onClick={handleFrameExtractionOff}
                  >
                    Off
                  </Button>
                </ButtonGroup>
                <Button
                  disable
                  className={classes.select_2}
                  style={{
                    backgroundColor: '#B5179E',
                    color: '#F5F5F5',
                    // width: '120px',
                    height: '50px',
                    marginLeft: '50px'
                  }}
                  onClick={handleDownload}
                >
                  Download
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<MdOutlineExpandMore />}>
              Update Database
            </AccordionSummary>
            <AccordionDetails>
              <UpdateDatabase />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<MdOutlineExpandMore />}>
              Update Weight Files
            </AccordionSummary>
            <AccordionDetails>
              <UpdateModelWeights />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<MdOutlineExpandMore />}>
              Python Data Extraction
            </AccordionSummary>
            <AccordionDetails>
              <PythonDataExtraction
                dataExtractionStatus={dataExtractionStatus}
                setDataExtractionStatus={e => setDataExtractionStatus(e)}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<MdOutlineExpandMore />}>
              Update Tmate
            </AccordionSummary>
            <AccordionDetails>
              <UpdateTmate />
            </AccordionDetails>
          </Accordion>
        </Container>
      </Layout>
    </>
  );
}

export default Admin;
