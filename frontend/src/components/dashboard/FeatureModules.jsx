const MODULES = [
  {
    href: "/chatbot",
    icon: "🤖",
    title: "KrishiBot",
    subtitle: "AI Advisor",
    from: "from-violet-500/15",
    to: "to-indigo-500/5",
    border: "border-violet-400/30",
  },
  {
    href: "/schemes",
    icon: "📋",
    title: "Schemes",
    subtitle: "Subsidies & Carbon Credits",
    from: "from-emerald-500/15",
    to: "to-green-600/5",
    border: "border-emerald-400/25",
  },
  {
    href: "/prices",
    icon: "📈",
    title: "Mandi Prices",
    subtitle: "Live market rates",
    from: "from-amber-400/15",
    to: "to-amber-500/5",
    border: "border-amber-400/30",
  },
  {
    href: "/recommendations?disease=Black+Rot",
    icon: "💊",
    title: "Recommendations",
    subtitle: "Disease treatment guide",
    from: "from-red-500/15",
    to: "to-red-600/5",
    border: "border-red-400/25",
  },
  {
    href: "/forum",
    icon: "💬",
    title: "Community Forum",
    subtitle: "Ask experts & farmers",
    from: "from-blue-500/15",
    to: "to-blue-600/5",
    border: "border-blue-400/25",
  },
  {
    href: "/marketplace",
    icon: "🚜",
    title: "Equipment Market",
    subtitle: "Buy & sell farm tools",
    from: "from-teal-500/15",
    to: "to-teal-600/5",
    border: "border-teal-400/25",
  },
];

function ModuleCard({ href, icon, title, subtitle, from, to, border }) {
  return (
    <a
      href={href}
      className={`flex items-center gap-3.5 rounded-2xl border ${border} bg-gradient-to-br ${from} ${to} px-4 py-5 transition-transform duration-200 hover:-translate-y-1`}
    >
      <span className="text-3xl shrink-0">{icon}</span>
      <div>
        <div className="font-bold text-slate-800 leading-tight">{title}</div>
        <div className="text-sm text-slate-600 leading-tight">{subtitle}</div>
      </div>
    </a>
  );
}

export default function FeatureModules() {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">🚀 Feature Modules</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {MODULES.map((mod) => (
          <ModuleCard key={mod.href} {...mod} />
        ))}
      </div>
    </div>
  );
}