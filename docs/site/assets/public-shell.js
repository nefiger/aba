document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const inSite = path.includes("/docs/site/");
  const inMembership = path.includes("/docs/membership-flow/");
  const inDatabase = path.includes("/docs/database/");
  const inTrackerDocs = path.includes("/docs/registration-tracker/");
  const inTrackerWorkspace = path.includes("/registration-tracker/");

  if (!inSite && !inMembership && !inDatabase && !inTrackerDocs && !inTrackerWorkspace) return;

  const shellStylesheet = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .find((link) => link.getAttribute("href")?.includes("public-shell.css"));
  if (shellStylesheet) {
    document.head.appendChild(shellStylesheet);
  }

  const nestedTrackerPage = /\/registration-tracker\/[^/]+\/index\.html$/.test(path);
  const trackerDocsPrefix = inTrackerWorkspace
    ? (nestedTrackerPage ? "../../docs/" : "../docs/")
    : "";
  const trackerSitePrefix = inTrackerWorkspace
    ? `${trackerDocsPrefix}site/`
    : "";

  const rel = {
    logo: inSite
      ? "./assets/aba-route1-compact.png"
      : inTrackerDocs
        ? "../site/assets/aba-route1-compact.png"
        : inTrackerWorkspace
          ? `${trackerSitePrefix}assets/aba-route1-compact.png`
          : "../site/assets/aba-route1-compact.png",
    logoHorizontal: inSite
      ? "./assets/aba-route1-horizontal.png"
      : inTrackerDocs
        ? "../site/assets/aba-route1-horizontal.png"
        : inTrackerWorkspace
          ? `${trackerSitePrefix}assets/aba-route1-horizontal.png`
          : "../site/assets/aba-route1-horizontal.png",
    home: inSite
      ? "./index.html"
      : inTrackerDocs
        ? "../site/index.html"
        : inTrackerWorkspace
          ? `${trackerSitePrefix}index.html`
          : "../site/index.html",
    about: inSite
      ? "./about.html"
      : inTrackerDocs
        ? "../site/about.html"
        : inTrackerWorkspace
          ? `${trackerSitePrefix}about.html`
          : "../site/about.html",
    membership: inMembership
      ? "./index.html"
      : inTrackerDocs
        ? "../membership-flow/index.html"
        : inTrackerWorkspace
          ? `${trackerDocsPrefix}membership-flow/index.html`
          : "../membership-flow/index.html",
    explorer: inDatabase
      ? "./index.html"
      : inTrackerDocs
        ? "../database/index.html"
        : inTrackerWorkspace
          ? `${trackerDocsPrefix}database/index.html`
          : "../database/index.html",
    tracker: inTrackerDocs
      ? "./index.html"
      : inTrackerWorkspace
        ? `${trackerDocsPrefix}registration-tracker/index.html`
        : "../registration-tracker/index.html",
    updates: inSite
      ? "./updates.html"
      : inTrackerDocs
        ? "../site/updates.html"
        : inTrackerWorkspace
          ? `${trackerSitePrefix}updates.html`
          : "../site/updates.html",
    governance: inSite
      ? "./governance-and-data.html"
      : inTrackerDocs
        ? "../site/governance-and-data.html"
        : inTrackerWorkspace
          ? `${trackerSitePrefix}governance-and-data.html`
          : "../site/governance-and-data.html"
  };

  const activeHref = inSite
    ? (path.endsWith("/about.html")
        ? rel.about
        : path.endsWith("/updates.html")
          ? rel.about
          : path.endsWith("/governance-and-data.html")
            ? rel.about
            : path.endsWith("/technical-network.html")
              ? rel.about
              : path.endsWith("/workspace.html")
                ? rel.about
                : path.endsWith("/operator-workspace.html")
                  ? rel.about
                  : rel.home)
    : inTrackerDocs || inTrackerWorkspace
      ? rel.tracker
    : inMembership
      ? rel.membership
      : rel.explorer;

  document.querySelectorAll(".topbar").forEach((header) => {
    header.innerHTML = `
      <div class="brand">
        <a class="mark" href="${rel.home}" aria-label="African Biologicals Alliance home">
          <img src="${rel.logoHorizontal}" alt="African Biologicals Alliance logo">
        </a>
        <div class="brand-copy">
          <strong>Collective voice. Biological transition. African-led growth.</strong>
          <span>Membership, registration intelligence, and biologicals knowledge for a stronger agricultural transition.</span>
        </div>
      </div>
      <div class="nav-wrap">
        <nav class="nav" aria-label="Primary navigation">
          <a href="${rel.home}"${activeHref === rel.home ? ' class="active"' : ""}>Home</a>
          <a href="${rel.about}"${activeHref === rel.about ? ' class="active"' : ""}>About</a>
          <a href="${rel.membership}"${activeHref === rel.membership ? ' class="active"' : ""}>Membership</a>
          <a href="${rel.explorer}"${activeHref === rel.explorer ? ' class="active"' : ""}>Biologicals Explorer</a>
          <a href="${rel.tracker}"${activeHref === rel.tracker ? ' class="active"' : ""}>Track Registrations</a>
        </nav>
      </div>
    `;
  });

  const main = document.querySelector("main.shell, main.page.shell, main.page, main.shell.page");
  if (!main) return;

  const existingFooter = main.querySelector(":scope > footer");
  if (existingFooter) existingFooter.remove();

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.setAttribute("aria-label", "Site footer");
  const year = new Date().getFullYear();
  footer.innerHTML = `
    <div class="site-footer__inner">
      <div class="site-footer__grid">
        <section class="site-footer__block">
          <div class="site-footer__eyebrow">African Biologicals Alliance</div>
          <div class="site-footer__title">Collective voice for African biologicals.</div>
          <p>Strengthening Africa's biologicals sector through voice, visibility, and market access.</p>
          <p>South Africa is the current operating base, while participation and intelligence are Africa-wide.</p>
        </section>
        <nav class="site-footer__block site-footer__nav" aria-label="Explore ABA">
          <div class="site-footer__eyebrow">Explore</div>
          <a href="${rel.about}">About ABA</a>
          <a href="${rel.membership}">Membership</a>
          <a href="${rel.explorer}">Biologicals Explorer</a>
          <a href="${rel.tracker}">Track Registrations</a>
          <a href="${rel.updates}">Updates</a>
        </nav>
        <nav class="site-footer__block site-footer__nav" aria-label="Governance and data">
          <div class="site-footer__eyebrow">Governance &amp; Data</div>
          <a href="${rel.governance}#privacy-popia">Privacy &amp; POPIA</a>
          <a href="${rel.governance}#terms-of-use">Terms of use</a>
          <a href="${rel.governance}#member-terms">Member terms</a>
          <a href="${rel.governance}#data-consent">Data and consent</a>
        </nav>
      </div>
      <div class="site-footer__meta">
        <p class="site-footer__closing">Membership, tracker, and update submissions are handled under ABA privacy and route-specific data consent terms.</p>
        <p class="site-footer__copyright">© ${year} African Biologicals Alliance. All rights reserved.</p>
      </div>
    </div>
  `;

  main.appendChild(footer);
});
