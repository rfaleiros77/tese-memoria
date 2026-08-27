# 05 — The test: is the harvest good enough to approve, not rewrite?

Before adopting the cycle, run this once. Its purpose is to check the one
assumption that sinks the method if false: **that the agent's proposed lessons
are reliable enough for the human to approve quickly.** If approving requires
reopening the commit and reconstructing the case, cost per item jumps from
seconds to minutes, a busy day becomes hours, and — worse — hurried approval
writes false rules into the file that later work will trust.

## Procedure

1. Pick the **busiest day** of fix commits in the window (worst case for
   volume).
2. The agent proposes lessons from those commits in the five-line format,
   **with no hand-tuning**.
3. The human reviews cold — not in the session that produced the commits.
4. **Declare the cut-off before looking at the result.** The corpus used:
   *more than 3 rejected of 8 (> 30%) and the design is abandoned* — above
   that rate the reviewer is not reviewing, they are rewriting.
5. Record minutes spent and the rejection count.

## What the corpus got

41 fix commits on the busiest day; 8 lessons proposed; **0 rejected**; review
in minutes. A second run on a different domain proposed 10 and had 0
rejected. See [`evidencia/06`](../evidencia/06-harvest-test.md) for both,
including which figures from the original session note were retired on
re-measurement.

**With a real caveat, registered by the human:** run 1 drew almost entirely
from one project on a day its fix commits were nearly all narrative, and run
2 from the corpus's highest-narrative repository. The tests prove extraction
works on *well-written commits*. They do not prove it works on a project with
a different message style. Re-run on the first harvest that hits a
poorly-written repository; if quality drops there, the bottleneck is the
commit message, not the extraction — and the fix is upstream, in how commits
are written.

## Why pre-register the cut-off

Because a test whose pass mark is chosen after the result is not a test. The
adversarial critic that reviewed this work ([`templates/critic-prompt.md`](../templates/critic-prompt.md))
flagged this assumption as the one capable of sinking the design; fixing the
threshold in advance is what made the result meaningful.
