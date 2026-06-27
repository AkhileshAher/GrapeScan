const TONE = {
  error: "bg-red-50 text-red-700 border-red-200",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function AuthAlert({ type, message }) {
  if (!message) return null;

  return (
    <div className={`border rounded-xl px-4 py-3 text-sm font-medium mb-5 ${TONE[type]}`}>
      {message}
    </div>
  );
}