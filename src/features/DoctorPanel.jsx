import { useState, useMemo } from 'react';
import Section from '../components/Section';
import StatusPill from '../components/StatusPill';
import { medicationPricing } from '../constants/data';

function DoctorPanel({
  doctorAppointments,
  consultationDrafts,
  setConsultationDrafts,
  approveAppointment,
  rejectAppointment,
  completeConsultation,
  createPrescription,
  newPrescription,
  setNewPrescription,
  patients,
  prescriptionSuccessMessage,
}) {
  const [activeSection, setActiveSection] = useState('consultations');
  const [showPreview, setShowPreview] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [videoCallActive, setVideoCallActive] = useState(null);

  // Calendar helpers
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get appointments for a specific date
  const getAppointmentsForDate = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return doctorAppointments.filter(apt => apt.date === dateStr);
  };

  const selectedDateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  const selectedDayAppointments = doctorAppointments.filter(apt => apt.date === selectedDateStr);

  return (
    <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
      {/* Doctor Sidebar */}
      <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm h-fit">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Doctor Menu</h3>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveSection('calendar')}
            className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition ${
              activeSection === 'calendar'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📅 Calendar View
          </button>
          <button
            onClick={() => setActiveSection('consultations')}
            className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition ${
              activeSection === 'consultations'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🩺 Virtual Consultations
          </button>
          <button
            onClick={() => setActiveSection('prescriptions')}
            className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition ${
              activeSection === 'prescriptions'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            💊 Create E-Prescription
          </button>
          <button
            onClick={() => setActiveSection('followup')}
            className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition ${
              activeSection === 'followup'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📋 Patient Follow-up
          </button>
        </nav>
      </aside>

      {/* Doctor Content */}
      <main className="space-y-6">
        {prescriptionSuccessMessage && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {prescriptionSuccessMessage}
          </div>
        )}

        {/* Calendar View Section */}
        {activeSection === 'calendar' && (
          <div className="space-y-6">
            <Section title="📅 Appointment Calendar">
              <div className="grid lg:grid-cols-[1fr_300px] gap-6">
                {/* Calendar Grid */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => setSelectedDate(new Date(currentYear, currentMonth - 1, 1))}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition"
                    >
                      ←
                    </button>
                    <h3 className="text-xl font-bold text-slate-900">
                      {monthNames[currentMonth]} {currentYear}
                    </h3>
                    <button
                      onClick={() => setSelectedDate(new Date(currentYear, currentMonth + 1, 1))}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition"
                    >
                      →
                    </button>
                  </div>
                  
                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map(day => (
                      <div key={day} className="text-center text-xs font-semibold text-slate-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Empty cells for days before month starts */}
                    {[...Array(firstDayOfMonth)].map((_, i) => (
                      <div key={`empty-${i}`} className="h-20 bg-slate-50 rounded-lg"></div>
                    ))}
                    
                    {/* Actual days */}
                    {[...Array(daysInMonth)].map((_, i) => {
                      const day = i + 1;
                      const dayAppointments = getAppointmentsForDate(day);
                      const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === currentMonth;
                      const isToday = new Date().getDate() === day && new Date().getMonth() === currentMonth && new Date().getFullYear() === currentYear;
                      
                      return (
                        <button
                          key={day}
                          onClick={() => setSelectedDate(new Date(currentYear, currentMonth, day))}
                          className={`h-20 rounded-lg border-2 p-1 text-left transition hover:border-blue-400 ${
                            isSelected ? 'border-blue-500 bg-blue-50' : 'border-transparent bg-white'
                          } ${isToday ? 'ring-2 ring-blue-300' : ''}`}
                        >
                          <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-slate-700'}`}>
                            {day}
                          </span>
                          {dayAppointments.length > 0 && (
                            <div className="mt-1 space-y-1">
                              {dayAppointments.slice(0, 2).map((apt, idx) => (
                                <div 
                                  key={idx}
                                  className={`text-xs px-1 py-0.5 rounded truncate ${
                                    apt.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                                    apt.status === 'Approved' ? 'bg-blue-100 text-blue-700' :
                                    apt.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                    'bg-slate-100 text-slate-600'
                                  }`}
                                >
                                  {apt.time} {apt.patient.split(' ')[0]}
                                </div>
                              ))}
                              {dayAppointments.length > 2 && (
                                <div className="text-xs text-slate-500">+{dayAppointments.length - 2} more</div>
                              )}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Day Details */}
                <div className="bg-slate-50 rounded-xl p-4 h-fit">
                  <h4 className="font-bold text-slate-900 mb-3">
                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </h4>
                  {selectedDayAppointments.length === 0 ? (
                    <p className="text-sm text-slate-500 text-center py-8">No appointments on this day</p>
                  ) : (
                    <div className="space-y-3">
                      {selectedDayAppointments.map((apt) => (
                        <div key={apt.id} className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold text-slate-900">{apt.patient}</p>
                              <p className="text-sm text-slate-600">{apt.time}</p>
                            </div>
                            <StatusPill value={apt.status} />
                          </div>
                          <p className="text-xs text-slate-500">{apt.reason}</p>
                          {apt.status === 'Approved' && (
                            <button
                              onClick={() => setVideoCallActive(apt.id)}
                              className="mt-2 w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition"
                            >
                              📹 Start Video Call
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Section>

            {/* Today's Schedule Summary */}
            <Section title="⏰ Quick Stats">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-3xl font-black text-blue-600">{doctorAppointments.filter(a => a.status === 'Pending').length}</p>
                  <p className="text-sm text-slate-600">Pending</p>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <p className="text-3xl font-black text-emerald-600">{doctorAppointments.filter(a => a.status === 'Approved').length}</p>
                  <p className="text-sm text-slate-600">Upcoming</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <p className="text-3xl font-black text-purple-600">{doctorAppointments.filter(a => a.status === 'Completed').length}</p>
                  <p className="text-sm text-slate-600">Completed</p>
                </div>
              </div>
            </Section>
          </div>
        )}

        {/* Video Call Modal */}
        {videoCallActive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-slate-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-white font-semibold">Video Consultation in Progress</span>
                </div>
                <button
                  onClick={() => setVideoCallActive(null)}
                  className="text-white hover:text-red-400 transition"
                >
                  ✕ End Call
                </button>
              </div>
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-5xl">👨‍⚕️</span>
                  </div>
                  <p className="text-white text-xl font-semibold">
                    {doctorAppointments.find(a => a.id === videoCallActive)?.patient}
                  </p>
                  <p className="text-slate-400">Connected</p>
                </div>
              </div>
              <div className="bg-slate-800 px-6 py-4 flex items-center justify-center gap-4">
                <button className="w-14 h-14 rounded-full bg-slate-700 text-white text-xl hover:bg-slate-600 transition">
                  🎤
                </button>
                <button className="w-14 h-14 rounded-full bg-slate-700 text-white text-xl hover:bg-slate-600 transition">
                  📹
                </button>
                <button className="w-14 h-14 rounded-full bg-slate-700 text-white text-xl hover:bg-slate-600 transition">
                  💬
                </button>
                <button 
                  onClick={() => setVideoCallActive(null)}
                  className="w-14 h-14 rounded-full bg-red-600 text-white text-xl hover:bg-red-700 transition"
                >
                  📞
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Virtual Consultations Section */}
        {activeSection === 'consultations' && (
          <Section title="Virtual Consultations">
            <div className="mb-4 flex flex-wrap gap-2">
              <StatusPill value="Pending" />
              <StatusPill value="Approved" />
              <StatusPill value="Rejected" />
              <StatusPill value="Completed" />
            </div>
            <div className="space-y-4">
              {doctorAppointments.map((item) => (
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
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => rejectAppointment(item.id)}
                        className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-700"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {item.status === 'Approved' && (
                    <>
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => setVideoCallActive(item.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition"
                        >
                          📹 Start Video Call
                        </button>
                        <a href={item.meetingLink} className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition">
                          🔗 External Link
                        </a>
                      </div>
                      <textarea
                        className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        rows="2"
                        placeholder="Consultation summary"
                        value={consultationDrafts[item.id] || item.consultationNote}
                        onChange={(event) =>
                          setConsultationDrafts((current) => ({
                            ...current,
                            [item.id]: event.target.value,
                          }))
                        }
                      />
                      <button
                        type="button"
                        onClick={() => completeConsultation(item.id)}
                        className="mt-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
                      >
                        Complete Consultation
                      </button>
                    </>
                  )}

                  {item.status === 'Rejected' && (
                    <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
                      Appointment rejected.
                    </p>
                  )}

                  {item.status === 'Completed' && item.consultationNote && (
                    <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                      <p className="font-semibold">Consultation Summary</p>
                      <p>{item.consultationNote}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Create E-Prescription Section */}
        {activeSection === 'prescriptions' && (
          <Section title="Create E-Prescription">
            <form onSubmit={createPrescription} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Patient</label>
                <select
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={newPrescription.patient}
                  onChange={(event) => setNewPrescription((current) => ({ ...current, patient: event.target.value }))}
                >
                  {patients.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Diagnosis</label>
                <textarea
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="Enter diagnosis details"
                  rows="3"
                  value={newPrescription.diagnosis}
                  onChange={(event) => setNewPrescription((current) => ({ ...current, diagnosis: event.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Medication</label>
                <select
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={newPrescription.medication}
                  onChange={(event) => setNewPrescription((current) => ({ ...current, medication: event.target.value }))}
                >
                  {Object.keys(medicationPricing).map((med) => (
                    <option key={med} value={med}>
                      {med} - ${medicationPricing[med].unitPrice.toFixed(2)}/{medicationPricing[med].unit}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Dosage</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="e.g., 1 tablet daily"
                  value={newPrescription.dosage}
                  onChange={(event) => setNewPrescription((current) => ({ ...current, dosage: event.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="Number of units"
                  min="1"
                  value={newPrescription.quantity}
                  onChange={(event) => setNewPrescription((current) => ({ ...current, quantity: event.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Instructions</label>
                <textarea
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="Special instructions for the patient"
                  rows="2"
                  value={newPrescription.instructions}
                  onChange={(event) => setNewPrescription((current) => ({ ...current, instructions: event.target.value }))}
                />
              </div>
              {newPrescription.medication && newPrescription.quantity && (
                <div className="rounded-lg bg-slate-100 p-3">
                  <p className="text-sm text-slate-600">Estimated Cost:</p>
                  <p className="text-xl font-bold text-slate-900">
                    ${(medicationPricing[newPrescription.medication]?.unitPrice * parseFloat(newPrescription.quantity || 0)).toFixed(2)}
                  </p>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="flex-1 rounded-lg bg-slate-600 px-4 py-2 font-semibold text-white hover:bg-slate-700 transition"
                >
                  Preview
                </button>
                <button type="submit" className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 transition">
                  Save Prescription
                </button>
              </div>
            </form>
          </Section>
        )}

        {/* Patient Follow-up Section */}
        {activeSection === 'followup' && (
          <Section title="Patient Follow-up">
            <div className="space-y-4">
              <p className="text-sm text-slate-600 mb-4">Track and manage patient follow-ups from recent consultations.</p>
              {doctorAppointments.filter(apt => apt.status === 'Completed').map((item) => (
                <div key={item.id} className="rounded-lg border border-slate-200 p-4 bg-slate-50">
                  <p className="font-semibold text-slate-900">{item.patient}</p>
                  <p className="text-sm text-slate-600 mt-1">Consultation: {item.date} at {item.time}</p>
                  {item.consultationNote && (
                    <p className="text-sm text-slate-700 mt-2 p-2 bg-white rounded border border-slate-200">
                      {item.consultationNote}
                    </p>
                  )}
                  <button
                    type="button"
                    className="mt-3 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
                  >
                    Schedule Follow-up
                  </button>
                </div>
              ))}
              {doctorAppointments.filter(apt => apt.status === 'Completed').length === 0 && (
                <p className="text-sm text-slate-500 text-center py-8">No completed consultations yet.</p>
              )}
            </div>
          </Section>
        )}
      </main>

      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Prescription Preview</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Patient:</strong> {newPrescription.patient}</p>
              <p><strong>Diagnosis:</strong> {newPrescription.diagnosis || 'N/A'}</p>
              <p><strong>Medication:</strong> {newPrescription.medication}</p>
              <p><strong>Dosage:</strong> {newPrescription.dosage}</p>
              <p><strong>Quantity:</strong> {newPrescription.quantity}</p>
              <p><strong>Instructions:</strong> {newPrescription.instructions}</p>
              <p><strong>Estimated Cost:</strong> ${(medicationPricing[newPrescription.medication]?.unitPrice * parseFloat(newPrescription.quantity || 0)).toFixed(2)}</p>
            </div>
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 rounded-lg bg-slate-600 px-4 py-2 font-semibold text-white hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorPanel;