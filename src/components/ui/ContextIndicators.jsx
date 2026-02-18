import React from "react";
import Icon from "./Icon";
import { T } from "../../styles/tokens";

const activityIcons = { walking: "walk", running: "run", stationary: null };
const activityLabels = { walking: "Walking", running: "Running" };

export default function ContextIndicators({ activity, location, steps, sensorsEnabled }) {
  if (!sensorsEnabled) return null;

  const badges = [];

  if (activity?.type && activity.type !== "stationary") {
    badges.push({
      key: "activity",
      icon: activityIcons[activity.type],
      label: activityLabels[activity.type],
      color: T.oc,
    });
  }

  if (location?.type) {
    badges.push({
      key: "location",
      icon: "location",
      label: location.name || location.type,
      color: T.sg,
    });
  }

  if (steps?.total > 0) {
    badges.push({
      key: "steps",
      icon: "steps",
      label: steps.total.toLocaleString(),
      color: T.ac,
    });
  }

  if (badges.length === 0) return null;

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
      {badges.map((b) => (
        <div
          key={b.key}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: b.color + "18",
            borderRadius: 20,
            padding: "5px 12px 5px 8px",
          }}
        >
          <Icon n={b.icon} s={14} c={b.color} />
          <span style={{ fontSize: 12, fontWeight: 500, color: b.color }}>{b.label}</span>
        </div>
      ))}
    </div>
  );
}
