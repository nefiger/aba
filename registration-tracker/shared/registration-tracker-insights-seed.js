// Design-preview records for Registration Insights.
// Every record is fictional and contains no company, product, person, file reference,
// registration number, or private note. Regulator codes and clocks are joined from
// registration-tracker-reference-data.js rather than repeated as literals here.
(() => {
  const reference = window.ABA_TRACKER_REFERENCE;
  if (!reference) return;

  const previewRecords = [
    { id: "ex-01", legal_pathway: "Agricultural remedy", aba_product_category: "Biopesticide", registrar_function: "Insecticide", registration_type_key: "new_molecule", outcome: "pending", official_stage: "Evaluation", elapsed_days: 702, days_in_stage: 280, barrier: "Additional information requested", pathway_fit: "fits" },
    { id: "ex-02", legal_pathway: "Agricultural remedy", aba_product_category: "Plant extract", registrar_function: "Other", registration_type_key: "new_molecule", outcome: "pending", official_stage: "Scientific screening", elapsed_days: 488, days_in_stage: 164, barrier: null, pathway_fit: "does_not_fit", pathway_fit_reason: "no_suitable_category" },
    { id: "ex-03", legal_pathway: "Agricultural remedy", aba_product_category: "Microbial inoculant", registrar_function: "Fungicide", registration_type_key: "new_molecule", outcome: "approved", official_stage: "Decision", elapsed_days: 590, days_in_stage: 18, barrier: null, pathway_fit: "fits" },
    { id: "ex-04", legal_pathway: "Agricultural remedy", aba_product_category: "Biopesticide", registrar_function: "Herbicide", registration_type_key: "new_molecule", outcome: "rejected", official_stage: "Decision", elapsed_days: 355, days_in_stage: 21, barrier: "Evidence requirements", pathway_fit: "does_not_fit", pathway_fit_reason: "evidence_burden" },
    { id: "ex-05", legal_pathway: "Agricultural remedy", aba_product_category: "Biopesticide", registrar_function: "Insecticide", registration_type_key: "new_molecule", outcome: "withdrawn", official_stage: "Evaluation", elapsed_days: 302, days_in_stage: 120, barrier: "Additional information requested", pathway_fit: "not_sure" },

    { id: "ex-06", legal_pathway: "Agricultural remedy", aba_product_category: "Biopesticide", registrar_function: "Fungicide", registration_type_key: "new_formulation", outcome: "pending", official_stage: "Evaluation", elapsed_days: 510, days_in_stage: 244, barrier: "Additional information requested", pathway_fit: "fits" },
    { id: "ex-07", legal_pathway: "Agricultural remedy", aba_product_category: "Plant extract", registrar_function: "Other", registration_type_key: "new_formulation", outcome: "pending", official_stage: "Verification", elapsed_days: 74, days_in_stage: 74, barrier: "Payment confirmation", pathway_fit: "does_not_fit", pathway_fit_reason: "registrar_advice" },
    { id: "ex-08", legal_pathway: "Agricultural remedy", aba_product_category: "Biostimulant", registrar_function: "Other", registration_type_key: "new_formulation", outcome: "pending", official_stage: "Scientific screening", elapsed_days: 286, days_in_stage: 196, barrier: null, pathway_fit: "does_not_fit", pathway_fit_reason: "no_suitable_category" },
    { id: "ex-09", legal_pathway: "Agricultural remedy", aba_product_category: "Biopesticide", registrar_function: "Insecticide", registration_type_key: "new_formulation", outcome: "approved", official_stage: "Decision", elapsed_days: 390, days_in_stage: 14, barrier: null, pathway_fit: "fits" },
    { id: "ex-10", legal_pathway: "Agricultural remedy", aba_product_category: "Microbial inoculant", registrar_function: "Fungicide", registration_type_key: "new_formulation", outcome: "rejected", official_stage: "Decision", elapsed_days: 460, days_in_stage: 17, barrier: "Evidence requirements", pathway_fit: "fits" },
    { id: "ex-11", legal_pathway: "Agricultural remedy", aba_product_category: "Biopesticide", registrar_function: "Fungicide", registration_type_key: "new_formulation", outcome: "withdrawn", official_stage: "Evaluation", elapsed_days: 205, days_in_stage: 88, barrier: null, pathway_fit: "fits" },

    { id: "ex-12", legal_pathway: "Agricultural remedy", aba_product_category: "Biopesticide", registrar_function: "Insecticide", registration_type_key: "generic_active_ingredient", outcome: "pending", official_stage: "Evaluation", elapsed_days: 452, days_in_stage: 221, barrier: "Additional information requested", pathway_fit: "fits" },
    { id: "ex-13", legal_pathway: "Agricultural remedy", aba_product_category: "Plant extract", registrar_function: "Other", registration_type_key: "generic_active_ingredient", outcome: "pending", official_stage: "Scientific screening", elapsed_days: 210, days_in_stage: 136, barrier: null, pathway_fit: "does_not_fit", pathway_fit_reason: "no_suitable_category" },
    { id: "ex-14", legal_pathway: "Agricultural remedy", aba_product_category: "Biopesticide", registrar_function: "Herbicide", registration_type_key: "generic_active_ingredient", outcome: "approved", official_stage: "Decision", elapsed_days: 401, days_in_stage: 12, barrier: null, pathway_fit: "fits" },
    { id: "ex-15", legal_pathway: "Agricultural remedy", aba_product_category: "Microbial inoculant", registrar_function: "Other", registration_type_key: "generic_active_ingredient", outcome: "rejected", official_stage: "Decision", elapsed_days: 332, days_in_stage: 16, barrier: "Evidence requirements", pathway_fit: "does_not_fit", pathway_fit_reason: "evidence_burden" },
    { id: "ex-16", legal_pathway: "Agricultural remedy", aba_product_category: "Biopesticide", registrar_function: "Fungicide", registration_type_key: "generic_active_ingredient", outcome: "pending", official_stage: "Received", elapsed_days: 28, days_in_stage: 28, barrier: null, pathway_fit: "fits" },

    { id: "ex-17", legal_pathway: "Agricultural remedy", aba_product_category: "Biopesticide", registrar_function: "Insecticide", registration_type_key: "parallel_registration", outcome: "pending", official_stage: "Decision", elapsed_days: 142, days_in_stage: 34, barrier: "Decision pending", pathway_fit: "fits" },
    { id: "ex-18", legal_pathway: "Agricultural remedy", aba_product_category: "Biopesticide", registrar_function: "Fungicide", registration_type_key: "parallel_registration", outcome: "pending", official_stage: "Evaluation", elapsed_days: 96, days_in_stage: 61, barrier: null, pathway_fit: "fits" },
    { id: "ex-19", legal_pathway: "Agricultural remedy", aba_product_category: "Biopesticide", registrar_function: "Herbicide", registration_type_key: "parallel_registration", outcome: "approved", official_stage: "Decision", elapsed_days: 110, days_in_stage: 13, barrier: null, pathway_fit: "fits" },
    { id: "ex-20", legal_pathway: "Agricultural remedy", aba_product_category: "Plant extract", registrar_function: "Other", registration_type_key: "parallel_registration", outcome: "rejected", official_stage: "Decision", elapsed_days: 128, days_in_stage: 15, barrier: "Additional information requested", pathway_fit: "not_sure" },

    { id: "ex-21", legal_pathway: "Agricultural remedy", aba_product_category: "Biopesticide", registrar_function: "Insecticide", registration_type_key: "daughter_registration", outcome: "pending", official_stage: "Verification", elapsed_days: 132, days_in_stage: 51, barrier: "Payment confirmation", pathway_fit: "fits" },
    { id: "ex-22", legal_pathway: "Agricultural remedy", aba_product_category: "Biopesticide", registrar_function: "Fungicide", registration_type_key: "daughter_registration", outcome: "pending", official_stage: "Evaluation", elapsed_days: 84, days_in_stage: 43, barrier: null, pathway_fit: "fits" },
    { id: "ex-23", legal_pathway: "Agricultural remedy", aba_product_category: "Microbial inoculant", registrar_function: "Other", registration_type_key: "daughter_registration", outcome: "approved", official_stage: "Decision", elapsed_days: 101, days_in_stage: 12, barrier: null, pathway_fit: "does_not_fit", pathway_fit_reason: "registrar_advice" },
    { id: "ex-24", legal_pathway: "Agricultural remedy", aba_product_category: "Plant extract", registrar_function: "Other", registration_type_key: "daughter_registration", outcome: "withdrawn", official_stage: "Evaluation", elapsed_days: 77, days_in_stage: 36, barrier: null, pathway_fit: "not_sure" },

    { id: "ex-25", legal_pathway: "Fertilizer", aba_product_category: "Biofertiliser", registrar_function: "Not sure", registration_type_key: null, outcome: "pending", official_stage: "Evaluation", elapsed_days: 350, days_in_stage: 180, barrier: "Category uncertainty", pathway_fit: "does_not_fit", pathway_fit_reason: "no_suitable_category" },
    { id: "ex-26", legal_pathway: "Fertilizer", aba_product_category: "Biostimulant", registrar_function: "Other", registration_type_key: null, outcome: "pending", official_stage: "Scientific screening", elapsed_days: 190, days_in_stage: 121, barrier: "Category uncertainty", pathway_fit: "fits" },
    { id: "ex-27", legal_pathway: "Fertilizer", aba_product_category: "Biofertiliser", registrar_function: "Not sure", registration_type_key: null, outcome: "approved", official_stage: "Decision", elapsed_days: 275, days_in_stage: 20, barrier: null, pathway_fit: "fits" },
    { id: "ex-28", legal_pathway: "Fertilizer", aba_product_category: "Biostimulant", registrar_function: "Other", registration_type_key: null, outcome: "rejected", official_stage: "Decision", elapsed_days: 244, days_in_stage: 18, barrier: "Evidence requirements", pathway_fit: "does_not_fit", pathway_fit_reason: "delay_or_repeated_difficulty" },
  ];

  window.ABA_TRACKER_INSIGHTS_SEED = Object.freeze(previewRecords.map((record) => {
    const sourceType = record.legal_pathway === "Agricultural remedy" && record.registration_type_key
      ? reference.registration_types[record.registration_type_key]
      : null;
    return Object.freeze({
      ...record,
      review_status: "approved_for_insights",
      public_inclusion: true,
      registration_type_label: sourceType?.registration_type_label ?? null,
      service_request_code: sourceType?.service_request_code ?? null,
      service_request_row: sourceType?.service_request_row ?? null,
      source_document_version: sourceType ? reference.source_document_version : null,
      official_timeframe_days: sourceType?.official_timeframe_days ?? null,
      official_timeframe_source: sourceType ? reference.official_timeframe_source : null,
    });
  }));
})();
