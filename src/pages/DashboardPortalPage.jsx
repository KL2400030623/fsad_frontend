import { NavLink } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo';

export default function DashboardPortalPage() {
  const roles = [
    {
      role: 'admin',
      icon: '⚙️',
      label: 'Admin',
      color: 'from-purple-600 to-purple-700',
      position: 'top-left',
      description: 'System Administration'
    },
    {
      role: 'doctor',
      icon: '🩺',
      label: 'Doctor',
      color: 'from-blue-600 to-blue-700',
      position: 'top-right',
      description: 'Medical Practice'
    },
    {
      role: 'pharmacist',
      icon: '💊',
      label: 'Pharmacist',
      color: 'from-amber-600 to-orange-700',
      position: 'bottom-left',
      description: 'Pharmacy Operations'
    },
    {
      role: 'patient',
      icon: '👤',
      label: 'Patient Portal',
      color: 'from-emerald-600 to-teal-700',
      position: 'bottom-right',
      description: 'Health Management'
    },
  ];

  const positionClasses = {
    'top-left': 'top-12 left-12',
    'top-right': 'top-12 right-12',
    'bottom-left': 'bottom-12 left-12',
    'bottom-right': 'bottom-12 right-12'
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/95 shadow-md backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <NavLink to="/" className="cursor-text">
            <BrandLogo logoSize="h-10" />
          </NavLink>
          <NavLink
            to="/"
            className="text-slate-900 px-6 py-2 rounded-lg hover:bg-slate-100 transition font-semibold"
          >
            Home
          </NavLink>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full max-w-6xl pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Welcome to Your Portal
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Select your role to access your personalized medical dashboard
          </p>
        </div>

        {/* Circular Portal Layout */}
        <div className="relative w-full aspect-square max-w-2xl mx-auto mb-16">
          {/* Center Logo Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-white border-4 border-blue-200 shadow-2xl flex items-center justify-center flex-col space-y-2 relative z-20">
              <div className="text-6xl">🏥</div>
              <h2 className="font-bold text-slate-900 text-center text-sm leading-tight">
                <span className="block text-base">Online</span>
                <span className="block text-base">Medical</span>
                <span className="block text-xs text-slate-600">System</span>
              </h2>
            </div>
          </div>

          {/* Role Portals - Circular Arrangement */}
          {roles.map((item, index) => {
            const angle = (index * 90) - 45;
            const radius = 280;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <NavLink
                key={item.role}
                to={`/login?role=${item.role}`}
                className="absolute w-32 h-32 group transform -translate-x-1/2 -translate-y-1/2 hover:z-30"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                <div className={`relative w-full h-full rounded-full bg-gradient-to-br ${item.color} p-1 shadow-xl hover:shadow-2xl transition transform hover:scale-110 group-hover:z-30 cursor-pointer`}>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                  
                  {/* Inner Content */}
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm flex flex-col items-center justify-center text-white group-hover:from-white/20 transition">
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <div className="text-sm font-bold text-center leading-tight">
                      <div className="text-base">{item.label}</div>
                      <div className="text-xs opacity-90">{item.description}</div>
                    </div>
                  </div>

                  {/* Border Animation */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/30 group-hover:border-white/60 transition"></div>
                </div>
              </NavLink>
            );
          })}

          {/* Decorative Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600" style={{ opacity: 0.1 }}>
            <circle cx="300" cy="300" r="280" fill="none" stroke="currentColor" className="text-blue-400" strokeWidth="1" />
            <circle cx="300" cy="300" r="200" fill="none" stroke="currentColor" className="text-blue-300" strokeWidth="1" />
            <line x1="300" y1="20" x2="300" y2="580" stroke="currentColor" className="text-blue-400" strokeWidth="1" />
            <line x1="20" y1="300" x2="580" y2="300" stroke="currentColor" className="text-blue-400" strokeWidth="1" />
          </svg>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <div className="grid md:grid-cols-4 gap-6">
            {roles.map((item) => (
              <div key={item.role} className="text-center space-y-3">
                <div className="text-5xl">{item.icon}</div>
                <h3 className="font-bold text-slate-900 text-lg">{item.label}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
                <NavLink
                  to={`/login?role=${item.role}`}
                  className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${item.color} text-white font-semibold hover:shadow-lg transition text-sm`}
                >
                  Login
                </NavLink>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-slate-600 text-lg">Don't have an account yet?</p>
          <NavLink
            to="/"
            className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold hover:shadow-lg transition transform hover:scale-105"
          >
            Register Now
          </NavLink>
        </div>
      </div>
    </main>
  );
}
