import { useState, useEffect } from 'react';
import Image from 'next/image';
import DefectiveBagsContainer from 'styles/defectiveBags.styles';
import PropTypes from 'prop-types';
import { get } from 'utils/api';
import { BASE_URL } from 'utils/constants';

const DefectiveBags = ({
  transaction_id,
  passedRejectArray,
  printingBeltId
}) => {
  const [rejectBags, setRejectBags] = useState(null);

  useEffect(() => {
    const fetchRejectBags = async () => {
      const reqParams = {
        transaction_id,
        printing_belt_id: printingBeltId
      };
      if (printingBeltId) delete reqParams.transaction_id;
      else delete reqParams.printing_belt_id;
      const res = await get('/api/transaction/fetch-reject', reqParams);
      setRejectBags(res?.data?.data);
    };
    if (!passedRejectArray) fetchRejectBags();
    else setRejectBags(passedRejectArray);
  }, [passedRejectArray, transaction_id, printingBeltId]);

  return (
    <DefectiveBagsContainer>
      {rejectBags && rejectBags.length > 0 ? (
        <>
          {rejectBags.map((e, index) => (
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
                    src={
                      transaction_id || printingBeltId
                        ? e.local_image_location || e.local_image_path
                        : e.s3_image_url
                    }
                    layout="fill"
                    loader={() =>
                      transaction_id || printingBeltId
                        ? `${BASE_URL}/api/transaction/images?image_location=${
                            e.local_image_location || e.local_image_path
                          }`
                        : e.s3_image_url
                    }
                    objectFit="contain"
                    objectPosition="top"
                  />
                </div>
                <div className="description">
                  <div className="heading">Alert #{index + 1}</div>
                  <div className="sub-heading">Bag tag missing</div>
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
};

DefectiveBags.propTypes = {
  transaction_id: PropTypes.any,
  passedRejectArray: PropTypes.array,
  printingBeltId: PropTypes.any
};

export default DefectiveBags;
