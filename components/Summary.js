import { useEffect, useState } from 'react';
import Image from 'next/image';
import theme from 'styles/theme';
import Container from 'styles/summary.styles';
import { Grid, Select, ButtonGroup, Button, MenuItem } from '@material-ui/core';
import NotificationContainer from 'styles/summaryNotification.styles';
import MaintenanceContainer from 'styles/maintenanceNotification.styles';
import ImageKitLoader from 'utils/ImageLoader';
import { BASE_URL } from 'utils/constants';
import { get, put } from 'utils/api';
import Layout from 'components/Layout';
import moment from 'moment';
import FrinksButton from 'components/FrinksButton';
import Maintenance from 'components/Maintenance';
import Notification from 'components/Notification';
import Loader from 'components/Loader';
import { getStartAndEndDate } from 'utils/globalFunctions';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers';

function Summary() {
  const curDate = new Date();
  const [dateCalendarOpen, setDateCalendarOpen] = useState(false);
  const [bagType, setBagType] = useState(0);
  const [filter, setFilter] = useState(0);
  const [shiftType, setShiftType] = useState(0);
  const [time, setTime] = useState(Math.floor(curDate.getTime() / 1000));

  const [summaryData, setSummaryData] = useState(null);
  const [shiftDate, setShiftDate] = useState(null);
  const [printingBelts, setPrintingBelts] = useState(null);
  const [shiftCount, setShiftCount] = useState(null);
  const [maintenanceTickets, setMaintenanceTickets] = useState(null);
  const [maintenanceFormOpen, setMaintenanceFormOpen] = useState(false);
  const [notificationsFormOpen, setNotificationsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getCurrentFormattedDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    const month = months[monthIndex];

    return `${day} ${month} ${year}`;
  };

  const currentFormattedDate = getCurrentFormattedDate();

  useEffect(() => {
    const fetchSummary = async () => {
      const data = await get('/api/stats/summarized-stats', {
        dateRange: getStartAndEndDate()
      });
      setSummaryData(data?.data?.data?.analysis);
      setShiftCount(data?.data?.data?.shift);
      setShiftDate(data?.data?.data?.date);
      setPrintingBelts(data?.data?.data?.belt_info);
      setMaintenanceTickets(data?.data?.data?.maintenance_tickets);
      setIsLoading(false);
    };
    if (!summaryData) {
      fetchSummary();
    }
  }, [summaryData]);

  const markMaintenanceComplete = async id => {
    try {
      await put('/api/maintenance', { id });
      setMaintenanceTickets(prevData =>
        prevData.map(e => {
          if (e.id === id) return { ...e, marked_complete: 1 };
          return e;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (notificationsFormOpen) {
    return <Notification close={() => setNotificationsFormOpen(false)} />;
  }

  if (maintenanceFormOpen) {
    return <Maintenance close={() => setMaintenanceFormOpen(false)} />;
  }

  return (
    <Container>
      <div className="analysis-container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '20px'
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="view">
              <Select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                style={{
                  fontSize: '14px',
                  background: 'white',
                  width: '160px',
                  outline: 'none',
                  outlineColor: 'blue'
                }}
                variant="outlined"
              >
                <MenuItem value={0}>Packer Summary</MenuItem>
                <MenuItem value={1}>Loader Summary</MenuItem>
              </Select>
            </div>

            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                style={{
                  backgroundColor: bagType === 0 ? '#B5179E' : '#F5F5F5',
                  color: bagType === 1 ? '#B5179E' : '#F5F5F5'
                }}
                onClick={() => {
                  setBagType(0);
                }}
              >
                BAGS
              </Button>
              <Button
                style={{
                  backgroundColor: bagType === 1 ? '#B5179E' : '#F5F5F5',
                  color: bagType === 0 ? '#B5179E' : '#F5F5F5'
                }}
                onClick={() => {
                  setBagType(1);
                }}
              >
                TONNAGE
              </Button>
            </ButtonGroup>

            <div className="view">
              <Select
                value={0}
                onChange={e => {
                  console.log(e.target.value);
                  setTime(e.target.value);
                }}
                style={{
                  fontSize: '14px',
                  background: 'white',
                  width: '160px',
                  outline: 'none',
                  outlineColor: 'blue'
                }}
                variant="outlined"
              >
                <MenuItem value={0}>{currentFormattedDate}</MenuItem>
                <DateCalendar
                  // val={0}
                  // editableDateInputs
                  onChange={item => {
                    setTime([item.selection]);
                    // setDateUnAltered(false);
                  }}
                  // moveRangeOnFirstSelection={false}
                  // ranges={date}
                  // rangeColors={['#051c3f']}
                />
              </Select>
            </div>

            <div className="view">
              <Select
                value={shiftType}
                onChange={e => setShiftType(e.target.value)}
                style={{
                  fontSize: '14px',
                  background: 'white',
                  width: '160px'
                }}
                variant="outlined"
              >
                <MenuItem value={0}>Shift A</MenuItem>
                <MenuItem value={1}>Shift B</MenuItem>
                <MenuItem value={2}>Shift C</MenuItem>
                <MenuItem value={3}>All Shifts</MenuItem>
              </Select>
            </div>
          </LocalizationProvider>
        </div>

        <div className="summary-container">
          <div className="left-portion">
            <div className="count-container">
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <div
                    className="count-block"
                    style={{ background: theme.palette.summary.green }}
                  >
                    <p className="count">
                      {summaryData
                        ? `${summaryData?.total_bags_packed} Bags`
                        : 'NA'}
                    </p>
                    <p className="description">
                      {filter === 0 ? 'Total Production' : 'Total Dispatch'}
                    </p>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="count-block"
                    style={{ background: theme.palette.summary.red }}
                  >
                    <p className="count">
                      {summaryData
                        ? `${summaryData?.total_missed_labels} Bags`
                        : 'NA'}
                    </p>
                    <p className="description">
                      {filter === 0 ? 'Misprint Cases' : 'Burstage'}
                    </p>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="maintenance-container">
              <Layout
                alternateHeader
                title={
                  filter === 0
                    ? 'Hourly Packer Data'
                    : 'Hourly Loading Analytics'
                }
                hideFooter
                counter={0}
                summaryHeader
                disableMinimumHeight
                viewAllFunc={() => setMaintenanceFormOpen(true)}
                style={{ maxHeight: '60vh', overflowY: 'auto' }}
              >
                <MaintenanceContainer>
                  {maintenanceTickets && maintenanceTickets.length > 0 ? (
                    <>
                      {maintenanceTickets.map((e, index) => (
                        <div className="defect active" key={index}>
                          <div className="title">
                            {new Date(e.created_at).toLocaleString()}
                          </div>
                          <div className="stepper">
                            <div className="blank-thumb" />
                            <div className="vr" />
                          </div>
                          <div className="notification">
                            <div className="ticket-title">Ticket #{e.id}</div>
                            <div className="description">
                              {e.printing_belt
                                ? `Printing belt - ${e.printing_belt_id} under maintenance | Reason - ${e.reason}`
                                : `Loading belt - ${e.loading_belt_id} under maintenance | Reason - ${e.reason}`}
                            </div>
                            <div className="button-container">
                              {/* <FrinksButton
                                  variant="outlined"
                                  color="inherit"
                                  text="Edit Ticket"
                                  style={{
                                    fontSize: '12px',
                                    height: '40px',
                                    marginRight: '14px'
                                  }}
                                /> */}
                              {e.marked_complete ? null : (
                                <FrinksButton
                                  color="inherit"
                                  text="Mark Complete"
                                  style={{ fontSize: '12px', height: '40px' }}
                                  onClick={() => markMaintenanceComplete(e.id)}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p
                      style={{
                        padding: '20px',
                        textAlign: 'center'
                      }}
                    >
                      No maintenance ticket found
                    </p>
                  )}
                </MaintenanceContainer>
              </Layout>
            </div>
          </div>
          <div className="right-portion">
            <div className="notification-container">
              <Layout
                alternateHeader
                title={filter === 0 ? 'Packer Analysis' : 'Loader Analysis'}
                hideFooter
                counter={summaryData?.total_missed_labels || 0}
                summaryHeader
                disableMinimumHeight
                viewAllFunc={() => setNotificationsFormOpen(true)}
                style={{ maxHeight: '60vh', overflowY: 'auto' }}
              >
                <NotificationContainer applyHeightLimit>
                  {summaryData && printingBelts ? (
                    <>
                      {Object.values(summaryData?.missed_paths)?.map(
                        (e, index) => {
                          if (e.length <= 0) return null;
                          return (
                            <div className="defect active" key={index}>
                              <div className="title">Just Now</div>
                              <div className="stepper">
                                <div className="thumb">
                                  <div className="vr invert-vr" />
                                  <Image
                                    src="Package_5rbWbqc1A.svg"
                                    loader={ImageKitLoader}
                                    layout="fixed"
                                    height={40}
                                    width={40}
                                  />
                                </div>
                                <div className="vr" />
                              </div>
                              <div className="notification">
                                <div className="info-container">
                                  <div className="info">
                                    <div className="title">Incorrect bags</div>
                                    <div className="sub-title">
                                      {e.length} bags passed unmarked.
                                    </div>
                                  </div>
                                  <div className="count">
                                    {printingBelts[index - 1]}
                                  </div>
                                </div>
                                <div className="image-container">
                                  <Grid container>
                                    {e.map((element, idx) => (
                                      <Grid item xs={4}>
                                        <div className="image" key={idx}>
                                          <div className="image-container">
                                            <Image
                                              src={element.local_image_path}
                                              loader={() =>
                                                `${BASE_URL}/api/shipment/images?image_location=${
                                                  element.local_image_path ||
                                                  element.local_image_location
                                                }`
                                              }
                                              layout="fill"
                                              objectFit="contain"
                                              objectPosition="top"
                                            />
                                          </div>
                                          <div className="time">
                                            {moment(
                                              new Date(element.created_at)
                                            ).format('h:mm A')}
                                          </div>
                                        </div>
                                      </Grid>
                                    ))}
                                  </Grid>
                                </div>
                                {/* <div className="incorrect-container">
                                  <Button variant="outlined" color="inherit">
                                    Incorrect Alert?
                                  </Button>
                                </div> */}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </>
                  ) : (
                    <p
                      style={{
                        padding: '20px',
                        textAlign: 'center'
                      }}
                    >
                      No new activities found
                    </p>
                  )}
                </NotificationContainer>
              </Layout>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Summary;
