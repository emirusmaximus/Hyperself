// Basit XP hesaplayıcı: kategoriye göre çarpan + yoğunluğa bonus
// Kategoriler: Sleep/Sport/Social/Learn/Build/Rest
const MULTIPLIERS: Record<string, number> = {
  Sleep: 0.5,
  Sport: 2.0,
  Social: 1.0,
  Learn: 1.8,
  Build: 2.2,
  Rest: 0.4,
}

export function computeXP(category: string, minutes: number, intensity: number) {
  const base = MULTIPLIERS[category] ?? 1
  const bonus = 1 + (intensity - 3) * 0.15 // 1–5 arası: -0.3 .. +0.3
  const xp = Math.round(minutes * base * bonus)
  return xp < 0 ? 0 : xp
}

// Toplam XP → Level (kademeli artan gereksinim: 100, 200, 300, …)
export function levelFromXP(totalXP: number) {
  let lvl = 1
  let need = 100
  let xp = totalXP
  while (xp >= need) { xp -= need; lvl += 1; need += 100 }
  const progress = Math.min(100, Math.round((xp / need) * 100))
  return { level: lvl, progress, next: need }
}
