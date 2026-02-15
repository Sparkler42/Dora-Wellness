import Icon from "../ui/Icon";
import Modal from "../ui/Modal";
import { T } from "../../styles/tokens";
import { useApp } from "../../context/AppContext";
import { notifLevels, notifCategories } from "../../data/notifications";

export default function NotificationsModal({ onClose }) {
  const { notifs, setNotifs } = useApp();

  return (
    <Modal onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <Icon n="bell" s={22} c={T.ac} />
        <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, color: T.tx, margin: 0, flex: 1 }}>Notification Style</h2>
        <button onClick={onClose} style={{ background: T.bgW, border: "none", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          <Icon n="close" s={18} c={T.txM} />
        </button>
      </div>
      <p style={{ color: T.txL, fontSize: 14, margin: "0 0 24px", lineHeight: 1.5 }}>
        We believe in invitations, not interruptions.
      </p>
      {notifCategories.map((n) => (
        <div key={n.id} style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontWeight: 600, color: T.tx, fontSize: 15 }}>{n.l}</span>
            <span style={{ color: T.ac, fontSize: 13, fontWeight: 600 }}>{notifLevels[notifs[n.id]]}</span>
          </div>
          <div style={{ display: "flex", background: T.bgW, borderRadius: 10, padding: 3 }}>
            {notifLevels.map((lv, i) => (
              <button
                key={i}
                onClick={() => setNotifs((p) => ({ ...p, [n.id]: i }))}
                style={{
                  flex: 1, padding: "8px 4px", border: "none", borderRadius: 8, fontSize: 12,
                  fontWeight: notifs[n.id] === i ? 600 : 400, cursor: "pointer",
                  background: notifs[n.id] === i ? T.bgC : "transparent",
                  color: notifs[n.id] === i ? T.ac : T.txL,
                  boxShadow: notifs[n.id] === i ? T.sh : "none",
                  transition: "all 0.2s", fontFamily: "'DM Sans'",
                }}
              >
                {lv}
              </button>
            ))}
          </div>
        </div>
      ))}
    </Modal>
  );
}
