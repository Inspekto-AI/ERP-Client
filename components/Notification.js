import { useEffect, useState } from 'react';
import Layout from 'components/Layout';
import Image from 'next/image';
import Container from 'styles/notification.styles';
import ImageKitLoader from 'utils/ImageLoader';
import PropTypes from 'prop-types';
import { get } from 'utils/api';
import { getStartAndEndDate } from 'utils/globalFunctions';
import moment from 'moment';
import { BASE_URL } from 'utils/constants';

function Notification({ close }) {
  const [missingData, setMissingData] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchPrintingBeltsIds = async () => {
      const res = await get('/api/notification', {
        dateRange: getStartAndEndDate(),
      });
      setMissingData(res?.data?.data);
      let count = 0;
      // res?.data?.data?.forEach(e => console.log(e));
      if (res?.data?.data) {
        Object.values(res?.data?.data).forEach((e) => {
          count += e.length;
        });
      }
      setTotalCount(count);
    };
    fetchPrintingBeltsIds();
    return () => {
      setMissingData(null);
    };
  }, []);

  return (
    <Layout
      alternateHeader
      title="Latest Activity"
      counter={totalCount}
      changeBackground
      close={close}
      hideFooter
    >
      <Container>
        {missingData
          && Object.keys(missingData)
            .filter((e) => {
              if (missingData[e].length !== 0) return true;
              return false;
            })
            .map((e, index) => (
              <div className="defect active" key={index}>
                <div className="title">{e}</div>
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
                      <div className="sub-title">
                        {missingData[e].length}
                        {' '}
                        bags passed unmarked from Belt -
                        {' '}
                        {e}
                        .
                      </div>
                    </div>
                    <div className="count">
                      {missingData[e].length}
                      {' '}
                      bags
                    </div>
                  </div>
                  <div
                    className={`${'image-container'} ${'outer-image-container'}`}
                  >
                    {missingData[e].map((ele, idx) => (
                      <div className="image" key={idx}>
                        <div className="image-container">
                          <Image
                            src={ele.local_image_path}
                            loader={() => `${BASE_URL}/api/shipment/images?image_location=${ele.local_image_path
                              || ele.local_image_location
                            }`}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                        <div className="time">
                          {moment(ele.created_at).format('hh:mm')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
      </Container>
    </Layout>
  );
}

Notification.propTypes = {
  close: PropTypes.func,
};

export default Notification;
