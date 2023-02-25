import { useState, useEffect } from 'react';
import Image from 'next/image';
import DefectiveBagsContainer from 'styles/defectiveBags.styles';
import PropTypes from 'prop-types';
import { BASE_URL } from 'utils/constants';
import { get, put } from 'utils/api';
import { getStartAndEndDate } from 'utils/globalFunctions';
import { Button } from '@material-ui/core';

const DefectiveBags = ({ transaction_id, belt_id }) => {
  const [rejectBags, setRejectBags] = useState(null);

  useEffect(() => {
    const fetchRejectBags = async () => {
      const res = await get('/api/transaction/fetch-reject', {
        transaction_id
      });
      setRejectBags(res?.data?.data);
    };
    const fetchRejectBagsByBelt = async () => {
      const res = await get('/api/transaction/fetch-reject-belt-bags', {
        machine_id: belt_id,
        dateRange: getStartAndEndDate()
      });
      setRejectBags(res?.data?.data);
    };
    if (!belt_id) fetchRejectBags();
    else fetchRejectBagsByBelt();
  }, [belt_id, transaction_id]);

  const removeFromMissprint = async (id, image_location, index) => {
    const response = await put(
      `/api/transaction/mark-false-positive?id=${id}&image_location=${image_location}`
    );

    if (response?.data?.success) {
      const newrejectbags = [...rejectBags];
      newrejectbags[index] = { ...newrejectbags[index], is_false_positive: 1 };
      setRejectBags(newrejectbags);
    }
  };
  console.log(rejectBags, 'rejectbags');

  return (
    <DefectiveBagsContainer>
      {rejectBags && rejectBags.length > 0 ? (
        <>
          {rejectBags.map((e, index) => {
            console.log(e, index);
            return (
              <div className="defect" key={index}>
                <div className={`title ${index === 0 ? 'active' : ''}`}>
                  {new Date(e?.created_at).toLocaleTimeString()}
                </div>
                <div className="stepper">
                  <div className="thumb" />
                  {index === rejectBags.length - 1 ? null : (
                    <div className="vr" />
                  )}
                </div>
                <div className="image">
                  <div className="image-container">
                    <Image
                      src={e.local_image_path}
                      // src={
                      //   transaction_id || printingBeltId
                      //     ? e.local_image_location || e.local_image_path
                      //     : e.s3_image_url
                      // }
                      layout="fill"
                      loader={() =>
                        `${BASE_URL}/api/transaction/images?image_location=${e.local_image_path}`
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
                          removeFromMissprint(e?.id, e?.local_image_path, index)
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
            );
          })}
        </>
      ) : (
        <div className="no-defects">No missing labled bags found.</div>
      )}
    </DefectiveBagsContainer>
  );
};

DefectiveBags.propTypes = {
  transaction_id: PropTypes.any,
  belt_id: PropTypes.string
};

export default DefectiveBags;
