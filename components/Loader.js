import { CircularProgress, makeStyles } from '@material-ui/core';
import Image from 'next/image';
import theme from 'styles/theme';
import ImageKitLoader from 'utils/ImageLoader';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    height: '100vh',
    width: '100%',
    background: '#ffffff8c',
    top: 0,
    left: 0,
    zIndex: 9999
  },
  loader: {
    color: theme.palette.royalBlue.main,
    marginTop: '20px'
  }
}));

const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Image
        src="FrinksHighRes_Logo_Gradient_Eii_pLuqH.svg"
        alt="Vaaahq"
        className={classes.image}
        height={200}
        width={200}
        loader={ImageKitLoader}
      />
      <CircularProgress className={classes.loader} />
    </div>
  );
};

export default Loader;
