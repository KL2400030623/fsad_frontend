import Section from './Section';

function WorkspaceSummary({ activeRole, roleLabels, currentActor, currentUser, staffOptions, setActiveActor, counts }) {
  return (
    <Section
      title={`${roleLabels[activeRole]} Workspace`}
      right={
        currentUser ? (
          // Display logged-in user info (no switching allowed)
          <div className="rounded-lg border border-blue-500 bg-blue-50 px-4 py-2">
            <p className="text-xs text-blue-600 font-medium">Logged in as:</p>
            <p className="text-sm font-semibold text-blue-900">{currentUser.name}</p>
          </div>
        ) : (
          // Legacy mode: allow switching between users (for testing)
          <select
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={currentActor}
            onChange={(event) =>
              setActiveActor((current) => ({
                ...current,
                [activeRole]: event.target.value,
              }))
            }
          >
            {staffOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        )
      }
    >
      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs uppercase text-slate-500">Users</p>
          <p className="mt-1 text-2xl font-bold">{counts.users}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs uppercase text-slate-500">Appointments</p>
          <p className="mt-1 text-2xl font-bold">{counts.appointments}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs uppercase text-slate-500">Pending Rx</p>
          <p className="mt-1 text-2xl font-bold">{counts.pendingRx}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs uppercase text-slate-500">Lab Reports</p>
          <p className="mt-1 text-2xl font-bold">{counts.reports}</p>
        </div>
      </div>
    </Section>
  );
}

export default WorkspaceSummary;