import { RoleBadge, StatusBadge, CategoryBadge } from "./ForumBadges";

export default function ThreadPost({ thread }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden mb-6">
      <div className="p-7">
        <div className="flex gap-2 flex-wrap mb-4">
          <RoleBadge role={thread.user_role} />
          <StatusBadge resolved={thread.is_resolved} />
          <CategoryBadge category={thread.category} />
        </div>
        <h1 className="text-2xl font-extrabold leading-snug mb-4">{thread.title}</h1>
        <p className="text-slate-400 leading-loose text-sm whitespace-pre-wrap">{thread.body}</p>
      </div>

      <div className="flex items-center gap-6 flex-wrap px-7 py-4 border-t border-slate-700 bg-white/[0.02] text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <i className="fa fa-user" aria-hidden="true" /> {thread.user_name}
        </span>
        <span className="flex items-center gap-1.5">
          <i className="fa fa-clock" aria-hidden="true" /> {thread.created_at}
        </span>
        <span className="flex items-center gap-1.5">
          <i className="fa fa-eye" aria-hidden="true" /> {thread.views} views
        </span>
        <span className="flex items-center gap-1.5">
          <i className="fa fa-comment" aria-hidden="true" /> {thread.reply_count} answers
        </span>
      </div>
    </div>
  );
}