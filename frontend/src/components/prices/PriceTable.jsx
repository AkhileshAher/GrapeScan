const COMMODITY_COLORS = {
  Grapes: "#8b5cf6",
  Wheat: "#fbbf24",
  Rice: "#22c55e",
  Onion: "#f97316",
  Tomato: "#ef4444",
  Cotton: "#3b82f6",
  Soybean: "#10b981",
  Pomegranate: "#e879f9",
};

function formatNum(n) {
  return n ? Number(n).toLocaleString("en-IN") : "0";
}

function LoadingState() {
  return (
    <div className="text-center py-12 text-slate-500">
      <i className="fa fa-spinner fa-spin text-3xl" aria-hidden="true" />
      <p className="mt-3">Fetching prices...</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12 text-slate-500">
      <i className="fa fa-circle-xmark text-3xl" aria-hidden="true" />
      <p className="mt-3">No data found</p>
    </div>
  );
}

export default function PriceTable({ items, status }) {
  if (status === "loading") return <LoadingState />;
  if (status === "empty") return <EmptyState />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-white/[0.02]">
            {["Commodity / Variety", "Market", "Min ₹", "Modal ₹", "Max ₹", "Date"].map((h) => (
              <th
                key={h}
                className="px-5 py-3 text-left text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => {
            const color = COMMODITY_COLORS[item.commodity] || "#8b5cf6";
            return (
              <tr key={i} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.025]">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: color }}
                    />
                    <div>
                      <div className="font-semibold text-sm">{item.commodity}</div>
                      <div className="text-xs text-slate-500">{item.variety || "-"}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="font-medium text-sm">{item.market}</div>
                  <div className="text-xs text-slate-500">{item.state}</div>
                </td>
                <td className="px-5 py-3.5 text-red-500 text-sm">₹{formatNum(item.price_min)}</td>
                <td className="px-5 py-3.5 font-bold text-sm">₹{formatNum(item.price_modal)}</td>
                <td className="px-5 py-3.5 text-emerald-500 text-sm">₹{formatNum(item.price_max)}</td>
                <td className="px-5 py-3.5 text-slate-500 text-sm">{item.arrival_date || "Today"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}