import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const roleInfo = {
  admin: {
    icon: '⚙️',
    label: 'Admin',
    color: 'from-purple-600 to-purple-700',
    title: 'Administrator Login',
    description: 'Access system administration and platform management',
  },
  doctor: {
    icon: '🩺',
    label: 'Doctor',
    color: 'from-blue-600 to-blue-700',
    title: 'Doctor Portal Login',
    description: 'Manage consultations and patient care',
  },
  patient: {
    icon: '👤',
    label: 'Patient',
    color: 'from-emerald-600 to-teal-700',
    title: 'Patient Portal Login',
    description: 'Access your health records and appointments',
  },
  pharmacist: {
    icon: '💊',
    label: 'Pharmacist',
    color: 'from-amber-600 to-orange-700',
    title: 'Pharmacist Portal Login',
    description: 'Manage prescriptions and pharmacy operations',
  },
};

export default function LoginPage({ onLogin, loginError = '' }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const role = searchParams.get('role') || 'patient';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(loginError);
  const [loading, setLoading] = useState(false);

  const info = roleInfo[role] || roleInfo.patient;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    // Call parent's onLogin handler
    onLogin({ email, password });
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/95 shadow-md backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="text-slate-900 font-bold hover:text-blue-600 transition"
          >
            ← Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-slate-900 px-6 py-2 rounded-lg hover:bg-slate-100 transition font-semibold"
          >
            Home
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-xl">
          {/* Login Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className={`bg-gradient-to-r ${info.color} p-12 text-white text-center space-y-4`}>
              <div className="text-8xl">{info.icon}</div>
              <h1 className="text-4xl font-black">{info.title}</h1>
              <p className="text-xl text-white/90">{info.description}</p>
            </div>

            {/* Form */}
            <div className="p-10 space-y-8">
              {error && (
                <div className="rounded-xl bg-red-50 border-2 border-red-200 px-5 py-4">
                  <p className="text-red-700 font-bold text-lg">⚠️ {error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-base font-bold text-slate-700 mb-3">
                    📧 Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border-2 border-slate-300 bg-slate-50 px-5 py-4 text-lg text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-base font-bold text-slate-700 mb-3">
                    🔒 Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border-2 border-slate-300 bg-slate-50 px-5 py-4 text-lg text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  />
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-base">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300" />
                    <span className="text-slate-600">Remember me</span>
                  </label>
                  {role !== 'admin' && (
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-bold">
                      Forgot Password?
                    </a>
                  )}
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl bg-gradient-to-r ${info.color} text-white text-lg font-bold hover:shadow-xl transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? '🔄 Logging in...' : '🚀 Login'}
                </button>
              </form>

              {role !== 'admin' && (
                <>
                  {/* Divider */}
                  <div className="relative flex items-center">
                    <div className="flex-1 border-t border-slate-300"></div>
                    <span className="px-4 text-base text-slate-500">or</span>
                    <div className="flex-1 border-t border-slate-300"></div>
                  </div>

                  {/* Alternative Options */}
                  <div className="space-y-3">
                    <div className="text-center text-base text-slate-600">
                      Don't have an account?{' '}
                      <button 
                        onClick={() => navigate('/')} 
                        className="text-blue-600 font-bold hover:text-blue-700 transition"
                      >
                        Register here
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>


          </div>

          {/* Footer */}
          <div className="mt-10 text-center text-base text-slate-600 space-y-3">
            <p className="text-lg">🔐 Secure Connection • 🛡️ Data Encryption • ✅ HIPAA Compliant</p>
            <p>© 2026 Online Medical System. All rights reserved.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
