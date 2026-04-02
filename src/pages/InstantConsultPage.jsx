import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialUsers } from '../constants/data';

export default function InstantConsultPage() {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [consultReason, setConsultReason] = useState('');
  const [consultMode, setConsultMode] = useState('video'); // 'chat', 'audio', 'video'
  const [bookingStep, setBookingStep] = useState('specialty'); // 'specialty', 'doctor', 'details', 'confirm'

  const specialties = [
    { id: 'general', icon: '🩺', name: 'General Physician', desc: 'For common health issues' },
    { id: 'cardio', icon: '🫀', name: 'Cardiology', desc: 'Heart & cardiovascular health' },
    { id: 'neuro', icon: '🧠', name: 'Neurology', desc: 'Brain & nervous system' },
    { id: 'derma', icon: '🧴', name: 'Dermatology', desc: 'Skin & hair issues' },
    { id: 'ortho', icon: '🦴', name: 'Orthopedics', desc: 'Bones & joints' },
    { id: 'pedia', icon: '👶', name: 'Pediatrics', desc: 'Children\'s health' },
    { id: 'gynae', icon: '👩‍⚕️', name: 'Gynecology', desc: 'Women\'s health' },
    { id: 'dental', icon: '🦷', name: 'Dentistry', desc: 'Dental care' },
  ];

  const doctors = initialUsers.filter((user) => user.role === 'doctor');

  const handleBookConsult = () => {
    if (!consultReason.trim()) {
      alert('Please describe your concern');
      return;
    }
    setBookingStep('confirm');
  };

  const handleConfirmBooking = () => {
    alert(
      `Consultation booked with Dr. ${selectedDoctor?.name}!\nMode: ${consultMode === 'video' ? 'Video Call' : consultMode === 'audio' ? 'Audio Call' : 'Chat'}\nYou will receive a call link shortly.`
    );
    setSelectedSpecialty(null);
    setSelectedDoctor(null);
    setConsultReason('');
    setConsultMode('video');
    setBookingStep('specialty');
    navigate('/');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-700 bg-slate-900/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <button
            onClick={() => navigate('/')}
            className="text-white font-bold hover:text-blue-400 transition"
          >
            ← Back to Home
          </button>
          <h1 className="text-2xl font-bold text-white">Instant Consultation</h1>
          <div className="w-12"></div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-5xl">
          {/* Header Section */}
          <section className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Online Doctor Consultation</h2>
            <p className="text-lg text-slate-300 mb-2">Chat, Audio, or Video Call with Top Doctors</p>
            <p className="text-slate-400">Get medical advice from certified doctors - available 24/7</p>
          </section>

          {/* Stats Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">8+</div>
              <p className="text-slate-300">Medical Specialties</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">8+</div>
              <p className="text-slate-300">Certified Doctors</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
              <p className="text-slate-300">Available Always</p>
            </div>
          </section>

          {/* Booking Section */}
          <section className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-12">
            {/* Step 1: Specialty Selection */}
            {bookingStep === 'specialty' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Step 1: Select Specialty</h3>
                <p className="text-slate-400 mb-6">Choose a medical specialty based on your health concern</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {specialties.map((spec) => (
                    <div
                      key={spec.id}
                      onClick={() => {
                        setSelectedSpecialty(spec);
                        setBookingStep('doctor');
                      }}
                      className="bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg p-4 cursor-pointer transition text-center"
                    >
                      <div className="text-3xl mb-2">{spec.icon}</div>
                      <h4 className="font-semibold text-white text-sm">{spec.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">{spec.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Doctor Selection */}
            {bookingStep === 'doctor' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Step 2: Select a Doctor</h3>
                <p className="text-slate-400 mb-4">Specialty: <span className="text-blue-400 font-semibold">{selectedSpecialty?.name}</span></p>
                <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setBookingStep('details');
                      }}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                        selectedDoctor?.id === doctor.id
                          ? 'border-blue-500 bg-blue-900/20'
                          : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">👨‍⚕️</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white">{doctor.name}</h4>
                          <p className="text-sm text-slate-400">Status: {doctor.status}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-yellow-400 font-semibold">₹299</p>
                          <p className="text-xs text-slate-400">per consultation</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setBookingStep('specialty')}
                  className="px-6 py-2 rounded-lg bg-slate-700 text-white font-semibold hover:bg-slate-600 transition"
                >
                  ← Back
                </button>
              </div>
            )}

            {/* Step 3: Details & Mode */}
            {bookingStep === 'details' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Step 3: Tell Us About Your Concern</h3>
                <div className="mb-6">
                  <p className="text-slate-300 mb-2">Doctor: <span className="font-bold text-white">{selectedDoctor?.name}</span></p>
                </div>

                {/* Consultation Mode Selection */}
                <div className="mb-6">
                  <label className="block text-white font-semibold mb-3">Choose Consultation Mode:</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'chat', icon: '💬', label: 'Chat' },
                      { id: 'audio', icon: '📞', label: 'Audio Call' },
                      { id: 'video', icon: '📹', label: 'Video Call' },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setConsultMode(mode.id)}
                        className={`py-3 rounded-lg border-2 transition font-semibold ${
                          consultMode === mode.id
                            ? 'border-blue-500 bg-blue-900/30 text-blue-300'
                            : 'border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <div className="text-2xl mb-1">{mode.icon}</div>
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Concern Description */}
                <textarea
                  value={consultReason}
                  onChange={(e) => setConsultReason(e.target.value)}
                  placeholder="Describe your symptoms or medical concern in detail..."
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg p-4 mb-6 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  rows="5"
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => setBookingStep('doctor')}
                    className="flex-1 px-6 py-3 rounded-lg bg-slate-700 text-white font-semibold hover:bg-slate-600 transition"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleBookConsult}
                    className="flex-1 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    Continue to Review →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {bookingStep === 'confirm' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Review Your Booking</h3>
                <div className="bg-slate-700/50 rounded-lg p-6 mb-8 border border-slate-600 space-y-4">
                  <div className="flex justify-between items-start pb-4 border-b border-slate-600">
                    <div>
                      <p className="text-slate-400 text-sm">Doctor</p>
                      <p className="text-white font-semibold text-lg">{selectedDoctor?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-sm">Specialty</p>
                      <p className="text-white font-semibold">{selectedSpecialty?.name}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start pb-4 border-b border-slate-600">
                    <div>
                      <p className="text-slate-400 text-sm">Consultation Mode</p>
                      <p className="text-white font-semibold">
                        {consultMode === 'video' ? '📹 Video Call' : consultMode === 'audio' ? '📞 Audio Call' : '💬 Chat'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-sm">Duration</p>
                      <p className="text-white font-semibold">Up to 15 minutes</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Your Concern</p>
                    <p className="text-white font-semibold break-words mt-2">{consultReason}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-600">
                    <p className="text-slate-400 text-sm mb-2">Consultation Fee</p>
                    <p className="text-white font-bold text-2xl">₹ 299</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setBookingStep('details')}
                    className="flex-1 px-6 py-3 rounded-lg bg-slate-700 text-white font-semibold hover:bg-slate-600 transition"
                  >
                    ← Edit Details
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="flex-1 px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                  >
                    Confirm & Pay ✓
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Why Choose Us */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-800/70 border border-slate-700 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Why Choose Us?</h3>
              <div className="space-y-4">
                {[
                  { icon: '✅', title: 'Certified Doctors', desc: 'All doctors are verified and certified' },
                  { icon: '🔒', title: 'Secure & Confidential', desc: 'Encrypted consultations, 100% private' },
                  { icon: '⚡', title: 'Instant Connection', desc: 'Connect within minutes of booking' },
                  { icon: '💰', title: 'Affordable', desc: 'Transparent pricing, no hidden costs' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-6">How It Works</h3>
              <div className="space-y-4">
                {[
                  { num: '1', title: 'Select Specialty', desc: 'Choose your medical concern' },
                  { num: '2', title: 'Pick a Doctor', desc: 'Choose from available doctors' },
                  { num: '3', title: 'Share Your Concern', desc: 'Describe your symptoms' },
                  { num: '4', title: 'Get Consultation', desc: 'Receive expert medical advice' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {item.num}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-slate-300 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">What Patients Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Bhupendra M.',
                  feedback: 'Great service! Got consultation at midnight when I needed it most. Doctor was very helpful.',
                  rating: '⭐⭐⭐⭐⭐',
                },
                {
                  name: 'Krishna P.',
                  feedback: 'I live in a remote area, and this platform gave me access to specialists easily. Highly recommended!',
                  rating: '⭐⭐⭐⭐⭐',
                },
                {
                  name: 'Ranjit K.',
                  feedback: 'Smooth process from start to finish. Reminders were timely and the consultation was thorough.',
                  rating: '⭐⭐⭐⭐⭐',
                },
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                  <p className="text-yellow-400 mb-3">{testimonial.rating}</p>
                  <p className="text-slate-300 mb-4 italic">"{testimonial.feedback}"</p>
                  <p className="text-white font-semibold">~ {testimonial.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {[
                {
                  q: 'How does online consultation work?',
                  a: 'Choose a specialty, select a doctor, describe your concern, and connect via your preferred mode (chat, audio, or video) within minutes.',
                },
                {
                  q: 'What do I need for a video consultation?',
                  a: 'A device with camera and microphone (smartphone, tablet, or computer) and stable internet connection.',
                },
                {
                  q: 'Can I get a prescription?',
                  a: 'Yes, if needed, the doctor can issue a digital prescription available in your account to use at any pharmacy.',
                },
                {
                  q: 'Is my consultation confidential?',
                  a: 'Absolutely. All consultations are encrypted and comply with medical privacy regulations. Your data is secure.',
                },
                {
                  q: 'What if I\'m not satisfied?',
                  a: 'We offer satisfaction guarantee. Contact our support team within 24 hours for consultation re-booking or refund.',
                },
              ].map((item, index) => (
                <details key={index} className="bg-slate-800 border border-slate-700 rounded-lg p-4 cursor-pointer group">
                  <summary className="font-bold text-white hover:text-blue-400 transition flex justify-between items-center">
                    <span>{item.q}</span>
                    <span className="group-open:rotate-180 transition">▼</span>
                  </summary>
                  <p className="text-slate-300 mt-3">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
