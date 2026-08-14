(() => {
  const root = document.querySelector(".tracker-module");
  if (!root) return;

  const referralField = document.getElementById("referral-source");
  const referral = new URLSearchParams(window.location.search).get("ref");
  if (referralField && referral) referralField.value = referral;

  const referenceData = window.ABA_TRACKER_REFERENCE;
  const legalPathway = document.getElementById("legal-pathway");
  const registrationType = document.getElementById("registration-type");
  const registrationTypeWrap = document.querySelector("[data-agricultural-remedy-type]");
  const registrationSourceContext = document.querySelector("[data-registration-source-context]");
  const pathwayGuidance = document.querySelector("[data-pathway-guidance]");
  const pathwayFit = document.getElementById("pathway-fit");
  const pathwayFitDetails = document.querySelector("[data-pathway-fit-details]");
  const bestFitPathway = document.getElementById("believed-best-fit-pathway");
  const pathwayFitReason = document.getElementById("pathway-fit-reason");

  const contractFields = {
    submitted_legal_pathway: document.getElementById("submitted-legal-pathway"),
    registration_type_key: document.getElementById("registration-type-key"),
    registration_type_label: document.getElementById("registration-type-label"),
    service_request_code: document.getElementById("service-request-code"),
    service_request_row: document.getElementById("service-request-row"),
    source_document_version: document.getElementById("source-document-version"),
    official_timeframe_days: document.getElementById("official-timeframe-days"),
    official_timeframe_source: document.getElementById("official-timeframe-source"),
  };

  function setContractField(name, value = "") {
    if (contractFields[name]) contractFields[name].value = value == null ? "" : String(value);
  }

  function clearRegistrationContract() {
    [
      "registration_type_key",
      "registration_type_label",
      "service_request_code",
      "service_request_row",
      "source_document_version",
      "official_timeframe_days",
      "official_timeframe_source",
    ].forEach((name) => setContractField(name));
  }

  function renderContext(container, heading, text, link) {
    if (!container) return;
    container.replaceChildren();
    const strong = document.createElement("strong");
    strong.textContent = heading;
    const span = document.createElement("span");
    span.textContent = text;
    container.append(strong, span);
    if (link) {
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.textContent = link.label;
      container.append(anchor);
    }
    container.hidden = false;
  }

  function updateRegistrationTypeContract() {
    clearRegistrationContract();
    if (!registrationType || !referenceData) return;
    registrationType.setCustomValidity("");
    if (registrationSourceContext) registrationSourceContext.hidden = true;

    if (registrationType.value === "reinstatement") {
      registrationType.setCustomValidity("This tracker accepts new registrations only. It cannot accept a reinstatement.");
      renderContext(
        registrationSourceContext,
        "Do not use this form for a reinstatement.",
        "The tracker accepts new applications but does not currently collect reinstatements of lapsed registrations.",
        { href: "../resources/index.html#tracker-scope", label: "See what the tracker accepts" },
      );
      return;
    }

    if (registrationType.value === "not_sure") {
      setContractField("registration_type_key", "not_sure");
      setContractField("registration_type_label", "Not sure");
      renderContext(
        registrationSourceContext,
        "Not sure is okay.",
        "ABA may contact you to confirm the registration type.",
      );
      return;
    }

    const selected = referenceData.registration_types?.[registrationType.value];
    if (!selected) return;
    Object.entries(selected).forEach(([name, value]) => setContractField(name, value));
    setContractField("source_document_version", referenceData.source_document_version);
    setContractField("official_timeframe_source", referenceData.official_timeframe_source);
    renderContext(
      registrationSourceContext,
      selected.registration_type_label,
      `Service code ${selected.service_request_code} · published timeframe ${selected.official_timeframe_days} calendar days.`,
    );
  }

  function updateLegalPathway() {
    if (!legalPathway || !registrationType || !registrationTypeWrap) return;
    const isAgriculturalRemedy = legalPathway.value === "agricultural_remedy";
    setContractField("submitted_legal_pathway", legalPathway.value);
    registrationTypeWrap.hidden = !isAgriculturalRemedy;
    registrationType.required = isAgriculturalRemedy;
    if (!isAgriculturalRemedy) {
      registrationType.value = "";
      registrationType.setCustomValidity("");
      clearRegistrationContract();
      if (registrationSourceContext) registrationSourceContext.hidden = true;
    }
    if (pathwayGuidance) {
      pathwayGuidance.hidden = !legalPathway.value || isAgriculturalRemedy;
      if (!pathwayGuidance.hidden) {
        const heading = legalPathway.value === "fertilizer"
          ? "Fertilizer pathway selected."
          : "Not sure is okay.";
        const copy = legalPathway.value === "fertilizer"
          ? "You can continue. ABA will include this application in general registration insights, but will not label it overdue until the applicable Fertilizer timeframe is confirmed."
          : "ABA may contact you to confirm the pathway.";
        renderContext(pathwayGuidance, heading, copy);
      }
    }
    if (isAgriculturalRemedy) updateRegistrationTypeContract();
  }

  legalPathway?.addEventListener("change", updateLegalPathway);
  registrationType?.addEventListener("change", updateRegistrationTypeContract);

  function updatePathwayFitDetails() {
    if (!pathwayFitDetails || !bestFitPathway || !pathwayFitReason) return;
    const show = pathwayFit?.value === "does_not_fit";
    pathwayFitDetails.hidden = !show;
    bestFitPathway.required = show;
    pathwayFitReason.required = show;
    if (!show) {
      bestFitPathway.value = "";
      pathwayFitReason.value = "";
      const note = document.getElementById("pathway-fit-note");
      if (note) note.value = "";
    }
  }

  pathwayFit?.addEventListener("change", updatePathwayFitDetails);

  const currentStatus = document.getElementById("current-status");
  const officialStage = document.getElementById("official-stage");
  const statusStageMap = {
    "Submitted to the registrar": "Received",
    "Received or acknowledged": "Verification",
    "In verification": "Verification",
    "In scientific screening": "Scientific screening",
    "In evaluation": "Evaluation",
    "Additional information requested": "Referred back — stage confirmed during ABA review",
    "Response submitted": "Scientific screening or evaluation — confirmed during ABA review",
    "Awaiting a decision": "Decision",
    "Approved or registered": "Decision — registered",
    Rejected: "Decision — rejected",
    Withdrawn: "Decision — withdrawn",
    "Not sure": "Pending ABA review",
  };

  function updateOfficialStage() {
    if (!currentStatus || !officialStage) return;
    officialStage.value = statusStageMap[currentStatus.value] || "";
  }

  currentStatus?.addEventListener("change", updateOfficialStage);

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
    updateLegalPathway();
    updateRegistrationTypeContract();
    updatePathwayFitDetails();
    updateOfficialStage();
    showStage(1);
    intakeForm.hidden = false;
    intakeForm.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });

  updateLegalPathway();
  updatePathwayFitDetails();
  updateOfficialStage();
})();
