import { Link } from "react-router-dom";

export default function ChatNavbar() {
  return (
    <nav className="flex items-center gap-4 px-6 py-3 bg-slate-900 border-b border-slate-700 shrink-0 z-10">
      <Link
        to="/dashboard"
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-500 transition-colors"
      >
        <i className="fa fa-arrow-left" aria-hidden="true" />
        Back
      </Link>

      <div className="flex items-center gap-2 text-lg font-bold bg-gradient-to-br from-indigo-400 to-purple-500 bg-clip-text text-transparent">
        🤖 KrishiBot
        <span className="text-xs font-normal text-slate-500 ml-1 [-webkit-text-fill-color:theme(colors.slate.500)]">
          AI Advisor
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-sm text-emerald-500 ml-auto">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        Online
      </div>
    </nav>
  );
}