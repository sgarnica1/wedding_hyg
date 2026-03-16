import { useState } from 'react';
import { FamilyType } from '../../utils/types';
import StatusPill from './StatusPill';

const INVITE_BASE = typeof window !== 'undefined' ? window.location.origin : 'https://bodahyg.netlify.app';

const CopyInviteButton = ({ familyId }: { familyId: string }) => {
    const [copied, setCopied] = useState(false);
    const url = `${INVITE_BASE}/invite/${familyId}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 text-sm font-medium rounded-lg bg-white text-accent cursor-pointer transition-colors shrink-0"
        >
            {copied ? (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copiado
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copiar enlace de invitación
                </>
            )}
        </button>
    );
};

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

interface FamilyListProps {
    families: [string, FamilyType][];
    rsvpData: Map<string, DbRsvp>;
}

const FamilyList = ({ families, rsvpData }: FamilyListProps) => {
    const [statusFilter, setStatusFilter] = useState<'all' | 'assists' | 'no assist' | 'pending'>('all');

    const getMemberStatus = (familyId: string, memberName: string): 'assists' | 'no assist' | 'pending' => {
        const rsvp = rsvpData.get(familyId);
        if (!rsvp) return 'pending';

        const member = rsvp.rsvpData.members.find(m => m.name === memberName);
        if (!member) return 'pending';

        return member.attending ? 'assists' : 'no assist';
    };

    const getTotals = () => {
        let assisting = 0;
        let notAssisting = 0;
        let pending = 0;

        families.forEach(([id, family]) => {
            family.members.forEach(member => {
                const status = getMemberStatus(id, member);
                if (status === 'assists') assisting++;
                else if (status === 'no assist') notAssisting++;
                else pending++;
            });
        });

        return { assisting, notAssisting, pending };
    };

    const filteredFamilies = families.filter(([id, family]) => {
        if (statusFilter === 'all') return true;

        // Check if any family member matches the filter
        return family.members.some(member =>
            getMemberStatus(id, member) === statusFilter
        );
    });

    const totals = getTotals();

    return (
        <div className="space-y-4">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
                <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:cursor-pointer
                        ${statusFilter === 'all'
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                    Todos
                </button>
                <button
                    onClick={() => setStatusFilter('assists')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:cursor-pointer
                        ${statusFilter === 'assists'
                            ? 'bg-green-700 text-white'
                            : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
                >
                    Asistirán
                </button>
                <button
                    onClick={() => setStatusFilter('no assist')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:cursor-pointer
                        ${statusFilter === 'no assist'
                            ? 'bg-red-700 text-white'
                            : 'bg-red-50 text-red-700 hover:bg-red-100'}`}
                >
                    No Asistirán
                </button>
                <button
                    onClick={() => setStatusFilter('pending')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:cursor-pointer
                        ${statusFilter === 'pending'
                            ? 'bg-yellow-700 text-white'
                            : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'}`}
                >
                    Pendientes
                </button>
            </div>

            {/* Summary Cards - Changed grid to be responsive */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-700">
                    <div className="text-2xl font-bold text-green-700">{totals.assisting}</div>
                    <div className="text-sm text-green-600">Asistirán</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-700">
                    <div className="text-2xl font-bold text-red-700">{totals.notAssisting}</div>
                    <div className="text-sm text-red-600">No Asistirán</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-700">
                    <div className="text-2xl font-bold text-yellow-700">{totals.pending}</div>
                    <div className="text-sm text-yellow-600">Pendientes</div>
                </div>
            </div>

            {/* Existing List */}
            <div className="bg-white rounded-lg shadow">
                <div className="divide-y divide-gray-200">
                    {filteredFamilies.map(([id, family]) => (
                        <div key={id} className="py-4 px-5 md:px-10 hover:bg-gray-50 font-secondary">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-4 gap-2 mb-10">
                                <h3 className="text-xl font-medium text-gray-900">{family.name}</h3>
                                <div className="md:block">
                                    <CopyInviteButton familyId={id} />
                                </div>
                            </div>
                            <div>
                                <div className="space-y-2 mb-3">
                                    {family.members.map((member) => (
                                        <div key={member} className="flex items-center justify-between pl-1 md:pl-4">
                                            <span className="text-md text-gray-700 font-secondary font-medium">{member}</span>
                                            <StatusPill status={getMemberStatus(id, member)} />
                                        </div>
                                    ))}
                                </div>

                                {/* Special Request section */}
                                {rsvpData.get(id)?.specialRequest && (
                                    <div className="mt-3 sm pl-1 md:pl-4 border-t pt-3">
                                        <p className="text-md font-secondary">
                                            <span className="font-medium text-gray-700">Nota especial:</span>
                                            <span className="text-gray-600 ml-2">{rsvpData.get(id)?.specialRequest}</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FamilyList;