const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { id: "dashboard", href: "./index.html", title: "Dashboard", subtitle: "Overview" },
    ],
  },
  {
    label: "Membership",
    items: [
      { id: "applications", href: "./queue.html", title: "Applications", subtitle: "Review queue" },
      { id: "members", href: "./members.html", title: "Members", subtitle: "Relationship directory" },
    ],
  },
  {
    label: "Finance",
    items: [
      { id: "pending-activation", href: "./activation.html", title: "Member Finance", subtitle: "Dues and billing" },
      { id: "invoices", href: "./invoices.html", title: "Invoices", subtitle: "Fee records" },
      { id: "renewals", href: "./renewals.html", title: "Subscriptions", subtitle: "Billing lifecycle" },
    ],
  },
  {
    label: "Settings",
    items: [
      { id: "types", href: "./membership-types.html", title: "Membership Rules", subtitle: "Reference data" },
    ],
  },
  {
    label: "Chapters",
    items: [
      { id: "chapters", href: "./chapters.html", title: "Chapters", subtitle: "Chapter records" },
    ],
  },
  {
    label: "Registration Intelligence",
    items: [
      { id: "intelligence", href: "./registration-intelligence.html", title: "Registration Intelligence", subtitle: "Signals and bottlenecks" },
    ],
  },
  {
    label: "Contacts & Network",
    items: [
      { id: "network", href: "./contacts-network.html", title: "Contacts & Network", subtitle: "Relationship records" },
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
