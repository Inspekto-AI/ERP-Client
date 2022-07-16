import { useState, useEffect } from 'react';
import Container from 'styles/maintenanceForm.styles';
import PropTypes from 'prop-types';
import {
  Button,
  makeStyles,
  FormControl,
  Select,
  MenuItem,
  TextField
} from '@material-ui/core';
import InfoModal from 'components/InfoModal';
import FrinksButton from 'components/FrinksButton';
import { MaintenanceQuery } from 'reactQueries/maintenanceQueries';
import Loader from 'components/Loader';
import { get } from 'utils/api';

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.trypanBlue.main,
    fontSize: '30px',
    fontWeight: '900',
    position: 'relative',
    fontFamily: 'Titillium Web'
  },
  close: {
    marginTop: '10px',
    '& .MuiButtonBase-root': {
      color: 'black',

      '& .MuiButton-label': {
        fontWeight: '900'
      }
    }
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 40px'
  },
  formContainer: {
    background: 'white'
  }
}));

const MaintenanceForm = ({ close }) => {
  const classes = useStyles();
  const [machineType, setMachineType] = useState('');
  const [beltId, setBeltId] = useState('');
  const [reason, setReason] = useState('');
  const [downTill, setDownTill] = useState('');
  const [comments, setComments] = useState('');
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [beltIdList, setBeltIdList] = useState(null);
  const maintenanceMutation = MaintenanceQuery();

  useEffect(() => {
    const fetchBeltIds = async type => {
      const res = await get('/api/transaction/beltIds', {
        type
      });
      setBeltIdList(res?.data?.data);
    };
    if (machineType !== '' && !beltIdList) {
      // fetch beltIds
      fetchBeltIds(machineType);
    }
  }, [beltIdList, machineType]);

  useEffect(() => {
    if (maintenanceMutation.isSuccess) {
      maintenanceMutation.reset();
      close();
    }
  }, [close, maintenanceMutation]);

  const handleSubmit = () => {
    setInfoModalOpen(false);
    maintenanceMutation.mutate({
      machine_type: machineType === 0 ? 'Printing machine' : 'Counting machine',
      belt_id: beltId,
      reason,
      comments,
      down_till: new Date(downTill).getTime()
    });
  };

  return (
    <Container>
      {maintenanceMutation.isLoading ? <Loader /> : null}
      <div className={classes.formContainer}>
        <div className={classes.heading}>
          <div className={classes.title}>
            <p>Create new maintenance request</p>
          </div>
          <div className={classes.close}>
            <Button onClick={() => close()}>X Close</Button>
          </div>
        </div>
        <div className="sub-heading">Machinery type</div>
        <form>
          <div className="form">
            <div className="input-container">
              <div className="label">Machine type</div>
              <FormControl>
                {machineType === '' ? (
                  <div className="select-label">Select</div>
                ) : null}
                <Select
                  variant="outlined"
                  value={machineType}
                  onChange={e => {
                    setMachineType(e.target.value);
                    setBeltId('');
                    setBeltIdList(null);
                  }}
                >
                  <MenuItem value={0}>Printing machine</MenuItem>
                  <MenuItem value={1}>Counting machine</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="input-container">
              <div className="label">Belt ID</div>
              <FormControl>
                {beltId === '' ? (
                  <div className="select-label">Select</div>
                ) : null}
                <Select
                  variant="outlined"
                  value={beltId}
                  onChange={e => setBeltId(e.target.value)}
                  disabled={machineType === ''}
                >
                  {beltIdList &&
                    beltIdList.map((e, index) => (
                      <MenuItem value={e.id} key={index}>
                        {e.machine_id}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div className="input-container">
              <div className="label">Reason for the ticket</div>
              <FormControl>
                {reason === '' ? (
                  <div className="select-label">Select</div>
                ) : null}
                <Select
                  variant="outlined"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                >
                  <MenuItem value="Belt down for maintenance">
                    Belt down for maintenance
                  </MenuItem>
                  <MenuItem value="Belt camera not working">
                    Belt camera not working
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="input-container">
              <div className="label">Down untill</div>
              <TextField
                type="datetime-local"
                variant="outlined"
                placeholder="Down till"
                value={downTill}
                onChange={e => setDownTill(e.target.value)}
              />
            </div>
            <div className="input-container">
              <div className="label">Any comments(optional)</div>
              <TextField
                type="text"
                variant="outlined"
                placeholder="Comments"
                value={comments}
                onChange={e => setComments(e.target.value)}
                multiline
                rows={4}
              />
            </div>
            <div className="submit-container">
              <p>
                Once you have marked all the choices as per your needs, click
                save.
              </p>
              <FrinksButton
                text="Create Ticket"
                onClick={() => setInfoModalOpen(true)}
                isInactive={
                  machineType === '' ||
                  beltId === '' ||
                  reason === '' ||
                  downTill === ''
                }
              />
            </div>
          </div>
        </form>
      </div>
      {infoModalOpen ? (
        <InfoModal
          open={infoModalOpen}
          close={() => setInfoModalOpen(false)}
          title="Confirm changes"
          handleSubmit={() => handleSubmit()}
        >
          <>
            <p>Do you want to go ahead and save the changes you made?</p>
          </>
        </InfoModal>
      ) : null}
    </Container>
  );
};

MaintenanceForm.propTypes = {
  close: PropTypes.func
};

export default MaintenanceForm;
