import { Link } from "react-router-dom";
import { RoleBadge, StatusBadge, CategoryBadge } from "./ForumBadges";

export default function ThreadCard({ thread }) {
  return (
    <Link
      to={`/forum/thread/${thread._id}`}
      className="block bg-slate-800 border border-slate-700 rounded-2xl px-5 py-5 mb-3 transition-all hover:-translate-y-0.5 hover:border-violet-500"
    >
      <div className="mb-3">
        <div className="font-bold text-[0.95rem] leading-snug text-slate-100 mb-1.5">
          {thread.title}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <RoleBadge role={thread.user_role} size="xs" />
          <StatusBadge resolved={thread.is_resolved} />
          <CategoryBadge category={thread.category} />
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
        <span className="flex items-center gap-1.5">
          <i className="fa fa-user" aria-hidden="true" /> {thread.user_name}
        </span>
        <span className="flex items-center gap-1.5">
          <i className="fa fa-comment" aria-hidden="true" /> {thread.reply_count} replies
        </span>
        <span className="flex items-center gap-1.5">
          <i className="fa fa-eye" aria-hidden="true" /> {thread.views} views
        </span>
        <span className="flex items-center gap-1.5">
          <i className="fa fa-clock" aria-hidden="true" /> {thread.created_at}
        </span>
      </div>
    </Link>
  );
}