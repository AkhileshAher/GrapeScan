const ICON_STYLES = {
  emerald: "bg-emerald-100 text-emerald-600",
  blue: "bg-blue-100 text-blue-600",
  red: "bg-red-100 text-red-500",
};

export default function StatCard({ icon, value, label, tone = "emerald" }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-850 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-all">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${ICON_STYLES[tone]}`}
      >
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-tight">{value}</div>
        <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
      </div>
    </div>
  );
}