import { useContext, useEffect, useState } from 'react';
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
  Button,
  ButtonGroup,
  MenuItem,
  Select
} from '@material-ui/core';
import UpdateDatabase from 'components/UpdateDatabase';
import UpdateModelWeights from 'components/UpdateModelWeights';
import PythonDataExtraction from 'components/PythonDataExtraction';
import { get, post } from 'utils/api';
import UpdateTmate from 'components/UpdateTmate';
import { makeStyles } from '@material-ui/core/styles';

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

function Admin() {
  const router = useRouter();
  const classes = useStyles();

  const { userData } = useContext(GlobalContext);
  const [dataExtractionStatus, setDataExtractionStatus] = useState(false);
  const [imShow, setImShow] = useState(1);
  const [frameExtraction, setFrameExtraction] = useState(1);
  const [beltId, setBeltId] = useState(null);
  const [allBelts, setAllBelts] = useState(null);
  const [allPrintingBelts, setAllPrintingBelts] = useState(null);
  const [isWagon, setIsWagon] = useState(0);

  const handleImShowOff = async () => {
    setImShow(0);
    await post('api/configuration/toggle-imshow', {
      imShow: 0,
      beltId: beltId,
      isWagon
    });
  };

  const handleImShowOn = async () => {
    setImShow(1);
    const res = await post('api/configuration/toggle-imshow', {
      imShow: 1,
      beltId: beltId,
      isWagon
    });
    console.log(res?.data?.data);
    if (res?.data?.data !== 'done') {
      console.log("Cmaera can't be displayed");
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

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await get('/api/configuration/data-extraction');
      setDataExtractionStatus(!!res?.data?.data?.dataExtractionStatus);
    };
    fetchStatus();
    const fetchRealTimeVideo = async () => {
      const res = await get('/api/configuration/initialize-frontend');
      console.log(res?.data?.data);
      setImShow(res?.data?.data?.real_time_video);
      setFrameExtraction(res?.data?.data?.frame_extraction);
    };
    fetchRealTimeVideo();
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
  }, []);

  // if (!userData) {
  //   return <Loader />;
  // }

  // if (userData.isLoggedIn === false) {
  //   router.push('/login');
  //   return <Loader />;
  // }

  return (
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
                value={[beltId, isWagon]}
                onChange={e => {
                  setBeltId(e.target.value[0]);
                  setIsWagon(e.target.value[1]);
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
                <MenuItem value={[null, 0]}>Select Belt</MenuItem>
                {allBelts?.map(e => {
                  return (
                    <MenuItem value={[e?.machine_id, true]}>
                      {e?.machine_id}
                    </MenuItem>
                  );
                })}
                {allPrintingBelts?.map(e => {
                  return (
                    <MenuItem value={[e?.printing_belt_id, false]}>
                      {e?.printing_belt_id}
                    </MenuItem>
                  );
                })}
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
                    backgroundColor: imShow === 1 ? '#B5179E' : '#F5F5F5',
                    color: imShow === 0 ? '#B5179E' : '#F5F5F5',
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
                    backgroundColor: imShow === 0 ? '#B5179E' : '#F5F5F5',
                    color: imShow === 1 ? '#B5179E' : '#F5F5F5',
                    // width: '120px',
                    height: '50px'
                  }}
                  onClick={handleImShowOff}
                >
                  Off
                </Button>
              </ButtonGroup>
            </div>
          </AccordionDetails>
        </Accordion>{' '}
        <Accordion>
          <AccordionSummary expandIcon={<MdOutlineExpandMore />}>
            Frame Extraction
          </AccordionSummary>
          <AccordionDetails>
            <div className="center">
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
                      frameExtraction === 1 ? '#B5179E' : '#F5F5F5',
                    color: frameExtraction === 0 ? '#B5179E' : '#F5F5F5',
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
                      frameExtraction === 0 ? '#B5179E' : '#F5F5F5',
                    color: frameExtraction === 1 ? '#B5179E' : '#F5F5F5',
                    // width: '120px',
                    height: '50px'
                  }}
                  onClick={handleFrameExtractionOff}
                >
                  Off
                </Button>
              </ButtonGroup>
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
  );
}

export default Admin;
