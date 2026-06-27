import { useEffect, useState } from "react";
import ForumNavbar from "../components/forums/ForumNavbar";
import ThreadPost from "../components/forums/ThreadPost";
import ReplyCard from "../components/forums/ReplyCard";
import ReplyBox from "../components/forums/ReplyBox";

export default function ForumThread({ threadId }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | not-found
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (!stored) {
      window.location.href = "/login";
      return;
    }
    setToken(stored);
    try {
      setUser(JSON.parse(localStorage.getItem("user") || "{}"));
    } catch {
      setUser({});
    }
  }, []);

  const loadThread = async () => {
    try {
      const res = await fetch(`/api/forum/threads/${threadId}`);
      const data = await res.json();

      if (!data.success) {
        setStatus("not-found");
        return;
      }

      setThread(data.thread);
      setReplies(data.replies || []);
      setStatus("ready");
      document.title = `${data.thread.title} | GrapevineAI Forum`;
    } catch (error) {
      console.error("Failed to load thread:", error);
      setStatus("not-found");
    }
  };

  useEffect(() => {
    if (threadId) loadThread();
  }, [threadId]);

  const submitReply = async () => {
    const body = replyText.trim();
    if (!body) {
      alert("Please write your answer.");
      return;
    }
    try {
      const res = await fetch(`/api/forum/threads/${threadId}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ body }),
      });
      const data = await res.json();
      if (data.success) {
        setReplyText("");
        loadThread();
      } else {
        alert(data.error || "Failed to post answer.");
      }
    } catch (error) {
      console.error("Failed to submit reply:", error);
      alert("Error posting answer.");
    }
  };

  const markSolution = async (replyId) => {
    try {
      const res = await fetch(`/api/forum/threads/${threadId}/solve/${replyId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) loadThread();
    } catch (error) {
      console.error("Failed to mark solution:", error);
    }
  };

  const isOwner = thread && (user._id === thread.user_id || user.id === thread.user_id);
  const navTitle =
    status === "ready"
      ? thread.title.slice(0, 60) + (thread.title.length > 60 ? "..." : "")
      : "Loading...";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <ForumNavbar backHref="/forum" backLabel="Forum" title={navTitle} />

      <div className="max-w-[800px] mx-auto px-8 py-8">
        {status === "loading" && (
          <div className="text-center py-16 text-slate-500">
            <i className="fa fa-spinner fa-spin fa-2x" aria-hidden="true" />
          </div>
        )}

        {status === "not-found" && (
          <p className="text-center py-12 text-red-400">Thread not found.</p>
        )}

        {status === "ready" && (
          <>
            <ThreadPost thread={thread} />

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold">
                Answers{" "}
                <span className="bg-violet-500/15 text-violet-500 rounded-full px-2.5 py-0.5 text-sm">
                  {replies.length}
                </span>
              </h2>
            </div>

            {replies.length === 0 ? (
              <p className="text-center py-8 text-slate-500 text-sm">
                No answers yet. Be the first to help!
              </p>
            ) : (
              replies.map((reply) => (
                <ReplyCard
                  key={reply._id}
                  reply={reply}
                  canMarkSolution={isOwner}
                  onMarkSolution={markSolution}
                />
              ))
            )}

            <ReplyBox value={replyText} onChange={setReplyText} onSubmit={submitReply} />
          </>
        )}
      </div>
    </div>
  );
}