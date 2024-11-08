import React, { useState } from "react";
import axios from "axios";
console.log("Current Environment: ", process.env.NODE_ENV);

const showApiUrl = process.env.REACT_APP_SHOWS_API_URL;
console.log(showApiUrl);

function GigForm({ setShowGigForm }) {
  const [gig, setGig] = useState({
    imageUrl: String,
    title: "",
    location: "",
    price: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setGig({ ...gig, imageFile: files[0] });
    } else {
      setGig({ ...gig, [name]: value });
    }
  };

  const handleClose = () => {
    setShowGigForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(gig);

    const formData = new FormData();
    formData.append("imageUrl", gig.imageUrl);
    formData.append("title", gig.title);
    formData.append("location", gig.location);
    formData.append("price", gig.price);
    formData.append("date", gig.date);
    formData.append("description", gig.description);

    try {
      const response = await axios.post(
        `${showApiUrl}`,
        formData
      );
      console.log("Success", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="gigForm">
        <input
          className="gigInput"
          type="file"
          name="imageFile"
          onChange={handleChange}
          placeholder="Upload an Image"
          accept="image/*"
        />
        <input
          className="gigInput"
          type="text"
          name="title"
          value={gig.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />

        <input
          className="gigInput"
          type="text"
          name="location"
          value={gig.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />

        <input
          className="gigInput"
          type="number"
          name="price"
          value={gig.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />

        <input
          className="gigInput"
          type="datetime-local"
          name="date"
          value={gig.date}
          onChange={handleChange}
          required
        />

        <input
          className="gigInput"
          type="text"
          name="image"
          value={gig.image}
          onChange={handleChange}
          placeholder="Image URL"
        />

        <input
          className="gigInput"
          type="text"
          name="description"
          value={gig.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit" onClick={handleSubmit}>
          Add Gig
        </button>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </form>
    </>
  );
}

export default GigForm;
