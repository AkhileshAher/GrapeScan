import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ForumNavbar from "../components/forums/ForumNavbar";

const SEV_CONFIG = {
  High: {
    cls: "bg-red-500/10 border-red-500/30 text-red-200",
    tagBg: "rgba(239, 68, 68, 0.2)",
    tagColor: "#ef4444",
    icon: "⚠️",
  },
  "Very High": {
    cls: "bg-red-705/10 border-red-600/40 text-red-100",
    tagBg: "rgba(220, 38, 38, 0.25)",
    tagColor: "#dc2626",
    icon: "🚨",
  },
  Medium: {
    cls: "bg-amber-500/10 border-amber-500/30 text-amber-200",
    tagBg: "rgba(251, 191, 36, 0.2)",
    tagColor: "#fbbf24",
    icon: "⚡",
  },
  None: {
    cls: "bg-emerald-500/10 border-emerald-500/30 text-emerald-200",
    tagBg: "rgba(34, 197, 94, 0.2)",
    tagColor: "#22c55e",
    icon: "✅",
  },
  Unknown: {
    cls: "bg-slate-500/10 border-slate-500/30 text-slate-200",
    tagBg: "rgba(100, 116, 139, 0.2)",
    tagColor: "#94a3b8",
    icon: "❓",
  },
};

const TYPE_CLASSES = {
  Chemical: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Biological: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  Organic: "bg-emerald-600/10 text-emerald-400 border border-emerald-600/20",
  "Preventive Chemical": "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  "Wood Treatment": "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  "Consult Expert": "bg-amber-500/10 text-amber-400 border border-amber-500/20",
};

const DISEASES = [
  { label: "🌿 Healthy", value: "Healthy" },
  { label: "🦠 Black Rot", value: "Black Rot" },
  { label: "🍇 Esca", value: "Esca (Black Measles)" },
  { label: "🍂 Leaf Blight", value: "Leaf Blight (Isariopsis Leaf Spot)" },
];

export default function Recommendations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);

  const activeDisease = searchParams.get("disease") || "Healthy";

  const loadRecommendation = async (diseaseName) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/recommend?disease=${encodeURIComponent(diseaseName)}`);
      const data = await res.json();
      if (data.success) {
        setRecommendation(data.recommendation);
      } else {
        setRecommendation(null);
      }
    } catch (error) {
      console.error("Failed to load recommendation:", error);
      setRecommendation(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecommendation(activeDisease);
  }, [activeDisease]);

  const selectDisease = (val) => {
    setSearchParams({ disease: val });
  };

  const r = recommendation;
  const sev = r ? (SEV_CONFIG[r.severity] || SEV_CONFIG["Unknown"]) : SEV_CONFIG["Unknown"];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <ForumNavbar
        backHref="/predict-page"
        backLabel="Back to Predict"
        title="💊 Disease Recommendations"
        gradientTitle
      />

      <div className="max-w-[1000px] mx-auto px-6 py-8">
        {/* Selector Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
            Select Disease to View Treatment Guide
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {DISEASES.map((d) => (
              <button
                key={d.value}
                onClick={() => selectDisease(d.value)}
                className={`px-4.5 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:scale-[1.01] ${
                  activeDisease === d.value
                    ? "bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-950/20"
                    : "border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content body */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-500">
            <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4" />
            <p>Fetching scientific recommendations...</p>
          </div>
        ) : !r ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
            ❌ Recommendation data not found.
          </div>
        ) : (
          <div className="space-y-6">
            {/* Severity Banner */}
            <div className={`border rounded-2xl p-6 flex items-start gap-4 ${sev.cls}`}>
              <div className="text-4xl shrink-0 leading-none">{sev.icon}</div>
              <div>
                <h1 className="text-2xl font-black tracking-tight">{r.disease_name}</h1>
                {r.scientific_name && (
                  <p className="text-xs text-slate-400 italic mt-0.5 mb-3">{r.scientific_name}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: sev.tagBg, color: sev.tagColor }}
                  >
                    Severity: {r.severity}
                  </span>
                  {r.recovery_time && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400">
                      Recovery: {r.recovery_time}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <p className="text-slate-300 text-sm leading-relaxed">{r.description}</p>
            </div>

            {/* Symptoms & Prevention grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Symptoms */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 bg-slate-950/60 border-b border-slate-850 font-bold text-xs uppercase tracking-wider text-red-400 flex items-center gap-2">
                  <span>🔬</span> Disease Symptoms
                </div>
                <div className="p-5 space-y-3">
                  {(r.symptoms || []).length > 0 ? (
                    (r.symptoms || []).map((symptom, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-slate-300 flex items-start gap-2.5 pb-2.5 last:pb-0 last:border-b-0 border-b border-slate-850"
                      >
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0 mt-1.5" />
                        <span>{symptom}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500">No symptomatic reports.</p>
                  )}
                </div>
              </div>

              {/* Prevention */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 bg-slate-950/60 border-b border-slate-850 font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <span>🛡️</span> Preventive Measures
                </div>
                <div className="p-5 space-y-3">
                  {(r.preventive_measures || []).length > 0 ? (
                    (r.preventive_measures || []).map((p, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-slate-300 flex items-start gap-2 pb-2.5 last:pb-0 last:border-b-0 border-b border-slate-850"
                      >
                        <span className="text-emerald-500 shrink-0 font-bold">✓</span>
                        <span>{p}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500">No preventative advice available.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Treatment Options */}
            <div>
              <h3 className="text-base font-bold text-slate-300 mb-4">💊 Treatment Options</h3>
              {(r.treatments || []).length > 0 ? (
                <div className="space-y-4">
                  {(r.treatments || []).map((t, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
                    >
                      <div className="px-5 py-3.5 bg-slate-950/40 border-b border-slate-850 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              TYPE_CLASSES[t.type] || "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {t.type}
                          </span>
                          <span className="text-sm font-extrabold text-slate-200">{t.name}</span>
                        </div>
                      </div>

                      <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-slate-950/50 border border-slate-850/80 p-3.5 rounded-xl">
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Dosage
                          </div>
                          <div className="text-xs text-slate-300 font-semibold">{t.dosage}</div>
                        </div>

                        <div className="bg-slate-950/50 border border-slate-850/80 p-3.5 rounded-xl">
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Frequency
                          </div>
                          <div className="text-xs text-slate-300 font-semibold">{t.frequency}</div>
                        </div>

                        <div className="bg-slate-950/50 border border-slate-850/80 p-3.5 rounded-xl">
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Estimated Cost
                          </div>
                          <div className="text-xs text-slate-300 font-semibold">{t.cost_estimate}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No specific medical treatments required.</p>
              )}
            </div>

            {/* Spray Timing */}
            {r.best_time_to_spray && (
              <div className="bg-amber-500/5 border border-amber-500/25 rounded-2xl p-4.5 flex items-start gap-3">
                <span className="text-lg shrink-0">☀️</span>
                <div className="text-xs sm:text-sm text-slate-300">
                  <strong>Best Time to Spray:</strong> {r.best_time_to_spray}
                </div>
              </div>
            )}

            {/* Cost Analysis Card */}
            {r.cost_analysis && r.cost_analysis.treatment_cost_per_acre && (
              <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 rounded-2xl p-6">
                <div className="font-bold text-sm text-slate-200 mb-1 flex items-center gap-1.5">
                  <span>💰</span> Cost-Benefit Analysis
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  {r.cost_analysis.roi || ""}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                  <div className="bg-slate-950/50 border border-slate-850 p-4 rounded-xl text-center">
                    <div className="text-base font-bold text-emerald-400">
                      {r.cost_analysis.treatment_cost_per_acre}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-wider">
                      Cost per Acre
                    </div>
                  </div>

                  <div className="bg-slate-950/50 border border-slate-850 p-4 rounded-xl text-center">
                    <div className="text-base font-bold text-red-400">
                      {r.cost_analysis.potential_loss_if_untreated || "N/A"}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-wider">
                      Loss if Untreated
                    </div>
                  </div>

                  <div className="bg-slate-950/50 border border-slate-850 p-4 rounded-xl text-center">
                    <div className="text-base font-bold text-amber-400">
                      {r.estimated_yield_loss || "N/A"}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-wider">
                      Yield Loss Est.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Govt assistance and credits */}
            {r.government_assistance && (
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4.5">
                <div className="text-xs text-slate-300">
                  <strong className="text-blue-400 mr-1">🏛️ Government Assistance:</strong>
                  {r.government_assistance}
                </div>
              </div>
            )}

            {/* Chatbot CTA */}
            <Link
              to="/chatbot"
              className="flex items-center gap-4 bg-gradient-to-r from-violet-500/10 to-indigo-500/5 hover:from-violet-500/15 border border-violet-500/20 rounded-2xl p-6 hover:border-violet-500/40 transition-all group"
            >
              <div className="text-4xl shrink-0">🤖</div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-100 mb-1 group-hover:text-violet-400 transition-colors">
                  Need more help? Chat with KrishiBot
                </h4>
                <p className="text-slate-400 text-xs leading-normal">
                  Ask KrishiBot for personalized treatment advice and grape agricultural guidance in Hindi or English.
                </p>
              </div>
              <div className="text-violet-400 font-bold group-hover:translate-x-1.5 transition-transform">
                →
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
