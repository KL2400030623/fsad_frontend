import { useState } from 'react';
import Section from '../components/Section';

function AdminPanel({ users, roleLabels, setUsers, platformSettings, setPlatformSettings, onResetDemoData, activeSection, setActiveSection, appointments = [], prescriptions = [] }) {
  const pendingUsers = users.filter((user) => user.status === 'Pending');
  const activeUsers = users.filter((user) => user.status === 'Active');

  // Analytics data
  const doctorCount = users.filter(u => u.role === 'doctor').length;
  const patientCount = users.filter(u => u.role === 'patient').length;
  const pharmacistCount = users.filter(u => u.role === 'pharmacist').length;
  
  const completedAppointments = appointments.filter(a => a.status === 'Completed').length;
  const pendingAppointments = appointments.filter(a => a.status === 'Pending').length;
  const approvedAppointments = appointments.filter(a => a.status === 'Approved').length;
  
  const dispensedPrescriptions = prescriptions.filter(p => p.status === 'Dispensed').length;
  const pendingPrescriptions = prescriptions.filter(p => p.status === 'Pending Fulfillment').length;
  
  const totalRevenue = prescriptions.filter(p => p.status === 'Dispensed').reduce((sum, p) => sum + (p.totalCost || 0), 0);

  // Weekly trend data (simulated)
  const weeklyData = [
    { day: 'Mon', appointments: 12, prescriptions: 8 },
    { day: 'Tue', appointments: 15, prescriptions: 11 },
    { day: 'Wed', appointments: 10, prescriptions: 7 },
    { day: 'Thu', appointments: 18, prescriptions: 14 },
    { day: 'Fri', appointments: 22, prescriptions: 16 },
    { day: 'Sat', appointments: 8, prescriptions: 5 },
    { day: 'Sun', appointments: 4, prescriptions: 2 },
  ];

  const maxAppointments = Math.max(...weeklyData.map(d => d.appointments));

  const approveUser = (userId) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === userId ? { ...user, status: 'Active' } : user
      )
    );
  };

  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers((current) => current.filter((user) => user.id !== userId));
    }
  };

  const toggleUserStatus = (userId) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user
      )
    );
  };

  return (
    <div className="space-y-6">
        {/* Dashboard Overview Section */}
        {activeSection === 'dashboard' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <Section title="📊 System Overview">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-5 text-white shadow-lg">
                  <p className="text-blue-100 text-sm font-medium">Total Users</p>
                  <p className="text-4xl font-black mt-1">{users.length}</p>
                  <p className="text-blue-200 text-xs mt-2">👨‍⚕️ {doctorCount} Doctors • 👥 {patientCount} Patients</p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 text-white shadow-lg">
                  <p className="text-emerald-100 text-sm font-medium">Completed Appointments</p>
                  <p className="text-4xl font-black mt-1">{completedAppointments}</p>
                  <p className="text-emerald-200 text-xs mt-2">This month</p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 p-5 text-white shadow-lg">
                  <p className="text-amber-100 text-sm font-medium">Pending Approvals</p>
                  <p className="text-4xl font-black mt-1">{pendingUsers.length + pendingAppointments}</p>
                  <p className="text-amber-200 text-xs mt-2">🔔 Requires attention</p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 p-5 text-white shadow-lg">
                  <p className="text-purple-100 text-sm font-medium">Revenue</p>
                  <p className="text-4xl font-black mt-1">${totalRevenue.toFixed(0)}</p>
                  <p className="text-purple-200 text-xs mt-2">From {dispensedPrescriptions} prescriptions</p>
                </div>
              </div>
            </Section>

            {/* Weekly Activity Chart */}
            <Section title="📈 Weekly Activity Trends">
              <div className="space-y-4">
                <div className="flex items-center gap-6 text-sm">
                  <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Appointments</span>
                  <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Prescriptions</span>
                </div>
                <div className="flex items-end justify-between gap-2 h-48 pt-4">
                  {weeklyData.map((day, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex gap-1 items-end justify-center h-36">
                        <div 
                          className="w-5 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm transition-all hover:opacity-80"
                          style={{ height: `${(day.appointments / maxAppointments) * 100}%` }}
                          title={`${day.appointments} appointments`}
                        ></div>
                        <div 
                          className="w-5 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-sm transition-all hover:opacity-80"
                          style={{ height: `${(day.prescriptions / maxAppointments) * 100}%` }}
                          title={`${day.prescriptions} prescriptions`}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-slate-600">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Role Distribution */}
            <div className="grid gap-6 md:grid-cols-2">
              <Section title="👥 User Distribution by Role">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Doctors</span>
                      <span className="font-bold">{doctorCount}</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: `${(doctorCount / users.length) * 100}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Patients</span>
                      <span className="font-bold">{patientCount}</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" style={{ width: `${(patientCount / users.length) * 100}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Pharmacists</span>
                      <span className="font-bold">{pharmacistCount}</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full" style={{ width: `${(pharmacistCount / users.length) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </Section>

              <Section title="📋 Appointment Status">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>✅ Completed</span>
                      <span className="font-bold text-emerald-600">{completedAppointments}</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${appointments.length ? (completedAppointments / appointments.length) * 100 : 0}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>✓ Approved</span>
                      <span className="font-bold text-blue-600">{approvedAppointments}</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${appointments.length ? (approvedAppointments / appointments.length) * 100 : 0}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>⏳ Pending</span>
                      <span className="font-bold text-amber-600">{pendingAppointments}</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${appointments.length ? (pendingAppointments / appointments.length) * 100 : 0}%` }}></div>
                    </div>
                  </div>
                </div>
              </Section>
            </div>

            {/* Recent Activity */}
            <Section title="🕐 Recent System Activity">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-medium text-slate-900">Prescription Dispensed</p>
                    <p className="text-sm text-slate-600">Pharm. Lena Kim dispensed medication to Alice Brown</p>
                  </div>
                  <span className="ml-auto text-xs text-slate-500">2 min ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-2xl">📅</span>
                  <div>
                    <p className="font-medium text-slate-900">New Appointment</p>
                    <p className="text-sm text-slate-600">John Mensah booked with Dr. Emily Williams</p>
                  </div>
                  <span className="ml-auto text-xs text-slate-500">15 min ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <span className="text-2xl">👤</span>
                  <div>
                    <p className="font-medium text-slate-900">User Pending Approval</p>
                    <p className="text-sm text-slate-600">Dr. James Wilson requested account access</p>
                  </div>
                  <span className="ml-auto text-xs text-slate-500">1 hour ago</span>
                </div>
              </div>
            </Section>
          </div>
        )}

        {/* User Accounts Section */}
        {activeSection === 'users' && (
          <div className="space-y-6">
            {/* Pending Approvals Section */}
            {pendingUsers.length > 0 && (
              <Section title="Pending Approvals">
                <div className="space-y-3">
                  <p className="text-sm text-slate-600 mb-4">
                    New staff accounts require admin approval before they can access the system.
                  </p>
                  {pendingUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between rounded-lg border-2 border-amber-200 bg-amber-50 p-4">
                      <div>
                        <p className="font-semibold text-slate-900">{user.name}</p>
                        <p className="text-sm text-slate-600">{roleLabels[user.role]} • {user.contact}</p>
                        <span className="inline-block mt-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                          Awaiting Approval
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => approveUser(user.id)}
                          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition"
                        >
                          ✓ Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteUser(user.id)}
                          className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 transition"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Active Users Section */}
            <Section title="Active User Accounts">
              <div className="space-y-3">
                {activeUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-slate-500">{roleLabels[user.role]} • {user.contact}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleUserStatus(user.id)}
                        className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                          user.status === 'Active' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                        }`}
                      >
                        {user.status === 'Active' ? 'Active' : 'Inactive'}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteUser(user.id)}
                        className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition"
                        title="Delete User"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* Security Settings Section */}
        {activeSection === 'security' && (
          <Section title="Platform Security Settings">
            <div className="space-y-4">
              <label className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <span className="font-medium">Enforce Two-Factor Authentication</span>
                <input
                  type="checkbox"
                  checked={platformSettings.enforce2FA}
                  onChange={(event) =>
                    setPlatformSettings((current) => ({
                      ...current,
                      enforce2FA: event.target.checked,
                    }))
                  }
                />
              </label>

              <label className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <span className="font-medium">Encrypt Medical Data at Rest</span>
                <input
                  type="checkbox"
                  checked={platformSettings.encryptAtRest}
                  onChange={(event) =>
                    setPlatformSettings((current) => ({
                      ...current,
                      encryptAtRest: event.target.checked,
                    }))
                  }
                />
              </label>

              <label className="block rounded-lg border border-slate-200 p-3">
                <span className="font-medium">Data Retention (months)</span>
                <input
                  type="number"
                  min="12"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={platformSettings.retentionMonths}
                  onChange={(event) =>
                    setPlatformSettings((current) => ({
                      ...current,
                      retentionMonths: Number(event.target.value),
                    }))
                  }
                />
              </label>
            </div>
          </Section>
        )}

        {/* Data Controls Section */}
        {activeSection === 'data' && (
          <Section title="Data Controls">
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-rose-200 bg-rose-50 p-4">
                <p className="font-semibold text-rose-900 mb-3">⚠️ Danger Zone</p>
                <p className="text-sm text-rose-700 mb-4">Resetting demo data will clear all modifications and restore the system to its initial state.</p>
                <button
                  type="button"
                  className="w-full rounded-lg bg-rose-600 px-4 py-2 font-semibold text-white hover:bg-rose-700"
                  onClick={onResetDemoData}
                >
                  🔄 Reset Demo Data
                </button>
              </div>
            </div>
          </Section>
        )}
      </div>
    );
  }

export default AdminPanel;