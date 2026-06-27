import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", href: "/", icon: null },
  { label: "Predict", href: "/predict-page", icon: "🔬" },
  { label: "Dashboard", href: "/dashboard", icon: "📊" },
  { label: "KrishiBot", href: "/chatbot", icon: "🤖" },
  { label: "Prices", href: "/prices", icon: "📈" },
  { label: "Forum", href: "/forum", icon: "💬" },
  { label: "Market", href: "/marketplace", icon: "🚜" },
];

export default function Navbar({ activePath = "/dashboard", onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sticky top-0 z-50">
      <nav
        className={`rounded-2xl transition-all duration-205 border ${
          scrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-md border-slate-200 dark:border-slate-800"
            : "bg-white dark:bg-slate-900 shadow-sm border-slate-100 dark:border-slate-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-bold text-emerald-700 dark:text-emerald-400"
            >
              <span className="text-2xl">🍇</span>
              GrapeScan
            </Link>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activePath === link.href
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
                        : "text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {link.icon ? `${link.icon} ` : ""}
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="ml-2 border-l border-slate-250 dark:border-slate-800 pl-2">
                <button
                  onClick={toggleTheme}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                </button>
              </li>
              <li>
                <button
                  onClick={onLogout}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                >
                  Logout
                </button>
              </li>
            </ul>

            {/* Mobile toggle */}
            <MobileMenu
              links={NAV_LINKS}
              activePath={activePath}
              onLogout={onLogout}
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}

function MobileMenu({ links, activePath, onLogout, theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden flex items-center gap-2">
      <button
        onClick={onToggleTheme}
        className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm"
        aria-label="Toggle theme"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        className="p-2 rounded-lg text-slate-650 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute top-20 left-4 right-4 bg-white dark:bg-slate-900 shadow-xl rounded-2xl border border-slate-150 dark:border-slate-800 px-4 py-3 z-50">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                    activePath === link.href
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
                      : "text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850"
                  }`}
                >
                  {link.icon ? `${link.icon} ` : ""}
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-slate-100 dark:border-slate-850 mt-1 pt-1">
              <button
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}