import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Hexagon } from './Hexagon';
import { playHexSound } from '../../utils/audio';
import './HoneycombGrid.css';

const ICONS = [
  'fa-code', 'fa-database', 'fa-fire', 'fa-microchip', 'fa-wifi',
  'fa-terminal', 'fa-shield-halved', 'fa-server', 'fa-network-wired',
  'fa-laptop-code', 'fa-satellite', 'fa-atom', 'fa-bolt'
];

const ACTIVE_CLASSES = ['active-pink', 'active-blue', 'active-purple', 'active-green', 'active-yellow'];

export const HoneycombGrid = ({ onHexCountChange, gridTriggerRef }) => {
  const [gridData, setGridData] = useState({ rows: 0, cols: 0, grid: [] });
  const [activeStates, setActiveStates] = useState({});
  const activeTimers = useRef({});

  // Genera la cuadrícula óptima según el tamaño de la ventana
  const buildGrid = useCallback(() => {
    const isMobile = window.innerWidth <= 768;
    const rowHeight = isMobile ? 48 : 70;
    const colWidth = isMobile ? 52 : 78;

    const rows = Math.ceil(window.innerHeight / rowHeight) + 4;
    const cols = Math.ceil(window.innerWidth / colWidth) + 4;

    const grid = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        row.push({
          id: `${r}-${c}`,
          row: r,
          col: c,
          icon: ICONS[Math.floor(Math.random() * ICONS.length)],
        });
      }
      grid.push(row);
    }

    setGridData({ rows, cols, grid });
    if (onHexCountChange) onHexCountChange(rows * cols);
  }, [onHexCountChange]);

  useEffect(() => {
    buildGrid();
    window.addEventListener('resize', buildGrid);
    return () => window.removeEventListener('resize', buildGrid);
  }, [buildGrid]);

  // Activa el color del hexágono con limpieza temporizada
  const activateHex = useCallback((id, isPersistent = false) => {
    const randomColor = ACTIVE_CLASSES[Math.floor(Math.random() * ACTIVE_CLASSES.length)];
    
    setActiveStates((prev) => ({ ...prev, [id]: randomColor }));

    if (activeTimers.current[id]) clearTimeout(activeTimers.current[id]);

    activeTimers.current[id] = setTimeout(() => {
      setActiveStates((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }, isPersistent ? 2200 : 1200);
  }, []);

  // Onda expansiva en círculo
  const triggerWave = useCallback((centerRow, centerCol) => {
    gridData.grid.forEach((row) => {
      row.forEach((cell) => {
        const deltaRow = cell.row - centerRow;
        const deltaCol = cell.col - centerCol;
        const distance = Math.sqrt(deltaRow * deltaRow + deltaCol * deltaCol);
        const delay = distance * 65;

        setTimeout(() => {
          activateHex(cell.id);
        }, delay);
      });
    });
  }, [gridData.grid, activateHex]);

  // Conectar disparador desde el botón central
  useEffect(() => {
    if (gridTriggerRef) {
      gridTriggerRef.current = () => {
        const centerRow = Math.floor(gridData.rows / 2);
        const centerCol = Math.floor(gridData.cols / 2);
        triggerWave(centerRow, centerCol);
      };
    }
  }, [gridData, triggerWave, gridTriggerRef]);

  // Manejo de Clic en Nodo (Sonido dinámico único)
  const handleHexClick = (cell) => {
    activateHex(cell.id, true);
    triggerWave(cell.row, cell.col);
    
    // Sonido dependiente de la posición en pantalla
    const pitch = 0.8 + ((cell.row + cell.col) % 10) * 0.15;
    playHexSound(pitch);
  };

  return (
    <div className="honeycomb-container">
      {gridData.grid.map((row, rIdx) => (
        <div key={rIdx} className="hexagon-row">
          {row.map((cell) => (
            <Hexagon
              key={cell.id}
              icon={cell.icon}
              activeClass={activeStates[cell.id]}
              onHover={() => activateHex(cell.id)}
              onClick={() => handleHexClick(cell)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};