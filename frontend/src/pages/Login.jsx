import { useEffect, useState } from "react";
import AuthNavbar from "../components/auth/AuthNavbar";
import AuthAlert from "../components/auth/AuthAlert";
import FormField from "../components/auth/FormField";
import { useToast, ToastContainer } from "../components/Toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { toasts, showToast } = useToast();

  // Redirect if already logged in.
  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/predict-page";
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password }),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setSuccessMessage(data.message);
        showToast("Login successful! Redirecting...", "success");

        setTimeout(() => {
          window.location.href = "/predict-page";
        }, 1000);
      } else {
        setErrorMessage(data.message);
        showToast(data.message, "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Connection error. Please check your internet and try again.");
      showToast("Connection failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AuthNavbar activePath="/login" />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">🔐</div>
            <h2 className="text-2xl font-bold text-slate-800">Welcome back</h2>
            <p className="text-slate-500 mt-1">Sign in to continue to GrapeScan</p>
          </div>

          <AuthAlert type="error" message={errorMessage} />
          <AuthAlert type="success" message={successMessage} />

          <form onSubmit={handleLogin}>
            <FormField
              id="loginEmail"
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
            />
            <FormField
              id="loginPassword"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-colors"
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}
            <a href="/register" className="text-emerald-600 font-medium hover:underline">
              Create one here
            </a>
          </p>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
          <span>© 2026 GrapeScan — Grapevine Disease Detection System</span>
          <span>Developed with ❤️ for Sustainable Agriculture</span>
        </div>
      </footer>

      <ToastContainer toasts={toasts} />
    </div>
  );
}