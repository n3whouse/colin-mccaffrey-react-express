import React, {useEffect, useState} from 'react'
import {client} from '../../../src/sanity/client.js'

const DynamicPanelName = ({documentId}) => {
  const [panelName, setPanelName] = useState('')

  useEffect(() => {
    const fetchLinkNames = async () => {
      const data = await client.fetch(`*[_type == 'siteSettings']{linkNames}[0]`)
      if (data && data.linkNames) {
        setPanelName(data.linkNames.navigationLinks.linkOne)
        setPanelName(data.linkNames.navigationLinks.linkTwo)
        setPanelName(data.linkNames.navigationLinks.linkThree)
        setPanelName(data.linkNames.navigationLinks.linkFour)
        setPanelName(data.linkNames.navigationLinks.linkFive)
        setPanelName(data.linkNames.navigationLinks.linkSix)
      }
    }
    fetchLinkNames()
  }, [])

  return <div>{panelName}</div>
}

export default DynamicPanelName
