# Evidence

Every number quoted in the article comes from here. Each file states **what
was measured, how (the exact command or the classification criterion), when,
the raw result, and what it does and does not show**. Scripts are included so
anyone with their own corpus can run the same measurement.

The corpus is one consultant's working tree: client and personal projects, the
agent's memory tree, and 120 days of git history. Everything is anonymised:
repositories appear as `R01…`, projects are described by kind ("a
margin-analysis project"), and no client, company code or master-data name
appears. Where a number was classified by reading rather than by script, the
file says so — those numbers are judgement, not measurement, and the article
labels them as such.

| File | Measures | Method |
|---|---|---|
| [`01-corpus.md`](01-corpus.md) | Size of the corpus | script `acervo.sh` |
| [`02-fix-commits.md`](02-fix-commits.md) | Fix commits and how many carry a narrative | script `commits_correcao.py` |
| [`03-where-lessons-live.md`](03-where-lessons-live.md) | What each of five recording mechanisms captures and loses | manual classification |
| [`04-duplication.md`](04-duplication.md) | How many places hold the same lesson | grep + reading |
| [`05-search-by-vocabulary.md`](05-search-by-vocabulary.md) | Whether an existing lesson is found when searched for | script `busca_por_vocabulario.sh` |
| [`06-harvest-test.md`](06-harvest-test.md) | Whether lessons can be extracted from commit messages | pre-registered test |

Numbers that changed between the private investigation (21–22 Aug 2026) and
this re-measurement (23 Aug) are noted in each file with both values. None of
the changes alters a conclusion.
