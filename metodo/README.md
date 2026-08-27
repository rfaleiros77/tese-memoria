# The method

A way for an agent that works with the same person over months to **keep what
its errors taught it**, and to find it again when it matters. It is
vendor-independent: it needs an agent that can read a file at the start of
work, read `git log`, and propose text for a human to approve. Any model.

The method has four parts. Each has its own page; this one is the whole in a
screen.

| Part | One line | Page |
|---|---|---|
| **Format** | Five lines per lesson, titled by the *trigger* — the situation in which it is recognised | [`01-format.md`](01-format.md) |
| **Filter** | Keep the fix, never the failure; four things that must not be stored | [`02-filter.md`](02-filter.md) |
| **Budget** | One file, hard line limit; when full, consolidate — never split | [`03-budget.md`](03-budget.md) |
| **Cycle** | Harvest from commits → human approves → agent reads it back before building or debugging | [`04-cycle.md`](04-cycle.md) |

And one test, to run before adopting any of it: [`05-test.md`](05-test.md) —
a pre-registered check of whether the agent's proposed lessons are good enough
to *approve* rather than *rewrite*. Plus one sensor, [`06-recall-log.md`](06-recall-log.md):
a one-line log of when lessons come back, which is how the open question of
associative memory gets its evidence.

## The two ideas underneath

**Learning and state are different things** and are usually stored together.
State ("waiting on approval", "v1.3 published") ages every session; a lesson
("the first row of that table wins — there is no parameter to choose") should
last years. Mixed in one file, the lesson is overwritten with the state, or
the file grows until nobody reads it. The corpus this was measured on had both
failures: 1,044-line handovers, and 2 user corrections captured in 50 files.

**The bottleneck is finding, not capturing.** The measured corpus already
wrote its lessons — 93% of fix commits explain themselves. What failed was
re-finding: an audit of memory retrieval failed at memory retrieval, because
the analyst searched in today's words for a lesson written in yesterday's. The
format, the single file and the trigger-titles exist to attack *that*.

## What the method is not

- Not a vector store or a retrieval benchmark. The store is one text file the
  agent reads whole.
- Not automatic. A human approves every lesson. The agent writing its own
  manual unsupervised was judged the main risk, and the one published design
  that writes unsupervised (a background reviewer) is cited as a reference,
  not adopted.
- Not proven beyond one corpus. See the article's *Limitations*.

## Example implementation

The corpus this was built on runs it as: a global `APRENDIZADO.md` (400-line
budget), a harvest step inside the end-of-day sync routine, a "remember before
building" rule in the global instruction file, and an adversarial critic agent
used on conclusions before they are recorded. Those are one implementation —
the product names are irrelevant to the method.
