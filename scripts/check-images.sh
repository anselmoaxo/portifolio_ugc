#!/bin/bash
cd /home/anselmo/projetos/portifolio_ugc
grep -roh "images/instagram/[A-Za-z0-9_.-]*" out/ | sort -u > /tmp/refs.txt
echo "referencias: $(wc -l < /tmp/refs.txt)"
missing=0
while read -r f; do
  if [ ! -f "out/$f" ]; then
    echo "FALTANDO: $f"
    missing=1
  fi
done < /tmp/refs.txt
if [ "$missing" -eq 0 ]; then
  echo "TODAS AS IMAGENS REFERENCIADAS EXISTEM"
fi
