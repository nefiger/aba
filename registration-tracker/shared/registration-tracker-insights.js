// Renders the Registration Insights design preview from reviewed, included
// fictional records. Every visual has a visible text/table alternative.
(() => {
  const reference = window.ABA_TRACKER_REFERENCE;
  const seed = window.ABA_TRACKER_INSIGHTS_SEED;
  if (!reference || !Array.isArray(seed) || !seed.length) return;

  const records = seed.filter((record) => record.review_status === "approved_for_insights" && record.public_inclusion === true);
  const pending = records.filter((record) => record.outcome === "pending");
  const threshold = reference.privacy_threshold_preview;

  const outcomeOrder = ["pending", "approved", "rejected", "withdrawn"];
  const stageOrder = ["Received", "Verification", "Scientific screening", "Evaluation", "Decision"];
  const pathwayLabels = { fits: "Fits", does_not_fit: "Does not fit", not_sure: "Not sure" };
  const reasonLabels = {
    registrar_advice: "Registrar advice",
    precedent: "Prior precedent",
    no_suitable_category: "No suitable category",
    evidence_burden: "Evidence burden",
    delay_or_repeated_difficulty: "Delay or repeated difficulty",
    other: "Other",
  };

  function median(values) {
    if (!values.length) return null;
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[middle] : Math.round((sorted[middle - 1] + sorted[middle]) / 2);
  }

  function groupBy(items, key) {
    return items.reduce((groups, item) => {
      const value = typeof key === "function" ? key(item) : item[key];
      if (!groups.has(value)) groups.set(value, []);
      groups.get(value).push(item);
      return groups;
    }, new Map());
  }

  function percent(part, total) {
    return total ? Math.round((part / total) * 100) : 0;
  }

  function text(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  }

  function cell(value, tag = "td") {
    const element = document.createElement(tag);
    element.textContent = value;
    return element;
  }

  function typeLabel(record) {
    if (record.registration_type_label) return record.registration_type_label;
    if (record.legal_pathway === "fertilizer") return "Fertilizer pathway";
    return "Pathway not confirmed";
  }

  function mostCommonBarrier(items) {
    const counts = new Map();
    items.forEach((item) => {
      if (item.barrier) counts.set(item.barrier, (counts.get(item.barrier) || 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "No common block reported";
  }

  const chartInstances = [];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const chartColors = {
    forest: "#103729",
    paper: "#f7f3ee",
    sage: "#9dac99",
    sageWash: "#e7ece5",
    orange: "#963f1e",
    orangeLight: "#efa16f",
    muted: "#52645a",
    line: "rgba(16, 55, 41, 0.18)",
    pending: "#667762",
    approved: "#285619",
    rejected: "#963f1e",
    withdrawn: "#6a746d",
  };

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function tooltipHtml(title, lines) {
    return `<div class="tracker-chart-tooltip"><strong>${escapeHtml(title)}</strong>${lines.map((line) => `<span>${escapeHtml(line)}</span>`).join("")}</div>`;
  }

  function mountChart(selector, option, keyboard = {}) {
    const element = document.querySelector(selector);
    if (!element) return null;
    if (!window.echarts) {
      element.classList.add("is-unavailable");
      element.textContent = "The interactive chart is unavailable. Open the values below to read the data.";
      return null;
    }

    const chart = window.echarts.init(element, null, { renderer: "svg" });
    chart.setOption({
      animation: !prefersReducedMotion,
      animationDuration: 450,
      textStyle: { fontFamily: "Archivo, sans-serif", color: chartColors.forest },
      aria: { enabled: true, show: true, description: keyboard.description || "Interactive registration insight chart." },
      tooltip: {
        trigger: "item",
        confine: true,
        backgroundColor: chartColors.forest,
        borderColor: chartColors.orangeLight,
        borderWidth: 1,
        padding: [10, 12],
        textStyle: { color: chartColors.paper, fontFamily: "Archivo, sans-serif", fontSize: 12 },
        extraCssText: "box-shadow:none;border-radius:0;",
      },
      ...option,
    });

    let dataIndex = 0;
    let seriesIndex = 0;
    const dataCount = keyboard.dataCount || 1;
    const seriesCount = keyboard.seriesCount || 1;
    const showCurrent = () => {
      chart.dispatchAction({ type: "downplay" });
      chart.dispatchAction({ type: "highlight", seriesIndex, dataIndex });
      chart.dispatchAction({ type: "showTip", seriesIndex, dataIndex });
    };
    element.addEventListener("focus", showCurrent);
    element.addEventListener("pointerdown", () => element.focus());
    element.addEventListener("blur", () => {
      chart.dispatchAction({ type: "downplay" });
      chart.dispatchAction({ type: "hideTip" });
    });
    element.addEventListener("keydown", (event) => {
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Escape"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "Escape") {
        chart.dispatchAction({ type: "hideTip" });
        return;
      }
      if (seriesCount > 1 && event.key === "ArrowLeft") seriesIndex = (seriesIndex - 1 + seriesCount) % seriesCount;
      else if (seriesCount > 1 && event.key === "ArrowRight") seriesIndex = (seriesIndex + 1) % seriesCount;
      else if (event.key === "ArrowUp" || event.key === "ArrowLeft") dataIndex = (dataIndex - 1 + dataCount) % dataCount;
      else dataIndex = (dataIndex + 1) % dataCount;
      showCurrent();
    });

    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(element);
    chartInstances.push({ chart, resizeObserver });
    return chart;
  }

  const medianPending = median(pending.map((record) => record.elapsed_days));
  const benchmarkEligiblePending = pending.filter((record) => Number.isFinite(record.official_timeframe_days));
  const beyondPending = benchmarkEligiblePending.filter((record) => record.elapsed_days > record.official_timeframe_days);
  text('[data-summary="median-pending"]', String(medianPending));
  text('[data-summary="pending-count"]', String(pending.length));
  text('[data-summary="beyond-count"]', `${beyondPending.length} of ${benchmarkEligiblePending.length}`);
  text("[data-privacy-threshold]", String(threshold));

  const summaryQueue = document.querySelector("[data-summary-queue]");
  const withinPending = benchmarkEligiblePending.length - beyondPending.length;
  const unbenchmarkedPendingCount = pending.length - benchmarkEligiblePending.length;
  [
    ["overdue", beyondPending.length],
    ["within", withinPending],
    ["unbenchmarked", unbenchmarkedPendingCount],
  ].forEach(([state, count]) => {
    for (let index = 0; index < count; index += 1) {
      const marker = document.createElement("i");
      marker.dataset.state = state;
      summaryQueue?.append(marker);
    }
  });

  // 01 — ranked median pending time by sourced subtype / unbenchmarked pathway.
  const pendingGroups = groupBy(pending, typeLabel);
  const pendingMax = Math.max(...pending.map((record) => record.elapsed_days));
  const axisMax = Math.ceil(pendingMax / 100) * 100;
  text("[data-pending-axis-max]", `${axisMax} days`);

  const pendingTable = document.querySelector("[data-pending-table]");
  const pendingGroupStats = [...pendingGroups.entries()]
    .map(([label, items]) => ({
      label,
      items,
      medianDays: median(items.map((item) => item.elapsed_days)),
      longestDays: Math.max(...items.map((item) => item.elapsed_days)),
    }))
    .sort((a, b) => b.medianDays - a.medianDays);
  const longestMedianGroup = pendingGroupStats[0];
  text("[data-pending-answer]", `${longestMedianGroup.label} has the longest median pending time: ${longestMedianGroup.medianDays} days.`);

  pendingGroupStats.forEach(({ label, items, medianDays, longestDays }) => {
    const tableRow = document.createElement("tr");
    tableRow.append(
      cell(label),
      cell(String(items.length)),
      cell(String(medianDays)),
      cell(String(longestDays)),
    );
    pendingTable?.append(tableRow);
  });

  mountChart("[data-chart='pending']", {
    grid: { top: 28, right: 72, bottom: 42, left: 250, containLabel: false },
    xAxis: {
      type: "value",
      min: 0,
      max: axisMax,
      name: "Days pending",
      nameLocation: "middle",
      nameGap: 28,
      axisLine: { show: true, lineStyle: { color: chartColors.forest } },
      axisTick: { show: false },
      axisLabel: { color: chartColors.muted, fontSize: 11 },
      splitLine: { show: true, lineStyle: { color: chartColors.line } },
    },
    yAxis: {
      type: "category",
      inverse: true,
      data: pendingGroupStats.map((group) => group.label),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: chartColors.forest, fontSize: 12, fontWeight: 700, width: 220, overflow: "break", lineHeight: 15 },
    },
    series: [{
      name: "Median pending time",
      type: "bar",
      barWidth: 22,
      data: pendingGroupStats.map((group) => group.medianDays),
      itemStyle: { color: chartColors.forest },
      emphasis: { itemStyle: { color: chartColors.orange } },
      label: { show: true, position: "right", color: chartColors.forest, fontWeight: 800, formatter: "{c} days" },
      tooltip: {
        formatter: (params) => {
          const group = pendingGroupStats[params.dataIndex];
          return tooltipHtml(group.label, [
            `Median pending time: ${group.medianDays} days`,
            `Longest current wait: ${group.longestDays} days`,
            `${group.items.length} pending application${group.items.length === 1 ? "" : "s"}`,
          ]);
        },
      },
    }],
    media: [{
      query: { maxWidth: 620 },
      option: {
        grid: { top: 36, right: 58, bottom: 42, left: 118 },
        yAxis: { axisLabel: { width: 102, fontSize: 10, lineHeight: 13 } },
        series: [{ barWidth: 18, label: { fontSize: 10 } }],
      },
    }],
  }, {
    dataCount: pendingGroupStats.length,
    description: `Ranked median pending time by registration type. ${longestMedianGroup.label} has the longest median at ${longestMedianGroup.medianDays} days.`,
  });

  // 02 — official-stage bars, count, median days in stage, and reported block.
  const stageGroups = groupBy(pending, "official_stage");
  const stageTable = document.querySelector("[data-stage-table]");
  const stageStats = stageOrder.map((stage) => {
    const items = stageGroups.get(stage) || [];
    return {
      stage,
      items,
      count: items.length,
      medianDays: items.length ? median(items.map((item) => item.days_in_stage)) : null,
      barrier: mostCommonBarrier(items),
    };
  });
  const busiestStage = [...stageStats].sort((a, b) => b.count - a.count)[0];
  text("[data-stage-answer]", `${busiestStage.stage} is the largest waiting group: ${busiestStage.count} of ${pending.length} pending applications.`);
  stageStats.forEach(({ stage, count, medianDays, barrier }) => {
    const tableRow = document.createElement("tr");
    tableRow.append(
      cell(stage),
      cell(String(count)),
      cell(medianDays === null ? "—" : String(medianDays)),
      cell(barrier),
    );
    stageTable?.append(tableRow);
  });

  mountChart("[data-chart='stage']", {
    grid: { top: 32, right: 24, bottom: 72, left: 48 },
    xAxis: {
      type: "category",
      data: stageStats.map((item) => item.stage),
      axisLine: { lineStyle: { color: chartColors.forest } },
      axisTick: { show: false },
      axisLabel: {
        color: chartColors.forest,
        fontSize: 11,
        fontWeight: 700,
        interval: 0,
        formatter: (value) => value === "Scientific screening" ? "Scientific\nscreening" : value,
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: Math.max(...stageStats.map((item) => item.count)) + 1,
      interval: 1,
      name: "Pending applications",
      nameTextStyle: { color: chartColors.muted, fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: chartColors.muted, fontSize: 11 },
      splitLine: { lineStyle: { color: chartColors.line } },
    },
    series: [{
      name: "Pending applications",
      type: "bar",
      barMaxWidth: 76,
      data: stageStats.map((item) => ({
        value: item.count,
        itemStyle: { color: item.stage === busiestStage.stage ? chartColors.orange : chartColors.forest },
      })),
      label: { show: true, position: "top", color: chartColors.forest, fontSize: 14, fontWeight: 800 },
      emphasis: { itemStyle: { color: chartColors.orangeLight } },
      tooltip: {
        formatter: (params) => {
          const item = stageStats[params.dataIndex];
          return tooltipHtml(item.stage, [
            `${item.count} pending application${item.count === 1 ? "" : "s"}`,
            item.medianDays === null ? "No median wait available" : `Median time in stage: ${item.medianDays} days`,
            `Most common reported block: ${item.barrier}`,
          ]);
        },
      },
    }],
    media: [{
      query: { maxWidth: 520 },
      option: {
        grid: { top: 28, right: 12, bottom: 76, left: 34 },
        xAxis: { axisLabel: { fontSize: 9, rotate: 18 } },
        yAxis: { name: "" },
      },
    }],
  }, {
    dataCount: stageStats.length,
    description: `Pending applications by official stage. ${busiestStage.stage} is the largest waiting group with ${busiestStage.count} of ${pending.length} pending applications.`,
  });

  // 03 — grouped outcomes by subtype/pathway with threshold suppression.
  const outcomeGroups = groupBy(records, typeLabel);
  const outcomeTable = document.querySelector("[data-outcome-table]");
  const outcomeStats = [...outcomeGroups.entries()].map(([label, items]) => {
    const counts = Object.fromEntries(outcomeOrder.map((outcome) => [outcome, items.filter((item) => item.outcome === outcome).length]));
    const tableRow = document.createElement("tr");
    tableRow.append(cell(label));
    outcomeOrder.forEach((outcome) => tableRow.append(cell(items.length < threshold ? "Not shown" : String(counts[outcome]))));
    outcomeTable?.append(tableRow);
    return { label, items, counts, suppressed: items.length < threshold };
  });
  const rejected = records.filter((record) => record.outcome === "rejected").length;
  text("[data-outcome-answer]", `${pending.length} applications are pending; ${rejected} of ${records.length} ended in rejection.`);

  const outcomeNames = { pending: "Pending", approved: "Approved", rejected: "Rejected", withdrawn: "Withdrawn" };
  const outcomeColors = { pending: chartColors.pending, approved: chartColors.approved, rejected: chartColors.rejected, withdrawn: chartColors.withdrawn };
  mountChart("[data-chart='outcomes']", {
    color: outcomeOrder.map((outcome) => outcomeColors[outcome]),
    legend: {
      top: 0,
      left: 0,
      selectedMode: true,
      itemWidth: 14,
      itemHeight: 10,
      textStyle: { color: chartColors.forest, fontSize: 11, fontWeight: 700 },
    },
    grid: { top: 54, right: 28, bottom: 38, left: 250 },
    xAxis: {
      type: "value",
      min: 0,
      max: Math.max(...outcomeStats.map((item) => item.items.length)),
      interval: 1,
      name: "Applications",
      nameLocation: "middle",
      nameGap: 26,
      axisLine: { lineStyle: { color: chartColors.forest } },
      axisTick: { show: false },
      axisLabel: { color: chartColors.muted, fontSize: 11 },
      splitLine: { lineStyle: { color: chartColors.line } },
    },
    yAxis: {
      type: "category",
      inverse: true,
      data: outcomeStats.map((item) => item.label),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: chartColors.forest, fontSize: 11, fontWeight: 700, width: 220, overflow: "break", lineHeight: 14 },
    },
    series: outcomeOrder.map((outcome) => ({
      name: outcomeNames[outcome],
      type: "bar",
      barMaxWidth: 12,
      barGap: "18%",
      data: outcomeStats.map((item) => item.suppressed ? null : item.counts[outcome]),
      itemStyle: { color: outcomeColors[outcome] },
      emphasis: { focus: "series", itemStyle: { opacity: 0.72 } },
      label: { show: true, position: "right", color: chartColors.forest, fontSize: 10, formatter: (params) => params.value ? params.value : "" },
      tooltip: {
        formatter: (params) => {
          const item = outcomeStats[params.dataIndex];
          return tooltipHtml(item.label, [
            `${params.seriesName}: ${params.value} of ${item.items.length}`,
            `Share: ${percent(params.value, item.items.length)}%`,
          ]);
        },
      },
    })),
    media: [{
      query: { maxWidth: 620 },
      option: {
        legend: { top: 0, itemGap: 8, textStyle: { fontSize: 9 } },
        grid: { top: 78, right: 28, bottom: 36, left: 118 },
        yAxis: { axisLabel: { width: 102, fontSize: 9, lineHeight: 12 } },
      },
    }],
  }, {
    dataCount: outcomeStats.length,
    seriesCount: outcomeOrder.length,
    description: `Grouped application outcomes by registration type. There are ${pending.length} pending applications and ${rejected} rejected applications in this illustrative dataset. The legend can hide or show each outcome.`,
  });

  // 04 — beyond an applicable, source-backed published timeframe.
  const benchmarkGroups = groupBy(benchmarkEligiblePending, typeLabel);
  const benchmarkTable = document.querySelector("[data-benchmark-table]");
  const benchmarkStats = [...benchmarkGroups.entries()].map(([label, items]) => {
    const beyond = items.filter((item) => item.elapsed_days > item.official_timeframe_days).length;
    const tableRow = document.createElement("tr");
    tableRow.append(
      cell(`${label} — ${items[0].service_request_code}`),
      cell(`${items[0].official_timeframe_days} calendar days`),
      cell(String(items.length)),
      cell(String(beyond)),
    );
    benchmarkTable?.append(tableRow);
    return {
      label,
      items,
      beyond,
      percentBeyond: percent(beyond, items.length),
      code: items[0].service_request_code,
      timeframe: items[0].official_timeframe_days,
    };
  });
  const unbenchmarkedPending = pending.length - benchmarkEligiblePending.length;
  text("[data-benchmark-answer]", `${beyondPending.length} of ${benchmarkEligiblePending.length} eligible pending applications are overdue. The figure excludes ${unbenchmarkedPending} Fertilizer applications because their applicable timeframe has not been confirmed.`);

  mountChart("[data-chart='benchmark']", {
    grid: { top: 26, right: 76, bottom: 44, left: 250 },
    xAxis: {
      type: "value",
      min: 0,
      max: 100,
      interval: 25,
      name: "Share overdue",
      nameLocation: "middle",
      nameGap: 30,
      axisLabel: { formatter: "{value}%", color: chartColors.muted, fontSize: 11 },
      axisLine: { lineStyle: { color: chartColors.forest } },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: chartColors.line } },
    },
    yAxis: {
      type: "category",
      inverse: true,
      data: benchmarkStats.map((item) => `${item.label} — ${item.code}`),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: chartColors.forest, fontSize: 11, fontWeight: 700, width: 220, overflow: "break", lineHeight: 14 },
    },
    series: [{
      name: "Overdue",
      type: "bar",
      barWidth: 24,
      showBackground: true,
      backgroundStyle: { color: chartColors.sageWash },
      data: benchmarkStats.map((item) => item.percentBeyond),
      itemStyle: { color: chartColors.orange },
      emphasis: { itemStyle: { color: chartColors.orangeLight } },
      label: {
        show: true,
        position: "right",
        color: chartColors.forest,
        fontWeight: 800,
        formatter: (params) => `${benchmarkStats[params.dataIndex].beyond} of ${benchmarkStats[params.dataIndex].items.length}`,
      },
      tooltip: {
        formatter: (params) => {
          const item = benchmarkStats[params.dataIndex];
          return tooltipHtml(`${item.label} — ${item.code}`, [
            `${item.beyond} of ${item.items.length} pending applications are overdue`,
            `${item.percentBeyond}% overdue`,
            `Published timeframe: ${item.timeframe} calendar days`,
          ]);
        },
      },
    }],
    media: [{
      query: { maxWidth: 620 },
      option: {
        grid: { top: 26, right: 58, bottom: 44, left: 118 },
        yAxis: { axisLabel: { width: 102, fontSize: 9, lineHeight: 12 } },
      },
    }],
  }, {
    dataCount: benchmarkStats.length,
    description: `${beyondPending.length} of ${benchmarkEligiblePending.length} eligible pending applications are beyond the published timeframe. Fertilizer applications are excluded because their applicable timeframe has not been confirmed.`,
  });

  // 05 — pathway fit with reason-level threshold suppression.
  const pathwayGroups = groupBy(records, "pathway_fit");
  const pathwayTable = document.querySelector("[data-pathway-table]");
  const pathwayStats = Object.entries(pathwayLabels).map(([key, label]) => {
    const count = (pathwayGroups.get(key) || []).length;
    const tableRow = document.createElement("tr");
    tableRow.append(
      cell(label),
      cell(count < threshold ? "Not shown" : String(count)),
      cell(count < threshold ? "Not shown" : `${percent(count, records.length)}%`),
    );
    pathwayTable?.append(tableRow);
    return { key, label, count, suppressed: count < threshold };
  });

  mountChart("[data-chart='pathway']", {
    grid: { top: 22, right: 74, bottom: 44, left: 150 },
    xAxis: {
      type: "value",
      min: 0,
      max: records.length,
      interval: 5,
      name: "Applications",
      nameLocation: "middle",
      nameGap: 28,
      axisLine: { lineStyle: { color: chartColors.forest } },
      axisTick: { show: false },
      axisLabel: { color: chartColors.muted, fontSize: 11 },
      splitLine: { lineStyle: { color: chartColors.line } },
    },
    yAxis: {
      type: "category",
      inverse: true,
      data: pathwayStats.map((item) => item.label),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: chartColors.forest, fontSize: 12, fontWeight: 700 },
    },
    series: [{
      name: "Applications",
      type: "bar",
      barWidth: 28,
      data: pathwayStats.map((item) => ({
        value: item.suppressed ? null : item.count,
        itemStyle: { color: item.key === "does_not_fit" ? chartColors.orange : chartColors.forest },
      })),
      emphasis: { itemStyle: { color: chartColors.orangeLight } },
      label: {
        show: true,
        position: "right",
        color: chartColors.forest,
        fontWeight: 800,
        formatter: (params) => `${params.value} · ${percent(params.value, records.length)}%`,
      },
      tooltip: {
        formatter: (params) => {
          const item = pathwayStats[params.dataIndex];
          return tooltipHtml(item.label, [
            `${item.count} of ${records.length} applications`,
            `${percent(item.count, records.length)}% of included applications`,
          ]);
        },
      },
    }],
    media: [{
      query: { maxWidth: 520 },
      option: { grid: { top: 22, right: 62, bottom: 44, left: 92 } },
    }],
  }, {
    dataCount: pathwayStats.length,
    description: `Reported pathway fit across ${records.length} included applications. ${pathwayStats.find((item) => item.key === "does_not_fit").count} report that the pathway does not fit the product.`,
  });

  const mismatchRecords = pathwayGroups.get("does_not_fit") || [];
  const reasonGroups = groupBy(mismatchRecords.filter((record) => record.pathway_fit_reason), "pathway_fit_reason");
  const pathwayReasons = document.querySelector("[data-pathway-reasons]");
  [...reasonGroups.entries()].sort((a, b) => b[1].length - a[1].length).forEach(([reason, items]) => {
    const row = document.createElement("div");
    const term = document.createElement("dt");
    term.textContent = reasonLabels[reason] || reason;
    const value = document.createElement("dd");
    value.textContent = items.length < threshold ? "Not shown" : `${items.length} reports`;
    row.append(term, value);
    pathwayReasons?.append(row);
  });
  text("[data-pathway-answer]", `${mismatchRecords.length} of ${records.length} applications report that the submitted pathway does not fit the product.`);
})();
