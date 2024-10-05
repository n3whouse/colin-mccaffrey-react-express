import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Studio from './Studio';
import '../../../styles/Home.css';
import Credits from './Credits';
import GearAndPrograms from './GearAndPrograms';
function EngineerSubNav() {

  const [activeMenuItem, setActiveMenuItem] = useState("studio");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveMenuItem(item);
    setSelectedItem(item);
  }
  return (
    <div className="engineer subnav">
      <h2><Link to="#" className={`component ${selectedItem === 'studio' ? 'bold' : 'faded'}`} onClick={() => handleItemClick("studio")
      }>STUDIO</Link> |
        <Link to="#" className={`component ${selectedItem === "gear and programs" ? 'bold' : 'faded'}`} onClick={() => handleItemClick("gear and programs")}> GEAR & PROGRAMS</Link> |
        <Link to="#" className={`component ${selectedItem === "credits" ? 'bold' : 'faded'}`} onClick={() => handleItemClick("credits")}> CREDITS</Link></h2>

      {activeMenuItem === "studio" && <Studio />}
      {activeMenuItem === "gear and programs" && <GearAndPrograms />}
      {activeMenuItem === "credits" && <Credits />}
    </div>
  )
}

export default EngineerSubNav