# 03 — What each recording mechanism captures and loses

**Method:** manual classification, done by the agent on 21 Aug 2026 by
reading every file, not by keyword. Counts below are therefore **judgement**,
reproducible only by someone repeating the reading. Totals come from `01`.

| Mechanism | Files | Captures | Loses |
|---|---|---|---|
| Session handover | 50 | 42 have a "traps" section; ~41% of trap items describe a real error, with the cause in ~76% of those | Only **2 files quote a correction made by the operator** — the single highest-signal artefact. Grows without limit to keep lessons alive: the two lesson-richest handovers reached 1,044 and 787 lines |
| Memory tree | 167 | **28 (17%) are anchored in an incident**, with date and cost | **21 are a rule without a case** — precaution with no evidence; lessons with no home get copied (see `04`) |
| Global instruction file | 1 | **6 of 13 rules carry a dated incident and a "why"** — the format that works best in the corpus | One file, kept by hand |
| Project instruction files | 55 | — | 4 of 55 carry any narrative (correctly: state is forbidden there) |
| Dashboard boards | 10 | 1 is a lessons board, and it is the best single artefact in the corpus: *"every item below cost real time — none is theoretical caution"* | Creating one requires asking permission, which throttles it |
| Append-only decision log (one creative project) | 257 entries, 2,974 lines | Real apparatus: numbered entries, 20 admissions of error | Postmortem structure appears **once** in 2,974 lines — ad-hoc prose, not a format |
| Commit message | 477 fixes / 120 d | **93% have a body, 71% a 20-word narrative** (`02`) | Nobody reads `git log` looking for lessons |

## The two user corrections

Of 50 handovers, two quote a correction the operator made in conversation. One of
them is a single word — *"naooooo"* — written when the agent described a
client's development system as a place it would operate in. That word carries
more context than the paragraph next to it: it marks the exact moment a rule
was learned. The instruction to capture such corrections **already existed** in
the handover skill and yielded 2 of 50. Repeating the same instruction louder
was ruled out on that evidence.

## Annotation vs. learning — the test

A line is *learning* if it has a truth value that could be wrong tomorrow
("the first row of that table wins, there is no parameter to choose");
it is *annotation* if it is only situation ("waiting on approval", "v1.0
published"). Reading the handovers with that test: learning lines almost
always arrive **in bold, as an assertion**; state lines arrive with a date, a
count, or a verb of situation. Visible enough to be a first-pass filter.
