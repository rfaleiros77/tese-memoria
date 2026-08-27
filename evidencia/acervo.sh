#!/bin/sh
# Size of the corpus. Run from anywhere; ROOT is the work tree, MEM the agent's
# memory root. Excludes third-party clones (ferramentas/rep), archives and
# this repository itself. The corpus is LIVE: the window is pinned by UNTIL
# (default: the published measurement instant) so re-runs reproduce the
# published numbers; run with UNTIL=now to measure today's corpus.
ROOT="$HOME/dev"; MEM="$HOME/.claude/projects"
UNTIL="${UNTIL:-2026-08-23 13:00}"; [ "$UNTIL" = now ] && UNTIL=$(date "+%Y-%m-%d %H:%M")
SINCE=$(date -j -f "%Y-%m-%d %H:%M" -v-120d "$UNTIL" "+%Y-%m-%d %H:%M" 2>/dev/null || date -d "$UNTIL -120 days" "+%Y-%m-%d %H:%M")
EXCL='ferramentas/rep|_arquivo/|tese-memoria|node_modules|/\.git/'
cd "$ROOT" || exit 1
find . -maxdepth 4 -name .git -type d | sed 's|/.git$||' | grep -vE "$EXCL" | sort > /tmp/_repos
active=0; for r in $(cat /tmp/_repos); do n=$(git -C "$r" log --since="$SINCE" --until="$UNTIL" --oneline 2>/dev/null | wc -l); [ "$n" -gt 0 ] && active=$((active+1)); done
echo "window: $SINCE .. $UNTIL"
echo "repositories active in window: $active  (git dirs in tree now: $(wc -l < /tmp/_repos | tr -d ' '))"
echo "handover files:         $(find . -name HANDOVER.md | grep -vE "$EXCL" | wc -l | tr -d ' ')"
echo "project CLAUDE.md:      $(find . -name CLAUDE.md | grep -vE "$EXCL" | wc -l | tr -d ' ')"
echo "memory files:           $(find "$MEM" -path '*/memory/*.md' -not -name MEMORY.md | wc -l | tr -d ' ')"
echo "board files (quadros):  $(ls ferramentas/painel/quadros/*.md | wc -l | tr -d ' ')"
t=0; for r in $(cat /tmp/_repos); do n=$(git -C "$r" log --since="$SINCE" --until="$UNTIL" --oneline 2>/dev/null | wc -l); t=$((t+n)); done
echo "commits, last 120 days: $t"
