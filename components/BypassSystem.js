import { useState, useEffect } from 'react';

import { Button, makeStyles, TextField, Modal,Fade } from '@material-ui/core';
import FrinksButton from 'components/FrinksButton';

import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { post } from 'utils/api';


import Input from '@material-ui/core/Input';
import { event } from 'jquery';

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
    padding:'30px'
  },
  label: {
    fontSize: '24px',
    paddingBottom:'24px'
  },
  input: {
    width:'100%'
  },
  desc: {
    [theme.breakpoints.down(960)]: {
      textAlign: 'center'
    }
  },
  submitContainer: {
    display: 'flex',
    paddingTop:'20px'
  },
  formInfo: {
    [theme.breakpoints.down(960)]: {
      marginBottom: '20px'
    },
    fontSize: '18px',
    paddingRight:'170px'
  },
  sure: {
    display: 'flex',
    justifyContent: 'end'

  },
  cancel: {
    paddingRight:'20px'
  }
}));

const BypassSystem = ({ open,Closebypass}) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handlePasswordChange = event => {
    setValues( {
        ...values,
        password: event.target.value
    } );
  };
  
  const [confirm, setConfirm] = useState(true)
  const [bypass, setBypass] = useState();

  const confirmPassword =()=> {
    setConfirm(false)
  }
  const cancel = () => {
    setConfirm(true)
  }
  const submit = () => {
    
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
            <Button onClick={() => Closebypass()} style={{ whiteSpace: 'nowrap' }}>
              X Close
            </Button>
          </div>
        </div>
          <form>
            {confirm?(
          <div className={classes.form}>
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
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
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
            </div>
            <div className={classes.submitContainer}>
              <p className={classes.formInfo}>
                Click on Bypass Belt Tripping
              </p>
              <FrinksButton
                text="Bypass Belt Tripping"
                onClick={confirmPassword}
              />
            </div>
          </div>):(
          <div className={classes.form}>
                  <div className={classes.label}>Are You sure, You want to Bypass your system ? </div>
                  <div className={classes.sure}>
            <div className={classes.cancel}>
              <FrinksButton
                text="Cancel"
                onClick={cancel}
                    />
                  </div>
                  <div className={classes.submit}>
              <FrinksButton
                text="Confirm"
                onClick={submit}
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
