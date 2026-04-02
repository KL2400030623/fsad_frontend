import { NavLink } from 'react-router-dom';

const ROLE_ICONS = {
  admin: '⚙️',
  doctor: '🩺',
  patient: '👤',
  pharmacist: '💊',
};

const roleLabels = {
  admin: 'Admin',
  doctor: 'Doctor',
  patient: 'Patient Portal',
  pharmacist: 'Pharmacist',
};

const ROLE_PATHS = {
  admin: '/admin/dashboard',
  doctor: '/doctor/dashboard',
  patient: '/patient/dashboard',
  pharmacist: '/pharmacist/dashboard',
};

const roleDescriptions = {
  admin: 'Manage users, system settings, and platform configurations',
  doctor: 'Access consultations, prescriptions, and patient records',
  patient: 'Book appointments, track health records, and manage prescriptions',
  pharmacist: 'Process prescriptions, manage inventory, and fulfill orders',
};

const roleColors = {
  admin: 'from-purple-600 to-purple-700',
  doctor: 'from-blue-600 to-blue-700',
  patient: 'from-emerald-600 to-teal-700',
  pharmacist: 'from-amber-600 to-orange-700',
};

export default function DashboardAccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
      {/* Fixed Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200 bg-white/95 shadow-lg backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <NavLink to="/" className="text-2xl font-bold text-slate-900">
            🏥 Online Medical System
          </NavLink>
          <NavLink
            to="/"
            className="rounded-lg px-6 py-2 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Back to Home
          </NavLink>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 pt-24">
        {/* Header Section */}
        <section className="space-y-6 text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
            Dashboard Access
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
            Choose your role to access the appropriate dashboard and manage your activities
          </p>
        </section>

        {/* Dashboard Cards - Grid Layout */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          {['admin', 'doctor', 'patient', 'pharmacist'].map((role) => (
            <NavLink
              key={role}
              to={ROLE_PATHS[role]}
              className="group relative"
            >
              <div className={`bg-gradient-to-br ${roleColors[role]} rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 text-6xl">{ROLE_ICONS[role]}</div>
                  <div className="absolute bottom-4 right-4 text-6xl opacity-20">{ROLE_ICONS[role]}</div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm">
                      {ROLE_ICONS[role]}
                    </div>
                    <h2 className="text-3xl font-bold">{roleLabels[role]}</h2>
                  </div>
                  <p className="text-white/90 text-lg mb-6">{roleDescriptions[role]}</p>
                  <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition">
                    <span className="text-lg font-semibold">Access Dashboard</span>
                    <span className="text-2xl">→</span>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </section>

        {/* Alternative Circular Layout */}
        <section className="space-y-12 mb-16">
          <h2 className="text-4xl font-bold text-slate-900 text-center">Login to Your Portal</h2>
          
          <div className="relative flex items-center justify-center mb-12">
            {/* Center Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <div className="text-5xl mb-2">🏥</div>
                  <p className="font-bold text-slate-900 text-center leading-tight">
                    <span className="block">Online</span>
                    <span className="block">Medical</span>
                    <span className="block text-sm">System</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Role Circles */}
            <div className="w-full max-w-2xl aspect-square relative">
              {[
                { role: 'admin', angle: 0 },
                { role: 'doctor', angle: 90 },
                { role: 'patient', angle: 180 },
                { role: 'pharmacist', angle: 270 },
              ].map(({ role, angle }) => {
                const radius = 320;
                const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

                return (
                  <NavLink
                    key={role}
                    to={ROLE_PATHS[role]}
                    className="absolute w-32 h-32 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${roleColors[role]} p-1 shadow-lg hover:shadow-2xl transition transform hover:scale-110 cursor-pointer flex items-center justify-center flex-col text-white hover:bg-gradient-to-t`}>
                      <div className="text-3xl mb-1">{ROLE_ICONS[role]}</div>
                      <div className="text-xs font-bold text-center leading-tight">{roleLabels[role]}</div>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="space-y-8 py-16 border-t border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 text-center">Dashboard Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { role: 'admin', features: ['User Management', 'System Configuration', 'Analytics Dashboard', 'Security Controls'] },
              { role: 'doctor', features: ['Patient Consultations', 'Prescription Management', 'Appointment Scheduling', 'Medical Records'] },
              { role: 'patient', features: ['Book Appointments', 'View Medical Records', 'Track Prescriptions', 'Health History'] },
              { role: 'pharmacist', features: ['Prescription Queue', 'Order Fulfillment', 'Inventory Management', 'Patient Notifications'] },
            ].map((item) => (
              <div key={item.role} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`text-3xl`}>{ROLE_ICONS[item.role]}</div>
                  <h3 className="text-lg font-bold text-slate-900">{roleLabels[item.role]} Features</h3>
                </div>
                <ul className="space-y-2">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="text-slate-600 flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl px-8 text-center space-y-6">
          <h2 className="text-3xl font-bold text-slate-900">Need Help?</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Don't have an account yet? Register now to access your role-specific dashboard.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <NavLink
              to="/"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
            >
              Register Now
            </NavLink>
            <NavLink
              to="/about"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition"
            >
              Learn More
            </NavLink>
          </div>
        </section>
      </div>
    </main>
  );
}
