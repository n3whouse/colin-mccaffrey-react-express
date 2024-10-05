import React from 'react'
import BioPic from '../assets/ColinCouchFiddle.jpg';
import '../styles/Home.css';
function Bio() {
  return (
    <>
      <img className="portrait" src={BioPic} alt="Headshot of Colin smiling while holding his electric guitar" />
      <p>
        Colin McCaffrey is a native Vermonter, songwriter, multi-instrumentalist and award-winning record producer who has worked on hundreds of regional recordings and live productions. Lending his smooth voice and string wizardry to the best music coming out of these hills, Colin McCaffrey is what the Burlington Free Press calls "A Green Mountain treasure worth unearthing."
      </p>
      <p>
        Colin was born just after the full moon on September 7th in Brattleboro, Vermont and raised on a small organic farm nestled in the Connecticut River Valley as the second of four children. He began playing piano, guitar, and violin at a young age; performing music with his family throughout Vermont and New Hampshire.
      </p>
      <p>
        He has successfully combined his talents as a teacher, engineer, songwriter, and producer to become a regional “one-stop-shop” for high quality audio production. He has scored works for documentary and feature films, commercials, dance productions, choral groups, sacred and children’s music, and audio books/journals.
      </p>
      <p>
        After graduating from Kimball Union Academy in 1986, Colin went on to complete a BA in music composition at Berklee College of Music in Boston. He moved back to central Vermont after finishing with honors in 1990. Nowadays, he stays busy as a multi-disciplinary jack-of-all-trades. Colin lives beside the picturesque Winooski River in East Montpelier, Vermont with his wife, author Laura Williams McCaffrey, his daughters Cerridwyn and Magdalene, their dog Gwendolyn, and their cat Loki. He loves - in his precious spare time - to fish, hunt, gather, sketch and paint.
      </p>
    </>
  )
}

export default Bio