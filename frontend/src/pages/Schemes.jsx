import { useEffect, useState } from "react";
import ForumNavbar from "../components/forums/ForumNavbar";

const CATEGORY_COLORS = {
  "Income Support": "#22c55e",
  "Organic Farming": "#10b981",
  "Crop Insurance": "#3b82f6",
  "Climate Resilient Farming": "#8b5cf6",
  "Pension": "#f59e0b",
  "Crop Specific": "#e879f9",
  "Credit": "#06b6d4",
  "Irrigation": "#0ea5e9",
};

const CARBON_ICONS = {
  basics: "💰",
  organic: "🌿",
  irrigation: "💧",
  agroforestry: "🌳",
  biochar: "⬛",
  registration: "📝",
};

export default function Schemes() {
  const [activeTab, setActiveTab] = useState("schemes"); // schemes | carbon
  const [schemes, setSchemes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [carbonCredits, setCarbonCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch schemes data
  const loadSchemes = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/schemes");
      const data = await res.json();
      if (data.success) {
        setSchemes(data.schemes || []);
        // extract categories
        const cats = [...new Set((data.schemes || []).map((s) => s.category))];
        setCategories(cats);
      }
    } catch (error) {
      console.error("Failed to load schemes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch carbon credits data
  const loadCarbonCredits = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/carbon-credits");
      const data = await res.json();
      if (data.success) {
        setCarbonCredits(data.data || []);
      }
    } catch (error) {
      console.error("Failed to load carbon credits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "schemes") {
      loadSchemes();
    } else {
      loadCarbonCredits();
    }
  }, [activeTab]);

  const filteredSchemes =
    selectedCategory === "all"
      ? schemes
      : schemes.filter((s) => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <ForumNavbar
        backHref="/dashboard"
        backLabel="Dashboard"
        title="📋 Schemes & Carbon Credits"
        gradientTitle
      />

      {/* Hero section */}
      <div className="bg-gradient-to-br from-emerald-500/[0.12] to-violet-500/[0.08] border-b border-slate-800 px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight mb-2">
            Government Schemes & Carbon Credits
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mb-6">
            Explore central & state government welfare schemes for farmers, and discover how you can earn extra income through carbon credits.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            {/* Tab switchers */}
            <div className="flex bg-slate-900 border border-slate-700/80 p-1.5 rounded-xl w-fit">
              <button
                onClick={() => setActiveTab("schemes")}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "schemes"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                📋 Govt Schemes
              </button>
              <button
                onClick={() => setActiveTab("carbon")}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "carbon"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                🌱 Carbon Credits
              </button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 bg-slate-900/60 backdrop-blur-sm border border-slate-800 p-4 rounded-xl shrink-0">
              <div className="text-center px-2 border-r border-slate-800">
                <div className="text-lg font-black text-emerald-400">8+</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-0.5">Active Schemes</div>
              </div>
              <div className="text-center px-2 border-r border-slate-800">
                <div className="text-lg font-black text-emerald-400">₹6,000</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-0.5">PM-KISAN/yr</div>
              </div>
              <div className="text-center px-2">
                <div className="text-lg font-black text-emerald-400">₹5,000+</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-0.5">Carbon/Acre</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        {activeTab === "schemes" ? (
          <div>
            {/* Category selection */}
            <div className="flex gap-2 flex-wrap mb-6">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                  selectedCategory === "all"
                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                    : "border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                All Schemes
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                    selectedCategory === cat
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                      : "border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4" />
                <p>Loading active schemes...</p>
              </div>
            ) : filteredSchemes.length === 0 ? (
              <p className="text-center py-16 text-slate-500">No schemes found under this category.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSchemes.map((s, idx) => {
                  const color = CATEGORY_COLORS[s.category] || "#8b5cf6";
                  return (
                    <div
                      key={idx}
                      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col group"
                    >
                      <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-950 border-b border-slate-850">
                        <span
                          className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3"
                          style={{ backgroundColor: `${color}15`, color: color }}
                        >
                          {s.category}
                        </span>
                        <h3 className="text-base font-extrabold text-slate-100 group-hover:text-emerald-400 transition-colors leading-snug">
                          {s.name}
                        </h3>
                        <div className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                          <span className="text-slate-600">🏛️</span> {s.ministry}
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-xs text-slate-400 leading-relaxed mb-4">
                            {s.description}
                          </p>

                          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3.5 mb-4">
                            <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-1">
                              💰 Direct Benefit
                            </div>
                            <div className="text-sm font-extrabold text-slate-200">
                              {s.benefit}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {s.state !== "All India" ? (
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">
                                📍 {s.state}
                              </span>
                            ) : (
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-850 text-slate-400">
                                🇮🇳 All India
                              </span>
                            )}
                            {(s.documents || []).slice(0, 3).map((doc, dIdx) => (
                              <span
                                key={dIdx}
                                className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-850 text-slate-500"
                              >
                                {doc}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-850 pt-4 mt-2">
                            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                              Active Scheme
                            </span>
                            <a
                              href={s.website || "#"}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-bold text-slate-100 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 px-4.5 py-2 rounded-lg transition-all"
                            >
                              Apply Now →
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Carbon Credits info banner */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 rounded-2xl p-6 mb-8">
              <h2 className="text-base font-bold text-emerald-400 mb-2">🌱 What are Carbon Credits?</h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                A carbon credit = 1 tonne of CO₂ reduced or captured. As a farmer, you earn credits by adopting eco-friendly farming practices and can sell them in the carbon market for <strong className="text-emerald-400">₹500 - ₹5,000 per credit</strong>. India's Carbon Market was launched under the BEE (Bureau of Energy Efficiency) in 2023.
              </p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4" />
                <p>Loading credit programs...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {carbonCredits.map((item, idx) => {
                  const icon = CARBON_ICONS[item.category] || "🌱";
                  const steps = item.steps || item.how_to || [];
                  return (
                    <div
                      key={idx}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-3xl mb-4 bg-slate-950/60 w-12 h-12 flex items-center justify-center rounded-xl border border-slate-800">
                          {icon}
                        </div>
                        <h3 className="text-base font-extrabold text-slate-100 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {item.potential_earning && (
                          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3 mb-4">
                            <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-1">
                              Potential Earning
                            </div>
                            <div className="text-sm font-extrabold text-slate-200">
                              {item.potential_earning}
                            </div>
                          </div>
                        )}

                        {steps.length > 0 && (
                          <div className="mt-4">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                              📋 Steps to Earn
                            </div>
                            <ul className="space-y-2">
                              {steps.map((step, sIdx) => (
                                <li key={sIdx} className="text-xs text-slate-400 flex items-start gap-2">
                                  <span className="text-emerald-500 shrink-0 font-bold">→</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {item.contact && (
                        <div className="border-t border-slate-850 pt-4 mt-6 text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                          <span>🔗</span>
                          <a
                            href={item.contact.startsWith("http") ? item.contact : "#"}
                            className="hover:underline break-all"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item.contact}
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
