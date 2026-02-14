import { EX } from "../data/exercises";

export function getRecommendations(profile) {
  if (!profile) return Object.values(EX).slice(0, 5);

  const r = [];
  const g = profile.goals || [];
  const a = profile.bodyAreas || [];
  const mi = profile.mindInterest || [];

  if (g.includes("Reduce pain or tension") || a.includes("Lower back")) r.push(EX.somatic);
  if (g.includes("Build strength") || a.includes("Core")) r.push(EX.strength);
  if (g.includes("Improve flexibility")) r.push(EX.stretch);
  if (g.includes("Mental clarity") || mi.includes("Attention training")) r.push(EX.attention);
  if (g.includes("Stress relief") || g.includes("Better sleep")) r.push(EX.meditation);
  if (g.includes("Fun & play")) r.push(EX.playful);
  if (g.includes("Self-discovery") || mi.includes("Imagination")) r.push(EX.imagine);
  if (g.includes("Body connection")) r.push(EX.sensory);
  if (mi.includes("Self-reflection")) r.push(EX.selfaware);
  if (a.includes("Feet & ankles")) r.push(EX.barefoot);
  if (a.includes("Hips & pelvis")) r.push(EX.yoga);

  const seen = new Set();
  const u = r.filter((e) => {
    if (seen.has(e.id)) return false;
    seen.add(e.id);
    return true;
  });

  if (!seen.has("yoga")) u.push(EX.yoga);
  if (!seen.has("nutrition")) u.push(EX.nutrition);

  return u.slice(0, 6);
}

export function isLocked(ex, tier) {
  if (tier !== "free") return false;
  return !["yoga", "stretch", "strength", "barefoot", "somatic", "nutrition", "meditation", "selfaware", "imagine"].includes(ex.id);
}
