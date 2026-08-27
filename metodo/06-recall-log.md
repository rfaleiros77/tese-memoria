# 06 — Observing recall: the method's own instrumentation

The open question this method does not answer (the article's *What is still
open*) is associative memory: an index has one door, an association has many,
and nobody decides to store a memory. The rule adopted there was **collect
without building** — no network, no engine, until there is evidence to design
on. This page is the collection.

## The sensor

One question, asked at the moment the cycle already stops to look at the
period (the harvest, [`04-cycle.md`](04-cycle.md)):

> **Did any lesson fire this period — and what summoned it?**

Each event is one appended line in [`templates/RECALLS.md`](../templates/RECALLS.md):

```
date | lesson | cue — what summoned it | title-match / association / miss
```

`title-match` says the trigger-index worked. `association` says the lesson
arrived by a door nobody built — the row that, accumulated, tells you whether
an associative layer is worth designing. `miss` is the failure the corpus
already measured once ([`evidencia/05`](../evidencia/05-search-by-vocabulary.md)):
searched in one vocabulary, written in another — logged as the pair of terms,
so the gap is data.

## Why it is shaped this way

- **It rides an existing moment.** A separate ceremony would inherit the fate
  of every separate ceremony in the corpus (2 of 50). One question inside the
  harvest costs seconds.
- **It is a log, not a policy.** Nothing reads it at start of work; it has no
  budget; it never edits the lessons file. Data and instruction stay separate
  for the same reason lessons and state do.
- **"Nothing fired" is valid and unlogged.** A sensor that must produce
  output produces noise.
- **The decision it feeds is pre-committed.** If months of log show
  `association` rows are rare, the associative layer dies cheaply — that is a
  result, not a failure. If they are frequent, the network gets designed on
  top of recorded paths instead of intuition. Either way, the log decides.

It also carries the honest performance question. The literature's success
criterion for agent memory is behavioural — *repeat fewer mistakes* — and no
controlled comparison exists here (see *Limitations*). A recall log makes
the behavioural claim measurable over time: lessons that fire and prevent
rework are counted, and so are errors that recur despite a written lesson.

## If you run this on your own corpus

The log is yours and stays yours — like everything in this method, it lives
in your tree and nothing phones home. If you *want* to share, the
repository's issue templates take two kinds of report, structure only, never
lesson content: your harvest-test numbers ([`05-test.md`](05-test.md)) and
recall observations (kind, cue type, vocabulary pair for misses). Every
voluntary report is one more corpus answering the question this method could
only ask of one.
