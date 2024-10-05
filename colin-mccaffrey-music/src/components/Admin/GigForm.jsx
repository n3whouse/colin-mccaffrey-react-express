import React, { useState } from 'react'

function GigForm() {
   const [gig, setGig] = useState({
    date: '',
    venue: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGig({ ...gig, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(gig);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="gigForm">
        <input type="date"
          name="date"
          value={gig.date}
          onChange={handleChange}
          placeholder="Date"
          required
        />
        <input type="text"
          name="venue"
          value={gig.venue}
          onChange="handleChange"
          placeholder="Venue"
          required
        />
        <input type="text"
          name="description"
          value={gig.description}
          onChange={handleChange}
          placeholder="description"
          required
        />
        <button type="submit">Add Gig</button>
      </form>
    </>
  )
}

export default GigForm