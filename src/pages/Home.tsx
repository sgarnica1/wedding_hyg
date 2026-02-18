import { useParams } from 'react-router-dom'
import { GUESTS } from '../utils/guests'
import Hero from '../components/Hero'
import Countdown from '../components/Countdown'
import Invite from '../components/Invite'
import Itinerary from '../components/Itinerary'
import DressCodeGifts from '../components/DressCodeGifts'
import Map from '../components/Map'
import BackToTop from '../components/BackToTop'
import NotFound from './NotFound'
import MobileOnly from '../components/MobileOnly'

const Home = () => {

  const { id: name } = useParams()

  if (name && !(name in GUESTS))
    return (
      <NotFound />
    )

  return (
    <MobileOnly>
      <div>
        <Hero />
        <Countdown />
        <Itinerary />
        <DressCodeGifts />
        <Invite />
        <Map />
        <BackToTop />
      </div>
    </MobileOnly>
  )
}

export default Home