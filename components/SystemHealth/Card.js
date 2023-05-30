import Image from 'next/image';
import { useState, useEffect } from 'react';
import ImageKitLoader from 'utils/ImageLoader';
import { msToTime } from 'utils/globalFunctions';
import { CardContainer } from './SystemHealth.styles';

export default function ({
  active, type, name, ip, index, started_at: startedAt,
}) {
  const [timeDifference, setTimeDifference] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setTimeDifference(
        startedAt
          ? msToTime(new Date().getTime() - startedAt)
          : '00:00:00',
      ),
      1000,
    );
    return () => clearInterval(interval);
  }, [startedAt]);

  return (
    <CardContainer active={active}>
      {!active && (
        <p className="downtime">{timeDifference}</p>
      )}
      <div className="container">
        <div className="image-container">
          <Image
            src={
              type === 'Camera'
                ? 'cctv.png'
                : type === 'NVR'
                  ? 'server.png'
                  : 'internet.png'
            }
            alt="camera"
            height={80}
            width={80}
            loader={ImageKitLoader}
          />
          <p>{active ? 'Active' : 'Inactive'}</p>
        </div>
        <div className="info">
          <p>
            Entity Type:
            {type}
          </p>
          <p>
            Entity Name:
            {name === 'undefined' ? `${type} ${index + 1}` : name}
          </p>
          <p>
            IP:
            {ip || 'NA'}
          </p>
        </div>
      </div>
    </CardContainer>
  );
}
