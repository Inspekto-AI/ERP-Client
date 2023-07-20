import { Grid, Input, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  input: {
    border: '1px solid black',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    width: '200px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    // marginTop: '80x',
    margin: '20px',
    fontSize: '20px'
  },
  button: {
    border: '1px solid black',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    width: '100px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    // marginTop: '80x',
    margin: '20px',
    height: '48px',
    fontSize: '20px'
  }
}));

export const ParametersComponents = () => {
  const classes = useStyles();

  return (
    <Grid xs={4}>
      <Input
        placeholder="Enter name"
        className={classes.input}
        disableUnderline
        //   value={name1}
        //   onChange={(e) => setName1(e.target.value)}
        //   disabled={isEdit1 && isEditButton1}
      />
    </Grid>
  );
};
