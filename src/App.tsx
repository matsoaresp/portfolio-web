import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Github,
  Linkedin,
  Mail,
  Terminal as TerminalIcon,
  ChevronRight,
  Package,
  Cpu,
  Monitor,
  Activity,
  Command,
  Plus
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "API_FINANCEIRO.sys",
    category: "LÓGICA_CORE",
    description: "API backend para gerenciamento financeiro, responsável pelo controle de contas, transações e saldos, desenvolvida com Java e Spring Boot, utilizando JPA/Hibernate para persistência de dados e implementação de boas práticas de segurança.",
    tags: ["JAVA", "SPRING_BOOT", "SECURITY", "HIBERNATE", "JPA"]
  },


];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBooted, setIsBooted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isOverclocked, setIsOverclocked] = useState(false);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (isOverclocked) {
      const interval = setInterval(() => {
        if (Math.random() > 0.8) {
          setGlitch(true);
          setTimeout(() => setGlitch(false), 150);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isOverclocked]);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooted(true), 1500);

    if (isBooted) {
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      const ctx = gsap.context(() => {
        const terminalLines = gsap.utils.toArray(".terminal-line:not(.project-card)");
        if (terminalLines.length > 0) {
          gsap.from(terminalLines, {
            opacity: 0,
            y: 10,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out"
          });
        }

        const cards = gsap.utils.toArray(".project-card");
        if (cards.length > 0) {
          gsap.from(cards, {
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
          });
        }

        ["home", "projetos", "logs"].forEach((id) => {
          ScrollTrigger.create({
            trigger: `#${id}`,
            start: "top 40%",
            end: "bottom 40%",
            onToggle: (self) => {
              if (self.isActive) setActiveSection(id);
            },
          });
        });
      }, containerRef);

      return () => {
        ctx.revert();
        clearTimeout(refreshTimer);
      };
    }

    return () => clearTimeout(timer);
  }, [isBooted]);

  if (!isBooted) {
    return (
      <div className="h-screen bg-black flex items-center justify-center font-mono p-4">
        <div className="text-emerald-500 flex items-center gap-4">
          <Activity className="w-6 h-6 animate-pulse" />
          <span className="text-lg md:text-3xl tracking-widest uppercase">INICIALIZANDO SISTEMA...</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`min-h-screen crt font-mono p-4 md:p-6 flex flex-col transition-colors duration-1000 overflow-x-hidden ${isOverclocked ? "bg-[#0a0500] text-orange-500" : "bg-zinc-950 text-emerald-500"
      }`}>

      <div className={`scanline ${isOverclocked ? "bg-orange-500/20" : "bg-emerald-500/20"}`} />

      {glitch && (
        <div className="fixed inset-0 z-50 bg-orange-500/5 pointer-events-none mix-blend-difference">
          <div className="p-4 text-[14px] text-orange-500/50 break-all leading-none font-bold">
            {Array.from({ length: 1000 }).map(() => Math.floor(Math.random() * 2))}
          </div>
        </div>
      )}

      <header id="home" className={`flex items-center justify-between border-b pb-3 mb-6 text-[14px] tracking-widest ${isOverclocked ? "border-orange-900/40" : "border-emerald-900/40"
        }`}>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${isOverclocked ? "bg-orange-500" : "bg-emerald-500"}`}></div>
            <span>STATUS: {isOverclocked ? "OVERCLOCK_ATIVO" : "SISTEMA_NOMINAL"}</span>
          </div>
          <span className="hidden md:inline">UPTIME: 14:02:44:09</span>
          <span className="hidden lg:inline">KERNEL: REACT_V19.0_CORE</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="opacity-50 italic hidden sm:inline">LOCAL: 127.0.0.1</span>
          <span className={`px-2 py-0.5 border bg-black/20 ${isOverclocked ? "border-orange-500/30" : "border-emerald-500/30"
            }`}>ACESSO_RAIZ_CONCEDIDO</span>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 min-h-0">
        <section className="md:col-span-3 flex flex-col gap-6">
          <div className={`terminal-line border bg-black/10 p-4 transition-colors ${isOverclocked ? "border-orange-900/40" : "border-emerald-900/40"
            }`}>
            <div className={`w-full aspect-square bg-zinc-900 border mb-4 overflow-hidden relative group transition-colors ${isOverclocked ? "border-orange-900/40" : "border-emerald-900/40"
              }`}>
              <img
                src="/images/portfolio_image.jpeg"
                alt="Perfil"
                className={`w-full h-full object-cover transition-all duration-500 grayscale ${isOverclocked ? "group-hover:sepia" : "group-hover:grayscale-0"
                  }`}
              />
              <div className={`absolute inset-0 transition-opacity opacity-20 ${isOverclocked ? "bg-orange-500" : "bg-emerald-500"
                }`} />
            </div>
            <h1 className={`text-2xl font-bold border-b pb-2 mb-3 ${isOverclocked ? "border-orange-900/40" : "border-emerald-900/40"
              }`}>MATEUS_SOARES.v1</h1>
            <p className="text-[15px] leading-relaxed opacity-70 mb-4 uppercase">
              Desenvolvedor Fullstack focado em performance e escalabilidade, com experiência no desenvolvimento de APIs e sistemas backend utilizando Java, Spring Boot e Node.js, além de interfaces modernas no frontend com TypeScript e React.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/matsoaresp" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 opacity-50 hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://www.linkedin.com/in/maateussp/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 opacity-50 hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          <div className={`terminal-line flex-1 border bg-black/5 p-4 flex flex-col transition-colors ${isOverclocked ? "border-orange-900/40" : "border-emerald-900/40"
            }`}>
            <h2 className={`text-[14px] uppercase font-bold tracking-tighter mb-4 border-b pb-2 ${isOverclocked ? "border-orange-900/20" : "border-emerald-900/20"
              }`}>Stacks</h2>
            <div className="grid grid-cols-1 gap-3 text-[14px]">
              {[
                { name: "Java", val: "80%" },
                { name: "Spring Boot", val: "75%" },
                { name: "TypeScript", val: "70%" },
                { name: "Node.js", val: "60%" },
                { name: "React", val: "60%" },
                { name: "NestJS", val: "60%" },




                { name: "PostgreSQL", val: "75%" },
                { name: "MySQL", val: "75%" },
                { name: "Python", val: "75%" },
                { name: "Playwright", val: "80%" },
                { name: "Git", val: "90%" },
                { name: "Docker", val: "50%" }


              ].map(item => (
                <div key={item.name} className="flex justify-between items-center group">
                  <span className="opacity-50 group-hover:opacity-100 transition-opacity">{item.name}</span>
                  <span className={`font-bold ${isOverclocked ? "text-orange-300" : "text-emerald-300"}`}>[{item.val}]</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projetos" className="md:col-span-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">PROJETOS_DESENVOLVIDOS</span>
              <span className={`text-[14px] px-1 font-bold ${isOverclocked ? "bg-orange-500 text-black" : "bg-emerald-500 text-black"
                }`}>ATIVO</span>
            </div>
            <span className="text-[14px] opacity-40">CONTAGEM: 00{PROJECTS.length}_ITENS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-min items-start flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2 pb-4 projects-grid">
            {PROJECTS.map((project, idx) => (
              <div
                key={project.id}
                className={`terminal-line project-card border p-4 flex flex-col group relative overflow-hidden transition-all duration-300 min-h-[220px] ${isOverclocked
                  ? "border-orange-500/30 bg-orange-500/5 hover:bg-orange-500/10"
                  : "border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10"
                  }`}
              >
                <div className={`absolute top-0 left-0 w-full h-[1px] transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ${isOverclocked ? "bg-orange-500/40" : "bg-emerald-500/40"
                  }`} />
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-[13px] px-1 border transition-colors ${isOverclocked ? "border-orange-500/40" : "border-emerald-500/40"
                    }`}>{project.category}</span>
                  <span className="opacity-30 text-[12px]">ID: 0{idx + 1}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:tracking-wider transition-all">{project.title}</h3>
                <p className="text-[14px] opacity-70 flex-1 italic mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[12px] border border-current opacity-40 px-1">{tag}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[13px] font-bold">INIT_DETALHES()</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="md:col-span-3 flex flex-col gap-6">
          <div className={`terminal-line border bg-black/20 p-4 transition-colors ${isOverclocked ? "border-orange-900/40" : "border-emerald-900/40"
            }`}>
            <h2 className="text-[14px] font-bold mb-4 flex items-center gap-2">
              <Cpu className="w-3 h-3" /> MONITOR_HARDWARE
            </h2>
            <div className="space-y-4">
              {[
                { label: "CPU_TEMP", val: isOverclocked ? 78 : 42, unit: "°C" },
                { label: "MEM_LOAD", val: isOverclocked ? 92 : 64, unit: "%" },
                { label: "NET_FLOW", val: isOverclocked ? 45 : 12, unit: "MB/S" }
              ].map(item => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex justify-between text-[13px]">
                    <span className="opacity-60">{item.label}</span>
                    <span className="font-bold">{item.val}{item.unit}</span>
                  </div>
                  <div className={`w-full h-1 relative overflow-hidden transition-colors ${isOverclocked ? "bg-orange-900/20" : "bg-emerald-900/20"
                    }`}>
                    <div
                      className={`h-full transition-all duration-1000 ${isOverclocked ? "bg-orange-500" : "bg-emerald-500"
                        }`}
                      style={{ width: `${item.val}%` }}
                    ></div>
                    {isOverclocked && (
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsOverclocked(!isOverclocked)}
              className={`w-full mt-6 py-2 text-[14px] font-bold uppercase transition-all duration-300 cursor-pointer ${isOverclocked
                ? "bg-orange-500 text-black animate-pulse"
                : "border border-emerald-500/40 hover:bg-emerald-500/10"
                }`}
            >
              {isOverclocked ? "DESATIVAR_OC.SYS" : "EXEC_OVERCLOCK.SH"}
            </button>
          </div>

          <div id="logs" className={`terminal-line flex-1 border bg-black/40 p-4 font-mono text-[13px] overflow-hidden flex flex-col transition-colors ${isOverclocked ? "border-orange-900/40" : "border-emerald-900/40"
            }`}>
            <h2 className="text-[14px] font-bold mb-3 italic opacity-40">Logs_de_Atividade.stdout</h2>
            <div className="space-y-2 opacity-60 overflow-y-auto custom-scrollbar flex-1">
              {[
                { t: "10:24", m: "KERNEL_INIT_SUCCESS" },
                { t: "10:25", m: "SYNCING_REPOS..." },
                { t: "10:26", m: "ASSET_OPTIMIZER_ACTIVE" },
                { t: "11:02", m: "COMPILING_RESOURCES" },
                { t: "12:15", m: "AUTH_CHECK: MATEUS_ROOT", hl: true },
                { t: "13:00", m: "CLEANING_BUILD_CACHE" },
                { t: "14:10", m: "STREAMING_DATA" }
              ].map((log, i) => (
                <div key={i} className={`flex gap-2 ${log.hl ? (isOverclocked ? "text-orange-400" : "text-emerald-400") : ""}`}>
                  <span>[{log.t}]</span>
                  <span className="uppercase">{log.m}</span>
                </div>
              ))}
              <div className="flex gap-2 animate-pulse">
                <span>{">"}</span>
                <div className={`w-1.5 h-3 ${isOverclocked ? "bg-orange-400" : "bg-emerald-400"}`} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={`mt-6 border-t pt-4 flex justify-between items-center transition-colors ${isOverclocked ? "border-orange-900/40" : "border-emerald-900/40"
        }`}>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { label: "HOME", id: "home" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                const element = document.getElementById(item.id);
                if (element) window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
              }}
              className={`px-4 py-1.5 text-[10px] font-bold transition-all cursor-pointer whitespace-nowrap ${activeSection === item.id
                ? (isOverclocked ? "bg-orange-500 text-black" : "bg-emerald-500 text-black")
                : `border ${isOverclocked ? "border-orange-900/40 hover:bg-orange-500/10" : "border-emerald-900/40 hover:bg-emerald-500/10"}`
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="hidden sm:flex items-center gap-8 text-[10px] font-bold opacity-40">
          <span>V_1.0.4-STABLE</span>
          <span>© 2026_MATEUS_DEV</span>
        </div>
      </footer>

      {isOverclocked && (
        <div className="fixed bottom-24 right-6 px-3 py-1 border border-orange-500/50 bg-orange-500/10 text-orange-400 text-[8px] font-bold tracking-widest pointer-events-none z-30 animate-pulse">
          ATENÇÃO: CARGA_SISTEMA_ALTA // PROTOCOLO_SUPERAQUECIMENTO_INICIALIZADO
        </div>
      )}
    </div>
  );
}
