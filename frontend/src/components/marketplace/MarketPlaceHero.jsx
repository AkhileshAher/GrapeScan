export default function MarketplaceHero({ stats, onSell }) {
  const pills = [
    { value: stats.total_ads ?? "-", label: "Active listings" },
    { value: stats.total_sold ?? "-", label: "Items sold" },
    { value: "8", label: "Categories" },
    { value: "Free", label: "to post" },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-500/10 to-violet-500/[0.08] border-b border-slate-700 px-8 py-8">
      <div className="max-w-[1300px] mx-auto flex items-center justify-between gap-8 flex-wrap">
        <div>
          <h1 className="text-3xl font-extrabold mb-1.5">Farm equipment marketplace</h1>
          <p className="text-slate-400 text-sm">
            Buy & sell tractors, sprayers, irrigation, harvesters and more. Connect directly with
            farmers.
          </p>
        </div>
        <button
          onClick={onSell}
          className="px-7 py-3 rounded-xl text-white text-sm font-bold flex items-center gap-2 whitespace-nowrap bg-gradient-to-br from-indigo-500 to-purple-600 hover:opacity-90 hover:-translate-y-0.5 transition-all"
        >
          <i className="fa fa-tag" aria-hidden="true" />
          Post free ad
        </button>
      </div>

      <div className="max-w-[1300px] mx-auto flex gap-3 flex-wrap mt-4">
        {pills.map((pill) => (
          <div
            key={pill.label}
            className="bg-white/5 border border-slate-700 rounded-full px-3.5 py-1.5 text-sm flex items-center gap-1.5"
          >
            <strong className="text-emerald-500">{pill.value}</strong>
            {pill.label}
          </div>
        ))}
      </div>
    </div>
  );
}