export default function ReplyBox({ value, onChange, onSubmit }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mt-4">
      <h3 className="text-base font-bold mb-4">✍️ Write your answer</h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Share your knowledge, experience, or advice. Be detailed and helpful."
        className="w-full min-h-[120px] resize-y bg-slate-700/40 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none focus:border-violet-500 transition-colors"
      />
      <div className="flex justify-end mt-3">
        <button
          onClick={onSubmit}
          className="px-6 py-2.5 rounded-xl text-white text-sm font-bold flex items-center gap-2 bg-gradient-to-br from-indigo-500 to-purple-600 hover:opacity-90 transition-opacity"
        >
          <i className="fa fa-paper-plane" aria-hidden="true" />
          Post answer
        </button>
      </div>
    </div>
  );
}