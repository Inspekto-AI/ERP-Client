import Image from 'next/image';
import { useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
  TableSortLabel,
  lighten,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Paper,
  FormControl,
  Select,
  MenuItem,
  LinearProgress
} from '@material-ui/core';
import FrinksButton from 'components/FrinksButton';
import Container, { ProgressBarContainer } from 'styles/reportTable.styles';
import ImageKitLoader from 'utils/ImageLoader';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { msToTime } from 'utils/globalFunctions';
import InfoModal from 'components/InfoModal';
import DefectiveBags from 'components/DefectiveBags';
import moment from 'moment/moment';
import { getStatus } from 'components/AnalyticsCard/AnalyticsCard';

const getCompletionTime = (
  bag_count_completed_at,
  tag_count_completed_at,
  created_at,
  stopped_at
) => {
  if (!bag_count_completed_at || !tag_count_completed_at)
    return msToTime(stopped_at - created_at);
  return msToTime(
    Math.max(bag_count_completed_at, tag_count_completed_at) - created_at
  );
};

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis?.map(el => el[0]);
};

const shipmentHead = [
  {
    id: 'id',
    disablePadding: true,
    label: 'Shipment ID'
  },
  {
    id: 'licence_number',
    disablePadding: true,
    label: 'Truck No. / Wagon No.'
  },
  {
    id: 'vehicle.machine_id',
    disablePadding: true,
    label: 'Loader ID'
  },
  {
    id: 'printing_belt.machine_id',
    disablePadding: true,
    label: 'Printing Belt ID'
  },
  { id: 'bag_type', disablePadding: true, label: 'Bag Type' },
  {
    id: 'created_at_date',
    disablePadding: true,
    label: 'Start Date'
  },
  {
    id: 'created_at_time',
    disablePadding: true,
    label: 'Start Time'
  },
  {
    id: 'bag_count_completed_at',
    disablePadding: true,
    label: 'Loading Time'
  },
  {
    id: 'bag_count_total',
    disablePadding: true,
    label: 'Bags Dispatched'
  },
  {
    id: 'tag_count_total',
    disablePadding: true,
    label: 'Bags Packed'
  },
  {
    id: 'aws_missed_labels',
    disablePadding: true,
    label: 'Misprint bags'
  },
  { id: 'action', disablePadding: true, label: 'View' }
];

const printingHead = [
  {
    id: 'id',
    disablePadding: true,
    label: 'Belt ID'
  },
  {
    id: 'up_time',
    disablePadding: true,
    label: 'Up Time'
  },
  { id: 'down_time', disablePadding: true, label: 'Down Time' },
  {
    id: 'tag_count_total',
    disablePadding: true,
    label: 'Bags Packed'
  },
  {
    id: 'aws_missed_labels',
    disablePadding: true,
    label: 'Misprint bags'
  },
  { id: 'action', disablePadding: true, label: 'View' },
  { id: 'shipment_count', disablePadding: true, label: 'No. of Shipments Made' }
];

const loadingHead = [
  {
    id: 'id',
    disablePadding: true,
    label: 'Loader ID'
  },
  {
    id: 'up_time',
    disablePadding: true,
    label: 'Up Time'
  },
  { id: 'down_time', disablePadding: true, label: 'Down Time' },
  {
    id: 'bag_count',
    disablePadding: true,
    label: 'No. of Bags Dispatched'
  },
  { id: 'shipment_count', disablePadding: true, label: 'No. of Shipments Made' }
];

const packerHead = [
  {
    id: 'id',
    disablePadding: true,
    label: 'Packer ID'
  },
  {
    id: 'runtime_performance',
    disablePadding: true,
    label: 'Runtime Performance'
  },
  {
    id: 'overall_performance',
    disablePadding: true,
    label: 'Overall Performance'
  }
];

const RenderTableHeader = ({
  layoutType,
  order,
  orderBy,
  classes,
  createSortHandler
}) => {
  switch (layoutType) {
    case 0:
      return (
        <TableRow>
          {shipmentHead.map(headCell => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      );
    case 1:
      return (
        <TableRow>
          {printingHead.map(headCell => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      );
    case 2:
      return (
        <TableRow>
          {loadingHead.map(headCell => (
            <TableCell
              key={headCell.id}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      );
    default:
      return (
        <TableRow>
          {packerHead.map(headCell => (
            <TableCell
              key={headCell.id}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      );
  }
};

RenderTableHeader.propTypes = {
  layoutType: PropTypes.any,
  order: PropTypes.any,
  orderBy: PropTypes.any,
  classes: PropTypes.any,
  createSortHandler: PropTypes.any
};

const EnhancedTableHead = props => {
  const { classes, order, orderBy, onRequestSort, layoutType } = props;

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <RenderTableHeader
        order={order}
        orderBy={orderBy}
        classes={classes}
        layoutType={layoutType}
        createSortHandler={createSortHandler}
      />
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  layoutType: PropTypes.number
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: '1 1 100%'
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">delete</IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">filter</IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  emptyContainer: {
    textAlign: 'center',
    padding: '20px'
  }
}));

const RenderTable = ({ layoutType, data, setRejectIndex }) => {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  if (data?.count === 0) {
    return <div className={classes.emptyContainer}>No records found</div>;
  }

  switch (layoutType) {
    case 0:
      return (
        <Table className={classes.table} size="medium">
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            layoutType={layoutType}
          />
          <TableBody>
            {stableSort(data?.rows, getComparator(order, orderBy))?.map(
              (row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={index}>
                    <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                      style={{ textAlign: 'center' }}
                    >
                      {row?.id}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row?.licence_number === ''
                        ? `Wagon No.- ${row.wagon_no}, Gate No.- ${row.gate_no}, Rack No.- ${row.rack_no}`
                        : `License No.- ${row?.licence_number}`}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row?.vehicle?.machine_id || 'NA'}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row?.printing_belt?.machine_id || 'NA'}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row?.bag_type}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {new Date(row?.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {new Date(row?.created_at).toLocaleTimeString()}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {getCompletionTime(
                        row?.bag_count_finished_at,
                        row?.tag_count_finished_at,
                        row?.created_at,
                        row?.stopped_at
                      )}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row?.bag_count_total}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row?.tag_count_total}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row?.aws_missed_labels?.length}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      <FrinksButton
                        text="View"
                        variant="outlined"
                        style={{
                          fontSize: '12px',
                          padding: '2px 10px 2px 10px',
                          height: '30px'
                        }}
                        onClick={() => setRejectIndex(index)}
                        isInactive={row?.aws_missed_labels?.length === 0}
                      />
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      );
    case 1:
      return (
        <Table className={classes.table} size="medium">
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            layoutType={layoutType}
          />
          <TableBody>
            {stableSort(data, getComparator(order, orderBy))?.map(
              (row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={index}>
                    <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                      style={{ textAlign: 'center' }}
                    >
                      {row?.belt_id}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>NA</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>NA</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row?.tag_count || 'NA'}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row?.aws_missed_labels
                        ? row?.aws_missed_labels.length
                        : 'NA'}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      <FrinksButton
                        text="View"
                        variant="outlined"
                        style={{
                          fontSize: '12px',
                          padding: '2px 10px 2px 10px',
                          height: '30px'
                        }}
                        onClick={() => setRejectIndex(index)}
                        isInactive={row?.aws_missed_labels?.length === 0}
                      />
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row?.shipment_count}
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      );
    case 2:
      return (
        <Table className={classes.table} size="medium">
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            layoutType={layoutType}
          />
          <TableBody>
            {stableSort(data, getComparator(order, orderBy))?.map(
              (row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={index}>
                    <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                      style={{ textAlign: 'center' }}
                    >
                      {row?.belt_id}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>NA</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>NA</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row?.bag_count || 'NA'}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row?.shipment_count}
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      );
    default:
      return (
        <Table className={classes.table} size="medium">
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            layoutType={layoutType}
          />
          <TableBody>
            {stableSort(data, getComparator(order, orderBy))?.map(
              (row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={index}>
                    <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                      style={{ textAlign: 'center' }}
                    >
                      {row.packer_id}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.runtime_performance ? (
                        <ProgressBarContainer
                          progressBackground={
                            getStatus(row.runtime_performance).colorCode
                          }
                        >
                          <LinearProgress
                            variant="determinate"
                            value={row.runtime_performance}
                          />
                        </ProgressBarContainer>
                      ) : (
                        'NA'
                      )}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.overall_performance ? (
                        <ProgressBarContainer
                          progressBackground={
                            getStatus(row.overall_performance).colorCode
                          }
                        >
                          <LinearProgress
                            variant="determinate"
                            value={row.overall_performance}
                          />
                        </ProgressBarContainer>
                      ) : (
                        'NA'
                      )}
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      );
  }
};

RenderTable.propTypes = {
  data: PropTypes.any,
  layoutType: PropTypes.number,
  setRejectIndex: PropTypes.any
};

const ReportTable = ({
  title,
  layoutType,
  data,
  startCount,
  endCount,
  setStartCount,
  setEndCount,
  hideRowCount
}) => {
  const classes = useStyles();
  const [rowCount, setRowCount] = useState(5);
  const [rejectIndex, setRejectIndex] = useState(null);
  // const [search, setSearch] = useState('');

  const handleRowCountChange = e => {
    setStartCount(0);
    setEndCount(e.target.value);
    setRowCount(e.target.value);
  };

  const handlePrevious = () => {
    if (startCount > 1) {
      setEndCount(startCount);
      setStartCount(startCount - rowCount);
    }
  };

  const handleNext = () => {
    if (endCount < data?.count) {
      setStartCount(endCount);
      setEndCount(endCount + rowCount);
    }
  };

  return (
    <Container>
      <div className="header">
        <div className="title">{title}</div>
        <div className="controls">
          <div className="view">
            <p>View</p>
            <Button className="view-toggle-buttons">
              <Image
                src="hamburger-icon.svg"
                loader={ImageKitLoader}
                layout="fixed"
                height={25}
                width={25}
              />
            </Button>
            <Button
              className="view-toggle-buttons"
              style={{ marginLeft: '0px' }}
            >
              <Image
                src="graph-icon.svg"
                loader={ImageKitLoader}
                layout="fixed"
                height={25}
                width={25}
              />
            </Button>
          </div>
          {/* <div className="search">
            <p>Search</p>
            <TextField
              type="text"
              variant="outlined"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div> */}
        </div>
      </div>
      <div className="table-container">
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <TableContainer>
              <RenderTable
                layoutType={layoutType}
                data={data}
                setRejectIndex={e => setRejectIndex(e)}
              />
            </TableContainer>
          </Paper>
          {hideRowCount ? null : (
            <div className="pagination-container">
              <div className="left">
                <div className="number-of-records">
                  Show
                  <FormControl>
                    <Select
                      variant="outlined"
                      value={rowCount}
                      onChange={handleRowCountChange}
                    >
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                    </Select>
                  </FormControl>
                  Values
                </div>
                <div className="pipe" />
                <div className="total-records">
                  Showing {data?.count === 0 ? 0 : startCount + 1} to{' '}
                  {Math.min(endCount, data?.count)} of {data?.count} entries
                </div>
              </div>
              <div className="right">
                <div className="page-layout">
                  <div
                    className="previous"
                    onClick={handlePrevious}
                    onKeyPress={handlePrevious}
                    tabIndex={0}
                    role="button"
                  >
                    Previous
                  </div>
                  <p>{endCount / rowCount}</p>
                  <div
                    className="next"
                    onClick={handleNext}
                    onKeyPress={handleNext}
                    tabIndex={0}
                    role="button"
                  >
                    Next
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {rejectIndex !== null ? (
        <InfoModal
          open={rejectIndex !== null}
          close={() => setRejectIndex(null)}
          title="Misprint bags"
          hideConfirm
        >
          <DefectiveBags
            passedRejectArray={
              data.rows
                ? data?.rows[rejectIndex]?.aws_missed_labels
                : data[rejectIndex]?.aws_missed_labels
            }
          />
        </InfoModal>
      ) : null}
    </Container>
  );
};

ReportTable.propTypes = {
  title: PropTypes.string.isRequired,
  layoutType: PropTypes.number.isRequired,
  data: PropTypes.any,
  startCount: PropTypes.number,
  endCount: PropTypes.number,
  setStartCount: PropTypes.func,
  setEndCount: PropTypes.func,
  hideRowCount: PropTypes.bool
};

export default ReportTable;
