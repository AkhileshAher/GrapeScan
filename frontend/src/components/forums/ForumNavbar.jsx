export default function ForumNavbar({ backHref, backLabel, title, gradientTitle = false, right }) {
  return (
    <nav className="sticky top-0 z-50 flex items-center gap-4 px-8 py-3 bg-slate-900 border-b border-slate-700">
      <a
        href={backHref}
        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-emerald-500 transition-colors"
      >
        <i className="fa fa-arrow-left" aria-hidden="true" />
        {backLabel}
      </a>

      {gradientTitle ? (
        <div className="text-lg font-bold bg-gradient-to-br from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          {title}
        </div>
      ) : (
        <span className="font-semibold text-sm text-slate-100 truncate">{title}</span>
      )}

      {right && <div className="ml-auto flex items-center gap-2">{right}</div>}
    </nav>
  );
}