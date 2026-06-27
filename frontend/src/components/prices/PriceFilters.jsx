const COMMODITIES = ["Grapes", "Wheat", "Rice", "Onion", "Tomato", "Cotton", "Soybean", "Pomegranate"];
const STATES = ["Maharashtra"];

export default function PriceFilters({ commodity, state, onCommodityChange, onStateChange, onRefresh }) {
  return (
    <div className="flex gap-3 flex-wrap">
      <div className="flex items-center gap-2 bg-white/5 border border-slate-700 rounded-xl px-3 py-2">
        <i className="fa fa-wheat-awn text-slate-500" aria-hidden="true" />
        <select
          value={commodity}
          onChange={(e) => onCommodityChange(e.target.value)}
          className="bg-transparent outline-none text-slate-100 text-sm cursor-pointer"
        >
          {COMMODITIES.map((c) => (
            <option key={c} value={c} className="bg-slate-900">
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 bg-white/5 border border-slate-700 rounded-xl px-3 py-2">
        <i className="fa fa-map-marker text-slate-500" aria-hidden="true" />
        <select
          value={state}
          onChange={(e) => onStateChange(e.target.value)}
          className="bg-transparent outline-none text-slate-100 text-sm cursor-pointer"
        >
          {STATES.map((s) => (
            <option key={s} value={s} className="bg-slate-900">
              {s}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onRefresh}
        className="px-5 py-2 rounded-xl text-white text-sm font-semibold flex items-center gap-2 bg-gradient-to-br from-indigo-500 to-purple-600 hover:opacity-85 transition-opacity"
      >
        <i className="fa fa-rotate-right" aria-hidden="true" />
        Refresh
      </button>
    </div>
  );
}

export { COMMODITIES };