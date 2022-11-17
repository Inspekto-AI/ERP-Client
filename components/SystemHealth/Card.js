import React from 'react';
import Image from 'next/image';
import ImageKitLoader from 'utils/ImageLoader';

export default function ({ active, type, name }) {
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
        // maxWidth: '360px',
        // width: '100%'
      }}
    >
      {!active && (
        <p style={{ fontSize: '14px', paddingLeft: '10px' }}>00:12:50</p>
      )}
      <div style={{ display: 'flex' }}>
        <div style={{ padding: '10px' }}>
          <Image
            src={
              type == 'camera'
                ? 'cctv.png'
                : type == 'transmission'
                ? 'internet.png'
                : 'server.png'
            }
            alt="camera"
            // className={classes.image}
            height={80}
            width={80}
            loader={ImageKitLoader}
          />
          <p>{active ? 'Active' : 'Inactive'}</p>
        </div>
        <div style={{ padding: '20px 10px' }}>
          <p>Entity Type: Camera</p>
          <p>Entity Name: 691LM1</p>
          <p>Wagon Loader</p>
          <p>IP: 192.168.10.3</p>
        </div>
      </div>
    </div>
  );
}
