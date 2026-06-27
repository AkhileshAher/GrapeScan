export const MARKET_CATEGORIES = [
  { id: "all", icon: "🔥", label: "All equipment" },
  { id: "tractor", icon: "🚜", label: "Tractors" },
  { id: "sprayer", icon: "💦", label: "Sprayers & pumps" },
  { id: "harvester", icon: "⚙️", label: "Harvesters" },
  { id: "irrigation", icon: "💧", label: "Irrigation" },
  { id: "tools", icon: "🔧", label: "Hand tools" },
  { id: "storage", icon: "📦", label: "Storage" },
  { id: "vehicle", icon: "🛻", label: "Vehicles" },
  { id: "other", icon: "🌾", label: "Other" },
];

export default function MarketCategoryList({ activeCategory, onSelect }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden mb-4">
      <div className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 border-b border-slate-700">
        Category
      </div>
      {MARKET_CATEGORIES.map((cat) => (
        <div
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`flex items-center gap-2.5 px-4 py-2.5 cursor-pointer text-sm transition-colors ${
            activeCategory === cat.id
              ? "bg-blue-500/10 text-blue-400"
              : "text-slate-300 hover:bg-white/5"
          }`}
        >
          {cat.icon} {cat.label}
        </div>
      ))}
    </div>
  );
}