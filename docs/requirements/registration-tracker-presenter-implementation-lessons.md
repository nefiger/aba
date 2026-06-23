# Registration Tracker Presenter Implementation Lessons

Context date: 2026-06-23

This is a local implementation note for the registration tracker presenter-page work on branch `codex/registration-tracker-presenter`.

## Completion Note

The presenter-page work was later included in PR #1 and merged into `main` at `58759d2 Merge pull request #1 from nefiger/codex/registration-tracker-site-integration`. The follow-up items below are retained as historical context, not current blockers.

## Lessons Learned

- Create the feature branch before editing whenever possible. This work started on `main` and was moved safely before commit, but starting on the branch keeps the story cleaner.
- Keep presenter pages separate from product wireframe pages. `docs/registration-tracker/index.html` works as a narrative wrapper, while `registration-tracker/index.html` remains the combined product walkthrough.
- Use static HTML/CSS diagrams for presentation material. They are easier to maintain than screenshots or embedded iframes and avoid drift caused by small prototype-screen changes.
- Verify relative links from the page's actual folder. The root launcher and `docs/index.html` need different relative paths to reach the same presenter page.
- Browser verification is worth doing for static HTML. The first pass caught decorative flow connectors that created element-level overflow warnings even though the page itself did not horizontally scroll.
- Test local static pages through a localhost server when browser tooling blocks direct `file://` navigation.
- Stop local test servers after verification. If one process keeps answering on the test port, check and stop all listeners before ending the session.
- Keep branch-context notes explicit. The branch status note helped separate what was committed, what was pushed, what was not merged, and what should happen next.
- Commit planning/status notes intentionally. They are useful for handoff, but they should be staged deliberately so implementation commits stay focused.
- Pushing a feature branch backs it up remotely and enables later PR/review work. It does not merge the branch into `main`.
- When a presenter page feels repetitive, identify the single core unit of the story. For this page, the unit is the registration record for a product/application lodged with the Registrar's office.
- The strongest edit came from changing the frame from a linear workflow to a registration record lifecycle: lodged application, structured record, ABA review, trusted record, useful outputs.
- Keep a live-meeting presenter page different from an exploratory website page. The presenter page should read top-to-bottom as a meeting script, with links available for jumps.
- Separate member-specific advocacy from sector-wide advocacy. Member-specific support depends on contributed, reviewed, consented member records; sector-wide advocacy can use anonymised aggregate patterns.
- Public dashboard value should be secondary to ABA's trusted internal registration picture. It is still useful because anonymised registration patterns create sector intelligence that appears to be missing from the biologicals industry.
- Use adjacent support assets as reference, not as content to copy. The flow-intelligence page contributed the normalization layer and Africa-wide/South Africa-now framing, but the tracker presenter should stay focused on the Registrar-office/member-registration story.
- Browser verification can be uneven with local HTTP or viewport controls. Record what was actually verified and call out limitations instead of overstating test coverage.

## Follow-Up For Next Implementation Session

- Continue edits on `codex/registration-tracker-presenter` unless the branch has already been merged.
- Commit and push the final presenter-page refinements before merging to `main`.
- Start ABA site integration work on a separate branch after this presenter page branch is settled.
