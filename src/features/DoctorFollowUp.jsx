import Section from '../components/Section';
import StatusPill from '../components/StatusPill';

function DoctorFollowUp({ doctorAppointments, patients }) {
  // Get completed consultations for follow-up
  const completedConsultations = doctorAppointments.filter(appointment =>
    appointment.status === 'Completed'
  );

  // Get patients who need follow-up (completed consultations within last 30 days)
  const recentConsultations = completedConsultations.filter(appointment => {
    const consultationDate = new Date(appointment.date);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return consultationDate >= thirtyDaysAgo;
  });

  // Group by patient for follow-up tracking
  const followUpByPatient = recentConsultations.reduce((acc, consultation) => {
    if (!acc[consultation.patient]) {
      acc[consultation.patient] = [];
    }
    acc[consultation.patient].push(consultation);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Patient Follow-up</h2>
          <p className="text-slate-600">Track recent consultations and schedule follow-ups</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">{recentConsultations.length}</p>
          <p className="text-sm text-slate-600">Recent Consultations</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Recent Consultations (30 days)">
          <div className="space-y-4">
            {recentConsultations.map((consultation) => (
              <div key={consultation.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-slate-900">{consultation.patient}</p>
                  <StatusPill value={consultation.status} />
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  {consultation.date} • {consultation.reason}
                </p>
                {consultation.consultationNote && (
                  <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
                    <p className="text-sm font-semibold text-blue-900">Consultation Summary:</p>
                    <p className="text-sm text-blue-800 mt-1">{consultation.consultationNote}</p>
                  </div>
                )}
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    📅 Schedule Follow-up
                  </button>
                  <button
                    type="button"
                    className="rounded-lg bg-slate-600 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                  >
                    📋 View History
                  </button>
                </div>
              </div>
            ))}
            {recentConsultations.length === 0 && (
              <p className="text-center text-slate-500 py-8">
                No recent consultations in the last 30 days.
              </p>
            )}
          </div>
        </Section>

        <Section title="Follow-up Recommendations">
          <div className="space-y-4">
            {Object.entries(followUpByPatient).map(([patientName, consultations]) => (
              <div key={patientName} className="rounded-lg border border-slate-200 p-4">
                <h4 className="font-semibold text-slate-900 mb-2">{patientName}</h4>
                <p className="text-sm text-slate-600 mb-3">
                  {consultations.length} consultation{consultations.length > 1 ? 's' : ''} in the last 30 days
                </p>

                <div className="space-y-2">
                  {consultations.slice(0, 2).map((consultation) => (
                    <div key={consultation.id} className="rounded bg-slate-50 p-2">
                      <p className="text-xs text-slate-600">{consultation.date}</p>
                      <p className="text-sm font-medium">{consultation.reason}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200">
                  <p className="text-sm font-semibold text-slate-700 mb-2">Recommended Actions:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                      Follow-up in 2 weeks
                    </span>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                      Monitor progress
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {Object.keys(followUpByPatient).length === 0 && (
              <p className="text-center text-slate-500 py-8">
                No patients requiring follow-up at this time.
              </p>
            )}
          </div>
        </Section>
      </div>

      <Section title="Follow-up Statistics">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-blue-50 p-4">
            <p className="text-sm text-slate-600">Total Consultations</p>
            <p className="text-2xl font-bold text-blue-600">{completedConsultations.length}</p>
            <p className="text-xs text-slate-500 mt-1">All time</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-emerald-50 p-4">
            <p className="text-sm text-slate-600">Recent Consultations</p>
            <p className="text-2xl font-bold text-emerald-600">{recentConsultations.length}</p>
            <p className="text-xs text-slate-500 mt-1">Last 30 days</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-purple-50 p-4">
            <p className="text-sm text-slate-600">Patients Needing Follow-up</p>
            <p className="text-2xl font-bold text-purple-600">{Object.keys(followUpByPatient).length}</p>
            <p className="text-xs text-slate-500 mt-1">Active cases</p>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default DoctorFollowUp;