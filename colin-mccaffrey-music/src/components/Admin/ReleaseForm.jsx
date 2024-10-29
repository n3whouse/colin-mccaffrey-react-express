import React, { useState } from 'react'
import axios from 'axios';

/* 
⁡⁢⁣⁣Right now, the submit button is firing off the error message "Error creating release:" and I'm not sure why. We will try again tomorrow.⁡

*/

function ReleaseForm({ setShowReleaseForm }) {
  
  const [release, setRelease] = useState({
    
    coverFile: null,
    imageUrl: '',
    title: '',
    location: '',
    description: ''
  });
  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setRelease({ ...release, imageFile: files[0] });
    } else {
      setRelease({ ...release, [name]: value });
    }
  }

  const addRelease = (newRelease) => {
    setRelease([...release, newRelease]);
  }

    const handleClose = () => {
      setShowReleaseForm(false);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('coverFile', release.coverFile);
      formData.append('imageUrl', release.imageUrl);
      formData.append('title', release.title);
      formData.append('description', release.description);
      formData.append('purchaseLink', release.purchaseLink);

      try {
        const response = await axios.post(`${process.env.RELEASES_API_URL}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      
        addRelease(response.data);
          handleClose()
      } catch (error) {
        alert("Error creating release:", error);
      }
    }
    return (
      <>
        <form onSubmit={handleSubmit} className="releaseForm">

          <input className="releaseInput" type="file"
            name="coverFile"
            onChange={handleChange}
            placeholder="Upload an Image"
            accept="image/*"
          />
          <input className="releaseInput" type="text"
            name="imageUrl"
            value={release.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
          />

          <input className="releaseInput" type="text"
            name="title"
            value={release.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />

          <input className="releaseInput" type="text"
            name="description"
            value={release.price}
            onChange={handleChange}
            placeholder="Description"
            required
          />

          <input className="releaseInput" type="text"
            name="purchaseLink"
            value={release.date}
            onChange={handleChange}
            placeholder="Purchase Link"
          />

          <button type="submit" onClick={() => setShowReleaseForm(true)}>Add Release</button>
          <button type="button" onClick={handleClose}>Close</button>
        </form>
      </>
    )
  }

  export default ReleaseForm;