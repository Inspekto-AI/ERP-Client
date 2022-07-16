import { useState, useEffect } from 'react';
import Image from 'next/image';
import DefectiveBagsContainer from 'styles/defectiveBags.styles';
import PropTypes from 'prop-types';
import { get } from 'utils/api';
import { BASE_URL } from 'utils/constants';

const DefectiveBags = ({ transaction_id }) => {
  const [rejectBags, setRejectBags] = useState(null);

  useEffect(() => {
    const fetchRejectBags = async () => {
      const res = await get('/api/transaction/fetch-reject', {
        id: transaction_id
      });
      setRejectBags(res?.data?.data);
    };
    fetchRejectBags();
  }, [transaction_id]);

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
                    src={e.local_image_location}
                    layout="fill"
                    loader={() =>
                      `${BASE_URL}/api/transaction/images?image_location=${e.local_image_location}`
                    }
                    objectFit="contain"
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
  transaction_id: PropTypes.any
};

export default DefectiveBags;
