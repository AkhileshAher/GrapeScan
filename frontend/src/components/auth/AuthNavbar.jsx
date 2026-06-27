import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AuthNavbar({ activePath = "/login" }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold text-emerald-700">
            <span className="text-2xl">🍇</span>
            GrapeScan
          </Link>

          <ul className="flex items-center gap-1">
            <li>
              <Link
                to="/"
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activePath === "/login"
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}