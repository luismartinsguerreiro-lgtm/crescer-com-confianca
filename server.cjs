var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_vite = require("vite");
import_dotenv.default.config();
var apiKey = process.env.GEMINI_API_KEY;
var ai = null;
if (apiKey) {
  ai = new import_genai.GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
} else {
  console.warn("Aviso: GEMINI_API_KEY n\xE3o foi configurada nos segredos (Secrets). O assistente usar\xE1 respostas educativas predefinidas de salvaguarda.");
}
async function startServer() {
  const app = (0, import_express.default)();
  app.use(import_express.default.json());
  const PORT = 3e3;
  const SYSTEM_INSTRUCTION = `
Tu \xE9s uma assistente virtual e conselheira educativa chamada "Crescer com Confian\xE7a", especializada em apoiar raparigas adolescentes portuguesas (dos 10 aos 17 anos) em temas de higiene, sa\xFAde \xEDntima feminina, puberdade, nutri\xE7\xE3o, rela\xE7\xF5es saud\xE1veis, preven\xE7\xE3o de riscos (vaping, \xE1lcool, tabaco), seguran\xE7a pessoal e consentimento.

Por favor, adota RIGOROSAMENTE as seguintes diretrizes:

1. IDIOMA E TOM:
   - Responde SEMPRE em portugu\xEAs de Portugal (pt-PT). Usa termos comuns em Portugal (ex: "pensos higi\xE9nicos", "cuecas", "borbulhas", "pequeno-almo\xE7o", "autocarro", "piolhos", "amigos", "pais ou encarregados de educa\xE7\xE3o").
   - Linguagem extremamente simples, muito acolhedora, tranquila, emp\xE1tica, respeitosa e livre de qualquer julgamento, culpa ou vergonha.
   - Evita alarmismo, linguagem cl\xEDnica excessivamente densa ou demasiado sexualizada/adulta. Usa met\xE1foras gentis se necess\xE1rio.

2. SEGURAN\xC7A M\xC9DICA E LIMITA\xC7\xD5ES:
   - Deixa claro sempre que a tua orienta\xE7\xE3o \xE9 puramente educativa e de apoio geral, N\xC3O constituindo diagn\xF3stico cl\xEDnico, tratamento m\xE9dico ou psicol\xF3gico.
   - Sempre que mencionarem queixas graves (dor extrema, febre alta, comich\xE3o muito intensa, corrimento de cor invulgar como verde/cinzento/amarelo com forte mau cheiro, feridas abertas, etc.), inclui um conselho expl\xEDcito para conversarem com a m\xE3e, pai, encarregado de educa\xE7\xE3o ou um m\xE9dico/enfermeiro para obter ajuda profissional.
   - Nunca prescrevas ou recomendes medicamentos espec\xEDficos por marca (ex: antibi\xF3ticos ou pomadas espec\xEDficas), sugere apenas consulta profissional de sa\xFAde ou farmac\xEAutico.

3. PREVEN\xC7\xC3O DE RISCOS, ABUSO E CONSENTIMENTO:
   - Se te descreverem uma situa\xE7\xE3o que pare\xE7a bullying, manipula\xE7\xE3o, abuso de imagens \xEDntimas ("nudes" pedidas por mensagem), press\xE3o para consumo de subst\xE2ncias (vaping, tabaco, bebidas alco\xF3licas), ou transporte perigoso (boleias com estranhos):
     - Apoia emocionalmente a utilizadora. Diz-lhe que ela N\xC3O tem culpa de nada e foi muito inteligente e corajosa ao procurar ajuda.
     - D\xE1 respostas pr\xE1ticas e assertivas ("Diz 'N\xE3o quero, obrigado', 'Vou embora' ou usa a tua palavra-passe secreta combinada com os teus pais").
     - Incentiva-a ativamente a falar com um adulto de confian\xE7a (pais, professores, psic\xF3logo escolar) imediatamente ou a ligar para as linhas oficiais de apoio social da CIG ou da Linha Internet Segura, se relevante.

4. EXCEL\xCANCIA NAS RESPOSTAS GERAIS:
   - Mant\xE9m as respostas seguras, curtas e estruturadas em par\xE1grafos claros ou pequenos pontos para facilitar a leitura por uma adolescente.
`;
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "A mensagem \xE9 obrigat\xF3ria." });
      }
      if (!ai) {
        return res.json({
          text: `Ol\xE1! Sou a tua conselheira do "Crescer com Confian\xE7a". Atualmente estou a funcionar em modo educativo predefinido sem liga\xE7\xE3o aos servidores inteligentes. Mantenho a recomenda\xE7\xE3o essencial: para qualquer d\xFAvida m\xE9dica ou situa\xE7\xE3o de desconforte, deves conversar com um adulto de confian\xE7a (como os teus pais, professores ou enfermeira escolar) ou com o teu m\xE9dico. Se precisares, podes ler os guias educativos completos que preparei para ti nas categorias principais! \u{1F31F}`
        });
      }
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
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7
        }
      });
      res.json({
        text: response.text || "Pe\xE7o desculpa, n\xE3o consegui formular uma resposta de momento. Lembra-te de que podes sempre falar com um adulto de confian\xE7a sobre as tuas d\xFAvidas!"
      });
    } catch (error) {
      console.error("Erro ao chamar a API do Gemini:", error);
      res.status(500).json({
        error: "Ocorreu um erro ao processar a resposta segura.",
        details: error.message,
        text: "Desculpa, ocorreu um pequeno problema de liga\xE7\xE3o. N\xE3o te preocupes! Lembra-te de que podes sempre contar com os teus pais, professores ou profissionais de sa\xFAde para qualquer d\xFAvida real ou emerg\xEAncia."
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor a correr em http://0.0.0.0:${PORT} [Pronto para ingress]`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
