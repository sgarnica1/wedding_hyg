import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      className='flex flex-col items-center justify-center h-[750px] px-4 mx-auto bg-accent'
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='flex flex-col justify-between items-center w-[90%] max-w-[500px] pt-20 pb-6 px-6 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${InviteBg})`,
          borderRadius: '50% 50% 0 0 / 30% 30% 0 0',
          minHeight: '400px'
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='text-accent font-primary text-sm md:text-base mb-4 text-center font-semibold uppercase text-shadow-sm'
        >
          Nos complace invitarlos a celebrar con nosotros
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='text-accent font-primary text-4xl sm:text-5xl font-light leading-[0.9] mb-6 text-center uppercase text-shadow-md'
        >
          {familyName}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to={`/rsvp/${familyKey}`}
            className="flex justify-center items-center font-secondary text-white bg-accent text-sm md:text-base py-3 px-16 rounded hover:bg-accent/80 transition duration-300 uppercase mb-4 font-light button-ripple shadow-lg"
          >
            Confirmar
          </Link>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='text-accent font-primary text-xs md:text-sm text-center font-semibold uppercase'
        >
          Favor de confirmar su asistencia antes del <span className='font-medium'>30 de marzo</span>
        </motion.p>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className='text-white font-secondary text-xs md:text-sm text-center px-4 mt-6 max-w-[500px] font-light'
      >
        Adoramos a tus pequeños, sin embargo, por la naturaleza del evento y normativas del lugar este evento está destinado solo para adultos ¡Esperamos tu comprensión!
      </motion.p>
    </motion.section>
  )
}

export default Invite