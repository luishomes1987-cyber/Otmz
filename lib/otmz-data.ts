export type DivisionId = 'otmz' | 'zonewars' | 'esports'

export const DISCORD_URL = 'https://discord.gg/otmzzwrs'

/** Link oficial de donativos (SumUp). */
export const DONATE_URL = 'https://pay.sumup.com/b2c/QS2CJRO0'

/** Meta exibida no canto superior esquerdo de cada aba/página. */
export const divisionMeta: Record<
  DivisionId,
  { label: string; createdAt: string }
> = {
  otmz: { label: 'OTMZ', createdAt: 'Maio 2025' },
  zonewars: { label: 'OTMZ Customs', createdAt: 'Março 2026' },
  esports: { label: 'OTMZ Esports', createdAt: 'Abril 2026' },
}

/** Código de apoiador exibido no banner animado global. */
export const SUPPORT_CODE = 'CCAMACHO27'

/** Email oficial para candidaturas de content creators. */
export const OTMZ_EMAIL = 'otmz@proton.me'

/** Redes sociais oficiais da OTMZ. */
export const socials: { id: 'x' | 'tiktok'; label: string; url: string }[] = [
  { id: 'x', label: 'X (Twitter)', url: 'https://x.com/otmzesports?s=21' },
  {
    id: 'tiktok',
    label: 'TikTok',
    url: 'https://www.tiktok.com/@otmzesports?is_from_webapp=1&sender_device=pc',
  },
]

export const divisions: {
  id: DivisionId
  label: string
  short: string
  tagline: string
  image: string
}[] = [
  {
    id: 'otmz',
    label: 'OTMZ',
    short: 'OTMZ',
    tagline: 'Performance',
    image: '/divisions/otmz.png',
  },
  {
    id: 'zonewars',
    label: 'OTMZ Customs',
    short: 'Customs',
    tagline: 'Competição',
    image: '/divisions/zonewars.png',
  },
  {
    id: 'esports',
    label: 'OTMZ Esports',
    short: 'Esports',
    tagline: 'Organização',
    image: '/divisions/esports.png',
  },
]

/** Retorna a imagem correspondente à divisão/aba ativa. */
export function getDivisionImage(id: DivisionId): string {
  return divisions.find((d) => d.id === id)?.image ?? '/divisions/otmz.png'
}

/* ─────────────── OTMZ · Serviços de otimização ─────────────── */

export type Service = {
  title: string
  short: string
  description: string
  icon:
    | 'windows'
    | 'mouse'
    | 'fortnite'
    | 'valorant'
    | 'cs2'
    | 'gauge'
    | 'nvidia'
    | 'amd'
    | 'bios'
    | 'trash'
    | 'fps'
    | 'latency'
    | 'wifi'
    | 'driver'
    | 'package'
}

export const services: Service[] = [
  {
    title: 'Otimização do Windows',
    short: 'Sistema limpo e responsivo',
    description:
      'Reconfiguração completa do Windows para gaming: serviços, agendadores, energia, memória e prioridades ajustados para eliminar micro-stutters e maximizar a estabilidade.',
    icon: 'windows',
  },
  {
    title: 'Redução de Input Lag',
    short: 'Resposta instantânea',
    description:
      'Ajustes de pipeline de renderização, polling do rato e buffers para reduzir o input lag ao mínimo absoluto. Cada clique regista no momento exato.',
    icon: 'mouse',
  },
  {
    title: 'Otimização para Fortnite',
    short: 'Mais FPS, menos delay',
    description:
      'Config focada em Fortnite competitivo: FPS estável, hardware acceleration, DirectX e settings de rede afinados para ranked, scrims e ZoneWars.',
    icon: 'fortnite',
  },
  {
    title: 'Tweaks de Performance',
    short: 'Cada ms conta',
    description:
      'Conjunto avançado de tweaks de registo, kernel e timers para extrair desempenho real sem comprometer a estabilidade do sistema.',
    icon: 'gauge',
  },
  {
    title: 'Configuração da NVIDIA',
    short: 'Control Panel afinado',
    description:
      'NVIDIA Control Panel e NVIDIA App configurados para latência mínima: Low Latency Mode, Reflex, gestão de energia e cor.',
    icon: 'nvidia',
  },
  {
    title: 'Configuração AMD',
    short: 'Radeon otimizado',
    description:
      'Adrenalin Software configurado ao detalhe: Anti-Lag, Radeon Chill, perfis por jogo e gestão térmica inteligente.',
    icon: 'amd',
  },
  {
    title: 'BIOS Optimization',
    short: 'Base do sistema',
    description:
      'Otimização de BIOS/UEFI: XMP/EXPO, Resizable BAR, C-States, gestão de energia e configurações de CPU para performance máxima.',
    icon: 'bios',
  },
  {
    title: 'Debloat Windows',
    short: 'Sem peso morto',
    description:
      'Remoção segura de bloatware, telemetria e processos em segundo plano que consomem recursos, mantendo o sistema 100% funcional.',
    icon: 'trash',
  },
  {
    title: 'FPS Boost',
    short: 'Frames desbloqueados',
    description:
      'Pacote de otimizações focado exclusivamente em aumentar e estabilizar os FPS nos teus jogos favoritos.',
    icon: 'fps',
  },
  {
    title: 'Redução de Latência',
    short: 'Ping mais baixo',
    description:
      'Otimização de rede a nível de sistema para reduzir latência, jitter e packet loss em jogos online competitivos.',
    icon: 'latency',
  },
  {
    title: 'Configuração de Internet',
    short: 'Ligação estável',
    description:
      'Ajuste de DNS, MTU, TCP/IP e QoS para uma ligação mais rápida e estável, ideal para jogo online sem picos.',
    icon: 'wifi',
  },
  {
    title: 'Configuração de Drivers',
    short: 'Sempre atualizado',
    description:
      'Instalação limpa (DDU) e configuração de drivers de GPU, chipset e periféricos para máxima compatibilidade e desempenho.',
    icon: 'driver',
  },
  {
    title: 'Packs Premium de Otimização',
    short: 'Tudo num só serviço',
    description:
      'Pacotes completos que combinam todos os serviços num processo único, guiado e personalizado ao teu hardware.',
    icon: 'package',
  },
]

export type Pack = {
  name: string
  tier: string
  price: string
  priceNote?: string
  highlight?: boolean
  badge?: string
  features: string[]
  note?: string
}

export const packs: Pack[] = [
  {
    name: 'Limpeza de PC',
    tier: 'Tier 0 — Opcional',
    price: '2€',
    priceNote: 'ou Server Boost',
    features: [
      'Limpeza de ficheiros temporários',
      'Cache e lixo do sistema',
      'Melhora a fluidez e velocidade do PC',
    ],
    note: 'Serviço rápido e simples',
  },
  {
    name: 'OTM Pack — Performance',
    tier: 'Tier 1 — Mais Popular',
    price: '15€',
    highlight: true,
    badge: 'Recomendado',
    features: [
      'Remoção de power savings',
      'Ajustes avançados de RAM',
      'Otimização de VRM, CPU e memória',
      'Redução de stutters, lag e input delay',
      '0 Delay & Input Boost',
      'Internet tweaks — ping mais baixo',
    ],
    note: 'Recomendado formatar antes',
  },
  {
    name: 'OTM Pack — Extremo',
    tier: 'Tier 2 — Premium',
    price: '40€',
    badge: 'Máximo desempenho',
    features: [
      'Tudo do pack Performance',
      'Bios Tweak',
      'Windows personalizado',
      'Pen USB mín. 12GB necessária',
      'CPU & GPU Overclock',
      'Tweaks avançados para FPS máximo',
      'Melhor estabilidade competitiva',
    ],
    note: 'Pack completo',
  },
]

/* ─────────────── OTMZ Customs · Sistema de atividade ─────────────── */

/** Fluxo simples do sistema de atividade — tudo gerido pelo Yunite Bot. */
export const activitySteps: {
  step: string
  title: string
  text: string
}[] = [
  {
    step: '01',
    title: 'Joga',
    text: 'Entra nas customs e ZoneWars diretamente pelo Discord. As partidas são geridas automaticamente pelo Yunite Bot — sem códigos manuais.',
  },
  {
    step: '02',
    title: 'Ganha',
    text: 'Compete, sobe no leaderboard e acumula pontos com base nas tuas vitórias e no teu desempenho em cada partida.',
  },
  {
    step: '03',
    title: 'Reclama o teu prémio',
    text: 'Quando atingires os requisitos, o Yunite Bot regista a tua atividade e reclamas o prémio de forma simples e transparente.',
  },
]

/** Aviso de elegibilidade do sistema de atividade. */
export const activityWarning =
  'Jogadores que participem com jogadores banidos poderão perder a elegibilidade para prémios. Joga sempre com fair play.'

/** Destaque de prémios distribuídos nos Customs. */
export const customsPrize = { value: 1000, label: 'distribuídos pelos vencedores' }

/* ─────────────── OTMZ Esports · Kits ─────────────── */

export type Kit = {
  name: string
  subtitle: string
  image: string
  outOfStock?: boolean
}

export const kits: Kit[] = [
  {
    name: 'Kit Dark',
    subtitle: 'Edição Preta',
    image: '/kits/kit-dark.png',
    outOfStock: true,
  },
  {
    name: 'Kit Light',
    subtitle: 'Edição Branca',
    image: '/kits/kit-light.png',
    outOfStock: true,
  },
]

/* ─────────────── OTMZ Esports · Recrutamento ─────────────── */

export type TeamRequirement = {
  game: 'Fortnite' | 'Rocket League'
  icon: 'fortnite' | 'rocket'
  requirements: string[]
}

export const teamRequirements: TeamRequirement[] = [
  {
    game: 'Fortnite',
    icon: 'fortnite',
    requirements: ['Divisão 3 ou superior', 'Mais de 500 PR na Europa'],
  },
  {
    game: 'Rocket League',
    icon: 'rocket',
    requirements: ['GC1 no mínimo'],
  },
]

/** Requisitos da candidatura de Content Creator (enviada por email). */
export const creatorRequirements: string[] = [
  'Redes sociais',
  'Média de visualizações',
  'Média de viewers em lives',
  'Prints comprovativos',
]

/* ─────────────── Regras ─────────────── */

/**
 * Uma regra pode ter sub-itens (ex.: tipos de loot proibido).
 * Usa **texto** para destacar palavras (renderizado a bold pela UI).
 */
export type Rule = { text: string; items?: string[] }

/** Regra dos Tokens — token = partida a dinheiro (wager) com Middle Man. */
export const tokenRules: Rule[] = [
  { text: 'O token só começa quando o **Middle Man** der start.' },
  {
    text: 'Após o start, todas as equipas têm **5 minutos** para estar no lobby e dar ready. Se uma equipa não aparecer dentro do tempo, perde automaticamente.',
  },
  { text: 'As opções **ZoneWars** e **CompMode** têm de estar ativadas.' },
  { text: 'O mapa é à escolha das equipas.' },
  {
    text: 'Não é permitido apanhar qualquer loot do mapa, incluindo:',
    items: [
      'Baús',
      'Caixas de munições',
      'Barris de shield',
      'Qualquer loot fora do loadout inicial',
    ],
  },
  {
    text: 'Não é permitido trocar de equipa a meio de um token, exceto se a outra equipa aceitar.',
  },
  {
    text: 'Não podem abrir ticket para o Middle Man sem o consentimento da outra equipa.',
  },
  { text: 'Todas as informações devem ser acordadas antes do start.' },
  {
    text: 'A ronda não é válida se algum adversário não se mexer nos primeiros **5 segundos**.',
  },
  {
    text: 'Caso abras ticket para Middle Man e não jogues, não respondas ou não pagues, és **punido**.',
  },
]

/** Middle-Man — garantia contra roubos nas partidas a dinheiro. */
export const middleManRules: Rule[] = [
  { text: 'Para ter Middle Man, o token tem de ser no mínimo **0,20€ each**.' },
  {
    text: 'As taxas do Middle Man são de **10%**. Para membros **VIP** a taxa é de **5%**.',
  },
  {
    text: 'Se quiserem ter Middle Man para garantir que não são roubados, abram **ticket**.',
  },
]

/** Regras gerais do servidor. */
export const serverRules: Rule[] = [
  { text: 'Proibido enviar links, divulgar ou fazer spam/flood.' },
  { text: 'Respeita todos os membros e staff.' },
  {
    text: 'Cheats, manipulação de resultados ou qualquer tipo de vantagem injusta = **BAN**.',
  },
  { text: 'Jogar com um jogador banido = **BAN**.' },
  {
    text: 'Todos os benefícios (Boosts, **VIP**, etc.) devem estar ativos antes do início do evento.',
  },
  {
    text: 'Para participar nos eventos é obrigatório apoiar o código **CCAMACHO27** na loja.',
  },
  { text: 'É obrigatório ter a tag **OTMZ** no perfil do Discord.' },
  {
    text: 'Todas as prints/provas enviadas devem mostrar o horário da captura, caso contrário não serão aceites.',
  },
  { text: 'Divulgação de códigos = **BAN**.' },
  {
    text: 'O incumprimento de qualquer regra poderá resultar em **mute, kick ou banimento**.',
  },
]

/** Regras específicas do Zone Wars. */
export const zoneWarsRules: Rule[] = [
  { text: 'A ronda só vale se começar com **25+ jogadores**.' },
  { text: 'Team = **BAN**.' },
  { text: 'Jogadores em Anónimo não recebem prémio.' },
  { text: 'Não podes usar **Simple Edit**.' },
  { text: 'Tens de estar no lobby de voz.' },
  { text: 'Votar e não participar = **BAN**.' },
  { text: 'Lê as regras antes de participar.' },
  {
    text: 'Para receber prémios, as prints enviadas nos tickets devem mostrar o código **CCAMACHO27** ativo na loja e o horário atual do dia, caso contrário não serão aceites.',
  },
]

/* ─────────────── Estatísticas · OTMZ (otimização) ─────────────── */

export const otmzStats: { value: number; suffix: string; label: string }[] = [
  { value: 100, suffix: '+', label: 'Clientes satisfeitos' },
  { value: 250, suffix: '+', label: 'Computadores otimizados' },
  { value: 99, suffix: '%', label: 'Taxa de satisfação' },
]

/** Escala de FPS antes vs depois da otimização. */
export const fpsBoost = { from: 240, to: 500 }

/* ─────────────── Contadores animados do Hero (OTMZ) ─────────────── */

/** Sequência de FPS que sobe até parecer praticamente infinita. */
export const fpsSequence = [2_000, 10_000, 50_000, 100_000, 500_000, 999_999]

/** Input delay a diminuir até 0ms. */
export const inputDelaySequence = [35, 20, 10, 5, 1, 0]

/** Processos do Windows a reduzir de 250 até 140. */
export const processCounter = { from: 250, to: 140 }

/* ─────────────── Destaques · OTMZ Customs (ZoneWars) ─────────────── */

export const zonewarsHighlights: {
  icon: 'trophy' | 'server' | 'crown' | 'users'
  title: string
  text: string
}[] = [
  {
    icon: 'trophy',
    title: 'As melhores scrims pagas de Portugal',
    text: 'Scrims premium com prémios reais, organizadas ao detalhe para o nível competitivo mais alto do país.',
  },
  {
    icon: 'server',
    title: 'O maior servidor',
    text: 'O maior servidor competitivo de Fortnite em Portugal — ativo todos os dias, com customs e ZoneWars sem parar.',
  },
  {
    icon: 'users',
    title: 'A maior comunidade',
    text: 'Milhares de jogadores competitivos reunidos no mesmo sítio, do casual ao topo do ranked.',
  },
  {
    icon: 'crown',
    title: 'Quase todos os prós PT',
    text: 'Joga lado a lado com quase todos os jogadores profissionais portugueses de Fortnite.',
  },
]

/* ─────────────── Estatísticas · OTMZ Esports ─────────────── */

/** Elenco oficial da OTMZ Esports. */
export type PlayerSocial = {
  type: 'tiktok' | 'x' | 'tracker'
  url: string
}

export type Player = {
  name: string
  role: string
  avatar: string
  socials: PlayerSocial[]
}

export const roster: Player[] = [
  {
    name: 'CCAMACHO27',
    role: 'Owner',
    avatar: '/players/ccamacho27.png',
    socials: [
      {
        type: 'tracker',
        url: 'https://fortnitetracker.com/profile/all/OTMZ%20CCAMACHO27',
      },
      {
        type: 'tiktok',
        url: 'https://www.tiktok.com/@otmzesports?is_from_webapp=1&sender_device=pc',
      },
      {
        type: 'x',
        url: 'https://x.com/otmzesports?s=21',
      },
    ],
  },
  {
    name: 'TROLHOX',
    role: 'Tier 2',
    avatar: '/players/trolhox.png',
    socials: [
      {
        type: 'tracker',
        url: 'https://fortnitetracker.com/profile/all/5M%20new%20t3eny',
      },
      {
        type: 'tiktok',
        url: 'https://www.tiktok.com/@trolhoxz1?is_from_webapp=1&sender_device=pc',
      },
      {
        type: 'x',
        url: 'https://x.com/trolhoxfn',
      },
    ],
  },
  {
    name: 'd1gokeres',
    role: 'Tier 1',
    avatar: '/players/d1gokeres.png',
    socials: [
      {
        type: 'tracker',
        url: 'https://fortnitetracker.com/profile/all/otmz%20d1gokeresǃ/events',
      },
      {
        type: 'x',
        url: 'https://x.com/d1gokeres',
      },
    ],
  },
  {
    name: 'Sherby',
    role: 'Tier 1',
    avatar: '/players/sherby.png',
    socials: [
      {
        type: 'tracker',
        url: 'https://fortnitetracker.com/profile/all/Lamine%20Sherbyǃ',
      },
      {
        type: 'x',
        url: 'https://x.com/sherbyfn',
      },
    ],
  },
  {
    name: 'Selao',
    role: 'Tier 1',
    avatar: '/players/selao.png',
    socials: [
      {
        type: 'tracker',
        url: 'https://fortnitetracker.com/profile/all/OTMZ%20SelaoGOTY',
      },
      {
        type: 'x',
        url: 'https://x.com/selaofn',
      },
    ],
  },
  {
    name: 'Fozz',
    role: 'Tier 1',
    avatar: '/players/fozz.png',
    socials: [
      {
        type: 'tracker',
        url: 'https://fortnitetracker.com/profile/all/OTMZ%20Fozz/events?id=dd8cbbab-a92d-4683-a4e6-bbe1c8765640',
      },
      {
        type: 'x',
        url: 'https://x.com/MortalFozz',
      },
    ],
  },
  {
    name: 'gomexzs',
    role: 'Tier 1',
    avatar: '/players/gomexzs.png',
    socials: [
      {
        type: 'tracker',
        url: 'https://fortnitetracker.com/profile/all/OTMZ%20Gomexzs',
      },
      {
        type: 'tiktok',
        url: 'https://www.tiktok.com/@gomexzss?_r=1&_t=ZG-986hBEkwWCf',
      },
      {
        type: 'x',
        url: 'https://x.com/gomexzss?s=11',
      },
    ],
  },
]

export const esportsPlayers = { value: 25, suffix: '+', label: 'Jogadores' }

export const esportsSecondary: {
  value: number
  suffix: string
  label: string
}[] = [
  { value: +5, suffix: '', label: 'Players Tier 1' },
  { value: 2, suffix: '', label: 'Jogos competitivos' },
]
