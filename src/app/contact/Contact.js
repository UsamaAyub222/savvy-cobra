'use client'
import React, { useState, useEffect} from 'react';

import { useForm, ValidationError } from '@formspree/react';
import CopyButton from '../components/CopyButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faXTwitter, faLinkedin, faPinterest, faBehance, faDribbble } from "@fortawesome/free-brands-svg-icons";
import Styles from './Contact.module.css'
import gsap from 'gsap';

export default function ContactPage() {
    const [state, handleSubmit] = useForm("xrgwooqo");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    location: '',
    email: '',
    message: '',
    referral: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validation logic
    if (!value) {
      setFormErrors({
        ...formErrors,
        [name]: 'This field is required'
      });
    } else {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const isFormValid = () => {
    return Object.values(formErrors).every(x => x === '') && Object.values(formData).every(x => x !== '');
  };


  useEffect(() => {
    // Stagger animation for children of form elements using fromTo
    gsap.fromTo(".form-element > *", 
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 1.5, ease: "power1.out" }
    );

    // Animation for the sidebar using fromTo
    gsap.fromTo(".sidebar-element", 
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1.5, ease: "power1.out" }
    );
  }, []);


  return (
    <main className={Styles.bg}>
        {state.succeeded ? (
        <p className={Styles.thanks}>Thank you! I will be in touch shortly.</p>
      ) : (
      <form className={`${Styles.form} form-element`} onSubmit={handleSubmit}>
  <h1 className={Styles.contactTitle}>Contact</h1>

  <label htmlFor="firstName">First Name</label>
  <input
    id="firstName"
    type="text"
    name="firstName"
    value={formData.firstName}
    onChange={handleChange}
  />
  {formErrors.firstName && <span className={Styles.error}>{formErrors.firstName}</span>}

  <label htmlFor="lastName">Last Name</label>
  <input
    id="lastName"
    type="text"
    name="lastName"
    value={formData.lastName}
    onChange={handleChange}
  />
  {formErrors.lastName && <span className={Styles.error}>{formErrors.lastName}</span>}

  <label htmlFor="location">Location</label>
  <input
    id="location"
    type="text"
    name="location"
    value={formData.location}
    onChange={handleChange}
  />
  {formErrors.location && <span className={Styles.error}>{formErrors.location}</span>}

  <label htmlFor="email">Email Address</label>
  <input
    id="email"
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
  />
  {formErrors.email && <span className={Styles.error}>{formErrors.email}</span>}

  <label htmlFor="message">How Can We Help You?</label>
  <textarea
    id="message"
    name="message"
    value={formData.message}
    onChange={handleChange}
  />
  {formErrors.message && <span className={Styles.error}>{formErrors.message}</span>}

  <label htmlFor="referral">How Did You Hear About Us?</label>
  <select
    id="referral"
    name="referral"
    value={formData.referral}
    onChange={handleChange}
  >
    <option disabled value="">Choose…</option>
          <option value="google">Google Search</option>
          <option value="inperson">In person</option>
          <option value="referral">Referral</option>
          <option value="word">Word of mouth</option>
          <option value="fb">Facebook</option>
          <option value="ig">Instagram</option>
          <option value="x">Twitter/ X</option>
          <option value="in">LinkedIn</option>
          <option value="pin">Pinterest</option>
          <option value="be">Behance</option>
          <option value="dribbble">Dribbble</option>
          <option value="other">Other</option>
  </select>
  {formErrors.referral && <span className={Styles.error}>{formErrors.referral}</span>}

  <button type="submit" disabled={state.submitting || !isFormValid()}>
    Send
  </button>
</form>
      )}
      <div className={`${Styles.sidebar} sidebar-element`}>
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
        <div className={Styles.socialicons}>
        <a href="https://www.facebook.com/savvycobra/" target="_blank" className="fa fa-facebook"><FontAwesomeIcon icon={faFacebook}/></a>
            <a href="https://www.instagram.com/savvycobrastudio" target="_blank" className="fa fa-instagram"><FontAwesomeIcon icon={faInstagram}/></a>
            <a href="https://twitter.com/savvycobra" target="_blank" className="fa fa-x-twitter"><FontAwesomeIcon icon={faXTwitter}/></a>
            <a href="https://www.linkedin.com/company/savvycobra/" target="_blank" className="fa fa-linkedin"><FontAwesomeIcon icon={faLinkedin}/></a>
            <a href="https://www.pinterest.ca/savvycobra/" target="_blank" className="fa fa-pinterest"><FontAwesomeIcon icon={faPinterest}/></a>
            <a href="https://www.behance.net/savvycobra" target="_blank" className="fa fa-behance"><FontAwesomeIcon icon={faBehance}/></a>
            <a href="https://dribbble.com/savvycobra" target="_blank" className="fa fa-dribbble"><FontAwesomeIcon icon={faDribbble}/></a>

        </div>
      </div>
    </main>
  );
}

