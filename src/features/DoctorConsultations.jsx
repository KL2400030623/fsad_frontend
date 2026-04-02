import { useState } from 'react';
import Section from '../components/Section';
import StatusPill from '../components/StatusPill';

function DoctorConsultations({
  doctorAppointments,
  consultationDrafts,
  setConsultationDrafts,
  approveAppointment,
  rejectAppointment,
  completeConsultation,
}) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredAppointments = doctorAppointments.filter(appointment => {
    if (activeTab === 'all') return true;
    return appointment.status.toLowerCase() === activeTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Virtual Consultations</h2>
        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} ({doctorAppointments.filter(a => tab === 'all' || a.status.toLowerCase() === tab).length})
            </button>
          ))}
        </div>
      </div>

      <Section title={`Consultations (${filteredAppointments.length})`}>
        <div className="space-y-4">
          {filteredAppointments.map((item) => (
            <div key={item.id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold">{item.patient}</p>
                <StatusPill value={item.status} />
              </div>
              <p className="mt-1 text-sm text-slate-600">
                {item.date} at {item.time} · {item.reason}
              </p>

              {item.status === 'Pending' && (
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => approveAppointment(item.id)}
                    className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    ✓ Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => rejectAppointment(item.id)}
                    className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-700"
                  >
                    ✗ Reject
                  </button>
                </div>
              )}

              {item.status === 'Approved' && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Consultation Notes
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    rows="3"
                    placeholder="Enter consultation notes..."
                    value={consultationDrafts[item.id] || ''}
                    onChange={(e) => setConsultationDrafts(prev => ({ ...prev, [item.id]: e.target.value }))}
                  />
                  <button
                    type="button"
                    onClick={() => completeConsultation(item.id)}
                    disabled={!consultationDrafts[item.id]?.trim()}
                    className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    Complete Consultation
                  </button>
                </div>
              )}

              {item.status === 'Completed' && item.consultationNote && (
                <div className="mt-3 rounded-lg bg-blue-50 border border-blue-200 p-3">
                  <p className="text-sm font-semibold text-blue-900">Consultation Notes:</p>
                  <p className="text-sm text-blue-800 mt-1">{item.consultationNote}</p>
                </div>
              )}

              {item.status === 'Rejected' && (
                <div className="mt-3 rounded-lg bg-rose-50 border border-rose-200 p-3">
                  <p className="text-sm font-semibold text-rose-900">Consultation Rejected</p>
                  <p className="text-sm text-rose-800 mt-1">This appointment was not approved.</p>
                </div>
              )}

              {item.meetingLink && (
                <div className="mt-3">
                  <a
                    href={item.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    📹 Join Virtual Consultation
                  </a>
                </div>
              )}
            </div>
          ))}
          {filteredAppointments.length === 0 && (
            <p className="text-center text-slate-500 py-8">
              No {activeTab === 'all' ? '' : activeTab} consultations found.
            </p>
          )}
        </div>
      </Section>
    </div>
  );
}

export default DoctorConsultations;