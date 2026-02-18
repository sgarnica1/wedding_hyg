import { useState, useEffect, useCallback } from 'react';
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db, collectionName } from '../services/firebase';
import ErrorMessage from './ErrorMessage';
import { FamilyType } from '../utils/types';

interface RsvpProps {
  family: FamilyType;
  familyKey: string;
}

interface RsvpState {
  [key: string]: {
    [member: string]: boolean;
  };
}

interface MemberRsvp {
  name: string;
  attending: boolean;
}

const RsvpForm: React.FC<RsvpProps> = ({ family, familyKey }: RsvpProps) => {
  const [rsvps, setRsvps] = useState<RsvpState>(() => {
    // Initialize the state with members set to 'false' (not attending by default)
    const initialState: RsvpState = {};
    initialState[familyKey] = family.members.reduce((acc: { [key: string]: boolean }, member: string) => {
      acc[member] = false; // Default all members to not attending
      return acc;
    }, {});
    return initialState;
  });

  const [specialRequest, setSpecialRequest] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [existingRsvpId, setExistingRsvpId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  const fetchExistingRsvp = useCallback(async () => {
    if (!familyKey || !family.members || family.members.length === 0) {
      setDataLoaded(true);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Create a query to find RSVP with matching id
      const rsvpQuery = query(collection(db, collectionName), where('rsvpData.id', '==', familyKey));
      const querySnapshot = await getDocs(rsvpQuery);

      console.log('Query snapshot size:', querySnapshot.size);

      if (!querySnapshot.empty) {
        // We found an existing RSVP
        const existingRsvp = querySnapshot.docs[0];
        const rsvpData = existingRsvp.data();
        console.log('Found existing RSVP:', rsvpData);

        // Update state with the existing RSVP data
        setRsvps((prevRsvps) => {
          const updatedRsvps: RsvpState = { ...prevRsvps };
          updatedRsvps[familyKey] = family.members.reduce((acc: { [key: string]: boolean }, member: string) => {
            // Find the member in the existing RSVP data
            const memberData = rsvpData.rsvpData?.members?.find(
              (m: MemberRsvp) => m.name === member
            );

            // Set attending status from existing data or default to false
            acc[member] = memberData ? memberData.attending : false;
            return acc;
          }, {});
          return updatedRsvps;
        });

        setSpecialRequest(rsvpData.specialRequest || '');
        setExistingRsvpId(existingRsvp.id);
        setIsUpdating(true);
      } else {
        console.log('No existing RSVP found');
      }
    } catch (err) {
      console.error("Error fetching existing RSVP:", err);
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(`Error al cargar datos existentes: ${errorMessage}`);
    } finally {
      setLoading(false);
      setDataLoaded(true);
    }
  }, [familyKey, family.members]);

  // Fetch existing RSVP data if any
  useEffect(() => {
    if (familyKey && family.members && family.members.length > 0) {
      fetchExistingRsvp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [familyKey, fetchExistingRsvp, refetch]);

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Prepare data to send to Firebase
      const rsvpData = {
        id: familyKey,
        familyName: family.name,
        members: family.members.map((member: string) => ({
          name: member,
          attending: rsvps[familyKey][member],
        })),
      };

      const data = {
        rsvpData,
        specialRequest,
      };

      if (isUpdating && existingRsvpId) {
        // Update existing document
        await updateDoc(doc(db, collectionName, existingRsvpId), data);
      } else {
        // Create new document
        await addDoc(collection(db, collectionName), data);
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Hubo un error al enviar tu RSVP. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (fKey: string, member: string) => {
    setRsvps({
      ...rsvps,
      [fKey]: {
        ...rsvps[fKey],
        [member]: !rsvps[fKey][member],
      },
    });
  };

  const handleUpdateClick = () => {
    setSuccess(false);
    setRefetch(prev => !prev)
  };

  if (success) {
    return (
      <div className="w-full p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-green-600 text-center">
          {isUpdating
            ? '¡Gracias por actualizar tu confirmación!'
            : '¡Gracias por confirmar!'}
        </h3>
        <p className="text-md text-center">Tu RSVP ha sido {isUpdating ? 'actualizado' : 'enviado'} correctamente. Esperamos verte en nuestra celebración.</p>
        <button
          className="w-full py-3 px-4 border-2 border-black hover:bg-primary hover:text-white hover:cursor-pointer transition duration-300 rounded text-lg font-medium mt-10"
          onClick={handleUpdateClick}
        >
          Editar asistencia
        </button>
      </div>
    );
  }

  if (loading && !dataLoaded) {
    return (
      <div className="w-full p-6 bg-white shadow-lg rounded-lg">
        <p className="text-lg text-center">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg">
      {isUpdating && (
        <div className="mb-6 p-4 bg-accent/10 border-l-4 border-accent rounded">
          <p className="text-accent font-secondary text-sm md:text-base font-normal">
            Ya has confirmado tu asistencia anteriormente. Puedes editar tu respuesta a continuación.
          </p>
        </div>
      )}
      <form onSubmit={handleRsvpSubmit}>
        {/* Render members of the selected family */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-secondary">
            {isUpdating ? 'Actualiza tu asistencia' : 'Confirma asistencia'}
          </h3>
          <p className='mb-6 text-md'>Por favor, selecciona a los invitados que asistirán:</p>
          <div className="space-y-4">
            {family.members.map((member: string) => (
              <div key={member} className="flex items-center">
                <input
                  type="checkbox"
                  checked={rsvps[familyKey][member]}
                  onChange={() => handleCheckboxChange(familyKey, member)}
                  id={`${familyKey}-${member}`}
                  className="mr-3 h-5 w-5"
                />
                <label htmlFor={`${familyKey}-${member}`} className="text-lg">
                  {member}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-secondary mb-2">Peticiones especiales o restricciones alimenticias</label>
          <textarea
            className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            rows={4}
          />
        </div>

        {error && <ErrorMessage message={error} />}

        <p className='mb-8 text-sm text-secondary font-secondary font-light'>
          Adoramos a tus pequeños, sin embargo, por la naturaleza del evento y normativas del lugar este evento está destinado solo para adultos ¡Esperamos tu comprensión!
        </p>

        <button
          type="submit"
          className="w-full py-3 px-4 text-white bg-accent hover:bg-accent/80 hover:cursor-pointer transition duration-300 rounded text-lg font-medium uppercase"
          disabled={loading}
        >
          {loading
            ? 'Enviando...'
            : isUpdating
              ? 'Editar Asistencia'
              : 'Confirmar Asistencia'}
        </button>
      </form>
    </div>
  );
};

export default RsvpForm;