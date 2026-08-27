# 01 — Size of the corpus

**Script:** [`acervo.sh`](acervo.sh). **Run:** 23 Aug 2026.
Exclusions: third-party clones, an archive folder, this repository.

**The corpus is live**, so the measurement window is **pinned** inside the
script (`UNTIL`, default 2026-08-23 13:00 local): re-runs reproduce these
numbers; `UNTIL=now` measures today's corpus instead. "Repositories" counts
repos **with at least one commit in the window** — a definition that is
reproducible, unlike "folders in the tree", which changes when a project is
moved in or out (one was, the same evening).

```
window: 2026-04-25 13:00 .. 2026-08-23 13:00
repositories active in window: 46
handover files:         50
project CLAUDE.md:      56
memory files:           167
board files (quadros):  10
commits, last 120 days: 2605
```

File counts (handovers, instruction files, memories, boards) are as of the
run instant and drift as the tree lives; the commit and repository numbers
are pinned.

**Five recording mechanisms in simultaneous use:** the per-project session
handover (`docs/HANDOVER.md`), the agent's memory tree (one folder per
project, one file per fact), instruction files (one global, one per project),
curated "boards" on a local dashboard, and append-only decision logs in a few
projects. The commit message is a sixth, never intended as one.

**Earlier values.** The private investigation reported 51–53 handovers and
2,137–2,597 commits. The commit gap was scope (six busiest repositories vs.
all); the handover gap was depth of search and files created since. The
re-measurement above is the one the article uses. Two earlier same-day values
are retired, each by an adversarial-review finding: 46 / 2,619 (a trailing
slash in the exclusion pattern let the third-party clone archive itself
through — 17 commits, none the consultant's) and 45 / 2,602 (measured before
the window was pinned and before a project folder was moved into the tree;
unreproducible minutes later). The pinned run above is the one that
reproduces.

**What it does not show:** nothing about quality. It says only that the
material is large enough for the per-mechanism measurements that follow to
mean something.
