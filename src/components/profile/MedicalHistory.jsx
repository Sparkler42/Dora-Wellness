import { useState, useRef } from "react";
import Icon from "../ui/Icon";
import { T } from "../../styles/tokens";
import { medicalCategories } from "../../data/medical-history";
import { useApp } from "../../context/AppContext";

export default function MedicalHistory({ onBack }) {
  const { medicalHistory, setMedicalHistory } = useApp();
  const [checked, setChecked] = useState(medicalHistory?.checked || {});
  const [otherText, setOtherText] = useState(medicalHistory?.otherText || "");
  const [files, setFiles] = useState(medicalHistory?.files || []);
  const [expandedCat, setExpandedCat] = useState(null);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef(null);

  const toggle = (catId, item) => {
    setChecked((prev) => {
      const cat = prev[catId] || [];
      const next = cat.includes(item) ? cat.filter((x) => x !== item) : [...cat, item];
      return { ...prev, [catId]: next };
    });
    setSaved(false);
  };

  const handleFiles = (e) => {
    const newFiles = Array.from(e.target.files).map((f) => ({
      name: f.name,
      size: f.size,
      type: f.type,
      added: new Date().toISOString(),
      dataUrl: null,
    }));

    // Read each file as data URL for persistence
    Array.from(e.target.files).forEach((f, i) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFiles((prev) => {
          const updated = [...prev];
          const idx = prev.length - newFiles.length + i;
          if (updated[idx]) updated[idx] = { ...updated[idx], dataUrl: ev.target.result };
          return updated;
        });
      };
      reader.readAsDataURL(f);
    });

    setFiles((prev) => [...prev, ...newFiles]);
    setSaved(false);
    e.target.value = "";
  };

  const removeFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setSaved(false);
  };

  const saveAll = () => {
    setMedicalHistory({ checked, otherText, files });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const totalChecked = Object.values(checked).reduce((sum, arr) => sum + arr.length, 0);

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const fileIcon = (type) => {
    if (type?.startsWith("image/")) return "eye";
    return "check";
  };

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: T.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ padding: "12px 18px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 50, background: T.bg }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <Icon n="back" s={22} c={T.tx} />
        </button>
        <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, color: T.tx, margin: 0, flex: 1 }}>Medical History</h1>
        {totalChecked > 0 && (
          <span style={{ background: T.acG, color: T.ac, fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 10 }}>
            {totalChecked} selected
          </span>
        )}
      </div>

      <div style={{ padding: "0 18px 140px" }}>
        {/* Intro */}
        <div style={{ background: T.ocG, borderRadius: 16, padding: 16, marginBottom: 20 }}>
          <p style={{ color: T.txM, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            This information helps personalize your wellness experience and ensures exercises are safe for you. All data stays on your device.
          </p>
        </div>

        {/* Categories */}
        {medicalCategories.map((cat) => {
          const isOpen = expandedCat === cat.id;
          const catChecked = checked[cat.id] || [];
          return (
            <div key={cat.id} style={{ marginBottom: 10 }}>
              <button
                onClick={() => setExpandedCat(isOpen ? null : cat.id)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 12,
                  padding: "14px 16px", background: T.bgC, borderRadius: isOpen ? "14px 14px 0 0" : 14,
                  border: "none", boxShadow: T.sh, cursor: "pointer", textAlign: "left",
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: T.oc + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon n="heart" s={18} c={T.oc} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: T.tx }}>{cat.title}</h3>
                  {catChecked.length > 0 && (
                    <p style={{ margin: "2px 0 0", fontSize: 12, color: T.ac }}>{catChecked.length} selected</p>
                  )}
                </div>
                <Icon n="arrow" s={16} c={T.txL} />
              </button>

              {isOpen && (
                <div style={{ background: T.bgC, borderRadius: "0 0 14px 14px", padding: "8px 4px 12px", boxShadow: T.sh }}>
                  {cat.items.map((item) => {
                    const isChecked = catChecked.includes(item);
                    return (
                      <label
                        key={item}
                        style={{
                          display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                          cursor: "pointer", borderRadius: 10,
                          background: isChecked ? T.acG : "transparent",
                          transition: "background 0.15s",
                        }}
                      >
                        <div style={{
                          width: 22, height: 22, borderRadius: 6,
                          border: isChecked ? `2px solid ${T.ac}` : `1.5px solid ${T.bgW}`,
                          background: isChecked ? T.ac : T.bgC,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.15s", flexShrink: 0,
                        }}>
                          {isChecked && <Icon n="check" s={14} c="#fff" />}
                        </div>
                        <span style={{ fontSize: 14, color: isChecked ? T.tx : T.txM, fontWeight: isChecked ? 500 : 400 }}>{item}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggle(cat.id, item)}
                          style={{ display: "none" }}
                        />
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Other / Additional Notes */}
        <div style={{ marginTop: 16, marginBottom: 20 }}>
          <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 17, color: T.tx, margin: "0 0 10px" }}>
            Anything else we should know?
          </h3>
          <p style={{ color: T.txL, fontSize: 13, margin: "0 0 10px", lineHeight: 1.5 }}>
            Conditions, concerns, injuries, or anything not listed above.
          </p>
          <textarea
            value={otherText}
            onChange={(e) => { setOtherText(e.target.value); setSaved(false); }}
            placeholder="e.g. recovering from a torn ACL, chronic TMJ, metal implant in left knee..."
            rows={4}
            style={{
              width: "100%", background: T.bgC, borderRadius: 14, padding: 14,
              border: `1.5px solid ${T.bgW}`, color: T.tx, fontSize: 14,
              fontFamily: "'DM Sans'", resize: "vertical", outline: "none", boxSizing: "border-box",
            }}
          />
        </div>

        {/* File Upload */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 17, color: T.tx, margin: "0 0 6px" }}>
            Upload Medical Documents
          </h3>
          <p style={{ color: T.txL, fontSize: 13, margin: "0 0 14px", lineHeight: 1.5 }}>
            Lab results, imaging reports, doctor\u2019s notes, prescriptions, or anything relevant. Files stay on your device.
          </p>

          <input
            ref={fileRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt,.csv"
            onChange={handleFiles}
            style={{ display: "none" }}
          />

          <button
            onClick={() => fileRef.current?.click()}
            style={{
              width: "100%", padding: "18px", borderRadius: 14,
              border: `2px dashed ${T.bgW}`, background: T.bgC,
              cursor: "pointer", display: "flex", flexDirection: "column",
              alignItems: "center", gap: 8,
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 12, background: T.oc + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon n="arrow" s={20} c={T.oc} />
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: T.tx, fontFamily: "'DM Sans'" }}>Tap to upload files</span>
            <span style={{ fontSize: 12, color: T.txL }}>Images, PDFs, documents</span>
          </button>

          {files.length > 0 && (
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              {files.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: T.bgC, borderRadius: 12, boxShadow: T.sh }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: T.sgG, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon n={fileIcon(f.type)} s={18} c={T.sg} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: T.tx, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: T.txL }}>{formatSize(f.size)}</p>
                  </div>
                  <button
                    onClick={() => removeFile(i)}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
                  >
                    <Icon n="close" s={16} c={T.txL} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save button */}
        <button
          onClick={saveAll}
          style={{
            width: "100%", padding: "16px", border: "none", borderRadius: 14,
            background: saved ? T.sg : `linear-gradient(135deg,${T.ac},${T.acS})`,
            color: "#fff", fontSize: 16, fontWeight: 600,
            cursor: "pointer", fontFamily: "'DM Sans'",
            transition: "background 0.3s",
          }}
        >
          {saved ? "\u2713 Saved" : "Save Medical History"}
        </button>
      </div>
    </div>
  );
}
