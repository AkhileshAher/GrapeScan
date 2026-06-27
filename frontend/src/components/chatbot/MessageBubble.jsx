import { formatChatText } from "../../utils/formatChatText.js";

export default function MessageBubble({ role, text, time }) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 animate-[slideUp_0.3s_ease] ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0 ${
          isUser
            ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
            : "bg-gradient-to-br from-indigo-500 to-purple-600"
        }`}
      >
        {isUser ? "👤" : "🤖"}
      </div>

      <div className={isUser ? "text-right" : "text-left"}>
        <div
          className={`max-w-md inline-block text-left px-4 py-3.5 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? "bg-gradient-to-br from-violet-500 to-violet-800 rounded-tr-sm"
              : "bg-slate-800 border border-slate-700 rounded-tl-sm"
          }`}
          dangerouslySetInnerHTML={{ __html: formatChatText(text) }}
        />
        <div className="text-xs text-slate-500 mt-1">{time}</div>
      </div>
    </div>
  );
}