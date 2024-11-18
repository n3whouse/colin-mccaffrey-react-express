import React, { useState, useEffect } from 'react';
import client from '../../sanity/client';
import { FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa';
import '../../App.css';

function BookingAndContact() {
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    address: '',
    socialLinks: {
      facebook: '',
      youtube: '',
      linkedin: '',
    },
  });

  useEffect(() => {

  const fetchContactInfo = async () => {
    
    const data = await client.fetch(`*[_type == 'siteSettings'][0]{
    email,
    phone,
    address,
    bookingAndContactInfo->{
      email,
      phone,
      address,
      socialLinks
    }
  }`);

  console.log(data); // Log the fetched data to see its structure

  setContactInfo({
    email: data.bookingAndContactInfo?.email || '', // Use optional chaining and default value
    phone: data.bookingAndContactInfo?.phone || '',
    address: data.bookingAndContactInfo?.address || '',
    socialLinks: data.bookingAndContactInfo?.socialLinks || {},
  });
};
    fetchContactInfo();
  }, []);

  return (
    <>
    
      <h2>Contact Information</h2>
    <div className="contactInfo">
        <p className="contactDetails">
          <strong>Email:</strong>
          <br />
          {contactInfo.email}</p>
        <p className="contactDetails"><strong>Phone:</strong>
          <br />{contactInfo.phone}</p>
        {contactInfo.address && <p className="contactDetails"><strong>Address:</strong>
          <br />{contactInfo.address}</p>}
      </div>
      <hr />
      {contactInfo.socialLinks && (
          <div className="socialLinks">
            {contactInfo.socialLinks.facebook && (
              <a href={contactInfo.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook size={50} /></a>
            )}
            {contactInfo.socialLinks.youtube && (
              <a href={contactInfo.socialLinks.youtube} target="_blank" rel="noopener noreferrer"><FaYoutube size={50}/></a>
            )}
            {contactInfo.socialLinks.linkedin && (
              <a href={contactInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin size={50}/></a>
            )}
          </div>
      )}
      </>
  );
}

export default BookingAndContact;