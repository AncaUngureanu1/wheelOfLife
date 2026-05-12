import { useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

const AREAS = [
  { key: "cariera", label: "Carieră", icon: "ti-briefcase", description: "Ai succes, dar mai ai entuziasm pentru ceea ce faci?", scale: "1 = epuizare sau stagnare | 10 = sens și motivație" },
  { key: "financiar", label: "Bani", icon: "ti-coin", description: "Cât de liniștit(ă) te simți când vine vorba de bani?", scale: "1 = stres constant | 10 = siguranță și control" },
  { key: "sanatate", label: "Sănătate", icon: "ti-heart", description: "Te susține corpul tău sau funcționezi pe „încă puțin”?", scale: "1 = oboseală constantă | 10 = energie și echilibru" },
  { key: "relatii", label: "Relații", icon: "ti-users", description: "Cât de prezent(ă) ești în relațiile importante pentru tine?", scale: "1 = distanță sau tensiune | 10 = conexiune reală" },
  { key: "dezvoltare", label: "Dezvoltare", icon: "ti-trending-up", description: "Simți că evoluezi sau că repeți același capitol?", scale: "1 = blocaj | 10 = creștere și claritate" },
  { key: "distractie", label: "Timp liber", icon: "ti-beach", description: "Ai spațiu real pentru tine, fără vinovăție?", scale: "1 = aproape deloc | 10 = timp care te încarcă" },
  { key: "sens", label: "Sens", icon: "ti-compass", description: "Simți că ceea ce faci are sens pentru tine?", scale: "1 = confuzie | 10 = direcție clară" },
];

const STEPS = ["intro", "wheel", "results", "reflect", "action", "cta"];

const scoreColor = (s) => {
  if (s <= 3) return "#E24B4A";
  if (s <= 5) return "#EF9F27";
  if (s <= 7) return "#378ADD";
  return "#1D9E75";
};

const scoreLabel = (s) => {
  if (s <= 3) return "Critică";
  if (s <= 5) return "Scăzută";
  if (s <= 7) return "Medie";
  return "Bună";
};

export default function AuditClaritate() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState(Object.fromEntries(AREAS.map(a => [a.key, 5])));
  const [reflect, setReflect] = useState({ q1: "", q2: "", q3: "" });
  const [action, setAction] = useState({ focus: "", decizie: "", pas: "" });

  const current = STEPS[step];
  const sorted = [...AREAS].sort((a, b) => scores[a.key] - scores[b.key]);
  const lowest = sorted.slice(0, 2);
  const avg = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / AREAS.length);

  const radarData = AREAS.map(a => ({
    subject: a.label.split(" ")[0],
    fullLabel: a.label,
    score: scores[a.key],
  }));

  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const styles = {
    wrap: { maxWidth: 640, margin: "0 auto", padding: "1.5rem 1rem", fontFamily: "var(--font-sans)" },
    h1: { fontSize: 22, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 8, lineHeight: 1.35 },
    h2: { fontSize: 18, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 8 },
    body: { fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.7, marginBottom: 16 },
    card: { background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "1rem 1.25rem", marginBottom: 10 },
    btn: { background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", padding: "10px 24px", fontSize: 14, cursor: "pointer", color: "var(--color-text-primary)", fontWeight: 500 },
    btnPrimary: { background: "#1D9E75", border: "none", borderRadius: "var(--border-radius-md)", padding: "12px 28px", fontSize: 14, cursor: "pointer", color: "#fff", fontWeight: 500 },
    progress: { display: "flex", gap: 4, marginBottom: 24 },
    dot: (active, done) => ({
      height: 4, flex: 1, borderRadius: 2,
      background: done ? "#1D9E75" : active ? "#1D9E75" : "var(--color-border-tertiary)",
      opacity: done ? 1 : active ? 1 : 0.4,
    }),
    tag: (color) => ({ display: "inline-block", fontSize: 11, padding: "2px 8px", borderRadius: 20, fontWeight: 500, background: color + "22", color: color, marginLeft: 8 }),
    textarea: { width: "100%", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", padding: "10px 12px", fontSize: 13, color: "var(--color-text-primary)", background: "var(--color-background-primary)", resize: "vertical", minHeight: 72, fontFamily: "var(--font-sans)", lineHeight: 1.6, boxSizing: "border-box" },
    input: { width: "100%", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", padding: "10px 12px", fontSize: 13, color: "var(--color-text-primary)", background: "var(--color-background-primary)", fontFamily: "var(--font-sans)", boxSizing: "border-box" },
  };

  const Progress = () => (
    <div style={styles.progress}>
      {STEPS.slice(1).map((s, i) => (
        <div key={s} style={styles.dot(step === i + 1, step > i + 1)} />
      ))}
    </div>
  );

  if (current === "intro") return (
    <div style={styles.wrap}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: 12 }}>Roata vietii . 10 minute</div>
        <h1 style={styles.h1}>Viața ta merge lin sau simți că înaintezi cu frâna de mână trasă?</h1>
        <p style={styles.body}>
        Poți ține totul în mișcare prin disciplină și efort. Dar dacă zonele importante din viața ta nu sunt aliniate, cu cât mergi mai repede, cu atât simți mai mult că ceva nu e în regulă.
        <br /><br />
        Imaginează-ți viața ca pe o roată unde fiecare spiță este o parte din tine: jobul, sănătatea, relațiile sau timpul tău liber.
        <br /><br />
        Acest exercițiu de 10 minute te ajută să vezi clar unde se pierde echilibrul și unde ai nevoie de puțină claritate.
        </p>
        <div style={styles.card}>
        <h2 style={styles.h2}>Bună, sunt Anca.</h2>
        <p style={{ ...styles.body, marginBottom: 0 }}>
          Lucrez cu oameni care, deși au realizat multe, simt că „ceva” nu se mai leagă.
        <br /><br />
          Am creat acest exercițiu pentru că și eu am fost acolo. Și am înțeles că nu poți schimba ceva dacă nu vezi clar ce se întâmplă.
        </p>    
    </div>

    <div style={styles.card}>
      <div style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
      <div style={{ marginBottom: 6 }}>✓ &nbsp;Evaluezi 7 arii importante din viața ta</div>
      <div style={{ marginBottom: 6 }}>✓ &nbsp;Vezi unde se pierde echilibrul</div>
      <div style={{ marginBottom: 6 }}>✓ &nbsp;Răspunzi la 3 întrebări de claritate</div>
      <div>✓ &nbsp;Alegi un pas concret pentru săptămâna asta</div>
    </div>
    </div>
        <p style={{ ...styles.body, fontSize: 12, marginBottom: 24 }}>Ia-ți 10 minute doar pentru tine. Răspunde instinctiv. Nu există răspunsuri greșite.</p>
        <button style={styles.btnPrimary} onClick={next}>Începe exercițiul →</button>
      </div>
    </div>
  );

  if (current === "wheel") return (
    <div style={styles.wrap}>
      <Progress />
      <h2 style={styles.h2}>Roata Vieții, unde ești acum, cu adevărat</h2>
      <p style={styles.body}>Acordă un scor de la 1 la 10 fiecărei arii. Nu cum crezi că ar trebui să fie, cum <em>simți</em> că este acum.</p>
      {AREAS.map(area => (
        <div key={area.key} style={{ ...styles.card, padding: "0.85rem 1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div>
           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <i className={`ti ${area.icon}`} style={{ fontSize: 16, color: scoreColor(scores[area.key]) }} aria-hidden="true" />
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>{area.label}</span>
        </div>

          <p style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5, margin: "6px 0 0" }}>
            {area.description}
          </p>
          </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={styles.tag(scoreColor(scores[area.key]))}>{scoreLabel(scores[area.key])}</span>
              <span style={{ fontSize: 18, fontWeight: 500, color: scoreColor(scores[area.key]), minWidth: 24, textAlign: "right" }}>{scores[area.key]}</span>
            </div>
          </div>
          <input type="range" min={1} max={10} step={1} value={scores[area.key]}
            onChange={e => setScores(s => ({ ...s, [area.key]: Number(e.target.value) }))}
            style={{ width: "100%", accentColor: scoreColor(scores[area.key]) }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 2 }}>
            <span>{area.scale}</span>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <button style={styles.btn} onClick={prev}>← Înapoi</button>
        <button style={styles.btnPrimary} onClick={next}>Vezi rezultatele →</button>
      </div>
    </div>
  );

  if (current === "results") return (
    <div style={styles.wrap}>
      <Progress />
      <h2 style={styles.h2}>Harta ta de energie</h2>
      <p style={styles.body}>Scorul tău mediu: <strong style={{ color: scoreColor(avg), fontWeight: 500 }}>{avg}/10</strong> , {avg <= 4 ? "există arii critice care cer atenție imediată." : avg <= 6 ? "există dezechilibre clare care îți consumă energia." : "ești la un nivel decent, dar ceva tot nu se leagă."}</p>

      <div style={{ height: 280, marginBottom: 16 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
            <PolarGrid stroke="var(--color-border-tertiary)" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} />
            <Radar dataKey="score" stroke="#1D9E75" fill="#1D9E75" fillOpacity={0.15} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8, marginBottom: 16 }}>
        {AREAS.map(a => (
          <div key={a.key} style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "0.65rem 0.85rem", borderLeft: `3px solid ${scoreColor(scores[a.key])}` }}>
            <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 2 }}>{a.label}</div>
            <div style={{ fontSize: 18, fontWeight: 500, color: scoreColor(scores[a.key]) }}>{scores[a.key]}<span style={{ fontSize: 11, fontWeight: 400 }}>/10</span></div>
          </div>
        ))}
      </div>

      <div style={{ background: "#E1F5EE", borderRadius: "var(--border-radius-lg)", padding: "1rem 1.25rem", marginBottom: 16, borderLeft: "3px solid #1D9E75" }}>
        <div style={{ fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#0F6E56", marginBottom: 6 }}>Ariile cu cel mai mare impact acum</div>
        {lowest.map(a => (
          <div key={a.key} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 16, fontWeight: 500, color: scoreColor(scores[a.key]) }}>{scores[a.key]}/10</span>
            <span style={{ fontSize: 13, color: "#085041" }}>{a.label}</span>
          </div>
        ))}
        <p style={{ fontSize: 12, color: "#0F6E56", margin: "8px 0 0", lineHeight: 1.6 }}>Acestea sunt ariile unde o schimbare mică produce cel mai mare efect în restul roții.</p>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button style={styles.btn} onClick={prev}>← Înapoi</button>
        <button style={styles.btnPrimary} onClick={next}>Continuă cu întrebările →</button>
      </div>
    </div>
  );

  if (current === "reflect") return (
    <div style={styles.wrap}>
      <Progress />
      <h2 style={styles.h2}>Trei întrebări de claritate profundă</h2>
      <p style={styles.body}>Nu există răspunsuri corecte sau greșite. Scrie primul lucru care îți vine în minte, fără filtru.</p>

      {[
        { key: "q1", q: "Ce știi deja că trebuie să se schimbe dar tot amâni?", hint: "Gândește-te la acel lucru la care te întorci în minte din nou și din nou..." },
        { key: "q2", q: "Dacă ai ști că nu poți da greș, ce ai face altfel săptămâna asta?", hint: "Scoate frica de ecuație și ascultă ce apare..." },
        { key: "q3", q: "Ce îți spune că nu e momentul și cât de adevărat e asta cu adevărat?", hint: "Identifică vocea care amână și pune-o sub semnul întrebării..." },
      ].map(({ key, q, hint }) => (
        <div key={key} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 4 }}>{q}</div>
          <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginBottom: 8, fontStyle: "italic" }}>{hint}</div>
          <textarea style={styles.textarea} value={reflect[key]}
            onChange={e => setReflect(r => ({ ...r, [key]: e.target.value }))}
            placeholder="Scrie ce simți, fără să te cenzurezi..." />
        </div>
      ))}

      <div style={{ display: "flex", gap: 10 }}>
        <button style={styles.btn} onClick={prev}>← Înapoi</button>
        <button style={styles.btnPrimary} onClick={next}>Definește pașii →</button>
      </div>
    </div>
  );

  if (current === "action") return (
    <div style={styles.wrap}>
      <Progress />
      <h2 style={styles.h2}>Claritatea fără acțiune nu schimbă nimic</h2>
      <p style={styles.body}>Acum transformi ce ai descoperit în ceva concret. Unul singur din fiecare, nu o listă, nu un plan mare. <strong style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>Unul.</strong></p>

      {[
        { key: "focus", label: "O arie de focus", hint: "Pe care arie din roată îți concentrezi energia săptămâna asta?", placeholder: `Ex: ${lowest[0]?.label || "Sănătate & energie"}` },
        { key: "decizie", label: "O decizie", hint: "Ce decizie mică, dar reală, iei acum în legătură cu acea arie?", placeholder: "Ex: Opresc toate proiectele noi până termin X." },
        { key: "pas", label: "Un pas concret", hint: "Ce faci în următoarele 48 de ore? Ceva specific, măsurabil, fezabil.", placeholder: "Ex: Marți la 9:00 sun persoana Y și spun că..." },
      ].map(({ key, label, hint, placeholder }) => (
        <div key={key} style={{ ...styles.card, marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 3 }}>{label}</div>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 10 }}>{hint}</div>
          <input style={styles.input} value={action[key]} placeholder={placeholder}
            onChange={e => setAction(a => ({ ...a, [key]: e.target.value }))} />
        </div>
      ))}

      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <button style={styles.btn} onClick={prev}>← Înapoi</button>
        <button style={styles.btnPrimary} onClick={next}>Vezi concluzia →</button>
      </div>
    </div>
  );

  if (current === "cta") return (
    <div style={styles.wrap}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
        <h2 style={{ ...styles.h2, textAlign: "center" }}>Ai terminat exercițiul.</h2>
        <p style={{ ...styles.body, textAlign: "center" }}>
          Scor mediu: <strong style={{ color: scoreColor(avg), fontWeight: 500 }}>{avg}/10</strong><br />
          Aria de focus aleasă: <strong style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>{action.focus || lowest[0]?.label || "—"}</strong>
        </p>
      </div>

     <h2 style={styles.h2}>Ce îți arată roata ta?</h2>
      <p style={{ ...styles.body, marginBottom: 0 }}>
      Nu e despre perfecțiune. E despre a vedea clar unde ai nevoie de mai multă atenție.
      <br /><br />
      Uneori, problema nu este acolo unde pare.
      <br />
      Și exact asta poate face diferența.
      </p>

     <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-lg)", padding: "1.25rem", marginBottom: 20 }}>
        <h2 style={styles.h2}>Vrei să discutăm ce înseamnă rezultatul tău?</h2>
        <p style={{ ...styles.body, marginBottom: 0 }}>
        Dacă simți că ai nevoie de claritate, putem avea un apel scurt în care ne uităm împreună la rezultate și la următorul pas potrivit pentru tine.
      </p>
      </div>

      <div style={{ textAlign: "center" }}>
         <a href="https://calendar.app.google/8QvbRGCF7fFZeVmz7"
           target="_blank"
           rel="noopener noreferrer"
           style={{ textDecoration: "none" }}
           >
       <button style={{ ...styles.btnPrimary, padding: "14px 36px", fontSize: 15 }}>
        Rezervă apelul de claritate gratuit
      </button>
         </a>
        <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 10 }}>30 minute · Online · Fără presiune</p>
      </div>

      <div style={{ borderTop: "0.5px solid var(--color-border-tertiary)", marginTop: 24, paddingTop: 16 }}>
        <button style={{ ...styles.btn, width: "100%", fontSize: 13 }} onClick={() => setStep(1)}>
          Reia auditul de la Roata Vieții
        </button>
      </div>
    </div>
  );

  return null;
}
