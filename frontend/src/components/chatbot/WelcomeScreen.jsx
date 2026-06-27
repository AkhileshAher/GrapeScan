const QUICK_PROMPTS = [
  {
    icon: "🦠",
    title: "Disease treatment",
    text: "Black rot on my grape leaves",
    prompt: "Black rot disease spots on my grape leaves. What should I do?",
  },
  {
    icon: "📋",
    title: "Govt schemes",
    text: "Schemes for grape farmers",
    prompt: "Which government schemes are available for grape farmers in Maharashtra?",
  },
  {
    icon: "🌱",
    title: "Carbon credits",
    text: "How to earn from carbon credits",
    prompt: "How can I earn money from carbon credits as a farmer?",
  },
  {
    icon: "💧",
    title: "Spray timing",
    text: "Best time to spray fungicide",
    prompt: "What is the best time to spray fungicide on grape vines?",
  },
  {
    icon: "💰",
    title: "Market prices",
    text: "Nashik grape rates today (Hindi)",
    prompt: "Grape mandi price Nashik aaj ka rate kya hai?",
  },
  {
    icon: "🇮🇳",
    title: "PM-KISAN",
    text: "How to apply for PM-KISAN (Hindi)",
    prompt: "PM-KISAN scheme ke liye apply kaise karein?",
  },
];

export default function WelcomeScreen({ onQuickPrompt }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
      <div className="text-6xl mb-4 animate-[float_3s_ease-in-out_infinite]">🌿</div>
      <h1 className="text-3xl font-bold mb-2 bg-gradient-to-br from-indigo-400 to-purple-500 bg-clip-text text-transparent">
        Namaste! I'm KrishiBot
      </h1>
      <p className="text-slate-400 mb-8 max-w-md">
        Your AI-powered agricultural advisor. Ask me anything about grape diseases, subsidies,
        market prices, or farming practices.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[580px]">
        {QUICK_PROMPTS.map((qp) => (
          <button
            key={qp.title}
            onClick={() => onQuickPrompt(qp.prompt)}
            className="text-left bg-slate-800 border border-slate-700 rounded-xl px-4 py-3.5 transition-all hover:border-violet-500 hover:-translate-y-0.5 hover:bg-violet-500/10"
          >
            <div className="text-xl mb-1">{qp.icon}</div>
            <div className="font-semibold text-sm text-slate-200">{qp.title}</div>
            <div className="text-sm text-slate-400">{qp.text}</div>
          </button>
        ))}
      </div>
    </div>
  );
}