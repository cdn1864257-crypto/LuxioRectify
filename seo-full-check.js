// seo-full-check.js
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

const SITE_URL = "https://www.luxiomarket.shop";

// Ajoute toutes les pages importantes ici
const pages = [
  "/",
  // "/produits",
  // "/contact",
  // "/about"
];

// Vérification de robots.txt et sitemap.xml
async function checkFile(url) {
  try {
    const res = await fetch(url);
    if (res.status === 200) return "✅ Accessible";
    return `⚠️ Status ${res.status}`;
  } catch {
    return "❌ Non accessible";
  }
}

// Récupération de la page et mesure du temps de réponse
async function fetchPage(url) {
  try {
    const start = Date.now();
    const res = await fetch(url);
    const html = await res.text();
    const responseTime = Date.now() - start;
    return { html, status: res.status, responseTime };
  } catch (error) {
    console.error(`❌ Erreur fetch ${url}:`, error.message);
    return null;
  }
}

// Analyse SEO de la page
function analyzeHTML(html, url) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const report = { url, issues: [] };

  // Title
  const title = document.querySelector("title")?.textContent || "";
  if (!title) report.issues.push("⚠️ Title manquant");
  report.title = title;

  // Meta description
  const metaDesc = document.querySelector('meta[name="description"]')?.content || "";
  if (!metaDesc) report.issues.push("⚠️ Meta description manquante");
  report.metaDescription = metaDesc;

  // Meta robots
  const metaRobots = document.querySelector('meta[name="robots"]')?.content || "";
  if (!metaRobots) report.issues.push("⚠️ Meta robots manquant");
  report.metaRobots = metaRobots;

  // H1 et H2
  const h1s = Array.from(document.querySelectorAll("h1")).map(el => el.textContent);
  const h2s = Array.from(document.querySelectorAll("h2")).map(el => el.textContent);
  if (h1s.length !== 1) report.issues.push(`⚠️ ${h1s.length} H1 trouvés`);
  report.h1 = h1s;
  report.h2 = h2s;

  // Images alt
  const images = Array.from(document.querySelectorAll("img"));
  const imagesWithoutAlt = images.filter(img => !img.alt || img.alt.trim() === "").map(img => img.src);
  if (imagesWithoutAlt.length > 0) report.issues.push(`⚠️ ${imagesWithoutAlt.length} images sans alt`);
  report.imagesWithoutAlt = imagesWithoutAlt;

  // Liens internes
  const internalLinks = Array.from(document.querySelectorAll("a[href]"))
    .map(a => a.href)
    .filter(href => href.startsWith(SITE_URL));
  report.internalLinks = internalLinks;

  return report;
}

(async function main() {
  console.log(`🕵️ Audit SEO complet pour ${SITE_URL}\n`);

  // Vérification fichiers essentiels
  console.log("🔹 Vérification de robots.txt et sitemap.xml :");
  const robotsStatus = await checkFile(`${SITE_URL}/robots.txt`);
  const sitemapStatus = await checkFile(`${SITE_URL}/sitemap.xml`);
  console.log(`robots.txt : ${robotsStatus}`);
  console.log(`sitemap.xml : ${sitemapStatus}\n`);

  for (const page of pages) {
    const url = SITE_URL + page;
    console.log(`📄 Analyse de ${url} ...`);
    const pageData = await fetchPage(url);
    if (!pageData) continue;

    console.log(`Status HTTP : ${pageData.status} | Temps réponse : ${pageData.responseTime}ms`);
    const report = analyzeHTML(pageData.html, url);

    if (report.issues.length === 0) {
      console.log("✅ Aucun problème SEO détecté sur cette page");
    } else {
      console.log("⚠️ Problèmes détectés :", report.issues);
    }

    console.log("Title :", report.title);
    console.log("Meta description :", report.metaDescription);
    console.log("Meta robots :", report.metaRobots);
    console.log("H1 :", report.h1);
    console.log("H2 :", report.h2);
    console.log("Images sans alt :", report.imagesWithoutAlt);
    console.log("Liens internes :", report.internalLinks);
    console.log("\n-------------------------\n");
  }

  console.log("✅ Audit terminé. Applique les corrections pour optimiser le SEO et viser le Top 3 !");
})();
