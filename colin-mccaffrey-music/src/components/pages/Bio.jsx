import React, { useState, useEffect } from 'react';
import '../../components/styles/Bio.css';
import { client } from '../../sanity/client';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

const Bio = () => {
  const [bio, setBio] = useState('');
  const [bioPic, setBioPic] = useState(null); // Initialize as null

  function urlFor(source) {
    return builder.image(source);
  }

  useEffect(() => {
    const fetchBioAndBioPic = async () => {
      try {
        const data = await client.fetch(`*[_type == 'siteSettings'][0]`);
        setBio(data.bio);

        // Check if the profilePicture exists and set the image object
        if (data.profilePicture) {
          setBioPic(data.profilePicture); // Set the entire object, not just the URL
        }
      } catch (error) {
        console.error({ message: 'bio fetch failed', error });
      }
    };

    fetchBioAndBioPic();
  }, []);

  return (
    <>
      <div className="bioContainer">
        <div className="bio-text">
      {bioPic && (
    <img
          src={urlFor(bioPic).url()}
          className="portrait"
          alt="Headshot of Colin smiling while holding his electric guitar"
          />
        )}
        <PortableText value={bio} />
        </div>

      </div>
    
        

    </>
  );
};

export default Bio;