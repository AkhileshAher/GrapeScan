import { RoleBadge } from "./ForumBadges";

const AVATAR_STYLES = {
  farmer: "bg-gradient-to-br from-emerald-500 to-emerald-600",
  consultant: "bg-gradient-to-br from-violet-500 to-violet-800",
};

export default function ReplyCard({ reply, canMarkSolution, onMarkSolution }) {
  const initials = reply.user_name.charAt(0).toUpperCase();

  return (
    <div
      className={`bg-slate-800 border rounded-2xl overflow-hidden mb-3 ${
        reply.is_solution ? "border-emerald-500 bg-emerald-500/[0.04]" : "border-slate-700"
      }`}
    >
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-700">
        <div
          className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
            AVATAR_STYLES[reply.user_role] || AVATAR_STYLES.farmer
          }`}
        >
          {initials}
        </div>
        <div>
          <div className="font-bold text-sm flex items-center gap-1.5">
            {reply.user_name}
            <RoleBadge role={reply.user_role} size="xs" />
          </div>
          <div className="text-xs text-slate-500 mt-0.5">{reply.created_at}</div>
        </div>

        {reply.is_solution && (
          <div className="ml-auto bg-emerald-500/15 text-emerald-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
            <i className="fa fa-check-circle" aria-hidden="true" />
            Best answer
          </div>
        )}
      </div>

      <div className="px-5 py-4 text-slate-400 leading-loose text-sm whitespace-pre-wrap">
        {reply.body}
      </div>

      {canMarkSolution && !reply.is_solution && (
        <div className="px-5 py-2 border-t border-white/[0.04] flex items-center gap-3">
          <button
            onClick={() => onMarkSolution(reply._id)}
            className="px-3.5 py-1.5 border border-emerald-500/30 text-emerald-500 rounded-lg text-xs font-semibold hover:bg-emerald-500/15 transition-colors"
          >
            <i className="fa fa-check" aria-hidden="true" /> Mark as solution
          </button>
        </div>
      )}
    </div>
  );
}