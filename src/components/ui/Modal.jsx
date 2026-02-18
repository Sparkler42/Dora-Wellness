import React from "react";
import { T } from "../../styles/tokens";

export default function Modal({ children, dark, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "flex-end",
        background: "rgba(44,40,37,0.5)",
        backdropFilter: "blur(8px)",
        animation: "fadeIn 0.3s",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxHeight: "92vh",
          background: dark ? T.bgD : T.bg,
          borderRadius: "24px 24px 0 0",
          padding: "28px 22px 40px",
          overflowY: "auto",
          animation: "slideUp 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          onClick={onClose}
          style={{
            width: 40,
            height: 4,
            background: dark ? "rgba(255,255,255,0.15)" : T.txL,
            borderRadius: 2,
            margin: "0 auto 20px",
            opacity: 0.4,
            cursor: "pointer",
            padding: "10px 0",
            backgroundClip: "content-box",
          }}
        />
        {children}
      </div>
    </div>
  );
}
