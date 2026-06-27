import { useEffect, useState } from "react";
import AuthNavbar from "../components/auth/AuthNavbar";
import AuthAlert from "../components/auth/AuthAlert";
import FormField from "../components/auth/FormField";
import RoleSelector from "../components/auth/RoleSelector";
import ConsultantFields from "../components/auth/ConsultantFields";
import { useToast, ToastContainer } from "../components/Toast";

const initialForm = {
  role: "farmer",
  name: "",
  email: "",
  phone: "",
  location: "",
  expertise: "",
  experience: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const [form, setForm] = useState(initialForm);
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

  const updateField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  const setRole = (role) => setForm((prev) => ({ ...prev, role }));

  const handleRegister = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const location = form.location.trim();
    const expertise = form.expertise.trim();
    const experience = form.experience.trim();

    if (!name || !email || !form.password || !form.confirmPassword) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    if (form.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password: form.password,
          role: form.role,
          phone,
          location,
          expertise,
          experience,
        }),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setSuccessMessage(data.message);
        showToast("Account created! Redirecting...", "success");

        setTimeout(() => {
          window.location.href = "/predict-page";
        }, 1000);
      } else {
        setErrorMessage(data.message);
        showToast(data.message, "error");
      }
    } catch (error) {
      console.error("Register error:", error);
      setErrorMessage("Connection error. Please try again.");
      showToast("Connection failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AuthNavbar activePath="/register" />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">🌿</div>
            <h2 className="text-2xl font-bold text-slate-800">Create account</h2>
            <p className="text-slate-500 mt-1">Join GrapeScan and protect your grapevines</p>
          </div>

          <AuthAlert type="error" message={errorMessage} />
          <AuthAlert type="success" message={successMessage} />

          <form onSubmit={handleRegister}>
            <RoleSelector role={form.role} onChange={setRole} />

            <FormField
              id="registerName"
              label="Full name"
              value={form.name}
              onChange={updateField("name")}
              placeholder="Enter your full name"
              autoComplete="name"
            />
            <FormField
              id="registerEmail"
              label="Email address"
              type="email"
              value={form.email}
              onChange={updateField("email")}
              placeholder="Enter your email"
              autoComplete="email"
            />
            <FormField
              id="registerPhone"
              label="Phone number"
              type="tel"
              value={form.phone}
              onChange={updateField("phone")}
              placeholder="e.g. 9876543210"
              autoComplete="tel"
              required={false}
            />
            <FormField
              id="registerLocation"
              label="Location / district"
              value={form.location}
              onChange={updateField("location")}
              placeholder="e.g. Nashik, Maharashtra"
              required={false}
            />

            {form.role === "consultant" && (
              <ConsultantFields
                expertise={form.expertise}
                experience={form.experience}
                onExpertiseChange={updateField("expertise")}
                onExperienceChange={updateField("experience")}
              />
            )}

            <FormField
              id="registerPassword"
              label="Password"
              type="password"
              value={form.password}
              onChange={updateField("password")}
              placeholder="Create a password (min 6 characters)"
              autoComplete="new-password"
            />
            <FormField
              id="confirmPassword"
              label="Confirm password"
              type="password"
              value={form.confirmPassword}
              onChange={updateField("confirmPassword")}
              placeholder="Confirm your password"
              autoComplete="new-password"
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-colors"
            >
              {submitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-emerald-600 font-medium hover:underline">
              Sign in here
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