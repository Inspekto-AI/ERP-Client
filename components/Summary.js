import Image from 'next/image';
import theme from 'styles/theme';
import FrinksButton from 'components/FrinksButton';
import Container from 'styles/summary.styles';
import { Grid, Button } from '@material-ui/core';
import NotificationContainer from 'styles/summaryNotification.styles';
import MaintenanceContainer from 'styles/maintenanceNotification.styles';
import ImageKitLoader from 'utils/ImageLoader';
import { FIRST_SHIFT, SECOND_SHIFT } from 'utils/constants';
import Layout from './Layout';

const getShiftDetail = () => {
  const currentHour = new Date().getHours();
  if (currentHour >= FIRST_SHIFT[0] && currentHour <= FIRST_SHIFT[1])
    return 'Shift 1';
  if (currentHour >= SECOND_SHIFT[0] && currentHour <= SECOND_SHIFT[1])
    return 'Shift 2';
  return 'Shift 3';
};

const Summary = () => {
  // useEffect(() => {
  //   const fetchSummary = async () => {
  //     const data = await get('/api/transaction/summary', {
  //       date
  //     });
  //     console.log(data);
  //   };
  //   if (!summaryData) {
  //     fetchSummary();
  //   }
  // }, [date, summaryData]);

  return (
    <Container>
      <div className="analysis-container">
        <div className="head">
          <h2>Shift Summary</h2>
          <div className="search-container">
            <div className="date-display">
              {getShiftDetail()}&nbsp;-{' '}
              {new Date()
                .toISOString()
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-')}
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
                    style={{ background: theme.palette.summary.red }}
                  >
                    <Image
                      src="Package.svg"
                      loader={ImageKitLoader}
                      layout="fill"
                    />
                    <p className="count">3200 Bags</p>
                    <p className="description">Bags printed so far</p>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="count-block"
                    style={{ background: theme.palette.summary.green }}
                  >
                    <Image
                      src="Tag.svg"
                      loader={ImageKitLoader}
                      layout="fill"
                    />
                    <p className="count">18 Bags</p>
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
                    <p className="count">240 Bags</p>
                    <p className="description">No. of bags packed today</p>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className="count-block"
                    style={{ background: theme.palette.summary['dark-blue'] }}
                  >
                    <Image
                      src="PaintBrushBroad_dark.svg"
                      loader={ImageKitLoader}
                      layout="fill"
                    />
                    <p className="count">330 Bags</p>
                    <p className="description">Bags packed in last 30 mins</p>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="maintenance-container">
              <Layout
                alternateHeader
                title="Assigned Tickets"
                close={() => console.log('assigned tickets close')}
                hideFooter
                counter={21}
                summaryHeader
              >
                <MaintenanceContainer>
                  <div className="defect active">
                    <div className="title">Just Now</div>
                    <div className="stepper">
                      <div className="blank-thumb" />
                      <div className="vr" />
                    </div>
                    <div className="notification">
                      <div className="ticket-title">Ticket #43211</div>
                      <div className="description">
                        Printing belt | Printing belt 1:6326 | Belt jammed | --
                      </div>
                      <div className="button-container">
                        <FrinksButton
                          variant="outlined"
                          color="inherit"
                          text="Edit Ticket"
                          style={{
                            fontSize: '12px',
                            height: '40px',
                            marginRight: '14px'
                          }}
                        />
                        <FrinksButton
                          color="inherit"
                          text="Mark Complete"
                          style={{ fontSize: '12px', height: '40px' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="defect">
                    <div className="title">Just Now</div>
                    <div className="stepper">
                      <div className="blank-thumb" />
                      <div className="vr" />
                    </div>
                    <div className="notification">
                      <div className="ticket-title">Ticket #43211</div>
                      <div className="description">
                        Printing belt | Printing belt 1:6326 | Belt jammed | --
                      </div>
                      <div className="button-container">
                        <FrinksButton
                          variant="outlined"
                          color="inherit"
                          text="Edit Ticket"
                          style={{
                            fontSize: '12px',
                            height: '40px',
                            marginRight: '14px'
                          }}
                        />
                        <FrinksButton
                          color="inherit"
                          text="Mark Complete"
                          style={{ fontSize: '12px', height: '40px' }}
                        />
                      </div>
                    </div>
                  </div>
                </MaintenanceContainer>
              </Layout>
            </div>
          </div>
          <div className="right-portion">
            <div className="notification-container">
              <Layout
                alternateHeader
                title="Latest Activity"
                close={() => console.log('latest activity close')}
                hideFooter
                counter={21}
                summaryHeader
                disableMinimumHeight
              >
                <NotificationContainer>
                  <div className="defect active">
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
                            5 bags passed unmarked.
                          </div>
                        </div>
                        <div className="count">5 bags</div>
                      </div>
                      <div className="image-container">
                        <div className="image">
                          <div className="image-container">
                            <Image
                              src="/cement_bag.png"
                              loader={ImageKitLoader}
                              layout="fill"
                              objectFit="contain"
                            />
                          </div>
                          <div className="time">8.48am</div>
                        </div>
                        <div className="image">
                          <div className="image-container">
                            <Image
                              src="/cement_bag.png"
                              loader={ImageKitLoader}
                              layout="fill"
                              objectFit="contain"
                            />
                          </div>
                          <div className="time">8.48am</div>
                        </div>
                      </div>
                      <div className="incorrect-container">
                        <Button variant="outlined" color="inherit">
                          Incorrect Alert?
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="defect">
                    <div className="title">8:44am</div>
                    <div className="stepper">
                      <div className="thumb">
                        <Image
                          src="Package_5rbWbqc1A.svg"
                          loader={ImageKitLoader}
                          layout="fixed"
                          height={40}
                          width={40}
                        />
                      </div>
                      {/* <div className="vr" /> */}
                    </div>
                    <div className="notification">
                      <div className="info-container">
                        <div className="info">
                          <div className="title">Printing Belt</div>
                          <div className="sub-title">
                            Belt was marked in idle status.
                          </div>
                        </div>
                        <div className="count">Belt ID</div>
                      </div>
                      <div className="incorrect-container">
                        <Button variant="outlined" color="inherit">
                          Incorrect Alert?
                        </Button>
                      </div>
                    </div>
                  </div>
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
