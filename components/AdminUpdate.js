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
  ButtonGroup
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

  const handleImShowOff = async () => {
    setImShow(0);
    await post('api/configuration/toggle-imshow', {
      imShow: 1
    });
  };

  const handleImShowOn = async () => {
    setImShow(1);
    await post('api/configuration/toggle-imshow', {
      imShow: 0
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
    };
    fetchRealTimeVideo();
  }, []);

  if (!userData) {
    return <Loader />;
  }

  if (userData.isLoggedIn === false) {
    router.push('/login');
    return <Loader />;
  }

  return (
    <Layout alternateHeader title="Admin Portal">
      <Container>
        <Accordion>
          <AccordionSummary expandIcon={<MdOutlineExpandMore />}>
            Real Time Video
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
                    backgroundColor: imShow === 1 ? '#B5179E' : '#F5F5F5',
                    color: imShow === 0 ? '#B5179E' : '#F5F5F5',
                    // width: '120px',
                    height: '50px'
                  }}
                  onClick={handleImShowOff}
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
                  onClick={handleImShowOn}
                >
                  Off
                </Button>
              </ButtonGroup>
            </div>
          </AccordionDetails>
        </Accordion>{' '}
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
