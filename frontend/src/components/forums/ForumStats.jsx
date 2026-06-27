export default function ForumStats({ stats }) {
  const items = [
    { label: "Threads", value: stats.total_threads },
    { label: "Replies", value: stats.total_replies },
    { label: "Resolved", value: stats.resolved_threads },
    { label: "Members", value: stats.total_members },
  ];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden mb-4">
      <div className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 border-b border-slate-700">
        Forum stats
      </div>
      <div className="grid grid-cols-2 gap-2 p-4">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-xl font-extrabold text-violet-500">{item.value ?? "-"}</div>
            <div className="text-[0.68rem] text-slate-500">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}