export default function ForumHero({ onAsk }) {
  return (
    <div className="bg-gradient-to-br from-violet-500/[0.12] to-indigo-500/[0.06] border-b border-slate-700 px-8 py-8">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-8">
        <div>
          <h1 className="text-3xl font-extrabold mb-1.5">Farmer & consultant forum</h1>
          <p className="text-slate-400 text-sm">
            Ask questions, share knowledge, get expert answers. Free for all farmers and
            agricultural consultants.
          </p>
        </div>
        <button
          onClick={onAsk}
          className="px-7 py-3 rounded-xl text-white text-sm font-bold flex items-center gap-2 whitespace-nowrap bg-gradient-to-br from-indigo-500 to-purple-600 hover:opacity-90 hover:-translate-y-0.5 transition-all"
        >
          <i className="fa fa-plus" aria-hidden="true" />
          Ask a question
        </button>
      </div>
    </div>
  );
}