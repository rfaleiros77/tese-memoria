# 06 — Can lessons be extracted from commit messages? (pre-registered test)

**Design, fixed before the result (22 Aug 2026).** Take the fix commits of the
busiest day in the window (28 Jul 2026). The agent proposes lessons in the
five-line format with no hand-tuning. The user reviews cold. **Cut-off
declared in advance: more than 3 rejected of 8 (> 30%) and the design is
abandoned** — at that rate the reviewer is not reviewing, they are rewriting,
and the method collapses into "write it yourself with extra steps".

Under the shipped criterion, 28 Jul measures: 149 commits corpus-wide, **41
fix commits** — 30 of them from one project (R02) at its peak, and 29 of
those 30 carrying a ≥ 20-word narrative. (The session note that designed the
test said "57 commits" under an unrecorded grep; that figure is retired, the
numbers here reproduce.)

**Result: 8 proposed, 0 rejected.** All eight came from R02. Review time was
minutes, not the 3 min per item the adversarial critic had estimated as the
failure case.

**Caveat, registered by the operator and real.** The test drew almost entirely
from one project on a day its fix commits were nearly all narrative (29/30);
R02's whole-window narrative rate is 68% — at the corpus mean, not above it,
but the *day* sampled was the project writing at its best. The test proves
lesson extraction works on **well-written commits**. It does not prove it
works on a project with a different message style. To be re-evaluated on the first harvest that spans
other repositories; if quality drops there, the bottleneck is the commit
message, not the extraction.

Three of the eight, rewritten with synthetic data, are in
[`templates/`](../templates/) as format examples.

## Second run — different domain (23 Aug 2026)

The caveat above asked for a re-test outside the original project. Run on the
corpus's creative project — an AI-video production, a different domain from
the SAP/data work of the first test, and the repository with the **highest**
narrative rate in the corpus (37 of 39 fix commits ≥ 20 words, 95%; `02`,
R03). Cut-off declared before review: **more than 3 rejected of 10** and
cross-domain extraction is refuted.

**Result: 10 proposed, 0 rejected.** The lessons were also qualitatively
different — prompt-writing (identity by anchor image, action as subject),
fake-measurement detection, queue-protocol failures — where the first run's
were data-extraction lessons. Extraction crosses domain.

**What is still not shown:** neither run tested a poorly written repository —
run 1 sampled a day of near-total narrative (29/30) and run 2 the corpus's
highest-narrative repo (95%). That test remains owed; until then the honest
claim is that extraction works where the narrative exists, not that it
creates narrative where there is none.
