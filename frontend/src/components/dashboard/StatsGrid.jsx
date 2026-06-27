import StatCard from "./StatCard";

export default function StatsGrid({ predictions }) {
  const total = predictions.length;
  const avgConfidence =
    total === 0 ? 0 : predictions.reduce((sum, p) => sum + p.confidence, 0) / total;
  const healthy = predictions.filter((p) => p.prediction === "Healthy").length;
  const diseased = total - healthy;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard icon="📊" value={total} label="Total Predictions" tone="emerald" />
      <StatCard icon="🎯" value={`${avgConfidence.toFixed(1)}%`} label="Average Confidence" tone="blue" />
      <StatCard icon="🌿" value={healthy} label="Healthy Detected" tone="emerald" />
      <StatCard icon="⚠️" value={diseased} label="Diseases Detected" tone="red" />
    </div>
  );
}