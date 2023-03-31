import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Image from 'next/image';
import ImageKitLoader from 'utils/ImageLoader';

const useStyles = makeStyles(theme => ({
    buttonStyle: {
        position: 'relative',
        fontWeight: '900',
        fontSize: '16px',
        padding: theme.root.buttonPadding,
        height: '45px',
        borderRadius: theme.root.borderRadius,
        background: theme.palette.byzantine.main,
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            height: 'auto'
        },
        '&:hover': {
            color: theme.palette.smokyWhite.main,
            background: theme.palette.gradient.pink
        }
    },
    buttonOutlined: {
        position: 'relative',
        fontWeight: '900',
        fontSize: '16px',
        height: '45px',
        padding: theme.root.buttonPadding,
        borderRadius: theme.root.borderRadius,
        color: theme.palette.byzantine.main,
        borderColor: theme.palette.byzantine.main,
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            height: 'auto'
        },
        '&:hover': {
            color: theme.palette.smokyWhite.main,
            background: theme.palette.gradient.pink
        }
    }
}));

const FrinksButton = ({
    text,
    isInactive,
    type,
    onClick,
    variant,
    style,
    image,
}) => {
    const classes = useStyles();

    return (<Button variant={
        variant || 'contained'
    }
        color="primary"
        className={
            variant === 'outlined' ? classes.buttonOutlined : classes.buttonStyle
        }
        disabled={isInactive}
        type={type}
        onClick={onClick}
        style={style}> {
            image ? <Image src={image}
                loader={ImageKitLoader}
                layout="fixed"
                height={35}
                width={35} /> : text
        } </Button>);
};

FrinksButton.propTypes = {
    text: PropTypes.string.isRequired,
    isInactive: PropTypes.bool,
    type: PropTypes.string,
    onClick: PropTypes.func,
    variant: PropTypes.string,
    style: PropTypes.any
};

export default FrinksButton;
