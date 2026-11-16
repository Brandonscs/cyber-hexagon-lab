import React, { memo } from 'react';

export const Hexagon = memo(({ icon, activeClass, onHover, onClick }) => {
  return (
    <div
      className={`hexagon ${activeClass || ''}`}
      onMouseEnter={onHover}
      onClick={onClick}
    >
      <div className="hex-inner">
        <i className={`fa-solid ${icon}`} />
      </div>
    </div>
  );
});