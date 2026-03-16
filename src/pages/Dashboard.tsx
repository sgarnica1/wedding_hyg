import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, collectionName } from '../services/firebase';
import { GUESTS } from '../utils/guests';
import SearchBar from '../components/Dashboard/SearchBar';
import FamilyList from '../components/Dashboard/FamilyList';
import { GuestsType } from '../utils/types';

interface RsvpData {
  id: string;
  familyName: string;
  members: {
    name: string;
    attending: boolean;
  }[];
}

interface DbRsvp {
  rsvpData: RsvpData;
  specialRequest?: string;
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [rsvpData, setRsvpData] = useState<Map<string, DbRsvp>>(new Map());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRsvps = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const rsvpMap = new Map<string, DbRsvp>();

        querySnapshot.forEach((doc) => {
          const data = doc.data() as DbRsvp;
          rsvpMap.set(data.rsvpData.id, data);
        });

        setRsvpData(rsvpMap);
      } catch (error) {
        console.error('Error fetching RSVPs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRsvps();
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_DASHBOARD_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  const guests = GUESTS as GuestsType;
  const filteredGuests = Object.entries(guests).filter(([_, family]) =>
    family.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    family.members.some(member =>
      member.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-secondary flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-secondary text-center mb-6">Dashboard</h1>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-accent text-white py-3 px-4 rounded-lg hover:bg-accent/60 transition-colors hover:cursor-pointer"
            >
              Acceder
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-accent p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-secondary mb-8">Cargando...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-secondary p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-secondary mb-8">Dashboard de Invitados</h1>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FamilyList families={filteredGuests} rsvpData={rsvpData} />
      </div>
    </div>
  );
};

export default Dashboard;