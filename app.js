/* ===== app.js — logique partagée V2 (compatible avec les données V1) ===== */
if (localStorage.getItem("modeSombre") === "true") document.documentElement.classList.add("dark");

const Store = {
  get(cle, defaut) { try { return JSON.parse(localStorage.getItem(cle)) ?? defaut; } catch { return defaut; } },
  set(cle, val) { localStorage.setItem(cle, JSON.stringify(val)); },
  seances() { return this.get("seances", []); },
  profil() { return { nom: "Lucie MUSSCHOOT", numero: "01", poste: "Gardienne", ...this.get("profil", {}) }; }
};

const SEUILS = [0,50,150,300,500,750,1050,1400,1800,2250,2750,3300,3900,4550,5250,6000,6800,7650,8550,9500,10500,11550,12650,13800,15000,16250,17550,18900,20300,21750];

function calculerXP(seances = Store.seances()) {
  return seances.reduce((t, s) => t + (s.type === "match" ? 25 : 10), 0);
}

function infosNiveau(xp) {
  let i = 0;
  while (i + 1 < SEUILS.length && xp >= SEUILS[i + 1]) i++;
  const debut = SEUILS[i], fin = SEUILS[i + 1] ?? null;
  return { niveau: i + 1, debut, fin, ratio: fin ? (xp - debut) / (fin - debut) : 1 };
}

// Stats de saison. Le % d'arrêts est pondéré : total arrêts / total tirs
function statsSaison(seances = Store.seances()) {
  const matchs = seances.filter(s => s.type === "match" && s.match)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const arrets = matchs.reduce((t, s) => t + Number(s.match.nombreArrets || 0), 0);
  const buts = matchs.reduce((t, s) => t + Number(s.match.scoreAdversaire || 0), 0);
  const tirs = arrets + buts;
  return {
    matchs,
    nbMatchs: matchs.length,
    arrets,
    moyenne: matchs.length ? arrets / matchs.length : 0,
    pourcentage: tirs ? (arrets / tirs) * 100 : 0
  };
}

const fmt = (n, d = 1) => Number(n).toFixed(d).replace(".", ",");

function toast(msg) {
  let t = document.querySelector(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2200);
}

// Barre de navigation unique, injectée dans toutes les pages
function monterNav(actif) {
  const ic = {
    home: "M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z",
    journal: "M12 5.5C10.5 4 8.5 3 5 3H3V19H5C8.5 19 10.5 20 12 21C13.5 20 15.5 19 19 19H21V3H19C15.5 3 13.5 4 12 5.5ZM11 18.3C9.5 17.5 7.7 17 5 17V5H5.5C8.1 5 9.8 5.7 11 6.8V18.3ZM19 17C16.3 17 14.5 17.5 13 18.3V6.8C14.2 5.7 15.9 5 18.5 5H19V17Z",
    add: "M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5z",
    trophees: "M18 4H6V7C6 10.3 8.1 13.1 11 13.8V17H8V20H16V17H13V13.8C15.9 13.1 18 10.3 18 7V4ZM8 7V6H10V8C10 9.2 9.5 10.3 8.7 11C8.3 10.2 8 9.2 8 7ZM16 7C16 9.2 15.7 10.2 15.3 11C14.5 10.3 14 9.2 14 8V6H16V7Z",
    parametres: "M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.03 7.03 0 0 0-1.62-.94l-.36-2.54A.5.5 0 0 0 14 2h-4a.5.5 0 0 0-.5.42l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96a.5.5 0 0 0-.6.22L2.61 8.48a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32c.14.24.42.32.6.22l2.39-.96c.49.38 1.03.7 1.62.94l.36 2.54c.05.28.27.42.5.42h4c.23 0 .45-.14.5-.42l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.24.1.5 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7Z"
  };
  const liens = [
    ["home", "index.html", "Accueil"], ["journal", "journal.html", "Journal"],
    ["add", "index.html?ouvrir=seance", "Nouvelle séance"],
    ["trophees", "trophees.html", "Trophées"], ["parametres", "parametres.html", "Paramètres"]
  ];
  const nav = document.createElement("nav");
  nav.className = "bottom-nav";
  nav.innerHTML = liens.map(([id, href, label]) => `
    <a href="${href}" ${id === "add" ? 'class="add"' : id === actif ? 'class="active" aria-current="page"' : ""} aria-label="${label}">
      <svg width="${id === "add" ? 28 : 24}" height="${id === "add" ? 28 : 24}" viewBox="0 0 24 24" fill="currentColor"><path d="${ic[id]}"/></svg>
      ${id === "add" ? "" : `<span>${label}</span>`}
    </a>`).join("");
  document.body.appendChild(nav);
}
