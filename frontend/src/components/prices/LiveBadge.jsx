export default function LiveBadge() {
  return (
    <div className="ml-auto bg-red-500/15 border border-red-500/30 text-red-500 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-[blink_1s_infinite]" />
      LIVE
    </div>
  );
}