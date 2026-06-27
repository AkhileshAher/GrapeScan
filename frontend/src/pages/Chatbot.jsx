import { useEffect, useState } from "react";
import ChatNavbar from "../components/chatbot/ChatNavbar";
import ChatSidebar from "../components/chatbot/ChatSidebar";
import WelcomeScreen from "../components/chatbot/WelcomeScreen";
import MessagesArea from "../components/chatbot/MessagesArea";
import ChatInput from "../components/chatbot/ChatInput";

function nowLabel() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

export default function Chatbot() {
  const [token, setToken] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sending, setSending] = useState(false);

  // Auth guard.
  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (!stored) {
      window.location.href = "/login";
      return;
    }
    setToken(stored);
  }, []);

  const loadSessions = async (authToken) => {
    setSessionsLoading(true);
    try {
      const res = await fetch("/api/chat/sessions", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch (error) {
      console.error("Failed to load sessions:", error);
    } finally {
      setSessionsLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadSessions(token);
  }, [token]);

  const loadSession = async (sessionId) => {
    if (!token) return;
    setActiveSessionId(sessionId);
    try {
      const res = await fetch(`/api/chat/history/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      const loaded = [];
      for (const msg of data.messages || []) {
        loaded.push({ role: "user", text: msg.user_message, time: msg.timestamp });
        loaded.push({ role: "bot", text: msg.bot_response, time: msg.timestamp });
      }
      setMessages(loaded);
      loadSessions(token);
    } catch (error) {
      console.error("Failed to load session history:", error);
    }
  };

  const startNewChat = () => {
    setActiveSessionId(null);
    setMessages([]);
    if (token) loadSessions(token);
  };

  const sendMessage = async (overrideText) => {
    const text = (overrideText ?? inputValue).trim();
    if (!text || !token || sending) return;

    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", text, time: nowLabel() }]);
    setIsTyping(true);
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: text, session_id: activeSessionId }),
      });
      const data = await res.json();
      setIsTyping(false);

      if (data.success) {
        setActiveSessionId(data.session_id);
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: data.response, time: data.timestamp || nowLabel() },
        ]);
        loadSessions(token);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: "⚠️ " + (data.response || "Something went wrong. Please try again."),
            time: nowLabel(),
          },
        ]);
      }
    } catch (error) {
      console.error("Chat send error:", error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Connection error. Please check your internet and try again.", time: nowLabel() },
      ]);
    } finally {
      setSending(false);
    }
  };

  const showWelcome = messages.length === 0;

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      <ChatNavbar />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:flex">
          <ChatSidebar
            sessions={sessions}
            loading={sessionsLoading}
            activeSessionId={activeSessionId}
            onSelectSession={loadSession}
            onNewChat={startNewChat}
          />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          {showWelcome ? (
            <WelcomeScreen onQuickPrompt={(prompt) => sendMessage(prompt)} />
          ) : (
            <MessagesArea messages={messages} isTyping={isTyping} />
          )}

          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={() => sendMessage()}
            disabled={sending}
          />
        </div>
      </div>
    </div>
  );
}