'use client'
import React, { useState, useEffect, createContext } from 'react';
// import './CustomCursor.css';

export const CursorContext = createContext();

const CustomCursor = ({ children }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = e.target.getBoundingClientRect();
      const x = e.pageX - rect.left;
      const y = e.pageY - rect.top;
      setCursorPosition({ x, y });
    };
    

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <CursorContext.Provider value={cursorPosition}>
      {children}
    </CursorContext.Provider>
  );
};

export default CustomCursor;
