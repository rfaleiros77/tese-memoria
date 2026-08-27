# 05 — Is an existing lesson found when searched for?

**Script:** [`busca_por_vocabulario.sh`](busca_por_vocabulario.sh). **Run:**
23 Aug 2026 over 196 memory files (167 facts + 29 index files).

**Context.** On 21 Aug the agent, auditing its own memory, listed four lessons
as "lost — exist only in a commit". An adversarial review on 22 Aug demanded
verification. Two of the four were written, complete, in a memory file of the
consultant's own dashboard product — mechanism, cause of invisibility, and
generalised rule. The agent had searched for the words it would use *today*,
not the words the lesson was *written in*.

## Result

| Term | Memory files containing it | Which vocabulary |
|---|---|---|
| `await` | 4 | technical — how the commit and the lesson name it |
| `NUMERIC` | 3 | technical |
| `U+2011` | **0** | technical — the lesson really is only in the commit |
| `non-breaking`, `hífen`, `caractere invisível`, `invisible char` | 0, 0, 0, 0 | plain language — what the analyst searched for |
| `currency role`, `role 10` | 0, 0 | exists in a project decision log, not in memory |
| non-Latin uppercase letter in a fiscal identifier (the corpus's own word for it; passed to the script as `FISCAL_TERM`, not shipped) | 19 | technical |

The `await` lesson, as written in memory (own product, quoted verbatim):

> **BUG PATTERN #1 — missing `await`:** … a Promise is truthy, so
> `getSetting(x) || []` returned the Promise; `JSON.stringify(Promise) === "{}"`
> … **Lesson:** every getter now REQUIRES `await`.

## Reading

1. **What survives of the original hypothesis:** loss exists, but it is
   *partial and by vocabulary*, not total and by lack of a witness. One of the
   four (`U+2011`, the most mechanical and most reusable of them) is genuinely
   only in the commit; one is in a per-project file invisible from elsewhere.
2. **What does not survive:** the law "an error only the agent saw never
   becomes a lesson". Both dashboard lessons were found and fixed by the agent
   alone and were written anyway.
3. **The analyst's own failure is the finding.** The audit about memory
   retrieval failed at memory retrieval, for exactly the reason it was about
   to describe. Zero results almost never means the lesson does not exist.
   Hence the rule: search by the **technical term of the error**, and search
   the memory tree, not only `docs/`.
