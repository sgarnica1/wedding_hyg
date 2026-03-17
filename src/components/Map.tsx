import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import BedfordImage from '../assets/images/beford.jpeg'

const QUERETARO_RATES = [
  { tipo: 'Sencilla o Doble', rack: '$ 2,230.00', convenio: '$ 1,450.00', convenioDestacado: true },
  { tipo: 'Jr Suite', rack: '$ 3,345.00', convenio: '$ 2,175.00', convenioDestacado: false },
  { tipo: 'Suite Ejecutiva/Relax', rack: '$ 4,460.00', convenio: '$ 2,900.00', convenioDestacado: false },
]

const Map = () => {
  const [showBedfordImage, setShowBedfordImage] = useState(false)
  const [showQueretaroModal, setShowQueretaroModal] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      className='flex flex-col justify-center items-center pt-20 pb-10 w-full'
    >
      <div className='flex flex-col justify-center items-center max-w-md w-full px-6'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-accent font-primary text-3xl md:text-4xl uppercase mb-10 text-center font-bold text-shadow-md'
        >
          Ubicación & Hospedaje
        </motion.h2>

        <div className='flex flex-col gap-6 w-full max-w-[500px]'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className='flex flex-col justify-center items-center bg-accent rounded-lg py-8 px-6'
          >
            <h3 className='text-white font-primary text-3xl md:text-3xl font-bold uppercase mb-2 text-center'>
              Ceremonia
            </h3>
            <p className='text-white font-secondary text-md md:text-xl font-normal mb-8 text-center'>
              Hotel Misión Juriquilla
            </p>
            <Link
              to="https://maps.app.goo.gl/FYot3HD6WWsNh6Re8"
              target="_blank"
              className="text-white font-secondary text-sm md:text-base text-center underline hover:opacity-80 transition font-normal"
            >
              Blvd. Villas del Meson 56,<br />
              76226 Juriquilla, Qro.
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className='flex flex-col justify-center items-center bg-[#A8B89A] rounded-lg py-8 px-6'
          >
            <h3 className='text-black font-primary text-3xl md:text-3xl font-bold uppercase mb-2 text-center'>
              Fiesta
            </h3>
            <p className='text-black font-secondary text-md md:text-xl mb-8 text-center font-normal'>
              Salón Casa Mila
            </p>
            <Link
              to="https://maps.app.goo.gl/mZSS5B4iQxNrmgtn7"
              target="_blank"
              className="text-[#333] font-secondary text-sm md:text-base text-center underline hover:opacity-80 transition font-normal"
            >
              Avenida Paseo de la República. 11555-B El Salitre,<br />
              76127 Santiago de Querétaro, Qro.
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className='flex flex-col justify-center items-center bg-[#f5f5f5] rounded-lg py-8 px-6'
          >
            <h3 className='text-accent font-primary text-3xl md:text-3xl font-bold uppercase mb-2 text-center'>
              Hospedaje
            </h3>
            <p className='text-accent font-secondary text-md md:text-xl font-normal mb-8 text-center'>
              Bedford Hotel
            </p>
            <Link
              to="https://maps.app.goo.gl/1p6sdKm69fcoVtKu5"
              target="_blank"
              className="text-accent font-secondary text-sm md:text-base text-center underline hover:opacity-80 transition font-normal"
            >
              Ubicación
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBedfordImage(true)}
              className="text-accent font-secondary text-sm md:text-base text-center underline hover:opacity-80 transition mt-10 font-normal cursor-pointer bg-transparent border-none"
            >
              Ver tarifas por convenio
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className='flex flex-col justify-center items-center bg-[#e8e8e8] rounded-lg py-8 px-6'
          >
            <h3 className='text-accent font-primary text-3xl md:text-3xl font-bold uppercase mb-2 text-center'>
              Hospedaje
            </h3>
            <p className='text-accent font-secondary text-md md:text-xl font-normal mb-8 text-center'>
              Hotel Encore
            </p>
            <Link
              to="https://maps.app.goo.gl/bQ24fTUAUdejQzpz6"
              target="_blank"
              className="text-accent font-secondary text-sm md:text-base text-center underline hover:opacity-80 transition font-normal"
            >
              Ubicación
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowQueretaroModal(true)}
              className="text-accent font-secondary text-sm md:text-base text-center underline hover:opacity-80 transition mt-10 font-normal cursor-pointer bg-transparent border-none"
            >
              Ver tarifas por convenio
            </motion.button>
          </motion.div>
        </div>
      </div>

      {showBedfordImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowBedfordImage(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setShowBedfordImage(false)}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition z-10"
            >
              ×
            </button>
            <img
              src={BedfordImage}
              alt="Bedford Hotel Tarifas"
              className="w-full h-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </motion.div>
      )}

      {showQueretaroModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowQueretaroModal(false)}
        >
          <div
            className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQueretaroModal(false)}
              className="absolute top-4 right-4 text-accent bg-[#f5f5f5] rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition z-10 text-xl leading-none"
            >
              ×
            </button>
            <div className="p-6 pt-12">
              <h3 className="text-accent font-primary text-2xl font-bold uppercase mb-6 text-center">
                QUERÉTARO – Tarifas
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse font-secondary text-sm md:text-base">
                  <thead>
                    <tr className="border-b-2 border-accent">
                      <th className="text-left py-3 px-2 font-semibold text-accent">Tipo de habitación</th>
                      <th className="text-right py-3 px-2 font-semibold text-accent">Tarifa Rack</th>
                      <th className="text-right py-3 px-2 font-semibold text-accent">Tarifa Convenio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {QUERETARO_RATES.map((row, i) => (
                      <tr key={i} className="border-b border-gray-200">
                        <td className="py-3 px-2">{row.tipo}</td>
                        <td className="py-3 px-2 text-right">{row.rack}</td>
                        <td className={`py-3 px-2 text-right ${row.convenioDestacado ? 'font-bold text-accent' : ''}`}>
                          {row.convenio}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Map