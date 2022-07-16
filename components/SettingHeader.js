import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import theme from 'styles/theme';
import FrinksButton from 'components/FrinksButton';

const viewAllButton = {
  background: 'white',
  color: theme.palette.byzantine.main,
  fontSize: '14px',
  height: '40px'
};

const useStyles = makeStyles(() => ({
  nav: {
    display: 'flex',
    alignItems: 'center',
    height: '100px',
    background: theme.palette.royalBlue.main,
    position: 'relative'
  },
  title: {
    color: 'white',
    fontSize: '30px',
    fontWeight: '900',
    position: 'relative',
    fontFamily: 'Titillium Web'
  },
  counter: {
    background: theme.palette.flickrPink.main,
    position: 'absolute',
    borderRadius: '100%',
    height: '45px',
    width: '45px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    top: '50%',
    right: '0',
    transform: 'translate(120%, -50%)'
  },
  close: {
    position: 'absolute',
    right: '0',
    top: '50%',
    transform: 'translate(-50%, -50%)',

    '& .MuiButtonBase-root': {
      color: 'white',

      '& .MuiButton-label': {
        fontWeight: '900'
      }
    }
  }
}));

const SettingHeader = ({ title, counter, close, summaryHeader }) => {
  const classes = useStyles();

  return (
    <nav
      className={classes.nav}
      style={{
        padding: `${summaryHeader ? '0 20px' : '0 60px'}`,
        justifyContent: `${summaryHeader ? 'flex-start' : 'center'}`,
        borderTopLeftRadius: `${summaryHeader ? '5px' : '0'}`,
        borderTopRightRadius: `${summaryHeader ? '5px' : '0'}`
      }}
    >
      <div className={classes.title}>
        <p>{title}</p>
        {counter ? <div className={classes.counter}>{counter}</div> : null}
      </div>
      <div
        className={classes.close}
        style={{ right: `${summaryHeader ? '-20px' : '0'}` }}
      >
        {summaryHeader ? (
          <FrinksButton
            text="VIEW ALL"
            onClick={() => console.log('view all')}
            style={summaryHeader ? viewAllButton : null}
            variant="outlined"
          />
        ) : (
          <Button onClick={() => close()}>X Close</Button>
        )}
      </div>
    </nav>
  );
};

SettingHeader.propTypes = {
  title: PropTypes.string.isRequired,
  counter: PropTypes.number,
  close: PropTypes.func,
  summaryHeader: PropTypes.bool
};

export default SettingHeader;
