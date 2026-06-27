import { COMMODITIES } from "./PriceFilters";

export default function CommodityChips({ active, onSelect }) {
  return (
    <div className="flex gap-2 flex-wrap px-5 py-4 border-b border-slate-700">
      {COMMODITIES.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
            c === active
              ? "bg-violet-500/20 border-violet-500 text-violet-400"
              : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-100"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}