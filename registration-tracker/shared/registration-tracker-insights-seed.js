// Illustrative example dataset for the Registration Tracker's public Insights page.
// Every record here is fictional -- no real company, product, or registration.
// This exists so the Insights page can demonstrate what it looks like once real
// reviewed evidence is sufficient, as a spec artifact for the eventual build --
// not as a claim that ABA currently holds this data. Field values use the same
// vocabulary as the intake form so the aggregation logic in
// registration-tracker-insights.js mirrors what a real implementation would do
// against real reviewed `Application` records.
window.ABA_TRACKER_INSIGHTS_SEED = [
  { id: "ex-01", functional_category: "Biopesticide", legal_pathway: "Agricultural remedy", registration_type: "New molecule or active ingredient", stage: "Evaluation", elapsed_days: 210, timeframe_days: 240, barrier: "Additional information requested" },
  { id: "ex-02", functional_category: "Biofertiliser", legal_pathway: "Fertilizer", registration_type: "New formulation", stage: "Decision", elapsed_days: 165, timeframe_days: 180, barrier: null },
  { id: "ex-03", functional_category: "Not sure", legal_pathway: "Agricultural remedy", registration_type: "Generic active ingredient", stage: "Scientific screening", elapsed_days: 95, timeframe_days: 150, barrier: null },
  { id: "ex-04", functional_category: "Biopesticide", legal_pathway: "Agricultural remedy", registration_type: "New molecule or active ingredient", stage: "Verification", elapsed_days: 40, timeframe_days: 240, barrier: "Fee or payment proof discrepancy" },
  { id: "ex-05", functional_category: "Biostimulant", legal_pathway: "Fertilizer", registration_type: "New formulation", stage: "Evaluation", elapsed_days: 260, timeframe_days: 180, barrier: "Additional information requested" },
  { id: "ex-06", functional_category: "Not sure", legal_pathway: "Agricultural remedy", registration_type: "New formulation", stage: "Received", elapsed_days: 12, timeframe_days: 210, barrier: null },
  { id: "ex-07", functional_category: "Biopesticide", legal_pathway: "Agricultural remedy", registration_type: "Parallel registration", stage: "Decision", elapsed_days: 130, timeframe_days: 150, barrier: null },
  { id: "ex-08", functional_category: "Microbial inoculant", legal_pathway: "Agricultural remedy", registration_type: "New molecule or active ingredient", stage: "Evaluation", elapsed_days: 300, timeframe_days: 240, barrier: "Repository reference sample unresolved" },
  { id: "ex-09", functional_category: "Not sure", legal_pathway: "Agricultural remedy", registration_type: "Generic active ingredient", stage: "Verification", elapsed_days: 55, timeframe_days: 150, barrier: "Registrar staffing delay" },
  { id: "ex-10", functional_category: "Biofertiliser", legal_pathway: "Fertilizer", registration_type: "Daughter registration", stage: "Decision", elapsed_days: 90, timeframe_days: 120, barrier: null },
  { id: "ex-11", functional_category: "Biopesticide", legal_pathway: "Agricultural remedy", registration_type: "New molecule or active ingredient", stage: "Scientific screening", elapsed_days: 180, timeframe_days: 240, barrier: "Additional information requested" },
  { id: "ex-12", functional_category: "Biostimulant", legal_pathway: "Not sure", registration_type: "New formulation", stage: "Evaluation", elapsed_days: 220, timeframe_days: 180, barrier: "Repository reference sample unresolved" },
  { id: "ex-13", functional_category: "Not sure", legal_pathway: "Agricultural remedy", registration_type: "New formulation", stage: "Received", elapsed_days: 8, timeframe_days: 210, barrier: null },
  { id: "ex-14", functional_category: "Biopesticide", legal_pathway: "Agricultural remedy", registration_type: "Generic active ingredient", stage: "Verification", elapsed_days: 60, timeframe_days: 150, barrier: "Fee or payment proof discrepancy" },
  { id: "ex-15", functional_category: "Microbial inoculant", legal_pathway: "Agricultural remedy", registration_type: "New molecule or active ingredient", stage: "Evaluation", elapsed_days: 255, timeframe_days: 240, barrier: "Additional information requested" },
  { id: "ex-16", functional_category: "Biofertiliser", legal_pathway: "Fertilizer", registration_type: "New formulation", stage: "Scientific screening", elapsed_days: 110, timeframe_days: 180, barrier: "Registrar staffing delay" },
  { id: "ex-17", functional_category: "Biopesticide", legal_pathway: "Agricultural remedy", registration_type: "Parallel registration", stage: "Decision", elapsed_days: 140, timeframe_days: 150, barrier: null },
  { id: "ex-18", functional_category: "Plant extract", legal_pathway: "Agricultural remedy", registration_type: "New molecule or active ingredient", stage: "Evaluation", elapsed_days: 290, timeframe_days: 240, barrier: "Additional information requested" },
  { id: "ex-19", functional_category: "Not sure", legal_pathway: "Fertilizer", registration_type: "Daughter registration", stage: "Verification", elapsed_days: 35, timeframe_days: 120, barrier: null },
  { id: "ex-20", functional_category: "Biopesticide", legal_pathway: "Agricultural remedy", registration_type: "New molecule or active ingredient", stage: "Scientific screening", elapsed_days: 200, timeframe_days: 240, barrier: "Repository reference sample unresolved" },
  { id: "ex-21", functional_category: "Microbial inoculant", legal_pathway: "Agricultural remedy", registration_type: "Generic active ingredient", stage: "Decision", elapsed_days: 145, timeframe_days: 150, barrier: null },
  { id: "ex-22", functional_category: "Not sure", legal_pathway: "Agricultural remedy", registration_type: "New molecule or active ingredient", stage: "Evaluation", elapsed_days: 265, timeframe_days: 240, barrier: "Additional information requested" },
  { id: "ex-23", functional_category: "Biofertiliser", legal_pathway: "Fertilizer", registration_type: "New formulation", stage: "Received", elapsed_days: 20, timeframe_days: 180, barrier: null },
  { id: "ex-24", functional_category: "Biopesticide", legal_pathway: "Agricultural remedy", registration_type: "New molecule or active ingredient", stage: "Verification", elapsed_days: 48, timeframe_days: 240, barrier: "Fee or payment proof discrepancy" },
];
