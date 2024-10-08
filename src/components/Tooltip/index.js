import React from 'react';

const Tooltip = ({ content, visible, onClose, onAccept }) => {
  if (!visible) return null;

  return (
    <div className="tooltip">
      <div className="tooltip-content">
        <p>{content}</p>
        <div className="tooltip-buttons">
          <button className="tooltip-button accept" onClick={() => onAccept()}>Yes</button>
          <button className="tooltip-button close" onClick={() => onClose()}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
