// ═══════════════════════════════════════════════════
// ai.js — Groq API (100% FREE, works in India)
// Model: llama-3.3-70b-versatile
// Get free key at: console.groq.com
// ═══════════════════════════════════════════════════

const CACHE_KEY  = 'thoonai-news-cache';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

function buildPrompt(category) {
  const today = new Date().toLocaleDateString('en-IN', {
    weekday:'long', day:'numeric', month:'long', year:'numeric'
  });
  const catFilter = category && category !== 'All'
    ? `Focus ONLY on category: "${category}".`
    : 'Cover a mix of: Polity, Economy, International Relations, Science & Tech, Environment, Tamil Nadu.';

  return `You are Thoonai, an expert Indian competitive exam coach. Today is ${today}.

Generate 6 important current affairs news items for UPSC, TNPSC, SSC, Banking exams.
${catFilter}

IMPORTANT: Return ONLY a raw JSON array. No markdown. No backticks. No explanation. Start directly with [ and end with ].

Format:
[{"id":"n1","title":"headline max 15 words","summary":"2-3 sentence summary of what happened","cat":"Polity","date":"${new Date().toISOString().split('T')[0]}","isNew":true,"pre":"Prelims: key facts, dates, numbers, names pipe-separated","main":"Mains analysis: GS linkage, significance, policy context 3-4 lines","stat":"Static links: Articles, Acts, Organisations, History"},{"id":"n2",...}]

Valid cat values: Polity, Economy, International Relations, Science & Tech, Environment, Tamil Nadu, Defence, Social

Use real recent events. Make content accurate and exam-relevant for India.`;
}

async function fetchFromGroq(apiKey, category) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are an expert Indian competitive exam coach. Always respond with raw JSON only — no markdown, no backticks, no explanation.'
        },
        {
          role: 'user',
          content: buildPrompt(category)
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    })
  });

  if(!response.ok) {
    const err = await response.json().catch(()=>({}));
    throw new Error(err?.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content || '';
  if(!text) throw new Error('Empty response from Groq');

  // Clean any accidental markdown
  const clean = text.replace(/```json/gi,'').replace(/```/g,'').trim();

  const start = clean.indexOf('[');
  const end   = clean.lastIndexOf(']');
  if(start === -1 || end === -1) throw new Error('No JSON array in response');

  const parsed = JSON.parse(clean.substring(start, end + 1));
  if(!Array.isArray(parsed) || parsed.length === 0) throw new Error('Invalid response format');
  return parsed;
}

function getCached(category) {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if(!raw) return null;
    const cache = JSON.parse(raw);
    const entry = cache[category||'All'];
    if(!entry || entry.date !== todayStr()) return null;
    return entry.data;
  } catch(e) { return null; }
}

function setCache(category, data) {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY)||'{}');
    cache[category||'All'] = { date: todayStr(), data };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch(e) {}
}

function clearCache() { localStorage.removeItem(CACHE_KEY); }

async function getNews(category, forceRefresh = false) {
  const apiKey = getApiKey();
  if(!apiKey) throw new Error('NO_API_KEY');
  if(!forceRefresh) {
    const cached = getCached(category);
    if(cached) return { data: cached, fromCache: true };
  }
  const data = await fetchFromGroq(apiKey, category);
  setCache(category, data);
  return { data, fromCache: false };
}

const MOCK_NEWS = [
  {id:"m1",title:"India Assumes Chairmanship of Global Partnership on AI (GPAI)",summary:"India took over as Chair of GPAI for 2024–25, emphasising inclusive AI development for the Global South.",cat:"Science & Tech",date:"2025-04-16",isNew:true,pre:"GPAI — Founded 2020 | 29 member nations | OECD Secretariat | IndiaAI Mission: ₹10,372 crore.",main:"India's GPAI chairmanship signals rising stature in global AI governance. Bridges 'AI Divide'. GS-II (IR) + GS-III (S&T).",stat:"GS-II Bilateral groupings | GS-III Technology, IPR | Digital Economy mission."},
  {id:"m2",title:"Supreme Court Upholds 10% EWS Reservation in Landmark Verdict",summary:"Supreme Court upheld 103rd Constitutional Amendment providing 10% EWS reservation by 3:2 majority.",cat:"Polity",date:"2025-04-15",isNew:true,pre:"103rd Amendment (2019) — Articles 15(6), 16(6). EWS: income < ₹8 lakh. Total reservation: 59.5%.",main:"Breaches Indra Sawhney 50% cap. GS-II Polity: Articles 14, 15, 16.",stat:"Articles 14–16, Indra Sawhney (1992), 93rd Amendment."},
  {id:"m3",title:"RBI Launches Unified Lending Interface for Agricultural Credit",summary:"RBI launched ULI — frictionless credit platform aggregating land records to improve last-mile lending.",cat:"Economy",date:"2025-04-15",isNew:true,pre:"ULI — RBI initiative | JAM → UPI → ULI Trinity | Reduces KCC turnaround time.",main:"Addresses structural gap in agri credit. GS-III: Agriculture, MSME, Financial Inclusion.",stat:"Priority Sector Lending, KCC, NABARD, PM Jan Dhan, India Stack."},
  {id:"m4",title:"Great Nicobar Island Project Gets Stage-I Environment Clearance",summary:"Ministry of Environment gave forest clearance to the ₹72,000 crore Great Nicobar Island project.",cat:"Environment",date:"2025-04-13",pre:"Great Nicobar — southernmost A&N island | Near Strait of Malacca | Biosphere Reserve | ANIIDCO.",main:"Strategic vs ecological: leatherback turtle, Shompen tribal rights (PVTG). GS-III: Environment.",stat:"Biosphere Reserves, PVTG, Forest Conservation Act 1980."},
  {id:"m5",title:"Tamil Nadu MTM 2.0 Adds AI Diagnostics for NCD Detection",summary:"Tamil Nadu expanded Makkalai Thedi Maruthuvam with AI retinal scanning to detect diabetic retinopathy.",cat:"Tamil Nadu",date:"2025-04-12",isNew:true,pre:"MTM — TN scheme 2021 | MTM 2.0 adds AI retinal scanning | TN: 4th NITI Health Index 2023.",main:"TN model: public health + technology. GS-II: Health (State List), NDHM alignment.",stat:"Health State List Entry 6, NDHM, NHM, AYUSHMAN Bharat."},
  {id:"m6",title:"DRDO Demonstrates 100-km Quantum Key Distribution Link",summary:"DRDO and IIT Delhi demonstrated QKD over 100-km fibre — India's first quantum communication milestone.",cat:"Science & Tech",date:"2025-04-11",pre:"QKD — quantum encryption | BB84 Protocol (1984) | National Quantum Mission: ₹6,003 crore 2023–31.",main:"India top-5 quantum nations. Unhackable communications. GS-III: S&T, Defence.",stat:"National Quantum Mission, DRDO, Cybersecurity, IT Act 2000."},
];
