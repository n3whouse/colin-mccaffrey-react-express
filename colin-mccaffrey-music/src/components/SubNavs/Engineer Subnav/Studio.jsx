import React from 'react'
import GreenRoom from '../../../assets/Greenroom2.jpg';
function Studio() {
  return (
    <div className="studio info">
      <h1>THE GREENROOM</h1>
      <img className="greenRoom" src={GreenRoom} alt="Colin hanging out in the Green Room surrounded by music studio equipment" />
      <p><em>"Colin's music is steeped in a lifetime of knowledge and love for a number of great American musical traditions, and in his own musical adventures he shows keen respect for them without in the least being bound by them."</em>

        - Pete Sutherland </p>

      <p>
        Colin offers his services as a producer, engineer, session musician, publisher and co-writer with many of the artists he works with. Equipped at his home studio THE GREENROOM he has the tools, experience, and connections to make your music come to life at a price you can afford.</p>


      <p>
        Contact Colin with questions and quotes on anything from a simple one-song demo to a full-length feature album project. With more than three decades of experience on the stage and in the studio, Colin runs a one-stop shop for music production. His skills include everything from pre-production song refinement, chart writing and arranging, basic tracking, overdubbing, mixing, mastering and graphic design.
      </p>
    </div>
  )
}

export default Studio