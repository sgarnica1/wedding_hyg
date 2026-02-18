import { useNavigate, useParams } from 'react-router-dom';
import { GUESTS } from '../utils/guests';
import RsvpForm from './RsvpForm';
import { GuestsType } from '../utils/types';

const RsvpPage: React.FC = () => {
  const { id: familyKey } = useParams();
  const navigate = useNavigate();
  const guests = GUESTS as GuestsType;

  // Get the family details from the GUESTS object
  const family = familyKey ? guests[familyKey] : null

  return (
    <div className='flex flex-col justify-center items-center py-20 w-full min-h-screen bg-bg-secondary'>
      <div className='flex flex-col justify-center items-center max-w-md w-full px-6'>
        <h2 className='font-primary text-6xl uppercase mb-3'>RSVP</h2>
        {(!familyKey || !family) && (
          <p className='text-xl md:text-2xl text-center text-secondary mb-6'>Familia no encontrada.</p>
        )}
        {familyKey && family && (
          <>
            <RsvpForm family={family} familyKey={familyKey} />
          </>
        )}

        <button
          onClick={() => navigate(-1)}
          className="mt-4 py-2 px-4  hover:bg-primary hover:text-white hover:cursor-pointer transition duration-300 rounded text-lg font-medium"
        >
          Volver a Inicio
        </button>

      </div>
    </div>
  );
};

export default RsvpPage;