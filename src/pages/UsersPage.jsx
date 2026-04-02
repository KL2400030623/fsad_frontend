import Section from '../components/Section';

function UsersPage({ users, setUsers, roleLabels }) {
  const toggleUserStatus = (userId) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user
      )
    );
  };

  return (
    <div className="space-y-6">
      <Section title="User Management">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase text-slate-600">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-slate-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">{user.id}</td>
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        {roleLabels[user.role] || user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          user.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium text-white transition ${
                          user.status === 'Active'
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                      >
                        {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="User Statistics">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {Object.entries(roleLabels).map(([roleKey, roleLabel]) => {
            const count = users.filter((u) => u.role === roleKey).length;
            const activeCount = users.filter((u) => u.role === roleKey && u.status === 'Active').length;
            return (
              <div key={roleKey} className="rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="text-sm font-medium text-slate-600">{roleLabel}</h4>
                <p className="mt-2 text-2xl font-bold text-slate-800">{count}</p>
                <p className="mt-1 text-xs text-slate-500">{activeCount} active</p>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

export default UsersPage;
