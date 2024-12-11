import React, { useState, useEffect } from "react";
import { client } from "../../sanity/client";
import {
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaInstagramSquare,
} from "react-icons/fa";
import "../../App.css";
import DocumentMeta from "react-document-meta";

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

  const meta = {
    title: "Colin McCaffrey: Booking & Contact",
    description:
      "Contact and booking information for Vermont singer-songwriter Colin McCaffrey",
    canonical: "https://colinmccaffrey.com/booking",
    meta: {
      charSet: "utf-8",
      name: {
        keywords: "Colin, McCaffrey, engineer, producer, booking, contact",
      },
      property: {
        "og:title": "Colin McCaffrey: Booking & Contact",
        "og:description":
          "Contact and booking information for Vermont singer-songwriter Colin McCaffrey",
        "og:type": "website",
        "og:url": "https://colinmccaffrey.com/booking",
      },
    },
  };

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
    <DocumentMeta {...meta}>
      <div className="contactInfo">
        <h2>Contact Information</h2>
        {contactInfo.email && (
          <p className="contactDetails">
            <span className="contactDetailHeader">Email:</span>
            {contactInfo.email}
          </p>
        )}
        {contactInfo.phone && (
          <p className="contactDetails">
            <span className="contactDetailHeader">Phone:</span>
            {contactInfo.phone}
          </p>
        )}
        {contactInfo.address && (
          <p className="contactDetails">
            <span className="contactDetailHeader">Address:</span>
            {contactInfo.address}
          </p>
        )}

        <hr />
        {contactInfo.socialLinks && (
          <div id="socialLinks">
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
            {contactInfo.socialLinks.instagram && (
              <a
                href={contactInfo.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagramSquare size={50} />
              </a>
            )}
          </div>
        )}
      </div>
    </DocumentMeta>
  );
}

export default BookingAndContact;
