// Source-backed constants shared by the static intake and Insights preview.
// Agricultural-remedy service codes come from the Service Request Form
// (modified October 2016). Published timeframes come from the Guideline of the
// Registration Process for Agricultural Remedies (2015), Table 1.
(() => {
  const SOURCE_DOCUMENT_VERSION = "Service Request Form, modified October 2016";
  const OFFICIAL_TIMEFRAME_SOURCE = "Guideline of the Registration Process for Agricultural Remedies, 2015, Table 1";

  const registrationTypes = Object.freeze({
    new_molecule: Object.freeze({
      registration_type_key: "new_molecule",
      registration_type_label: "New molecule / new active ingredient",
      service_request_code: "14AR2",
      service_request_row: 2,
      official_timeframe_days: 627,
    }),
    new_formulation: Object.freeze({
      registration_type_key: "new_formulation",
      registration_type_label: "New formulation",
      service_request_code: "14AR2",
      service_request_row: 2,
      official_timeframe_days: 418,
    }),
    generic_active_ingredient: Object.freeze({
      registration_type_key: "generic_active_ingredient",
      registration_type_label: "Generic active ingredient",
      service_request_code: "14AR1",
      service_request_row: 1,
      official_timeframe_days: 418,
    }),
    parallel_registration: Object.freeze({
      registration_type_key: "parallel_registration",
      registration_type_label: "Parallel registration",
      service_request_code: "14AR1",
      service_request_row: 1,
      official_timeframe_days: 118,
    }),
    daughter_registration: Object.freeze({
      registration_type_key: "daughter_registration",
      registration_type_label: "Daughter registration",
      service_request_code: "14AR1",
      service_request_row: 1,
      official_timeframe_days: 118,
    }),
  });

  window.ABA_TRACKER_REFERENCE = Object.freeze({
    source_document_version: SOURCE_DOCUMENT_VERSION,
    official_timeframe_source: OFFICIAL_TIMEFRAME_SOURCE,
    registration_types: registrationTypes,
    privacy_threshold_preview: 3,
  });
})();
