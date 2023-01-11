import Image from 'next/image';
import {useState, useEffect} from 'react';
import ImageKitLoader from 'utils/ImageLoader';
import { msToTime } from 'utils/globalFunctions';

export default function ({ active, type, name, ip, index, started_at }) {
  const [timeDifference, setTimeDifference] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setTimeDifference(
          started_at
            ? msToTime(new Date().getTime() - started_at)
            : '00:00:00'
        ),
      1000
    );
    return () => clearInterval(interval);
  }, [started_at]);

  return (
    <div
      style={{
        justifyContent: 'space-between',
        padding: '10px',
        margin: '10px 20px',
        marginLeft: '0',
        border: 'solid 1px',
        borderRadius: '4px',
        background: active ? '#00C1F3' : '#FF5742',
        color: 'white',
        fontSize: '18px'
      }}
    >
      {!active && (
        <p style={{ fontSize: '14px', paddingLeft: '10px' }}>{timeDifference}</p>
      )}
      <div style={{ display: 'flex' }}>
        <div style={{ padding: '10px' }}>
          <Image
            src={
              type == 'Camera'
                ? 'cctv.png'
                : type == 'NVR'
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
        <div style={{ padding: '20px 10px' }}>
          <p>Entity Type: {type}</p>
          <p>Entity Name: {name==='undefined'?`${type} ${index+1}`:name}</p>
          <p>IP: {ip || 'NA'}</p>
        </div>
      </div>
    </div>
  );
}
