import React from 'react'

export const SiteInfo = () => {
  return (
    <div style={{padding: '20px', background: '#2a2d3f', borderRadius: '8px'}}>
      <p>
        <h1>Site Settings</h1>
        <br />
        Here you can control the global site settings, including front page image, names of main
        links and any applicable sublinks (case-sensitive) -- as well as the bio image and text, and
        booking and contact information. On all changes, make sure to hit publish before closing
        out.
        <br />
        <br />
        If any changes are not showing up, be sure to check if the document is up to date (Publish
        grayed out).
      </p>
    </div>
  )
}
