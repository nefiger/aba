window.ABA_ADMIN_RENDER = {
  badgeClass(tone) {
    if (tone === "good") return "good";
    if (tone === "alert") return "alert";
    if (tone === "review") return "review";
    return "waiting";
  },

  icon(name) {
    const icons = {
      approve: `
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M5 10.5 8.2 13.7 15 6.9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
        </svg>`,
      info: `
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10 6.2h.01M8.9 9.3H10v4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
          <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/>
        </svg>`,
      route: `
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M4 6h7M9 4l2 2-2 2M16 14H9M11 12l-2 2 2 2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
        </svg>`,
      invoice: `
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M6 3.8h8l2 2v10.4l-2-.9-2 .9-2-.9-2 .9-2-.9-2 .9V3.8Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/>
          <path d="M8 8h4.8M8 11h4.8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/>
        </svg>`,
      activate: `
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <path d="M7 10.4 9.2 12.6 13.4 8.4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
        </svg>`,
      edit: `
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M4.6 13.9 13 5.5l1.5 1.5-8.4 8.4-2.3.8Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/>
          <path d="m11.9 6.6 1.5-1.5a1.6 1.6 0 0 1 2.2 0l.4.4a1.6 1.6 0 0 1 0 2.2l-1.5 1.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        </svg>`,
    };

    return icons[name] || "";
  },

  status(label, tone) {
    return `<span class="status ${this.badgeClass(tone)}">${label}</span>`;
  },

  statusDot(label, tone) {
    return `
      <span
        class="status-dot ${this.badgeClass(tone)}"
        aria-label="${label}"
        title="${label}"
        data-tooltip="${label}"
      ></span>
    `;
  },

  chip(label, tone) {
    return `<span class="chip ${this.badgeClass(tone)}">${label}</span>`;
  },

  value(label) {
    return `<button class="value-button" type="button">${label}</button>`;
  },

  select(options, selected, className = "select") {
    const items = options
      .map((option) => `<option${option === selected ? " selected" : ""}>${option}</option>`)
      .join("");
    return `<select class="${className}" aria-label="${selected}">${items}</select>`;
  },

  iconButton(icon, label, tone = "") {
    const toneClass = tone ? ` ${tone}` : "";
    return `
      <button
        class="icon-button${toneClass}"
        type="button"
        aria-label="${label}"
        title="${label}"
        data-tooltip="${label}"
      >
        ${this.icon(icon)}
      </button>
    `;
  },
};
