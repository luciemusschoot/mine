/* ===== trophees.js — mêmes identifiants qu'en V1 : les dates déjà obtenues sont conservées ===== */
// [id, titre, sous-titre, xp (sert à la rareté), statistique, objectif, unité]
const TROPHEES = [
  ["premier-entrainement","Premiers pas","1 entraînement joué",25,"entrainements",1],
  ["10-entrainements","Assidue","10 entraînements joués",50,"entrainements",10],
  ["25-entrainements","Travailleuse","25 entraînements joués",75,"entrainements",25],
  ["50-entrainements","Machine","50 entraînements joués",125,"entrainements",50],
  ["100-entrainements","Infatigable","100 entraînements joués",250,"entrainements",100],
  ["premier-match","Première bataille","1er match joué",25,"matchs",1],
  ["10-matchs","Compétitrice","10 matchs joués",50,"matchs",10],
  ["50-matchs","Vétérane","50 matchs joués",125,"matchs",50],
  ["100-matchs","Centenaire","100 matchs joués",250,"matchs",100],
  ["premier-arret","Première parade","1 arrêt en match",25,"totalArrets",1],
  ["50-arrets","Bonne gardienne","50 arrêts cumulés",50,"totalArrets",50],
  ["100-arrets","Mur","100 arrêts cumulés",75,"totalArrets",100],
  ["250-arrets","Rempart","250 arrêts cumulés",125,"totalArrets",250],
  ["500-arrets","Forteresse","500 arrêts cumulés",250,"totalArrets",500],
  ["50-pourcent","Des réflexes","50 % d'arrêts sur un match",50,"meilleurPourcentage",50,"%"],
  ["60-pourcent","Solide","60 % d'arrêts sur un match",75,"meilleurPourcentage",60,"%"],
  ["70-pourcent","Performante","70 % d'arrêts sur un match",100,"meilleurPourcentage",70,"%"],
  ["80-pourcent","Excellente","80 % d'arrêts sur un match",150,"meilleurPourcentage",80,"%"],
  ["100-pourcent","Gant d'or","100 % d'arrêts sur un match",300,"meilleurPourcentage",100,"%"],
  ["10-arrets-match","Dans la zone","10 arrêts dans un match",75,"meilleurMatch",10],
  ["15-arrets-match","Muraille","15 arrêts dans un match",100,"meilleurMatch",15],
  ["20-arrets-match","Infranchissable","20 arrêts dans un match",150,"meilleurMatch",20],
  ["25-arrets-match","Dernier rempart","25 arrêts dans un match",200,"meilleurMatch",25],
  ["5-matchs-10-arrets","Main ferme","5 matchs avec au moins 10 arrêts",150,"matchsAvec10Arrets",5],
  ["5-matchs-60","Régulière","5 matchs consécutifs à 60 % ou plus",150,"meilleureSerie60",5],
  ["10-matchs-70","Constante","10 matchs à 70 % ou plus",200,"matchs70",10],
  ["10-matchs-80","Élite","10 matchs à 80 % ou plus",300,"matchs80",10],
  ["3-matchs-5-arrets","Départ canon","3 premiers matchs avec au moins 5 arrêts",75,"matchsAvec5ArretsPremiers",3],
  ["serie-5-arrets","La série","5 matchs consécutifs avec au moins 1 arrêt",100,"meilleureSerieAvecArret",5],
  ["serie-10-arrets","Invincible","10 matchs consécutifs avec au moins 1 arrêt",200,"meilleureSerieAvecArret",10],
  ["5-focus","Polyvalente","Utiliser 5 focus différents",50,"nombreFocus",5],
  ["10-focus","Exploratrice","Utiliser 10 focus différents",100,"nombreFocus",10],
  ["10-meme-focus","Spécialiste","10 entraînements sur le même focus",100,"meilleurFocus",10],
  ["25-meme-focus","Experte","25 entraînements sur le même focus",200,"meilleurFocus",25],
  ["10-focus-4-etoiles","Objectif atteint","10 séances avec le même focus et 4★ ou plus",250,"meilleurFocus4Etoiles",10],
  ["10-cinq-etoiles","Perfectionniste","10 séances notées 5★",100,"seances5Etoiles",10],
  ["10-quatre-etoiles","Exigeante","10 séances notées 4★ ou plus",75,"seances4Etoiles",10],
  ["25-cinq-etoiles","Excellence","25 séances notées 5★",250,"seances5Etoiles",25],
  ["3-cinq-etoiles-suite","Coup de maître","3 séances consécutives à 5★",100,"meilleureSerie5Etoiles",3],
  ["5-cinq-etoiles-suite","Sans faute","5 séances consécutives à 5★",200,"meilleureSerie5Etoiles",5],
  ["20-seances-30-jours","Déterminée","20 séances en 30 jours",250,"maxSeances30Jours",20],
  ["10-seances-14-jours","Régularité","10 séances en 14 jours",150,"maxSeances14Jours",10],
  ["3-seances-semaine","Marathon","3 séances dans une même semaine",75,"maxSeancesSemaine",3],
  ["retour-combat","Retour au combat","Reprendre après au moins 14 jours de pause",150,"aReprisApresPause",1],
  ["4-semaines","Toujours présente","4 semaines consécutives avec une séance",200,"meilleureSerieSemaines",4],
  ["10-seances","Saison lancée","10 séances enregistrées",50,"totalSeances",10],
  ["100-seances","Cap des 100","100 séances enregistrées",300,"totalSeances",100],
  ["niveau-5","Niveau supérieur","Atteindre le niveau 5",100,"niveau",5],
  ["niveau-10","Maîtrise","Atteindre le niveau 10",300,"niveau",10],
  ["gardienne-ultime","Gardienne ultime","Atteindre 3000 XP",1000,"xp",3000]
];

/* ----- Rareté et badges ----- */
const RARETES = { bronze:["#e8b088","#8a4f26"], argent:["#eef2f4","#8b99a3"], or:["#ffe27a","#c8921a"], legendaire:["#9ff3e4","#2a7f73"] };
const NOMS_RARETE = { bronze:"Bronze", argent:"Argent", or:"Or", legendaire:"Légendaire" };
const rarete = xp => xp <= 75 ? "bronze" : xp <= 150 ? "argent" : xp <= 250 ? "or" : "legendaire";

let _g = 0;
function badgeSVG(r, obtenu) {
  const [c1, c2] = obtenu ? RARETES[r] : ["#d5dedb", "#9aaaa5"], id = "g" + (++_g);
  const centre = obtenu
    ? '<polygon points="32,25 35,33 43.5,33.5 37,39 39,47.5 32,43 25,47.5 27,39 20.5,33.5 29,33" fill="#fff" opacity=".95"/>'
    : '<rect x="26" y="34" width="12" height="9" rx="2" fill="#fff"/><path d="M28 34v-3a4 4 0 0 1 8 0v3" fill="none" stroke="#fff" stroke-width="2.5"/>';
  return `<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><path d="M20 2h10l4 20H22z" fill="${c2}"/><path d="M34 2h10l-2 20H30z" fill="${c1}" opacity=".85"/><circle cx="32" cy="36" r="22" fill="url(#${id})"/><circle cx="32" cy="36" r="17" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2"/>${centre}</svg>`;
}

/* ----- Statistiques (dates en heure locale, fenêtres glissantes) ----- */
const jourMs = d => { const [y, m, j] = d.split("-").map(Number); return new Date(y, m - 1, j).getTime(); };
const indexSemaine = ms => { const d = new Date(ms), j = d.getDay() || 7; return Math.round(new Date(d.getFullYear(), d.getMonth(), d.getDate() - j + 1).getTime() / 864e5); };

function calcStats(seances) {
  const s = [...seances].sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
  const ent = s.filter(x => x.type === "entrainement");
  const m = s.filter(x => x.type === "match" && x.match);
  const pc = x => Number(x.match.pourcentageArrets || 0), ar = x => Number(x.match.nombreArrets || 0);
  const max = a => a.length ? Math.max(...a) : 0;
  const serie = (a, f) => { let c = 0, b = 0; a.forEach(x => { c = f(x) ? c + 1 : 0; b = Math.max(b, c); }); return b; };
  const compter = a => { const o = {}; a.forEach(x => { if (x.focus) o[x.focus] = (o[x.focus] || 0) + 1; }); return o; };

  const t = s.map(x => jourMs(x.date));
  const fenetre = j => { let b = 0, d = 0; t.forEach((v, i) => { while (v - t[d] >= j * 864e5) d++; b = Math.max(b, i - d + 1); }); return b; };

  const sem = t.map(indexSemaine), parSem = {};
  sem.forEach(k => parSem[k] = (parSem[k] || 0) + 1);
  const semUniques = [...new Set(sem)].sort((a, b) => a - b);
  let sSem = 0, meilleureSem = 0;
  semUniques.forEach((k, i) => { sSem = i && k - semUniques[i - 1] === 7 ? sSem + 1 : 1; meilleureSem = Math.max(meilleureSem, sSem); });

  const xp = calculerXP(s), debut = m.slice(0, 3);
  const focusEnt = compter(ent), focus4 = compter(ent.filter(x => Number(x.note) >= 4));

  return {
    totalSeances: s.length, entrainements: ent.length, matchs: m.length,
    totalArrets: m.reduce((n, x) => n + ar(x), 0),
    meilleurMatch: max(m.map(ar)), meilleurPourcentage: max(m.map(pc)),
    matchsAvec10Arrets: m.filter(x => ar(x) >= 10).length,
    matchs70: m.filter(x => pc(x) >= 70).length, matchs80: m.filter(x => pc(x) >= 80).length,
    meilleureSerie60: serie(m, x => pc(x) >= 60), meilleureSerieAvecArret: serie(m, x => ar(x) >= 1),
    matchsAvec5ArretsPremiers: debut.length === 3 && debut.every(x => ar(x) >= 5) ? 3 : 0,
    nombreFocus: Object.keys(focusEnt).length,
    meilleurFocus: max(Object.values(focusEnt)), meilleurFocus4Etoiles: max(Object.values(focus4)),
    seances5Etoiles: s.filter(x => Number(x.note) === 5).length, seances4Etoiles: s.filter(x => Number(x.note) >= 4).length,
    meilleureSerie5Etoiles: serie(s, x => Number(x.note) === 5),
    maxSeances30Jours: fenetre(30), maxSeances14Jours: fenetre(14), maxSeancesSemaine: max(Object.values(parSem)),
    aReprisApresPause: t.some((v, i) => i && Math.round((v - t[i - 1]) / 864e5) >= 14) ? 1 : 0,
    meilleureSerieSemaines: meilleureSem, xp, niveau: infosNiveau(xp).niveau
  };
}

/* ----- Dates d'obtention : une seule passe. Renvoie les titres des trophées tout juste débloqués ----- */
function synchroniserTrophees() {
  const seances = [...Store.seances()].sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
  const obtenus = Store.get("tropheesObtenus", {}), finales = calcStats(seances), nouveaux = [];

  const manquants = [];
  TROPHEES.forEach(([id, , , , cle, obj]) => {
    if (finales[cle] >= obj) { if (!obtenus[id]) manquants.push(id); }
    else delete obtenus[id]; // plus rempli (séance supprimée) : la date sera recalculée si besoin
  });

  for (let i = 1; i <= seances.length && manquants.length; i++) {
    const st = calcStats(seances.slice(0, i));
    for (let k = manquants.length - 1; k >= 0; k--) {
      const t = TROPHEES.find(x => x[0] === manquants[k]);
      if (st[t[4]] >= t[5]) { obtenus[t[0]] = seances[i - 1].date; nouveaux.push(t[1]); manquants.splice(k, 1); }
    }
  }
  Store.set("tropheesObtenus", obtenus);
  return nouveaux;
}
