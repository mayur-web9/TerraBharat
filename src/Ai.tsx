import { useState, useRef, useEffect } from "react";
import { 
  AiDestination, 
  DESTINATIONS, 
  FEATURES, 
  QUICK_PROMPTS, 
  SYSTEM_PROMPT,
} from "./utils/aiData";

// 🔑 PASTE YOUR GEMINI API KEY HERE
// Get it free from: https://aistudio.google.com/app/apikey
const API_KEY = "AIzaSyBOTALJGYh3ZYXfLf8Ntu0aG5W3Ou2rXqs";

async function callGemini(messages: any[], systemPrompt: string) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;

  const contents = messages.map((m: any) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      contents,
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    }),
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I could not process that.";
}

export default function Ai() {
  const [activeTab, setActiveTab] = useState("home");
  const destinationsRef = useRef<HTMLHeadingElement>(null);
  const [displayDestinations, setDisplayDestinations] = useState<AiDestination[]>(DESTINATIONS);

  useEffect(() => {
    // Load persisted destinations
    const stored = localStorage.getItem('jharYatraDestinations');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Merge: keep defaults that aren't in stored, and add stored ones
          const merged = [...DESTINATIONS];
          parsed.forEach((d: AiDestination) => {
            const index = merged.findIndex(m => m.name === d.name);
            if (index === -1) {
              merged.push(d);
            } else {
              merged[index] = d;
            }
          });
          setDisplayDestinations(merged);
        }
      } catch (e) {
        console.error("Error parsing destinations from localStorage:", e);
      }
    }
    
    if (window.location.hash === '#destinations') {
      setActiveTab("home");
      setTimeout(() => {
        destinationsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Namaste! 🙏 I'm WanderAI, your AI guide to the wonders of India. Ask me about destinations, cultures, adventures, or let me plan your perfect trip across the country!" },
  ]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);
  const [form, setForm] = useState({ days: "3", interest: "eco", budget: "medium", city: "Delhi", destination: "" });
  const [itinerary, setItinerary] = useState("");
  const [placeDetails, setPlaceDetails] = useState("");
  const [itiLoading, setItiLoading] = useState(false);

  const sanitizeAI = (text: string) => {
    return text
      .replace(/[#*]{2,}/g, "")
      .replace(/\*\*|__|~~/g, "")
      .replace(/\r\n|\r/g, "\n")
      .trim();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatLoading]);

  const sendMessage = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || chatLoading) return;
    setInput("");
    const updated = [...messages, { role: "user", content: msg }];
    setMessages(updated);
    setChatLoading(true);
    try {
      const reply = await callGemini(updated, SYSTEM_PROMPT);
      setMessages((prev) => [...prev, { role: "assistant", content: sanitizeAI(reply) }]);
    } catch (e: any) {
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ Error: " + e.message }]);
    }
    setChatLoading(false);
  };

  const generateItinerary = async () => {
    setItiLoading(true);
    setItinerary("");
    const prompt = `Create a detailed ${form.days}-day India itinerary for someone interested in ${form.interest} tourism with a ${form.budget} budget, starting from ${form.city}, focused on ${form.destination || 'India as a whole'}. Give a clear Day 1, Day 2... breakdown with places, activities, local food, and tips. After the itinerary, include a separate section called "Detailed Place Notes" describing each site in terms of best visit hours, local cuisine to try, transport tips, entry fees, and why each place is special.`;
    try {
      const result = await callGemini([{ role: "user", content: prompt }], SYSTEM_PROMPT);
      const parts = result.split(/\n?Detailed Place Notes\s*[:\-]?/i);
      if (parts.length > 1) {
        setItinerary(sanitizeAI(parts[0].trim()));
        setPlaceDetails(sanitizeAI(parts[1].trim()));
      } else {
        setItinerary(sanitizeAI(result));
        setPlaceDetails("No separate Detailed Place Notes were found. The output may already be packed with details.");
      }
    } catch (e: any) {
      setItinerary("⚠️ Error: " + e.message);
      setPlaceDetails("");
    }
    setItiLoading(false);
  };


  const S = {
    app: { fontFamily: "'Georgia',serif", background: "#0d1f0f", minHeight: "100vh", color: "#f0e6cc", width: "100%", overflowX: "hidden" },
    header: { background: "linear-gradient(180deg,#1a3a1a,#0d1f0f)", padding: "20px 0", borderBottom: "1px solid rgba(184,134,11,0.3)", position: "sticky", top: 0, zIndex: 100 },
    logoRow: { display: "flex", alignItems: "center", gap: "10px", width: "100%" },
    logoBox: { width: "42px", height: "42px", borderRadius: "12px", background: "linear-gradient(135deg,#b8860b,#daa520)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", boxShadow: "0 0 20px rgba(184,134,11,0.2)" },
    logoText: { fontSize: "24px", fontWeight: "700", background: "linear-gradient(90deg,#daa520,#f5deb3)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.5px" },
    logoSub: { fontSize: "11px", color: "#8fbc8f", letterSpacing: "3px", textTransform: "uppercase", opacity: 0.8 },
    badge: { marginLeft: "auto", fontSize: "11px", color: "#5a8a5a", textAlign: "right", borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "15px" },
    tabs: { display: "flex", gap: "8px", padding: "12px 0", background: "rgba(0,0,0,0.4)", borderBottom: "1px solid rgba(255,255,255,0.05)", sticky: "top", top: "82px", zIndex: 90 },
    tab: (a: boolean) => ({ padding: "8px 20px", borderRadius: "25px", border: "1px solid", borderColor: a ? "#daa520" : "transparent", cursor: "pointer", fontSize: "13px", fontWeight: "600", whiteSpace: "nowrap", fontFamily: "inherit", background: a ? "linear-gradient(135deg,#b8860b,#daa520)" : "rgba(255,255,255,0.06)", color: a ? "#0d1f0f" : "#c8b89a", transition: "all 0.3s ease" }),
    hero: { padding: "60px 0 40px", background: "radial-gradient(circle at center, rgba(26,58,26,0.3) 0%, transparent 70%)", textAlign: "center" },
    heroTag: { display: "inline-block", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#daa520", padding: "6px 16px", border: "1px solid rgba(184,134,11,0.4)", borderRadius: "30px", marginBottom: "20px", background: "rgba(184,134,11,0.05)" },
    heroTitle: { fontSize: "48px", fontWeight: "700", lineHeight: "1.1", background: "linear-gradient(135deg,#f5deb3,#daa520,#f5deb3)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "15px", maxWidth: "800px", margin: "0 auto 15px" },
    heroDesc: { fontSize: "16px", color: "#a89880", lineHeight: "1.7", marginBottom: "25px", maxWidth: "700px", margin: "0 auto 25px", opacity: 0.9 },
    ctaBtn: { display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 30px", borderRadius: "30px", border: "none", cursor: "pointer", background: "linear-gradient(135deg,#2d6a2d,#1a4a1a)", color: "#f0e6cc", fontSize: "14px", fontWeight: "600", fontFamily: "inherit", boxShadow: "0 10px 20px rgba(0,0,0,0.3)", transition: "transform 0.2s" },
    secTitle: { fontSize: "14px", fontWeight: "700", color: "#daa520", letterSpacing: "3px", textTransform: "uppercase", padding: "40px 0 15px", textAlign: "center", borderBottom: "1px solid rgba(184,134,11,0.1)", marginBottom: "20px" },
    chatWrap: { display: "flex", flexDirection: "column", height: "calc(100vh - 160px)", background: "rgba(0,0,0,0.2)", borderRadius: "20px 20px 0 0", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" },
    quickRow: { display: "flex", gap: "8px", padding: "15px 20px", overflowX: "auto", borderBottom: "1px solid rgba(255,255,255,0.04)" },
    msgList: { flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "10px", background: "rgba(13,31,15,0.2)" },
    msgUser: { alignSelf: "flex-end", maxWidth: "85%", background: "linear-gradient(135deg,#2d6a2d,#1a4a1a)", color: "#d4edda", padding: "12px 16px", borderRadius: "18px 18px 4px 18px", fontSize: "14px", lineHeight: "1.5", boxShadow: "0 4px 12px rgba(0,0,0,0.2)", marginBottom: "8px", position: "relative" },
    msgBot: { alignSelf: "flex-start", maxWidth: "90%", background: "#1a2a1a", border: "1px solid rgba(184,134,11,0.3)", color: "#f0e6cc", padding: "12px 16px", borderRadius: "18px 18px 18px 4px", fontSize: "14px", lineHeight: "1.6", whiteSpace: "pre-wrap", boxShadow: "0 4px 15px rgba(0,0,0,0.3)", marginBottom: "8px" },
    msgRole: { fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px", color: "rgba(255,255,255,0.5)" },
    msgTyping: { alignSelf: "flex-start", background: "rgba(26,58,26,0.5)", border: "1px solid rgba(184,134,11,0.15)", padding: "10px 14px", borderRadius: "16px 16px 16px 4px", color: "#8fbc8f", fontSize: "13px" },
    inputRow: { display: "flex", gap: "12px", padding: "20px", borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.4)" },
    chatInput: { flex: 1, padding: "12px 18px", borderRadius: "25px", border: "1px solid rgba(184,134,11,0.3)", background: "rgba(255,255,255,0.05)", color: "#f0e6cc", fontSize: "14px", outline: "none", fontFamily: "inherit" },
    sendBtn: { width: "45px", height: "45px", borderRadius: "50%", border: "none", background: "linear-gradient(135deg,#b8860b,#daa520)", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" },
    itiWrap: { padding: "40px 0", height: "calc(100vh - 160px)", overflowY: "auto" },
    card: { background: "rgba(26,58,26,0.3)", border: "1px solid rgba(184,134,11,0.2)", borderRadius: "24px", padding: "30px", boxShadow: "0 10px 40px rgba(0,0,0,0.4)" },
    label: { fontSize: "12px", color: "#daa520", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px", display: "block" },
    select: { width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid rgba(184,134,11,0.3)", background: "rgba(0,0,0,0.5)", color: "#f0e6cc", fontSize: "14px", marginBottom: "20px", fontFamily: "inherit", outline: "none", cursor: "pointer", appearance: "none", backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg%20xmlns=\"http://www.w3.org/2000/svg\"%20width=\"292.4\"%20height=\"292.4\"><path%20fill=\"%23daa520\"%20d=\"M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.3c0%203.9%201.8%208.5%205.4%2012.1l110.3%20110.3c2.9%202.9%207.3%204.4%2011%204.4s8.1-1.5%2011-4.4L248.1%2094.4c3.6-3.6%205.4-8.2%205.4-12.1%200-5-1.8-9.3-5.3-12.9z\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right%2012px%20top%2050%", backgroundSize: "12px%20auto" },
    cityInput: { width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid rgba(184,134,11,0.3)", background: "rgba(0,0,0,0.5)", color: "#f0e6cc", fontSize: "14px", marginBottom: "20px", fontFamily: "inherit", outline: "none" },
    genBtn: { width: "100%", padding: "16px", borderRadius: "14px", border: "none", cursor: "pointer", background: "linear-gradient(135deg,#b8860b,#daa520)", color: "#0d1f0f", fontSize: "16px", fontWeight: "700", fontFamily: "inherit", marginTop: "10px", boxShadow: "0 6px 20px rgba(184,134,11,0.3)" },
    quickBtn: { padding: "8px 16px", borderRadius: "20px", border: "1px solid rgba(184,134,11,0.3)", background: "rgba(255,255,255,0.05)", color: "#c8b89a", cursor: "pointer", fontSize: "12px", fontFamily: "inherit" },
    itiResult: { marginTop: "20px", padding: "20px", background: "rgba(26,58,26,0.2)", border: "1px solid rgba(184,134,11,0.2)", borderRadius: "16px", whiteSpace: "pre-wrap", lineHeight: "1.6" },
  };

  return (
    <div style={S.app}>

      <header style={S.header}>
        <div className="container" style={S.logoRow}>
          <div style={S.logoBox}>🌿</div>
          <div>
            <div style={S.logoText}>WanderAI</div>
            <div style={S.logoSub}>India Travel Guide</div>
          </div>
          <div style={S.badge}>
            <div>🤖 AI Powered</div>
            <div style={{ color: "#8fbc8f", fontWeight: "700" }}>by Gemini</div>
          </div>
        </div>
      </header>

      {/* TABS */}
      <nav style={S.tabs}>
        <div className="container" style={{ display: "flex", gap: "8px", overflowX: "auto" }}>
          {[["home","🏠 Home"],["chat","💬 AI Guide"],["plan","🗺️ Plan Trip"]].map(([id, label]) => (
            <button key={id} style={S.tab(activeTab === id)} onClick={() => setActiveTab(id)}>{label}</button>
          ))}
        </div>
      </nav>

      {/* HOME */}
      {activeTab === "home" && (
        <main className="container">
          <section style={S.hero}>
            <div style={S.heroTag}>✦ Discover Incredible India ✦</div>
            <h1 style={S.heroTitle}>Explore India's Diverse Wonders</h1>
            <p style={S.heroDesc}>From snowy Himalayas to sunny beaches, ancient temples to modern cities — experience the real India.</p>
            <button style={S.ctaBtn} onClick={() => setActiveTab("chat")}>🤖 Ask AI Guide</button>
          </section>

          <h2 ref={destinationsRef} style={S.secTitle}>✦ Top Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayDestinations.map((d) => (
              <div key={d.name} className="group relative flex flex-col rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:border-amber-500/50 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img src={d.image} alt={d.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="text-2xl">{d.emoji}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-500 bg-black/40 backdrop-blur-md px-2 py-1 rounded-md">{d.tag}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{d.name}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">{d.desc}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-1 group/link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {d.location}
                    </a>
                    <button 
                      onClick={() => { setActiveTab("chat"); sendMessage("Tell me about " + d.name); }}
                      className="text-xs font-bold text-amber-500 hover:underline"
                    >
                      Ask AI →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 style={S.secTitle}>✦ AI-Powered Platform Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h4 className="text-sm font-bold text-white mb-2">{f.title}</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <section style={{ margin: "60px 0", padding: "40px", background: "linear-gradient(135deg,rgba(45,24,16,0.6),rgba(26,58,26,0.4))", borderRadius: "32px", border: "1px solid rgba(184,134,11,0.2)", textAlign: "center", backdropFilter: "blur(10px)" }}>
            <h2 style={{ fontSize: "20px", color: "#daa520", fontWeight: "800", marginBottom: "30px", textTransform: "uppercase", letterSpacing: "2px" }}>🎯 Smart Tourism Impact</h2>
            <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "30px" }}>
              {[["1200+","Artisans Registered"],["48","Protected Sites"],["15+","Tribal Communities"],["∞","Unique Experiences"]].map(([v, l]) => (
                <div key={l} style={{ minWidth: "150px" }} className="flex flex-col items-center">
                  <div style={{ fontSize: "36px", fontWeight: "900", color: "#fff", marginBottom: "5px", textShadow: "0 0 20px rgba(255,255,255,0.2)" }}>{v}</div>
                  <div style={{ fontSize: "11px", color: "#daa520", textTransform: "uppercase", letterSpacing: "2px", fontWeight: "700" }}>{l}</div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* CHAT */}
      {activeTab === "chat" && (
        <div className="container chat-container">
          <div style={S.chatWrap}>
            <div style={{ padding: "15px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.3)" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#daa520", margin: 0 }}>🤖 WanderAI Guide</h2>
              <div style={{ fontSize: "11px", color: "#8fbc8f", marginTop: "2px" }}>Multilingual · Powered by Gemini</div>
            </div>
            <div style={S.quickRow}>
              {QUICK_PROMPTS.map((p) => (
                <button key={p} style={S.quickBtn} onClick={() => sendMessage(p)}>{p} »</button>
              ))}
            </div>
            <div style={S.msgList}>
              {messages.map((m, i) => (
                <div key={i} style={m.role === "user" ? S.msgUser : S.msgBot}>
                  <div style={S.msgRole}>{m.role === "user" ? "👤 You" : "🌿 WanderAI"}</div>
                  {m.content}
                </div>
              ))}
              {chatLoading && <div style={S.msgTyping}>WanderAI is preparing your answer… 🌿</div>}
              <div ref={chatEndRef} />
            </div>
            <div style={S.inputRow}>
              <input
                style={S.chatInput}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your question about India..."
                disabled={chatLoading}
              />
              <button style={S.sendBtn} onClick={() => sendMessage()} disabled={chatLoading}>➤</button>
            </div>
          </div>
        </div>
      )}

      {/* PLAN TRIP */}
      {activeTab === "plan" && (
        <div className="container" style={{ maxWidth: "1200px", padding: "20px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#daa520", marginBottom: "5px", textAlign: "center" }}>🗺️ AI Itinerary Planner</h1>
          <p style={{ fontSize: "14px", color: "#7a6a55", marginBottom: "30px", textAlign: "center" }}>Personalized trip plans generated by Gemini AI</p>
          <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
            <div style={{ flex: "1 1 420px" }}>
              <div style={S.card}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
                  <div>
                    <label style={S.label}>📅 Duration</label>
                    <select style={S.select} value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })}>
                      {["2","3","5","7","10"].map((d) => <option key={d} value={d} style={{background:'#0d1f0f'}}>{d} Days</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={S.label}>🎨 Primary Interest</label>
                    <select style={S.select} value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}>
                      <option value="eco" style={{background:'#0d1f0f'}}>🌿 Eco & Nature</option>
                      <option value="tribal cultural" style={{background:'#0d1f0f'}}>🎭 Tribal Culture</option>
                      <option value="spiritual" style={{background:'#0d1f0f'}}>🛕 Spiritual</option>
                      <option value="adventure" style={{background:'#0d1f0f'}}>⛰️ Adventure</option>
                      <option value="rare visited" style={{background:'#0d1f0f'}}>🔍 Discover Unseen</option>
                      <option value="mixed" style={{background:'#0d1f0f'}}>🌈 Mixed / All</option>
                    </select>
                  </div>
                  <div>
                    <label style={S.label}>💰 Budget Preference</label>
                    <select style={S.select} value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
                      <option value="budget" style={{background:'#0d1f0f'}}>💚 Budget</option>
                      <option value="medium" style={{background:'#0d1f0f'}}>💛 Mid-range</option>
                      <option value="premium" style={{background:'#0d1f0f'}}>🌟 Premium</option>
                    </select>
                  </div>
                  <div>
                    <label style={S.label}>📍 Starting City</label>
                    <input
                      type="text"
                      style={S.cityInput}
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="Type any city in India..."
                    />
                  </div>
                  <div>
                    <label style={S.label}>🏁 Destination</label>
                    <input
                      type="text"
                      style={S.cityInput}
                      value={form.destination}
                      onChange={(e) => setForm({ ...form, destination: e.target.value })}
                      placeholder="Type a destination or region in India..."
                    />
                  </div>
                </div>
                <button style={S.genBtn} onClick={generateItinerary} disabled={itiLoading}>
                  {itiLoading ? "✨ Generating your journey..." : "✨ Generate AI Itinerary"}
                </button>
              </div>
            </div>
            <div style={{ flex: "1 1 640px", display: "grid", gap: "20px" }}>
              <div style={S.itiResult}>
                <h3 style={{ marginTop: 0, color: "#daa520" }}>Trip Itinerary</h3>
                {itinerary || "🌿 Fill in your travel style and let AI plan your India adventure"}
              </div>
              <div style={S.itiResult}>
                <h3 style={{ marginTop: 0, color: "#daa520" }}>Detailed Place Notes</h3>
                {placeDetails || "No detailed place notes yet. Generate itinerary to view details."}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}