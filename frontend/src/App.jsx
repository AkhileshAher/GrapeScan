import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Predict from "./pages/Predict";
import Chatbot from "./pages/Chatbot";
import Schemes from "./pages/Schemes";
import Prices from "./pages/Prices";
import Recommendations from "./pages/Recommendations";
import Forum from "./pages/Forum";
import ForumThread from "./pages/ForumThread";
import Marketplace from "./pages/MarketPlace";

function ForumThreadWrapper() {
  const { threadId } = useParams();
  return <ForumThread threadId={threadId} />;
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/predict-page" element={<Predict />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/prices" element={<Prices />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/thread/:threadId" element={<ForumThreadWrapper />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </Router>
  );
};

export default App;

