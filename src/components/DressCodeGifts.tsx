import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import DressCodeImage from '../assets/images/dresscode.png'
import GiftsImage from '../assets/images/gifts.png'
import BgCardboard from '../assets/images/bg-cardboard.png'

const DressCodeGifts = () => {

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      className='flex flex-col justify-center items-center h-[600px] bg-cover bg-center bg-no-repeat relative'
      style={{ backgroundImage: `url(${BgCardboard})` }}
    >
      <div className='w-full h-full flex flex-col items-center justify-between gap-0'>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='w-full flex justify-between items-start relative mb-8'
        >
          <div className='flex flex-col items-start pl-5 pt-10'>
            <h2 className='text-accent font-primary text-2xl md:text-3xl font-bold uppercase leading-[0.8]'>
              Código de vestimenta
            </h2>
            <p className='text-accent font-primary text-sm md:text-lg mb-4 uppercase'>
              Formal, Etiqueta
            </p>
            <div className='text-secondary font-secondary text-xs md:text-base'>
              <p className='font-medium mb-2'>Consideraciones</p>
              <p className='font-light'><span className='font-bold'>Hombres</span>: Traje formal, no smoking</p>
              <p className='font-light'><span className='font-bold'>Mujeres</span>: Vestido largo, no azul/blanco</p>
            </div>
          </div>
          <motion.img
            src={DressCodeImage}
            alt="Dress Code"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className='h-[200px]'
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='w-full flex justify-between items-start relative'
        >
          <motion.img
            src={GiftsImage}
            alt="Gifts"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className='h-[350px] ml-[-30px] sm:ml-0'
          />
          <div className='flex flex-col pr-5 pt-10 pl-5 sm:pl-0'>
            <h2 className='text-accent font-primary text-2xl md:text-3xl font-bold uppercase leading-[0.8]'>
              Mesa de regalos
            </h2>
            <p className='font-secondary font-light text-xs md:text-base mt-5 mb-6'>Su presencia es nuestro mejor regalo. Agradecemos su generosidad.</p>
            <p className='text-accent font-primary text-md md:text-xl mb-2 uppercase'>
              Liverpool
            </p>
            <p className='text-accent font-primary text-2xl md:text-3xl font-bold mb-6 uppercase'>
              51950244
            </p>
            <Link
              to={'https://mesaderegalos.liverpool.com.mx/milistaderegalos/51950244'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center font-secondary font-normal text-white bg-accent text-sm md:text-base py-2 px-6 rounded hover:bg-accent/80 transition duration-300 max-w-[120px] uppercase"
            >
              VER
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default DressCodeGifts
