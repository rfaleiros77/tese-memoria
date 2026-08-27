#!/bin/sh
# Publication gate. Refuses to pass if any forbidden term appears anywhere the
# public would be able to read it. Two scopes, because the working tree is not
# the whole story:
#
#   1. Every tracked file in the working tree  (what a visitor sees)
#   2. Every blob in the whole git history     (what `git show <sha>:<path>` sees)
#
# Scope 2 was added on 27/08/2026, after a file removed from the tree was found
# still readable in the published history. A file deleted in a later commit is
# not gone — it is one command away.
#
# The terms live OUTSIDE the repository (~/.config/tese-memoria/termos-proibidos.txt)
# so this script can itself be published without carrying them.
#
# Publication procedure (decision of 23/08/2026, reaffirmed 27/08/2026): this
# working repo's history contains sanitisation-era diffs. Publishing = clean
# export, never push:
#   sh tools/portao-publicacao.sh              # must print CLEAN
#   git archive HEAD | tar -x -C /path/new     # working tree only, no history
#   cd /path/new && git init && git add -A && git commit
TERMS="$HOME/.config/tese-memoria/termos-proibidos.txt"

if [ ! -f "$TERMS" ]; then
  cat >&2 <<MSG
BLOQUEADO: a lista de termos não existe nesta máquina.

  esperado em: $TERMS

O portão NÃO roda sem ela, e um portão que não roda não é um portão — é um
arquivo. A lista fica fora do repositório de propósito (para que o script possa
ser publicado), o que significa que ela não viaja pelo git: cada máquina precisa
da sua. Recriar à mão, um termo por linha, e rodar de novo.

Nunca interpretar esta mensagem como "passou".
MSG
  exit 2
fi

cd "$(git rev-parse --show-toplevel)" || exit 2
FAIL=0

# ---------------------------------------------- 1. tracked files (working tree)
while IFS= read -r t; do
  [ -z "$t" ] && continue
  hits=$(git ls-files -z | xargs -0 grep -lin -- "$t" 2>/dev/null)
  if [ -n "$hits" ]; then
    FAIL=1
    echo "ÁRVORE — termo encontrado em arquivo rastreado:"
    echo "$hits" | sed 's/^/  /'
  fi
done < "$TERMS"

# ------------------------------------------------------- 2. every history blob
# Walks every blob object the repository has ever contained, not just the ones
# reachable from the current tree. Reports the blob, then every commit/path
# where it appears, so the damage is locatable without reading the term aloud.
BLOBS=$(git cat-file --batch-check --batch-all-objects | awk '$2=="blob"{print $1}')
NBLOBS=$(printf '%s\n' "$BLOBS" | grep -c . )

for b in $BLOBS; do
  hit=""
  while IFS= read -r t; do
    [ -z "$t" ] && continue
    if git cat-file blob "$b" 2>/dev/null | grep -qi -- "$t"; then hit=1; break; fi
  done < "$TERMS"
  [ -z "$hit" ] && continue
  FAIL=1
  echo "HISTÓRICO — termo encontrado no blob $b:"
  for c in $(git rev-list --all); do
    path=$(git ls-tree -r "$c" | awk -v b="$b" '$3==b{print $4}')
    [ -n "$path" ] && echo "$(git log -1 --format='%h %ad' --date=short "$c")|$path"
  done > /tmp/_gate_hits
  paths=$(cut -d'|' -f2 /tmp/_gate_hits | sort -u)
  ncom=$(wc -l < /tmp/_gate_hits | tr -d ' ')
  for pth in $paths; do echo "    $pth  — em $ncom commit(s)"; done
  echo "    do mais antigo: $(tail -1 /tmp/_gate_hits | cut -d'|' -f1)   ao mais novo: $(head -1 /tmp/_gate_hits | cut -d'|' -f1)"
  rm -f /tmp/_gate_hits
done

echo "----"
echo "arquivos rastreados: $(git ls-files | wc -l | tr -d ' ')   blobs no histórico: $NBLOBS"
if [ $FAIL -eq 0 ]; then
  echo "CLEAN: nenhum termo proibido, nem na árvore nem no histórico."
else
  echo "BLOQUEADO: sanear antes de publicar."
  echo "Termo no histórico não se resolve apagando o arquivo — o commit antigo continua"
  echo "legível. Ou reescrever o histórico, ou publicar por export limpo (ver cabeçalho)."
fi
exit $FAIL
