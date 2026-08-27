# 04 — The cycle: harvest → approve → read back

Three moments. Two are the agent's; one is the human's, and it is the one
that cannot be skipped.

## 1. Harvest — from commits, at the end of the period

Lessons are harvested from **what was already written without anyone
deciding to write it**: the commit message. In the measured corpus 93% of fix
commits have a body and 71% explain themselves in twenty words or more
([`evidencia/02`](../evidencia/02-fix-commits.md)) — written at the instant
the error was fresh, in the one place where writing is required to proceed.

At the end of a working period (the corpus does it inside an end-of-day sync
routine), the agent:

```bash
git log --since=<last harvest> --format='%h %s%n%b' -i --grep='fix\|corrig\|error\|bug'
```

- reads the fix commits of the repositories touched;
- from those with a narrative body (mechanism, cause, what was invisible),
  proposes **one to three** lessons in the five-line format;
- **adds the corrections the human made in conversation** that produced no
  commit — the rarest, highest-signal item;
- applies the filter ([`02-filter.md`](02-filter.md)) *before* proposing.

"Nothing to harvest this period" is a valid result, said out loud.

The scheduled moment is not the only trigger. The question itself — the human
asking *"what did we learn?"* — was observed to produce a full harvest outside
any routine, and it is the cheapest trigger there is: it needs no
infrastructure, only the habit of treating the question as executable. The
end-of-period moment exists so harvesting does not *depend* on someone
remembering to ask; the question, whenever it comes, is always valid.

The harvest moment carries one extra question — *did any lesson fire this
period, and what summoned it?* — logged as one line per event
([`06-recall-log.md`](06-recall-log.md)). It costs seconds and it is the
entire data-collection apparatus for the associative question the article
leaves open.

Why not an end-of-day reflection instead? Because by then the agent no longer
remembers the error it fixed at ten in the morning — the same hindsight decay
that makes the After Action Review literature insist on *same day*. The
commit is the record at the instant. A reflection step is useful for what
never became a commit (an abandoned path, a decision in conversation); it is
not a substitute.

## 2. Approve — the human, always

The agent proposes; the human approves; only then is it written. **Never
write without showing.** The risk this guards against is specific: the agent
writing its own manual. An approved-in-haste false rule goes into the file
the "remember before building" rule treats as truth — it happened once in the
corpus with no automation at all.

Whether approval is fast enough to be sustainable is an empirical question,
not a design assumption. It is the thing [`05-test.md`](05-test.md) measures,
with the cut-off declared before the result.

Automation of this step was explicitly deferred: *"we keep learning, and once
the method improves, then we change."* The half that can be automated safely
is the read-only half (pulling, reporting); never the half that decides.

## 3. Read back — before building, and before debugging

The file is read whole at the start of any work that **builds** something new
or **debugs** something broken. Not on every question, not on trivial edits —
that would make it noise.

Debugging was added late, and the reason matters: every exemplary lesson in
the corpus (`await` missing, `NUMERIC` as string, `U+2011`) surfaced while
*debugging*, not building. A rule that read the file only before construction
was reading it at exactly the wrong moment.

This is the closest cheap implementation of the one mechanism the
lessons-learned literature says actually works: *push at the point of need*,
trigger-matched, rather than a database someone is supposed to remember to
consult. The agent is the only component in a solo practice that can do the
pushing.

## What the cycle does not capture

- The lesson of a conversation that produced no code and no correction.
- The near-miss disguised as success ("where we got lucky") — no step here
  asks for it. The corpus treats this as a known gap, carried, not absorbed.
