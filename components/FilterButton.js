import
{ Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Image from 'next/image';
import ImageKitLoader from 'utils/ImageLoader';

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    position: 'relative',
    fontWeight: '900',
    fontSize: '20px',
    padding: theme.root.buttonPadding,
    height: '45px',
    width: '6%',
    marginLeft: '1%',
    borderRadius: theme.root.borderRadius,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
    '&:hover': {
      color: theme.palette.smokyWhite.main,
      background: theme.palette.gradient.pink,
    },

  },
}));

const buttonStyle = (is_active) => {
  if (is_active) return { background: '#b5179e', color: 'white' };

  return { background: 'white', color: 'black', border: '2px solid #b5179e' };
};

function FilterButton({
  text,
  isInactive,
  type,
  variant,
  style,
  image1,
  image2,
  index,
  filtervalue,
  setFilterValue,
}) {
  const classes = useStyles();
  return (
    <Button
      variant={
            variant || 'contained'
        }
      color="primary"
      className={
            classes.buttonStyle
        }
      disabled={isInactive}
      type={type}
      onClick={
            () => setFilterValue(index)
        }
      style={
            {
              ...style,
              ...buttonStyle(filtervalue === index),
            }
    }
    >
      {' '}
      {
        image1 ? (
          <Image
            src={
                filtervalue === index ? image2 : image1
            }
            alt="All"
            loader={ImageKitLoader}
            layout="fixed"
            height={35}
            width={35}
          />
        ) : text
    }
      {' '}

    </Button>
  );
}

FilterButton.propTypes = {
  isInactive: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  style: PropTypes.any,
  index: PropTypes.number,
  filtervalue: PropTypes.number,
};

export default FilterButton;
