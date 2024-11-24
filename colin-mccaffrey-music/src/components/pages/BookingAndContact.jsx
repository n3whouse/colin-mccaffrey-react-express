import React, { useState, useEffect } from "react";
import { client } from "../../sanity/client";
import { FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";
import "../../App.css";

function BookingAndContact() {
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    address: "",
    socialLinks: {
      facebook: "",
      youtube: "",
      linkedin: "",
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

      console.log(data);

      setContactInfo({
        email: data.bookingAndContactInfo?.email || "",
        phone: data.bookingAndContactInfo?.phone || "",
        address: data.bookingAndContactInfo?.address || "",
        socialLinks: data.bookingAndContactInfo?.socialLinks || {},
      });
    };
    fetchContactInfo();
  }, []);

  return (
    <>
      <h2>Contact Information</h2>
      <div className="contactInfo">
        {contactInfo.email && (
          <p className="contactDetails">
            <p className="contactDetailHeader">Email:</p>
            {contactInfo.email}
          </p>
        )}
        {contactInfo.phone && (
          <p className="contactDetails">
            <p className="contactDetailHeader">Phone:</p>
            {contactInfo.phone}
          </p>
        )}
        {contactInfo.address && (
          <p className="contactDetails">
            <p className="contactDetailHeader">Address:</p>
            {contactInfo.address}
          </p>
        )}
      </div>

      <hr />
      {contactInfo.socialLinks && (
        <div className="socialLinks">
          {contactInfo.socialLinks.facebook && (
            <a
              href={contactInfo.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={50} />
            </a>
          )}
          {contactInfo.socialLinks.youtube && (
            <a
              href={contactInfo.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={50} />
            </a>
          )}
          {contactInfo.socialLinks.linkedin && (
            <a
              href={contactInfo.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={50} />
            </a>
          )}
        </div>
      )}
    </>
  );
}

export default BookingAndContact;
