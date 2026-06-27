export default function ImagePreview({ previewUrl, onAnalyze, analyzing }) {
  if (!previewUrl) return null;

  return (
    <div className="mt-6 text-center">
      <img
        src={previewUrl}
        alt="Selected leaf image preview"
        className="max-w-full max-h-[360px] rounded-2xl border border-slate-200 mx-auto"
      />
      <div className="mt-5">
        <button
          onClick={onAnalyze}
          disabled={analyzing}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          {analyzing ? "⏳ Analyzing..." : "🧠 Analyze disease"}
        </button>
      </div>
    </div>
  );
}