import { useRef, useEffect } from "react";
import ProbabilityBar from "./ProbabilityBar";

export default function ResultCard({ result }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (result && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  if (!result) return null;

  const sorted = Object.entries(result.all_predictions).sort((a, b) => b[1] - a[1]);

  return (
    <div ref={cardRef} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center text-xl shrink-0">
          ✅
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Analysis complete</h3>
          <p className="text-sm text-slate-500">Disease classification result</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={result.image_url}
            alt="Analyzed leaf"
            className="w-full rounded-xl border border-slate-200 object-cover"
          />
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">
            Detected disease
          </div>
          <div className="text-2xl font-bold text-slate-800 mb-4">{result.prediction}</div>

          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">
            Confidence
          </div>
          <div className="text-2xl font-bold text-emerald-600 mb-5">{result.confidence}%</div>

          <div>
            {sorted.map(([disease, conf], index) => (
              <ProbabilityBar
                key={disease}
                disease={disease}
                confidence={conf}
                isHighest={index === 0}
                delay={100 + index * 150}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}