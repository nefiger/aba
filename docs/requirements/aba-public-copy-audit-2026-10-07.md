# ABA Public Copy Audit Against the Positioning Brief

Status: DRAFT for Jen's approval. No site file has been edited.
Audited: 2026-10-07
Against: `docs/requirements/aba-public-positioning-and-language-brief.md`, with Jen's decisions on conflicts 1 and 3.
Scope: line-level changes only. Same pages, structure and design. Pages not listed here already comply and are left alone.

Decisions applied
- South Africa: out of headlines and the home hero. One plain factual sentence stays on About. "South African Act 36" stays on the tracker, where it is the fact about what can be submitted.
- Members: "decide" and "agree" become participation language. ABA "develops positions with members and technical advisers before it speaks". I used the softer form of that line because I don't yet know whether a documented consultation process will exist at launch. If it will, we can say "documented consultation" and "publishes its positions".

Needs your call before editing (new items from this audit)
- A. Home hero title. The central line is 12 words, and the guardrails require every hero title to stay on one line at every viewport. Recommendation: keep the h1 "Building Africa's biologicals sector." and make the central line the first sentence of the lede. That is still proposition first.
- B. Tracker insights page. It renders illustrative figures. A staged "Insufficient data" state means the landing page should not link to illustrative findings. Recommendation: the landing page shows the Insufficient data state, and the illustrative page stays in the repo but is unlinked from public pages (the privacy page also links to it). Alternative: keep it linked and relabel. Your call.
- C. Correction route (still open from the brief, item 4). The privacy page says "Reply to the ABA invitation or submission email". That is a real route for submitters, but there is no route for regulators or anyone else. We need one address for corrections before we can say so on the landing page. I have drafted around it.
- D. Provenance labels and "last verified" dates are part of the tracker framing. I have written the copy so it only states the rule ("each finding shows its source and when it was last checked"). The tracker workstream must have those labels in place before findings are published. I'm not touching tracker data or importer code.

## Ranked changes

Rank 1 is the highest impact. Within a rank, items are in page order.

### Rank 1: Home page ([index.html](soft-launch/prototype/index.html))

1.1 Hero lede. Lead with the proposition and drop "stronger voice, more suitable regulation".
- Now: "African manufacturers, formulators, distributors and specialists are building an organised sector with a stronger voice, more suitable regulation, clearer product information and better conditions for local biologicals."
- Proposed: "ABA is building the regulatory and commercial environment for biological agriculture across Africa. It brings manufacturers, formulators, distributors and specialists together around shared evidence and proportionate, science-based regulation."
- Why: "stronger voice" implies a mandate, "more suitable regulation" reads as weaker regulation, and the central line is missing.

1.2 "Why ABA exists" heading and body. Drops "common voice" and adds the national-associations line.
- h2 now: "Common problems need a common voice." Proposed: "Regulation and market access differ at every border."
- Body now: "Biologicals companies across Africa face many of the same problems, but usually have to tackle them alone." Proposed: "Biological manufacturers increasingly work across African borders, while regulation and market access remain fragmented. National associations remain essential. ABA works on what they cannot do alone."
- "Today" panel now: "Registration requirements are often unclear or poorly suited to biologicals. Local products and expertise can be hard to find, and one company has limited influence on its own." Proposed: "Requirements for biological products differ from country to country and are often unclear. Local products and expertise can be hard to find, and one company has limited influence on its own."
- "What ABA does" panel now: "ABA identifies problems shared across the sector, gathers the facts behind them and takes agreed priorities into regulatory, policy and market discussions." Proposed: "ABA gathers evidence on how regulation works in practice, and works with regulators, researchers, growers and industry on proportionate, science-based, risk-appropriate regulation."

1.3 Membership cycle. Participation language replaces decision language (decision 3).
- h2 now: "Members decide what matters." Proposed: "Members bring what matters."
- Lede now: "Members bring the issues they face in practice. Together, they decide where ABA should focus and what the alliance should take forward." Proposed: "Members bring the issues they face in practice. ABA gathers the evidence and develops positions with members and technical advisers before it speaks."
- Step 3 now: "Members agree / What ABA should say / Shared positions are developed before ABA speaks on the sector's behalf." Proposed: label "Members help shape", h3 unchanged, body "ABA develops positions with members and technical advisers before it speaks on any issue."
- Step 5 body now: "Members help judge the response and set the next priorities." Proposed: "Members help review the response and shape the next priorities."
- "Put shared problems on the agenda" body now: "...and help decide which ones ABA should take forward." Proposed: "...and help shape which ones ABA takes forward."

1.4 Footer (shared, in [app.js](soft-launch/prototype/assets/app.js)). Appears on every page.
- Brand line now: "An African alliance working on the regulatory and market barriers that biologicals companies cannot solve alone." Proposed: "Building the regulatory and commercial environment for biological agriculture across Africa."
- Legal line now: "African Biologicals Alliance · [year] · Based in South Africa and open to participation across Africa." Proposed: "African Biologicals Alliance · [year]". South Africa moves to About only (decision 1).

### Rank 2: Registration Tracker landing ([registration-tracker.html](soft-launch/prototype/registration-tracker.html))

2.1 Lede.
- Now: "Share the current position of a South African Act 36 application and help ABA show where biological products are being delayed."
- Proposed: "Share the current position of a South African Act 36 application and help build an evidence base on where applications wait and why."

2.2 Insights section becomes the staged state (needs decision B).
- Now: label "Registration insights", h2 "See the patterns applicants cannot show alone.", body "ABA combines suitable submissions into grouped insights without naming the people, organisations or products behind them.", link "View illustrative insights".
- Proposed: label "Regulatory intelligence", h2 "Insufficient data." Body: "Findings appear here once enough reviewed submissions are available. Each finding shows its source and when it was last checked, and none names a person, organisation or product." No link to the illustrative page.
- Why: provenance and last-verified are the intelligence-infrastructure framing, and the state is honest. This is a wording change to the existing section, not a new view.

2.3 Item 03 under "Your update helps ABA identify sector-wide delays".
- Now: "Which registration barriers appear repeatedly." Proposed: "Where the same requirements or questions come up again and again." Neutral and evidence-led.

2.4 The "How ABA protects tracker information" link stays. No other tracker landing copy changes.

### Rank 3: About ([about.html](soft-launch/prototype/about.html))

3.1 "The problem" third paragraph. Adds national associations; drops "voice".
- Now: "Without an organised sector voice, recurring problems remain individual problems. Useful registration experience is scattered, local capability is less visible, and buyers and institutions have no shared source of clear, reviewed sector information."
- Proposed: "National associations remain essential. ABA addresses a different problem: biological manufacturers increasingly work across African borders, while regulation and market access remain fragmented. Useful registration experience is scattered, local capability is less visible, and there is no shared, reviewed source of regulatory information across countries."

3.2 Pillar 02 (Enabling environment and harmonisation). The most important regulatory-language fix on the site.
- Now: "Use registration experience and shared evidence to argue for clearer, more suitable processes and greater consistency across African markets."
- Proposed: "Use registration experience and shared evidence to support proportionate, science-based, risk-appropriate regulation, harmonised across African markets where the science justifies it, with less unnecessary duplication."

3.3 Pillar 04 (Membership, chapters and governance). Removes "South Africa first" (decision 1).
- Now: "Build a member alliance in South Africa first, with participation rules and local leadership shaping any future work elsewhere in Africa."
- Proposed: "Build a member alliance with clear participation rules and governance, and shape work in each country with local participants."

3.4 Pillar 01.
- Now: "Agree the issues that matter to members and take a credible sector position into policy, regulatory and market discussions." Proposed: "Develop positions with members and technical advisers, and take them into policy, regulatory and market discussions."

3.5 Pillar 05. Adds quality and enforcement.
- Now: "Develop clearer, reviewed information about biological products and the evidence behind them, without implying endorsement or automatic listing." Proposed: "Develop clearer, reviewed information about biological products and the evidence behind them, and support action against fraudulent products. Membership does not mean endorsement."

3.6 "Clearer pathways" under "What the work is meant to change".
- Now: "...where requirements are unclear, inconsistent or poorly suited to biological products." Proposed: "...where requirements are unclear, inconsistent or out of proportion to the risk."

3.7 "ABA's response" third paragraph. Adds the IPM and farmer-choice framing. Append: "ABA works with integrated pest management and farmer choice in mind, and stands for product quality and evidence." (Single new sentence. The brief's positioning has no home on the site today.)

3.8 "Where ABA works" section (decision 1).
- h2 now: "Based in South Africa". Proposed: "Participation from across Africa."
- First paragraph unchanged (the one factual sentence about South Africa and the invitation to others).
- Second paragraph now: "Work in another country must be shaped with local participants and respond to that country's needs. ABA will not imply a chapter or active presence before one exists." Proposed: delete. It is institutional protection copy, and item 3.3 covers the point.

3.9 "A credible sector voice" h3 under "What the work is meant to change". Proposed: "A credible evidence base." Body unchanged, except "stronger basis for collective representation" stays as is.

### Rank 4: Membership ([membership.html](soft-launch/prototype/membership.html))

4.1 "Collective representation" body. Now: "Help decide which shared issues ABA takes into regulatory, policy and market discussions." Proposed: "Help shape which shared issues ABA takes into regulatory, policy and market discussions."
4.2 "Better regulatory evidence" body. Now: "...where requirements do not fit biological products." Proposed: "...where requirements are unclear, inconsistent or out of proportion to the risk."
4.3 "Member decisions" h3. Proposed: "Working groups and governance". Body unchanged.
4.4 "Who membership is for". Append: "Membership does not mean ABA endorses a member's products."

### Rank 5: Smaller fixes, privacy, forms and root

5.1 Privacy ([privacy.html](soft-launch/prototype/privacy.html)), tracker section. Add one row or sentence stating the structural separation: "Tracker submissions are kept apart from ABA's member records and are never used as sales leads. ABA only contacts you about commercial matters if you ask it to." This is a commitment, so the tracker workstream should confirm it matches how the data is handled before we publish it.
5.2 Privacy, "Questions or corrections". Waiting on decision C. If the address is chosen, add: "Regulators and anyone else can ask for a correction at [address]."
5.3 Home founding-members block. The four "Member logo / Pending" placeholders expose unconsented members and show prototype framing. Proposed: remove the four placeholders and keep the paragraph. Optional (conflict 6 in the brief). Alternative: leave them in.
5.4 Em dashes (non-negotiable rule). Fix:
- [member-intake.html](soft-launch/prototype/member-intake.html): "Describe it in your own words — a person reads this" becomes "Describe it in your own words. A person reads this, not a scoring system."
- [technical-network.html](soft-launch/prototype/technical-network.html): "separate from membership — applying here" becomes "separate from membership. Applying here won't make your organisation a member."
- [member-intake.html](soft-launch/prototype/member-intake.html): "There is no saved draft in this first release." becomes "Your answers are not saved as a draft." ("First release" is release narration.)
- Tracker pages under `registration-tracker/`: `intake-flow/index.html` has two em dashes in hints ("A best estimate is fine — this does not need..." and "You won't be asked for the number itself — only whether one exists."), plus code-label dashes for registration types that are data labels, not prose. `public-dashboard/index.html` has "Illustrative data — not sector findings." These are outside your stated scope (soft-launch/prototype and root). I'd fix the two hint sentences and leave the data labels. Tell me if you want them excluded.
5.4b Dashboard: if decision B is "unlink", the dashboard's own copy is not touched.
5.5 Root [index.html](index.html). The gateway shows "ABA soft launch", "Current deployment / Soft launch" and "African Biologicals Alliance · July 2026", which is release narration and stale. Proposed: title "African Biologicals Alliance", delete the "Current deployment / Soft launch" and "July 2026" labels, keep the two links. If this page is only the internal launcher and not a public entry, say so and I'll leave it.

### No change needed
- Technical Network page (standards, evidence, competing-interest and responsible-claims language already match the brief).
- Membership interest page (a state block: expression of interest is not membership).
- Member application: the "What becomes public" note, organisation-name-only listing and the review sentence.
- Home Technical Network and "What would you like to do?" sections.
- The tracker mechanics: privacy threshold, intake flow, resources page.

### Noted, not changed
- The member application's "Local contribution and independence" section asks about multinational agrochemical ownership or control. The strategy notes that eligibility ("African control, broad participation") is not decided. I'm leaving the form alone. It is a governance decision, not copy.
- Technical Network page has the eyebrow "Where ABA needs expertise" above the h2 "Who should apply" and a second "Who should apply" in the hero. Cosmetic, outside the brief. Say if you want it fixed.

## Files that would change
[index.html](soft-launch/prototype/index.html), [about.html](soft-launch/prototype/about.html), [membership.html](soft-launch/prototype/membership.html), [registration-tracker.html](soft-launch/prototype/registration-tracker.html), [privacy.html](soft-launch/prototype/privacy.html), [member-intake.html](soft-launch/prototype/member-intake.html), [technical-network.html](soft-launch/prototype/technical-network.html), [app.js](soft-launch/prototype/assets/app.js) (footer), root [index.html](index.html), and `registration-tracker/intake-flow/index.html` if you want the two hints fixed.

`app.js` changes, so its cache key moves to `?v=20261007a` across every referencing page. No CSS changes are planned, so `styles.css` keeps its key. The preflight and render check run after the edits.
