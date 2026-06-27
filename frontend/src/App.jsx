import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Chatbot from "./pages/Chatbot";
import Dashboard from "./pages/Dashboard";
import Forum from "./pages/Forum";
import ForumThread from "./pages/ForumThread";
import Login from "./pages/Login";
import Marketplace from "./pages/MarketPlace";
import Predict from "./pages/Predict";
import Prices from "./pages/Prices";
import Register from "./pages/Register";

const getPageComponent = (pathname) => {
  if (pathname.startsWith("/forum/thread/")) {
    return <ForumThread />;
  }

  switch (pathname) {
    case "/login":
      return <Login />;
    case "/register":
      return <Register />;
    case "/predict-page":
      return <Predict />;
    case "/chatbot":
      return <Chatbot />;
    case "/prices":
      return <Prices />;
    case "/forum":
      return <Forum />;
    case "/marketplace":
      return <Marketplace />;
    case "/dashboard":
    case "/":
    default:
      return <Dashboard />;
  }
};

const App = () => {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar activePath={pathname} />
      {getPageComponent(pathname)}
    </div>
  );
};

export default App;
