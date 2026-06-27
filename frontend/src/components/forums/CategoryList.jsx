const CATEGORIES = [
  { id: "all", icon: "🔥", label: "All topics" },
  { id: "disease", icon: "🦠", label: "Disease & pests" },
  { id: "irrigation", icon: "💧", label: "Irrigation" },
  { id: "fertilizer", icon: "🌱", label: "Fertilizers" },
  { id: "pricing", icon: "💰", label: "Pricing" },
  { id: "schemes", icon: "📋", label: "Govt schemes" },
  { id: "equipment", icon: "🚜", label: "Equipment" },
  { id: "general", icon: "💬", label: "General" },
];

export default function CategoryList({ activeCategory, onSelect, counts = {} }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
      <div className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 border-b border-slate-700">
        Categories
      </div>
      {CATEGORIES.map((cat) => (
        <div
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`flex items-center gap-2.5 px-4 py-2.5 cursor-pointer text-sm transition-colors ${
            activeCategory === cat.id
              ? "bg-violet-500/10 text-violet-400"
              : "text-slate-300 hover:bg-white/5"
          }`}
        >
          <span>{cat.icon}</span>
          <span>{cat.label}</span>
          <span className="ml-auto bg-white/[0.06] rounded-full px-2 py-0.5 text-[0.7rem] text-slate-500">
            {counts[cat.id] ?? "-"}
          </span>
        </div>
      ))}
    </div>
  );
}

export { CATEGORIES };