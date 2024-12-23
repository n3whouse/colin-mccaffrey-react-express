import React, {useEffect} from 'react'
import {client} from '../../../src/sanity/client.js'
import {useDocumentOperation} from '@sanity/react-hooks'

const DynamicPanelName = ({documentId, fieldName, linkNameKey}) => {
  const {patch} = useDocumentOperation(documentId, 'producer')

  useEffect(() => {
    const fetchLinkNames = async () => {
      const data = await client.fetch(`*[_type == 'siteSettings'][0]{linkNames}`)
      if (data && data.linkNames) {
        const newPanelName = data.linkNames[linkNameKey] || 'Default Name' // Fallback if not found
        // Update the document field dynamically
        patch.execute([{set: {[fieldName]: newPanelName}}])
      }
    }
    fetchLinkNames()
  }, [documentId, fieldName, linkNameKey, patch])

  return null // No UI needed, just updating the document
}

export default DynamicPanelName
