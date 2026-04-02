function BrandLogo({ 
  titleClassName = 'text-2xl font-extrabold tracking-wide text-slate-900',
  logoSize = 'h-12 w-auto',
  showTitle = true 
}) {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/logo.png"
        alt="Online Medical System Logo"
        className={`${logoSize} object-contain transition-transform duration-300 hover:scale-105`}
        onError={(e) => console.log("Logo failed to load from:", e.target.src)}
      />
      {showTitle && (
        <div>
          <h1 className={titleClassName}>
            Online <span className="text-blue-500">Medical</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Healthcare Platform</p>
        </div>
      )}
    </div>
  );
}

export default BrandLogo;
