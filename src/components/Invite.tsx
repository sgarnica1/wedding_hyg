import { useParams, Link } from 'react-router-dom'
import { GUESTS } from '../utils/guests'
import { FamilyType, GuestsType } from '../utils/types'
import InviteBg from '../assets/images/invite_bg.png'

const Invite = () => {
  const { id: familyKey } = useParams()
  const guests = GUESTS as GuestsType;

  if (!familyKey) return <></>

  const family: FamilyType = guests[familyKey]
  const familyMembers = family.members || []
  const familyName = family.name || ''

  if (!familyName || familyMembers.length === 0) {
    return <></>
  }

  return (
    <section className='flex flex-col items-center justify-center h-[750px] px-4 mx-auto bg-accent'>
      <div
        className='flex flex-col justify-between items-center w-[90%] max-w-[500px] pt-20 pb-6 px-6 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${InviteBg})`,
          borderRadius: '50% 50% 0 0 / 30% 30% 0 0',
          minHeight: '400px'
        }}
      >
        <p className='text-accent font-primary text-sm md:text-base mb-4 text-center font-semibold uppercase'>
          Nos complace invitarlos a celebrar con nosotros
        </p>
        <h2 className='text-accent font-primary text-4xl sm:text-5xl font-light leading-[0.9] mb-6 text-center uppercase'>{familyName}</h2>
        <Link
          to={`/rsvp/${familyKey}`}
          className="flex justify-center items-center font-secondary text-white bg-accent text-sm md:text-base py-3 px-6 rounded hover:bg-accent/80 transition duration-300 uppercase mb-4 font-light"
        >
          Confirmar
        </Link>
        <p className='text-accent font-primary text-xs md:text-sm text-center font-semibold uppercase'>
          Favor de confirmar su asistencia antes del <span className='font-medium'>30 de marzo</span>
        </p>
      </div>
      <p className='text-white font-secondary text-xs md:text-sm text-center px-4 mt-6 max-w-[500px] font-light'>
        Adoramos a tus pequeños, sin embargo, por la naturaleza del evento y normativas del lugar este evento está destinado solo para adultos ¡Esperamos tu comprensión!
      </p>
    </section>
  )
}

export default Invite