// Renders the Insights page's four evidence panels from the illustrative example
// dataset in registration-tracker-insights-seed.js. This mirrors the aggregation a
// real implementation would run against reviewed `Application` records -- it is
// written to make that logic explicit and traceable, not to hand-pick numbers.
(() => {
  const records = window.ABA_TRACKER_INSIGHTS_SEED;
  if (!Array.isArray(records) || !records.length) return;

  const total = records.length;

  // 01 -- Process position: share of records per pipeline stage.
  document.querySelectorAll("[data-stage-scale] [data-stage]").forEach((bar) => {
    const count = records.filter((record) => record.stage === bar.dataset.stage).length;
    bar.style.width = `${Math.round((count / total) * 100)}%`;
  });

  // 02 -- Elapsed time: each record plotted as a point along the timeframe axis.
  // The reference line sits at 58% (matches the CSS), representing exactly the
  // published timeframe (ratio = 1.0). Ratios beyond 1.0 extend from there to the
  // right edge, capped at 1.7x so a handful of outliers don't compress the plot.
  const plot = document.querySelector("[data-time-scale-plot]");
  if (plot) {
    const REFERENCE_PERCENT = 58;
    records.forEach((record) => {
      const ratio = record.elapsed_days / record.timeframe_days;
      const beyond = ratio > 1;
      const position = beyond
        ? REFERENCE_PERCENT + Math.min((ratio - 1) / 0.7, 1) * (100 - REFERENCE_PERCENT)
        : ratio * REFERENCE_PERCENT;
      const point = document.createElement("span");
      point.className = beyond ? "tracker-time-scale__point tracker-time-scale__point--beyond" : "tracker-time-scale__point";
      point.style.left = `${Math.min(position, 100)}%`;
      plot.append(point);
    });
    const beyondCount = records.filter((record) => record.elapsed_days > record.timeframe_days).length;
    const summary = document.querySelector("[data-time-scale-summary]");
    if (summary) summary.textContent = `${total - beyondCount} of ${total} within the published timeframe; ${beyondCount} beyond it.`;
  }

  // 03 -- Recurring barriers: frequency-ranked, top three shown.
  const barrierRank = document.querySelector("[data-barrier-rank]");
  if (barrierRank) {
    const counts = new Map();
    records.forEach((record) => {
      if (!record.barrier) return;
      counts.set(record.barrier, (counts.get(record.barrier) || 0) + 1);
    });
    const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
    barrierRank.replaceChildren(...ranked.map(([barrier, count]) => {
      const row = document.createElement("div");
      row.innerHTML = `<dt>${barrier}</dt><dd>${count} of ${total}</dd>`;
      return row;
    }));
  }

  // 04 -- Evidence coverage: share of records with a specific (non-"Not sure") value.
  document.querySelectorAll("[data-coverage-field]").forEach((dd) => {
    const field = dd.dataset.coverageField;
    const covered = records.filter((record) => record[field] && record[field] !== "Not sure").length;
    const filledSegments = Math.round((covered / total) * 5);
    [...dd.querySelectorAll("i")].forEach((segment, index) => {
      segment.classList.toggle("is-filled", index < filledSegments);
    });
  });
})();
