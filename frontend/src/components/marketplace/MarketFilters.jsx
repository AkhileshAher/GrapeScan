export default function MarketFilters({ filters, onChange, onApply }) {
  const update = (field) => (e) => onChange({ ...filters, [field]: e.target.value });

  return (
    <>
      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden mb-4">
        <div className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 border-b border-slate-700">
          Price range (₹)
        </div>
        <input
          type="number"
          value={filters.minPrice}
          onChange={update("minPrice")}
          placeholder="Min price"
          className="w-full bg-transparent outline-none text-slate-100 text-sm px-4 py-2.5 border-b border-slate-700 placeholder:text-slate-500"
        />
        <input
          type="number"
          value={filters.maxPrice}
          onChange={update("maxPrice")}
          placeholder="Max price"
          className="w-full bg-transparent outline-none text-slate-100 text-sm px-4 py-2.5 placeholder:text-slate-500"
        />
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden mb-4">
        <div className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 border-b border-slate-700">
          Condition
        </div>
        <input
          value={filters.condition}
          onChange={update("condition")}
          placeholder="new / good / fair"
          className="w-full bg-transparent outline-none text-slate-100 text-sm px-4 py-2.5 placeholder:text-slate-500"
        />
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden mb-4">
        <div className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 border-b border-slate-700">
          Location
        </div>
        <input
          value={filters.location}
          onChange={update("location")}
          placeholder="e.g. Nashik"
          className="w-full bg-transparent outline-none text-slate-100 text-sm px-4 py-2.5 placeholder:text-slate-500"
        />
      </div>

      <button
        onClick={onApply}
        className="w-full py-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-bold hover:opacity-90 transition-opacity"
      >
        Apply filters
      </button>
    </>
  );
}