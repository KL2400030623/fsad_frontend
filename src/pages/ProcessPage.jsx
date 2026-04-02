import React from 'react';
import { useNavigate } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo';

function ProcessPage() {
  const navigate = useNavigate();

  const processSteps = [
    {
      step: 1,
      icon: '📝',
      title: 'Register / Sign In',
      description: 'Create your secure account or log in to access healthcare services',
      color: 'from-blue-500 to-blue-600',
    },
    {
      step: 2,
      icon: '🛠️',
      title: 'Choose a Service',
      description: 'Select from appointment booking, lab tests, medicines, or online consultation',
      color: 'from-purple-500 to-purple-600',
    },
    {
      step: 3,
      icon: '📋',
      title: 'Provide Details',
      description: 'Enter patient information, select preferred doctor/date, or choose tests',
      color: 'from-pink-500 to-pink-600',
    },
    {
      step: 4,
      icon: '✅',
      title: 'Confirm & Process',
      description: 'Review your request and confirm the booking securely',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      step: 5,
      icon: '🎉',
      title: 'Receive Healthcare Service',
      description: 'Get medical consultation, prescriptions, or medicine delivery to your doorstep',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
      {/* Fixed Navigation */}
      <section className="fixed left-0 right-0 top-0 z-50 border-b border-indigo-200 bg-white/95 shadow-lg backdrop-blur-md">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-6 px-6 py-5 lg:px-8">
          <button onClick={() => navigate('/')} className="cursor-pointer">
            <BrandLogo />
          </button>
          <div className="flex items-center justify-end gap-4 md:gap-8">
            <button onClick={() => navigate('/')} className="rounded-lg px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100">Home</button>
            <button onClick={() => navigate('/services')} className="rounded-lg px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100">Services</button>
            <button onClick={() => navigate('/about')} className="rounded-lg px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100">About</button>
            <button onClick={() => navigate('/contact')} className="rounded-lg px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100">Contact</button>
            <button onClick={() => navigate('/login')} className="rounded-lg px-4 py-2 font-semibold text-white bg-blue-600 transition hover:bg-blue-700">Sign In</button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-32">
        {/* Header */}
        <section className="text-center mb-20 space-y-6">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900">
            How Our System Works
          </h1>
          <p className="text-2xl md:text-3xl text-slate-600 max-w-5xl mx-auto">
            Follow these simple steps to access world-class healthcare services anytime, anywhere
          </p>
        </section>

        {/* Process Steps */}
        <section className="space-y-12 pb-20">
          {processSteps.map((processStep, idx) => (
            <div key={idx} className="relative">
              {/* Vertical Line Connector */}
              {idx < processSteps.length - 1 && (
                <div className="absolute left-10 top-28 w-1 h-24 bg-gradient-to-b from-slate-300 to-transparent hidden md:block"></div>
              )}

              <div className="grid md:grid-cols-[auto_1fr] gap-10 items-start">
                {/* Step Number Circle */}
                <div className="flex-shrink-0">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${processStep.color} text-white flex items-center justify-center text-4xl font-bold shadow-xl`}>
                    {processStep.step}
                  </div>
                </div>

                {/* Step Content */}
                <div className="bg-white rounded-3xl border-2 border-slate-200 p-12 hover:shadow-2xl hover:border-blue-300 transition">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="text-7xl">{processStep.icon}</div>
                    <div>
                      <h2 className="text-4xl font-bold text-slate-900">{processStep.title}</h2>
                      <p className="text-xl text-slate-600 mt-3">{processStep.description}</p>
                    </div>
                  </div>

                  {/* Step Details */}
                  <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm text-slate-600">
                    {processStep.step === 1 && (
                      <>
                        <div className="bg-blue-50 p-3 rounded-lg">📧 Email/Password authentication</div>
                        <div className="bg-blue-50 p-3 rounded-lg">🔒 Secure HIPAA-compliant account</div>
                      </>
                    )}
                    {processStep.step === 2 && (
                      <>
                        <div className="bg-purple-50 p-3 rounded-lg">👨‍⚕️ Book Doctor Appointment</div>
                        <div className="bg-purple-50 p-3 rounded-lg">🧪 Schedule Lab Tests</div>
                        <div className="bg-purple-50 p-3 rounded-lg">💊 Order Medicines Online</div>
                        <div className="bg-purple-50 p-3 rounded-lg">📱 Video Consultation</div>
                      </>
                    )}
                    {processStep.step === 3 && (
                      <>
                        <div className="bg-pink-50 p-3 rounded-lg">👤 Patient health information</div>
                        <div className="bg-pink-50 p-3 rounded-lg">📅 Available time slots</div>
                        <div className="bg-pink-50 p-3 rounded-lg">🏥 Choose specialist</div>
                        <div className="bg-pink-50 p-3 rounded-lg">📝 Medical history notes</div>
                      </>
                    )}
                    {processStep.step === 4 && (
                      <>
                        <div className="bg-emerald-50 p-3 rounded-lg">💳 Secure payment processing</div>
                        <div className="bg-emerald-50 p-3 rounded-lg">🔐 Confirm appointment</div>
                      </>
                    )}
                    {processStep.step === 5 && (
                      <>
                        <div className="bg-orange-50 p-3 rounded-lg">📞 Consultation with doctor</div>
                        <div className="bg-orange-50 p-3 rounded-lg">📋 Digital prescription</div>
                        <div className="bg-orange-50 p-3 rounded-lg">💊 Medicine delivery</div>
                        <div className="bg-orange-50 p-3 rounded-lg">📊 Medical records saved</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Key Features Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">Why Our Process Is Different</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-slate-900 mb-2">Lightning Fast</h3>
              <p className="text-slate-600">Complete booking in under 2 minutes with our streamlined process</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-bold text-slate-900 mb-2">100% Secure</h3>
              <p className="text-slate-600">HIPAA-compliant encryption protects all your medical data</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="font-bold text-slate-900 mb-2">Always Available</h3>
              <p className="text-slate-600">Access healthcare 24/7 from any device, anywhere in the world</p>
            </div>
          </div>
        </section>

        {/* User Journey Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Your Healthcare Journey</h2>
          <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden">
            <div className="grid md:grid-cols-5 divide-x divide-slate-200">
              {processSteps.map((step, idx) => (
                <div key={idx} className="p-6 text-center hover:bg-blue-50 transition">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} text-white flex items-center justify-center text-lg font-bold mx-auto mb-3`}>
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm">{step.title}</h3>
                  <p className="text-xs text-slate-600 mt-2">~{1 + idx} minute{idx > 0 ? 's' : ''}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-12 text-white text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Ready to Experience Better Healthcare?</h2>
          <p className="text-lg opacity-90 mb-6">Join thousands of patients who trust our platform</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button 
              onClick={() => navigate('/login')}
              className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition transform hover:scale-105"
            >
              Sign In Now
            </button>
            <button 
              onClick={() => navigate('/')}
              className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition"
            >
              Learn More
            </button>
          </div>
        </section>

        {/* Benefits Summary */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">System Benefits at Every Step</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 rounded-xl p-6 border-l-4 border-emerald-500">
              <h3 className="font-bold text-slate-900 mb-2">👥 For Patients</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>✓ Easy online booking anytime</li>
                <li>✓ Digital health records management</li>
                <li>✓ Video consultations with experts</li>
                <li>✓ Medicine delivery to home</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
              <h3 className="font-bold text-slate-900 mb-2">🩺 For Doctors</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>✓ Streamlined patient management</li>
                <li>✓ Secure prescription digital platform</li>
                <li>✓ Video consultation capabilities</li>
                <li>✓ Automated appointment scheduling</li>
              </ul>
            </div>
            <div className="bg-amber-50 rounded-xl p-6 border-l-4 border-amber-500">
              <h3 className="font-bold text-slate-900 mb-2">💊 For Pharmacists</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>✓ Digital prescription verification</li>
                <li>✓ Efficient order fulfillment</li>
                <li>✓ Real-time inventory management</li>
                <li>✓ Customer delivery tracking</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
              <h3 className="font-bold text-slate-900 mb-2">⚙️ For Administrators</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>✓ Complete system oversight</li>
                <li>✓ User and role management</li>
                <li>✓ Security and compliance monitoring</li>
                <li>✓ Platform analytics and reporting</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProcessPage;
