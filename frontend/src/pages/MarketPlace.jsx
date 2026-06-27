import { useEffect, useRef, useState } from "react";
import ForumNavbar from "../components/forums/ForumNavbar";
import MarketplaceHero from "../components/marketplace/MarketplaceHero";
import MarketCategoryList from "../components/marketplace/MarketCategoryList";
import MarketFilters from "../components/marketplace/MarketFilters";
import MarketSearchBar from "../components/marketplace/MarketSearchBar";
import AdCard from "../components/marketplace/AdCard";
import SellAdModal from "../components/marketplace/SellAdModal";

const initialAdForm = {
  title: "",
  category: "tractor",
  condition: "new",
  price: "",
  location: "",
  description: "",
  negotiable: true,
};

const initialFilters = { minPrice: "", maxPrice: "", condition: "", location: "" };

export default function Marketplace() {
  const [token, setToken] = useState(null);
  const [stats, setStats] = useState({});
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [adForm, setAdForm] = useState(initialAdForm);
  const searchDebounce = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (!stored) {
      window.location.href = "/login";
      return;
    }
    setToken(stored);
  }, []);

  const loadStats = async () => {
    try {
      const res = await fetch("/api/marketplace/stats");
      const data = await res.json();
      setStats(data.stats || {});
    } catch (error) {
      console.error("Failed to load marketplace stats:", error);
    }
  };

  const buildUrl = (pageToLoad) => {
    const params = new URLSearchParams({ page: pageToLoad });
    if (category !== "all") params.set("category", category);
    if (search) params.set("search", search);
    if (filters.minPrice) params.set("min_price", filters.minPrice);
    if (filters.maxPrice) params.set("max_price", filters.maxPrice);
    if (filters.condition) params.set("condition", filters.condition);
    if (filters.location) params.set("location", filters.location);
    return `/api/marketplace/ads?${params.toString()}`;
  };

  const loadAds = async (pageToLoad, append = false) => {
    setLoading(!append);
    try {
      const res = await fetch(buildUrl(pageToLoad));
      const data = await res.json();
      setAds((prev) => (append ? [...prev, ...(data.ads || [])] : data.ads || []));
      setTotalPages(data.pages || 1);
    } catch (error) {
      console.error("Failed to load ads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    loadStats();
    setPage(1);
    loadAds(1, false);
  }, [token, category]);

  const handleSearchChange = (value) => {
    setSearch(value);
    clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => {
      setPage(1);
      loadAds(1, false);
    }, 400);
  };

  const applyFilters = () => {
    setPage(1);
    loadAds(1, false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadAds(nextPage, true);
  };

  const openSellModal = () => {
    if (!token) {
      window.location.href = "/login";
      return;
    }
    setModalOpen(true);
  };

  const updateAdForm = (field, value) => setAdForm((prev) => ({ ...prev, [field]: value }));

  const submitAd = async () => {
    const title = adForm.title.trim();
    const description = adForm.description.trim();
    const location = adForm.location.trim();

    if (!title || !description || !adForm.price || !location) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const res = await fetch("/api/marketplace/ads", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          title,
          description,
          price: parseFloat(adForm.price),
          category: adForm.category,
          condition: adForm.condition,
          location,
          negotiable: adForm.negotiable,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setModalOpen(false);
        setAdForm(initialAdForm);
        loadAds(page, false);
        loadStats();
        alert("🎉 Ad posted successfully!");
      } else {
        alert(data.error || "Failed to post ad.");
      }
    } catch (error) {
      console.error("Failed to submit ad:", error);
      alert("Error posting ad.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <ForumNavbar
        backHref="/dashboard"
        backLabel="Dashboard"
        title="🚜 Equipment Marketplace"
        gradientTitle
        right={
          <button
            onClick={openSellModal}
            className="px-4 py-2 rounded-xl text-white text-sm font-bold flex items-center gap-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 hover:opacity-90 transition-opacity"
          >
            <i className="fa fa-plus" aria-hidden="true" />
            Sell equipment
          </button>
        }
      />

      <MarketplaceHero stats={stats} onSell={openSellModal} />

      <div className="max-w-[1300px] mx-auto px-8 py-6 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        <aside>
          <MarketCategoryList activeCategory={category} onSelect={setCategory} />
          <MarketFilters filters={filters} onChange={setFilters} onApply={applyFilters} />
        </aside>

        <div>
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <h2 className="text-base font-bold">Available listings</h2>
            <MarketSearchBar value={search} onChange={handleSearchChange} />
          </div>

          {loading && (
            <div className="text-center py-12 text-slate-500">
              <i className="fa fa-spinner fa-spin fa-2x" aria-hidden="true" />
              <p className="mt-3">Loading listings...</p>
            </div>
          )}

          {!loading && ads.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              <i className="fa fa-box-open fa-2x" aria-hidden="true" />
              <p className="mt-3">No listings found.</p>
              <p className="text-sm">Be the first to sell in this category!</p>
            </div>
          )}

          {!loading && ads.length > 0 && (
            <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(270px,1fr))]">
              {ads.map((ad) => (
                <AdCard key={ad._id} ad={ad} />
              ))}
            </div>
          )}

          {!loading && page < totalPages && (
            <div className="text-center mt-6">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 rounded-xl bg-white/[0.04] border border-slate-700 text-slate-400 text-sm font-semibold hover:bg-blue-500/10 hover:border-blue-500 hover:text-blue-400 transition-colors"
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </div>

      <SellAdModal
        open={modalOpen}
        form={adForm}
        onChange={updateAdForm}
        onSubmit={submitAd}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}