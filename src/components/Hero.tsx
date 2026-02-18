import BackgroundCover from '../assets/images/cover.png'

const Hero = () => {
  return (
    <div className='relative'>
      <main
        className='flex flex-col justify-between items-center h-[600px] bg-cover bg-center bg-no-repeat relative text-white font-primary py-14'
        style={{ backgroundImage: `url(${BackgroundCover})` }}
      >
        <p className='text-sm font-normal uppercase'>Nos complace invitarte a la <span className='font-bold'>boda</span> de</p>
        <h1 className='text-6xl sm:text-7xl font-normal uppercase leading-[0.8] '>Hannia & <br />Gonzalo</h1>
        <div className='flex flex-col gap-2 items-center'>
          <div className='flex flex-row gap-2 text-xl font-bold'>
            <p>22.</p>
            <p>agosto.</p>
            <p>2026.</p>
          </div>
          <p className='text-lg'>4:00 PM</p>
          <p className='text-lg'>Querétaro, Qro.</p>
        </div>
      </main>
    </div>
  )
}

export default Hero