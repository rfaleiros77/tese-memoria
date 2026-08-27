# Harvest prompt — from fix commits to proposed lessons

Use at the end of a working period, after commits are pushed. The agent
proposes; a human approves; only then is `LESSONS.md` edited.

---

You are closing a working period. Harvest what it taught, from what was
already written.

1. **Collect the fix commits** of every repository touched since the last
   harvest:

   ```
   git log --since=<last harvest> --format='%h %s%n%b' -i --grep='fix\|corrig\|error\|bug'
   ```

2. **Keep only those with a narrative body** — one that states a mechanism,
   a cause, or what was invisible. A one-line subject is not a lesson.

3. **Add the corrections the human made in conversation** during the period
   that produced no commit. Quote them. These are the rarest and most valuable
   items; do not skip this step because the list is empty — say it is empty.

4. **Apply the filter before proposing.** Do not propose:
   - environment failures the human fixes (missing binary, unset credential);
   - negative claims about a tool or feature;
   - transient errors that resolved on retry (if anything, the retry pattern);
   - unresolved attempts dressed as a recommended approach.
   Only the **fix** becomes a lesson. The error stays in the commit.

5. **Propose one to three lessons**, in exactly this format, titled by the
   trigger (the situation as it will be recognised next time, not the bug's
   name):

   ```
   ### <trigger>
   - **When:** <the cue>
   - **Do:** <the rule, positive>
   - **Because:** <why it was invisible / why the rule exists>
   - **Cost:** <project kind>, <date> (<commit>) — <one line>. See [[neighbour]].
   ```

6. **Ask the recall question:** *did any lesson fire this period — and what
   summoned it?* For each event, append one line to `RECALLS.md`
   (`date | lesson | cue | title-match / association / miss`). A `miss` —
   you searched, found nothing, and the lesson existed — records both the
   term searched and the term written. "Nothing fired" is a valid answer and
   is not logged.

7. **Show them. Do not write.** Wait for approval on each. "Nothing to
   harvest this period" is a valid and complete answer.

8. If `LESSONS.md` would exceed its budget after the additions, **consolidate
   first** — merge same-trigger lessons, retire falsified ones — and show
   what was merged before writing anything.
