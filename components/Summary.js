import { useEffect, useState } from 'react';
import Image from 'next/image';
import theme from 'styles/theme';
import Container from 'styles/summary.styles';
import { Grid } from '@material-ui/core';
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

const Summary = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [shiftDate, setShiftDate] = useState(null);
  const [printingBelts, setPrintingBelts] = useState(null);
  const [shiftCount, setShiftCount] = useState(null);
  const [maintenanceTickets, setMaintenanceTickets] = useState(null);
  const [maintenanceFormOpen, setMaintenanceFormOpen] = useState(false);
  const [notificationsFormOpen, setNotificationsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      const data = await get('/api/analysis/summary', {
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
    const data = await put('/api/transaction/maintenance', { id });
    if (data?.data?.success) {
      // remove ticket from list
      const newTickets = maintenanceTickets.map(e => {
        if (e.id !== id) return e;
      });
      if (newTickets[0]) {
        setMaintenanceTickets(newTickets);
      } else {
        setMaintenanceTickets(null);
      }
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
      {isLoading && <Loader />}
      <div className="analysis-container">
        <div className="head">
          <h2>Shift Summary</h2>
          <div className="date-container">
            <div className="date-display">
              Shift {shiftCount} - {new Date(shiftDate).toLocaleDateString()}
            </div>
          </div>
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
                    <Image
                      src="Package.svg"
                      loader={ImageKitLoader}
                      layout="fill"
                    />
                    <p className="count">
                      {summaryData
                        ? `${summaryData?.total_bags_packed} Bags`
                        : 'NA'}
                    </p>
                    <p className="description">Bags printed so far</p>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="count-block"
                    style={{ background: theme.palette.summary.red }}
                  >
                    <Image
                      src="Tag.svg"
                      loader={ImageKitLoader}
                      layout="fill"
                    />
                    <p className="count">
                      {summaryData
                        ? `${summaryData?.total_missed_labels} Bags`
                        : 'NA'}
                    </p>
                    <p className="description">Bags printed without label</p>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="count-block"
                    style={{ background: theme.palette.summary['light-blue'] }}
                  >
                    <Image
                      src="PaintBrushBroad.svg"
                      loader={ImageKitLoader}
                      layout="fill"
                    />
                    <p className="count">
                      {summaryData
                        ? `${summaryData?.total_bags_dispatched} Bags`
                        : 'NA'}
                    </p>
                    <p className="description">Bags dispatched</p>
                  </div>
                </Grid>
                {/* <Grid item xs={6}>
                  <div
                    className="count-block"
                    style={{ background: theme.palette.summary['dark-blue'] }}
                  >
                    <Image
                      src="PaintBrushBroad_dark.svg"
                      loader={ImageKitLoader}
                      layout="fill"
                    />
                    <p className="count">
                      {summaryData
                        ? `${summaryData?.packing_efficiency}`
                        : 'NA'}
                    </p>
                    <p className="description">Packing efficiency</p>
                  </div>
                </Grid> */}
              </Grid>
            </div>
            <div className="maintenance-container">
              <Layout
                alternateHeader
                title="Assigned Tickets"
                hideFooter
                counter={0}
                summaryHeader
                disableMinimumHeight
                viewAllFunc={() => setMaintenanceFormOpen(true)}
              >
                <MaintenanceContainer>
                  {maintenanceTickets && maintenanceTickets.length > 0 ? (
                    <>
                      {maintenanceTickets.map((e, index) => {
                        return (
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
                                {e.printing_belt ? `Printing belt - ${e.printing_belt.machine_id} under maintenance | Reason - ${e.reason}` : `Loading belt - ${e.loader_belt.machine_id} under maintenance | Reason - ${e.reason}`}
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
                                <FrinksButton
                                  color="inherit"
                                  text="Mark Complete"
                                  style={{ fontSize: '12px', height: '40px' }}
                                  onClick={() => markMaintenanceComplete(e.id)}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
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
                title="Latest Activity"
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
                                                `${BASE_URL}/api/transaction/images?image_location=${element.local_image_path ||
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
};

export default Summary;
