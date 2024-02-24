'use client'


import Image from 'next/image';
import styles from './About.module.css';
import pic from '../../../public/images/pic.jpg'
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


export default function AboutPage() {

    const picWrapperRef = useRef(null);
    const quoteRef = useRef(null);
    const aboutRef = useRef(null);
    const valuesRef = useRef(null);


    useEffect(() => {
      // Y animation for picWrapper
      gsap.fromTo(
        picWrapperRef.current,
        {opacity:0, x: '100%' },
        {
          x: '0%',
          duration: 1.5,
          opacity: 1,
          scrollTrigger: {
            trigger: picWrapperRef.current,
            start: 'top bottom',
            end: 'bottom top',
            // scrub: 1,
            toggleActions: 'play reverse play reverse'

          },
        }
      );
  
      // Text animation for quote
      gsap.fromTo(
        quoteRef.current.querySelectorAll('.word'),
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1,  // 3 seconds
          stagger: 0.2,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top bottom',
            end: 'bottom top',
            toggleActions: 'play reverse play reverse'

            // scrub: 1,
          },
        }
      );

      if (aboutRef.current) {
        gsap.fromTo(
          aboutRef.current,
          { x: '-50%', opacity: 0 },
          {
            x: '0%',
            opacity: 1,
            duration: 1.5,
            scrollTrigger: {
              trigger: aboutRef.current,
              start: 'top bottom',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse'
            },
          }
        );
      }
  
      // Values animation
      if (valuesRef.current) {
        gsap.fromTo(
          valuesRef.current,
          { y: '50%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration:1.5,
            scrollTrigger: {
              trigger: valuesRef.current,
              start: 'top bottom',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse'
            },
          }
        );
      }
  console.log(quoteRef.current.querySelectorAll('.word'))
    }, []);

    return (
        <main className={styles.bg}>
            <div className={styles.aboutPic}>
                <div ref={aboutRef} className={styles.about}>
                    <h1>About</h1>
                    <p>
                    Savvy Cobra is an Ottawa-based design studio, dedicated to helping businesses elevate their brand with our top-notch branding, web, advertising and graphic solutions. I strive to help business owners create unique visuals that clearly communicate their services & values. My mission is to give you creative confidence so you can focus on running the day-to-day operations of your business. I believe in creating lasting relationships with my clients so that together we can make a positive impact on your bottom line. My vision is to be the go-to resource for businesses looking for high quality and reliable design services.
                        </p>
                </div>
                <div className={styles.picContainer}>
                    <div ref={picWrapperRef} className={styles.picWrapper}>

                    <Image placeholder='blur'
            blurDataURL='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOU3z+pHgAEZgHxedgNVQAAAABJRU5ErkJggg=='
            style={{  objectFit: 'cover' }}
            src={pic}
             alt='Personal picture' />
                    </div>
             <small className={styles.caption}><span>Obaida Zeino</span> Founder/Graphic and Web Designer</small>
                </div>
            </div>
            <div className={styles.quoteValues}>
                <blockquote ref={quoteRef} className={styles.quote}>
                    <p>
                    {`“A designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away.”`.split(' ').map((word, index) => (
      <span key={index} className='word'>{word} </span>
    ))}                    </p>
                    <cite>- Antoine de Saint-Exupery</cite>
                </blockquote>
                <div ref={valuesRef} className={styles.values}>
                    <h2>Values</h2>
                    <h3>Competence</h3>
                    <p>At Savvy Cobra, we are commited to a high level of competence and to providing our clients with unmatched skill, excellence and expertise in the respective requested areas.</p>
                    <h3>Responsibility</h3>
                    <p>We assume full responsibility of any project at hand, while being highly prepared to respond to any issues that may arise.</p>
<h3>Attention and Full Involvement</h3>
<p>At Savvy Cobra, we give each project our full attention and our unbridled involvement. We make sure of that through highly efficient resource management and allocation. We believe this is key to producing outstanding results.</p>
                    <h3>Integrity</h3>
                    <p>We adhere to the highest of standards when it comes to integrity. For us, this entails a commitment to giving each project our very best, sustaining long-term relation- ships with clients or concluding them at a positive note and maintaining honesty and transparency in communication with the client as it pertains to the project at hand.</p>
                </div>
            </div>
        </main>
        );
    }
    