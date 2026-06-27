import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import StatsGrid from "../components/dashboard/StatsGrid";
import FeatureModules from "../components/dashboard/FeatureModules";
import PredictionHistory from "../components/dashboard/PredictionHistory";
import { useToast, ToastContainer } from "../components/Toast";

export default function Dashboard() {
  const [predictions, setPredictions] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [userName, setUserName] = useState("User");
  const { toasts, showToast } = useToast();

  // Auth guard — redirect to /login if no token present.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setUserName(user.name || "User");
    } catch {
      setUserName("User");
    }
  }, []);

  const loadDashboard = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/history", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.success) {
        setPredictions(data.predictions);
        setStatus("ready");
      } else if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        setStatus("error");
        showToast(data.message || "Failed to load dashboard.", "error");
      }
    } catch (error) {
      console.error("Dashboard error:", error);
      setStatus("error");
      showToast("Failed to load dashboard. Please try again.", "error");
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    showToast("Logged out successfully!", "info");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar activePath="/dashboard" onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">📊 Prediction Dashboard</h1>
            <p className="text-slate-500 mt-1">
              Welcome back, <strong className="text-slate-700">{userName}</strong>
            </p>
          </div>
          <Link
            to="/predict-page"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-xl transition-colors shrink-0"
          >
            🔬 New Prediction
          </Link>
        </div>

        <StatsGrid predictions={predictions} />
        <FeatureModules />
        <PredictionHistory predictions={predictions} status={status} onRetry={loadDashboard} />
      </main>

      <footer className="border-t border-slate-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
          <span>© 2026 GrapeScan — Grapevine Disease Detection System</span>
          <span>Developed with ❤️ for Sustainable Agriculture</span>
        </div>
      </footer>

      <ToastContainer toasts={toasts} />
    </div>
  );
}