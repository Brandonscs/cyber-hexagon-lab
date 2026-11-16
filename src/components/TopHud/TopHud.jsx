import React from 'react';
import './TopHud.css';

export const TopHud = ({ totalHex }) => {
  return (
    <div className="top-hud">
      <div className="hud-item">
        <div className="hud-status" />
        <span>
          SYSTEM STATUS: <strong style={{ color: 'var(--neon-green)' }}>ONLINE</strong>
        </span>
      </div>
      <div className="hud-item">
        <i className="fa-solid fa-bolt" style={{ color: 'var(--neon-yellow)' }} />
        <span>HEX GRID: {totalHex || 'READY'} UNITS</span>
      </div>
    </div>
  );
};