import React, { useState, useEffect } from 'react';
import RefreshIcon from '@nokia-csf-uxr/ccfk-assets/legacy/RefreshIcon';
import IconButton from '@nokia-csf-uxr/ccfk/IconButton';
import '../styles/refreshButton.css'; // Import your CSS file for styling

export default function RefreshButton ({onClick}) {
  const [rotating, setRotating] = useState(false);

  const handleRefresh = () => {
    setRotating(true);
    onClick('add')
    // Simulate a loading process for 3 seconds
    setTimeout(() => {
      setRotating(false);
    }, 3000);
  };

  useEffect(() => {
    if (rotating) {
      // If the button is rotating, add a class to apply the rotation animation
      document.getElementById('refreshButton').classList.add('rotate');
    } else {
      // If the button is not rotating, remove the rotation class
      document.getElementById('refreshButton').classList.remove('rotate');
    }
  }, [rotating]);

  return (
    <IconButton size="large" id="refreshButton" onClick={()=>handleRefresh()} >
        <RefreshIcon/>
    </IconButton>
  );
};