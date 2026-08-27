# Templates

Four files to copy into your own setup. None depends on a vendor.

| File | Copy it to | What it is |
|---|---|---|
| [`LESSONS.md`](LESSONS.md) | wherever your agent reads at start of work | The lessons file: header with the format, the filter and the budget, then the lessons |
| [`harvest-prompt.md`](harvest-prompt.md) | your end-of-period routine | The instruction that turns fix commits into proposed lessons for approval |
| [`critic-prompt.md`](critic-prompt.md) | an agent/persona you can invoke on finished work | The adversarial reviewer that audits claims against artefacts — the one that fell the first hypothesis of this work |
| [`RECALLS.md`](RECALLS.md) | next to your lessons file | Append-only log of recall events — the sensor for the associative-memory question ([`metodo/06`](../metodo/06-recall-log.md)) |

The critic is half the method and the half nobody publishes. The lessons
file is only as good as what was allowed into it, and what is allowed in is
decided by someone who did not write it.
