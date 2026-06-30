window.ABA_ADMIN_RENDER = {
  badgeClass(tone) {
    if (tone === "good") return "good";
    if (tone === "alert") return "alert";
    if (tone === "review") return "review";
    return "waiting";
  },

  status(label, tone) {
    return `<span class="status ${this.badgeClass(tone)}">${label}</span>`;
  },

  chip(label, tone) {
    return `<span class="chip ${this.badgeClass(tone)}">${label}</span>`;
  },

  select(options, selected, className = "select") {
    const items = options
      .map((option) => `<option${option === selected ? " selected" : ""}>${option}</option>`)
      .join("");
    return `<select class="${className}" aria-label="${selected}">${items}</select>`;
  },
};
