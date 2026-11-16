import React from 'react';
import { playButtonSound } from '../../utils/audio';
import './HeroOverlay.css';

export const HeroOverlay = ({ onTriggerWave }) => {
  const handleClick = () => {
    playButtonSound(); // Sonido exclusivo para el botón
    if (onTriggerWave) onTriggerWave();
  };

  return (
    <div className="center-overlay">
      <div className="hero-card">
        <h1 className="title-neon">CYBER LAB</h1>
        <p className="subtitle-retro">CYBERPUNK // RETRO SYSTEM v2.5</p>

        <div className="controls-container">
          <button className="btn-neon" onClick={handleClick}>
            <i className="fa-solid fa-wave-square" /> ONDA NEÓN
          </button>
        </div>
      </div>
    </div>
  );
};