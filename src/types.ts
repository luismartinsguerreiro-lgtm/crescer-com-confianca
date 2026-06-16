export interface EducationalCategory {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string; // Lucide icon name mapping
  colorTheme: string; // Tailwind color class (e.g., 'primary', 'rose', 'emerald')
  content: {
    sectionTitle: string;
    introduction: string;
    points: {
      title: string;
      desc: string;
      practicalTip?: string;
    }[];
    safetyAlert?: string;
    frequentlyAskedQuestion?: {
      q: string;
      a: string;
    };
  };
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

export interface DiaryEntry {
  id: string;
  date: string;
  mood: string; // 'feliz' | 'triste' | 'cansada' | 'ansiosa' | 'confiante'
  menstruation: boolean;
  painLevel: number; // 0 to 5
  skinCondition: string; // 'estável' | 'algumas-borbulhas' | 'irritada'
  sleepHours: number;
  waterIntake: number; // glasses or liters
  stressLevel: number; // 0 to 5
  notes: string;
  isLocked: boolean;
}

export interface DailyChecklistItem {
  id: string;
  label: string;
  category: string;
  completed: boolean;
}
