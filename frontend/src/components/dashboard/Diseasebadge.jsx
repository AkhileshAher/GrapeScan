const BADGE_STYLES = {
  "Black Rot": "bg-slate-800 text-white",
  ESCA: "bg-orange-100 text-orange-700",
  Healthy: "bg-emerald-100 text-emerald-700",
  "Leaf Blight": "bg-amber-100 text-amber-700",
};

export default function DiseaseBadge({ disease }) {
  const style = BADGE_STYLES[disease] || "bg-slate-100 text-slate-700";
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${style}`}>
      {disease}
    </span>
  );
}