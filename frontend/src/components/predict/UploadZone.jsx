import { useRef, useState } from "react";

const VALID_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/bmp", "image/webp"];
const MAX_SIZE_BYTES = 16 * 1024 * 1024;

export default function UploadZone({ selectedFile, onFileSelected, onInvalidFile }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const validateAndEmit = (file) => {
    if (!file) return;

    if (!VALID_TYPES.includes(file.type)) {
      onInvalidFile("Please select a valid image file (PNG, JPG, GIF, BMP, WEBP).");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      onInvalidFile("File is too large. Maximum size is 16MB.");
      return;
    }
    onFileSelected(file);
  };

  const handleInputChange = (e) => {
    validateAndEmit(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    validateAndEmit(e.dataTransfer.files[0]);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`cursor-pointer rounded-2xl border-2 border-dashed px-8 py-12 text-center transition-colors ${
        dragOver
          ? "border-emerald-500 bg-emerald-50"
          : "border-slate-300 bg-white hover:border-emerald-400 hover:bg-emerald-50/40"
      }`}
    >
      <span className="text-5xl block mb-3">📤</span>
      <h3 className="text-lg font-semibold text-slate-800 mb-1">Upload grape leaf image</h3>
      <p className="text-slate-500 text-sm">Drag & drop an image here, or click to browse</p>
      <p className="text-xs text-slate-400 mt-2">
        Supports: PNG, JPG, JPEG, GIF, BMP, WEBP (max 16MB)
      </p>

      {selectedFile && (
        <p className="text-sm text-emerald-700 font-medium mt-3">
          📎 {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}