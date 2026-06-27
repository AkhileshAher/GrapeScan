import { MARKET_CATEGORIES } from "./MarketCategoryList";

const CONDITIONS = [
  { value: "new", label: "New" },
  { value: "good", label: "Good (used)" },
  { value: "fair", label: "Fair (some repair)" },
  { value: "poor", label: "Poor (needs repair)" },
];

export default function SellAdModal({ open, form, onChange, onSubmit, onClose }) {
  if (!open) return null;

  const update = (field) => (e) =>
    onChange(field, e.target.type === "checkbox" ? e.target.checked : e.target.value);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[1000] flex items-start justify-center p-8 overflow-y-auto"
    >
      <div className="bg-slate-800 border border-slate-700 rounded-[20px] w-full max-w-[600px] p-8 my-auto">
        <h2 className="text-xl font-bold mb-6">📢 Post equipment ad</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-slate-400 mb-1.5">Title *</label>
            <input
              value={form.title}
              onChange={update("title")}
              placeholder="e.g. Mahindra 575 DI Tractor - 2019"
              className="w-full bg-slate-700/40 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-1.5">Category *</label>
            <select
              value={form.category}
              onChange={update("category")}
              className="w-full bg-slate-700/40 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500 transition-colors"
            >
              {MARKET_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-slate-900">
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-1.5">Condition *</label>
            <select
              value={form.condition}
              onChange={update("condition")}
              className="w-full bg-slate-700/40 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500 transition-colors"
            >
              {CONDITIONS.map((c) => (
                <option key={c.value} value={c.value} className="bg-slate-900">
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-1.5">Price (₹) *</label>
            <input
              type="number"
              value={form.price}
              onChange={update("price")}
              placeholder="e.g. 350000"
              className="w-full bg-slate-700/40 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-1.5">Location *</label>
            <input
              value={form.location}
              onChange={update("location")}
              placeholder="e.g. Nashik, Maharashtra"
              className="w-full bg-slate-700/40 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-slate-400 mb-1.5">Description *</label>
            <textarea
              value={form.description}
              onChange={update("description")}
              placeholder="Describe the equipment: year, brand, working condition, reason for selling..."
              className="w-full min-h-[100px] resize-y bg-slate-700/40 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="sm:col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="adNegotiable"
              checked={form.negotiable}
              onChange={update("negotiable")}
              className="w-4 h-4 accent-blue-500"
            />
            <label htmlFor="adNegotiable" className="text-sm text-slate-400">
              Price is negotiable
            </label>
          </div>
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
            <i className="fa fa-bullhorn" aria-hidden="true" />
            Post ad
          </button>
        </div>
      </div>
    </div>
  );
}