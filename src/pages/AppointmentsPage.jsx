import Section from '../components/Section';
import StatusPill from '../components/StatusPill';

function AppointmentsPage({ appointments, onCompleteConsultation, consultationDrafts, setConsultationDrafts }) {
  return (
    <div className="space-y-6">
      <Section title="All Appointments">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase text-slate-600">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Reason</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Meeting Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-slate-500">
                    No appointments scheduled
                  </td>
                </tr>
              ) : (
                appointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">{appt.id}</td>
                    <td className="px-4 py-3">{appt.patient}</td>
                    <td className="px-4 py-3">{appt.doctor}</td>
                    <td className="px-4 py-3">{appt.date}</td>
                    <td className="px-4 py-3">{appt.time}</td>
                    <td className="px-4 py-3">{appt.reason}</td>
                    <td className="px-4 py-3">
                      <StatusPill status={appt.status} />
                    </td>
                    <td className="px-4 py-3">
                      {appt.meetingLink && (
                        <a
                          href={appt.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline hover:text-blue-700"
                        >
                          Join
                        </a>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Section>

      {onCompleteConsultation && (
        <Section title="Complete Consultations">
          <div className="space-y-4">
            {appointments
              .filter((appt) => appt.status === 'Booked')
              .map((appt) => (
                <div key={appt.id} className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="font-semibold text-slate-800">
                      {appt.patient} - {appt.date} at {appt.time}
                    </h4>
                    <StatusPill status={appt.status} />
                  </div>
                  <p className="mb-3 text-sm text-slate-600">Reason: {appt.reason}</p>
                  <textarea
                    placeholder="Enter consultation notes..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    rows="3"
                    value={consultationDrafts[appt.id] || ''}
                    onChange={(e) =>
                      setConsultationDrafts((prev) => ({
                        ...prev,
                        [appt.id]: e.target.value,
                      }))
                    }
                  />
                  <button
                    onClick={() => onCompleteConsultation(appt.id)}
                    className="mt-3 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                  >
                    Mark Completed
                  </button>
                </div>
              ))}
            {appointments.filter((appt) => appt.status === 'Booked').length === 0 && (
              <p className="text-center text-sm text-slate-500">No pending consultations</p>
            )}
          </div>
        </Section>
      )}
    </div>
  );
}

export default AppointmentsPage;
