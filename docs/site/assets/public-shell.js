document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const inSite = path.includes("/docs/site/");
  const inMembership = path.includes("/docs/membership-flow/");
  const inDatabase = path.includes("/docs/database/");

  if (!inSite && !inMembership && !inDatabase) return;

  const rel = {
    logo: inSite ? "./assets/aba-route1-compact.png" : "../site/assets/aba-route1-compact.png",
    logoHorizontal: inSite ? "./assets/aba-route1-horizontal.png" : "../site/assets/aba-route1-horizontal.png",
    home: inSite ? "./index.html" : "../site/index.html",
    about: inSite ? "./about.html" : "../site/about.html",
    membership: inMembership ? "./index.html" : "../membership-flow/index.html",
    explorer: inDatabase ? "./index.html" : "../database/index.html",
    tracker: "../registration-tracker/index.html",
    updates: inSite ? "./updates.html" : "../site/updates.html",
    governance: inSite ? "./governance-and-data.html" : "../site/governance-and-data.html"
  };

  document.querySelectorAll(".mark").forEach((mark) => {
    if (!mark.querySelector("img")) {
      mark.innerHTML = `<img src="${rel.logoHorizontal}" alt="African Biologicals Alliance logo">`;
    }
  });

  document.querySelectorAll(".mark img").forEach((img) => {
    img.setAttribute("src", rel.logoHorizontal);
    img.setAttribute("alt", "African Biologicals Alliance logo");
  });

  document.querySelectorAll(".brand-copy").forEach((copy) => {
    copy.innerHTML = `
      <strong>Collective voice. Biological transition. African-led growth.</strong>
      <span>Membership, registration intelligence, and biologicals knowledge for a stronger agricultural transition.</span>
    `;
  });

  const activeHref = inSite
    ? (path.endsWith("/about.html")
        ? rel.about
        : path.endsWith("/updates.html")
          ? rel.updates
          : path.endsWith("/governance-and-data.html")
            ? rel.about
            : rel.home)
    : inMembership
      ? rel.membership
      : rel.explorer;

  document.querySelectorAll(".nav a").forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === activeHref);
  });

  document.querySelectorAll(".nav-wrap > .nav-cta").forEach((cta) => {
    const label = cta.textContent?.trim().toLowerCase();
    const href = cta.getAttribute("href") || "";
    if (label === "join aba" || href.includes("membership-flow")) {
      cta.remove();
    }
  });

  const main = document.querySelector("main.shell");
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
