import Link from "next/link";

export default function Page() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "HyperSelf";
  return (
    <main className="container">
      <div className="card" style={{ textAlign: "center", padding: "40px" }}>
        <div className="badge">BETA</div>
        <h1 style={{ margin: "12px 0 6px", fontSize: 38 }}>{appName}</h1>
        <p style={{ color: "var(--muted)" }}>
          Gerçek hayat, en zor oyun. Gününü gir, XP kazan, level atla.
        </p>

        <div style={{ marginTop: 18, display: "flex", gap: 10, justifyContent: "center" }}>
          <Link className="btn" href="/signup">Hemen Başla</Link>
          <Link className="btn" href="/login" style={{ background:"#20263a", color:"#e9ecf1" }}>
            Giriş Yap
          </Link>
        </div>

        <div className="hr" />
        <div className="grid grid-2">
          <div className="card">
            <h3>XP Sistemi</h3>
            <p style={{ color: "var(--muted)" }}>
              Spor, öğrenme, üretim gibi aktiviteler dakikaya göre XP üretir.
            </p>
          </div>
          <div className="card">
            <h3>Seviye ve İstatistik</h3>
            <p style={{ color: "var(--muted)" }}>
              Toplam XP → Level. Haftalık kartını paylaş, motivasyonu yükselt.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
