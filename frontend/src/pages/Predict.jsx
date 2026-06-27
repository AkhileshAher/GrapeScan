import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UploadZone from "../components/predict/UploadZone";
import ImagePreview from "../components/predict/ImagePreview";
import ResultCard from "../components/predict/ResultCard";
import { useToast, ToastContainer } from "../components/Toast";

export default function Predict() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const { toasts, showToast } = useToast();

  // Auth guard.
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }, []);

  const handleFileSelected = (file) => {
    setSelectedFile(file);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target.result);
    reader.readAsDataURL(file);

    showToast('Image selected! Click "Analyze disease" to proceed.', "info");
  };

  const handleInvalidFile = (message) => {
    showToast(message, "error");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    showToast("Logged out successfully!", "info");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  const runPrediction = async () => {
    if (!selectedFile) {
      showToast("Please select an image first.", "error");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Please login first.", "error");
      window.location.href = "/login";
      return;
    }

    setAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("token", token);

      const response = await fetch("/predict", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setResult(data);
        showToast("Analysis complete!", "success");
      } else {
        showToast(data.message || "Prediction failed.", "error");
        if (response.status === 401) {
          localStorage.removeItem("token");
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
        }
      }
    } catch (error) {
      console.error("Prediction error:", error);
      showToast("Connection error. Please try again.", "error");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar activePath="/predict-page" onLogout={handleLogout} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">🔬 Disease detection</h1>
          <p className="text-slate-500 mt-1">
            Upload a grape leaf image and our AI model will identify the disease
          </p>
        </div>

        <UploadZone
          selectedFile={selectedFile}
          onFileSelected={handleFileSelected}
          onInvalidFile={handleInvalidFile}
        />

        <ImagePreview previewUrl={previewUrl} onAnalyze={runPrediction} analyzing={analyzing} />

        <ResultCard result={result} />
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