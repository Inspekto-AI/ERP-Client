import React, { useState, useEffect } from 'react';

const SummaryMeter = ({ progress }) => {
  const [arrowRotation, setArrowRotation] = useState(0);

  useEffect(() => {
    const rotation = progress * 180;
    setArrowRotation(rotation);
  }, [progress]);

  return (
    <svg width="60" height="60">
      {/* <path
        d="M5,25 A20,20 0 0,1 45,25"
        stroke="#ddd"
        strokeWidth="5"
        fill="none"
      /> */}
      <path
        d="M5,25 A20,20 0 0,1 45,25"
        stroke="#ddd"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <g transform={`rotate(${arrowRotation} 25 25)`}>
        <polygon points="19,23 50,25 19,27" fill="#000" />
      </g>
    </svg>
  );
};

export default SummaryMeter;
