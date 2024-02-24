'use client'

import { useState, useEffect } from 'react';
// import styles from './Loader.module.css';

const Loader = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < 100) {
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 50); // Adjust the interval for faster or slower counting

      return () => clearInterval(interval);
    }
  }, [count]);

  return (
    <div className='loaderContainer'>
      <div className='loader'>
        {count}%
      </div>
    </div>
  );
};

export default Loader;
