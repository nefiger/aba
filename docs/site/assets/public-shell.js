document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const inSite = path.includes("/docs/site/");
  const inMembership = path.includes("/docs/membership-flow/");
  const inDatabase = path.includes("/docs/database/");

  if (!inSite && !inMembership && !inDatabase) return;

  const rel = {
    logo: inSite ? "./assets/aba-logo-new.png" : "../site/assets/aba-logo-new.png",
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
      mark.innerHTML = `<img src="${rel.logo}" alt="African Biologicals Alliance logo">`;
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
