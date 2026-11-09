#!/bin/bash
# Baixa as capas dos projetos e a imagem de compartilhamento do site atual (Framer) para public/.
# Uso, na pasta do site:  npm run imagens
set -e
cd "$(dirname "$0")/.."
mkdir -p public/capas public/videos
B="https://framerusercontent.com/images"
baixar() { curl -fsSL "$1" -o "$2" && echo "ok  $2" || echo "ERRO $2"; }
baixar "$B/PCoIg5c0SgLeagTrgDHyKuc1yM.png?width=2400&height=1800" public/capas/aranet-play.png
baixar "$B/0qN04xNVAPTBnVYrp49kUGq0O8.png?width=2400&height=1800" public/capas/grupo-santa.png
baixar "$B/7QhDVzsr94rEDU1T18qJxEQ54.png?width=2400&height=1800"  public/capas/abramar.png
baixar "$B/lITTagcrHi7Mtwr9jBBb9lJOZA.png?width=2400&height=1800" public/capas/invisual.png
baixar "$B/kwVruGcqgBJGSpi0H58wAtaVo.png?width=2400&height=1800"  public/capas/brasimpex.png
baixar "$B/EiNg30ulb1mEd3wRz0kq5gZUtY.png?width=2400&height=1800" public/capas/autoinsp.png
baixar "https://framerusercontent.com/assets/luUCFOrGUkRs1rxdEr8L8ISfKFE.mp4" public/videos/abramar.mp4
baixar "$B/geMndDGfLwNF45ojZb6FpMKQKo.png" public/og-image.png
