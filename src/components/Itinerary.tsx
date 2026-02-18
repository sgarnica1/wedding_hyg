import ItineraryBg from '../assets/images/itinerary_bg.png';
import ItineraryBg2 from '../assets/images/itinerary_bg_2.png';

const Itinerary = () => {

  const acts = [
    {
      title: 'PRIMER ACTO',
      location: 'Hotel Misión Juriquilla',
      events: [
        { time: '4:00 PM', description: 'Bienvenida' },
        { time: '4:30 PM', description: 'Ceremonia' }
      ]
    },
    {
      title: 'SEGUNDO ACTO',
      location: 'Salón Casa Mila',
      events: [
        { time: '6:00 PM', description: 'Recepción' },
        { time: '7:30 PM', description: 'Cena' },
        { time: '10:00 PM', description: 'Baile' },
        { time: '1:00 AM', description: 'Cierre' }
      ]
    }
  ]

  return (
    <section
      className='flex flex-col justify-center items-center h-[600px] bg-cover bg-center bg-no-repeat relative'
      style={{ backgroundImage: `url(${ItineraryBg})` }}
    >
      <div
        className='flex flex-col justify-center items-start h-[500px] w-[90%] mx-auto p-8 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${ItineraryBg2})` }}
      >
        <div className='w-full space-y-8 flex flex-col justify-between items-center'>
          {acts.map((act, actIndex) => (
            <div key={actIndex} className='w-full'>
              <h2 className='text-accent font-primary text-2xl md:text-4xl font-bold uppercase mb-2 text-center'>
                {act.title}
              </h2>
              <p className='text-accent font-primary text-lg md:text-xl mb-3 text-center'>
                {act.location}
              </p>
              <div className='w-full h-px bg-accent/30 mb-4'></div>
              <div className='space-y-3'>
                {act.events.map((event, eventIndex) => (
                  <div key={eventIndex} className='flex justify-between items-center'>
                    <p className='text-accent font-primary font-bold italic text-lg md:text-lg'>
                      {event.description}
                    </p>
                    <p className='text-accent font-secondary font-light text-base md:text-lg'>
                      {event.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Itinerary