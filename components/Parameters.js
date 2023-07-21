import { useEffect, useState } from 'react';
import { get, put } from 'utils/api';
import { BASE_URL } from 'utils/constants';
import { Button, Grid, Input, InputLabel, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  label: {
    marginLeft: '20px'
  },
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

export default function Parameters() {
  const classes = useStyles();

  const [score_threshold_bag_wagon, setscore_threshold_bag_wagon] =
    useState(null);
  const [score_threshold_bag, setscore_threshold_bag] = useState(null);
  const [score_threshold_tag, setscore_threshold_tag] = useState(null);
  const [iou_threshold_bag, setiou_threshold_bag] = useState(null);
  const [iou_threshold_tag, setiou_threshold_tag] = useState(null);
  const [iou_threshold_bag_wagon, setiou_threshold_bag_wagon] = useState(null);
  const [img_compression, setimg_compression] = useState(null);
  const [bag_types, setbag_types] = useState(null);
  const [deactivate_loader_solution, setdeactivate_loader_solution] =
    useState(null);
  const [deactivate_printing_solution, setdeactivate_printing_solution] =
    useState(null);
  const [enable_loader_plc, setenable_loader_plc] = useState(null);
  const [enable_printing_plc, setenable_printing_plc] = useState(null);
  const [enable_misprint_plc, setenable_misprint_plc] = useState(null);
  const [misprint_alert_limit, setmisprint_alert_limit] = useState(null);
  const [relay_belt_running, setrelay_belt_running] = useState(null);
  const [relay_belt_stopped, setrelay_belt_stopped] = useState(null);
  const [enable_hooter, setenable_hooter] = useState(null);
  const [hooter_timeout, sethooter_timeout] = useState(null);
  const [enable_online_reports, setenable_online_reports] = useState(null);
  const [number_of_slaves, setnumber_of_slaves] = useState(null);
  const [number_of_shipments_allowed, setnumber_of_shipments_allowed] =
    useState(null);
  const [congestion_threshold, setcongestion_threshold] = useState(null);
  const [enable_loader_display, setenable_loader_display] = useState(null);
  const [number_of_whatsapp_recipient, setnumber_of_whatsapp_recipient] =
    useState(null);

  const [aiparamsEdit, setaiParamasEdit] = useState(true);
  const [nodeEdit, setnodeParamasEdit] = useState(true);

  const fetchParameters = async () => {
    const res = await get(`${BASE_URL}/api/configuration/initialize-frontend`);
    setscore_threshold_bag_wagon(res?.data?.data?.score_threshold_bag_wagon);
    setscore_threshold_bag(res?.data?.data?.score_threshold_bag);
    setscore_threshold_tag(res?.data?.data?.score_threshold_tag);
    setiou_threshold_bag(res?.data?.data?.iou_threshold_bag);
    setiou_threshold_tag(res?.data?.data?.iou_threshold_tag);
    setiou_threshold_bag_wagon(res?.data?.data?.iou_threshold_bag_wagon);
    setimg_compression(res?.data?.data?.img_compression);
    setbag_types(res?.data?.data?.bag_types);
    setdeactivate_loader_solution(res?.data?.data?.deactivate_loader_solution);
    setdeactivate_printing_solution(
      res?.data?.data?.deactivate_printing_solution
    );
    setenable_loader_plc(res?.data?.data?.enable_loader_plc);
    setenable_printing_plc(res?.data?.data?.enable_printing_plc);
    setenable_misprint_plc(res?.data?.data?.enable_misprint_plc);
    setmisprint_alert_limit(res?.data?.data?.misprint_alert_limit);
    setrelay_belt_running(res?.data?.data?.relay_belt_running);
    setrelay_belt_stopped(res?.data?.data?.relay_belt_stopped);
    setenable_hooter(res?.data?.data?.enable_hooter);
    sethooter_timeout(res?.data?.data?.hooter_timeout);
    setenable_online_reports(res?.data?.data?.enable_online_reports);
    setnumber_of_slaves(res?.data?.data?.number_of_slaves);
    setnumber_of_shipments_allowed(
      res?.data?.data?.number_of_shipments_allowed
    );
    setcongestion_threshold(res?.data?.data?.congestion_threshold);
    setenable_loader_display(res?.data?.data?.enable_loader_display);
    setnumber_of_whatsapp_recipient(
      res?.data?.data?.number_of_whatsapp_recipient
    );
  };
  //   const handleNodeEdit = async () => {
  //     const res = await put(
  //       `${BASE_URL}/api/configuration/update-deployment-params`,
  //       {
  //         bag_types,
  //         deactivate_loader_solution,
  //         deactivate_printing_solution,
  //         enable_loader_plc,
  //         enable_printing_plc,
  //         enable_misprint_plc,
  //         misprint_alert_limit,
  //         relay_belt_running,
  //         relay_belt_stopped,
  //         enable_hooter,
  //         hooter_timeout,
  //         enable_online_reports,
  //         number_of_slaves,
  //         number_of_shipments_allowed,
  //         enable_loader_display,
  //         number_of_whatsapp_recipient
  //       }
  //     );
  //   };

  const handleSubmit = async () => {
    const res = await put(
      `${BASE_URL}/api/configuration/update-deployment-params`,
      {
        score_threshold_bag_wagon,
        score_threshold_bag,
        score_threshold_tag,
        iou_threshold_bag,
        iou_threshold_tag,
        iou_threshold_bag_wagon,
        img_compression,
        congestion_threshold,
        bag_types,
        deactivate_loader_solution,
        deactivate_printing_solution,
        enable_loader_plc,
        enable_printing_plc,
        enable_misprint_plc,
        misprint_alert_limit,
        relay_belt_running,
        relay_belt_stopped,
        enable_hooter,
        hooter_timeout,
        enable_online_reports,
        number_of_slaves,
        number_of_shipments_allowed,
        enable_loader_display,
        number_of_whatsapp_recipient
      }
    );
    setaiParamasEdit(true);
    setnodeParamasEdit(true);
  };
  useEffect(() => {
    fetchParameters();
  }, []);
  return (
    <div style={{ marginTop: '120px' }}>
      <Grid container alignItems="flex-start">
        <Grid container xs={12} lg={6}>
          <Grid xs={6}>
            <h3 style={{ margin: '20px', marginBottom: '80px' }}>
              AI Engine Parameter
            </h3>
          </Grid>
          <Grid container xs={3}>
            <Button
              className={classes.button}
              onClick={() => {
                setaiParamasEdit(false);
              }}
            >
              Edit
            </Button>
          </Grid>
          <Grid container xs={3}>
            <Button className={classes.button} onClick={handleSubmit}>
              Save
            </Button>
          </Grid>

          <Grid xs={4}>
            <InputLabel className={classes.label}>
              Score Threshold Bag Wagon{' '}
            </InputLabel>
            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={score_threshold_bag_wagon}
              onChange={e => setscore_threshold_bag_wagon(e.target.value)}
              disabled={true}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>
              Score Threshold Bag
            </InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={score_threshold_bag}
              onChange={e => setscore_threshold_bag(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>
              Score Threshold Bag Wagon
            </InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={score_threshold_tag}
              onChange={e => setscore_threshold_bag_wagon(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>Iou Threshold Bag</InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={iou_threshold_bag}
              onChange={e => setiou_threshold_bag(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>Iou Threshold Tag</InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={iou_threshold_tag}
              onChange={e => setiou_threshold_tag(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>
              Iou Threshold Bag Wagon
            </InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={iou_threshold_bag_wagon}
              onChange={e => setiou_threshold_bag_wagon(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>Img Compression </InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={img_compression}
              onChange={e => setimg_compression(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>
              Congestion Threshold
            </InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={congestion_threshold}
              onChange={e => setcongestion_threshold(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={aiparamsEdit}
            />
          </Grid>
        </Grid>
        <Grid container xs={12} lg={6}>
          <Grid xs={6}>
            <h3 style={{ margin: '20px', marginBottom: '80px' }}>
              NodeJs Parameter
            </h3>
          </Grid>
          <Grid container xs={3}>
            <Button
              className={classes.button}
              onClick={() => {
                setnodeParamasEdit(false);
              }}
            >
              Edit
            </Button>
          </Grid>
          <Grid container xs={3}>
            <Button className={classes.button} onClick={handleSubmit}>
              Save
            </Button>
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>Bag Types </InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={bag_types}
              onChange={e => setbag_types(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>
              deactivate_loader_solution{' '}
            </InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={deactivate_loader_solution}
              onChange={e => setdeactivate_loader_solution(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>
              Deactivate Printing Solution
            </InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={deactivate_printing_solution}
              onChange={e => setdeactivate_printing_solution(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>Enable Loader Plc</InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={enable_loader_plc}
              onChange={e => setenable_loader_plc(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>
              Enable Printing Plc
            </InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={enable_printing_plc}
              onChange={e => setenable_printing_plc(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>
              Enable Misprint Plc
            </InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={enable_misprint_plc}
              onChange={e => setenable_misprint_plc(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>
              Misprint Alert Limit
            </InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={misprint_alert_limit}
              onChange={e => setmisprint_alert_limit(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={nodeEdit}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>
              Relay Belt Running
            </InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={relay_belt_running}
              onChange={e => setrelay_belt_running(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>
              Relay Belt Stopped{' '}
            </InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={relay_belt_stopped}
              onChange={e => setrelay_belt_stopped(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>Enable Hooter </InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={enable_hooter}
              onChange={e => setenable_hooter(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>Hooter Timeout </InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={hooter_timeout}
              onChange={e => sethooter_timeout(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>
              Enable Online Reports{' '}
            </InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={enable_online_reports}
              onChange={e => setenable_online_reports(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>Number Of Slaves </InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={number_of_slaves}
              onChange={e => setnumber_of_slaves(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>
              Number Of Shipments Allowed{' '}
            </InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={number_of_shipments_allowed}
              onChange={e => setnumber_of_shipments_allowed(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid>
          <Grid xs={4}>
            <InputLabel className={classes.label}>
              Enable Loader Display{' '}
            </InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={enable_loader_display}
              onChange={e => setenable_loader_display(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid>
          {/* <Grid xs={4}>
            <InputLabel className={classes.label}>
              Number Of Whatsapp Recipient{' '}
            </InputLabel>

            <Input
              placeholder="Enter name"
              className={classes.input}
              disableUnderline
              value={number_of_whatsapp_recipient}
              onChange={e => setnumber_of_whatsapp_recipient(e.target.value)}
              //   disabled={isEdit1 && isEditButton1}
              disabled={true}
            />
          </Grid> */}
        </Grid>
      </Grid>
    </div>
  );
}
