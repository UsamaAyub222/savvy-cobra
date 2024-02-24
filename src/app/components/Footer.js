'use client'

import Styles from './Footer.module.css';
import CopyButton from './CopyButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faXTwitter, faLinkedin, faPinterest, faBehance, faDribbble } from "@fortawesome/free-brands-svg-icons";
import Link from 'next/link';
import { useForm, ValidationError } from '@formspree/react';
import NextPageLink from './NextPageLink';

export default function Footer() {
  const [state, handleSubmit] = useForm("mqkvlbyy");
  console.log(<NextPageLink></NextPageLink>)
  return (
    <footer>
      <div className={Styles.footerContainer}>
        <div className={Styles.link}>
          <span>&rarr; Next up: </span>
          <NextPageLink></NextPageLink>
        </div>
          <strong>Let's Rewrite the Rules of Creative Strategy Together</strong>
        <div className={Styles.footerContent}>
          <div className={Styles.Newsletter}>
          {state.succeeded ? (
            <p>Thanks for joining!</p>
            ) : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="email"> 
                Subscribe to our newsletter
              </label>
              <input
                id="email"
                type="email" 
                name="email"
                placeholder='Enter email address'
              />
              <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
              />
              <button type="submit" disabled={state.submitting}>
              &rarr;
              </button>
            </form>)}
          </div>
          <div className={Styles.contact}>
            <p>Contact Us (we don't bite)</p>
            <div className={Styles.email}>
              <a href="mailto:hi@savvycobra.com">hi@savvycobra.com</a>
              <CopyButton textToCopy="hi@savvycobra.com" />
            </div>
            <div className={Styles.phone}>
              <a href="tel:+15144766190">+1(514)476-6190</a>
              <CopyButton textToCopy="+15144766190" />
            </div>
            <p>Ottawa, ON</p>
          </div>
        </div>
        <div className={Styles.footerBottom}>
          <div className={Styles.socialicons}>
          <a href="https://www.facebook.com/savvycobra/" target="_blank" className="fa fa-facebook"><FontAwesomeIcon icon={faFacebook}/></a>
            <a href="https://www.instagram.com/savvycobracreative/" target="_blank" className="fa fa-instagram"><FontAwesomeIcon icon={faInstagram}/></a>
            <a href="https://twitter.com/savvycobra" target="_blank" className="fa fa-x-twitter"><FontAwesomeIcon icon={faXTwitter}/></a>
            <a href="https://www.linkedin.com/company/savvycobra/" target="_blank" className="fa fa-linkedin"><FontAwesomeIcon icon={faLinkedin}/></a>
            <a href="https://www.pinterest.ca/savvycobra/" target="_blank" className="fa fa-pinterest"><FontAwesomeIcon icon={faPinterest}/></a>
            <a href="https://www.behance.net/savvycobra" target="_blank" className="fa fa-behance"><FontAwesomeIcon icon={faBehance}/></a>
            <a href="https://dribbble.com/savvycobra" target="_blank" className="fa fa-dribbble"><FontAwesomeIcon icon={faDribbble}/></a>

            </div>
          <div className={Styles.footerLogo}>
            <img src="/images/logo.svg" alt="Savvy Cobra Logo" />
          </div>
          <small>© Savvy Cobra 2023</small>
        </div>
      </div>
    </footer>
  );
}