(() => {
  const root = document.querySelector(".tracker-module");
  if (!root) return;

  const qualificationForm = document.querySelector("[data-qualification-form]");
  if (qualificationForm) {
    const outcome = document.querySelector("[data-qualification-outcome]");
    const status = document.querySelector("[data-qualification-status]");
    const intakeHref = qualificationForm.dataset.intakeHref;

    const outcomeCopy = {
      eligible: {
        title: "This tracker is ready for your registration.",
        body: "You can start the five-stage intake for one South African Act 36 new registration.",
        action: `<a class="tracker-button tracker-button--orange" href="${intakeHref}">Start a new registration</a>`,
      },
      unauthorized: {
        title: "Please send this link to the responsible person.",
        body: "ABA needs the registration owner, responsible person, or someone authorized to provide the information to complete the intake.",
        action: "",
      },
      service: {
        title: "This registration service is outside the first release.",
        body: "The current tracker accepts new registrations only. Amendments, renewals, appeals, permits, source changes, reinstatements, and post-registration services are not included.",
        action: "",
      },
      jurisdiction: {
        title: "Structured capture currently covers South Africa under Act 36.",
        body: "Do not use this form for another country or regulatory regime. ABA is limiting the first release so that the questions and published timeframe remain accurate.",
        action: "",
      },
      submission: {
        title: "Complete the regulator submission steps before starting.",
        body: "Start after the Application Form, Service Request Form, and proof of payment have all been submitted. Return after completing those steps.",
        action: "",
      },
      incomplete: {
        title: "Answer all four questions.",
        body: "Your answers are used only to show the appropriate next step and are not stored.",
        action: "",
      },
    };

    function renderQualification() {
      const formData = new FormData(qualificationForm);
      const registration = formData.get("registration_scope");
      const jurisdiction = formData.get("jurisdiction_scope");
      const authority = formData.get("authority");
      const submission = formData.get("submission_scope");
      let key = "incomplete";

      if (registration && jurisdiction && authority && submission) {
        if (registration !== "new") key = "service";
        else if (jurisdiction !== "south-africa-act-36") key = "jurisdiction";
        else if (authority !== "yes") key = "unauthorized";
        else if (submission !== "submitted") key = "submission";
        else key = "eligible";
      }

      const selected = outcomeCopy[key];
      outcome.innerHTML = `<h3>${selected.title}</h3><p>${selected.body}</p>${selected.action}`;
      outcome.hidden = false;
      status.textContent = `${selected.title} ${selected.body}`;
      outcome.scrollIntoView({ block: "nearest", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }

    qualificationForm.addEventListener("submit", (event) => {
      event.preventDefault();
      renderQualification();
    });
  }

  const intakeForm = document.querySelector("[data-tracker-intake]");
  if (!intakeForm) return;

  const panels = [...intakeForm.querySelectorAll("[data-stage-panel]")];
  const stageButtons = [...document.querySelectorAll("[data-stage-button]")];
  const review = document.querySelector("[data-review]");
  const confirmation = document.querySelector("[data-confirmation]");
  const reviewGrid = document.querySelector("[data-review-grid]");
  const reviewError = document.querySelector("[data-review-error]");
  const liveStatus = document.querySelector("[data-intake-status]");
  const submitButton = document.querySelector("[data-submit-registration]");
  const acknowledgementIds = ["processing-acknowledgement", "insight-acknowledgement"];
  let currentStage = 1;

  const stageFieldIds = {
    1: [
      "authority-confirmation", "participant-name", "participant-email", "participant-role",
      "organisation-name", "organisation-role", "organisation-country",
      "contact-permission", "aba-relationship",
    ],
    2: ["product-name", "functional-category", "legal-pathway", "registration-type"],
    3: ["current-status", "status-date", "decision-expectation", "reference-issued"],
    4: [
      "application-form-submitted", "service-request-form-submitted",
      "proof-of-payment-submitted", "sacnasp-status",
    ],
    5: acknowledgementIds,
  };

  const reviewGroups = [
    {
      title: "You and your organisation",
      stage: 1,
      fields: [
        ["Participant", "participant-name"], ["Email", "participant-email"], ["Role", "participant-role"],
        ["Organisation", "organisation-name"], ["Organisation role", "organisation-role"],
        ["Country", "organisation-country"], ["ABA relationship", "aba-relationship"],
        ["Authority confirmed", "authority-confirmation"], ["Contact about this submission", "contact-permission"],
      ],
    },
    {
      title: "Product and new-registration type",
      stage: 2,
      fields: [
        ["Product", "product-name"], ["Functional category", "functional-category"],
        ["Legal pathway", "legal-pathway"], ["New-registration type", "registration-type"],
      ],
    },
    {
      title: "Current status",
      stage: 3,
      fields: [
        ["Reported status", "current-status"], ["Status date", "status-date"],
        ["Decision expectation", "decision-expectation"], ["Official reference", "reference-issued"],
        ["Reference reason", "reference-reason"],
      ],
    },
    {
      title: "Submission confirmation and accountability",
      stage: 4,
      fields: [
        ["Application Form submitted", "application-form-submitted"],
        ["Service Request Form submitted", "service-request-form-submitted"],
        ["Proof of payment submitted", "proof-of-payment-submitted"],
        ["SACNASP status", "sacnasp-status"], ["Responsible person", "responsible-person-name"],
        ["Responsible person role", "responsible-person-role"], ["Residency or office", "residency-information"],
        ["Authority or appointment", "appointment-confirmation"],
      ],
    },
    {
      title: "Data use and submission",
      stage: 5,
      fields: [
        ["Processing acknowledgement", "processing-acknowledgement"],
        ["Combined, non-named insights acknowledgement", "insight-acknowledgement"],
      ],
    },
  ];

  function fieldValue(id) {
    const control = document.getElementById(id);
    if (!control) return "Not provided";
    if (control.type === "checkbox") return control.checked ? "Yes" : "No";
    const value = control.value.trim();
    if (!value) return "Not provided";
    if (control instanceof HTMLSelectElement) {
      return control.selectedOptions[0]?.textContent.trim() || value;
    }
    return value;
  }

  function clearFieldError(control) {
    if (!control) return;
    control.removeAttribute("aria-invalid");
    const describedBy = control.getAttribute("aria-describedby");
    if (describedBy?.endsWith("-error")) document.getElementById(describedBy)?.remove();
    control.removeAttribute("aria-describedby");
  }

  function showFieldError(control) {
    clearFieldError(control);
    control.setAttribute("aria-invalid", "true");
    const error = document.createElement("p");
    error.className = "tracker-field-error";
    error.id = `${control.id}-error`;
    error.textContent = control.type === "checkbox" ? "Confirm this requirement before submission." : "Complete this field.";
    control.setAttribute("aria-describedby", error.id);
    control.closest(".tracker-field, .tracker-choice")?.insertAdjacentElement("afterend", error);
  }

  function validateStage(stage, includeAcknowledgements = false) {
    const ids = stageFieldIds[stage] || [];
    const invalid = [];
    ids.forEach((id) => {
      if (!includeAcknowledgements && acknowledgementIds.includes(id)) return;
      const control = document.getElementById(id);
      if (!control) return;
      clearFieldError(control);
      const missing = control.type === "checkbox" ? !control.checked : !control.value.trim();
      const typeInvalid = control.type === "email" && control.value && !control.validity.valid;
      if (missing || typeInvalid) {
        showFieldError(control);
        invalid.push(control);
      }
    });

    const referenceIssued = document.getElementById("reference-issued");
    const referenceReason = document.getElementById("reference-reason");
    if (stage === 3 && referenceIssued.value === "not-available" && !referenceReason.value.trim()) {
      showFieldError(referenceReason);
      invalid.push(referenceReason);
    }

    if (invalid.length) {
      invalid[0].focus();
      liveStatus.textContent = `Stage ${stage} has ${invalid.length} required field${invalid.length === 1 ? "" : "s"} to complete.`;
      return false;
    }
    return true;
  }

  function showStage(stage) {
    currentStage = stage;
    review.hidden = true;
    confirmation.hidden = true;
    intakeForm.hidden = false;
    panels.forEach((panel) => {
      panel.hidden = Number(panel.dataset.stagePanel) !== stage;
    });
    stageButtons.forEach((button) => {
      const active = Number(button.dataset.stageButton) === stage;
      if (active) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
    const activePanel = panels.find((panel) => Number(panel.dataset.stagePanel) === stage);
    activePanel?.querySelector("h2")?.focus();
    liveStatus.textContent = `Stage ${stage} of 5.`;
  }

  function renderReview() {
    reviewGrid.replaceChildren();
    reviewGroups.forEach((group) => {
      const section = document.createElement("section");
      section.className = "tracker-review-group";
      const rows = group.fields
        .filter(([, id]) => id !== "reference-reason" || fieldValue("reference-issued") === "Not issued or unavailable")
        .map(([label, id]) => `<dt>${label}</dt><dd>${fieldValue(id)}</dd>`)
        .join("");
      section.innerHTML = `
        <div class="tracker-review-group__heading">
          <h3>${group.title}</h3>
          <button type="button" data-edit-stage="${group.stage}">Correct answers</button>
        </div>
        <dl class="tracker-review-list">${rows}</dl>`;
      reviewGrid.append(section);
    });
    updateSubmitAvailability();
  }

  function updateSubmitAvailability() {
    const missing = acknowledgementIds.filter((id) => !document.getElementById(id).checked);
    submitButton.disabled = missing.length > 0;
    reviewError.hidden = missing.length === 0;
    liveStatus.textContent = missing.length
      ? "Submission is blocked until both required acknowledgements are checked."
      : "All required acknowledgements are complete. The registration can be submitted.";
  }

  stageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const requested = Number(button.dataset.stageButton);
      if (requested <= currentStage || validateStage(currentStage, false)) showStage(requested);
    });
  });

  intakeForm.addEventListener("click", (event) => {
    const next = event.target.closest("[data-next-stage]");
    const previous = event.target.closest("[data-previous-stage]");
    const showReviewButton = event.target.closest("[data-show-review]");
    if (next && validateStage(currentStage, false)) showStage(Number(next.dataset.nextStage));
    if (previous) showStage(Number(previous.dataset.previousStage));
    if (showReviewButton) {
      const invalidStage = [1, 2, 3, 4].find((stage) => !validateStage(stage, false));
      if (invalidStage) {
        showStage(invalidStage);
        return;
      }
      intakeForm.hidden = true;
      review.hidden = false;
      renderReview();
      review.querySelector("h2")?.focus();
    }
  });

  review.addEventListener("click", (event) => {
    const edit = event.target.closest("[data-edit-stage]");
    if (edit) showStage(Number(edit.dataset.editStage));
  });

  acknowledgementIds.forEach((id) => {
    document.getElementById(id).addEventListener("change", () => {
      clearFieldError(document.getElementById(id));
      if (!review.hidden) {
        renderReview();
        review.hidden = false;
      }
    });
  });

  document.getElementById("reference-issued").addEventListener("change", (event) => {
    const reason = document.querySelector("[data-reference-reason]");
    reason.hidden = event.target.value !== "not-available";
    if (reason.hidden) {
      document.getElementById("reference-reason").value = "";
      clearFieldError(document.getElementById("reference-reason"));
    }
  });

  submitButton.addEventListener("click", () => {
    if (!validateStage(5, true)) {
      updateSubmitAvailability();
      return;
    }
    review.hidden = true;
    confirmation.hidden = false;
    confirmation.querySelector("h2")?.focus();
    liveStatus.textContent = "Registration information received for ABA review.";
  });

  document.querySelector("[data-add-another]")?.addEventListener("click", () => {
    intakeForm.reset();
    document.querySelector("[data-reference-reason]").hidden = true;
    panels.forEach((panel) => panel.querySelectorAll(".tracker-field-error").forEach((error) => error.remove()));
    intakeForm.querySelectorAll("[aria-invalid]").forEach((control) => control.removeAttribute("aria-invalid"));
    showStage(1);
  });

  showStage(1);
})();
