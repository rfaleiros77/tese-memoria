# 04 — How many places hold the same lesson

**Method:** one lesson chosen as probe — *confirm which system a connector
points at before calling it* (born from an incident on 2 Aug 2026 in which a
query went to the wrong client's system and a day's conclusion had to be
redone). `grep -rli` for connector vocabulary across the work tree and the
memory tree, then every hit read to confirm it states the rule. **Run:** 23 Aug
2026. Meta-documents (the investigation itself, this repository) excluded.

## Result

The rule is stated in **15 files, across three layers**:

| Layer | Files |
|---|---|
| Memory tree | 5 (in five different project folders) |
| Instruction files | 9 (the global file, five project files, three in the connector's own repository) |
| Command index | 1 |

One memory file exists under the **same name in three project folders**:
two copies are byte-identical, the third has already drifted (checked by
checksum).

**Earlier values.** The investigation said "4 places" in one table and "10
places" in a decision note. Both were undercounts from a narrower grep.

## Reading

Per-project memory does not cross projects, so a lesson that matters
everywhere gets copied everywhere — and copies diverge. The drift found here
is the mechanism by which two versions of a rule end up competing, with no way
to tell which one is current. This is the evidence behind the decision to keep
lessons in **one file**, and to let an instruction file *point* at it rather
than restate it.
