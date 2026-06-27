function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function SessionItem({ session, isActive, onSelect }) {
  return (
    <div
      onClick={() => onSelect(session._id)}
      className={`px-3 py-2.5 rounded-lg cursor-pointer mb-1 text-sm transition-colors ${
        isActive
          ? "bg-violet-500/15 border border-violet-500/30"
          : "border border-transparent hover:bg-white/5"
      }`}
    >
      <div className="text-slate-400 whitespace-nowrap overflow-hidden text-ellipsis">
        💬 {escapeHtml(session.last_message || "Conversation")}
      </div>
      <div className="text-xs text-slate-500 mt-0.5">{session.timestamp}</div>
    </div>
  );
}

export default function ChatSidebar({ sessions, loading, activeSessionId, onSelectSession, onNewChat }) {
  return (
    <aside className="w-[260px] shrink-0 bg-slate-900 border-r border-slate-700 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-slate-700">
        <button
          onClick={onNewChat}
          className="w-full py-2.5 px-4 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 bg-gradient-to-br from-indigo-500 to-purple-600 hover:opacity-90 hover:-translate-y-0.5 transition-all"
        >
          <i className="fa fa-plus" aria-hidden="true" />
          New conversation
        </button>
      </div>

      <div className="px-4 pt-3 pb-1 text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">
        Chat history
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {loading && (
          <p className="text-slate-500 text-sm px-3 py-2">Loading sessions...</p>
        )}
        {!loading && sessions.length === 0 && (
          <p className="text-slate-500 text-sm px-3 py-2">No past conversations</p>
        )}
        {!loading &&
          sessions.map((session) => (
            <SessionItem
              key={session._id}
              session={session}
              isActive={session._id === activeSessionId}
              onSelect={onSelectSession}
            />
          ))}
      </div>
    </aside>
  );
}