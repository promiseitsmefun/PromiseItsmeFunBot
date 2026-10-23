const panels = [
  {
    title: 'Hunter x Hunter — Main Panel',
    items: [
      '1. !menu — Open all bot panels',
      '2. !help — Show help and command map',
      '3. !hxh — Hunter x Hunter overview',
      '4. !start — Initialize the session',
      '5. !status — Check bot status',
    ],
  },
  {
    title: 'Hunter x Hunter — Character Panel',
    items: [
      '6. !gon — Gon Freecss profile',
      '7. !killua — Killua Zoldyck profile',
      '8. !leorio — Leorio Paladiknight profile',
      '9. !kurapika — Kurapika Kurta profile',
      '10. !hisoka — Hisoka Morow profile',
    ],
  },
  {
    title: 'Hunter x Hunter — Nen Panel',
    items: [
      '11. !nen — Nen overview',
      '12. !enhancer — Enhancer user',
      '13. !transmuter — Transmuter move',
      '14. !emitter — Emitter abilities',
      '15. !conjurer — Conjurer summon',
    ],
  },
  {
    title: 'Hunter x Hunter — Battle Panel',
    items: [
      '16. !battle — Battle mode',
      '17. !powerlevel — Show strength estimate',
      '18. !duel — Challenge a fighter',
      '19. !rank — Rank evaluation',
      '20. !special — Special attack list',
    ],
  },
  {
    title: 'Hunter x Hunter — Guild Panel',
    items: [
      '21. !exam — Hunter exam guide',
      '22. !zodiac — Zodiac roster',
      '23. !phantom — Phantom troupe intel',
      '24. !heavens — Heaven arena info',
      '25. !missions — Mission board',
    ],
  },
  {
    title: 'Hunter x Hunter — Identity Tracking Panel',
    items: [
      '26. !pair — Pair phone number with username and name',
      '27. !bind — Bind user to identity',
      '28. !track — Track active session',
      '29. !unknowns — Show unknown contacts',
      '30. !identify — Identify unknown sessions',
    ],
  },
];

const commandCatalog = {
  menu: 'Show all menu panels',
  help: 'Show help and command map',
  hxh: 'Show Hunter x Hunter overview',
  start: 'Initialize the user session',
  status: 'Check bot connection and session state',
  gon: 'Show Gon Freecss info',
  killua: 'Show Killua Zoldyck info',
  leorio: 'Show Leorio Paladiknight info',
  kurapika: 'Show Kurapika info',
  hisoka: 'Show Hisoka info',
  nen: 'Show Nen overview',
  enhancer: 'Enhancer info',
  transmuter: 'Transmuter info',
  emitter: 'Emitter info',
  conjurer: 'Conjurer info',
  battle: 'Show battle system',
  powerlevel: 'Estimate power level',
  duel: 'Create a duel challenge',
  rank: 'Show rank estimate',
  special: 'Show special attack list',
  exam: 'Hunter exam guide',
  zodiac: 'Show zodiac members',
  phantom: 'Show phantom troupe',
  heavens: 'Heaven arena info',
  missions: 'Mission board info',
  pair: 'Pair phone with username and full name',
  bind: 'Bind session identity',
  track: 'Track active session details',
  unknowns: 'Show unknown identities',
  identify: 'Identify unknown phone numbers and names',
  profile: 'Show current profile',
  phone: 'Register a phone number',
  username: 'Register a username',
  fullname: 'Register a full name',
  whois: 'Show identity details for a session',
  session: 'Show the active session information',
  guild: 'Show guild overview',
  info: 'Show bot and user info',
  bot: 'Show bot identity',
  hunter: 'Show hunter details',
  aura: 'Show aura details',
  zetsu: 'Show zetsu technique',
  ren: 'Show ren technique',
  ten: 'Show ten technique',
  gyo: 'Show gyo technique',
  kaisai: 'Show kaisai technique',
  power: 'Show power list',
  forms: 'Show combat forms',
  rules: 'Show user rules',
  quiz: 'Start a quick personality quiz',
  poll: 'Start a vote challenge',
  team: 'Create team roster',
  tactics: 'Show battle tactics',
  whisper: 'Create private whisper format',
  commandlist: 'Show all known commands',
  cmds: 'Alias for commandlist',
  panel: 'Display the current active panel',
  panel1: 'Main panel',
  panel2: 'Character panel',
  panel3: 'Nen panel',
  panel4: 'Battle panel',
  panel5: 'Guild panel',
  panel6: 'Identity tracking panel',
  p1: 'Jump to panel 1',
  p2: 'Jump to panel 2',
  p3: 'Jump to panel 3',
  p4: 'Jump to panel 4',
  p5: 'Jump to panel 5',
  p6: 'Jump to panel 6',
  summon: 'Summon support info',
  roster: 'Show fighter roster',
  archives: 'Show archive list',
  attack: 'Show battle command attack list',
  defend: 'Show defense options',
  scan: 'Scan identity data',
  inspect: 'Inspect session data',
  sync: 'Sync session profile',
  registry: 'Show identity registry',
  network: 'Show network presence',
  record: 'Record contact data',
  contact: 'Show current contact data',
};

const activeSessions = new Map();

function getSession(chatId) {
  const key = String(chatId || 'unknown-chat');
  if (!activeSessions.has(key)) {
    activeSessions.set(key, {
      chatId: key,
      phone: '',
      username: '',
      fullName: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  return activeSessions.get(key);
}

function normalizePhone(value = '') {
  if (!value) return '';
  return String(value)
    .replace(/\s+/g, '')
    .replace(/[+()\-]/g, '')
    .replace(/[^\d]/g, '');
}

function normalizeUsername(value = '') {
  if (!value) return '';
  const match = String(value).match(/@?([a-zA-Z0-9_]+)/);
  return match ? match[1].toLowerCase() : '';
}

function detectFullName(value = '') {
  if (!value) return '';
  const cleaned = String(value).trim();
  const direct = cleaned.match(/(?:my name is|i am|im|name\s*[:=]\s*|full name\s*[:=]\s*)([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/i);
  if (direct) return direct[1].trim();
  const fallback = cleaned.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/);
  return fallback ? fallback[1].trim() : '';
}

function extractPhoneFromText(text = '') {
  const match = String(text).match(/(?:\+?\d[\d\s().-]{7,}\d)/);
  return match ? normalizePhone(match[0]) : '';
}

function extractUsernameFromText(text = '') {
  const match = String(text).match(/@([a-zA-Z0-9_]+)/);
  return match ? normalizeUsername(match[1]) : '';
}

function writeSessionIdentity(session, payload = {}) {
  if (payload.phone) session.phone = normalizePhone(payload.phone);
  if (payload.username) session.username = normalizeUsername(payload.username);
  if (payload.fullName) session.fullName = detectFullName(payload.fullName) || String(payload.fullName).trim();
  session.updatedAt = new Date().toISOString();
}

function buildIdentityCard(session) {
  const unknowns = [];
  if (!session.phone) unknowns.push('phone');
  if (!session.username) unknowns.push('username');
  if (!session.fullName) unknowns.push('full name');

  return [
    '*Session identity*',
    `Chat: ${session.chatId}`,
    `Phone: ${session.phone || 'unknown'}`,
    `Username: ${session.username || 'unknown'}`,
    `Full name: ${session.fullName || 'unknown'}`,
    `Unknown fields: ${unknowns.length ? unknowns.join(', ') : 'none'}`,
    `Last updated: ${session.updatedAt}`,
  ].join('\n');
}

function captureSessionIdentity(chatId, text) {
  if (!text) return null;
  const session = getSession(chatId);
  const phone = extractPhoneFromText(text);
  const username = extractUsernameFromText(text);
  const fullName = detectFullName(text);

  const updates = {};
  if (phone) updates.phone = phone;
  if (username) updates.username = username;
  if (fullName) updates.fullName = fullName;

  if (Object.keys(updates).length > 0) {
    writeSessionIdentity(session, updates);
    return session;
  }

  return session;
}

function buildMenuText() {
  return [
    '*Hunter x Hunter WhatsApp MD-Bot*',
    '',
    'Available panels:',
    ...panels.flatMap((panel) => [
      `*${panel.title}*`,
      ...panel.items,
      '',
    ]),
    'Total menu items: 30',
    'Total command aliases: 50+',
    'Phone pairing format: !pair 62812345678 @huntername Full Name',
  ].join('\n');
}

function buildCommandHelp() {
  const entries = Object.entries(commandCatalog).map(([name, description]) => `!${name} — ${description}`);
  return [
    '*Hunter x Hunter Bot Command Help*',
    '',
    ...entries.slice(0, 60),
    '',
    'Use !menu for all 30 menu items and !commandlist for the complete command index.',
  ].join('\n');
}

function parseCommand(rawText) {
  const text = String(rawText || '').trim();
  if (!text) return null;
  const match = text.match(/^([!./])?([a-zA-Z0-9_]+)(?:\s+(.*))?$/);
  if (!match) return null;
  return {
    prefix: match[1] || '!',
    command: match[2].toLowerCase(),
    args: (match[3] || '').trim(),
  };
}

function showUnknowns() {
  const records = [...activeSessions.values()].filter((session) => !session.phone || !session.username || !session.fullName);
  if (!records.length) {
    return 'No unknown active sessions right now. Use !pair to register a phone number, username, and full name.';
  }

  return records.map((session) => buildIdentityCard(session)).join('\n\n');
}

function processPairCommand(args, chatId) {
  const session = getSession(chatId);
  const normalizedArgs = String(args || '').trim();
  if (!normalizedArgs) {
    return 'Usage: !pair 62812345678 @huntername Full Name';
  }

  const phone = extractPhoneFromText(normalizedArgs) || normalizePhone(normalizedArgs.split(/\s+/)[0]);
  const username = extractUsernameFromText(normalizedArgs) || normalizeUsername((normalizedArgs.match(/@([A-Za-z0-9_]+)/) || [])[1] || '');
  const fullName = detectFullName(normalizedArgs) || normalizedArgs
    .replace(/@?[A-Za-z0-9_]+/g, '')
    .replace(normalizePhone(normalizedArgs) || '', '')
    .replace(/\s+/g, ' ')
    .trim();

  writeSessionIdentity(session, {
    phone: phone || session.phone,
    username: username || session.username,
    fullName: fullName || session.fullName,
  });

  return `Session paired successfully.\n${buildIdentityCard(session)}`;
}

function processCommand(sock, message, commandInfo) {
  const { command, args } = commandInfo;
  const chatId = message?.key?.remoteJid || 'unknown-chat';
  const session = getSession(chatId);

  switch (command) {
    case 'menu':
    case 'panel':
    case 'help':
      return buildMenuText();
    case 'commandlist':
    case 'cmds':
      return buildCommandHelp();
    case 'panel1':
    case 'p1':
      return panels[0].items.join('\n');
    case 'panel2':
    case 'p2':
      return panels[1].items.join('\n');
    case 'panel3':
    case 'p3':
      return panels[2].items.join('\n');
    case 'panel4':
    case 'p4':
      return panels[3].items.join('\n');
    case 'panel5':
    case 'p5':
      return panels[4].items.join('\n');
    case 'panel6':
    case 'p6':
      return panels[5].items.join('\n');
    case 'hxh':
      return 'Hunter x Hunter is a story about powerful hunters, hidden identities, and Nen-based battles. Use !menu for the full bot panel list.';
    case 'status':
      return `Bot online. Active sessions: ${activeSessions.size}.\n${buildIdentityCard(session)}`;
    case 'pair':
    case 'bind':
      return processPairCommand(args, chatId);
    case 'track':
      return buildIdentityCard(session);
    case 'unknowns':
      return showUnknowns();
    case 'identify':
      return `Unknown session scan complete.\n${showUnknowns()}`;
    case 'profile':
    case 'session':
    case 'whois':
      return buildIdentityCard(session);
    case 'phone':
      if (!args) return 'Usage: !phone 62812345678';
      writeSessionIdentity(session, { phone: args });
      return `Phone saved.\n${buildIdentityCard(session)}`;
    case 'username':
      if (!args) return 'Usage: !username @huntername';
      writeSessionIdentity(session, { username: args });
      return `Username saved.\n${buildIdentityCard(session)}`;
    case 'fullname':
      if (!args) return 'Usage: !fullname Hunter Name';
      writeSessionIdentity(session, { fullName: args });
      return `Full name saved.\n${buildIdentityCard(session)}`;
    case 'start':
      return `Session started for ${chatId}.\n${buildIdentityCard(session)}`;
    case 'info':
    case 'bot':
      return `Hunter x Hunter WhatsApp MD-Bot\nPrefix: ! / .\nIdentity tracking: enabled\nPhone normalization: digits only, no + or spaces`;
    case 'quiz':
      return 'Quiz mode activated: Which Nen category reflects your strongest trait? A) Enhancer B) Transmuter C) Emitter';
    case 'poll':
      return 'Poll started: Which HxH character is strongest? | Gon | Killua | Kurapika | Hisoka';
    case 'team':
      return 'Team roster: Gon, Killua, Kurapika, Leorio, Hisoka';
    case 'tactics':
      return 'Battle tactics: control range, disrupt aura, bait attacks, exploit nen weaknesses.';
    case 'rank':
      return 'Rank estimate: 1) Gon 2) Killua 3) Kurapika 4) Hisoka 5) Leorio';
    case 'special':
      return 'Special attack list: Rock, aura burst, thunderbolt, chain, lust, cloth';
    case 'guild':
      return 'Guild overview: Hunter exam, licenses, missions, prestige, and squad coordination.';
    case 'hunter':
      return 'Hunter details: licensed, elite, strategic, and mission-driven.';
    case 'aura':
      return 'Nen aura is your energy signature, used to power talents and techniques.';
    case 'zen':
    case 'zetsu':
      return 'Zetsu: a hidden, low-signature aura state.';
    case 'ren':
      return 'Ren: aura amplification to increase power and pressure.';
    case 'ten':
      return 'Ten: aura concentration and precision.';
    case 'gyo':
      return 'Gyo: awakened aura emission for stronger attack focus.';
    case 'kaisai':
      return 'Kaisai: technique activation and martial precision.';
    case 'gon':
      return 'Gon Freecss: relentless, instinctive, and growth-focused fighter.';
    case 'killua':
      return 'Killua Zoldyck: speed, precision, and stealth specialist.';
    case 'leorio':
      return 'Leorio Paladiknight: healer and tactical support.';
    case 'kurapika':
      return 'Kurapika Kurta: chain user with vengeance-driven precision.';
    case 'hisoka':
      return 'Hisoka Morow: thrill-seeker, manipulator, and chaotic powerhouse.';
    case 'nen':
      return 'Nen is the life energy system used for extraordinary techniques.';
    case 'enhancer':
      return 'Enhancer: strengthens physical or weapon-based abilities.';
    case 'transmuter':
      return 'Transmuter: changes aura into other forms and properties.';
    case 'emitter':
      return 'Emitter: projects aura outward for attacks and defense.';
    case 'conjurer':
      return 'Conjurer: creates complex objects and tools from aura.';
    case 'battle':
      return 'Battle mode online. Use !duel or !powerlevel to evaluate a fight.';
    case 'powerlevel':
      return 'Power estimate: Use aura control, speed, intellect, and combat style to rate a fighter.';
    case 'duel':
      return 'Duel challenge created. Select !rank and !special to see tactical advantages.';
    case 'missions':
      return 'Mission board: escort, investigation, assassination, retrieval.';
    case 'phantom':
      return 'Phantom Troupe: elite exiles with lethal coordination and intimidation.';
    case 'heavens':
      return 'Heaven Arena: a brutal tournament arena for talent and survival.';
    case 'zodiac':
      return 'Zodiac roster: a key group of exceptional hunters and fighters.';
    case 'exam':
      return 'Hunter exam guide: preparation, endurance, intelligence, and composure.';
    case 'registry':
    case 'network':
      return `Identity registry:\n${[...activeSessions.values()].map(buildIdentityCard).join('\n\n') || 'No records yet.'}`;
    case 'scan':
      return `Session scan result:\n${buildIdentityCard(session)}`;
    case 'inspect':
      return buildIdentityCard(session);
    case 'sync':
      return `Synced.\n${buildIdentityCard(session)}`;
    case 'record':
      return `Session recorded.\n${buildIdentityCard(session)}`;
    case 'contact':
      return `Current contact: ${session.phone || 'unknown phone'} / ${session.username || 'unknown username'} / ${session.fullName || 'unknown full name'}`;
    default:
      return 'Command not recognized. Try !menu or !help.';
  }
}

export function handleCommand(sock, message, rawText) {
  const parsed = parseCommand(rawText);
  if (!parsed) {
    const chatId = message?.key?.remoteJid || 'unknown-chat';
    captureSessionIdentity(chatId, rawText);
    return;
  }

  const response = processCommand(sock, message, parsed);

  if (message?.key?.remoteJid) {
    sock.sendMessage(message.key.remoteJid, { text: response });
  }

  return response;
}

export { activeSessions, panels, commandCatalog };

export function trackSessionFromText(chatId, text) {
  if (!text) return null;
  const session = getSession(chatId);
  const updates = {};
  const phone = extractPhoneFromText(text);
  const username = extractUsernameFromText(text);
  const fullName = detectFullName(text);

  if (phone) updates.phone = phone;
  if (username) updates.username = username;
  if (fullName) updates.fullName = fullName;

  if (Object.keys(updates).length > 0) {
    writeSessionIdentity(session, updates);
  }

  return session;
}

export function listActiveSessions() {
  return [...activeSessions.values()].map((session) => ({
    chatId: session.chatId,
    phone: session.phone,
    username: session.username,
    fullName: session.fullName,
  }));
}
