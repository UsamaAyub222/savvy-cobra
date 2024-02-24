// components/CustomHover.js
import React, { useState, useRef } from 'react';
import styles from './CustomHover.module.css';

const CustomHover = ({ children, hoverName }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverElementRef = useRef(null);

    const handleMouseMove = (e) => {
        console.log("Mouse moving"); // Add this line to check if the mouse is moving
        const hoverLabel = hoverElementRef.current.querySelector(`.${styles.hoverLabel}`);
        hoverLabel.style.left = `${e.clientX - hoverElementRef.current.getBoundingClientRect().left + 10}px`;
        hoverLabel.style.top = `${e.clientY - hoverElementRef.current.getBoundingClientRect().top + 10}px`;
    };

    return (
        <div 
            ref={hoverElementRef}
            className={styles.hoverElement} 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={isHovered ? handleMouseMove : null}
        >
            {children}
            {isHovered && <div className={styles.hoverLabel}><div className={styles.plus}>+ </div><span className={styles.hoverLabelName}>{hoverName}</span></div>}
        </div>
    );
}

export default CustomHover;
