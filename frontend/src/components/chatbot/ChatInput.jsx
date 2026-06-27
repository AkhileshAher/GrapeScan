import { useRef } from "react";

export default function ChatInput({ value, onChange, onSend, disabled }) {
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    onChange(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="px-6 py-4 bg-slate-900 border-t border-slate-700 shrink-0">
      <div className="flex gap-3 items-end bg-slate-800 border border-slate-700 rounded-2xl pl-4 pr-2 py-2 focus-within:border-violet-500 transition-colors">
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask KrishiBot anything about farming, diseases, schemes..."
          className="flex-1 bg-transparent outline-none resize-none text-slate-100 text-sm leading-relaxed py-1.5 max-h-[120px] placeholder:text-slate-500"
        />
        <button
          onClick={onSend}
          disabled={disabled}
          title="Send"
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shrink-0 transition-all hover:opacity-90 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <i className="fa fa-paper-plane" aria-hidden="true" />
        </button>
      </div>
      <div className="text-center text-xs text-slate-500 mt-2 flex items-center justify-center gap-1.5">
        <i className="fa fa-lock text-[0.65rem]" aria-hidden="true" />
        Smart AI advisor · Your conversations are private
      </div>
    </div>
  );
}