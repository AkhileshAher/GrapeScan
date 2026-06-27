import { useEffect, useRef, useState } from "react";
import ForumNavbar from "../components/forums/ForumNavbar";
import ForumHero from "../components/forums/ForumHero";
import ForumStats from "../components/forums/ForumStats";
import CategoryList from "../components/forums/CategoryList";
import SearchBar from "../components/forums/SearchBar";
import ThreadCard from "../components/forums/ThreadCard";
import AskQuestionModal from "../components/forums/AskQuestionModal";
import { RoleBadge } from "../components/forums/ForumBadges";

const initialForm = { title: "", category: "disease", body: "", tags: "" };

export default function Forum() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [stats, setStats] = useState({});
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const searchDebounce = useRef(null);

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

  const loadStats = async () => {
    try {
      const res = await fetch("/api/forum/stats");
      const data = await res.json();
      setStats(data.stats || {});
    } catch (error) {
      console.error("Failed to load forum stats:", error);
    }
  };

  const loadThreads = async (pageToLoad, append = false) => {
    setLoading(!append);
    try {
      const cat = category === "all" ? "" : category;
      const url = `/api/forum/threads?page=${pageToLoad}${cat ? `&category=${cat}` : ""}${
        search ? `&search=${encodeURIComponent(search)}` : ""
      }`;
      const res = await fetch(url);
      const data = await res.json();

      setThreads((prev) => (append ? [...prev, ...(data.threads || [])] : data.threads || []));
      setTotalPages(data.pages || 1);
    } catch (error) {
      console.error("Failed to load threads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    loadStats();
    setPage(1);
    loadThreads(1, false);
  }, [token, category]);

  const handleSearchChange = (value) => {
    setSearch(value);
    clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => {
      setPage(1);
      loadThreads(1, false);
    }, 400);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadThreads(nextPage, true);
  };

  const openModal = () => {
    if (!token) {
      window.location.href = "/login";
      return;
    }
    setModalOpen(true);
  };

  const updateForm = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const submitThread = async () => {
    const title = form.title.trim();
    const body = form.body.trim();
    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (!title || !body) {
      alert("Please fill in title and details.");
      return;
    }

    try {
      const res = await fetch("/api/forum/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, body, category: form.category, tags }),
      });
      const data = await res.json();

      if (data.success) {
        setModalOpen(false);
        setForm(initialForm);
        window.location.href = `/forum/thread/${data.thread_id}`;
      } else {
        alert(data.error || "Failed to post question.");
      }
    } catch (error) {
      console.error("Failed to submit thread:", error);
      alert("Error posting question.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <ForumNavbar
        backHref="/dashboard"
        backLabel="Dashboard"
        title="💬 Community Forum"
        gradientTitle
        right={<RoleBadge role={user.role} />}
      />

      <ForumHero onAsk={openModal} />

      <div className="max-w-[1100px] mx-auto px-8 py-6 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        <aside>
          <ForumStats stats={stats} />
          <CategoryList activeCategory={category} onSelect={setCategory} />
        </aside>

        <div>
          <div className="flex items-center justify-between mb-4 gap-3">
            <h2 className="text-base font-bold">Recent questions</h2>
            <SearchBar value={search} onChange={handleSearchChange} />
          </div>

          {loading && (
            <div className="text-center py-12 text-slate-500">
              <i className="fa fa-spinner fa-spin fa-2x" aria-hidden="true" />
              <p className="mt-3">Loading discussions...</p>
            </div>
          )}

          {!loading && threads.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No discussions found.{" "}
              <button onClick={openModal} className="text-violet-500 hover:underline">
                Be the first to ask!
              </button>
            </div>
          )}

          {!loading && threads.map((thread) => <ThreadCard key={thread._id} thread={thread} />)}

          {!loading && page < totalPages && (
            <button
              onClick={handleLoadMore}
              className="w-full py-3 rounded-xl bg-white/[0.04] border border-slate-700 text-slate-400 text-sm font-semibold hover:bg-violet-500/10 hover:border-violet-500 hover:text-violet-400 transition-colors"
            >
              Load more →
            </button>
          )}
        </div>
      </div>

      <AskQuestionModal
        open={modalOpen}
        form={form}
        onChange={updateForm}
        onSubmit={submitThread}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}