import { useEffect, useState } from 'react';
import Layout from 'components/Layout';
import Image from 'next/image';
import Container from 'styles/notification.styles';
import ImageKitLoader from 'utils/ImageLoader';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { get } from 'utils/api';

const Notification = ({ close }) => {
  const [missingData, setMissingData] = useState(null);

  useEffect(() => {
    const fetchPrintingBeltsIds = async () => {
      const res = await get('/api/transaction/missing-labels');
      setMissingData(res?.data?.data);
    };
    fetchPrintingBeltsIds();
    return () => {
      setMissingData(null);
    };
  }, []);

  console.log(missingData);

  return (
    <Layout
      alternateHeader
      title="Latest Activity"
      counter={21}
      changeBackground
      close={close}
      hideFooter
    >
      <Container>
        <div className="defect active">
          <div className="title">Just Now</div>
          <div className="stepper">
            <div className="thumb">
              <div className="vr invert-vr" />
              <Image
                src="Package_5rbWbqc1A.svg"
                loader={ImageKitLoader}
                layout="fixed"
                height={60}
                width={60}
              />
            </div>
            <div className="vr" />
          </div>
          <div className="notification">
            <div className="info-container">
              <div className="info">
                <div className="title">Incorrect bags</div>
                <div className="sub-title">5 bags passed unmarked.</div>
              </div>
              <div className="count">5 bags</div>
            </div>
            <div className="image-container">
              <div className="image">
                <div className="image-container">
                  <Image
                    src="/Misc/cement_bag_OVJ7LTPaH.png"
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
                    src="/Misc/cement_bag_OVJ7LTPaH.png"
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
                    src="/Misc/cement_bag_OVJ7LTPaH.png"
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
                height={60}
                width={60}
              />
            </div>
            {/* <div className="vr" /> */}
          </div>
          <div className="notification">
            <div className="info-container">
              <div className="info">
                <div className="title">Printing Belt</div>
                <div className="sub-title">Belt was marked in idle status.</div>
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
      </Container>
    </Layout>
  );
};

Notification.propTypes = {
  close: PropTypes.func
};

export default Notification;
