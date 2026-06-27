import { useEffect, useRef } from "react";

const CHART_CDN_URL = "https://cdn.jsdelivr.net/npm/chart.js";

function loadChartJs() {
  if (window.Chart) return Promise.resolve(window.Chart);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${CHART_CDN_URL}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(window.Chart));
      return;
    }
    const script = document.createElement("script");
    script.src = CHART_CDN_URL;
    script.onload = () => resolve(window.Chart);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default function PriceChart({ items }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    loadChartJs().then((Chart) => {
      if (cancelled || !canvasRef.current) return;

      const top8 = items.slice(0, 8);
      const labels = top8.map((i) => i.market);
      const mins = top8.map((i) => i.price_min);
      const modals = top8.map((i) => i.price_modal);
      const maxs = top8.map((i) => i.price_max);

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(canvasRef.current.getContext("2d"), {
        type: "bar",
        data: {
          labels,
          datasets: [
            { label: "Min", data: mins, backgroundColor: "rgba(239,68,68,0.5)", borderColor: "#ef4444", borderWidth: 1 },
            { label: "Modal", data: modals, backgroundColor: "rgba(139,92,246,0.7)", borderColor: "#8b5cf6", borderWidth: 1 },
            { label: "Max", data: maxs, backgroundColor: "rgba(34,197,94,0.5)", borderColor: "#22c55e", borderWidth: 1 },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { labels: { color: "#94a3b8", font: { size: 11 } } } },
          scales: {
            x: { ticks: { color: "#64748b", font: { size: 10 } }, grid: { color: "rgba(255,255,255,0.04)" } },
            y: {
              ticks: { color: "#64748b", font: { size: 10 }, callback: (v) => "₹" + v },
              grid: { color: "rgba(255,255,255,0.04)" },
            },
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [items]);

  return <canvas ref={canvasRef} height="350" />;
}