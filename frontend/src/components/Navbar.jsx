import { useEffect, useState } from "react";

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a
            href="/"
            className="flex items-center gap-2 text-lg font-bold text-emerald-700"
          >
            <span className="text-2xl">🍇</span>
            GrapeScan
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activePath === link.href
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {link.icon ? `${link.icon} ` : ""}
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={onLogout}
                className="px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </li>
          </ul>

          {/* Mobile toggle */}
          <MobileMenu links={NAV_LINKS} activePath={activePath} onLogout={onLogout} />
        </div>
      </div>
    </nav>
  );
}

function MobileMenu({ links, activePath, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
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
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-slate-100 px-4 py-3">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                    activePath === link.href
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {link.icon ? `${link.icon} ` : ""}
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={onLogout}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50"
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