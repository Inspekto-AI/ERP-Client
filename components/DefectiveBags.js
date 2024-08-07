import { useState, useEffect } from 'react';
import Image from 'next/image';
import DefectiveBagsContainer from 'styles/defectiveBags.styles';
import PropTypes from 'prop-types';
import { BASE_URL } from 'utils/constants';
import { get, put } from 'utils/api';
import { getStartAndEndDate } from 'utils/globalFunctions';
import { Button } from '@material-ui/core';
import Loader from './Loader';

function DefectiveBags({
  transaction_id: transactionId,
  belt_id: beltId,
  date,
  dateUnAltered,
  shift,
}) {
  const [rejectBags, setRejectBags] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRejectBags = async () => {
      const res = await get('/api/shipment/reject-bags', {
        shipment_id: transactionId,
      });
      setRejectBags(res?.data?.data);
      setIsLoading(false);
    };
    const fetchRejectBagsByBelt = async () => {
      const res = await get('/api/shipment/reject-belt-bags', {
        machine_id: beltId,
        dateRange: getStartAndEndDate(date, dateUnAltered),
      });
      setRejectBags(res?.data?.data);
      setIsLoading(false);
    };
    const fetchRejectBagsByBeltShiftWise = async () => {
      const res = await get('/api/shipment/reject-bags-shiftwise', {
        machine_id: beltId,
        dateRange: getStartAndEndDate(date, dateUnAltered),
        // updatedDateRange: [dateRange[0] + 86400000, dateRange[1] + 86400000],
        // updatedDateRange: getStartAndEndDate(date),
        updatedDateRange: getStartAndEndDate(date, dateUnAltered),

        shift,
      });
      setRejectBags(res?.data?.data);
      setIsLoading(false);
    };
    // console.log(shift);
    if (shift !== null && beltId) fetchRejectBagsByBeltShiftWise();
    else if (!beltId) fetchRejectBags();
    else fetchRejectBagsByBelt();
  }, [beltId, transactionId]);

  const removeFromMissprint = async (id, imageLocation, index) => {
    const response = await put(
      `/api/shipment/mark-false-positive?id=${id}&image_location=${imageLocation}`,
    );

    if (response?.data?.success) {
      const newrejectbags = [...rejectBags];
      newrejectbags[index] = { ...newrejectbags[index], is_false_positive: 1 };
      setRejectBags(newrejectbags);
    }
  };

  return (
    <DefectiveBagsContainer data-testid={`defectiveBags-${beltId}`}>
      {isLoading ? (
        <Loader />
      ) : rejectBags && rejectBags.length > 0 ? (
        <>
          {rejectBags.map((e, index) => (
            <div className="defect" key={index + 1}>
              <div className={`title ${index === 0 ? 'active' : ''}`}>
                {new Date(e?.created_at).toLocaleTimeString()}
              </div>
              <div className="stepper">
                <div className="thumb" />
                {index === rejectBags.length - 1 ? null : <div className="vr" />}
              </div>
              <div className="image">
                <div className="image-container">
                  <Image
                    src={e.local_image_path}
                    // src={
                    //   transactionId || printingBeltId
                    //     ? e.local_image_location || e.local_image_path
                    //     : e.s3_image_url
                    // }
                    layout="fill"
                    loader={() =>
                      `${BASE_URL}/api/shipment/images?image_location=${e.local_image_path}`
                    }
                    objectFit="contain"
                    objectPosition="top"
                  />
                </div>
                <div className="description">
                  <div className="heading">Alert #{index + 1}</div>
                  <div className="sub-heading">Bag tag missing</div>
                  {e?.is_false_positive === 1 ? null : (
                    <Button
                      onClick={() =>
                        removeFromMissprint(e?.misprint_id, e?.local_image_path, index)
                      }
                      variant="outlined"
                      color="secondary"
                      style={{ fontSize: '10px', fontWeight: '600' }}
                    >
                      INCORRECT ALERT?
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="no-defects">No missing labled bags found.</div>
      )}
    </DefectiveBagsContainer>
  );
}

DefectiveBags.propTypes = {
  transaction_id: PropTypes.number,
  belt_id: PropTypes.string,
};

export default DefectiveBags;
