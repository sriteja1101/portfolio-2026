import { useState, useEffect, useRef } from "react";
import {
  FiGithub, FiMail, FiPhone, FiExternalLink,
  FiCode, FiLayers, FiServer,
  FiMenu, FiX, FiArrowUpRight
} from "react-icons/fi";
import {
  SiMongodb, SiExpress, SiReact, SiNodedotjs,
  SiTailwindcss, SiHtml5, SiCss, SiJavascript
} from "react-icons/si";

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #090b10; --bg2: #0d1017; --bg3: #111620;
      --border: rgba(255,255,255,0.07); --accent: #00e5ff; --accent2: #7b61ff;
      --text: #e8eaf2; --muted: #6b7280; --card: #12161f;
      --px: clamp(16px, 5vw, 80px);
    }
    html { scroll-behavior: smooth; }
    body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; overflow-x: hidden; width: 100%; }
    body::before {
      content: ''; position: fixed; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none; z-index: 9999; opacity: 0.35;
    }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }
    .dot-grid { background-image: radial-gradient(circle, rgba(0,229,255,0.12) 1px, transparent 1px); background-size: 40px 40px; }
    .glow-line { height: 1px; background: linear-gradient(90deg, transparent, var(--accent), transparent); opacity: 0.4; }
    .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
    .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,229,255,0.08); border-color: rgba(0,229,255,0.25) !important; }
    .skill-badge { transition: all 0.25s ease; border: 1px solid var(--border); }
    .skill-badge:hover { border-color: var(--accent); background: rgba(0,229,255,0.06); transform: translateY(-3px); box-shadow: 0 8px 30px rgba(0,229,255,0.1); }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
    .fade-up { opacity: 0; animation: fadeUp 0.7s ease forwards; }
    .delay-1 { animation-delay: 0.1s; } .delay-2 { animation-delay: 0.22s; } .delay-3 { animation-delay: 0.34s; } .delay-4 { animation-delay: 0.46s; } .delay-5 { animation-delay: 0.58s; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    .cursor { animation: blink 1s step-end infinite; }
    @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
    .scan-line { position: absolute; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, rgba(0,229,255,0.18), transparent); animation: scan 6s linear infinite; pointer-events: none; }
    @keyframes orbit { from { transform: rotate(0deg) translateX(90px) rotate(0deg); } to { transform: rotate(360deg) translateX(90px) rotate(-360deg); } }
    .orbit-dot { position: absolute; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: orbit 8s linear infinite; box-shadow: 0 0 10px var(--accent); }
    .nav-link { position: relative; font-family: 'Syne', sans-serif; font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); transition: color 0.2s; }
    .nav-link::after { content: ''; position: absolute; bottom: -3px; left: 0; width: 0; height: 1px; background: var(--accent); transition: width 0.25s ease; }
    .nav-link:hover, .nav-link.active { color: var(--text); }
    .nav-link:hover::after, .nav-link.active::after { width: 100%; }
    .btn-accent { position: relative; display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: transparent; border: 1px solid var(--accent); color: var(--accent); font-family: 'Syne', sans-serif; font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.25s; overflow: hidden; white-space: nowrap; }
    .btn-accent::before { content: ''; position: absolute; inset: 0; background: var(--accent); transform: translateX(-100%); transition: transform 0.25s ease; z-index: 0; }
    .btn-accent:hover::before { transform: translateX(0); }
    .btn-accent:hover { color: #090b10; }
    .btn-accent span, .btn-accent svg { position: relative; z-index: 1; }
    .section-label { font-family: 'Syne', sans-serif; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); }
    .proj-img { transition: transform 0.4s ease; }
    .card-hover:hover .proj-img { transform: scale(1.04); }

    /* Desktop defaults */
    .nav-desktop { display: flex; }
    .nav-mobile-btn { display: none; }
    .hero-ring { display: flex; }
    .skills-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
    .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .contact-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
    .footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
    .btn-row { display: flex; gap: 14px; flex-wrap: wrap; }

    /* Tablet */
    @media (max-width: 1024px) {
      .projects-grid { grid-template-columns: repeat(2, 1fr); }
    }

    /* Mobile */
    @media (max-width: 768px) {
      .nav-desktop { display: none !important; }
      .nav-mobile-btn { display: flex !important; }
      .hero-ring { display: none !important; }
      .skills-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
      .projects-grid { grid-template-columns: 1fr; }
      .contact-grid { grid-template-columns: 1fr; }
      .footer-inner { flex-direction: column; align-items: flex-start; gap: 12px; }
      .btn-row { flex-direction: column; align-items: flex-start; }
    }

    /* Small mobile */
    @media (max-width: 480px) {
      .skills-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    }
  `}</style>
);

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.1, ...options });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["home", "skills", "projects", "contact"];
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id); setOpen(false);
  };
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(9,11,16,0.95)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none", transition: "all 0.3s ease", padding: "0 var(--px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em", flexShrink: 0 }}>
          <span style={{ color: "var(--text)" }}>sri</span><span style={{ color: "var(--accent)" }}>teja</span><span style={{ color: "var(--muted)", fontWeight: 400, fontSize: "0.85rem" }}>.dev</span>
        </div>
        <div className="nav-desktop" style={{ gap: 36, alignItems: "center" }}>
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l)} className={`nav-link ${active === l ? "active" : ""}`} style={{ background: "none", border: "none", cursor: "pointer" }}>{l}</button>
          ))}
          <a href="https://github.com/SriTeja-Cheemakurthy" target="_blank" rel="noreferrer" style={{ color: "var(--muted)", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"} onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}><FiGithub size={18} /></a>
        </div>
        <button onClick={() => setOpen(!open)} className="nav-mobile-btn" style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer", padding: 4 }}>
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>
      {open && (
        <div style={{ background: "rgba(9,11,16,0.98)", backdropFilter: "blur(20px)", borderTop: "1px solid var(--border)", padding: "20px var(--px) 28px", display: "flex", flexDirection: "column", gap: 0 }}>
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l)} className="nav-link" style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: "1rem", padding: "14px 0", borderBottom: "1px solid var(--border)", width: "100%" }}>{l}</button>
          ))}
          <a href="https://github.com/SriTeja-Cheemakurthy" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)", textDecoration: "none", fontFamily: "'Syne', sans-serif", fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", paddingTop: 16 }}><FiGithub size={16} /> GitHub</a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [typed, setTyped] = useState("");
  const full = "Full Stack Developer";
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { setTyped(full.slice(0, ++i)); if (i >= full.length) clearInterval(t); }, 60);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="home" className="dot-grid" style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", padding: "0 var(--px)" }}>
      <div style={{ position: "absolute", top: "20%", right: "10%", width: "clamp(200px,40vw,500px)", height: "clamp(200px,40vw,500px)", background: "radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "5%", width: "clamp(150px,25vw,300px)", height: "clamp(150px,25vw,300px)", background: "radial-gradient(circle, rgba(123,97,255,0.07) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div className="scan-line" />
      <div className="hero-ring" style={{ position: "absolute", right: "6%", top: "50%", transform: "translateY(-50%)", width: 200, height: 200, border: "1px solid rgba(0,229,255,0.12)", borderRadius: "50%", pointerEvents: "none", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 150, height: 150, border: "1px solid rgba(0,229,255,0.07)", borderRadius: "50%", position: "relative" }}>
          <div className="orbit-dot" />
          <div style={{ width: 100, height: 100, border: "1px dashed rgba(0,229,255,0.1)", borderRadius: "50%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", paddingTop: 80, paddingBottom: 60 }}>
        <p className="section-label fade-up delay-1">Hello, world —</p>
        <h1
          className="fade-up delay-2 
                    text-[clamp(1.8rem,5.5vw,5rem)] 
                    leading-[1.1] tracking-[-0.02em] 
                    mt-3 text-[var(--text)] break-words"
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
        >
          <span className="block">Sri Teja</span>

          <span
            className="block text-transparent break-all sm:break-normal"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
          >
            Cheemakurthy
          </span>
        </h1>
        <div className="fade-up delay-3" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(0.95rem,2.5vw,1.35rem)", color: "var(--accent)", marginTop: 18, letterSpacing: "0.05em", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
          {typed}<span className="cursor" style={{ color: "var(--accent)" }}>|</span>
        </div>
        <p
          className="fade-up delay-4"
          style={{
            color: "var(--muted)",
            fontSize: "clamp(0.85rem,2vw,0.95rem)",
            maxWidth: 520,
            lineHeight: 1.75,
            marginTop: 10,
          }}
        >
          Currently working as a Junior Developer at{" "}
          <span style={{ color: "rgba(255,255,255,0.7)" }}>
            Ushnik Technologies Pvt Ltd
          </span>{" "}
          <span
            style={{
              marginLeft: "8px",
              padding: "2px 8px",
              fontSize: "0.75rem",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Sept 2024 – Present
          </span>
        </p>
        <p className="fade-up delay-4" style={{ color: "var(--muted)", fontSize: "clamp(0.85rem,2vw,0.95rem)", maxWidth: 540, lineHeight: 1.8, marginTop: 14 }}>
          Full Stack Developer delivering scalable web applications using React 18, Node.js, and MongoDB. Improved API performance by 50% and reduced defects by up to 40% through test automation across 20+ REST endpoints. Hands-on experience with design tools such as Figma or Adobe XD.
          Strong understanding of UI/UX principles, usability, and user-centered design.
          Experience designing for both mobile applications and web platforms.
          Ability to create wireframes, high-fidelity UI designs, and interactive prototypes.
          Good understanding of responsive design and modern UI design practices.
          Strong communication skills and ability to collaborate with product and engineering teams.
        </p>
        <div className="fade-up delay-5 btn-row" style={{ marginTop: 32 }}>
          <button className="btn-accent" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}><span>View Projects</span><FiArrowUpRight size={14} /></button>
          <a href="https://github.com/SriTeja-Cheemakurthy" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", border: "1px solid var(--border)", color: "var(--muted)", fontFamily: "'Syne', sans-serif", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.25s", whiteSpace: "nowrap" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "var(--text)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}><FiGithub size={14} /> GitHub</a>
        </div>
        <div className="fade-up delay-5" style={{ display: "flex", gap: "clamp(20px,5vw,40px)", marginTop: 52, flexWrap: "wrap" }}>
          {[["50%", "API Speed Boost"], ["12+", "UI Modules Shipped"], ["150+", "Test Cases"]].map(([num, label]) => (
            <div key={label} style={{ minWidth: 70 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(1.3rem,3vw,1.6rem)", color: "var(--accent)" }}>{num}</div>
              <div style={{ color: "var(--muted)", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="glow-line" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
    </section>
  );
}

const SKILLS = [
  { icon: SiMongodb,     label: "MongoDB",      color: "#47A248", category: "Database" },
  { icon: SiExpress,     label: "Express.js",   color: "#ffffff", category: "Backend"  },
  { icon: SiReact,       label: "React 18",     color: "#61DAFB", category: "Frontend" },
  { icon: SiNodedotjs,   label: "Node.js 18",   color: "#339933", category: "Backend"  },
  { icon: SiTailwindcss, label: "Tailwind CSS", color: "#06B6D4", category: "Styling"  },
  { icon: SiHtml5,       label: "HTML5",        color: "#E34F26", category: "Markup"   },
  { icon: SiCss,         label: "CSS3",         color: "#1572B6", category: "Styling"  },
  { icon: SiJavascript,  label: "JavaScript",   color: "#F7DF1E", category: "Language" },
];

function Skills() {
  const [ref, inView] = useInView();
  return (
    <section id="skills" ref={ref} style={{ padding: "clamp(60px,10vw,120px) var(--px)", background: "var(--bg2)", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p className="section-label" style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s" }}>— Tech Arsenal</p>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3.2rem)", letterSpacing: "-0.02em", marginTop: 10, marginBottom: 12, opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.6s 0.1s" }}>Skills & Technologies</h2>
        <p style={{ color: "var(--muted)", maxWidth: 480, lineHeight: 1.7, fontSize: "clamp(0.85rem,2vw,1rem)", marginBottom: 48, opacity: inView ? 1 : 0, transition: "opacity 0.6s 0.2s" }}>
          The tools I use to build production-ready, scalable full-stack applications — from database design to pixel-perfect UIs.
        </p>
        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <div key={s.label} className="skill-badge" style={{ background: "var(--card)", borderRadius: 12, padding: "clamp(16px,3vw,24px) 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "default", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: `all 0.5s ${0.05 * i + 0.2}s` }}>
              <s.icon size={32} color={s.color} />
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "clamp(0.72rem,1.5vw,0.82rem)", textAlign: "center" }}>{s.label}</span>
              <span style={{ fontSize: "0.6rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "2px 8px", border: "1px solid var(--border)", borderRadius: 4 }}>{s.category}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="glow-line" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
    </section>
  );
}

const PROJECTS = [
  { title: "Commerce Workflow Backend", desc: "Designed 20+ REST endpoints using Node.js 18, Express.js 4, and MongoDB for inventory, cart, and order flows. Drove 150+ Postman test cases — cutting API latency by 50% and reducing integration faults by 35–40%.", tags: ["Node.js", "Express.js", "MongoDB", "JWT", "Postman"], color: "#00e5ff", icon: FiServer, github: "https://github.com/sriteja1101/ecommerce_backend", live: "https://github.com/SriTeja-Cheemakurthy" },
  { title: "Full-Stack Expense Tracker", desc: "Engineered a React 18 dashboard with 15+ reusable components integrated with Node.js and Express.js. Reduced page load time by 50–55% through performance profiling and render path optimization.", tags: ["React.js", "Node.js", "MongoDB", "JWT", "Gemini AI"], color: "#7b61ff", icon: FiLayers, github: "https://github.com/sriteja1101/expensetracker", live: "https://github.com/SriTeja-Cheemakurthy" },
  { title: "Automated Document Workflow", desc: "Built a multi-step React 18 workflow with 10+ components integrated with Node.js and Gemini API. Added 30+ test cases — shrinking proposal generation latency by 45–50%.", tags: ["React.js", "Node.js", "Nodemailer", "Gemini API"], color: "#ff6b6b", icon: FiCode, github: "https://github.com/sriteja1101/automated_document_workflow", live: "https://lnkd.in/gCU-__bS" },
];

function Projects() {
  const [ref, inView] = useInView();
  return (
    <section id="projects" ref={ref} style={{ padding: "clamp(60px,10vw,120px) var(--px)", background: "var(--bg)", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: "clamp(200px,35vw,400px)", height: "clamp(200px,35vw,400px)", background: "radial-gradient(circle, rgba(123,97,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p className="section-label" style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s" }}>— Selected Work</p>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3.2rem)", letterSpacing: "-0.02em", marginTop: 10, marginBottom: 12, opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.6s 0.1s" }}>Featured Projects</h2>
        <p style={{ color: "var(--muted)", maxWidth: 480, lineHeight: 1.7, fontSize: "clamp(0.85rem,2vw,1rem)", marginBottom: 48, opacity: inView ? 1 : 0, transition: "opacity 0.6s 0.2s" }}>
          Real-world projects that demonstrate my ability to architect, build, and optimize full-stack web applications.
        </p>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div key={p.title} className="card-hover" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: `all 0.6s ${0.15 * i + 0.2}s`, display: "flex", flexDirection: "column" }}>
              <div className="proj-img" style={{ height: "clamp(130px,18vw,180px)", overflow: "hidden", background: `linear-gradient(135deg, ${p.color}18 0%, var(--bg3) 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", flexShrink: 0 }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <p.icon size={44} color={p.color} style={{ opacity: 0.6, position: "relative" }} />
                <div style={{ position: "absolute", bottom: 10, right: 10, fontSize: "0.6rem", color: p.color, fontFamily: "'Syne', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", border: `1px solid ${p.color}40`, padding: "3px 8px", borderRadius: 4 }}>Full Stack</div>
              </div>
              <div style={{ padding: "clamp(16px,3vw,24px)", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(0.95rem,2vw,1.1rem)", marginBottom: 10 }}>{p.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: "clamp(0.78rem,1.5vw,0.875rem)", lineHeight: 1.7, marginBottom: 14, flex: 1 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {p.tags.map(t => (<span key={t} style={{ fontSize: "0.63rem", padding: "3px 9px", background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}30`, borderRadius: 20, fontFamily: "'Syne', sans-serif" }}>{t}</span>))}
                </div>
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14, display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <a href={p.github} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--muted)", fontSize: "0.78rem", textDecoration: "none", fontFamily: "'Syne', sans-serif", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"} onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}><FiGithub size={13} /> Source Code</a>
                  <a href={p.live} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--muted)", fontSize: "0.78rem", textDecoration: "none", fontFamily: "'Syne', sans-serif", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = p.color} onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}><FiExternalLink size={13} /> Live Demo</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="glow-line" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
    </section>
  );
}

function Contact() {
  const [ref, inView] = useInView();
  return (
    <section id="contact" ref={ref} style={{ padding: "clamp(60px,10vw,120px) var(--px)", background: "var(--bg2)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "clamp(300px,50vw,600px)", height: 400, background: "radial-gradient(ellipse, rgba(0,229,255,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p className="section-label" style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s" }}>— Get In Touch</p>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3.2rem)", letterSpacing: "-0.02em", marginTop: 10, marginBottom: 14, opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.6s 0.1s" }}>Let's Work Together</h2>
        <p style={{ color: "var(--muted)", maxWidth: 540, lineHeight: 1.8, fontSize: "clamp(0.85rem,2vw,1rem)", marginBottom: 48, opacity: inView ? 1 : 0, transition: "opacity 0.6s 0.2s" }}>
          Let's connect and discuss opportunities — feel free to reach out via email. I'm always open to new roles, collaborations, and interesting projects.
        </p>
        <div className="contact-grid" style={{ marginBottom: 36 }}>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "clamp(18px,3vw,28px) clamp(14px,3vw,24px)", display: "flex", alignItems: "center", gap: 16, opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.6s 0.25s" }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, flexShrink: 0, background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}><FiPhone size={18} color="var(--accent)" /></div>
            <div>
              <div style={{ fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Mobile</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "clamp(0.88rem,2vw,1rem)" }}>+91 93471 96877</div>
            </div>
          </div>
          <a href="mailto:cheemakurthysritejast@gmail.com" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "clamp(18px,3vw,28px) clamp(14px,3vw,24px)", display: "flex", alignItems: "center", gap: 16, textDecoration: "none", color: "inherit", transition: "border-color 0.25s, box-shadow 0.25s", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transitionDelay: "0.35s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.25)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(0,229,255,0.06)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, flexShrink: 0, background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}><FiMail size={18} color="var(--accent)" /></div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Email</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "clamp(0.72rem,1.8vw,0.95rem)", wordBreak: "break-all" }}>cheemakurthysritejast@gmail.com</div>
            </div>
          </a>
        </div>
        <div style={{ opacity: inView ? 1 : 0, transition: "opacity 0.6s 0.45s" }}>
          <a href="mailto:cheemakurthysritejast@gmail.com" className="btn-accent" style={{ textDecoration: "none" }}><span>Send Email</span><FiMail size={14} /></a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", padding: "28px var(--px)" }}>
      <div className="footer-inner" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1rem" }}>
          <span style={{ color: "var(--text)" }}>sri</span><span style={{ color: "var(--accent)" }}>teja</span><span style={{ color: "var(--muted)", fontWeight: 400, fontSize: "0.85rem" }}>.dev</span>
        </div>
        <p style={{ color: "var(--muted)", fontSize: "0.78rem" }}>© {new Date().getFullYear()} Sri Teja Cheemakurthy — Built with React & Tailwind</p>
        <div style={{ display: "flex", gap: 16 }}>
          <a href="https://github.com/SriTeja-Cheemakurthy" target="_blank" rel="noreferrer" style={{ color: "var(--muted)", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"} onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}><FiGithub size={18} /></a>
          <a href="mailto:cheemakurthysritejast@gmail.com" style={{ color: "var(--muted)", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"} onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}><FiMail size={18} /></a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}