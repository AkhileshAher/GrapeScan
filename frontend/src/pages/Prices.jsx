import { useEffect, useState } from "react";
import ForumNavbar from "../components/forums/ForumNavbar";
import LiveBadge from "../components/prices/LiveBadge";
import PriceFilters from "../components/prices/PriceFilters";
import PriceStatsRow from "../components/prices/PriceStatsRow";
import CommodityChips from "../components/prices/CommodityChips";
import PriceTable from "../components/prices/PriceTable";
import PriceChart from "../components/prices/PriceChart";

const initialStats = { avg: null, high: null, low: null, markets: null };

export default function Prices() {
  const [commodity, setCommodity] = useState("Grapes");
  const [state, setState] = useState("Maharashtra");
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | empty
  const [stats, setStats] = useState(initialStats);

  const loadPrices = async (commodityValue, stateValue) => {
    setStatus("loading");
    try {
      const res = await fetch(
        `/api/prices?commodity=${encodeURIComponent(commodityValue)}&state=${encodeURIComponent(stateValue)}`
      );
      const data = await res.json();

      if (data.success && data.data.length > 0) {
        setItems(data.data);
        setStatus("ready");
        computeStats(data.data);
      } else {
        setItems([]);
        setStatus("empty");
        setStats(initialStats);
      }
    } catch (error) {
      console.error("Failed to load prices:", error);
      setItems([]);
      setStatus("empty");
      setStats(initialStats);
    }
  };

  const computeStats = (data) => {
    const modals = data.map((i) => i.price_modal).filter(Boolean);
    if (modals.length === 0) {
      setStats(initialStats);
      return;
    }
    setStats({
      avg: Math.round(modals.reduce((a, b) => a + b, 0) / modals.length).toLocaleString("en-IN"),
      high: Math.max(...data.map((i) => i.price_max)).toLocaleString("en-IN"),
      low: Math.min(...data.map((i) => i.price_min)).toLocaleString("en-IN"),
      markets: data.length,
    });
  };

  useEffect(() => {
    loadPrices(commodity, state);
  }, [commodity, state]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <ForumNavbar
        backHref="/dashboard"
        backLabel="Dashboard"
        title="📈 Mandi Prices"
        gradientTitle
        right={<LiveBadge />}
      />

      <div className="bg-gradient-to-br from-indigo-500/[0.15] to-purple-500/10 border-b border-slate-700 px-8 pt-8 pb-6">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-3xl font-extrabold mb-1.5">Mandi market prices</h1>
          <p className="text-slate-400 text-sm mb-5">
            Real-time commodity prices from Maharashtra agricultural markets · Powered by
            Data.gov.in API
          </p>
          <PriceFilters
            commodity={commodity}
            state={state}
            onCommodityChange={setCommodity}
            onStateChange={setState}
            onRefresh={() => loadPrices(commodity, state)}
          />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-6">
        <PriceStatsRow stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
            <CommodityChips active={commodity} onSelect={setCommodity} />
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
              <h2 className="text-base font-bold">{commodity} prices</h2>
              <span className="bg-emerald-500/15 text-emerald-500 rounded-full px-3 py-1 text-sm font-semibold">
                {status === "loading" ? "Loading..." : `${items.length} markets`}
              </span>
            </div>
            <PriceTable items={items} status={status} />
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700">
              <h2 className="text-base font-bold mb-1">Price range chart</h2>
              <p className="text-slate-500 text-xs">Min · Modal · Max price per market</p>
            </div>
            <div className="p-5">
              {status === "ready" && <PriceChart items={items} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}