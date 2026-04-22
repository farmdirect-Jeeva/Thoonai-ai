// ═══════════════════════════════════════
// gkdata.js — Static GK data (never changes)
// ═══════════════════════════════════════

const GK = [
  { id:"hist", emoji:"🏛️", title:"History", desc:"Ancient, Medieval & Modern India. From Indus Valley to Independence.",
    topics:[
      { title:"Indus Valley Civilisation", rel:"High", facts:[
        "Timeline: 3300 BCE – 1300 BCE | Mature phase: 2600–1900 BCE.",
        "Major sites: Mohenjo-daro (Sindh), Harappa (Punjab), Dholavira & Lothal (Gujarat, India).",
        "Dholavira — only IVC site declared UNESCO World Heritage Site (India, 2021).",
        "Script: Undeciphered, written right-to-left. No temples, palaces, or large armies found.",
        "Great Bath at Mohenjo-daro — possibly ritual/civic bathing platform.",
        "Trade extended to Mesopotamia — 'Meluhha' was ancient name for IVC region.",
        "Decline theories: Climatic change, river shifts (Ghaggar-Hakra / Sarasvati drying up).",
      ]},
      { title:"Mauryan Empire", rel:"High", facts:[
        "Founded by Chandragupta Maurya (321 BCE) | Guided by Chanakya (Kautilya).",
        "Arthashastra — Kautilya's treatise on statecraft, economy, military strategy.",
        "Ashoka (273–232 BCE): Converted to Buddhism after Kalinga War (261 BCE).",
        "Ashoka's Edicts: Rock Edicts (major + minor) and Pillar Edicts — propagate Dhamma.",
        "Lion Capital of Sarnath — India's National Emblem. 'Satyameva Jayate' from Mundaka Upanishad.",
        "Megasthenes — Greek ambassador; wrote 'Indica' describing Mauryan India.",
        "Decline: Pushyamitra Shunga killed last Mauryan king Brihadratha (185 BCE).",
      ]},
      { title:"Revolt of 1857", rel:"High", facts:[
        "First War of Independence (nationalist view) vs Sepoy Mutiny (British view).",
        "Immediate cause: Enfield rifle cartridges allegedly greased with cow/pig fat.",
        "Began at Meerut (10 May 1857), quickly spread across North India.",
        "Key leaders: Mangal Pandey, Rani Lakshmibai, Tantia Tope, Nana Sahib, Bahadur Shah Zafar II.",
        "Lacked unified leadership; no pan-India coordination.",
        "Result: End of East India Company rule → Crown's direct rule (Government of India Act 1858).",
        "Queen's Proclamation 1858: Promised non-interference in religion and equal treatment.",
      ]},
      { title:"Gandhian Movements", rel:"High", facts:[
        "Champaran Satyagraha (1917) — Gandhi's first in India; against tinkathia indigo system.",
        "Non-Cooperation Movement (1920–22): Boycott of British goods, courts, schools. Stopped after Chauri Chaura (1922).",
        "Civil Disobedience Movement (1930): Dandi March — 241 miles, 24 days, defied salt tax.",
        "Quit India Movement (1942): 'Do or Die'. Gandhi, Nehru, Patel all arrested immediately.",
        "Poona Pact (1932): Gandhi vs Ambedkar — reserved constituencies for Dalits within general electorate.",
      ]},
    ]},

  { id:"geo", emoji:"🌍", title:"Geography", desc:"Indian & World geography — physical, human, and economic dimensions.",
    topics:[
      { title:"Rivers of India", rel:"High", facts:[
        "Himalayan rivers (perennial): Ganga, Yamuna, Brahmaputra — glacial + monsoon fed.",
        "Peninsular rivers (seasonal): Krishna, Kaveri, Godavari, Mahanadi — rain-fed only.",
        "Ganga: Gangotri glacier (Uttarakhand) → Bay of Bengal. Longest river in India: 2,525 km.",
        "Brahmaputra: Originates at Mansarovar (Tibet) as Tsangpo | Enters India at Arunachal Pradesh.",
        "Indus Water Treaty (1960): India-Pakistan; World Bank mediated.",
        "Kaveri: 'Dakshina Ganga' | Water dispute: Karnataka vs Tamil Nadu — decades-old conflict.",
      ]},
      { title:"Indian Climate & Monsoon", rel:"High", facts:[
        "India has tropical monsoon climate (Koppen: Am, Aw). Strong seasonal contrast.",
        "Southwest Monsoon (June–Sept): Arabian Sea branch + Bay of Bengal branch.",
        "Mawsynram (Meghalaya): Highest average rainfall in the world (~11,871 mm/year).",
        "Northeast Monsoon (Oct–Dec): Tamil Nadu & SE coast receive rain in winter.",
        "El Niño → weakens Indian monsoon. La Niña → strengthens it.",
        "Western Disturbances: Extra-tropical cyclones → winter rains in NW India.",
      ]},
    ]},

  { id:"pol", emoji:"⚖️", title:"Polity", desc:"Constitution, Governance, and Political System of India.",
    topics:[
      { title:"Fundamental Rights (Part III)", rel:"High", facts:[
        "Articles 12–35 | Originally 7 FRs. Right to Property removed by 44th Amendment (1978) → Art. 300A.",
        "Art. 13: Laws inconsistent with FRs are void — foundation of Judicial Review.",
        "Art. 14: Equality before law + Equal protection of laws.",
        "Art. 21: Right to life and personal liberty | Maneka Gandhi case (1978): procedure must be fair, just, reasonable.",
        "Art. 32: Right to Constitutional Remedies — 'Heart and Soul of Constitution' (Dr. Ambedkar).",
        "Writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo Warranto.",
        "Art. 21A (86th Amdt, 2002): Free and compulsory education for 6–14 years → RTE Act 2009.",
      ]},
      { title:"Directive Principles (Part IV)", rel:"High", facts:[
        "Articles 36–51 | Non-justiciable (cannot be enforced by courts).",
        "Inspired by Irish Constitution (1937). Reflect positive obligations of the State.",
        "Three types: Socialistic, Gandhian, Liberal-Intellectual.",
        "Art. 44: Uniform Civil Code (UCC) — Goa is the only State with a common civil code.",
        "Art. 48A: Protection of environment — added by 42nd Amendment (1976).",
        "Conflict with FRs: Harmony approach (Minerva Mills, 1980) — neither supreme, must coexist.",
      ]},
    ]},

  { id:"eco", emoji:"📊", title:"Economy", desc:"Indian Economy, Monetary Policy, Budgets, and Development.",
    topics:[
      { title:"RBI & Monetary Policy", rel:"High", facts:[
        "RBI established: 1 April 1935 | Nationalised: 1 January 1949 | HQ: Mumbai.",
        "Monetary Policy Committee (MPC): 6 members — 3 from RBI + 3 external (GoI nominees).",
        "Repo Rate: Rate at which RBI lends to commercial banks (key policy rate).",
        "Reverse Repo Rate: Rate at which RBI borrows from banks.",
        "CRR: % of NDTL kept as cash with RBI — earns no interest.",
        "SLR: % of NDTL in gold/govt securities — earns interest.",
        "Flexible inflation targeting: 4% ± 2% band (since 2016).",
      ]},
      { title:"Planning & NITI Aayog", rel:"Medium", facts:[
        "Planning Commission (1950–2014): Chaired by PM | Twelve Five-Year Plans total.",
        "1st Plan (1951–56): Agriculture focus | Harrod-Domar model.",
        "2nd Plan (1956–61): Feldman-Mahalanobis model | Heavy industry priority.",
        "NITI Aayog (2015–present): Replaced Planning Commission | 'Cooperative Federalism' focus.",
        "NITI Aayog: PM as Chairperson + Governing Council (all CMs + Lt Governors).",
        "Aspirational Districts Programme — 112 most underdeveloped districts.",
      ]},
    ]},

  { id:"sci", emoji:"🔬", title:"Science & Tech", desc:"ISRO, Defence Tech, Biotech, AI, and Space missions.",
    topics:[
      { title:"ISRO Missions", rel:"High", facts:[
        "ISRO established: 1969 | HQ: Bengaluru | Launch site: SDSC Sriharikota (SHAR).",
        "Chandrayaan-3 (2023): Vikram lander + Pragyan rover | Soft-landed near South Pole (23 Aug 2023) — world first.",
        "Aditya-L1 (2023): India's first solar mission | Inserted at L1 Lagrange point (Jan 2024).",
        "Gaganyaan: India's first crewed spaceflight (target 2025) | 3 astronauts | Low Earth Orbit.",
        "PSLV: Polar Satellite Launch Vehicle — workhorse | 4-stage alternating solid-liquid.",
        "NavIC (IRNSS): India's own GPS | 7 satellites | Coverage: India + 1500 km.",
      ]},
    ]},

  { id:"art", emoji:"🎭", title:"Arts & Culture", desc:"Classical Arts, UNESCO Heritage, Temples, and Living Traditions.",
    topics:[
      { title:"Classical Dances of India", rel:"High", facts:[
        "Sangeet Natak Akademi recognises 8 classical dance forms.",
        "Bharatanatyam (Tamil Nadu): Oldest form | Devadasi tradition | Rukmini Devi Arundale revived at Kalakshetra.",
        "Kathak (North India): Lucknow + Jaipur gharanas | Persian and Mughal influence in costume.",
        "Odissi (Odisha): Mahari temple tradition | Strong Abhinaya (expression) emphasis.",
        "Kathakali (Kerala): Elaborate make-up (Chutti) | Navarasas (9 emotions) portrayed.",
        "Sattriya (Assam): 8th classical form (2000) | Vaishnavite monasteries (Sattras).",
        "Mohiniyattam (Kerala): Solo feminine form | 'Dance of the enchantress'.",
      ]},
      { title:"Tamil Heritage & Culture", rel:"High", facts:[
        "Tamil — oldest classical language in India. Classical Language status: 2004. 6 classical languages total.",
        "Sangam literature (300 BCE – 300 CE): Akananuru, Purananuru, Silappatikaram, Manimekalai.",
        "Thirukkural by Thiruvalluvar: 1330 couplets — Aram (virtue), Porul (wealth), Inbam (love).",
        "Three Sangams legend: First at Madurai, Second at Kapatapuram (submerged), Third at current Madurai.",
        "Chola bronzes: Lost-wax (cire perdue) casting | Nataraja — Shiva's cosmic dance — most iconic.",
        "UNESCO: Great Living Chola Temples (Brihadeeswarar, Thanjavur) — World Heritage Site.",
        "Pongal: Harvest festival in Thai month | 4 days — Bhogi, Pongal, Mattu Pongal, Kaanum Pongal.",
      ]},
    ]},
];

const CAT_CLASS = {
  "Polity":"c-polity","Economy":"c-economy",
  "International Relations":"c-ir","Science & Tech":"c-sci",
  "Environment":"c-env","Tamil Nadu":"c-tn",
  "Defence":"c-def","Social":"c-soc"
};
