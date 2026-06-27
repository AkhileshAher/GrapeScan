export default function MarketSearchBar({ value, onChange }) {
  return (
    <div className="flex items-center gap-2 bg-slate-700/40 border border-slate-700 rounded-xl px-3 py-2">
      <i className="fa fa-search text-slate-500 text-sm" aria-hidden="true" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search equipment..."
        className="bg-transparent outline-none text-slate-100 text-sm w-[170px] placeholder:text-slate-500"
      />
    </div>
  );
}