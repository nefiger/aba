(() => {
  const root = document.querySelector(".tracker-module");
  if (!root) return;

  const referralField = document.getElementById("referral-source");
  const referral = new URLSearchParams(window.location.search).get("ref");
  if (referralField && referral) referralField.value = referral;

  const referenceIssued = document.getElementById("reference-issued");
  referenceIssued?.addEventListener("change", (event) => {
    const wrap = document.querySelector("[data-reference-reason]");
    const reason = document.getElementById("reference-reason");
    if (!wrap || !reason) return;
    wrap.hidden = event.target.value !== "not-available";
    // The wrapper's `hidden` state alone doesn't exempt a nested `required`
    // control from constraint validation, so toggle the constraint itself.
    reason.required = !wrap.hidden;
    if (wrap.hidden) reason.value = "";
  });

  const responsiblePersonStatus = document.getElementById("responsible-person-status");
  responsiblePersonStatus?.addEventListener("change", (event) => {
    const wrap = document.querySelector("[data-responsible-person-details]");
    if (wrap) wrap.hidden = event.target.value !== "on-behalf";
  });

  // Intake sections are tabbed, not a gated wizard: any section can be opened at any
  // time, filled or not, so the participant can see the whole form before committing
  // to it. The qualifier fieldset sits outside this tab set entirely.
  const intakeForm = document.querySelector("[data-prototype-form='tracker-intake']");
  const panels = intakeForm ? [...intakeForm.querySelectorAll("[data-stage-panel]")] : [];
  const stageButtons = [...document.querySelectorAll("[data-stage-button]")];

  function showStage(stage) {
    panels.forEach((panel) => {
      panel.hidden = Number(panel.dataset.stagePanel) !== stage;
    });
    stageButtons.forEach((button) => {
      if (Number(button.dataset.stageButton) === stage) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
  }

  stageButtons.forEach((button) => {
    button.addEventListener("click", () => showStage(Number(button.dataset.stageButton)));
  });

  if (panels.length) {
    // Because tabbing between sections is never gated, nothing else guarantees a
    // section was actually completed before the participant tries to send this.
    // Hidden fields are exempt from constraint validation, so every section has to
    // be revealed right before validation runs, or unfinished sections the
    // participant never opened would silently pass. This has to happen before
    // app.js's own submit/review-confirm handling reads the form, which a
    // capture-phase document listener guarantees regardless of listener order.
    document.addEventListener("click", (event) => {
      const triggersValidation = event.target.closest("[data-prototype-form='tracker-intake'] button[type='submit']")
        || event.target.closest("[data-review-confirm]");
      if (triggersValidation) panels.forEach((panel) => { panel.hidden = false; });
    }, true);

    // app.js focuses a fieldset's <legend> when "Edit" is used from the review
    // screen (or on a validation failure). Re-collapse to that section's tab so
    // the tabbed view is restored instead of leaving everything expanded.
    document.addEventListener("focusin", (event) => {
      const legend = event.target.closest("fieldset.form-section legend");
      const panel = legend?.closest("[data-stage-panel]");
      if (panel) showStage(Number(panel.dataset.stagePanel));
    });
  }

  document.querySelector("[data-add-another]")?.addEventListener("click", () => {
    if (!intakeForm) return;
    intakeForm.reset();
    document.querySelector("[data-reference-reason]")?.setAttribute("hidden", "");
    document.querySelector("[data-responsible-person-details]")?.setAttribute("hidden", "");
    intakeForm.querySelectorAll(".field-error").forEach((error) => error.remove());
    intakeForm.querySelectorAll("[aria-invalid]").forEach((control) => {
      control.removeAttribute("aria-invalid");
      control.removeAttribute("aria-describedby");
    });
    const errorSummary = intakeForm.querySelector("[data-error-summary]");
    if (errorSummary) {
      errorSummary.hidden = true;
      errorSummary.querySelector("ul")?.replaceChildren();
    }
    const success = document.querySelector("[data-success='tracker-intake']");
    if (success) success.dataset.visible = "false";
    showStage(1);
    intakeForm.hidden = false;
    intakeForm.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });
})();
