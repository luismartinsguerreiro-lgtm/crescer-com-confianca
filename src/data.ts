import { EducationalCategory } from "./types";

export const EDUCATIONAL_CATEGORIES: EducationalCategory[] = [
  {
    id: "higiene-corpo",
    title: "Higiene do Corpo",
    shortDesc: "Dicas práticas sobre o banho diário, desodorizantes e o cheiro normal do corpo.",
    iconName: "ShowerHead",
    colorTheme: "blue",
    content: {
      sectionTitle: "Cuidados Diários e Frescura",
      introduction: "Durante a adolescência, o corpo começa a transpirar mais por causa das hormonas das glândulas sudoríparas. Isto é completamente normal e faz parte de crescer! Com pequenos gestos diários, podes sentir-te limpa, fresca e confiante todos os dias.",
      points: [
        {
          title: "O banho completo diário",
          desc: "Toma um banho todos os dias, especialmente após fazeres desporto ou nos dias mais quentes. Usa água morna (nunca demasiado quente para não secar a pele) e um sabão ou gel de banho suave.",
          practicalTip: "Dá atenção especial às zonas que transpiram mais: axilas, pés, virilhas e por trás dos joelhos. Passa bem por água e seca-te sempre muito bem com uma toalha lavada."
        },
        {
          title: "Desodorizante vs. Antitranspirante",
          desc: "O desodorizante ajuda a neutralizar as bactérias que causam o odor da transpiração. O antitranspirante reduz a quantidade de suor. Escolhe um desodorizante suave sem álcool para não irritar as axilas.",
          practicalTip: "Aplica o desodorizante com a pele das axilas totalmente limpa e bem seca. Evita aplicar logo após a depilação para não arder."
        },
        {
          title: "Prevenção de chulé e cuidados com os pés",
          desc: "O mau cheiro nos pés (conhecido vulgarmente como chulé) acontece quando o suor fica retido no calçado e alimenta bactérias.",
          practicalTip: "Muda de meias todos os dias (escolhe meias de algodão, que respiram melhor que as sintéticas). Seca muito bem o espaço entre os dedos dos pés após o banho. Deixa os teus ténis arejarem ao sol quando não os usas."
        },
        {
          title: "Roupa limpa todos os dias",
          desc: "Mudar de cuecas e de meias todos os dias é fundamental para a saúde da pele e para a prevenção de infeções.",
          practicalTip: "Evita usar a mesma t-shirt ou camisola vários dias seguidos se transpiraste com ela."
        }
      ],
      safetyAlert: "Sabias que transpirar é saudável? O suor ajuda a regular a temperatura do corpo. Se o teu suor de repente mudar muito de cheiro mesmo lavando-te bem, ou se tiveres manchas estranhas na pele, fala com a tua mãe ou médico.",
      frequentlyAskedQuestion: {
        q: "Todas as pessoas têm cheiro corporal diferente?",
        a: "Sim! Cada corpo tem a sua assinatura de aroma única. Não precisas de procurar cheirar a perfume artificial o dia todo, o cheiro natural de pele limpa é perfeitamente saudável e agradável."
      }
    }
  },
  {
    id: "higiene-oral",
    title: "Higiene Oral",
    shortDesc: "Como manter o sorriso brilhante e combater o mau hálito de forma simples.",
    iconName: "Smile",
    colorTheme: "cyan",
    content: {
      sectionTitle: "Sorriso Saudável e Hálito Fresco",
      introduction: "Cuidar da tua boca não serve apenas para ter dentes bonitos: evita cáries dolorosas, gengivas inchadas e garante que o teu hálito está sempre fresco para poderes conversar de perto com as tuas amigas.",
      points: [
        {
          title: "A regra de ouro da escovagem",
          desc: "Escova os dentes pelo menos 2 a 3 vezes por dia: depois do pequeno-almoço, depois do almoço e, a mais importante de todas, antes de deitares! Cada escovagem deve durar cerca de 2 minutos.",
          practicalTip: "Usa uma pasta com flúor e faz movimentos circulares suaves dos dentes em direção à gengiva. Não te esqueças de escovar suavemente a língua para remover bactérias."
        },
        {
          title: "O super-poder do fio dentário",
          desc: "A escova de dentes não consegue chegar ao espaço apertado entre os dentes. Se não limpares aí com fio dentário, acumula-se comida que apodrece e causa cáries e mau hálito.",
          practicalTip: "Usa o fio dentário uma vez por dia, preferencialmente à noite. Passa-o com cuidado para não magoares as gengivas."
        },
        {
          title: "Alimentos e o hálito",
          desc: "Comer muita pastilha elástica não cura o mau hálito crónico e o excesso de açúcar destrói o esmalte. Beber água é muito mais eficaz!",
          practicalTip: "A maçã, a cenoura e o pepino ajudam a limpar os dentes naturalmente enquanto mastigas. Evita refrigerantes e doces antes de ires dormir."
        }
      ],
      safetyAlert: "Visita o teu dentista pelo menos uma vez por ano para garantir que não tens cáries a começar. Se as tuas gengivas sangrarem quando escovas ou se sentires dor ao beber líquidos frios ou quentes, pede ajuda aos teus pais para agendarem uma consulta.",
      frequentlyAskedQuestion: {
        q: "Por que razão acordamos frequentemente com mau hálito?",
        a: "Durante a noite, produzimos muito menos saliva (que limpa a boca). Por isso, as bactérias multiplicam-se. Uma boa escovagem antes de dormir e logo a seguir a acordar resolve esse problema facilmente!"
      }
    }
  },
  {
    id: "higiene-intima",
    title: "Higiene Íntima Feminina",
    shortDesc: "A ciência da vulva e vagina: lavagem correta, corrimentos normais e sinais de alerta.",
    iconName: "Sparkles",
    colorTheme: "rose",
    content: {
      sectionTitle: "Conhecer e Proteger a tua Zona Íntima",
      introduction: "Muitas raparigas sentem vergonha de perguntar sobre a sua saúde íntima, mas compreender o próprio corpo é um direito teu! A zona íntima feminina é incrivelmente inteligente e tem mecanismos próprios de autolimpeza.",
      points: [
        {
          title: "Vagina vs. Vulva: Há uma grande diferença!",
          desc: "A vulva é a parte exterior (a que vês por fora: os grandes e pequenos lábios e o clítoris). A vagina é o canal interno. Isto é importantíssimo porque elas lavam-se de forma totalmente diferente!",
          practicalTip: "A vagina (o canal interno) NUNCA deve ser lavada! Ela limpa-se sozinha através do corrimento normal. Lavá-la internamente com duches, sabonetes ou perfumes destrói a flora saudável e provoca infeções."
        },
        {
          title: "Como lavar a vulva corretamente",
          desc: "Lava apenas a parte externa (a vulva). Usa apenas água morna corrente, ou se preferires, um gel de banho muito suave concebido para higiene íntima com pH adequado.",
          practicalTip: "Lava sempre de FRINTE para TRÁS. Isto evita que as bactérias do rabinho entrem em contacto com a uretra (canal por onde sai a urina) e com a vagina, prevenindo infeções urinárias dolorosas."
        },
        {
          title: "Corrimento vaginal: O que é normal?",
          desc: "É perfeitamente normal ter corrimento. Ele serve para manter a vagina limpa e húmida. Conforme os dias do teu ciclo menstrual, ele muda de aspeto: pode ser transparente como clara de ovo, ou esbranquiçado sem cheiro ativo.",
          practicalTip: "Roupa interior de algodão é a melhor tua escolha! Permite que a pele spira de forma natural. Evita leggings ou calças de ganga extremamente apertadas durante muitas horas consecutivas."
        }
      ],
      safetyAlert: "SINAIS DE ALERTA: Se o teu corrimento tiver um cheiro forte e desagradável, cor amarela, verde ou cinzenta, ou se sentires comichão intensa, ardor ao fazer xixi ou dor no fundo da barriga, isto NÃO é falta de higiene, é provavelmente uma pequena infeção (como candidíase, muito comum). Não sintas vergonha! Fala com a tua mãe ou médica para obteres um tratamento simples.",
      frequentlyAskedQuestion: {
        q: "Os pensos diários (pantyliners) devem ser usados todos os dias?",
        a: "Não é recomendado. Usá-los todos os dias abafa a zona íntima porque têm uma película impermeável por baixo, aumentando a humidade e o risco de alergias ou fungos. Deixa a pele respirar!"
      }
    }
  },
  {
    id: "menstruacao",
    title: "Menstruação e Ciclo",
    shortDesc: "O que é o período, como funcionam os pensos/tampões e como gerir cólicas.",
    iconName: "Calendar",
    colorTheme: "red",
    content: {
      sectionTitle: "O Teu Período e as Ciclos do teu Corpo",
      introduction: "A primeira menstruação (chamada menarca) acontece geralmente entre os 10 e os 16 anos. Significa que o teu corpo está a crescer de forma saudável e a preparar-se para o teu futuro, caso um dia queiras ter filhos. É uma mudança maravilhosa e perfeitamente natural!",
      points: [
        {
          title: "O que é afinal a menstruação?",
          desc: "Todos os meses, o útero cria uma almofada de sangue e nutrientes. Se não houver uma gravidez, o corpo liberta essa almofada. Esse sangue sai pela vagina durante alguns dias (geralmente de 3 a 7 dias).",
          practicalTip: "O fluxo de sangue parece ser enorme, mas na verdade são apenas algumas colheres de sopa distribuídas ao longo de vários dias."
        },
        {
          title: "Escolher o produto certo: Pensos, Tampões ou Copo",
          desc: "Tens várias opções seguras! Se estás a começar, os pensos higiénicos colados às cuecas são os mais fáceis e confortáveis de usar.",
          practicalTip: "Troca o penso higiénico ou tampão a cada 3 a 6 horas (mesmo que pareça vazio) para evitar comichões ou acumulação de bactérias. Lava sempre as mãos com sabão antes e depois de fazeres a troca do teu penso ou tampão."
        },
        {
          title: "Como aliviar as dores e cólicas menstruais",
          desc: "É normal sentir um ligeiro desconforto ou dor de barriga (cólicas) nos primeiros dias do período, porque o útero contrai-se suavemente.",
          practicalTip: "Coloca um saco de água quente na barriga: o calor relaxa os músculos e alivia muito a dor! Faz caminhadas leves ou bebe chá de camomila morno. Se a dor for muito forte e te impedir de ir à escola, avisa os teus encarregados de educação."
        }
      ],
      safetyAlert: "Dica de Preparação: Anda sempre com um estojo discreto na mochila com um penso higiénico de reserva e umas cuequinhas limpas. Se o teu período vier de repente na escola, não tenhas vergonha! Podes pedir ajuda à tua professora, funcionária ou enfermeira da escola.",
      frequentlyAskedQuestion: {
        q: "O período menstrual deve vir sempre no mesmo dia?",
        a: "Nos primeiros 2 anos após a primeira menstruação, o ciclo é frequentemente muito irregular! Pode vir num mês, falhar dois meses e voltar e isso é normal, pois o teu corpo ainda está a regular o teu sistema hormonal."
      }
    }
  },
  {
    id: "pele-borbulhas",
    title: "Pele e Borbulhas (Acne)",
    shortDesc: "Rotina simples de limpeza facial: limpar, hidratar e proteger sem agredir.",
    iconName: "User",
    colorTheme: "amber",
    content: {
      sectionTitle: "Cuidar da tua Pele com Suavidade",
      introduction: "Com as hormonas da puberdade, os poros da pele do teu rosto produzem mais sebo. É muito comum aparecerem as famosas borbulhas ou pontos negros (acne). Lembra-te: ter borbulhas não te torna menos bonita ou menos limpa!",
      points: [
        {
          title: "A rotina facial minimalista e segura",
          desc: "Não precisas de gastar dinheiro em dezenas de cremes ou ácidos agressivos de 'TikTok'. A tua pele jovem precisa apenas de três passos básicos diários.",
          practicalTip: "Passo 1: Lavar o rosto de manhã e à noite com água morna e um gel de limpeza suave para pele acneica. Passo 2: Aplicar um creme hidratante leve e não-comedogénico (que não entope os poros). Passo 3: Usar protetor solar facial de manhã."
        },
        {
          title: "A regra sagrada: Nunca Espremer!",
          desc: "Pode ser tentador espremer uma borbulha, mas ao fazê-lo empurras a infeção mais para dentro da pele e aumentas a inflamação, além de deixares marcas e cicatrizes para sempre.",
          practicalTip: "Se tiveres uma borbulha muito inflamada, podes colocar uma gota de gel secante suave próprio ou colocar um pequeno adesivo protetor (patch) para evitar tocar-lhe."
        },
        {
          title: "Cuidado com o desperdício e modas de internet",
          desc: "Muitos vídeos mostram raparigas a usar ácidos potentes (ácido glicólico, retinol, etc.) recomendados para peles maduras. Na tua idade, o uso de químicos agressivos destrói a barreira natural da tua pele sensível.",
          practicalTip: "Mantém as coisas simples. O teu rosto agradece sabão suave, hidratação equilibrada e água limpa!"
        }
      ],
      safetyAlert: "Se as tuas borbulhas forem muito numerosas, dolorosas, inflamadas e afetarem a tua autoestima, fala com os teus pais sobre ir a uma consulta de Dermatologia. Um dermatologista pode receitar pomadas terapêuticas seguras.",
      frequentlyAskedQuestion: {
        q: "Comer chocolate causa borbulhas?",
        a: "O chocolate em si não é um vilão direto, mas uma alimentação muito rica em açúcares refinados e gorduras saturadas pode aumentar a inflamação de todo o corpo, o que por vezes piora a acne. Comer equilibrado ajuda a tua pele!"
      }
    }
  },
  {
    id: "cabelo",
    title: "Cuidados com o Cabelo",
    shortDesc: "Lavagem sem excesso de químicos e como manter o couro cabeludo saudável.",
    iconName: "Sparkles",
    colorTheme: "indigo",
    content: {
      sectionTitle: "Cabelo Forte e Couro Cabeludo Saudável",
      introduction: "O teu cabelo reflete o teu bem-estar. Não precisas de transformá-lo com tratamentos intensos de salão ou de o submeter a temperaturas super altas todos os dias para que ele seja bonito e saudável.",
      points: [
        {
          title: "Como e quando lavar corretamente",
          desc: "A frequência depende do teu tipo de cabelo. Cabelos mais oleosos podem precisar de lavagem dia sim, dia não. Cabelos caracóis ou secos podem ser lavados apenas duas vezes por semana.",
          practicalTip: "Massaja suavemente o champô apenas no couro cabeludo com a polpa dos dedos (nunca esfregues com as unhas para não ferir). Deixa a espuma escorrer pelo comprimento do cabelo sem esfregar as pontas."
        },
        {
          title: "Condicionador e Máscaras sem exageros",
          desc: "O condicionador serve para fechar as cutículas do cabelo e dar brilho. Deve ser aplicado apenas do meio do cabelo até às pontas.",
          practicalTip: "NUNCA apliques condicionador ou máscaras diretamente na raiz do cabelo para evitar caspa intensa e oleosidade excessiva."
        },
        {
          title: "Cuidado com os alisamentos e químicos fortes",
          desc: "Os alisamentos químicos de longa duração, descolorações completas ou tintas contêm ingredientes abrasivos que podem queimar o couro cabeludo sensível ou danificar a fibra capilar de forma permanente na tua fase de crescimento.",
          practicalTip: "Se gostas de secar o cabelo com secador ou usar prancha alisadora, aplica sempre um protetor térmico antes e evita a temperatura máxima."
        }
      ],
      safetyAlert: "SINAIS DE ALERTA: Se sentires coceira extrema contínua, queda de cabelo muito acentuada com zonas peladas, feridas ou caspa que descama com aspeto de crosta amarela, deves consultar um médico para verificar a saúde do teu couro cabeludo.",
      frequentlyAskedQuestion: {
        q: "Cortar as pontas regularmente faz o cabelo crescer mais depressa?",
        a: "Não acelera o crescimento direto na raiz (que cresce cerca de 1 cm por mês), mas remove as pontas espigadas e frágeis, evitando que o cabelo parta e fazendo com que ele pareça mais cheio, saudável e longo!"
      }
    }
  },
  {
    id: "piolhos",
    title: "Prevenção de Piolhos",
    shortDesc: "Tudo sobre piolhos: como se apanham, como tratar e como desmistificar a vergonha.",
    iconName: "ShieldAlert",
    colorTheme: "slate",
    content: {
      sectionTitle: "Piolhos: Sem dramas nem vergonhas!",
      introduction: "Os piolhos são pequenos insetos que andam no couro cabeludo. Quase todas as crianças ou adolescentes apanham piolhos em alguma altura do seu percurso escolar. Ter piolhos NÃO é sinal de falta de higiene — pelo contrário, eles adoram cabelos muito limpos!",
      points: [
        {
          title: "Como se apanham e como prevenir",
          desc: "Os piolhos não voam nem saltam! Eles passam de cabeça para cabeça através do contacto direto de cabelos ou ao partilhar acessórios.",
          practicalTip: "Evita partilhar escovas, escovados, ganchos de cabelo, elásticos, bonés ou almofadas na escola. Se tiveres o cabelo comprido, levá-lo apanhado (em trança ou rabo de cavalo) nos dias de alerta de piolhos ajuda imenso a prevenir."
        },
        {
          title: "O Pente Fino e a verificação regular",
          desc: "O método mais eficaz para encontrar e eliminar piolhos e lêndeas (os ovos brancos que parecem caspa mas ficam colados ao fio de cabelo) é o uso de um pente fino metálico.",
          practicalTip: "Passa o pente fino no cabelo molhado da raiz até às pontas, secção por secção, limpando o pente após cada passagem numa folha de papel de cozinha branca para ver se saem piolhos."
        },
        {
          title: "Como tratar de forma eficaz",
          desc: "Se detetares piolhos, não uses mezinhas caseiras perigosas (como vinagre puro quente ou álcool). Pede aos teus pais para irem contigo à farmácia comprar um champô ou loção com silicone específico antipiolhos.",
          practicalTip: "Após fazer o tratamento, lave as vossas roupas, lençóis e fronhas de almofada a pelo menos 60 graus na máquina de lavar para garantir que não sobram parasitas ou lêndeas."
        }
      ],
      safetyAlert: "Avisar os amigos é um ato de coragem e amizade! Se tiveres piolhos, diz às tuas amigas mais próximas com quem estiveste para que elas também possam passar o pente fino. Não há qualquer motivo para ter vergonha.",
      frequentlyAskedQuestion: {
        q: "Os piolhos preferem cabelos sujos?",
        a: "É um mito absoluto! Os piolhos preferem e agarram-se melhor em cabelos perfeitamente limpos e sedosos. Qualquer pessoa pode apanhá-los, independentemente do estilo de vida."
      }
    }
  },
  {
    id: "alimentacao-pequeno-almoco",
    title: "Alimentação e Nutrição",
    shortDesc: "Ideias de pequenos-almoços saudáveis e a importância de nutrir o teu corpo.",
    iconName: "Apple",
    colorTheme: "emerald",
    content: {
      sectionTitle: "Nutrir o Corpo para Ter Energia",
      introduction: "O teu corpo está a passar por um crescimento físico acelerado e a tua mente está cheia de novos conhecimentos escolares. Para dares conta de tudo, precisas de boa energia e hidratação. Cuidar de ti é alimentar-te sem obsessões e sem dietas perigosas.",
      points: [
        {
          title: "O poder do pequeno-almoço nutritivo",
          desc: "Sair de casa sem comer de manhã faz com que te sintas cansada, com dores de cabeça, tonturas e sem concentração nas primeiras aulas. Um bom pequeno-almoço deve dar-te hidratos de carbono complexos (energia), fibras e proteínas.",
          practicalTip: "Aqui tens ideias rápidas e fantásticas:\n1. Papas de aveia feitas com leite ou bebida vegetal, fatias de banana e canela.\n2. Iogurte natural com aveia, maçã aos pedacinhos e nozes.\n3. Uma fatia de pão integral com ovo mexido ou queijo fresco e uma peça de fruta fresca."
        },
        {
          title: "Água: O teu motor diário",
          desc: "Muitas vezes, a sensação de cansaço ou dores de cabeça é apenas o teu corpo a pedir água! Beber água melhora a tua pele, a digestão, o sono e a concentração.",
          practicalTip: "Leva sempre uma garrafa de água reutilizável para a escola e bebe pequenos golos ao longo do dia, sem esperares a ter muita sede."
        },
        {
          title: "O perigo das dietas extremas de internet",
          desc: "Há imensos perfis de redes sociais a incentivar dietas restritivas, jejuns ou 'shakes' substitutos de refeição. Dietas radicais na adolescência podem parar o teu crescimento saudável, causar queda de cabelo, anemia severa e perturbações alimentares perigosas.",
          practicalTip: "Comer bem significa comer variado: vegetais, fruta, leguminosas, proteínas saudáveis. Não elimines grupos de comida sem indicação de um nutricionista."
        }
      ],
      safetyAlert: "Se sentires que estás demasiado ansiosa com o teu peso, se te sentires culpada por comer ou se tiveres o impulso de saltar refeições constantemente para emagrecer, por favor conversa com um adulto em quem confies ou com o psicólogo da tua escola. O teu corpo é único e merece ser respeitado.",
      frequentlyAskedQuestion: {
        q: "O açúcar dá energia verdadeira?",
        a: "Os açúcares refinados (refrigerantes, pacotes de bolachas, doces) dão um pico rápido de energia seguido de uma quebra ainda maior que te deixa exausta. Prefere o açúcar natural da fruta (frutose) que vem acompanhado de vitaminas e de fibra sustentável!"
      }
    }
  },
  {
    id: "substancias-riscos",
    title: "Drogas, Álcool e Vaping",
    shortDesc: "Como lidar com a pressão e o que acontece no teu cérebro em crescimento.",
    iconName: "Skull",
    colorTheme: "amber",
    content: {
      sectionTitle: "Dizer Sim ao teu Cérebro e Não aos Riscos",
      introduction: "À medida que crescemos, a pressão social para experimentar novas sensações aumenta. Podes ver amigos mais velhos a fumar vaping, a beber álcool ou a falar de drogas. Saber os factos científicos reais dá-te o superpoder de decidir de forma livre e segura.",
      points: [
        {
          title: "O Mito do Vaping Saudável",
          desc: "Os cigarros eletrónicos (vapes/vaping) parecem inofensivos e cheiram a fruta, mas a maioria contém altas doses de nicotina altamente viciante e micropartículas químicas que inflamam as células dos teus pulmões.",
          practicalTip: "Muitos vapes são criados especificamente com cores coloridas para atrair jovens, gerando dependência rápida de substâncias. Os pulmões foram feitos apenas para respirar ar puro!"
        },
        {
          title: "O Cérebro em Construção",
          desc: "Até aos 25 anos, o teu cérebro ainda se está a esculpir e a criar conexões definitivas. Consumir álcool em excesso ou outras drogas prejudica permanentemente as áreas responsáveis pela tua memória, foco e equilíbrio emocional.",
          practicalTip: "A dependência de substâncias desenvolve-se muito mais rápido e de forma mais profunda na adolescência do que na idade adulta."
        },
        {
          title: "Como dizer 'NÃO' com firmeza e estilo",
          desc: "Às vezes, temos medo de parecer 'totós' ou sermos excluídas do grupo se recusarmos uma oferta.",
          practicalTip: "Usa frases simples, simpáticas e firmes que encerram o assunto no momento:\n- 'Não, obrigada, não gosto do cheiro disso.'\n- 'Agora não posso, tenho treino/estudo amanhã de manhã cedinho.'\n- 'Se fumar isso fico com uma tosse terrível, dispenso!'\n- 'Não me sinto confortável com isso.' Se insistirem, afasta-te e procura amigos que respeitem o teu espaço."
        }
      ],
      safetyAlert: "Pedir ajuda quando te vês numa situação que saiu do controlo (ex: um amigo que bebeu demasiado ou tu própria se consumiste algo e te sentes mal) é sinal de grande maturidade e inteligência. Liga para o 112 ou contacta de imediato os teus pais ou um adulto responsável.",
      frequentlyAskedQuestion: {
        q: "O álcool em pequenas quantidades com amigos faz mal?",
        a: "Na tua idade, o fígado e o cérebro ainda não estão prontos para processar o álcool. É fácil perder o controlo da dosagem em ambiente de grupo, o que pode levar a decisões de que te vais arrepender ou a acidentes graves."
      }
    }
  },
  {
    id: "sexualidade-consentimento",
    title: "Sexualidade e Consentimento",
    shortDesc: "O que é o consentimento focado, proteção e como saber os limites do carinho.",
    iconName: "Heart",
    colorTheme: "purple",
    content: {
      sectionTitle: "Afeto, Respeito e Autonomia",
      introduction: "A sexualidade faz parte da vida humana, mas o momento em que escolhes iniciar ou não qualquer contacto físico é exclusivamente TEU! Ninguém — quer seja namorado, amigo ou colega — te pode forçar, apressar ou chantagear para fazer algo que não queiras.",
      points: [
        {
          title: "O que significa Consentimento Real?",
          desc: "Consentimento é um 'SIM' livre, informado, entusiasta e que pode ser retirado a qualquer momento! Dizer 'não sei', ficar em silêncio ou aceitar por medo de ser abandonada NÃO é consentimento.",
          practicalTip: "O consentimento deve ser mútuo. Se a outra pessoa hesitar, parecer desconfortável ou confusa, o carinho deve parar IMEDIATAMENTE. O respeito é a maior prova de amor."
        },
        {
          title: "Carinho vs. Pressão sexual e Abuso",
          desc: "Diferencia o afeto genuíno do controlo. Mensagens constantes exigindo provas de afeição, piadas humilhantes ou insistência após teres dito não constituem formas de violência ou pressão psicológica.",
          practicalTip: "O teu corpo pertence-te apenas a ti. Se alguém te tocar de uma forma que te faça sentir desconfortável, confusa ou assustada, deves afastar-te logo e contar a um adulto em quem confies totalmente (mãe, professora, psicóloga)."
        },
        {
          title: "A regra de ouro sobre as fotografias íntimas (Nudes)",
          desc: "NUNCA envies fotografias do teu corpo despida ou em poses íntimas pela internet ou por mensagens, MESMO que confies plenamente no teu namorado naquele momento.",
          practicalTip: "As relações podem acabar, mas as imagens digitais duram para sempre e são facilmente partilhadas com terceiros. A partilha de fotos íntimas de menores sem autorização é um crime grave punido por lei. Se fores vítima de chantagem, não te culpes e pede ajuda imediatamente a um adulto!"
        },
        {
          title: "Proteção e Conhecimento Básico",
          desc: "Para quando decidires iniciar a tua vida sexual no futuro ou mais tarde, usa sempre preservativo! O preservativo é o único método que protege simultaneamente de uma gravidez indesejada e de Infeções Sexualmente Transmissíveis (IST).",
          practicalTip: "Podes obter preservativos gratuitos em qualquer Centro de Saúde de Portugal nos Serviços de Planeamento Familiar ou Apoio ao Jovem."
        }
      ],
      safetyAlert: "Se acontecer alguma coisa que te pareça errada ou se tiveres dúvidas sobre o teu corpo ou relações, podes recorrer à Associação Planeamento Familiar (APF) ou ao portal Sexualidade em Linha (800 222 444), um serviço anónimo, confidencial e gratuito para jovens em Portugal.",
      frequentlyAskedQuestion: {
        q: "É verdade que todas as raparigas da minha idade já namoram ou fazem coisas íntimas?",
        a: "Não! Nas redes sociais e na televisão parece que toda a gente tem pressa, mas a maioria dos jovens na tua faixa etária prefere focar-se em amizades, hobbies e estudos. Cada pessoa tem o seu próprio tempo, respeita o teu ritmo!"
      }
    }
  },
  {
    id: "seguranca-pessoal",
    title: "Segurança Pessoal",
    shortDesc: "Regras vitais para andares na rua, regressar a casa e como usar o Modo Emergência.",
    iconName: "Shield",
    colorTheme: "red",
    content: {
      sectionTitle: "Andar Segura e Confiar no teu Instinto",
      introduction: "Ser independente, sair com amigas e usar transportes públicos são passadas normais e divertidas do teu crescimento. No entanto, é muito inteligente adotares hábitos simples que te mantenham em total segurança no teu dia a dia.",
      points: [
        {
          title: "Avisar sempre onde e com quem estás",
          desc: "Fazer os teus pais ou tutores saberem onde te encontras não é perder a tua liberdade: é criar uma rede de segurança vital caso aconteça algum imprevisto (como perderes o autocarro ou ficares sem bateria).",
          practicalTip: "Manda uma mensagem simples quando chegares ao destino e quando estiveres a iniciar o caminho de regresso a casa."
        },
        {
          title: "Proteger as tuas boleias e caminhos",
          desc: "NUNCA aceites boleias de pessoas que não conheces, e tem extremo cuidado com convites de conhecidos recentes se envolverem locais isolados ou se notares comportamentos estranhos.",
          practicalTip: "Se tiveres de regressar de noite, escolhe caminhos bem iluminados e movimentados. Evita andar na rua a olhar fixamente para o telemóvel ou com auscultadores com o som no máximo para manteres a tua atenção ao ambiente."
        },
        {
          title: "A Técnica da Palavra-Passe Secreta",
          desc: "Combina com a tua mãe, pai ou um adulto de extrema confiança uma 'palavra de código' por mensagem (ex: 'Deixei o livro de história na escola' ou 'Estrela').",
          practicalTip: "Se estiveres num local ou festa onde te sintas insegura, desconfortável ou sob pressão e queiras sair sem levantar suspeitas das tuas colegas, envia essa palavra de código. Os teus pais saberão imediatamente que deves ser resgatada e ligarão com um pretexto credível para te irem buscar!"
        }
      ],
      safetyAlert: "COMO AGIR SE SEGUIREM OU CHATEAREM: Se alguém te estiver a importunar ou a seguir na rua, entra imediatamente no primeiro espaço público aberto com adultos (uma loja, café, pastelaria, escola ou esquadra de polícia). Vai direta ao balcão e diz claramente: 'Aquele senhor está a seguir-me, preciso de ajuda e de ligar aos meus pais'.",
      frequentlyAskedQuestion: {
        q: "O meu instinto de que algo está errado é confiável?",
        a: "Absolutamente! Se a tua barriga disparar um sinal de desconforto de que a situação parece estranha ou perigosa, confia SEMPRE nesse instinto. É preferível pareceres exagerada ou antipática e estares em segurança do que arriscares!"
      }
    }
  },
  {
    id: "relacoes-pressao",
    title: "Amizades e Relações",
    shortDesc: "Como identificar amizades saudáveis, namoros controladores e bullying de internet.",
    iconName: "Users",
    colorTheme: "violet",
    content: {
      sectionTitle: "Amizades Verdadeiras e Namoros com Respeito",
      introduction: "As amizades e os primeiros namoros trazem mil cores novas à nossa vida escolar. Contudo, é muito importante que essas relações te tragam felicidade, apoio mútuo e autoconfiança, e nunca medo, controlo ou tristeza crónica.",
      points: [
        {
          title: "Amizades Saudáveis vs. Manipuladoras",
          desc: "Um amigo verdadeiro apoia os teus sonhos, celebra os teus sucessos e aceita-te exatamente como és.",
          practicalTip: "Se uma amiga te exige exclusividade total ('se falas com ela não és minha amiga'), espalha boatos ou segredos teus quando se zanga, ou te humilha em público com o pretexto de ser uma 'brincadeira', isso é uma amizade controladora e tóxica. Tu mereces melhor!"
        },
        {
          title: "Sinais de Controlo no Namoro",
          desc: "O ciúme excessivo NÃO é prova de amor: é sinal de insegurança e desejo de posse. Ninguém tem o direito de controlar a tua vida.",
          practicalTip: "Diz não ao controlo se o teu namorado exigir as tuas palavras-passe das redes sociais, ler as tuas mensagens, controlar a roupa que usas, exigir fotos tuas constantes para ver com quem estás ou proibir-te de estar com os teus amigos de sempre."
        },
        {
          title: "Combater o Cyberbullying",
          desc: "As redes sociais servem para ligar pessoas, mas por vezes são usadas por pessoas cobardes para insultar, expor ou fazer comentários de ódio anónimos.",
          practicalTip: "Nunca respondas a provocações ou insultos online (alimenta o agressor). Tira capturas de ecrã (prints) como prova, bloqueia o perfil agressor imediatamente e reporta a situação aos teus pais, professores ou no site do Ministério Público ou da APAV."
        }
      ],
      safetyAlert: "Se te sentires assustada, triste, se a tua autoconfiança estiver a desaparecer por causa de alguém ou se sentires medo do comportamento do teu namorado ou de amigos, não te isoles! Conversar com os teus pais ou com o psicólogo escolar é o primeiro passo para recuperar o teu sorriso.",
      frequentlyAskedQuestion: {
        q: "Como pedir desculpa se magoei alguém sem querer no grupo?",
        a: "Dizer 'desculpa, não era a minha intenção magoar-te e vou ter mais atenção no futuro' de forma honesta mostra que és responsável pelas tuas ações e fortalece muito as amizades saudáveis clássicas."
      }
    }
  }
];
