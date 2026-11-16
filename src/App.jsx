import React, { useState, useRef } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas/BackgroundCanvas';
import { HoneycombGrid } from './components/HoneycombGrid/HoneycombGrid';
import { HeroOverlay } from './components/HeroOverlay/HeroOverlay';
import { TopHud } from './components/TopHud/TopHud';
import './App.css';

export default function App() {
  const [totalHex, setTotalHex] = useState(0);
  const triggerWaveRef = useRef(null);

  const handleWaveBtnClick = () => {
    if (triggerWaveRef.current) {
      triggerWaveRef.current();
    }
  };

  return (
    <div className="app-container">
      <BackgroundCanvas />
      <TopHud totalHex={totalHex} />
      <HoneycombGrid
        onHexCountChange={setTotalHex}
        gridTriggerRef={triggerWaveRef}
      />
      <HeroOverlay onTriggerWave={handleWaveBtnClick} />
    </div>
  );
}