import React, { useState } from "react";
import axios from "axios";


function ReleaseForm({ setShowReleaseForm }) {
  const [release, setRelease] = useState({
    imageFile: null,
    imageUrl: "",
    title: "",
    description: "",
    purchaseLink: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
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
    formData.append("imageFile", release.imageFile);
    formData.append("imageUrl", release.imageUrl);
    formData.append("title", release.title);
    formData.append("description", release.description);
    formData.append("purchaseLink", release.purchaseLink);
    // Object.entries(release).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_RELEASES_URL}`,
        formData
      );

      console.log("Success", response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const albumCover = release.imageFile
    ? URL.createObjectURL(release.imageFile)
    : null;

  return (
    <>
      <form onSubmit={handleSubmit} className="releaseForm">
        <input
          className="releaseInput"
          type="file"
          name="imageFile"
          onChange={handleChange}
          placeholder="Upload an Image"
          accept="image/*"
        />
        {albumCover && (
          <img
            src={albumCover}
            alt={release.title}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        )}
        <input
          className="releaseInput"
          type="text"
          name="imageUrl"
          value={release.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
        />

        <input
          className="releaseInput"
          type="text"
          name="title"
          value={release.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />

        <input
          className="releaseInput"
          type="text"
          name="description"
          value={release.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />

        <input
          className="releaseInput"
          type="text"
          name="purchaseLink"
          value={release.purchaseLink}
          onChange={handleChange}
          placeholder="Purchase Link"
        />

        <button type="submit">Add Release</button>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </form>
    </>
  );
}

export default ReleaseForm;
