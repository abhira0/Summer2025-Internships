// src/components/jobs/VirtualTable.jsx
import React, { useState, useEffect, useRef } from 'react';

const ROW_HEIGHT = 48; // Adjust based on your actual row height
const BUFFER_SIZE = 10; // Number of extra rows to render above and below viewport

export default function VirtualTable({ data, renderRow, headerContent }) {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollTop, clientHeight } = containerRef.current;
      const start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER_SIZE);
      const end = Math.min(
        data.length,
        Math.ceil((scrollTop + clientHeight) / ROW_HEIGHT) + BUFFER_SIZE
      );

      setVisibleRange({ start, end });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial calculation
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [data.length]);

  const totalHeight = data.length * ROW_HEIGHT;
  const visibleData = data.slice(visibleRange.start, visibleRange.end);
  const offsetY = visibleRange.start * ROW_HEIGHT;

  return (
    <div 
      ref={containerRef}
      className="overflow-auto"
      style={{ height: 'calc(100vh - 400px)', position: 'relative' }}
    >
      {headerContent}
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleData.map((item, index) => renderRow(item, visibleRange.start + index))}
        </div>
      </div>
    </div>
  );
}