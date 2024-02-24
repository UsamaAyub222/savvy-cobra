'use client'

import { useEffect, useRef, useState, useContext } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './WorkPage.module.css';
import { useParams, useRouter } from 'next/navigation';
import workData from '../workData';
import Image from 'next/image';
import Link from 'next/link';
import CustomHover from '../components/CustomHover';
import CustomCursor, {CursorContext} from '../components/CustomCursor';

export default function WorkPage() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const titleSmallRef = useRef(null);
  const divContentRefs = useRef([]);
  const wrapperRef = useRef(null);
  const lastTouchYRef = useRef(null);


  const router = useRouter();
  const { id } = useParams();

  const filterCategory = workData.filter((obj) => {
    return id === obj.slug;
  });

  // Set initial states outside of useEffect for immediate application
  
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    
    gsap.to(titleRef.current, {
      duration: 1,
      x: '0',
      opacity: 1,
      ease: 'power3.out',
    });
  
    gsap.to(titleSmallRef.current, {
      duration: 1,
      x: '0',
      opacity: 1,
      ease: 'power3.out',
    });
  
    const isLargeScreen = window.innerWidth > 769;

    divContentRefs.current.forEach((div) => {
      // if (isLargeScreen) {
      //   // Animation for screens over 769px (horizontal scroll)
      //   gsap.to(div, {
      //     x: '0',
      //     opacity: 1,
      //     ease: 'power3.out',
      //     scrollTrigger: {
      //       trigger: div,
      //       start: 'right 100%',  // Start when the right edge of divContent is about to enter the viewport
      //       end: 'left 0%',  // End when the left edge of divContent is about to leave the viewport
      //       toggleActions: 'play none none reverse',
      //       horizontal: true,
      //       onEnter: () => console.log("Entered trigger for divContent"),
      //       markers: true,
      //       scroller: containerRef.current,

      //       // scrub: true,
      //     },
      //   });
      // } else {
        // Animation for smaller screens (vertical scroll)
        gsap.to(div, {
          y: '0',
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: div,
            start: 'top bottom-=100',
            end: 'bottom top',
            toggleActions: 'play none none reverse',
          },
        });
      // }
    });
  }, []);

// ... rest of your component code ...
// const lastTouchYRef = useRef(null);  // Moved outside of useEffect
const [isHorizontalScroll, setIsHorizontalScroll] = useState(true);  // Add this state variable
useEffect(() => {
  const isTouchDevice = 'ontouchstart' in window;
  const isLargeScreen = window.innerWidth >= 769;
  const isIpad = /iPad|Tablet|Android/i.test(navigator.userAgent) && isLargeScreen;
  const container = containerRef.current;
  const wrapper = wrapperRef.current;  // Define wrapper here
  // const lastTouchYRef = useRef(null);
  let progress = 0;
  let lastScrollDirection = null;
  if (!isIpad && !isLargeScreen) return;

  const hijackScroll = (e) => {
      e.preventDefault();
      handleScroll(e.deltaY > 0 ? 'down' : 'up');
  };

  const hijackTouchScroll = (e) => {
      e.preventDefault();
      const touch = e.changedTouches[0];
      const currentY = touch.clientY;
      if (!lastTouchYRef.current) {
          lastTouchYRef.current = currentY;
      }
      const deltaY = lastTouchYRef.current - currentY;
      lastTouchYRef.current = currentY;
      handleScroll(deltaY > 0 ? 'down' : 'up');
  };

  const handleScroll = (direction) => {
      let increment = 0.015;
      if (direction === 'down') {
          progress += increment;
          lastScrollDirection = 'down';
      } else {
          progress -= increment;
          lastScrollDirection = 'up';
      }
      progress = Math.min(Math.max(progress, 0), 1);

      gsap.to(container, {
          x: -progress * (container.scrollWidth - window.innerWidth),
          duration: 0.5,
          onUpdate: () => {
              divContentRefs.current.forEach((div, index) => {
                  const rect = div.getBoundingClientRect();
                  const animationDirection = index % 2 === 0 ? '-100%' : '100%';

                  if (rect.left < window.innerWidth && rect.right > 0) {
                      gsap.to(div, {
                          y: '0',
                          opacity: 1,
                          duration: 1,
                          ease: 'power3.out',
                      });
                  } else {
                      gsap.to(div, {
                          y: animationDirection,
                          opacity: 0,
                          duration: 1,
                          ease: 'power3.out',
                      });
                  }
              });
          }
      });

      if (progress === 1 && lastScrollDirection === 'down') {
          document.body.style.overflowY = 'auto';
          if (isIpad) {
              window.removeEventListener('touchmove', hijackTouchScroll, { passive: false });
          } else {
              window.removeEventListener('wheel', hijackScroll, { passive: false });
          }
      }
  };

  const checkScrollPosition = () => {
      if (window.scrollY > wrapper.clientHeight + wrapper.offsetTop - window.innerHeight) {
          document.body.style.overflowY = 'auto';
          if (isIpad) {
              window.removeEventListener('touchmove', hijackTouchScroll, { passive: false });
          } else {
              window.removeEventListener('wheel', hijackScroll, { passive: false });
          }
      } else {
          document.body.style.overflowY = 'hidden';
          if (isIpad) {
              window.addEventListener('touchmove', hijackTouchScroll, { passive: false });
          } else {
              window.addEventListener('wheel', hijackScroll, { passive: false });
          }
      }
  };

  if (isIpad) {
      window.addEventListener('touchmove', hijackTouchScroll, { passive: false });
  } else if (isLargeScreen) {
      window.addEventListener('wheel', hijackScroll, { passive: false });
  }

  window.addEventListener('scroll', checkScrollPosition, { passive: false });
  document.body.style.overflowY = 'hidden';

  return () => {
      if (isIpad) {
          window.removeEventListener('touchmove', hijackTouchScroll, { passive: false });
      } else if (isLargeScreen) {
          window.removeEventListener('wheel', hijackScroll, { passive: false });
      }
      window.removeEventListener('scroll', checkScrollPosition, { passive: false });
      document.body.style.overflowY = 'auto';
  };
}, []);





  
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const cursorPosition = useContext(CursorContext);
  const maskX = cursorPosition && cursorPosition.x ? cursorPosition.x : 0;
  const maskY = cursorPosition && cursorPosition.y ? cursorPosition.y : 0;
  useEffect(() => {
    console.log("Cursor position updated:", cursorPosition);
  }, [cursorPosition]);


  const innerContent = filterCategory[0];
  let content = innerContent?.content.map((item, index) => {
    return (
      <div  className={styles.divContent} 
      key={index} 
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      style={hoveredIndex === index ? {
        '--maskX': `${cursorPosition.x}px`,
        '--maskY': `${cursorPosition.y}px`
      } : {}}ref={el => divContentRefs.current[index] = el}>
        <Link href={`${innerContent.slug}/${item.slug}`}>
          <Image placeholder='blur'
            blurDataURL='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOU3z+pHgAEZgHxedgNVQAAAABJRU5ErkJggg=='
             className={styles.unfiltered} src={item.image} alt={item.title} />
            <Image placeholder='blur'
            blurDataURL='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOU3z+pHgAEZgHxedgNVQAAAABJRU5ErkJggg=='
             className={styles.filtered} src={item.image} alt={item.title} />
        </Link>
        <div className={styles.textDiv}>
          <span>{item.industry}</span>
          <h2>{item.title}</h2>
          <date>{item.date}</date>
        </div>
      </div>
    )
  });

  return (
    <main className={styles.bg}>
      <div ref={wrapperRef} className={styles.wrapper}>
        <div className={styles.workText}>
          <h1>
            <span className={styles.title} ref={titleRef}>{innerContent.title}</span>
            <span className={styles.titleSmall} ref={titleSmallRef}>{innerContent.titleSmall}</span>
          </h1>
          <p className={styles.para}>{innerContent.desc}</p>
        </div>
        <div className={styles.container} ref={containerRef}>
          {content}
        </div>
      </div>
    </main>
  );
}