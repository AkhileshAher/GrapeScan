import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

export default function MessagesArea({ messages, isTyping }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
      {messages.map((msg, i) => (
        <MessageBubble key={msg.id ?? i} role={msg.role} text={msg.text} time={msg.time} />
      ))}
      {isTyping && <TypingIndicator />}
    </div>
  );
}