import { useState, useEffect } from 'react'

const targetDate = new Date('2026-08-22T16:00:00').getTime()

const Countdown = () => {

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className='w-full bg-accent py-6 px-4'>
      <div className='flex flex-row gap-4 md:gap-6 items-end justify-center'>
        <div className='flex flex-col items-center'>
          <p className='text-white font-primary text-4xl md:text-5xl font-light leading-none'>
            {String(timeLeft.days).padStart(3, '0')}
          </p>
          <p className='text-white font-primary text-sm md:text-base font-light mt-1'>d.</p>
        </div>
        <div className='h-12 md:h-16 w-px bg-white/50'></div>
        <div className='flex flex-col items-center'>
          <p className='text-white font-primary text-4xl md:text-5xl font-light leading-none'>
            {String(timeLeft.hours).padStart(2, '0')}
          </p>
          <p className='text-white font-primary text-sm md:text-base font-light mt-1'>hrs.</p>
        </div>
        <div className='h-12 md:h-16 w-px bg-white/50'></div>
        <div className='flex flex-col items-center'>
          <p className='text-white font-primary text-4xl md:text-5xl font-light leading-none'>
            {String(timeLeft.minutes).padStart(2, '0')}
          </p>
          <p className='text-white font-primary text-sm md:text-base font-light mt-1'>min.</p>
        </div>
        <div className='h-12 md:h-16 w-px bg-white/50'></div>
        <div className='flex flex-col items-center'>
          <p className='text-white font-primary text-4xl md:text-5xl font-light leading-none'>
            {String(timeLeft.seconds).padStart(2, '0')}
          </p>
          <p className='text-white font-primary text-sm md:text-base font-light mt-1'>seg.</p>
        </div>
      </div>
    </section>
  )
}

export default Countdown
