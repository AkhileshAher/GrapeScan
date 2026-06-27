import DiseaseBadge from "./DiseaseBadge";

function confidenceColor(confidence) {
  if (confidence >= 80) return "text-emerald-600";
  if (confidence >= 50) return "text-amber-500";
  return "text-red-500";
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

function FallbackThumb() {
  return (
    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-lg">
      🍃
    </div>
  );
}

function PredictionRow({ prediction }) {
  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors">
      <td className="py-3 px-4">
        <img
          src={`/uploads/${prediction.image_path}`}
          alt={prediction.prediction}
          loading="lazy"
          className="w-12 h-12 rounded-lg object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextSibling?.classList.remove("hidden");
          }}
        />
        <div className="hidden">
          <FallbackThumb />
        </div>
      </td>
      <td className="py-3 px-4">
        <DiseaseBadge disease={prediction.prediction} />
      </td>
      <td className={`py-3 px-4 font-semibold ${confidenceColor(prediction.confidence)}`}>
        {prediction.confidence.toFixed(1)}%
      </td>
      <td className="py-3 px-4 text-sm text-slate-500">{formatDate(prediction.date)}</td>
    </tr>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center text-center py-14 px-4">
      <span className="text-5xl mb-3">🔬</span>
      <h4 className="text-lg font-semibold text-slate-800 mb-1">No predictions yet</h4>
      <p className="text-slate-500 mb-5">Upload your first grape leaf image to get started!</p>
      <a
        href="/predict-page"
        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-xl transition-colors"
      >
        🔬 Make Your First Prediction
      </a>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center text-center py-14 px-4 text-slate-500">
      <span className="text-4xl mb-3">⏳</span>
      <p>Loading prediction history...</p>
    </div>
  );
}

function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center text-center py-14 px-4">
      <span className="text-4xl mb-3">⚠️</span>
      <p className="text-slate-600 mb-4">Failed to load prediction history.</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-5 py-2.5 rounded-xl transition-colors"
      >
        🔄 Retry
      </button>
    </div>
  );
}

export default function PredictionHistory({ predictions, status, onRetry }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">📋 Prediction History</h3>

      {status === "loading" && <LoadingState />}
      {status === "error" && <ErrorState onRetry={onRetry} />}
      {status === "ready" && predictions.length === 0 && <EmptyState />}

      {status === "ready" && predictions.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400">
                <th className="py-2.5 px-4 font-medium">Image</th>
                <th className="py-2.5 px-4 font-medium">Disease</th>
                <th className="py-2.5 px-4 font-medium">Confidence</th>
                <th className="py-2.5 px-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((p, i) => (
                <PredictionRow key={p.id ?? i} prediction={p} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}