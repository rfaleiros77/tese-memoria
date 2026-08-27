# RECALLS — when a lesson came back

Append-only log of **recall events**: the moments a lesson fired — or should
have and did not. This is data, not instruction: it has no budget, it is never
read at the start of work, and it never edits `LESSONS.md`. Its purpose is to
answer, with evidence instead of intuition, the open question of associative
memory: *how often is a lesson summoned by a cue its title never anticipated?*

One line per event:

```
date | lesson (title) | cue — what summoned it | kind
```

**Three kinds:**

- `title-match` — the situation matched the trigger the title describes. The
  index worked as designed.
- `association` — the lesson surfaced by a path nobody indexed: a different
  domain, a smell, a neighbouring `[[link]]`, an analogy. This is the
  interesting row.
- `miss` — you searched, found nothing, and later discovered the lesson
  existed. Record the term you searched for **and** the term it was written
  in: that pair is the vocabulary gap, measured.

"Nothing fired this period" is a valid harvest answer and is **not** logged —
only events are.

---

<!-- log starts here -->
