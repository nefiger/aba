const routes = [
  ["home", "Home", "index.html"],
  ["about", "About", "about.html"],
  ["membership", "Membership", "membership.html"],
  ["network", "Technical Network", "technical-network.html"],
  ["tracker", "Registration Tracker", "registration-tracker.html"],
];

class AbaHeader extends HTMLElement {
  connectedCallback() {
    const current = document.body.dataset.page || "";
    const links = routes.map(([key, label, href]) => `
      <li><a href="${href}" ${current === key ? 'aria-current="page"' : ""}>${label}</a></li>
    `).join("");

    this.innerHTML = `
      <a class="skip-link" href="#main-content">Skip to main content</a>
      <header class="site-header">
        <div class="site-header__inner">
          <a class="brand" href="index.html" aria-label="African Biologicals Alliance home">
            <img src="assets/aba-logo-final.png" alt="">
            <span class="brand__name">African Biologicals Alliance<small>In Africa · For Africa</small></span>
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-navigation">
            <span class="sr-only">Open navigation</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
          <nav class="site-nav" id="site-navigation" aria-label="Primary navigation" data-open="false">
            <ul class="site-nav__links">${links}</ul>
            <a class="button button--primary site-nav__action" href="membership-interest.html">Express interest</a>
          </nav>
        </div>
      </header>`;

    const toggle = this.querySelector(".nav-toggle");
    const nav = this.querySelector(".site-nav");
    toggle.addEventListener("click", () => {
      const open = nav.dataset.open !== "true";
      nav.dataset.open = String(open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.querySelector(".sr-only").textContent = open ? "Close navigation" : "Open navigation";
    });
  }
}

class AbaFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="shell site-footer__main">
          <div class="site-footer__brand">
            <img src="assets/aba-logo-final.png" alt="African Biologicals Alliance">
            <p>An African alliance working on the regulatory and market barriers that biologicals companies cannot solve alone.</p>
          </div>
          <div class="site-footer__nav">
            <section aria-labelledby="footer-explore">
              <h2 id="footer-explore">Explore</h2>
              <ul>
                <li><a href="about.html">About ABA</a></li>
                <li><a href="membership.html">Membership</a></li>
                <li><a href="technical-network.html">Technical Network</a></li>
                <li><a href="registration-tracker.html">Registration Tracker</a></li>
              </ul>
            </section>
            <section aria-labelledby="footer-connect">
              <h2 id="footer-connect">Connect</h2>
              <ul>
                <li><a href="membership-interest.html">Membership interest</a></li>
                <li><a href="privacy.html">Privacy and data use</a></li>
              </ul>
            </section>
          </div>
        </div>
        <div class="shell site-footer__legal">African Biologicals Alliance · <span data-year></span> · Based in South Africa and open to participation across Africa.</div>
      </footer>`;
    this.querySelector("[data-year]").textContent = new Date().getFullYear();
  }
}

customElements.define("aba-header", AbaHeader);
customElements.define("aba-footer", AbaFooter);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.setProperty("--i", String(Math.min(index, 6)));
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.dataset.revealed = "true";
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => { element.dataset.revealed = "true"; });
}

const params = new URLSearchParams(window.location.search);
const presentationState = params.get("state");
if (["error", "duplicate", "unavailable"].includes(presentationState)) {
  const statePanel = document.querySelector(`[data-form-state='${presentationState}']`);
  if (statePanel) statePanel.hidden = false;
  if (presentationState === "unavailable") {
    const unavailableForm = document.querySelector("[data-prototype-form]");
    if (unavailableForm) unavailableForm.hidden = true;
  }
}

if (presentationState === "success") {
  const stateForm = document.querySelector("[data-prototype-form]");
  const success = stateForm ? document.querySelector(`[data-success='${stateForm.dataset.prototypeForm}']`) : null;
  if (stateForm) stateForm.hidden = true;
  if (success) success.dataset.visible = "true";
}

const fieldNames = {
  receive_updates: "Email permission",
  values_alignment: "Purpose acknowledgement",
  code_of_conduct: "Code of conduct acknowledgement",
  network_follow_up: "Application contact permission",
};

function getFieldName(control) {
  if (fieldNames[control.name]) return fieldNames[control.name];
  const explicit = control.id ? document.querySelector(`label[for='${control.id}']`) : null;
  const wrapped = control.closest("label");
  const label = explicit || wrapped;
  return (label?.textContent || control.name || "This field")
    .replace(/\(optional\)/gi, "")
    .replace(/\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function validationMessage(control) {
  const name = getFieldName(control);
  if (control.validity.valueMissing) return `${name} is required.`;
  if (control.validity.typeMismatch && control.type === "email") return "Enter an email address in the format name@example.com.";
  if (control.validity.typeMismatch && control.type === "url") return "Enter a complete link beginning with https://.";
  return `Check ${name.toLowerCase()} and try again.`;
}

function clearFormErrors(form) {
  form.querySelectorAll("[aria-invalid='true']").forEach((control) => {
    control.removeAttribute("aria-invalid");
    control.removeAttribute("aria-describedby");
  });
  form.querySelectorAll(".field-error").forEach((error) => error.remove());
  const summary = form.querySelector("[data-error-summary]");
  if (summary) {
    summary.hidden = true;
    const list = summary.querySelector("ul");
    if (list) list.replaceChildren();
  }
}

function addFormError(control, message, index, summaryList) {
  if (!control.id) control.id = `form-field-${control.name || "item"}-${index}`;
  const errorId = `${control.id}-error`;
  control.setAttribute("aria-invalid", "true");
  control.setAttribute("aria-describedby", errorId);

  const error = document.createElement("p");
  error.className = "field-error";
  error.id = errorId;
  error.textContent = message;

  const choice = control.closest(".choice");
  const field = control.closest(".field");
  (choice || field || control).insertAdjacentElement("afterend", error);

  const item = document.createElement("li");
  const link = document.createElement("a");
  link.href = `#${control.id}`;
  link.textContent = message;
  item.append(link);
  summaryList.append(item);
}

function validatePrototypeForm(form) {
  clearFormErrors(form);
  const summary = form.querySelector("[data-error-summary]");
  if (!summary) return form.checkValidity();
  const summaryList = summary.querySelector("ul");
  const invalid = [...form.querySelectorAll("input, select, textarea")].filter((control) => !control.checkValidity());

  invalid.forEach((control, index) => addFormError(control, validationMessage(control), index, summaryList));

  form.querySelectorAll("[data-required-group]").forEach((group, groupIndex) => {
    const name = group.dataset.requiredGroup;
    const controls = [...group.querySelectorAll(`input[name='${name}']`)];
    if (controls.some((control) => control.checked) || controls.length === 0) return;
    addFormError(controls[0], "Choose at least one area where you can contribute.", invalid.length + groupIndex, summaryList);
  });

  if (summaryList.children.length === 0) return true;
  summary.hidden = false;
  summary.focus();
  return false;
}

document.querySelectorAll("[data-prototype-form]").forEach((form) => {
  form.addEventListener("input", (event) => {
    const control = event.target;
    if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement)) return;
    const requiredGroup = control.closest("[data-required-group]");
    if (requiredGroup && control.name === requiredGroup.dataset.requiredGroup) {
      const groupControls = [...requiredGroup.querySelectorAll(`input[name='${control.name}']`)];
      if (groupControls.some((item) => item.checked)) {
        const markedControl = groupControls.find((item) => item.getAttribute("aria-invalid") === "true");
        if (markedControl) {
          const groupErrorId = markedControl.getAttribute("aria-describedby");
          markedControl.removeAttribute("aria-invalid");
          markedControl.removeAttribute("aria-describedby");
          if (groupErrorId) document.getElementById(groupErrorId)?.remove();
          const groupSummary = form.querySelector("[data-error-summary]");
          groupSummary?.querySelector(`a[href='#${markedControl.id}']`)?.closest("li")?.remove();
          if (groupSummary && !groupSummary.querySelector("li")) groupSummary.hidden = true;
        }
      }
    }
    if (control.getAttribute("aria-invalid") !== "true" || !control.checkValidity()) return;
    const errorId = control.getAttribute("aria-describedby");
    const controlId = control.id;
    control.removeAttribute("aria-invalid");
    control.removeAttribute("aria-describedby");
    if (errorId) document.getElementById(errorId)?.remove();
    const summary = form.querySelector("[data-error-summary]");
    const summaryLink = controlId ? summary?.querySelector(`a[href='#${controlId}']`) : null;
    summaryLink?.closest("li")?.remove();
    if (summary && !summary.querySelector("li")) summary.hidden = true;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const valid = form.hasAttribute("novalidate") ? validatePrototypeForm(form) : form.checkValidity();
    if (!valid) return;
    const button = form.querySelector("button[type='submit']");
    const original = button.textContent;
    button.disabled = true;
    button.textContent = button.dataset.loadingLabel || "Sending…";
    window.setTimeout(() => {
      form.hidden = true;
      const success = document.querySelector(`[data-success='${form.dataset.prototypeForm}']`);
      if (success) {
        success.dataset.visible = "true";
        success.setAttribute("tabindex", "-1");
        success.focus();
      }
      button.disabled = false;
      button.textContent = original;
    }, 450);
  });
});
