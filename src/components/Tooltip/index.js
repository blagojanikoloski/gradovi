// Tooltip.js
import React from 'react';

const Tooltip = ({ content, position, visible }) => {
  if (!visible) return null;

  return (
    <div className="tooltip" style={{ left: position.x, top: position.y }}>
      {content}
      <div className="tooltip-buttons">
        <button onClick={() => alert('Yes clicked')}>Yes</button>
        <button onClick={() => alert('No clicked')}>No</button>
      </div>
    </div>
  );
};

export default Tooltip;
