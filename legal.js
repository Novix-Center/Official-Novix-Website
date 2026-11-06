// Shows a legal document from /legal/*.md. Copy your current tos.md and eula.md from the imager into /legal so both always match.
const DOCS = { terms: "tos.md", license: "eula.md", privacy: "privacy.md", community: "community.md" };
const esc = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const inline = (s) => esc(s)
  .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
  .replace(/(^|[\s(])\*([^*]+)\*/g, "$1<em>$2</em>")
  .replace(/\[([A-Z][^\]]*)\]/g, "<mark>[$1]</mark>");

function render(md) {
  let html = "", list = false;
  for (const raw of md.split("\n")) {
    const line = raw.trimEnd(), li = line.startsWith("- ");
    if (list && !li) { html += "</ul>"; list = false; }
    if (!line) continue;
    if (line.startsWith("# ")) html += `<h1>${inline(line.slice(2))}</h1>`;
    else if (line.startsWith("## ")) html += `<h2>${inline(line.slice(3))}</h2>`;
    else if (li) { if (!list) { html += "<ul>"; list = true; } html += `<li>${inline(line.slice(2))}</li>`; }
    else html += `<p>${inline(line)}</p>`;
  }
  return html + (list ? "</ul>" : "");
}

(async () => {
  const box = document.getElementById("doc");
  const file = DOCS[box.dataset.doc];
  try {
    const res = await fetch("legal/" + file, { cache: "no-cache" });
    if (!res.ok) throw new Error();
    const html = render(await res.text());
    box.innerHTML = (html.includes("<mark>")
      ? `<p class="draft">This is a draft. Sections highlighted in purple are unfinished and may change before Novix is sold.</p>` : "") + html;
  } catch {
    box.innerHTML = `<h1>${esc(box.dataset.title)}</h1><p>This document is being finalized and will be published here before Novix is sold.</p>`;
  }
})();
