import { CATEGORIES } from "./CategoryList";

export default function AskQuestionModal({ open, form, onChange, onSubmit, onClose }) {
  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
    >
      <div className="bg-slate-800 border border-slate-700 rounded-[20px] w-full max-w-[640px] max-h-[85vh] overflow-y-auto p-8">
        <h2 className="text-xl font-bold mb-6">✍️ Ask a question</h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-400 mb-1.5">Title *</label>
          <input
            value={form.title}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="What is your question? Be specific and clear."
            className="w-full bg-slate-700/40 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-400 mb-1.5">Category *</label>
          <select
            value={form.category}
            onChange={(e) => onChange("category", e.target.value)}
            className="w-full bg-slate-700/40 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none focus:border-violet-500 transition-colors"
          >
            {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
              <option key={cat.id} value={cat.id} className="bg-slate-900">
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-400 mb-1.5">Details *</label>
          <textarea
            value={form.body}
            onChange={(e) => onChange("body", e.target.value)}
            placeholder="Describe your problem or question in detail. Include location, crop variety, symptoms etc."
            className="w-full min-h-[140px] resize-y bg-slate-700/40 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-400 mb-1.5">
            Tags (comma separated)
          </label>
          <input
            value={form.tags}
            onChange={(e) => onChange("tags", e.target.value)}
            placeholder="e.g. grapes, nashik, black rot"
            className="w-full bg-slate-700/40 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-sm hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-6 py-2.5 rounded-xl text-white text-sm font-bold flex items-center gap-2 bg-gradient-to-br from-indigo-500 to-purple-600 hover:opacity-90 transition-opacity"
          >
            <i className="fa fa-paper-plane" aria-hidden="true" />
            Post question
          </button>
        </div>
      </div>
    </div>
  );
}