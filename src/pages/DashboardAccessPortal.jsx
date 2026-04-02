import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BrandLogo from '../components/BrandLogo';

const roles = [
  {
    id: 'admin',
    icon: '⚙️',
    label: 'Administrator',
    title: 'Admin Portal',
    description: 'System management & oversight',
    color: 'from-purple-500 to-purple-600',
    position: { top: '10%', left: '50%', translateX: '-50%' },
    borderColor: 'border-purple-400',
    shadowColor: 'shadow-purple-500/50',
    hoverColor: 'hover:from-purple-600 hover:to-purple-700',
  },
  {
    id: 'doctor',
    icon: '🩺',
    label: 'Healthcare Provider',
    title: 'Doctor Portal',
    description: 'Patient care & consultations',
    color: 'from-blue-500 to-blue-600',
    position: { top: '50%', right: '10%', translateY: '-50%' },
    borderColor: 'border-blue-400',
    shadowColor: 'shadow-blue-500/50',
    hoverColor: 'hover:from-blue-600 hover:to-blue-700',
  },
  {
    id: 'patient',
    icon: '👤',
    label: 'Patient',
    title: 'Patient Portal',
    description: 'Health records & appointments',
    color: 'from-emerald-500 to-teal-600',
    position: { bottom: '10%', right: '15%' },
    borderColor: 'border-emerald-400',
    shadowColor: 'shadow-emerald-500/50',
    hoverColor: 'hover:from-emerald-600 hover:to-teal-700',
  },
  {
    id: 'pharmacist',
    icon: '💊',
    label: 'Pharmacist',
    title: 'Pharmacy Portal',
    description: 'Prescription management',
    color: 'from-amber-500 to-orange-600',
    position: { bottom: '10%', left: '15%' },
    borderColor: 'border-amber-400',
    shadowColor: 'shadow-amber-500/50',
    hoverColor: 'hover:from-amber-600 hover:to-orange-700',
  },
];

export default function DashboardAccessPortal() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState(null);
  const [hoveredRole, setHoveredRole] = useState(null);

  const handleRoleClick = (roleId) => {
    setActiveRole(roleId);
    setTimeout(() => {
      navigate(`/login?role=${roleId}`);
    }, 300);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden flex flex-col">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Soft glow orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Faint medical icons scattered */}
        <div className="absolute top-10 left-20 text-6xl opacity-5 animate-float" style={{ animationDuration: '6s' }}>🏥</div>
        <div className="absolute top-1/3 right-20 text-5xl opacity-5 animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }}>⚕️</div>
        <div className="absolute bottom-1/3 left-1/4 text-6xl opacity-5 animate-float" style={{ animationDuration: '7s', animationDelay: '2s' }}>❤️</div>
        <div className="absolute top-1/4 right-1/3 text-5xl opacity-5 animate-float" style={{ animationDuration: '9s', animationDelay: '0.5s' }}>🔬</div>

        {/* Circular rings */}
        <div className="absolute inset-1/4 border border-blue-500/10 rounded-full"></div>
        <div className="absolute inset-1/3 border border-purple-500/5 rounded-full"></div>
        <div className="absolute inset-2/5 border border-teal-500/5 rounded-full"></div>

        {/* CSS Animation */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
        `}</style>
      </div>

      {/* Header */}
      <header className="relative z-20 pt-8 pb-6 text-center">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent mb-3 drop-shadow-lg">
            Dashboard Access Portal
          </h1>
          <p className="text-lg md:text-xl text-blue-200/80 font-semibold tracking-wide">
            Select your role to continue
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Portal Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-16">
        <div className="relative w-full max-w-2xl aspect-square">
          {/* Central Logo - Glassmorphism Effect */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>

              {/* Middle decorative ring */}
              <div className="absolute inset-2 w-36 h-36 border-2 border-gradient rounded-full bg-white/5 backdrop-blur-xl border-blue-400/30"></div>

              {/* Inner circle with logo */}
              <div className="relative w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border-2 border-blue-300/50 shadow-2xl shadow-blue-500/50 backdrop-blur-xl">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                  <BrandLogo logoSize="lg" />
                </div>
              </div>

              {/* Animated orbiting dots */}
              <div className="absolute w-40 h-40 rounded-full animate-spin" style={{ animationDuration: '20s' }}>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
              </div>
            </div>
          </div>

          {/* Role Buttons - Arranged in Circle */}
          {roles.map((role) => (
            <div
              key={role.id}
              className="absolute"
              style={{
                top: role.position.top,
                left: role.position.left,
                right: role.position.right,
                bottom: role.position.bottom,
                transform: `translate(${role.position.translateX || 0}, ${role.position.translateY || 0})`,
              }}
            >
              <button
                onClick={() => handleRoleClick(role.id)}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
                className={`relative group w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-500 transform ${
                  activeRole === role.id ? 'scale-95 opacity-100' : hoveredRole === role.id ? 'scale-110' : 'scale-100'
                }`}
              >
                {/* Outer glow */}
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${role.color} opacity-0 ${role.hoverColor} blur-xl group-hover:opacity-75 transition-all duration-500`}
                ></div>

                {/* Glass container */}
                <div
                  className={`absolute inset-0 rounded-full bg-white/10 backdrop-blur-xl border-2 ${role.borderColor} shadow-2xl transition-all duration-500 ${role.shadowColor}`}
                ></div>

                {/* Inner circle */}
                <div
                  className={`absolute inset-1 rounded-full bg-gradient-to-br ${role.color} opacity-40 group-hover:opacity-60 transition-all duration-500 blur-sm`}
                ></div>

                {/* Content */}
                <div className="relative z-10 text-center space-y-1">
                  <div className="text-4xl drop-shadow-lg transform transition-transform group-hover:scale-125 duration-300">
                    {role.icon}
                  </div>
                  <p className="text-white font-bold text-sm drop-shadow-md">{role.label}</p>
                  <p className="text-white/70 text-xs drop-shadow-md">{role.title}</p>
                </div>

                {/* Tooltip on hover */}
                {hoveredRole === role.id && (
                  <div className="absolute bottom-full mb-4 px-4 py-2 bg-slate-900/90 backdrop-blur-md rounded-lg border border-white/20 text-white text-xs whitespace-nowrap shadow-xl z-50 animate-fade-in">
                    {role.description}
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 pb-8 text-center text-blue-200/60 text-sm">
        <p>🔐 Secure Portal • 🛡️ HIPAA Compliant • ✅ End-to-End Encrypted</p>
        <p className="mt-2">© 2026 Online Medical System. All rights reserved.</p>
      </footer>

      {/* Custom animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </main>
  );
}
