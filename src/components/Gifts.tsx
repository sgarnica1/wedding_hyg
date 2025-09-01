import { useState } from 'react'
import { Link } from 'react-router-dom'
import GiftsTitle from '../assets/icons/gifts-title.svg'

const Gifts = () => {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setToastMessage(`${label} copiado al portapapeles`)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch (err) {
      console.error('Error copying to clipboard:', err)
      setToastMessage('Error al copiar')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  return (
    <section className='flex flex-col justify-center items-center py-15 px-10'>
      <div className='flex flex-col justify-center items-center max-w-[500px] mx-auto'>
        <img src={GiftsTitle} alt="Gifts" className='w-full mb-10' />
        <p className='font-light text-center font-secondary'>Su presencia es el regalo más valioso en nuestro día especial.</p>
        <p className='font-medium text-center font-secondary mt-5'>Agradecemos su generosidad y apoyo por este medio.</p>
        <p className='font-secondary font-medium text-2xl uppercase mt-15 text-accent w-3/4 text-center mb-8'>Mesa de Regalos</p>
        <Link
          to={'https://www.amazon.com.mx/wedding/registry/QEAOGN44PLO8'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center font-secondary text-accent text-md py-3 px-4 md:px-5 md:text-base border-1 hover:bg-bg-primary hover:border-bg-secondary hover:text-white hover:cursor-pointer transition duration-300 rounded max-w-lg"
        >
          Ver en Amazon
        </Link>
        <p className='font-secondary font-medium text-2xl uppercase mt-15 text-accent w-3/4 text-center mb-5'>Banamex</p>
        <p className='font-secondary font-medium text-lg uppercase text-black w-3/4 text-center mb-8'>Samuel Marañon Romero</p>
        <p className='font-secondary font-medium text-xl uppercase text-accent w-3/4 mt-3 mb-10 text-center'>
          CLABE: <span
            className='font-light cursor-pointer hover:text-accent/80 active:scale-95 transition-all duration-200 select-none text-black border-b border-dotted border-accent/50 hover:border-accent'
            onClick={() => copyToClipboard('002680905249006281', 'CLABE')}
            title='Haz clic para copiar'
          >
            002680905249006281
          </span>
          <span className='block text-sm font-light text-accent/70 mt-1'>Toca para copiar</span>
        </p>
        <p className='font-secondary font-medium text-xl uppercase text-accent w-3/4 mt-3 mb-10 text-center'>
          Número de tarjeta: <span
            className='font-light cursor-pointer hover:text-accent/80 active:scale-95 transition-all duration-200 select-none text-black border-b border-dotted border-accent/50 hover:border-accent'
            onClick={() => copyToClipboard('5256784406028299', 'Número de tarjeta')}
            title='Haz clic para copiar'
          >
            5256784406028299
          </span>
          <span className='block text-sm font-light text-accent/70 mt-1'>Toca para copiar</span>
        </p>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className='fixed bottom-4 left-0 right-0 mx-auto bg-[#937E6A] text-primary px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in w-3/4 max-w-[400px]'>
          <p className='font-light font-secondary'>{toastMessage}</p>
        </div>
      )}
    </section>
  )
}

export default Gifts