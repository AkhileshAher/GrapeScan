/**
 * Escapes HTML special characters, then applies a small set of markdown-lite
 * replacements (bold, italic, inline code, line breaks). Escaping happens
 * first so user/bot text can never inject raw HTML — only our own tags
 * survive the final string.
 */
export function formatChatText(text) {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /`(.*?)`/g,
      '<code style="background:rgba(255,255,255,0.1);padding:1px 5px;border-radius:4px;font-size:0.85em;">$1</code>'
    )
    .replace(/\n/g, "<br>");
}