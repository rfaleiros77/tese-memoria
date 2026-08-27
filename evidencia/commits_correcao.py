#!/usr/bin/env python3
"""Fix-commit narrative rate across a tree of git repositories.

Criteria fixed BEFORE running (23/08/2026):
  fix commit  = subject matches FIX_RE (PT/EN correction vocabulary)
  has body    = commit body has >= 1 word
  narrative   = commit body has >= 20 words
Usage: commits_correcao.py <root> [--days 120] [--until 'YYYY-MM-DD HH:MM'] [--exclude ...]
The corpus is live; --until pins the window so published numbers reproduce.
Prints one row per repo (sorted by commits) and totals. No client names are
printed when run with --anon (repo names replaced by R01, R02, ...).
"""
import argparse, os, re, subprocess, sys
FIX_RE = re.compile(r'fix|corrig|consert|bug|erro|ajust|repar|resolv', re.I)
SEP_C, SEP_F = '\x1e', '\x1f'

def repos(root, exclude):
    for d, sub, _ in os.walk(root):
        if '.git' in sub:
            sub[:] = []
            rel = os.path.relpath(d, root)
            if not any(e in rel for e in exclude):
                yield d
        sub[:] = [s for s in sub if s not in ('node_modules', '.git')]

def measure(repo, days, until):
    args = ['git', '-C', repo, 'log', f'--format={SEP_C}%s{SEP_F}%b']
    if until:
        import datetime as _dt
        since = (_dt.datetime.strptime(until, '%Y-%m-%d %H:%M') - _dt.timedelta(days=days)).strftime('%Y-%m-%d %H:%M')
        args += [f'--since={since}', f'--until={until}']
    else:
        args += [f'--since={days}.days']
    out = subprocess.run(args, capture_output=True, text=True).stdout
    total = fixes = body = narr = 0
    for rec in out.split(SEP_C)[1:]:
        total += 1
        subj, _, b = rec.partition(SEP_F)
        if not FIX_RE.search(subj): continue
        fixes += 1
        w = len(b.split())
        body += w >= 1; narr += w >= 20
    return total, fixes, body, narr

if __name__ == '__main__':
    ap = argparse.ArgumentParser(); ap.add_argument('root'); ap.add_argument('--days', type=int, default=120)
    ap.add_argument('--exclude', nargs='*', default=[]); ap.add_argument('--anon', action='store_true')
    ap.add_argument('--until', default='2026-08-23 13:00')
    ap.add_argument('--top', type=int, default=0)
    a = ap.parse_args()
    rows = sorted(((measure(r, a.days, a.until), r) for r in repos(a.root, a.exclude)), reverse=True)
    rows = [x for x in rows if x[0][0] > 0]
    print(f"{'repo':<12} {'commits':>8} {'fixes':>6} {'fix%':>5} {'body':>6} {'narr20':>6}")
    T = [0]*4
    for i, ((t, f, b, n), r) in enumerate(rows, 1):
        if a.top and i > a.top: break
        name = f'R{i:02d}' if a.anon else os.path.relpath(r, a.root)
        print(f"{name:<12} {t:>8} {f:>6} {f/t:>5.0%} {b:>6} {n:>6}")
        for k, v in enumerate((t, f, b, n)): T[k] += v
    t, f, b, n = T
    print(f"TOTAL{' (top %d)'%a.top if a.top else ''}: commits={t} fixes={f} ({f/t:.0%}) "
          f"with body={b} ({b/f:.0%} of fixes) narrative>=20w={n} ({n/f:.0%} of fixes)")
