const VARIANTS = {
  farmer: "bg-emerald-500/15 text-emerald-500",
  consultant: "bg-violet-500/15 text-violet-500",
  resolved: "bg-emerald-600/15 text-emerald-500",
  open: "bg-amber-400/15 text-amber-400",
  category: "bg-white/[0.06] text-slate-500",
};

export function RoleBadge({ role, size = "sm" }) {
  const label = role === "consultant" ? "👨‍💼 Consultant" : "👩‍🌾 Farmer";
  const sizeClass = size === "xs" ? "text-[0.65rem] px-2 py-0.5" : "text-xs px-2.5 py-1";
  return (
    <span className={`rounded-full font-bold ${sizeClass} ${VARIANTS[role] || VARIANTS.farmer}`}>
      {label}
    </span>
  );
}

export function StatusBadge({ resolved }) {
  return (
    <span
      className={`rounded-full text-xs font-bold px-2.5 py-1 ${
        resolved ? VARIANTS.resolved : VARIANTS.open
      }`}
    >
      {resolved ? "✓ Resolved" : "Open"}
    </span>
  );
}

export function CategoryBadge({ category }) {
  return (
    <span className={`rounded-full text-xs font-bold px-2.5 py-1 ${VARIANTS.category}`}>
      {category}
    </span>
  );
}