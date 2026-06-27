export default function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600">
        🤖
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-sm px-4 py-4 flex gap-1 items-center">
        <span className="w-2 h-2 bg-slate-500 rounded-full animate-[typing_1.4s_infinite]" />
        <span className="w-2 h-2 bg-slate-500 rounded-full animate-[typing_1.4s_infinite_0.2s]" />
        <span className="w-2 h-2 bg-slate-500 rounded-full animate-[typing_1.4s_infinite_0.4s]" />
      </div>
    </div>
  );
}