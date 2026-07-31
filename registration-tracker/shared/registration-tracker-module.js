(() => {
  const root = document.querySelector(".tracker-module");
  if (!root) return;

  const referralField = document.getElementById("referral-source");
  const referral = new URLSearchParams(window.location.search).get("ref");
  if (referralField && referral) referralField.value = referral;

  const referenceIssued = document.getElementById("reference-issued");
  referenceIssued?.addEventListener("change", (event) => {
    const wrap = document.querySelector("[data-reference-reason]");
    if (!wrap) return;
    wrap.hidden = event.target.value !== "not-available";
    const reason = document.getElementById("reference-reason");
    if (wrap.hidden && reason) reason.value = "";
  });

  const responsiblePersonStatus = document.getElementById("responsible-person-status");
  responsiblePersonStatus?.addEventListener("change", (event) => {
    const wrap = document.querySelector("[data-responsible-person-details]");
    if (wrap) wrap.hidden = event.target.value !== "on-behalf";
  });

  document.querySelector("[data-add-another]")?.addEventListener("click", () => {
    const form = document.querySelector("[data-prototype-form='tracker-intake']");
    if (!form) return;
    form.reset();
    document.querySelector("[data-reference-reason]")?.setAttribute("hidden", "");
    document.querySelector("[data-responsible-person-details]")?.setAttribute("hidden", "");
    form.querySelectorAll(".field-error").forEach((error) => error.remove());
    form.querySelectorAll("[aria-invalid]").forEach((control) => {
      control.removeAttribute("aria-invalid");
      control.removeAttribute("aria-describedby");
    });
    const errorSummary = form.querySelector("[data-error-summary]");
    if (errorSummary) {
      errorSummary.hidden = true;
      errorSummary.querySelector("ul")?.replaceChildren();
    }
    const success = document.querySelector("[data-success='tracker-intake']");
    if (success) success.dataset.visible = "false";
    form.hidden = false;
    form.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });
})();
