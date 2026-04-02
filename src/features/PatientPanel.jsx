import { useState, useMemo } from 'react';
import Section from '../components/Section';
import StatusPill from '../components/StatusPill';
import PatientAvailableDoctors from './PatientAvailableDoctors';

function PatientPanel({
  handleBookAppointment,
  bookingForm,
  setBookingForm,
  doctors = [],
  patientAppointments = [],
  patientRecords,
  patientLabs = [],
  patientPrescriptions = [],
}) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [patientDetails] = useState({
    fullName: 'Alice Brown',
    dateOfBirth: '1985-06-15',
    gender: 'Female',
    phone: '+1-555-0123',
    email: 'alice.brown@email.com',
    address: '123 Main Street, City, State 12345',
    emergencyContact: 'John Brown - +1-555-0124 (Spouse)',
    insuranceProvider: 'HealthFirst Insurance',
    insuranceNumber: 'HF-123456789',
  });

  // Reminders based on upcoming appointments
  const reminders = useMemo(() => {
    const today = new Date();
    const upcoming = patientAppointments
      .filter(apt => apt.status === 'Approved' || apt.status === 'Pending')
      .map(apt => {
        const aptDate = new Date(apt.date + 'T' + apt.time);
        const daysUntil = Math.ceil((aptDate - today) / (1000 * 60 * 60 * 24));
        return { ...apt, daysUntil, aptDate };
      })
      .filter(apt => apt.daysUntil >= 0 && apt.daysUntil <= 7)
      .sort((a, b) => a.aptDate - b.aptDate);
    return upcoming;
  }, [patientAppointments]);

  // Handle booking from doctor search
  const handleBookDoctor = (doctorName) => {
    setBookingForm(prev => ({ ...prev, doctor: doctorName }));
    setActiveSection('book');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Patient Sidebar */}
      <aside className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-lg h-fit">
        <div className="text-center mb-6 pb-6 border-b border-slate-200">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 mx-auto mb-3 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {patientDetails.fullName.charAt(0)}
          </div>
          <h3 className="font-bold text-xl text-slate-900">{patientDetails.fullName}</h3>
          <p className="text-sm text-slate-500">Patient ID: PT-001</p>
        </div>
        
        <nav className="space-y-2">
          <button
            onClick={() => setActiveSection('dashboard')}
            className={`w-full text-left rounded-xl px-4 py-3 text-base font-medium transition ${
              activeSection === 'dashboard'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🏠 Dashboard
          </button>
          <button
            onClick={() => setActiveSection('find-doctor')}
            className={`w-full text-left rounded-xl px-4 py-3 text-base font-medium transition ${
              activeSection === 'find-doctor'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🔍 Find a Doctor
          </button>
          <button
            onClick={() => setActiveSection('book')}
            className={`w-full text-left rounded-xl px-4 py-3 text-base font-medium transition ${
              activeSection === 'book'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📅 Book Appointment
          </button>
          <button
            onClick={() => setActiveSection('appointments')}
            className={`w-full text-left rounded-xl px-4 py-3 text-base font-medium transition ${
              activeSection === 'appointments'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📋 My Appointments
          </button>
          <button
            onClick={() => setActiveSection('records')}
            className={`w-full text-left rounded-xl px-4 py-3 text-base font-medium transition ${
              activeSection === 'records'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🏥 Medical Records
          </button>
          <button
            onClick={() => setActiveSection('reminders')}
            className={`w-full text-left rounded-xl px-4 py-3 text-base font-medium transition relative ${
              activeSection === 'reminders'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🔔 Reminders
            {reminders.length > 0 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                {reminders.length}
              </span>
            )}
          </button>
        </nav>
      </aside>

      {/* Patient Content */}
      <main className="space-y-6">
        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-5 text-white shadow-lg">
                <p className="text-3xl font-black">{patientAppointments.length}</p>
                <p className="text-blue-100">Total Appointments</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 text-white shadow-lg">
                <p className="text-3xl font-black">{patientAppointments.filter(a => a.status === 'Approved').length}</p>
                <p className="text-emerald-100">Upcoming</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-5 text-white shadow-lg">
                <p className="text-3xl font-black">{patientPrescriptions.length}</p>
                <p className="text-amber-100">Prescriptions</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 p-5 text-white shadow-lg">
                <p className="text-3xl font-black">{patientLabs.length}</p>
                <p className="text-purple-100">Lab Reports</p>
              </div>
            </div>

            {/* Upcoming Reminders Alert */}
            {reminders.length > 0 && (
              <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-5">
                <h3 className="font-bold text-lg text-amber-800 mb-3">🔔 Upcoming Appointments</h3>
                <div className="space-y-2">
                  {reminders.slice(0, 2).map((apt) => (
                    <div key={apt.id} className="flex items-center justify-between bg-white rounded-xl p-4 border border-amber-200">
                      <div>
                        <p className="font-semibold text-slate-900">{apt.doctor}</p>
                        <p className="text-sm text-slate-600">{apt.date} at {apt.time}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        apt.daysUntil === 0 ? 'bg-red-100 text-red-700' :
                        apt.daysUntil === 1 ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {apt.daysUntil === 0 ? 'Today!' : apt.daysUntil === 1 ? 'Tomorrow' : `In ${apt.daysUntil} days`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Patient Profile */}
            <Section title={<span className="flex items-center gap-3"><span className="text-4xl">👤</span> Patient Profile</span>}>
              <div className="grid md:grid-cols-2 gap-4 text-lg">
                <p><span className="font-bold text-slate-900">Name:</span> {patientDetails.fullName}</p>
                <p><span className="font-bold text-slate-900">Date of Birth:</span> {patientDetails.dateOfBirth}</p>
                <p><span className="font-bold text-slate-900">Gender:</span> {patientDetails.gender}</p>
                <p><span className="font-bold text-slate-900">Phone:</span> {patientDetails.phone}</p>
                <p><span className="font-bold text-slate-900">Email:</span> {patientDetails.email}</p>
                <p><span className="font-bold text-slate-900">Insurance:</span> {patientDetails.insuranceProvider}</p>
              </div>
            </Section>
          </div>
        )}

        {/* Find Doctor Section */}
        {activeSection === 'find-doctor' && (
          <PatientAvailableDoctors onBookDoctor={handleBookDoctor} />
        )}

        {/* Book Appointment Section */}
        {activeSection === 'book' && (
          <Section title={<span className="flex items-center gap-3"><span className="text-5xl">📅</span> Book Virtual Appointment</span>}>
            <form onSubmit={handleBookAppointment} className="space-y-5 max-w-xl">
              <div>
                <label className="block text-lg font-semibold text-slate-700 mb-2">Select Doctor</label>
                <select
                  className="w-full rounded-xl border-2 border-slate-300 px-5 py-4 text-lg font-medium focus:border-emerald-500 focus:outline-none transition-colors"
                  value={bookingForm.doctor}
                  onChange={(event) => setBookingForm((current) => ({ ...current, doctor: event.target.value }))}
                >
                  {doctors.map((doctor) => (
                    <option key={doctor} value={doctor}>
                      {doctor}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-lg font-semibold text-slate-700 mb-2">Date & Time</label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    className="rounded-xl border-2 border-slate-300 px-5 py-4 text-lg font-medium focus:border-emerald-500 focus:outline-none transition-colors"
                    value={bookingForm.date}
                    onChange={(event) => setBookingForm((current) => ({ ...current, date: event.target.value }))}
                  />
                  <input
                    type="time"
                    className="rounded-xl border-2 border-slate-300 px-5 py-4 text-lg font-medium focus:border-emerald-500 focus:outline-none transition-colors"
                    value={bookingForm.time}
                    onChange={(event) => setBookingForm((current) => ({ ...current, time: event.target.value }))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-lg font-semibold text-slate-700 mb-2">Reason for Visit</label>
                <textarea
                  rows="3"
                  className="w-full rounded-xl border-2 border-slate-300 px-5 py-4 text-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Describe your symptoms or reason for consultation..."
                  value={bookingForm.reason}
                  onChange={(event) => setBookingForm((current) => ({ ...current, reason: event.target.value }))}
                />
              </div>
              <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-lg font-bold text-white hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
                Book Appointment
              </button>
            </form>
          </Section>
        )}

        {/* My Appointments Section */}
        {activeSection === 'appointments' && (
          <Section title={<span className="flex items-center gap-3"><span className="text-5xl">📋</span> My Appointments</span>}>
            <div className="space-y-4">
              {patientAppointments.map((item) => (
                <div key={item.id} className="rounded-2xl border-2 border-slate-200 p-5 hover:border-emerald-300 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-xl text-slate-900">{item.doctor}</p>
                    <StatusPill value={item.status} />
                  </div>
                  <p className="text-lg text-slate-600">
                    📅 {item.date} at {item.time}
                  </p>
                  <p className="text-lg text-slate-600">💬 {item.reason}</p>
                  {item.status === 'Approved' && item.meetingLink && (
                    <a 
                      href={item.meetingLink} 
                      className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                      📹 Join Video Call
                    </a>
                  )}
                </div>
              ))}
              {patientAppointments.length === 0 && (
                <p className="text-lg text-slate-500 text-center py-8">No appointments scheduled.</p>
              )}
            </div>
          </Section>
        )}

        {/* Medical Records Section */}
        {activeSection === 'records' && (
          <div className="space-y-6">
            <Section title={<span className="flex items-center gap-3"><span className="text-5xl">🏥</span> Medical Record</span>}>
              {patientRecords ? (
                <div className="grid md:grid-cols-2 gap-4 text-lg">
                  <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <p className="text-sm text-red-600 font-semibold">Blood Type</p>
                    <p className="text-2xl font-bold text-red-700">{patientRecords.bloodType}</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                    <p className="text-sm text-amber-600 font-semibold">Allergies</p>
                    <p className="text-xl font-bold text-amber-700">{patientRecords.allergies}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-blue-600 font-semibold">Conditions</p>
                    <p className="text-xl font-bold text-blue-700">{patientRecords.conditions}</p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                    <p className="text-sm text-emerald-600 font-semibold">Last Visit</p>
                    <p className="text-xl font-bold text-emerald-700">{patientRecords.lastVisit}</p>
                  </div>
                </div>
              ) : (
                <p className="text-lg text-slate-600">No record found.</p>
              )}
            </Section>

            <Section title={<span className="flex items-center gap-3"><span className="text-5xl">🧪</span> Lab Reports</span>}>
              <div className="space-y-4">
                {patientLabs.map((item) => (
                  <div key={item.id} className="rounded-2xl border-2 border-slate-200 p-5 hover:border-blue-300 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-xl text-slate-900">{item.test}</p>
                        <p className="text-lg text-slate-600">📅 {item.date}</p>
                        <p className="text-lg text-slate-600">📊 {item.result}</p>
                      </div>
                      <StatusPill value={item.status} />
                    </div>
                  </div>
                ))}
                {patientLabs.length === 0 && (
                  <p className="text-lg text-slate-500 text-center py-8">No lab reports available.</p>
                )}
              </div>
            </Section>

            <Section title={<span className="flex items-center gap-3"><span className="text-5xl">💊</span> Prescriptions</span>}>
              <div className="space-y-4">
                {patientPrescriptions.map((item) => (
                  <div key={item.id} className="rounded-2xl border-2 border-slate-200 p-5 hover:border-purple-300 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-xl text-slate-900">{item.medication}</p>
                        <p className="text-lg text-slate-600">💉 {item.dosage}</p>
                        <p className="text-lg text-slate-600">📋 {item.instructions}</p>
                      </div>
                      <StatusPill value={item.status} />
                    </div>
                  </div>
                ))}
                {patientPrescriptions.length === 0 && (
                  <p className="text-lg text-slate-500 text-center py-8">No prescriptions available.</p>
                )}
              </div>
            </Section>
          </div>
        )}

        {/* Reminders Section */}
        {activeSection === 'reminders' && (
          <Section title={<span className="flex items-center gap-3"><span className="text-5xl">🔔</span> Appointment Reminders</span>}>
            {reminders.length === 0 ? (
              <div className="text-center py-16">
                <span className="text-6xl block mb-4">✅</span>
                <p className="text-xl font-semibold text-slate-700">All caught up!</p>
                <p className="text-slate-500">No upcoming appointments in the next 7 days.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reminders.map((apt) => (
                  <div 
                    key={apt.id} 
                    className={`rounded-2xl border-2 p-6 transition-all ${
                      apt.daysUntil === 0 ? 'border-red-300 bg-red-50' :
                      apt.daysUntil === 1 ? 'border-amber-300 bg-amber-50' :
                      'border-blue-300 bg-blue-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-4 py-1 rounded-full text-sm font-bold ${
                            apt.daysUntil === 0 ? 'bg-red-500 text-white animate-pulse' :
                            apt.daysUntil === 1 ? 'bg-amber-500 text-white' :
                            'bg-blue-500 text-white'
                          }`}>
                            {apt.daysUntil === 0 ? '🔴 TODAY!' : apt.daysUntil === 1 ? '🟠 Tomorrow' : `🔵 In ${apt.daysUntil} days`}
                          </span>
                          <StatusPill value={apt.status} />
                        </div>
                        <p className="font-bold text-2xl text-slate-900">{apt.doctor}</p>
                        <p className="text-lg text-slate-600 mt-1">📅 {apt.date} at ⏰ {apt.time}</p>
                        <p className="text-lg text-slate-600">💬 {apt.reason}</p>
                      </div>
                      {apt.status === 'Approved' && (
                        <button className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg transition">
                          📹 Prepare for Call
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Reminder Tips */}
                <div className="mt-6 rounded-xl bg-slate-100 p-5">
                  <h4 className="font-bold text-slate-900 mb-3">💡 Appointment Tips</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li>✓ Test your camera and microphone before the call</li>
                    <li>✓ Have your medication list ready</li>
                    <li>✓ Write down questions you want to ask</li>
                    <li>✓ Find a quiet, well-lit space</li>
                  </ul>
                </div>
              </div>
            )}
          </Section>
        )}
      </main>
    </div>
  );
}

export default PatientPanel;
