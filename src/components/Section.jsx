function Section({ title, children, right }) {
  return (
    <section className="rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        {right}
      </div>
      {children}
    </section>
  );
}

export default Section;