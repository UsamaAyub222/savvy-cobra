'use client'

// components/ArtisticImages.js
import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import styles from './ArtisticImages.module.css';
import CarouselData from '../CarouselData';
import CustomHover from '../components/CustomHover';
import Link from 'next/link';
// import ScrollMagic from 'scrollmagic';
// import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
// import debounce from 'lodash/debounce';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import debounce from 'lodash/debounce';
import workData from '../workData';

gsap.registerPlugin(ScrollTrigger);


const ArtisticImages = () => {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const textRef = useRef(null);
  const [currentSet, setCurrentSet] = useState(0);
  const maxSet = CarouselData.length - 1; // Set maxSet based on CarouselData length
  const staticTextRef = useRef(null);
  const descriptionRef = useRef(null);
  const learnRef = useRef(null);

  useLayoutEffect(() => {
    const scrollTriggerSettings = {
      start: "top bottom",
      end: "bottom top",
    };

    gsap.fromTo(staticTextRef.current, {
      opacity: 0,
      y: -50,
    }, {
      opacity: 1,
      y: 0,
      scrollTrigger: { ...scrollTriggerSettings, trigger: staticTextRef.current },
    });

    const staticTextST = ScrollTrigger.create({
      ...scrollTriggerSettings,
      trigger: staticTextRef.current,
    });

    return () => {
      staticTextST.kill();
    };
  }, []);

  const texts = [
    { order: "1", title: "Branding", titleSmall: "& Visual Identity", sub: "As a creative, I excel in branding and identity design, showcasing a robust portfolio in logo design and branding. My services are tailored to help businesses craft a memorable brand identity that resonates with their audience. With a personalized, collaborative approach, I ensure each design reflects the brand's essence while standing out in the market. Whether a startup or an established entity, I'm here to elevate your brand image to new heights.", link: "/logoBranding" },
    // { order: "2", title: "Web", titleSmall: "& Interactive Design", sub: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo ', link: "#" },
    { order: "2", title: "Advertising", titleSmall: "& Campaign Design", sub: "As a creative, I excel in advertising and campaign design, delivering visuals with a keen sense of color and complex, aesthetically pleasing graphics. My services are tailored to craft compelling campaigns that captivate and resonate with target audiences. Through collaborative endeavors, your marketing messages are conveyed with impact and elegance. Let's embark on a journey to transform your advertising vision into a captivating reality, propelling your brand forward with every campaign.", link: "/Advertising" },
    { order: "3", title: "Graphic", titleSmall: "Design", sub: "As a creative, I am adept in graphic design, crafting visuals that harmonize vibrant color palettes with intricate, visually appealing graphics. My services are tailored to create engaging designs that articulate your message and captivate your target audience. Through collaborative engagement, your ideas are metamorphosed into impactful and refined graphics. Let's collaborate to transform your vision into a graphic narrative, amplifying your brand's market presence with each creative undertaking.", link: "/GraphicDesign" },
    // { order: "5", title: "EastBridge", titleSmall: "Program", sub: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo ', link: "#" },
    // ... add more texts for each round
  ];
  const [scrollDir, setScrollDir] = useState('down');
  const [isPinned, setIsPinned] = useState(false);


  useEffect(() => {
    const load = async () => {
      if (typeof window !== 'undefined' && window.innerWidth > 768) {
        const ScrollMagic = (await import('scrollmagic')).default;
        // ... rest of your code ...
      }
    }
    load();
  }, []);

  useEffect(() => {
    const load = async () => {

    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      const ScrollMagic = (await import('scrollmagic')).default;

      const controller = new ScrollMagic.Controller();

      const scene = new ScrollMagic.Scene({
        triggerElement: containerRef.current,
        duration: '100%',
        triggerHook: 0
      })
      .on("enter", () => setIsPinned(true))
      .on("leave", () => setIsPinned(false))
      .on("progress", function(event) {
        const { progress } = event;
        const totalSets = CarouselData.length;
        const newCurrentSet = Math.min(Math.max(0, Math.floor(progress * totalSets)), totalSets - 1);

        console.log("Progress:", progress);
        console.log("Total Sets:", totalSets);
        console.log("New Current Set:", newCurrentSet);

        // if (newCurrentSet !== currentSet) {  // Here, currentSet is your existing state variable
          setCurrentSet(newCurrentSet);
        // }
      })

      .setPin(containerRef.current)
      .addTo(controller);

      return () => {
        scene.destroy();
      };
    }}
    load()
  }, []);



  const lastScrollTop = useRef(0);
const scrollTimeout = useRef(null);

useEffect(() => {
  const load = async () => {

  if (typeof window !== 'undefined' && window.innerWidth > 768) {
    const ScrollMagic = (await import('scrollmagic')).default;

    const handleScroll = debounce(() => {
      let scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (isPinned) {
        if (scrollTop > lastScrollTop.current) {
          // Downscroll
          setScrollDir('down');
          setCurrentSet(prev => Math.min(CarouselData.length - 1, prev + 1));
        } else if (scrollTop < lastScrollTop.current) {
          // Upscroll
          setScrollDir('up');
          setCurrentSet(prev => Math.max(0, prev - 1));
        }
      }

      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    }, 1000, { 'maxWait': 1500, 'leading': true, 'trailing': false  });  // 1000 milliseconds debounce time

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }}
  load();

}, [isPinned]);




useLayoutEffect(() => {
  const scrollTriggerSettings = {
    start: "top bottom",
    end: "bottom top",
    scrub: false,
  };

  const triggers = [];
  if (imagesRef.current) {gsap.set(imagesRef.current, {
    x: (index) => index % 2 === 0 ? '-100%' : '100%',
    opacity: 0,
  });}

  gsap.set(textRef.current.querySelectorAll('span'), {
    y: '-100%',
    opacity: 0
  });

  imagesRef.current.forEach((img, index) => {
    gsap.to(img, {
      scrollTrigger: { ...scrollTriggerSettings, trigger: img },
      x: '0%',
      ease: "power3.out",
      opacity: 1,
      duration: 2,
      delay: 0.5 + (index * 0.1)
    });

    const imgST = ScrollTrigger.create({
      ...scrollTriggerSettings,
      trigger: img,
    });
    triggers.push(imgST);
  });

  gsap.to(textRef.current.querySelectorAll('span'), {
    scrollTrigger: { ...scrollTriggerSettings, trigger: textRef.current },
    y: '0%',
    opacity: 1,
    ease: "power3.out",
    duration: 1,
    stagger: 0.05,
    delay: 0.5
  });

  const textST = ScrollTrigger.create({
    ...scrollTriggerSettings,
    trigger: textRef.current,
  });
  triggers.push(textST);

  gsap.fromTo(descriptionRef.current, {
    opacity: 0,
    y: 50,
  }, {
    opacity: 1,
    y: 0,
    scrollTrigger: { ...scrollTriggerSettings, trigger: descriptionRef.current },
  });

  const descriptionST = ScrollTrigger.create({
    ...scrollTriggerSettings,
    trigger: descriptionRef.current,
  });
  triggers.push(descriptionST);

  gsap.fromTo(learnRef.current, {
    opacity: 0,
  }, {
    opacity: 1,
    scrollTrigger: { ...scrollTriggerSettings, trigger: learnRef.current },
  });

  const learnST = ScrollTrigger.create({
    ...scrollTriggerSettings,
    trigger: learnRef.current,
  });
  triggers.push(learnST);

  return () => {
    triggers.forEach((st) => st.kill());
  };
}, [currentSet]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const imgWrapper = e.currentTarget;
      const { left, top, width, height } = imgWrapper.getBoundingClientRect();
      const x = (e.clientX - (left + width / 2)) / 10;  // Adjust the divisor for more/less movement
      const y = (e.clientY - (top + height / 2)) / 10;  // Adjust the divisor for more/less movement

      gsap.to(imgWrapper, {
        x: -x,  // Inverting the direction for a more natural effect
        y: -y,
        ease: "power3.out",
        duration: 0.6,
      });
    };

    const imageWrappers = containerRef.current.querySelectorAll('.' + styles.imagewrapper);
    imageWrappers.forEach((imgWrapper) => {
      imgWrapper.addEventListener('mousemove', handleMouseMove);
    });

    return () => {
      imageWrappers.forEach((imgWrapper) => {
        imgWrapper.removeEventListener('mousemove', handleMouseMove);
      });
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const container = containerRef.current;
      const { left, top, width, height } = container.getBoundingClientRect();

      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const offsetX = (mouseX - centerX) / 10;  // Adjust the divisor for more/less movement
      const offsetY = (mouseY - centerY) / 10;  // Adjust the divisor for more/less movement

      const imageWrappers = container.querySelectorAll('.' + styles.imagewrapper);
      imageWrappers.forEach((imgWrapper) => {
        const depth = parseFloat(imgWrapper.getAttribute('data-depth') || 1);
        gsap.to(imgWrapper, {
          x: -offsetX * depth,
          y: -offsetY * depth,
          ease: "power3.out",
          duration: 0.6,
        });
      });
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const calculateDepth = (index) => {
    return 0.1 + Math.random() * 0.9; // Returns a random value between 0.1 and 1.0
  };



  const phraseRef = useRef(null);

  useEffect(() => {
    const phraseElement = phraseRef.current;
    const words = ["Strike", "Awe."];

    // Replace the innerText with individual spans for each letter
    phraseElement.innerHTML = words.map(word => {
      const letters = Array.from(word);
      return `<span class="${styles.word}">${letters.map((letter, index) => `<span class="${styles.letter}" data-original="${letter}">${getRandomChar()}</span>`).join('')}</span>`;
    }).join('');

    const letterElements = Array.from(phraseElement.querySelectorAll(`.${styles.letter}`));

    // Animate the random letters to their original letters
    letterElements.forEach((el, index) => {
      setTimeout(() => {
        el.innerText = el.getAttribute('data-original');
      }, index * 100);
    });
  }, []);

  // Function to get a random character
  const getRandomChar = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return chars.charAt(Math.floor(Math.random() * chars.length));
  };

return (
  <>


<div  class={styles.introSectionPlaceholder}></div>

<div className={styles.introSection}>
    <Image src="/images/logo-dark.svg" className={styles.introLogo} alt="logo" width={77} height={128} />
    <h1>Savvy <span className={styles.cobra}> Cobra</span></h1>

    <strong ref={phraseRef} className={styles.introText}>Strike Awe.</strong>
    <p>We craft iconic brands and innovative web solutions, propelling businesses to make a lasting impact!</p>
  <div className={styles.arrow}>
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 10L12 17L19 10H5Z" fill="#000000"/>
    </svg>    </div>
  </div>
  <div>

    <main ref={containerRef} className={styles.carouselContainer}>
      <a className={styles.calendly} target="_blank" href="https://calendly.com/savvycobra/free-30-min-consultation">Book a Free Call</a>
      <div  className={styles.carousel}>

      <div className={styles.left}>
    {CarouselData[currentSet]?.map((img, index) => (
      <div  key={index} className={styles.imageContainer}>
          <CustomHover hoverName={img.hoverName}>
        <div className={styles.imagewrapper} data-depth={calculateDepth(index)}>
          <Link href={img.link}>
            <Image
              placeholder='blur'
              blurDataURL='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOU3z+pHgAEZgHxedgNVQAAAABJRU5ErkJggg=='
              fill
              sizes='100vw, (min-width: 768px) 350vw, (min-width: 1200px) 20vw'
              src={img.image}
              alt={img.hoverName}
              style={{  objectFit: 'cover', opacity: 0 }} // Initial size
              className={styles.heroimage}
              ref={(el) => (imagesRef.current[index] = el)}
            />
          </Link>
        </div>
          </CustomHover>
      </div>
    ))}

  </div>
        <div className={styles.right}>
            <p ref={staticTextRef} className={styles.statictext}>Channeling the essence of Savvy Cobra, we guide businesses towards excellence with:</p>
            <div className={styles.progresscircles}>
          {CarouselData.map((_, index) => {
          const circleDynamicName = index === currentSet ? 'filled' : '';
          const circleClassName = `${styles.circle} ${styles[circleDynamicName]}`;
          return <div onClick={() => setCurrentSet(index)} key={index} className={circleClassName}></div>
          })}
        </div>
        <div className={styles.buttons}>
            <button className={styles.mobileonly} onClick={() => setCurrentSet(prev => Math.max(0, prev - 1))}>&#x27A4;</button>
            <button className={styles.mobileonly} onClick={() => setCurrentSet(prev => Math.min(CarouselData.length - 1, prev + 1))}>&#x27A4;</button>
        </div>
            <div ref={textRef} className={styles.textelement}>
              <span className={styles.number}>{texts[currentSet]?.order}</span>
              <h2 className={styles.heading} data-text={texts[currentSet]?.title}>
                {texts[currentSet]?.title.split('').map((char, index) => (
                  <span className={styles.characters} key={index}>{char}</span>
                ))}
                <span className={styles.titleSmall}><br/>{texts[currentSet]?.titleSmall}</span>
              </h2>
              <p ref={descriptionRef} className={styles.description}>{texts[currentSet]?.sub}</p>
              <a ref={learnRef} className={styles.learn} href={texts[currentSet]?.link}>See More</a>
            </div>
            <div className={styles.hoverIcon}>
        <svg viewBox="0 0 60 80" className={styles.mouseIcon}> {/* Adjusted viewBox */}
          <rect x="10" y="10" rx="20" ry="20" width="40" height="60" fill="none" stroke="#fff" strokeWidth="2" /> {/* Adjusted width, fill, stroke, and strokeWidth */}
          <line x1="30" y1="20" x2="30" y2="35" stroke="#fff" strokeWidth="2" className={styles.scrollWheel} /> {/* Adjusted x1, x2, and stroke */}
        </svg>
      </div>
        </div>
      </div>
    </main>
  </div>
  </>

  );

  // ... (rest of the code)

};

export default ArtisticImages;






