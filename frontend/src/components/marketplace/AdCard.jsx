const CAT_ICONS = {
  tractor: "🚜",
  sprayer: "💦",
  harvester: "⚙️",
  irrigation: "💧",
  tools: "🔧",
  storage: "📦",
  vehicle: "🛻",
  other: "🌾",
};

const COND_STYLES = {
  new: "bg-emerald-500/20 text-emerald-500",
  good: "bg-blue-500/20 text-blue-500",
  fair: "bg-amber-400/20 text-amber-400",
  poor: "bg-red-500/20 text-red-500",
};

export default function AdCard({ ad }) {
  const whatsappHref = ad.user_phone
    ? `https://wa.me/91${ad.user_phone.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Hi, I am interested in your ad: ${ad.title}`
      )}`
    : null;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:border-blue-500">
      <div className="h-40 bg-gradient-to-br from-[#1e2d4a] to-[#243050] flex items-center justify-center text-5xl relative">
        {CAT_ICONS[ad.category] || "🌾"}
        <span
          className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-[0.68rem] font-bold ${
            COND_STYLES[ad.condition] || COND_STYLES.good
          }`}
        >
          {ad.condition}
        </span>
      </div>

      <div className="p-4">
        <div className="font-bold text-sm leading-snug mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
          {ad.title}
        </div>
        <div className="text-xl font-extrabold text-emerald-500 mb-2">
          ₹{Number(ad.price).toLocaleString("en-IN")}
          {ad.negotiable && (
            <span className="text-xs text-slate-500 font-normal ml-1.5">(Negotiable)</span>
          )}
        </div>
        <div className="flex gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <i className="fa fa-map-marker" aria-hidden="true" /> {ad.location || "N/A"}
          </span>
          <span className="flex items-center gap-1">
            <i className="fa fa-clock" aria-hidden="true" /> {ad.created_at}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.04] text-xs text-slate-500">
        <span>
          <i className="fa fa-user" aria-hidden="true" /> {ad.user_name}
        </span>
        {whatsappHref ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 rounded-lg text-xs font-bold hover:bg-emerald-500/25 transition-colors"
          >
            <i className="fa-brands fa-whatsapp" aria-hidden="true" /> Contact
          </a>
        ) : (
          <span className="px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 rounded-lg text-xs font-bold">
            Contact
          </span>
        )}
      </div>
    </div>
  );
}