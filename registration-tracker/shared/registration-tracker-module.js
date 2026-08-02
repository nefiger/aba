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
  const stageCount = stageButtons.length;

  // Mobile compact nav: "Section X of N: <label>" plus Prev/Next, replacing the five
  // full-size stacked buttons as the default view at narrow widths. The full button list
  // stays reachable behind a toggle, so jumping to an arbitrary section (not just the
  // next/previous one) is still possible on mobile, not just on desktop's always-visible tabs.
  const compactLabel = document.querySelector("[data-stage-compact-label]");
  const compactPrev = document.querySelector("[data-stage-prev]");
  const compactNext = document.querySelector("[data-stage-next]");
  const compactToggle = document.querySelector("[data-stage-toggle]");
  const stageList = document.querySelector("[data-stage-list]");
  // Each button is <button><span>01</span>Label text</button> -- lastChild is the trailing
  // text node, so this skips the numeric prefix span rather than concatenating "01Label".
  const stageLabels = stageButtons.map((button) => button.lastChild?.textContent.trim() || button.textContent.trim());

  function refreshStageCompletion() {
    panels.forEach((panel) => {
      const stage = Number(panel.dataset.stagePanel);
      const complete = [...panel.querySelectorAll("[required]")].every((control) => control.checkValidity());
      const button = stageButtons.find((candidate) => Number(candidate.dataset.stageButton) === stage);
      if (button) button.classList.toggle("is-complete", complete);
    });
  }

  function showStage(stage) {
    panels.forEach((panel) => {
      panel.hidden = Number(panel.dataset.stagePanel) !== stage;
    });
    stageButtons.forEach((button) => {
      if (Number(button.dataset.stageButton) === stage) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
    if (compactLabel) compactLabel.textContent = `Section ${stage} of ${stageCount}: ${stageLabels[stage - 1] || ""}`;
    if (compactPrev) compactPrev.disabled = stage <= 1;
    if (compactNext) compactNext.disabled = stage >= stageCount;
    refreshStageCompletion();
  }

  stageButtons.forEach((button) => {
    button.addEventListener("click", () => showStage(Number(button.dataset.stageButton)));
  });

  compactPrev?.addEventListener("click", () => {
    const current = stageButtons.findIndex((button) => button.getAttribute("aria-current") === "step") + 1;
    if (current > 1) showStage(current - 1);
  });
  compactNext?.addEventListener("click", () => {
    const current = stageButtons.findIndex((button) => button.getAttribute("aria-current") === "step") + 1;
    if (current < stageCount) showStage(current + 1);
  });
  compactToggle?.addEventListener("click", () => {
    const expanded = compactToggle.getAttribute("aria-expanded") === "true";
    compactToggle.setAttribute("aria-expanded", String(!expanded));
    compactToggle.textContent = expanded ? "Show all sections" : "Hide all sections";
    // A class, not the `hidden` attribute: `hidden` maps to `display: none !important`
    // regardless of viewport, which would also hide the list at desktop widths where it
    // must always stay visible. Mobile's default-collapsed state is a CSS media-query
    // concern; this toggle only needs to add/remove the "expanded" state on top of it.
    stageList?.classList.toggle("is-expanded", !expanded);
  });

  intakeForm?.addEventListener("input", refreshStageCompletion);
  intakeForm?.addEventListener("change", refreshStageCompletion);

  if (panels.length) {
    showStage(1);

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
