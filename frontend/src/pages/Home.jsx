import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const features = [
    {
      icon: "🔬",
      title: "Disease Prediction",
      desc: "Upload leaf photos to detect Black Rot, Esca, and Leaf Blight instantly using our trained CNN model.",
      color: "from-emerald-500/20 to-teal-500/5",
      border: "border-emerald-500/20",
    },
    {
      icon: "🤖",
      title: "KrishiBot AI Advisor",
      desc: "Get agronomic advice, treatment suggestions, and farming guidance in Hindi or English from our smart AI chatbot.",
      color: "from-violet-500/20 to-indigo-500/5",
      border: "border-violet-500/20",
    },
    {
      icon: "📈",
      title: "Live Mandi Prices",
      desc: "Stay updated with real-time market rates and commodity prices across Maharashtra mandi boards.",
      color: "from-amber-500/20 to-orange-500/5",
      border: "border-amber-500/20",
    },
    {
      icon: "📋",
      title: "Schemes & Subsidies",
      desc: "Explore government welfare schemes, agricultural subsidies, and find out how to earn carbon credits.",
      color: "from-blue-500/20 to-cyan-500/5",
      border: "border-blue-500/20",
    },
    {
      icon: "💬",
      title: "Community Forum",
      desc: "Ask questions, share advice, and connect directly with other viticulturists and certified consultants.",
      color: "from-red-500/20 to-pink-500/5",
      border: "border-red-500/20",
    },
    {
      icon: "🚜",
      title: "Equipment Market",
      desc: "A farmer-to-farmer classifieds marketplace to buy, sell, or rent farming machinery and tools.",
      color: "from-fuchsia-500/20 to-purple-500/5",
      border: "border-fuchsia-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-black tracking-tight text-emerald-400">
            <span className="text-2xl">🍇</span>
            GrapeScan
          </Link>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2 rounded-xl transition-all shadow-lg shadow-emerald-950/20 text-sm"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white font-medium transition-colors text-sm px-3 py-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2 rounded-xl transition-all shadow-lg shadow-emerald-950/20 text-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero section */}
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28 text-center relative">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full px-4 py-1.5 text-xs font-semibold mb-6 animate-pulse">
            <span>✨</span> Powered by Advanced CNN Deep Learning
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6 bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Smart AI Detection for Sustainable Viticulture
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
            Protect your vineyards from devastating diseases. Upload leaf photos, get instant scientific treatments,
            consult experts, track mandi prices, and access government subsidies.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isLoggedIn ? (
              <button
                onClick={() => navigate("/predict-page")}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl transition-all text-base shadow-xl shadow-emerald-900/30 hover:scale-[1.02]"
              >
                🔬 Start Leaf Scan Now
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/register")}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl transition-all text-base shadow-xl shadow-emerald-900/30 hover:scale-[1.02]"
                >
                  Get Started (Free)
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold px-8 py-4 rounded-xl transition-all text-base hover:scale-[1.02]"
                >
                  Sign In to Account
                </button>
              </>
            )}
          </div>
        </section>

        {/* Features section */}
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-900">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              All-in-One Grape Farming Suite
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Everything a grapevine farmer needs, combined in one intelligent dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className={`bg-slate-900/40 backdrop-blur-sm border ${feat.border} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900/80 bg-gradient-to-br ${feat.color}`}
              >
                <div className="text-3xl mb-4 bg-slate-950/60 w-12 h-12 flex items-center justify-center rounded-xl border border-slate-800">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-lg">🍇</span>
            <span className="font-semibold text-slate-400">GrapeScan System</span>
          </div>
          <span>© 2026 GrapeScan — Developed for Sustainable Agriculture</span>
        </div>
      </footer>
    </div>
  );
}
