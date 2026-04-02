function StatusPill({ value }) {
  const styleByValue = {
    Booked: 'bg-blue-100 text-blue-700 border-blue-200',
    Pending: 'bg-amber-100 text-amber-700 border-amber-200',
    Approved: 'bg-blue-100 text-blue-700 border-blue-200',
    Rejected: 'bg-rose-100 text-rose-700 border-rose-200',
    Completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Pending Fulfillment': 'bg-amber-100 text-amber-700 border-amber-200',
    Dispensed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Reviewed: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  };

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-bold border ${styleByValue[value] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
      {value}
    </span>
  );
}

export default StatusPill;