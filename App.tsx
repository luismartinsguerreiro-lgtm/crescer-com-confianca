import { useState, useEffect, useRef } from "react";
import { 
  ShowerHead, 
  Smile, 
  Sparkles, 
  Calendar, 
  User, 
  ShieldAlert, 
  Apple, 
  Skull, 
  Heart, 
  Shield, 
  Users, 
  Lock, 
  Unlock, 
  MessageSquare, 
  CheckSquare, 
  Phone, 
  MapPin, 
  AlertTriangle, 
  BookOpen, 
  FileCode, 
  X, 
  ChevronRight, 
  Send, 
  Eye, 
  EyeOff, 
  Settings, 
  ClipboardList, 
  Download, 
  Check, 
  Plus, 
  Trash, 
  Key, 
  RefreshCw 
} from "lucide-react";

import { EDUCATIONAL_CATEGORIES } from "./data";
import { KOTLIN_TEMPLATES } from "./kotlinTemplates";
import { EducationalCategory, ChatMessage, DiaryEntry, DailyChecklistItem } from "./types";

export default function App() {
  // Tab Navigation State
  const [activeTab, setActiveTab] = useState<"guia" | "conselheira" | "diario" | "checklist" | "sos" | "dev">("guia");
  
  // Discreet Mode (Modo Invisível) State
  const [isDiscreetMode, setIsDiscreetMode] = useState<boolean>(false);
  
  // Category Details state: when selected, opens an overlay/drawer
  const [selectedCategory, setSelectedCategory] = useState<EducationalCategory | null>(null);

  // Estados PWA e Instalação Android
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState<boolean>(false);
  const [manualInstallExpanded, setManualInstallExpanded] = useState<boolean>(false);

  // Suggested app names & selection justification
  const suggestedNames = [
    { name: "Guia Teen", plus: "Simples", minus: "Um pouco genérico e clínico." },
    { name: "Cuida de Ti", plus: "Pessoal e caloroso", minus: "Falta referência à fase de crescimento." },
    { name: "Confiança Teen", plus: "Foca na autoestima", minus: "Mistura inglês e português." },
    { name: "Teen Care", plus: "Moderno", minus: "Demasiado focado em inglês, pode excluir públicos mais novos." },
    { name: "Segura & Saudável", plus: "Abrange todas as metas", minus: "Parece um manual escolar." },
    { name: "Miúda Segura", plus: "Muito português", minus: "Pode parecer infantil para raparigas de 15-17 anos." },
    { name: "Crescer com Confiança", plus: "Excelente, empoderador e abrangente", minus: "Nenhum. Ideal na promoção de autonomia e saúde íntima e emocional.", recommended: true }
  ];

  // AI Counselor chat states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>("");
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const predefinedSuggestions = [
    "Porque cheiro mal dos pés?",
    "Tenho vergonha do meu cheiro vaginal.",
    "Tenho piolhos e sinto vergonha, o que faço?",
    "Ofereceram-me vape na escola, o que posso dizer?",
    "Um rapaz pediu-me uma fotografia íntima (nude)."
  ];

  // Diary Private States (Biometric/PIN logic simulated)
  const [diaryPIN, setDiaryPIN] = useState<string>("");
  const [isDiaryConfigured, setIsDiaryConfigured] = useState<boolean>(false);
  const [enteredPIN, setEnteredPIN] = useState<string>("");
  const [isDiaryUnlocked, setIsDiaryUnlocked] = useState<boolean>(false);
  const [pinError, setPinError] = useState<string>("");
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  
  // New diary log states
  const [newLogMood, setNewLogMood] = useState<string>("feliz");
  const [newLogMenstruation, setNewLogMenstruation] = useState<boolean>(false);
  const [newLogPainLevel, setNewLogPainLevel] = useState<number>(0);
  const [newLogSkin, setNewLogSkin] = useState<string>("estável");
  const [newLogSleep, setNewLogSleep] = useState<number>(8);
  const [newLogWater, setNewLogWater] = useState<number>(4);
  const [newLogStress, setNewLogStress] = useState<number>(1);
  const [newLogNotes, setNewLogNotes] = useState<string>("");

  // Daily Checks state
  const [checklistItems, setChecklistItems] = useState<DailyChecklistItem[]>([]);

  // SOS Emergency States
  const [emergencyPhone, setEmergencyPhone] = useState<string>("912 345 678");
  const [customSOSContact, setCustomSOSContact] = useState<string>("Mãe (Maria)");
  const [sosStatus, setSosStatus] = useState<string>("");
  const [gpsSimulated, setGpsSimulated] = useState<boolean>(false);

  // Developers Panel Source Code Selection state
  const [selectedKotlinIndex, setSelectedKotlinIndex] = useState<number>(0);
  const [copiedCodeSuccess, setCopiedCodeSuccess] = useState<boolean>(false);

  // Efeitos e Métodos para PWA, Splash Screen e Banner de Instalação Android
  useEffect(() => {
    // Esconde o Splash Screen com fade-out planeado após 1800ms
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);

    // Escuta o sinal oficial de instalação suportada em dispositivos Android
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const dismissed = localStorage.getItem("crescer_pwa_dismissed");
      if (!dismissed) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // Verifica se a aplicação já corre no ecrã principal (modo autónomo)
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone;
    if (isStandalone) {
      setShowInstallBanner(false);
    } else {
      // Se for um dispositivo Android mas não estiver instalado nem descartado, sugere a instalação
      const isAndroid = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const dismissed = localStorage.getItem("crescer_pwa_dismissed");
      if (isAndroid && !dismissed) {
        const bannerTimer = setTimeout(() => {
          setShowInstallBanner(true);
        }, 3000);
        return () => {
          clearTimeout(splashTimer);
          clearTimeout(bannerTimer);
          window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
        };
      }
    }

    return () => {
      clearTimeout(splashTimer);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`[PWA] Aplicação instalada ou recusada: ${outcome}`);
        setDeferredPrompt(null);
        setShowInstallBanner(false);
      } catch (err) {
        console.error("Erro no prompt de instalação nativa:", err);
        setManualInstallExpanded(true);
      }
    } else {
      setManualInstallExpanded(true);
    }
  };

  const handleDismissBanner = () => {
    setShowInstallBanner(false);
    localStorage.setItem("crescer_pwa_dismissed", "true");
  };

  // Initialize and load from local persistence
  useEffect(() => {
    // Chat default message
    setChatMessages([
      {
        id: "welcome-msg",
        role: "assistant",
        text: "Olá! Sou a tua conselheira digital de confiança. Podes falar comigo sobre o teu corpo, higiene, menstruação, amizades, vaping ou segurança pessoal sem medos nem vergonhas. O que queres perguntar hoje? \n\n*Lembra-te: tudo o que conversas aqui é seguro!*",
        timestamp: new Date()
      }
    ]);

    // Diary configurations
    const storedPIN = localStorage.getItem("crescer_diary_pin");
    if (storedPIN) {
      setDiaryPIN(storedPIN);
      setIsDiaryConfigured(true);
    } else {
      setIsDiaryConfigured(false);
    }

    // Prepopulate diary with 2 comforting logs representing emotional/physical context
    const storedEntries = localStorage.getItem("crescer_diary_entries");
    if (storedEntries) {
      setDiaryEntries(JSON.parse(storedEntries));
    } else {
      const defaultLogs: DiaryEntry[] = [
        {
          id: "log-1",
          date: "2026-06-14",
          mood: "cansada",
          menstruation: true,
          painLevel: 3,
          skinCondition: "algumas-borbulhas",
          sleepHours: 7,
          waterIntake: 5,
          stressLevel: 2,
          notes: "Hoje veio-me o período na escola! Fiquei com um bocado de dores na barriga das cólicas, mas a minha professora de educação física ajudou-me com um penso e sentei-me um pouco. Usei água morna e correu tudo bem.",
          isLocked: true
        },
        {
          id: "log-2",
          date: "2026-06-12",
          mood: "feliz",
          menstruation: false,
          painLevel: 0,
          skinCondition: "estável",
          sleepHours: 9,
          waterIntake: 8,
          stressLevel: 1,
          notes: "Fui ao parque com as minhas amigas depois das aulas. Ofereceram-me um vape mas eu lembrei-me das dicas da app e disse simpaticamente 'Não quero, obrigado, tenho o treino de ginástica amanhã cedo!'. Respeitaram-me e correu super bem!",
          isLocked: true
        }
      ];
      setDiaryEntries(defaultLogs);
      localStorage.setItem("crescer_diary_entries", JSON.stringify(defaultLogs));
    }

    // Default daily habits
    const storedChecklist = localStorage.getItem("crescer_checklist");
    if (storedChecklist) {
      setChecklistItems(JSON.parse(storedChecklist));
    } else {
      const defaults: DailyChecklistItem[] = [
        { id: "h-1", label: "Tomei banho diário (água morna e secagem completa)", category: "Higiene", completed: false },
        { id: "h-2", label: "Escovei os dentes (manhã e noite, 2 minutos)", category: "Higiene", completed: false },
        { id: "h-3", label: "Usei desodorizante suave (pele limpa e seca)", category: "Higiene", completed: false },
        { id: "h-4", label: "Mudei de cuequinhas e meias lavadas de algodão", category: "Higiene", completed: false },
        { id: "h-5", label: "Bebi água de forma regular (pelo menos 1.5 litros)", category: "Alimentação", completed: false },
        { id: "h-6", label: "Comi um pequeno-almoço nutritivo de manhã", category: "Alimentação", completed: false },
        { id: "h-7", label: "Levei pensos higiénicos sobressalentes no estojo", category: "Menstruação", completed: false },
        { id: "h-8", label: "Dormi cerca de 8 a 9 horas esta noite", category: "Bem-Estar", completed: false },
        { id: "h-9", label: "Falei com alguém em quem confio se me senti triste", category: "Bem-Estar", completed: false }
      ];
      setChecklistItems(defaults);
      localStorage.setItem("crescer_checklist", JSON.stringify(defaults));
    }
  }, []);

  // Scroll to bottom on chat update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isChatLoading]);

  // Handle setting a new PIN
  const handleSetPIN = (newPinToSet: string) => {
    if (newPinToSet.length !== 4 || isNaN(Number(newPinToSet))) {
      setPinError("Insere um código de 4 algarismos básicos.");
      return;
    }
    setDiaryPIN(newPinToSet);
    setIsDiaryConfigured(true);
    localStorage.setItem("crescer_diary_pin", newPinToSet);
    setPinError("");
    setEnteredPIN("");
    setIsDiaryUnlocked(true);
  };

  // Handle unlocking diary with existing PIN
  const handleUnlockPIN = (enteredText: string) => {
    if (enteredText === diaryPIN) {
      setIsDiaryUnlocked(true);
      setPinError("");
      setEnteredPIN("");
    } else {
      setPinError("Código PIN incorreto. Tenta novamente de forma segura.");
      setEnteredPIN("");
    }
  };

  const handleResetPIN = () => {
    if (window.confirm("Aviso: Isto irá apagar o teu PIN antigo e todas as notas do teu Diário para tua segurança. Queres continuar?")) {
      localStorage.removeItem("crescer_diary_pin");
      localStorage.removeItem("crescer_diary_entries");
      setDiaryPIN("");
      setIsDiaryConfigured(false);
      setIsDiaryUnlocked(false);
      setDiaryEntries([]);
      setPinError("");
    }
  };

  // Write new log to private diary
  const handleSaveDiaryEntry = () => {
    const todayStr = new Date().toISOString().split("T")[0];
    const newEntry: DiaryEntry = {
      id: "log-" + Date.now(),
      date: todayStr,
      mood: newLogMood,
      menstruation: newLogMenstruation,
      painLevel: newLogPainLevel,
      skinCondition: newLogSkin,
      sleepHours: newLogSleep,
      waterIntake: newLogWater,
      stressLevel: newLogStress,
      notes: newLogNotes || "Sem notas particulares escritas neste diário.",
      isLocked: true
    };

    const updated = [newEntry, ...diaryEntries];
    setDiaryEntries(updated);
    localStorage.setItem("crescer_diary_entries", JSON.stringify(updated));
    setNewLogNotes("");
    alert("Dica de Segurança: O teu diário guardou com sucesso mais um dia do teu crescimento!");
  };

  // Delete an entry from diary
  const handleDeleteDiaryEntry = (id: string) => {
    if (window.confirm("Tens a certeza absoluta que queres apagar para sempre esta página do teu diário secreto?")) {
      const filtered = diaryEntries.filter(entry => entry.id !== id);
      setDiaryEntries(filtered);
      localStorage.setItem("crescer_diary_entries", JSON.stringify(filtered));
    }
  };

  // Checkbox toggle habit logic
  const handleToggleHabit = (id: string) => {
    const updated = checklistItems.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setChecklistItems(updated);
    localStorage.setItem("crescer_checklist", JSON.stringify(updated));
  };

  const handleResetChecklist = () => {
    const reset = checklistItems.map(item => ({ ...item, completed: false }));
    setChecklistItems(reset);
    localStorage.setItem("crescer_checklist", JSON.stringify(reset));
  };

  // Safe counselor AI chat submission
  const handleSendChatMessage = async (msgText: string) => {
    if (!msgText.trim()) return;

    // Add user message to state
    const userMsg: ChatMessage = {
      id: "usrmsg-" + Date.now(),
      role: "user",
      text: msgText,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setIsChatLoading(true);

    try {
      // Map history for the server proxy
      // Select the last 10 messages to avoid token bloat
      const historyContext = chatMessages
        .filter(m => m.id !== "welcome-msg")
        .slice(-10)
        .map(m => ({
          role: m.role === "user" ? "user" : "model",
          text: m.text
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msgText,
          history: historyContext
        })
      });

      const data = await res.json();
      
      const assistantMsg: ChatMessage = {
        id: "modelmsg-" + Date.now(),
        role: "assistant",
        text: data.text || "Desculpa, não consegui obter a resposta de momento. Lembra-te de falar com os teus pais ou enfermeira da escola!",
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, assistantMsg]);

    } catch (err) {
      console.error(err);
      const errMsg: ChatMessage = {
        id: "modelmsg-err-" + Date.now(),
        role: "assistant",
        text: "Ocorreu um pequeno erro ao tentar contactar a rede. Mas lembra-te: se sentes que algo te assusta ou tens dores sérias, conta logo à tua mãe, pai ou médico! Eles estão sempre lá para te apoiar de forma segura. 🌱",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Emergency triggers
  const triggerSOSAlert = () => {
    setSosStatus("A enviar coordenadas GPS aproximadas ao teu contacto...");
    setGpsSimulated(true);
    setTimeout(() => {
      setSosStatus(`MENSAGEM ENVIADA para ${customSOSContact} (${emergencyPhone}): "Ajuda, não me sinto segura. Encontro-me nestas coordenadas."`);
    }, 2000);
  };

  // Helper mapping icon configuration for our bento grid
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "ShowerHead": return <ShowerHead className="w-6 h-6" />;
      case "Smile": return <Smile className="w-6 h-6" />;
      case "Sparkles": return <Sparkles className="w-6 h-6" />;
      case "Calendar": return <Calendar className="w-6 h-6" />;
      case "User": return <User className="w-6 h-6" />;
      case "ShieldAlert": return <ShieldAlert className="w-6 h-6" />;
      case "Apple": return <Apple className="w-6 h-6" />;
      case "Skull": return <Skull className="w-6 h-6" />;
      case "Heart": return <Heart className="w-6 h-6" />;
      case "Shield": return <Shield className="w-6 h-6" />;
      case "Users": return <Users className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  // Category bento colors
  const getThemeColorClass = (color: string) => {
    switch (color) {
      case "blue": return "bg-blue-50 border-blue-100 text-blue-800 hover:bg-blue-100";
      case "cyan": return "bg-cyan-50 border-cyan-100 text-cyan-800 hover:bg-cyan-100";
      case "rose": return "bg-rose-50 border-rose-100 text-rose-800 hover:bg-rose-100";
      case "red": return "bg-rose-50 border-red-100 text-red-800 hover:bg-red-100";
      case "amber": return "bg-amber-50 border-amber-100 text-amber-800 hover:bg-amber-100";
      case "indigo": return "bg-indigo-50 border-indigo-100 text-indigo-800 hover:bg-indigo-100";
      case "emerald": return "bg-emerald-50 border-emerald-100 text-emerald-800 hover:bg-emerald-100";
      case "violet": return "bg-violet-50 border-violet-100 text-violet-800 hover:bg-violet-100";
      case "purple": return "bg-purple-50 border-purple-100 text-purple-800 hover:bg-purple-100";
      default: return "bg-slate-50 border-slate-100 text-slate-800 hover:bg-slate-100";
    }
  };

  const getThemePillClass = (color: string) => {
    switch (color) {
      case "blue": return "bg-blue-200 text-blue-900";
      case "cyan": return "bg-cyan-200 text-cyan-900";
      case "rose": return "bg-rose-200 text-rose-900";
      case "red": return "bg-red-200 text-red-900";
      case "amber": return "bg-amber-200 text-amber-900";
      case "indigo": return "bg-indigo-200 text-indigo-900";
      case "emerald": return "bg-emerald-200 text-emerald-900";
      case "violet": return "bg-violet-200 text-violet-900";
      case "purple": return "bg-purple-200 text-purple-900";
      default: return "bg-slate-200 text-slate-900";
    }
  };

  // Statistics for Habits Completeness
  const completedHabitsCount = checklistItems.filter(h => h.completed).length;
  const totalHabitsCount = checklistItems.length;
  const habitsPercent = totalHabitsCount > 0 ? Math.round((completedHabitsCount / totalHabitsCount) * 100) : 0;

  // Reward phrases for habits completeness
  const getMotivationalQuote = (percent: number) => {
    if (percent === 0) return "Cuidar de ti é uma jornada suave. Dá o teu primeiro passo hoje! 💜";
    if (percent < 40) return "Que bom começo! Um pequeno hábito de cada vez aproxima-te do teu bem-estar. ✨";
    if (percent < 75) return "Fantástico! Estás a dar ao teu corpo e mente todo o valor e carinho que merecem. 🌸";
    if (percent < 100) return "Excelente disciplina! Estás quase no pleno de autocuidado seguro. Bebe um copo de água refrescante! 💪";
    return "Fabuloso! Hoje tomaste conta de todos os aspetos vitais da tua frescura e saúde íntima. És a tua maior prioridade! ✨🏆";
  };

  // Copy Kotlin code helper
  const handleCopyKotlinCode = () => {
    navigator.clipboard.writeText(KOTLIN_TEMPLATES[selectedKotlinIndex].code);
    setCopiedCodeSuccess(true);
    setTimeout(() => {
      setCopiedCodeSuccess(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col antialiased transition-all duration-300 pb-20 lg:pb-0">
      
      {/* PWA IMMERSIVE WELCOME INTRO SPLASH SCREEN */}
      {showSplash && (
        <div className="fixed inset-0 z-50 bg-gradient-to-tr from-purple-950 via-indigo-950 to-emerald-950 flex flex-col items-center justify-center text-white p-6 transition-all duration-500">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-purple-500 via-rose-400 to-amber-300 p-0.5 shadow-[0_8px_32px_rgba(168,85,247,0.3)] flex items-center justify-center animate-bounce">
            <div className="w-full h-full bg-indigo-950/80 rounded-3xl flex items-center justify-center text-4xl">
              🌸
            </div>
          </div>
          
          <h1 className="text-2xl font-black font-display tracking-tight text-white mt-6 animate-pulse text-center">
            Crescer com Confiança
          </h1>
          <p className="text-xs text-purple-200/80 mt-1 font-mono tracking-wide uppercase text-center">
            Autocuidado & Higiene Íntima
          </p>

          <div className="mt-8 flex items-center gap-2 bg-purple-950/60 p-2.5 px-4 rounded-full border border-purple-500/20 text-[11px] text-purple-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            A sincronizar sistema offline seguro...
          </div>
        </div>
      )}

      {/* Dynamic PWA/Android Installation Banner with detailed step instructions */}
      {showInstallBanner && !isDiscreetMode && (
        <div id="pwa-install-banner" className="bg-gradient-to-r from-purple-700 via-indigo-700 to-indigo-800 text-white shadow-lg relative z-40 transition-all">
          <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-white p-0.5 flex-shrink-0 flex items-center justify-center text-2xl shadow-md">
                🌸
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-sm sm:text-base font-display flex items-center gap-1.5 leading-snug">
                  Crescer com Confiança no teu Android!
                  <span className="text-[9px] uppercase tracking-wider bg-purple-500/80 text-white font-mono rounded px-1.5 py-0.2 font-bold">PWA</span>
                </h4>
                <p className="text-xs text-purple-100 leading-snug">
                  Instala a nossa app no teu telemóvel para um acesso super rápido, offline e totalmente anónimo!
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
              <button
                onClick={() => setManualInstallExpanded(!manualInstallExpanded)}
                className="px-3 py-1.5 bg-indigo-600/50 hover:bg-indigo-600/80 border border-indigo-500/40 rounded-xl text-xs font-semibold cursor-pointer transition-all"
              >
                {manualInstallExpanded ? "Ocultar Instruções" : "Como Instalar"}
              </button>
              
              <button
                onClick={handleInstallClick}
                className="px-4 py-1.5 bg-emerald-400 hover:bg-emerald-500 text-slate-950 rounded-xl text-xs font-black shadow-xs cursor-pointer flex items-center gap-1 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Instalar App
              </button>
              
              <button
                onClick={handleDismissBanner}
                className="p-1 px-2 text-purple-200 hover:text-white transition-all text-xs cursor-pointer font-bold"
                aria-label="Ignorar"
              >
                Dispensar
              </button>
            </div>
          </div>

          {/* Collapsible Manual Instructions Drawer for Chrome on Android */}
          {manualInstallExpanded && (
            <div className="bg-indigo-950/40 border-t border-indigo-500/20 px-4 py-4 sm:py-5 text-white">
              <div className="max-w-4xl mx-auto space-y-3.5">
                <h5 className="font-bold text-xs uppercase tracking-wider text-purple-200 font-mono">
                  Instruções para o Chrome no Android:
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-indigo-950/20 p-3.5 rounded-xl border border-indigo-500/15 space-y-1">
                    <span className="text-lg font-black text-emerald-400 block font-mono">1. Menu de Opções</span>
                    <p className="text-slate-200">No canto superior direito do <strong>Chrome no Android</strong>, toca nos três pontinhos (<span className="font-bold">⋮</span>).</p>
                  </div>
                  <div className="bg-indigo-950/20 p-3.5 rounded-xl border border-indigo-500/15 space-y-1">
                    <span className="text-lg font-black text-emerald-400 block font-mono">2. Instalar a App</span>
                    <p className="text-slate-200">Seleciona a opção <strong className="text-white">"Adicionar ao ecrã inicial"</strong> ou <strong className="text-white">"Instalar aplicação"</strong>.</p>
                  </div>
                  <div className="bg-indigo-950/20 p-3.5 rounded-xl border border-indigo-500/15 space-y-1">
                    <span className="text-lg font-black text-emerald-400 block font-mono">3. Acede com Um Toque</span>
                    <p className="text-slate-200">Confirma o pedido. Ficas com o ícone no teu Android pronto para uso privado!</p>
                  </div>
                </div>
                <p className="text-[10px] text-indigo-200/90 leading-relaxed pt-1.5 italic">
                  *Os teus desabafos no Diário de PIN e registos de hábitos serão totalmente mantidos na base local offline do dispositivo.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* DISCREET SCHOOL MODE OVERLAY PANEL */}
      {isDiscreetMode ? (
        <div className="min-h-screen bg-slate-50 flex flex-col academic-font text-slate-800 p-4 select-none relative">
          
          {/* Header discreet banner resembling standard educational learning boards */}
          <div className="max-w-2xl mx-auto w-full pt-12 flex-1 pb-16">
            <div className="border-b border-stone-300 pb-4 mb-8 flex justify-between items-end">
              <div>
                <span className="text-xs uppercase tracking-widest text-stone-500 font-mono">Unidade Didática de Ciências & Métodos</span>
                <h1 className="text-3xl font-serif text-stone-900 font-bold mt-1">Dicas de Estudo & Planeamento Escolar</h1>
              </div>
              {/* Back to real app discreet switcher: Innocent-looking lock-status button */}
              <button 
                id="secret-back-switch"
                onClick={() => setIsDiscreetMode(false)}
                className="p-2 text-stone-300 hover:text-stone-500 transition-colors"
                title="Voltar às ferramentas auxiliares"
              >
                <Unlock className="w-5 h-5 cursor-pointer opacity-30 hover:opacity-100" />
              </button>
            </div>

            <p className="text-stone-600 mb-6 italic leading-relaxed">
              "A preparação prévia, aliada a um cronograma de estudo consistente, reduz a ansiedade pré-exames e rentabiliza o tempo útil de aprendizagem."
            </p>

            <div className="space-y-6">
              <div className="p-5 bg-white border border-stone-200 rounded-lg shadow-xs">
                <h3 className="font-bold text-lg text-stone-900 font-serif mb-2">1. O Método Pomodoro de Concentração</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Divide as tuas tarefas escolares em blocos de 25 minutos de estudo ininterrupto (sem ecrãs ou telemóveis), seguidos de 5 minutos de pausa ativa para andares um pouco ou beberes água filtrada. Repete o ciclo 4 vezes antes de fazeres uma pausa longa de 20 minutos.
                </p>
                <div className="mt-2 text-xs text-stone-400 font-mono">Duração Recomendada: 25 min Foco | 5 min Descanso</div>
              </div>

              <div className="p-5 bg-white border border-stone-200 rounded-lg shadow-xs">
                <h3 className="font-bold text-lg text-stone-900 font-serif mb-2">2. Como Esquematizar Matérias Tensas</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Utiliza canetas de três cores diferentes para organizar a hierarquia visual dos teus resumos de biologia, história ou português: azul para conceitos centrais, preto para factos cronológicos e verde para fórmulas ou termos estrangeiros importantes. O teu cérebro absorve melhor imagens estruturadas!
                </p>
              </div>

              <div className="p-5 bg-white border border-stone-200 rounded-lg shadow-xs">
                <h3 className="font-bold text-lg text-stone-900 font-serif mb-2">3. Preparação do Espaço e Luminosidade</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Estuda sempre que possível numa mesa bem limpa de distrações mentais e próxima de luz natural. Mantém uma postura ereta para evitar dores de costas prolongadas e bebe dois grandes copos de água natural a cada hora para o teu motor cerebral funcionar na perfeição de rendimento.
                </p>
              </div>

              <div className="p-5 bg-white border border-stone-200 rounded-lg shadow-xs">
                <h3 className="font-bold text-lg text-stone-900 font-serif mb-2">4. A Importância do Descanso no Armazenamento</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  O cérebro solidifica a matéria aprendida durante as fases profundas de sono. Dormir menos de 8 horas na noite anterior a um teste reduz o teu rendimento em mais de 30%. Evita rever resumos na cama imediatamente antes de ires descansar!
                </p>
              </div>
            </div>

            <div className="mt-12 text-center text-xs text-stone-400 border-t border-stone-200 pt-4 font-mono">
              © 2026 Manual do Estudante Responsável • Conteúdo Científico Auxiliar
            </div>
          </div>
        </div>
      ) : (
        /* ORIGINAL COMPASSIONATE EDUCATIONAL APPLICATION INTERFACE */
        <>
          {/* HEADER BAR AND BRANDING */}
          <header className="bg-white border-b border-slate-100 shadow-xs sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="p-1 px-2.5 bg-gradient-to-tr from-purple-500 to-rose-400 rounded-xl text-white font-display font-black text-lg shadow-xs">
                  C
                </div>
                <div>
                  <h1 className="text-lg font-bold font-display text-slate-800 tracking-tight flex items-center gap-1">
                    Crescer com Confiança
                    <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100 px-1.5 py-0.5 rounded-full font-sans">
                      pt-PT Seguro
                    </span>
                  </h1>
                  <p className="text-[11px] text-slate-500 font-sans hidden sm:block">
                    Higiene, saúde íntima, relações saudáveis e prevenção para raparigas adolescentes
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* DISCREET MODE BUTTON (Crucial request wrapper) */}
                <button
                  id="discreet-mode-trigger"
                  onClick={() => setIsDiscreetMode(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-medium cursor-pointer transition-all duration-200 border border-slate-200"
                  title="Esconde instantaneamente a app para parecer estudo escolar"
                >
                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden md:inline">Modo Discreto (SOS Olhar)</span>
                  <span className="md:hidden">Discreto</span>
                </button>

                {/* SOS TOP SHORTCUT */}
                <button
                  onClick={() => setActiveTab("sos")}
                  className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 animate-pulse"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Pedir Ajuda</span>
                </button>
              </div>
            </div>
          </header>

          {/* WARNING AND PROFESSIONAL MEDICAL/SAFETY DISCLAIMER */}
          <div className="bg-gradient-to-r from-purple-50 via-slate-50 to-rose-50 border-b border-purple-100 px-4 py-2">
            <div className="max-w-7xl mx-auto text-[11px] sm:text-xs text-slate-600 font-sans flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <strong>Aviso de Segurança Crítico:</strong> Esta aplicação tem fins meramente informativos e educativos. Nunca substitui a consulta ou o diagnóstico de médicos, psicólogos, enfermeiros ou a orientação de pais e encarregados de educação.
              </span>
              <button 
                onClick={() => setActiveTab("sos")} 
                className="text-purple-700 hover:text-purple-900 font-bold underline cursor-pointer text-left"
              >
                Em caso de dor, perigo ou dúvida grave, clica aqui para ver as linhas gratuitas de Portugal.
              </button>
            </div>
          </div>

          {/* MAIN CONTAINER AND TWO-COLUMN INTERACTIVE CONTENT AREA */}
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            
            {/* LEFT COLUMN: NAVIGATION & SUITE INDEX */}
            <div className="hidden lg:block lg:col-span-1 space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs space-y-2">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-sans px-2">Navegar na App</p>
                <nav className="space-y-1">
                  
                  <button
                    id="nav-guia-tab"
                    onClick={() => { setActiveTab("guia"); setSelectedCategory(null); }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between text-sm font-medium transition-all cursor-pointer ${
                      activeTab === "guia" 
                        ? "bg-purple-100 text-purple-900 font-bold shadow-xs border-l-4 border-purple-600" 
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      Guia de Autocuidado
                    </span>
                    <span className="text-[10px] bg-purple-200 text-purple-900 px-1.5 py-0.5 rounded-md font-bold">12 Temas</span>
                  </button>

                  <button
                    id="nav-conselheira-tab"
                    onClick={() => setActiveTab("conselheira")}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between text-sm font-medium transition-all cursor-pointer ${
                      activeTab === "conselheira" 
                        ? "bg-purple-100 text-purple-900 font-bold shadow-xs border-l-4 border-purple-600" 
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-purple-600" />
                      Conselheira Virtual AI
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-950 px-1.5 py-0.5 rounded-md font-bold">Livre</span>
                  </button>

                  <button
                    id="nav-diario-tab"
                    onClick={() => setActiveTab("diario")}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between text-sm font-medium transition-all cursor-pointer ${
                      activeTab === "diario" 
                        ? "bg-purple-100 text-purple-900 font-bold shadow-xs border-l-4 border-purple-600" 
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-purple-600" />
                      Diário Privado (PIN)
                    </span>
                    {isDiaryUnlocked ? (
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded-md font-mono font-bold">Aberto</span>
                    ) : (
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-md font-mono font-bold">Bloqueado</span>
                    )}
                  </button>

                  <button
                    id="nav-checklist-tab"
                    onClick={() => setActiveTab("checklist")}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between text-sm font-medium transition-all cursor-pointer ${
                      activeTab === "checklist" 
                        ? "bg-purple-100 text-purple-900 font-bold shadow-xs border-l-4 border-purple-600" 
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-purple-600" />
                      Registo de Hábitos
                    </span>
                    <span className="text-xs bg-purple-500 text-white w-5 h-5 flex items-center justify-center rounded-full font-bold">
                      {habitsPercent}%
                    </span>
                  </button>

                  <button
                    id="nav-sos-tab"
                    onClick={() => setActiveTab("sos")}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between text-sm font-medium transition-all cursor-pointer ${
                      activeTab === "sos" 
                        ? "bg-rose-100 text-rose-950 font-bold shadow-xs border-l-4 border-rose-600" 
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-rose-600" />
                      Apoio & Emergência (SOS)
                    </span>
                  </button>



                </nav>
              </div>

              {/* REASSURING CORNER COMPASS DESIGN BADGE */}
              <div className="bg-gradient-to-tr from-purple-900 to-indigo-950 text-white p-5 rounded-2xl shadow-sm space-y-3">
                <span className="text-[9px] uppercase tracking-widest bg-purple-700/60 font-bold font-mono px-2 py-0.5 rounded-full inline-block">
                  A nossa Filosofia
                </span>
                <p className="font-display font-medium text-sm leading-snug">
                  "Informação científica limpa, carinho sem medos e apoio virtual para cresceres saudável e forte no teu próprio ritmo!"
                </p>
                <div className="text-[11px] text-purple-200/90 leading-relaxed font-sans mt-2">
                  Esta app foi pensada especificamente para raparigas portuguesas. Todo o conteúdo foi preparado para as idades dos 10 aos 17 anos com extremo rigor clínico, ético e empático.
                </div>
              </div>
            </div>

            {/* MIDDLE/RIGHT REMAINING COLUMNS: AREA PANEL */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* TAB 1: ACCREDITED EDUCATIONAL GUIDE GRID */}
              {activeTab === "guia" && (
                <div className="space-y-6">
                  
                  {/* Suggestion of App Names section inside the interface to explain selection */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                      <div>
                        <h2 className="text-xl font-bold font-display text-slate-800">
                          Identidade e Escolha de Nome para a App
                        </h2>
                        <p className="text-xs text-slate-500">
                          Justificação e sugestão do nome mais adequado para o público português de acordo com as tuas opções:
                        </p>
                      </div>
                      <span className="text-xs font-semibold bg-indigo-50 text-indigo-800 px-2 py-1 rounded-full border border-indigo-100">
                        Nome Recomendado: Crescer com Confiança
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 leading-relaxed">
                      Sugerimos vivamente e adotámos o nome <strong>"Crescer com Confiança"</strong>. Ao contrário de marcas associadas apenas à higiene corporal ou riscos ("Cuida de Ti" ou "Segura & Saudável"), este nome foca-se na <strong>autoestima positiva</strong>, desenvolvimento ético e empoderamento das pré-adolescentes e adolescentes. É um nome de alta respeitabilidade, que soa natural em Portugal, amigável para familiares e que neutraliza totalmente a vergonha ou o preconceito comum com termos de puberdade íntima.
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      {suggestedNames.map((item, idx) => (
                        <div 
                          key={idx} 
                          className={`p-3 rounded-xl border text-xs flex flex-col justify-between ${
                            item.recommended 
                              ? "bg-purple-50/70 border-purple-200 ring-2 ring-purple-100" 
                              : "bg-slate-50/70 border-slate-100"
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold mb-1">
                            <span className="text-slate-800 text-sm font-display">{item.name}</span>
                            {item.recommended && (
                              <span className="bg-purple-600 text-white text-[9px] uppercase px-1.5 py-0.2 rounded-md tracking-wider">
                                Escolha Applet
                              </span>
                            )}
                          </div>
                          <div className="space-y-0.5 text-slate-500 leading-tight">
                            <div><span className="text-emerald-700 font-bold">✓</span> {item.plus}</div>
                            <div><span className="text-red-700 font-bold">✗</span> {item.minus}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 12 Categories Bento Grid Title */}
                  <div>
                    <h3 className="text-lg font-bold font-display text-slate-800 mb-1">
                      12 Categorias Essenciais de Aprendizagem Segura
                    </h3>
                    <p className="text-xs text-slate-500">
                      Clica em qualquer um dos blocos para acederes a resumos científicos ricos, dicas práticas de higiene e conselhos de prevenção de risco:
                    </p>
                  </div>

                  {/* GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {EDUCATIONAL_CATEGORIES.map((cat) => (
                      <div
                        id={`category-card-${cat.id}`}
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat)}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[170px] shadow-xs relative group overflow-hidden ${getThemeColorClass(cat.colorTheme)}`}
                      >
                        {/* Decorative floating icon background */}
                        <div className="absolute right-2 bottom-2 text-slate-900/5 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300">
                          {renderCategoryIcon(cat.iconName)}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`p-2 rounded-xl bg-white shadow-2xs text-slate-800`}>
                              {renderCategoryIcon(cat.iconName)}
                            </div>
                            <h4 className="font-display font-bold text-sm sm:text-base tracking-tight leading-tight">
                              {cat.title}
                            </h4>
                          </div>
                          
                          <p className="text-xs text-slate-600 leading-snug">
                            {cat.shortDesc}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] font-bold mt-4 pt-2 border-t border-slate-900/5 group-hover:translate-x-1 transition-transform self-start">
                          Ler guia prático
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* OVERLAY DETAILS DRAWER IF SELECTED */}
                  {selectedCategory && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
                      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative border border-slate-100">
                        
                        {/* Drawer Header */}
                        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50 sticky top-0 z-10">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-white rounded-2xl shadow-xs text-slate-900">
                              {renderCategoryIcon(selectedCategory.iconName)}
                            </div>
                            <div>
                              <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full font-bold inline-block mb-1 ${getThemePillClass(selectedCategory.colorTheme)}`}>
                                Saúde & Autocuidado
                              </span>
                              <h3 className="font-display font-bold text-lg text-slate-800">
                                {selectedCategory.content.sectionTitle}
                              </h3>
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedCategory(null)}
                            className="p-1 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg text-xs"
                          >
                            Fechar
                          </button>
                        </div>

                        {/* Drawer Body content */}
                        <div className="p-6 space-y-6 flex-1">
                          
                          <p className="text-slate-700 text-sm leading-relaxed border-l-4 border-purple-400 pl-4 py-1 italic bg-slate-50/50 rounded-r-xl">
                            {selectedCategory.content.introduction}
                          </p>

                          <div className="space-y-4">
                            <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">
                              Pontos de Orientação Científica
                            </h4>
                            <div className="space-y-4">
                              {selectedCategory.content.points.map((pt, i) => (
                                <div key={i} className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100 space-y-2">
                                  <h5 className="font-bold text-slate-800 text-xs sm:text-sm font-display flex items-center gap-1.5">
                                    <span className="w-5 h-5 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center text-[11px] font-bold font-mono">
                                      {i + 1}
                                    </span>
                                    {pt.title}
                                  </h5>
                                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                    {pt.desc}
                                  </p>
                                  {pt.practicalTip && (
                                    <div className="bg-white p-2.5 rounded-xl border border-dashed border-emerald-200 text-emerald-950 text-xs">
                                      <strong className="text-emerald-800">Conselho Prático:</strong> {pt.practicalTip}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Medical/Abuse safety warnings block */}
                          {selectedCategory.content.safetyAlert && (
                            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex gap-3 text-xs text-amber-950">
                              <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0" />
                              <div className="space-y-1">
                                <strong className="text-amber-900 block font-display">Sinal de Alerta / Quando Pedir Ajuda:</strong>
                                <p className="leading-relaxed">{selectedCategory.content.safetyAlert}</p>
                              </div>
                            </div>
                          )}

                          {/* FAQ section */}
                          {selectedCategory.content.frequentlyAskedQuestion && (
                            <div className="bg-purple-50/50 border border-purple-100 p-4 rounded-2xl space-y-1.5">
                              <h5 className="font-bold text-purple-900 text-xs uppercase tracking-wider font-display flex items-center gap-1">
                                <Sparkles className="w-4 h-4 text-purple-600" />
                                Questão Comum das Adolescentes
                              </h5>
                              <p className="text-slate-800 text-xs sm:text-sm font-semibold italic">
                                "{selectedCategory.content.frequentlyAskedQuestion.q}"
                              </p>
                              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                {selectedCategory.content.frequentlyAskedQuestion.a}
                              </p>
                            </div>
                          )}

                        </div>

                        {/* Drawer Footer actions */}
                        <div className="p-4 bg-slate-50 border-t border-slate-100 rounded-b-3xl flex flex-col sm:flex-row items-center justify-between gap-3 gap-y-2">
                          <span className="text-[11px] text-slate-500 font-sans">
                            Conhecer o teu corpo é o primeiro passo para o teu crescimento saudável.
                          </span>
                          <button
                            onClick={() => {
                              const searchId = selectedCategory.id;
                              setSelectedCategory(null);
                              setActiveTab("conselheira");
                              setChatInput(`Gostaria de falar sobre o tema "${selectedCategory.title}". Podes dar-me mais conselhos práticos e responder às minhas dúvidas?`);
                            }}
                            className="w-full sm:w-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Conversar sobre isto no Chat
                          </button>
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 2: AI DIGITAL COUNSELOR CHAT */}
              {activeTab === "conselheira" && (
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-xl font-bold font-display text-slate-800 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                      Pedir Orientação à Conselheira Virtual
                    </h2>
                    <p className="text-xs text-slate-500">
                      O nosso chat é 100% privado e educativo. Escreve a tua dúvida abaixo ou clica numa das perguntas recomendadas para obteres respostas em português de Portugal.
                    </p>
                  </div>

                  {/* Medical friendly triggers warning */}
                  <div className="bg-amber-50/70 border border-amber-100 p-3.5 rounded-xl text-xs text-amber-950 leading-relaxed flex gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0" />
                    <div>
                      <strong>Nota de Apoio:</strong> A conselheira virtual é uma inteligência artificial orientada com bases científicas e educativas. Ela não substitui médicos, psicólogos, enfermeiros ou encarregados de educação. Para situações de desconforto grave, dor ou medo, deves falar imediatamente com profissionais de saúde ou um adulto da tua família.
                    </div>
                  </div>

                  {/* Prompt Suggestions bubbles */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Perguntas fáceis para começar:</p>
                    <div className="flex flex-wrap gap-2">
                      {predefinedSuggestions.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setChatInput(s);
                            handleSendChatMessage(s);
                          }}
                          className="px-2.5 py-1.5 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-950 border border-slate-150 rounded-xl text-[11px] font-medium text-left transition-colors cursor-pointer"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Chat bubbles viewport Container */}
                  <div className="border border-slate-100 rounded-2xl bg-slate-50/75 p-4 h-[350px] overflow-y-auto flex flex-col gap-3">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-purple-600 text-white self-end rounded-br-none shadow-xs"
                            : "bg-white text-slate-800 self-start border border-slate-150 rounded-bl-none shadow-2xs"
                        }`}
                      >
                        <div className="whitespace-pre-wrap font-sans">
                          {msg.text}
                        </div>
                        <div 
                          className={`text-[9px] mt-1 text-right ${
                            msg.role === "user" ? "text-purple-200" : "text-slate-400"
                          }`}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    ))}

                    {isChatLoading && (
                      <div className="bg-white border border-slate-150 rounded-2xl rounded-bl-none p-3.5 text-xs text-slate-500 self-start shadow-2xs max-w-[80%] flex items-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-600" />
                        A formular conselho seguro...
                      </div>
                    )}
                    
                    <div ref={scrollRef} />
                  </div>

                  {/* Chat Input form bar */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendChatMessage(chatInput);
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Qual é a tua dúvida secreta de hoje?"
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    />
                    <button
                      type="submit"
                      disabled={isChatLoading || !chatInput.trim()}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Enviar
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 3: PRIVATE DIARY (PIN LOCKED) */}
              {activeTab === "diario" && (
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
                  <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h2 className="text-xl font-bold font-display text-slate-800 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-purple-600" />
                        O Meu Diário de Saúde & Humores Secreto
                      </h2>
                      <p className="text-xs text-slate-500">
                        O diário é 100% privado, protegido localmente por senha PIN de 4 algarismos. Ideal para registares humores, o dia do período e sintomas.
                      </p>
                    </div>

                    {isDiaryUnlocked && (
                      <button
                        onClick={() => setIsDiaryUnlocked(false)}
                        className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        Bloquear Diário
                      </button>
                    )}
                  </div>

                  {/* CASO 1: USER HAS NOT SET UP PIN YET */}
                  {!isDiaryConfigured && (
                    <div className="max-w-md mx-auto py-8 text-center space-y-4">
                      <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                        <Key className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-slate-800 font-display">Cria o Teu PIN Secreto do Diário</h3>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto">
                        Escolhe um PIN de 4 números que não te esqueças para garantir que ninguém lê desnecessariamente o teu registo íntimo nos teus dispositivos.
                      </p>

                      <div className="space-y-2">
                        <input
                          type="password"
                          maxLength={4}
                          value={enteredPIN}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setEnteredPIN(val);
                          }}
                          placeholder="Ex: 1234"
                          className="w-32 text-center bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-lg font-bold font-mono tracking-widest focus:outline-none"
                        />
                        {pinError && <p className="text-xs text-red-600">{pinError}</p>}
                      </div>

                      <button
                        onClick={() => handleSetPIN(enteredPIN)}
                        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer inline-block"
                      >
                        Ativar PIN Secreto
                      </button>
                    </div>
                  )}

                  {/* CASO 2: DIARY IS CONFIGURED BUT CURRENTLY LOCALLY LOCKED */}
                  {isDiaryConfigured && !isDiaryUnlocked && (
                    <div className="max-w-md mx-auto py-10 text-center space-y-4 border border-teal-50 bg-teal-50/10 rounded-2xl p-6">
                      <div className="w-12 h-12 bg-tea-50 text-teal-600 rounded-full flex items-center justify-center mx-auto">
                        <Lock className="w-6 h-6 text-teal-600" />
                      </div>
                      <h3 className="font-bold text-slate-800 font-display">Insere o teu PIN de 4 dígitos</h3>
                      <p className="text-xs text-slate-500">
                        O diário está selado. Digita a tua palavra-passe secreta para abrir e ler as tuas anotações:
                      </p>

                      <div className="space-y-2">
                        <input
                          type="password"
                          maxLength={4}
                          value={enteredPIN}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setEnteredPIN(val);
                          }}
                          placeholder="PIN de 4 dígitos"
                          className="w-36 text-center bg-white border border-slate-300 rounded-xl px-3 py-2 text-lg font-bold font-mono tracking-widest focus:outline-none"
                        />
                        {pinError && <p className="text-xs text-red-600">{pinError}</p>}
                      </div>

                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleUnlockPIN(enteredPIN)}
                          className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          Desbloquear Páginas
                        </button>
                        <button
                          onClick={handleResetPIN}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-medium"
                        >
                          Esqueci-me do PIN
                        </button>
                      </div>
                    </div>
                  )}

                  {/* CASO 3: DIARY IS UNLOCKED - MANAGE AND WRITE LOGS */}
                  {isDiaryConfigured && isDiaryUnlocked && (
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                      
                      {/* Left side: Add new Log */}
                      <div className="lg:col-span-2 bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-4">
                        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider font-display border-b border-slate-200 pb-2">
                          + Escrever Nova Página Secreta
                        </h3>

                        {/* Humor selector */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500 block">Como te sentes hoje emocionalmente?</label>
                          <div className="grid grid-cols-5 gap-1">
                            {[
                              { code: "feliz", label: "Feliz", emoji: "🌸" },
                              { code: "cansada", label: "Cansada", emoji: "🛏️" },
                              { code: "ansiosa", label: "Ansiosa", emoji: "💭" },
                              { code: "triste", label: "Triste", emoji: "💧" },
                              { code: "confiante", label: "Forte", emoji: "⭐" }
                            ].map((mood) => (
                              <button
                                key={mood.code}
                                onClick={() => setNewLogMood(mood.code)}
                                className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                                  newLogMood === mood.code 
                                    ? "bg-purple-100 border-purple-400 font-bold text-purple-900" 
                                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                                }`}
                                title={mood.label}
                              >
                                <span className="text-sm block">{mood.emoji}</span>
                                <span className="text-[9px] block uppercase font-sans">{mood.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Menstruation status toggle */}
                        <div className="space-y-1 flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200">
                          <div>
                            <span className="text-xs font-bold text-slate-700 block">Menstruação Ativa</span>
                            <span className="text-[10px] text-slate-400 block">Estás com o período hoje?</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={newLogMenstruation}
                            onChange={(e) => setNewLogMenstruation(e.target.checked)}
                            className="w-4 h-4 cursor-pointer text-purple-600 rounded focus:ring-purple-200"
                          />
                        </div>

                        {/* Pain scale slider */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500 block">Nível de cólicas/dores menstruais (0 a 5):</label>
                          <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200">
                            <input
                              type="range"
                              min="0"
                              max="5"
                              value={newLogPainLevel}
                              onChange={(e) => setNewLogPainLevel(Number(e.target.value))}
                              className="flex-1 cursor-pointer h-1.5 bg-slate-100 rounded-lg appearance-none"
                            />
                            <span className="text-xs font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded-md font-mono">
                              {newLogPainLevel}/5
                            </span>
                          </div>
                        </div>

                        {/* Skin condition */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500 block">Estado da tua pele / acne:</label>
                          <select
                            value={newLogSkin}
                            onChange={(e) => setNewLogSkin(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none"
                          >
                            <option value="estável">Perfeitamente estável e limpa 🌸</option>
                            <option value="algumas-borbulhas">Algumas borbulhas ligeiras / acne</option>
                            <option value="irritada">Pele vermelha / irritada</option>
                          </select>
                        </div>

                        {/* Metrics: Sleep and Water */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Sono (horas):</label>
                            <input
                              type="number"
                              min="0"
                              max="24"
                              value={newLogSleep}
                              onChange={(e) => setNewLogSleep(Number(e.target.value))}
                              className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs text-slate-700 font-mono"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 block">Água (copos):</label>
                            <input
                              type="number"
                              min="0"
                              max="20"
                              value={newLogWater}
                              onChange={(e) => setNewLogWater(Number(e.target.value))}
                              className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs text-slate-700 font-mono"
                            />
                          </div>
                        </div>

                        {/* Stress level */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500 block">Nível de Stress / Pressão do Grupo (0 a 5):</label>
                          <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200">
                            <input
                              type="range"
                              min="0"
                              max="5"
                              value={newLogStress}
                              onChange={(e) => setNewLogStress(Number(e.target.value))}
                              className="flex-1 cursor-pointer h-1.5 bg-slate-100 rounded-lg appearance-none"
                            />
                            <span className="text-xs font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded-md font-mono">
                              {newLogStress}/5
                            </span>
                          </div>
                        </div>

                        {/* Text note box */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500 block">Pensamentos, desabafos ou segredos da escola:</label>
                          <textarea
                            value={newLogNotes}
                            onChange={(e) => setNewLogNotes(e.target.value)}
                            placeholder="Hoje senti que..."
                            rows={3}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none"
                          />
                        </div>

                        <button
                          onClick={handleSaveDiaryEntry}
                          className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer text-center"
                        >
                          Guardar Página Secreta
                        </button>
                      </div>

                      {/* Right side: History view */}
                      <div className="lg:col-span-3 space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider font-display">
                            Páginas Anteriores do Diário
                          </h3>
                          <button
                            onClick={handleResetPIN}
                            className="text-[10px] text-red-600 hover:underline cursor-pointer"
                          >
                            Eliminar Dados & Repor PIN
                          </button>
                        </div>

                        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                          {diaryEntries.length === 0 ? (
                            <div className="text-center py-12 text-slate-400 text-xs">
                              A tua caderneta está preenchida de silêncio. Escreve o teu primeiro log à esquerda para veres o teu histórico!
                            </div>
                          ) : (
                            diaryEntries.map((entry) => (
                              <div key={entry.id} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl relative space-y-2">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold font-mono text-slate-800">{entry.date}</span>
                                    <span className="bg-purple-100 text-purple-800 text-[9px] uppercase font-bold px-2 py-0.5 rounded-full">
                                      Humor: {entry.mood === 'feliz' ? '🌸 Alegre' : entry.mood === 'cansada' ? '🛏️ Cansada' : entry.mood === 'ansiosa' ? '💭 Ansiosa' : entry.mood === 'triste' ? '💧 Triste' : '⭐ Confiante'}
                                    </span>
                                  </div>

                                  <button
                                    onClick={() => handleDeleteDiaryEntry(entry.id)}
                                    className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                                    title="Apagar log"
                                  >
                                    <Trash className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-1 select-none">
                                  <div className="bg-white px-2 py-1 rounded-lg border border-slate-150 text-[10px] text-slate-500">
                                    Menstruação: <strong className="text-slate-800">{entry.menstruation ? "Sim 🔴" : "Não ⚪"}</strong>
                                  </div>
                                  <div className="bg-white px-2 py-1 rounded-lg border border-slate-150 text-[10px] text-slate-500">
                                    Cólica: <strong className="text-slate-800">{entry.painLevel}/5</strong>
                                  </div>
                                  <div className="bg-white px-2 py-1 rounded-lg border border-slate-150 text-[10px] text-slate-500">
                                    Pele: <strong className="text-slate-800 capitalize">{entry.skinCondition}</strong>
                                  </div>
                                  <div className="bg-white px-2 py-1 rounded-lg border border-slate-150 text-[10px] text-slate-500">
                                    Stress: <strong className="text-slate-800">{entry.stressLevel}/5</strong>
                                  </div>
                                </div>

                                <p className="text-xs text-slate-600 whitespace-pre-wrap leading-relaxed bg-white/50 p-2.5 rounded-xl border border-slate-100 italic">
                                  "{entry.notes}"
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              )}

              {/* TAB 4: DAILY HABITS REGISTER */}
              {activeTab === "checklist" && (
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-6">
                  
                  {/* Habits header with statistics block */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                    <div>
                      <h2 className="text-xl font-bold font-display text-slate-800 flex items-center gap-2">
                        <CheckSquare className="w-5 h-5 text-purple-600" />
                        Registo de Hábitos e Autocuidado Diário
                      </h2>
                      <p className="text-xs text-slate-500">
                        Pequenas rotinas trazem grandes benefícios! Monitoriza o teu progresso do dia e desbloqueia medalhas de frescura.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-50 p-2.5 px-4 rounded-2xl border border-slate-250 self-start">
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">Progresso Diário</span>
                        <span className="text-lg font-black font-display text-purple-900">{completedHabitsCount}/{totalHabitsCount} Completos</span>
                      </div>
                      <div className="w-12 h-12 rounded-full border-4 border-purple-200 flex items-center justify-center font-display font-bold text-xs text-purple-900 bg-white">
                        {habitsPercent}%
                      </div>
                    </div>
                  </div>

                  {/* Motivator reward notice */}
                  <div className="bg-gradient-to-r from-purple-50 to-emerald-50 p-4 rounded-xl border border-purple-100 text-xs text-slate-700 italic flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>{getMotivationalQuote(habitsPercent)}</span>
                  </div>

                  {/* Checklist items list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {checklistItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleToggleHabit(item.id)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 select-none ${
                          item.completed 
                            ? "bg-slate-50 border-purple-400 ring-1 ring-purple-100 text-slate-700" 
                            : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                            item.completed 
                              ? "bg-purple-600 border-purple-600 text-white" 
                              : "border-slate-350 bg-white"
                          }`}>
                            {item.completed && <Check className="w-3.5 h-3.5" />}
                          </div>
                          
                          <span className="text-xs sm:text-sm font-medium">
                            {item.label}
                          </span>
                        </div>

                        <span className="text-[9px] uppercase tracking-wider font-mono font-bold font-sans bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-md">
                          {item.category}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 justify-end border-t border-slate-100 pt-4">
                    <button
                      onClick={handleResetChecklist}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                    >
                      Repor Checklist
                    </button>
                    <button
                      onClick={() => alert("As tuas rotinas são o teu escudo! Amanhã haverá um novo dia de super cuidados para preencher.")}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1"
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      Concluir Dia
                    </button>
                  </div>

                </div>
              )}

              {/* TAB 5: SOS AND EMERGENCY PORTAL (PORTUGAL HOTLINES) */}
              {activeTab === "sos" && (
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-bold font-display text-slate-800 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-red-600 animate-pulse" />
                      Área de Apoio e Emergência Pessoal (SOS)
                    </h2>
                    <p className="text-xs text-slate-500">
                      Se te estás a sentir com medo, em perigo real, vítima de chantagem ou de abusos na internet/escola, mantém a calma. Aqui tens ajuda imediata e confidencial.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    
                    {/* SOS Instructions advice */}
                    <div className="lg:col-span-3 bg-red-50/70 p-5 rounded-2xl border border-red-200 text-xs text-red-950 space-y-4">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-700" />
                        <h4 className="font-bold font-display text-sm text-red-900">
                          3 Passos de Ouro se Estiveres com Medo na Rua:
                        </h4>
                      </div>

                      <div className="space-y-2.5 text-slate-700">
                        <p className="leading-relaxed">
                          <strong>1. ENTRA NUM CAFÉ OU LOJA PÚBLICA:</strong> Fala diretamente com quem está no balcão de vendas. Diz claramente: <em>"Aquele senhor está a seguir-me, preciso de ajuda e de ligar aos meus pais."</em>
                        </p>
                        <p className="leading-relaxed">
                          <strong>2. USA A PALAVRA-CÓDIGO SECRETA:</strong> Envia por mensagem ou diz por telefone a palavra de código que combinaste com os pais (ex: <em>"Estrela"</em>). Eles saberão que estás em perigo e ligam de pretexto para ir buscar-te.
                        </p>
                        <p className="leading-relaxed">
                          <strong>3. GRITA SE ALGUÉM TE AGARRAR:</strong> Se alguém tentar te forçar a ir a um local isolado ou carro, grita muito forte: <em>"FOGO!"</em> ou <em>"NÃO TE CONHEÇO!"</em>. Isto atrai a atenção de todas as pessoas em redor.
                        </p>
                      </div>

                      <div className="border-t border-red-200/50 pt-3">
                        <span className="text-[10px] text-red-800 font-mono uppercase tracking-wider block font-bold">Configurar Contacto de Confiança</span>
                        <div className="flex flex-col sm:flex-row gap-2 mt-2">
                          <input
                            type="text"
                            value={customSOSContact}
                            onChange={(e) => setCustomSOSContact(e.target.value)}
                            placeholder="Ex: Mãe (Maria)"
                            className="bg-white border border-red-250 rounded-xl px-2.5 py-1 text-xs text-slate-800 focus:outline-none"
                          />
                          <input
                            type="text"
                            value={emergencyPhone}
                            onChange={(e) => setEmergencyPhone(e.target.value)}
                            placeholder="Telemóvel"
                            className="bg-white border border-red-250 rounded-xl px-2.5 py-1 text-xs text-slate-800 font-mono focus:outline-none w-32"
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={triggerSOSAlert}
                          className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black shadow-md cursor-pointer flex items-center justify-center gap-2"
                        >
                          <MapPin className="w-4 h-4" />
                          Simular "Enviar Localização GPS" de Alerta
                        </button>
                      </div>

                      {sosStatus && (
                        <div className="p-3 bg-white border border-red-300 rounded-xl font-mono text-[11px] text-red-950 animate-shake">
                          {sosStatus}
                        </div>
                      )}
                    </div>

                    {/* Official Portugal lines to copy/dial */}
                    <div className="lg:col-span-2 space-y-3">
                      <h4 className="font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                        Contactos Gratuitos e Confidenciais em Portugal:
                      </h4>

                      <div className="space-y-2">
                        
                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                          <div>
                            <span className="text-xs text-slate-500 block">Número de Emergência Nacional</span>
                            <span className="font-bold text-base text-red-700 font-mono">112</span>
                          </div>
                          <span className="text-[10px] bg-red-100 text-red-900 font-bold px-2 py-0.5 rounded-md">
                            Polícia / Ambulância
                          </span>
                        </div>

                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                          <div>
                            <span className="text-xs text-slate-500 block">Sexualidade em Linha (APF)</span>
                            <span className="font-bold text-sm text-slate-800 font-mono">800 222 444</span>
                          </div>
                          <span className="text-[9px] bg-purple-100 text-purple-900 font-semibold px-1.5 py-0.5 rounded-md">
                            Dúvidas Íntimas
                          </span>
                        </div>

                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                          <div>
                            <span className="text-xs text-slate-500 block">Linha de Apoio à Criança e Jovem</span>
                            <span className="font-bold text-sm text-slate-800 font-mono">116 111</span>
                          </div>
                          <span className="text-[9px] bg-blue-100 text-blue-900 font-semibold px-1.5 py-0.5 rounded-md">
                            Abusos / Bullying
                          </span>
                        </div>

                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                          <div>
                            <span className="text-xs text-slate-500 block">APAV (Vítima de Violência/Cyberbullying)</span>
                            <span className="font-bold text-sm text-slate-800 font-mono">116 006</span>
                          </div>
                          <span className="text-[9px] bg-rose-100 text-rose-900 font-semibold px-1.5 py-0.5 rounded-md">
                            Chantagem Nudes
                          </span>
                        </div>

                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                          <div>
                            <span className="text-xs text-slate-500 block">SNS 24 (Serviço Nacional de Saúde)</span>
                            <span className="font-bold text-sm text-slate-800 font-mono">808 24 24 24</span>
                          </div>
                          <span className="text-[9px] bg-emerald-100 text-emerald-900 font-semibold px-1.5 py-0.5 rounded-md">
                            Avaliação Clínica
                          </span>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 6: DEVELOPERS PORTAL & ANDROID SOURCE CODE EXPORTER */}
              {activeTab === "dev" && (
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-5">
                  <div className="border-b border-slate-100 pb-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                    <div>
                      <h2 className="text-xl font-bold font-mono text-slate-900 flex items-center gap-2">
                        <FileCode className="w-5 h-5 text-slate-700" />
                        Portal de Arquitetura & Código Kotlin (Android)
                      </h2>
                      <p className="text-xs text-slate-500">
                        Exporta a documentação detalhada da app e obtém o código compilável em Kotlin e Jetpack Compose.
                      </p>
                    </div>
                  </div>

                  {/* Summary deliverables of App design */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                      <h4 className="font-bold font-display text-slate-800 text-xs block uppercase tracking-wider">
                        1. Nome & Descrição do Projeto
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                        <strong>Nome Recomendado:</strong> Crescer com Confiança<br />
                        <strong>Descrição Comercial:</strong> Aplicação Android nativa, segura e protetora, focada em guiar jovens dos 10 aos 17 anos em saúde íntima femenina, higiene, consentimento, nutrição e segurança urbana em Portugal de forma anónima, sem vender publicidade invasiva e offline-first.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                      <h4 className="font-bold font-display text-slate-800 text-xs block uppercase tracking-wider">
                        2. Modelo de Dados (Room Schema)
                      </h4>
                      <div className="text-[10px] text-slate-600 font-mono leading-tight space-y-1">
                        <div><strong>Entidade:</strong> <code>DiaryEntryEntity</code></div>
                        <div>• <code>id</code> (Int, PrimaryKey AutoGenerate)</div>
                        <div>• <code>dateString</code> (String)</div>
                        <div>• <code>mood</code> (String)</div>
                        <div>• <code>menstruation</code> (Boolean)</div>
                        <div>• <code>painLevel</code> (Int)</div>
                        <div>• <code>skinCondition</code> (String)</div>
                        <div>• <code>notes</code> (String - encrypted)</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                      <h4 className="font-bold font-display text-slate-800 text-xs block uppercase tracking-wider">
                        3. Mapa de Ecrãs / UI Flow
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        • <code>HomeScreen</code>: Bento-grid de categorias, feed conselhos, botão SOS.<br />
                        • <code>CategoryDetailCompo</code>: Artigos científicos integrados por Id de categoria.<br />
                        • <code>DiaryRoomPanel</code>: Desbloqueio PIN, listas locais, diário.<br />
                        • <code>SOSDiscreetButton</code>: Switch invisível, emergências gratuitas 112/APF.
                      </p>
                    </div>

                  </div>

                  {/* Interactive files checklist and syntax code editor view */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Ficheiros de Código Kotlin Disponíveis:</span>
                    
                    <div className="flex flex-wrap gap-1">
                      {KOTLIN_TEMPLATES.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedKotlinIndex(idx);
                            setCopiedCodeSuccess(false);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors cursor-pointer ${
                            selectedKotlinIndex === idx
                              ? "bg-slate-800 text-white font-bold"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-250"
                          }`}
                        >
                          {item.filename}
                        </button>
                      ))}
                    </div>

                    <div className="bg-slate-900 text-slate-300 p-4 rounded-2xl space-y-3 border border-slate-800 shadow-lg relative">
                      
                      {/* Copy code banner button */}
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                        <span className="font-mono text-slate-400">
                          {KOTLIN_TEMPLATES[selectedKotlinIndex].path}
                        </span>
                        
                        <button
                          onClick={handleCopyKotlinCode}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-mono hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          {copiedCodeSuccess ? (
                            <span className="text-emerald-400 font-bold">Copiado! ✓</span>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5" />
                              <span>Copiar Código</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-slate-400 italic">
                        <strong>Ficheiro:</strong> {KOTLIN_TEMPLATES[selectedKotlinIndex].description}
                      </p>

                      <pre className="text-[11px] sm:text-xs font-mono overflow-x-auto p-2 bg-slate-950/80 rounded-xl leading-relaxed text-slate-100 max-h-[350px]">
                        {KOTLIN_TEMPLATES[selectedKotlinIndex].code}
                      </pre>
                    </div>
                  </div>

                </div>
              )}

            </div>
          </main>

          {/* COMPASSIONATE FOOTER WITH SOCIAL LINHA DE APOIO */}
          <footer className="bg-white border-t border-slate-100 py-6 mt-12 text-center text-xs text-slate-600 font-sans">
            <div className="max-w-7xl mx-auto px-4 space-y-3">
              <p className="font-display font-semibold text-slate-800">
                Uma App para Cresceres com Autonomia, Autoestima e Confiança.
              </p>
              <p className="max-w-lg mx-auto text-slate-500 text-[11px] leading-relaxed">
                Desenrolado com todo o respeito científico, empático e de proteção às adolescentes de Portugal. Apoios e linhas SOS nacionais integradas: Linha Sexualidade em Linha (800 222 444) e Emergência Nacional (112).
              </p>
              <div className="text-[10px] text-slate-400 font-mono">
                Porto / Lisboa / Algarve / Ilhas • Portugal 2026
              </div>
            </div>
          </footer>

          {/* Premium mobile sticky bottom navigation (Only visible on mobile screens) */}
          <div className="lg:hidden fixed bottom-2.5 left-2.5 right-2.5 z-45 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-1.5 py-2 flex items-center justify-around">
            <button
              onClick={() => { setActiveTab("guia"); setSelectedCategory(null); }}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                activeTab === "guia" ? "text-purple-600 font-bold scale-105" : "text-slate-500 hover:text-purple-500"
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-[9px] mt-0.5 font-sans font-medium">Guia</span>
            </button>
            <button
              onClick={() => setActiveTab("conselheira")}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                activeTab === "conselheira" ? "text-purple-600 font-bold scale-105" : "text-slate-500 hover:text-purple-500"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-[9px] mt-0.5 font-sans font-medium">Conselheira</span>
            </button>
            <button
              onClick={() => setActiveTab("diario")}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                activeTab === "diario" ? "text-purple-600 font-bold scale-105" : "text-slate-500 hover:text-purple-500"
              }`}
            >
              <Lock className="w-5 h-5" />
              <span className="text-[9px] mt-0.5 font-sans font-medium">Diário</span>
            </button>
            <button
              onClick={() => setActiveTab("checklist")}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                activeTab === "checklist" ? "text-purple-600 font-bold scale-105" : "text-slate-500 hover:text-purple-500"
              }`}
            >
              <CheckSquare className="w-5 h-5" />
              <span className="text-[9px] mt-0.5 font-sans font-medium">Hábitos</span>
            </button>
            <button
              onClick={() => setActiveTab("sos")}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                activeTab === "sos" ? "text-rose-600 font-bold scale-105" : "text-slate-500 hover:text-rose-500"
              }`}
            >
              <Shield className="w-5 h-5" />
              <span className="text-[9px] mt-0.5 font-sans font-medium">SOS</span>
            </button>

          </div>
        </>
      )}
      
    </div>
  );
}
