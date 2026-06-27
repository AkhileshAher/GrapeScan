const ROLE_STYLES = {
  farmer: {
    active: "bg-emerald-50 border-emerald-500 text-emerald-600",
    inactive: "bg-slate-50 border-slate-200 text-slate-500",
  },
  consultant: {
    active: "bg-violet-50 border-violet-500 text-violet-600",
    inactive: "bg-slate-50 border-slate-200 text-slate-500",
  },
};

export default function RoleSelector({ role, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        I am registering as <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onChange("farmer")}
          className={`flex-1 rounded-xl border-2 px-3 py-3 text-sm font-bold text-center transition-colors ${
            role === "farmer" ? ROLE_STYLES.farmer.active : ROLE_STYLES.farmer.inactive
          }`}
        >
          👩‍🌾 Farmer
        </button>
        <button
          type="button"
          onClick={() => onChange("consultant")}
          className={`flex-1 rounded-xl border-2 px-3 py-3 text-sm font-bold text-center transition-colors ${
            role === "consultant" ? ROLE_STYLES.consultant.active : ROLE_STYLES.consultant.inactive
          }`}
        >
          👨‍💼 Consultant
        </button>
      </div>
    </div>
  );
}