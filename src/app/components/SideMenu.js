'use client'

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faXTwitter, faLinkedin, faPinterest, faBehance, faDribbble } from "@fortawesome/free-brands-svg-icons";
import styles from "./SideMenu.module.css";
import Image from "next/image";
import gsap from "gsap";
import Link from "next/link";

  const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuClassDynamic = isOpen ? 'open' : '';
    const menuClassName = `${styles.menu} ${styles[menuClassDynamic]}`;
    const hamburgerClassDynamic = isOpen ? 'open' : '';
    const hamburgerClassName = `${styles.hamburger} ${styles[hamburgerClassDynamic]}`;
    
    const handleLinkClick = () => {
      setIsOpen(false); // Close the menu when a link is clicked
    };
    
    return (
      <div>
        <div id="menu" className={menuClassName}>
  
          <ul className={styles.menulist}>
            <li>    <span className={styles.dot}></span>
              <Link onClick={handleLinkClick} href="/">Home</Link></li>
            <li className={styles.submenuContainer}>
                  <span className={styles.dot}></span>
                  <Link onClick={handleLinkClick} href="/">Expertise</Link>
              <ul className={styles.submenu}>
                <li><Link onClick={handleLinkClick} href="/logoBranding">Branding & Identity Design</Link></li>
                {/* <li><Link onClick={handleLinkClick}href="/WebDesign">Web & Interactive Design</Link></li> */}
                <li><Link onClick={handleLinkClick}href="/Advertising">Advertising Design</Link></li>
                <li><Link onClick={handleLinkClick}href="/GraphicDesign">Graphic Design</Link></li>
                {/* <li><Link onClick={handleLinkClick} href="/EastBridge">EastBridge Program</Link></li> */}
              </ul>
            </li>
            {/* <li>    <span className={styles.dot}></span>
              <Link onClick={handleLinkClick} href="/blog">Blog</Link></li>
            <li>    <span className={styles.dot}></span>
              <Link onClick={handleLinkClick} href="/quiz">Quiz</Link></li> */}
            <li>    <span className={styles.dot}></span>
              <Link onClick={handleLinkClick} href="/about">About</Link></li>
            <li>    <span className={styles.dot}></span>
              <Link onClick={handleLinkClick} href="/contact">Contact</Link></li>
            {/* ... other pages ... */}
          </ul>
  
          <div className={styles.socialicons}>
          <a href="https://www.facebook.com/savvycobra/" target="_blank" className="fa fa-facebook"><FontAwesomeIcon icon={faFacebook}/></a>
            <a href="https://www.instagram.com/savvycobracreative/" target="_blank" className="fa fa-instagram"><FontAwesomeIcon icon={faInstagram}/></a>
            <a href="https://twitter.com/savvycobra" target="_blank" className="fa fa-x-twitter"><FontAwesomeIcon icon={faXTwitter}/></a>
            <a href="https://www.linkedin.com/company/savvycobra/" target="_blank" className="fa fa-linkedin"><FontAwesomeIcon icon={faLinkedin}/></a>
            <a href="https://www.pinterest.ca/savvycobra/" target="_blank" className="fa fa-pinterest"><FontAwesomeIcon icon={faPinterest}/></a>
            <a href="https://www.behance.net/savvycobra" target="_blank" className="fa fa-behance"><FontAwesomeIcon icon={faBehance}/></a>
            <a href="https://dribbble.com/savvycobra" target="_blank" className="fa fa-dribbble"><FontAwesomeIcon icon={faDribbble}/></a>
          </div>
          <a className={styles.calendly}target="_blank" href="https://calendly.com/savvycobra/free-30-min-consultation">Book a Free Call</a>

        </div>
  
        <button className={hamburgerClassName} onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
          </button>
        </div>
    );
}

export default SideMenu;



