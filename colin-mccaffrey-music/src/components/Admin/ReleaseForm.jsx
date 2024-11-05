import React, { useState } from 'react'
import axios from 'axios';


function ReleaseForm({ setShowReleaseForm }) {
  
  const [release, setRelease] = useState({
    imageUrl: String,
    title: '',
    location: '',
    description: '',
    imageFile: null,
  });
  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setRelease({ ...release, imageFile: files[0] });
    } else {
      setRelease({ ...release, [name]: value });
    }
  };

    const handleClose = () => {
      setShowReleaseForm(false);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const formData = new FormData();
      formData.append('imageFile', release.imageFile);
      formData.append('imageUrl', release.imageUrl);
      formData.append('title', release.title);
      formData.append('description', release.description);
      formData.append('purchaseLink', release.purchaseLink);

      try {
        const response = await axios.post(`${process.env.REACT_APP_RELEASES_API_URL}`, formData);
    
        console.log("Success", response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    }
    return (
      <>
        <form onSubmit={handleSubmit} className="releaseForm">

          <input className="releaseInput" type="file"
            name="imageFile"
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

          <button type="submit" onClick={handleSubmit}>Add Release</button>
          <button type="button" onClick={handleClose}>Close</button>
        </form>
      </>
    )
  }

  export default ReleaseForm;