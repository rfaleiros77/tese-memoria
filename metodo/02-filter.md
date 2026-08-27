# 02 — The filter: keep the fix, never the failure

> "The error is the teacher, not the content — you keep what you learned."
> — Rogerio Faleiros, 22 Aug 2026

The lesson records the **correction**. The error enters as one line of real
cost, and otherwise stays where it already lives — the commit, with date and
diff. The file of lessons is not a file of failures.

## Four things that must not be stored

1. **Environment failures that fix themselves** — missing binary, unset
   credential, fresh-install path. The human fixes these; they are not rules.
2. **Negative claims about a tool** — "X does not work", "cannot use Y". These
   harden into refusals the agent cites against itself months after the
   problem was fixed. Store the *fix* (the install step, the flag), never the
   constraint.
3. **Transient errors that resolved** — if retrying worked, the lesson is the
   retry pattern, not the failure.
4. **Unresolved paths dressed as recommendation** — a session that tried three
   things and none worked must not write them up as a workflow. Either say
   "nothing to save", or record only a working alternative you are
   independently confident of.

## Where this comes from — two independent sources

The corpus measurement arrived at it by evidence: the lessons that aged worst
were negative rules with no case behind them.

Independently, the open-source agent **Hermes** (Nous Research, MIT) encodes
four of the five exclusions in its own "Do NOT capture" list — a hard
prohibition in the prompt governing what its background reviewer may keep as
a **skill** (its unit of durable learning; this method's unit is the lesson) —
with the same justification, that negative claims *"harden into refusals the
agent cites against itself for months after the actual problem was fixed."*
Its fifth exclusion, one-off task narratives, has no equivalent here because
a lessons file never stores narratives at all. (`agent/background_review.py`, the "Do NOT capture" block;
verified 23 Aug 2026 in the repository at
<https://github.com/NousResearch/hermes-agent>.)

Two sources that do not know each other, reaching the same rule by different
routes — one by measuring a corpus, one by designing an agent — is what turns
this from a preference into a property of the problem. That convergence is the
strongest single argument in this work, and it is the reason the filter is
stated as a rule and not a suggestion.

## What *does* enter

- The fix, as a positive rule, under a trigger title.
- The cost, in one line, with the date — so the rule is never theoretical
  caution. (The one excellent lessons file found in the corpus opens with:
  *"every item below cost real time — none is theoretical caution."*)
- Corrections the human made in conversation that produced no commit. These
  are the rarest and highest-signal item in the corpus (2 in 50 handovers) and
  the harvest step asks for them explicitly.
