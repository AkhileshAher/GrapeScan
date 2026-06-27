import { useEffect, useState } from "react";

export default function ProbabilityBar({ disease, confidence, isHighest, delay }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(confidence), delay);
    return () => clearTimeout(timer);
  }, [confidence, delay]);

  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className={isHighest ? "font-bold text-emerald-700" : "font-medium text-slate-500"}>
          {disease}
        </span>
        <span className={isHighest ? "font-bold text-emerald-600" : "font-medium text-slate-400"}>
          {confidence}%
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-[width] duration-700 ease-out ${
            isHighest ? "bg-emerald-500" : "bg-slate-300"
          }`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}