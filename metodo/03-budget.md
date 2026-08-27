# 03 — Budget instead of pruning policy

**One file. A hard line limit. When it is full, consolidate — never split.**

## Why one file

Reading one large file is cheap; *searching* across several dozen is expensive
and fallible — the corpus proved it on itself when a lesson written `U+2011`
was searched for as "invisible character" and not found. Per-project memory
does not cross projects, so a lesson that matters everywhere gets copied
everywhere: the same rule was found in 15 files across three layers, with one
memory file in three copies, one of them already drifted
([`evidencia/04`](../evidencia/04-duplication.md)).

Order of magnitude: five lines per lesson; 200 lessons ≈ 1,000 lines ≈ 12k
tokens, read whole at the start of work. At the measured rate (2–3 lessons a
week), 200 lessons is more than a year away. *(Estimate, not measurement.)*

The asymmetry decides it: splitting a file later is half an hour — the
section headings already exist. Gathering dozens of scattered files is a hunt
through divergent names and duplicates.

## Why a budget and not a policy

Nobody prunes out of virtue; they prune because it does not fit. Every
lessons system in the literature that relied on periodic review died of
neglect (the article's sources on lessons-learned databases). A line limit is
the only pruning rule that enforces itself: the file refuses to grow, so the
next addition forces a look at what is stale or duplicated.

**Not fitting is a signal of an old or duplicated lesson — not a signal that
the file needs partitioning.** The corpus uses 400 lines. Pick the number
your agent can read whole without it being the largest thing in its context.

## Consolidation, when it happens

- Merge lessons with the same trigger.
- Retire a lesson whose *Cost* line can no longer be verified, or whose rule
  was falsified — and say so in the commit, so the retirement is itself a
  record.
- Show the human what was merged before writing. Consolidation is the one
  moment the file is rewritten rather than appended, and rewriting is where
  lessons get lost.

## Reference — and where the independent source does *not* agree

Hermes also consolidates rather than partitions — but its curator runs on a
**periodic, inactivity-triggered review**, not on a size budget
(`agent/curator.py`, module docstring and `should_run_now()`; read 23 Aug
2026). That is the design this page argues against. On the filter the two
sources converge; on the trigger for consolidation they do not, and **no
independent source supports the budget trigger**. It rests on the corpus
evidence and the literature on lessons databases alone. Recorded because an
earlier draft claimed convergence on this point too; the adversarial review
caught it.
