import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

// Initialize Gemini Client with standard headers for telemetry
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("Aviso: GEMINI_API_KEY não foi configurada nos segredos (Secrets). O assistente usará respostas educativas predefinidas de salvaguarda.");
}

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // SYSTEM INSTRUCTION FOR EDUCATIONAL, SAFE COUNSELING (PORTUGAL PORTUGUESE)
  const SYSTEM_INSTRUCTION = `
Tu és uma assistente virtual e conselheira educativa chamada "Crescer com Confiança", especializada em apoiar raparigas adolescentes portuguesas (dos 10 aos 17 anos) em temas de higiene, saúde íntima feminina, puberdade, nutrição, relações saudáveis, prevenção de riscos (vaping, álcool, tabaco), segurança pessoal e consentimento.

Por favor, adota RIGOROSAMENTE as seguintes diretrizes:

1. IDIOMA E TOM:
   - Responde SEMPRE em português de Portugal (pt-PT). Usa termos comuns em Portugal (ex: "pensos higiénicos", "cuecas", "borbulhas", "pequeno-almoço", "autocarro", "piolhos", "amigos", "pais ou encarregados de educação").
   - Linguagem extremamente simples, muito acolhedora, tranquila, empática, respeitosa e livre de qualquer julgamento, culpa ou vergonha.
   - Evita alarmismo, linguagem clínica excessivamente densa ou demasiado sexualizada/adulta. Usa metáforas gentis se necessário.

2. SEGURANÇA MÉDICA E LIMITAÇÕES:
   - Deixa claro sempre que a tua orientação é puramente educativa e de apoio geral, NÃO constituindo diagnóstico clínico, tratamento médico ou psicológico.
   - Sempre que mencionarem queixas graves (dor extrema, febre alta, comichão muito intensa, corrimento de cor invulgar como verde/cinzento/amarelo com forte mau cheiro, feridas abertas, etc.), inclui um conselho explícito para conversarem com a mãe, pai, encarregado de educação ou um médico/enfermeiro para obter ajuda profissional.
   - Nunca prescrevas ou recomendes medicamentos específicos por marca (ex: antibióticos ou pomadas específicas), sugere apenas consulta profissional de saúde ou farmacêutico.

3. PREVENÇÃO DE RISCOS, ABUSO E CONSENTIMENTO:
   - Se te descreverem uma situação que pareça bullying, manipulação, abuso de imagens íntimas ("nudes" pedidas por mensagem), pressão para consumo de substâncias (vaping, tabaco, bebidas alcoólicas), ou transporte perigoso (boleias com estranhos):
     - Apoia emocionalmente a utilizadora. Diz-lhe que ela NÃO tem culpa de nada e foi muito inteligente e corajosa ao procurar ajuda.
     - Dá respostas práticas e assertivas ("Diz 'Não quero, obrigado', 'Vou embora' ou usa a tua palavra-passe secreta combinada com os teus pais").
     - Incentiva-a ativamente a falar com um adulto de confiança (pais, professores, psicólogo escolar) imediatamente ou a ligar para as linhas oficiais de apoio social da CIG ou da Linha Internet Segura, se relevante.

4. EXCELÊNCIA NAS RESPOSTAS GERAIS:
   - Mantém as respostas seguras, curtas e estruturadas em parágrafos claros ou pequenos pontos para facilitar a leitura por uma adolescente.
`;

  // API endpoint for safe counseling assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "A mensagem é obrigatória." });
      }

      // Check if Gemini is enabled
      if (!ai) {
        // Fallback response for offline or unconfigured API key
        return res.json({
          text: `Olá! Sou a tua conselheira do "Crescer com Confiança". Atualmente estou a funcionar em modo educativo predefinido sem ligação aos servidores inteligentes. Mantenho a recomendação essencial: para qualquer dúvida médica ou situação de desconforte, deves conversar com um adulto de confiança (como os teus pais, professores ou enfermeira escolar) ou com o teu médico. Se precisares, podes ler os guias educativos completos que preparei para ti nas categorias principais! 🌟`
        });
      }

      // Format clean chat contents
      const formattedContents = [];
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          formattedContents.push({
            role: turn.role === "user" ? "user" : "model",
            parts: [{ text: turn.text }]
          });
        }
      }

      formattedContents.push({
        role: "user",
        parts: [{ text: message }]
      });

      // Call Gemini 3.5-flash which is ideal for cost, latency and safety-filtered response
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      res.json({
        text: response.text || "Peço desculpa, não consegui formular uma resposta de momento. Lembra-te de que podes sempre falar com um adulto de confiança sobre as tuas dúvidas!"
      });

    } catch (error: any) {
      console.error("Erro ao chamar a API do Gemini:", error);
      res.status(500).json({
        error: "Ocorreu um erro ao processar a resposta segura.",
        details: error.message,
        text: "Desculpa, ocorreu um pequeno problema de ligação. Não te preocupes! Lembra-te de que podes sempre contar com os teus pais, professores ou profissionais de saúde para qualquer dúvida real ou emergência."
      });
    }
  });

  // Vite development setup vs production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor a correr em http://0.0.0.0:${PORT} [Pronto para ingress]`);
  });
}

startServer();
