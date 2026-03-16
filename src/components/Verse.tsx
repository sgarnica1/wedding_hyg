import { motion } from 'framer-motion'

const Verse = () => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.8 }}
    className='flex flex-col justify-center items-center pt-20 pb-20 w-full px-6 bg-accent'
  >
    <blockquote className="max-w-xl text-center">
      <p className="text-white font-secondary text-lg md:text-xl italic mb-4 font-medium">
        Y ahora permanecen la fe, la esperanza, el amor: estos tres; pero el mayor de ellos es el amor.
      </p>
      <cite className="text-white font-primary text-base md:text-lg not-italic">
        1 Corintios 13:13
      </cite>
    </blockquote>
  </motion.section>
)

export default Verse
