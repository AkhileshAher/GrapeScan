function StatCard({ label, value, valueClass, sub }) {
  return (
    <div className="relative bg-slate-800 border border-slate-700 rounded-2xl p-5 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-purple-600" />
      <div className="text-xs text-slate-500 mb-1.5">{label}</div>
      <div className={`text-2xl font-extrabold ${valueClass}`}>{value}</div>
      <div className="text-xs text-slate-400 mt-1">{sub}</div>
    </div>
  );
}

export default function PriceStatsRow({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        label="Average modal price"
        value={stats.avg !== null ? `₹${stats.avg}` : "---"}
        valueClass="text-emerald-500"
        sub="per quintal"
      />
      <StatCard
        label="Highest price"
        value={stats.high !== null ? `₹${stats.high}` : "---"}
        valueClass="text-amber-400"
        sub="per quintal"
      />
      <StatCard
        label="Lowest price"
        value={stats.low !== null ? `₹${stats.low}` : "---"}
        valueClass="text-red-500"
        sub="per quintal"
      />
      <StatCard
        label="Markets tracked"
        value={stats.markets !== null ? stats.markets : "---"}
        valueClass="text-blue-500"
        sub="today"
      />
    </div>
  );
}