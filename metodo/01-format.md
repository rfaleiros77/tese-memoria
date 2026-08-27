# 01 — The format: five lines, titled by the trigger

```
### <trigger — the situation in which the lesson is recognised>
- **When:**    the cue that tells you this lesson applies
- **Do:**      the rule, stated in the positive
- **Because:** why it was invisible / why the rule exists
- **Cost:**    the real case — date, and where the record is
- Links: [[neighbouring-lesson]]
```

## Why each line

**The title is the trigger, not the bug's name.** A lesson is retrieved at
the moment a situation matches it, so the title must describe the situation
as it will look *next time*: "a total equals exactly twice the KPI", not
"accumulator double-counts the alias column". The agent reading the file
before work is pattern-matching situations; name the pattern. (Outside AI
this has the best track record of any lessons-system design: NASA's
push-at-point-of-need after its lessons database was found unused, and the
claim-shaped titles of evergreen-note practice. See the article's sources.)

**When** is the cue — what you notice. It is distinct from the title: the
title is the class, *When* is the symptom that puts you in it.

**Do** is in the positive. "Use `RANGE OF` and append" — never "`VALUE #()`
doesn't work on select-options". Negative claims harden into refusals the
agent cites against itself long after the problem is gone (see `02-filter.md`).

**Because** records *why it was invisible*. The lessons that cost the most in
the corpus were not about being wrong; they were about a check that returned
zero because it was broken, a preview that truncated, a hyphen that was not a
hyphen. If the lesson does not say why nothing warned you, it will not be
believed when it matters.

**Cost** is the one line that keeps the lesson honest. A rule without its case
rots: in the corpus, 21 of 167 memories were rules with no incident behind
them, and one rule in the global instruction file stayed *false* for weeks
until someone checked it against the code. The error itself stays in `git log`
(date, diff, full narrative); the lesson carries the pointer and the cost.

**Links** are the substrate of something not built yet — associative recall,
where the same lesson is reachable by paths nobody indexed. Today they cost
nothing and make the file navigable; the article's *What is still open*
explains what they might become.

## Three lessons in this format (synthetic data)

### A total equals exactly twice the matching KPI
- **When:** a grouped total is 2× the corresponding headline figure.
- **Do:** check whether the accumulator sums both the measure **and** its alias (`actual`/`budget`/`target` columns).
- **Because:** while no report declares the alias among its measures the defect is invisible; the first one that does doubles everything.
- **Cost:** a margin-analysis project, Jul 2026 — a column showed −22.9M against a KPI of −11.5M. Fixed in commit; one hour.

### A select-option is declared as a line, not a table
- **When:** ABAP error "No component exists with the name FOR" or "X is not an internal table" when filling a select-option from `VALUE #( FOR … )`.
- **Do:** declare a `RANGE OF <field>` and `APPEND` to it; `LIKE s_field` gives you the header line.
- **Because:** select-options are tables WITH HEADER LINE; the constructor expression targets the line.
- **Cost:** same project, Jul 2026; two failed activations before the cause was read.

### Searching in today's words does not find yesterday's lesson
- **When:** you sweep the memory for something "we have certainly seen" and get zero results.
- **Do:** search for the **technical term of the error** (`U+2011`, `NUMERIC`, `await`), not its plain-language description; and search the memory tree, not only `docs/`.
- **Because:** a lesson is written in the vocabulary of whoever lived it; zero results almost never means it does not exist.
- **Cost:** 22 Aug 2026 — in an audit *about* memory, two lessons were declared lost that were written and complete in a memory file. See [`evidencia/05`](../evidencia/05-search-by-vocabulary.md).
