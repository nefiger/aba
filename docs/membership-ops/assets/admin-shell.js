const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { id: "dashboard", href: "./index.html", title: "Dashboard", subtitle: "Admin home" },
    ],
  },
  {
    label: "Membership",
    items: [
      { id: "applications", href: "./queue.html", title: "Applications", subtitle: "Review queue" },
      { id: "members", href: "./members.html", title: "Members", subtitle: "Relationship directory" },
      { id: "types", href: "./membership-types.html", title: "Types & Policy", subtitle: "Membership rules" },
    ],
  },
  {
    label: "Finance",
    items: [
      { id: "pending-activation", href: "./activation.html", title: "Pending Activation", subtitle: "Activation gate" },
      { id: "invoices", href: "./invoices.html", title: "Invoices", subtitle: "Fee records" },
      { id: "renewals", href: "./renewals.html", title: "Renewals", subtitle: "Lapsed and due" },
    ],
  },
  {
    label: "Chapters",
    items: [
      { id: "chapters", href: "./chapters.html", title: "Chapters", subtitle: "Stub module" },
    ],
  },
  {
    label: "Registration Intelligence",
    items: [
      { id: "intelligence", href: "./registration-intelligence.html", title: "Registration Intelligence", subtitle: "Stub module" },
    ],
  },
  {
    label: "Contacts & Network",
    items: [
      { id: "network", href: "./contacts-network.html", title: "Contacts & Network", subtitle: "Stub module" },
    ],
  },
];

function renderSidebar() {
  const sidebar = document.querySelector("[data-admin-sidebar]");
  if (!sidebar) return;

  const activePage = document.body.dataset.adminPage || "";

  const nav = NAV_GROUPS.map((group) => {
    const links = group.items
      .map((item) => {
        const active = item.id === activePage ? " active" : "";
        return `<a class="nav-link${active}" href="${item.href}"><strong>${item.title}</strong><span>${item.subtitle}</span></a>`;
      })
      .join("");

    return `<div class="nav-group"><div class="nav-label">${group.label}</div>${links}</div>`;
  }).join("");

  sidebar.className = "admin-sidebar";
  sidebar.innerHTML = `
    <div class="sidebar-brand">
      <div class="brand-mark">ABA</div>
      <div>
        <div class="eyebrow">Staff Console</div>
        <h1>Membership Administration</h1>
      </div>
    </div>
    <nav class="sidebar-nav" aria-label="Membership administration">
      ${nav}
    </nav>
  `;
}

document.addEventListener("DOMContentLoaded", renderSidebar);
