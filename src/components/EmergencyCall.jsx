import React from 'react';
import './EmergencyCall.css';

const EmergencyCall = () => {
  const handleCall = () => {
    const confirmCall = window.confirm(
      '🚑 Are you sure you want to call emergency support?\n\nYou will be connected to: +91 7386270536'
    );

    if (confirmCall) {
      window.location.href = 'tel:+917386270536';
    }
  };

  return (
    <div className="emergency-container">
      <button className="emergency-btn" onClick={handleCall} title="Click to call emergency support">
        🚑 Call Emergency
      </button>
    </div>
  );
};

export default EmergencyCall;
