// take data from data.js render the dynamic page for each object in the array into cards with the data from the array and use ssg to generate the pages as well as next/image to optimize the images
//
//
//
//
"use client"

import React from 'react';
import { useParams } from 'next/navigation';
// import { metadata } from '../../layout';
// import { NextSeo } from 'next-seo';
import  styles  from './Details.module.css'
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
// import Layout from '../../layout';
import Image from 'next/image';
import Link from 'next/link';
import data from "../../workData"

export default function Portfolio() {

    const { id, id2 } = useParams();   
  let filterCategory = data.filter((obj) => {
    return id === obj.slug;
  });

  filterCategory = filterCategory[0];
  let object = {};
  let findIn = filterCategory?.content.filter((obj) => {
    if (id2 === obj.slug) {
      object = obj;
      return;
    }
  });
  const bannerRef = useRef(null);
  const mainTextRef = useRef(null);
  const imagesRef = useRef([]);

  console.log(filterCategory);
  console.log(object);

  useEffect(() => {
    gsap.to(bannerRef.current.children, {
      duration: 1,
      y: '0',
      opacity: 1,
      stagger: 0.3,
      ease: 'power2.out',
    
    });

    gsap.to(mainTextRef.current.children, {
      duration: 1,
      opacity: 1,
      y: '0',
      stagger: 0.3,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: mainTextRef.current,
        start: 'top center',
        end: 'bottom center',
        // scrub: true,
      },
    });

    imagesRef.current.forEach((div, index) => {
    gsap.to(div.children, {
      duration: 1,
      opacity: 1,
      y: '0',
      stagger: 0.3,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: div,
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse',
        // scrub: true,
      },
    });})
  }, []);

  return (
    <main>
      <div ref={bannerRef} className={`projectBanner ${styles.projectBanner}`}>
          <h1>
        <Link href={`/${filterCategory.slug}`}>
            <span>{filterCategory.title}</span>
            <span>{filterCategory.titleSmall}</span>
        </Link>
          </h1>
        <h2>{object.title}</h2>
        <date>{object.date}</date>
      <div ref={mainTextRef} className={`mainText ${styles.mainText}`}>
        <h3>Context</h3>
        <p>{object.context}</p>
        <h3>Solution</h3>
        <p>{object.solution}</p>
      </div>
      <div className={styles.arrow}>
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 10L12 17L19 10H5Z" fill="#fff"/>
    </svg>    </div>
      </div>
      <div  className={`projectImages ${styles.projectImages}`}>
        {object.imgExtended &&
          object.imgExtended.map((img, index) => (
            <div ref={el => imagesRef.current[index] = el} className={`projectImage ${styles.projectImage}`} key={index}>
              <div className={styles.imageContainer}>
                <Image
                  src={img}
                  alt='project picture'
                  placeholder='blur'
                  blurDataURL='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOU3z+pHgAEZgHxedgNVQAAAABJRU5ErkJggg=='
                />
              </div>
              <p>{object.textExtended[index] && object.textExtended[index]}</p>
            </div>
          ))}
      </div>
    </main>
    );
    }