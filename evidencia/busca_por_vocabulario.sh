#!/bin/sh
# Search every memory file for each term. Technical vocabulary (what the commit
# says) vs plain-language vocabulary (what the analyst remembered and searched
# for). Count = memory files containing the term. Run 23/08/2026.
FILES=$(find "$HOME/.claude/projects" -path '*/memory/*.md')
echo "memory files: $(echo "$FILES" | wc -l | tr -d ' ')"
for t in 'await' 'NUMERIC' 'U+2011' 'non-breaking' 'hífen' 'caractere invisível' 'invisible char' 'currency role' 'role 10' "${FISCAL_TERM:?set FISCAL_TERM to the corpus term for a non-Latin uppercase letter in a fiscal identifier}"; do
  n=$(echo "$FILES" | xargs grep -li -- "$t" 2>/dev/null | wc -l | tr -d ' ')
  printf '%-22s %s\n' "$t" "$n"
done
