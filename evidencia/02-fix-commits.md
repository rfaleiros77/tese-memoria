# 02 — Fix commits, and how many carry a narrative

**Script:** [`commits_correcao.py`](commits_correcao.py). **Run:** 23 Aug 2026,
`--days 120 --anon`, same exclusions and same pinned window as `01`.

**Criteria, fixed before running:**
- *fix commit* — subject matches `fix|corrig|consert|bug|erro|ajust|repar|resolv`
  (Portuguese and English correction vocabulary, case-insensitive);
- *has body* — commit body with at least one word;
- *narrative* — commit body with **20 or more words**.

## Result

All 46 repositories with commits in the window:

```
commits=2605  fixes=477 (18%)  with body=444 (93% of fixes)  narrative>=20w=338 (71% of fixes)
```

Six busiest repositories (1,780 commits, 68% of the 2,605):

```
repo   commits  fixes  fix%   body  narr20
R01        430     57   13%     55      29
R02        319     74   23%     73      50
R03        316     39   12%     39      37
R04        303     72   24%     71      67
R05        225     63   28%     48      25
R06        187     48   26%     45      39
TOTAL     1780    353   20%    331 (94%)  247 (70%)
```

**Spread.** The 71% is a mean over two regimes. Narrative rate among the six
busiest: **40% to 95%** (R05 25/63; R03 37/39); below them, single-commit
repositories sit at 0% or 100%. Commit-message quality varies about 2× by
project — which is why the harvest test's single-project bias (`06`) is a live
threat and not a formality.

## Reading

1. **The commit message is the most populated learning channel in the
   corpus.** Nine in ten fix commits explain themselves; seven in ten do it in
   twenty words or more. Nobody harvests it: it is the one place where writing
   the explanation is *required to proceed*, and the one place nobody re-reads
   looking for a lesson.
2. **Fix-to-lesson ratio.** 477 fix commits in 120 days against 28 memory
   files that record a cost or error (see `03`): about **17 : 1**. The private
   investigation quoted "more than 10 : 1" on a narrower scope; the wider
   measurement makes the gap larger, not smaller.
3. **The regex is a floor, not a ceiling.** A correction committed under a
   neutral subject ("handle empty ledger") is not counted. The true fix rate is
   higher than 18%; the narrative rate among true fixes is unknown but there is
   no reason to expect it lower.

**Earlier values.** The investigation reported 94% / 72% (body / 20+ words) and
elsewhere "68% have narrative" under an unrecorded criterion. The 68% is
retired; 93% / 71% with the stated criterion replaces both.
