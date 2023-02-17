import { useState } from 'react';

import FrinksButton from 'components/FrinksButton';
import { Button, makeStyles, Modal, Fade } from '@material-ui/core';

import axios from 'axios';
import { AiFillEye } from 'react-icons/ai';
import Input from '@material-ui/core/Input';
import { AiFillEyeInvisible } from 'react-icons/ai';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { post } from 'utils/api';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    padding: '10px',
    alignItems: 'center',
    justifyContent: 'center'
  },
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
    padding: '20px 20px',
    [theme.breakpoints.down(960)]: {
      flexDirection: 'column-reverse',
      alignItems: 'end'
    },
  },
  formContainer: {
    background: 'white'
  },
  form: {
    padding: '30px'
  },
  label: {
    fontSize: '24px',
    paddingBottom: '24px'
  },
  input: {
    width: '100%'
  },
  desc: {
    [theme.breakpoints.down(960)]: {
      textAlign: 'center'
    }
  },
  submitContainer: {
    display: 'flex',
    paddingTop: '20px',
    justifyContent: 'space-between'
  },
  formInfo: {
    [theme.breakpoints.down(960)]: {
      marginBottom: '20px'
    },
    fontSize: '18px',
    paddingRight: '170px'
  },
  sure: {
    display: 'flex',
    justifyContent: 'end'

  },
  cancel: {
    paddingRight: '20px'
  },
  error: {
    color: 'red'
  }
}));

const BypassSystem = ({ open, close, trippingStatus, setTrippingStatus }) => {
  const classes = useStyles();
  const [confirm, setConfirm] = useState(true);
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  });
  const [error, setError] = useState(null);

  const handlePasswordChange = event => {
    setError(null);
    setValues({
      ...values,
      password: event.target.value
    });
  };

  const handleSubmit = async () => {
    if(trippingStatus){
      try {
        await post('/api/configuration/enable-belt-tripping');
        setTrippingStatus(false);
        close();
      } catch (err) {
        close();
      }
    }else{
      if (values.password.length >= 5) {
        const res = await axios.post(`/api/bypass/${values?.password}`);
        if (!res.data.success) {
          setConfirm(true);
          setError(res.data.error);
        } else {
          setTrippingStatus(true);
          close();
        }
      } else {
        setConfirm(true);
        setError("Password incorrect");
      }
    }
  }

  return (
    <Modal open={open}
      className={classes.modal}>
      <Fade in={open}>
        <div className={classes.formContainer}>
          <div className={classes.heading}>
            <div className={classes.title}>
              <p className={classes.desc}>Bypass Belt Tripping</p>
            </div>
            <div className={classes.close}>
              <Button onClick={() => close()} style={{ whiteSpace: 'nowrap' }}>
                X Close
              </Button>
            </div>
          </div>
          <form>
            {confirm ? (
              <>
                {trippingStatus ? (
                  <div className={classes.form}>
                  <div className={classes.label}>Deactivate bypass? System will start controlling the belts.</div>
                  <div className={classes.submitContainer}>
                    <p className={classes.formInfo}>{' '}</p>
                    <FrinksButton
                      text="Enable belt tripping"
                      onClick={() => setConfirm(false)}
                    />
                  </div>
                </div>
                ) : (<div className={classes.form}>
                  <div className={classes.label}>Enter your password here </div>
                  <div className="password-container">
                    <Input
                      className={classes.input}
                      variant="outlined"
                      type={values.showPassword ? 'text' : 'password'}
                      onChange={handlePasswordChange}
                      value={values.password}
                      autoComplete="none"
                      autoFocus={false}
                      error={error !== null}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setValues({ ...values, showPassword: !values.showPassword })}
                            onMouseDown={() => setValues({ ...values, showPassword: !values.showPassword })}
                          >
                            {values.showPassword ? (
                              <AiFillEyeInvisible />
                            ) : (
                              <AiFillEye />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <p className={classes.error}>{error}</p>
                  </div>
                  <div className={classes.submitContainer}>
                    <p className={classes.formInfo}>
                      Click on Bypass Belt Tripping
                    </p>
                    <FrinksButton
                      text="Bypass Belt Tripping"
                      onClick={() => setConfirm(false)}
                    />
                  </div>
                </div>)}
              </>
            ) : (
              <div className={classes.form}>
                <div className={classes.label}>{trippingStatus?'Are you sure, you want to enable belt tripping?':'Are you sure, you want to bypass your system?'}</div>
                <div className={classes.sure}>
                  <div className={classes.cancel}>
                    <FrinksButton
                      text="Cancel"
                      onClick={() => setConfirm(true)}
                    />
                  </div>
                  <div className={classes.submit}>
                    <FrinksButton
                      text="Confirm"
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </div>)}
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default BypassSystem;
