import re
import sys
import json
import os


def converter(caminho_html):

    with open(caminho_html, encoding='utf-8') as f:
        html = f.read()

    padrao = re.compile(
        r'<div\s+class=["\']item["\']\s*>'
        r'\s*<p>\s*Nome do Item:\s*(?P<name>.*?)</p>'
        r'\s*<img\s+[^>]*src=["\'](?P<img>[^"\']+)["\'][^>]*>'
        r'\s*<p>\s*Número de Estoque:\s*(?P<num>.*?)</p>'
        r'\s*</div>',
        re.DOTALL | re.IGNORECASE
    )

    itens = []

    for m in padrao.finditer(html):

        nome = m.group("name").strip()
        imagem = m.group("img").strip()
        numero = m.group("num").strip()

        imagem = imagem.replace("\\", "/")

        if imagem.lower().startswith("fotos/"):
            imagem = imagem[6:]

        itens.append({
            "name": nome,
            "img": imagem,
            "num": numero
        })

    print(f"{len(itens)} itens encontrados.")

    js = "const ITEMS = " + json.dumps(
        itens,
        ensure_ascii=False,
        indent=2
    ) + ";\n"

    pasta_html = os.path.dirname(os.path.abspath(caminho_html))
    caminho_saida = os.path.join(pasta_html, "items.js")

    with open(caminho_saida, "w", encoding="utf-8") as f:
        f.write(js)

    print("items.js gerado com sucesso.")
    print(f"Arquivo criado em: {caminho_saida}")


if __name__ == "__main__":

    if len(sys.argv) != 2:
        print("Uso:")
        print("python converte.py index_antigo.html")
        sys.exit(1)

    converter(sys.argv[1])