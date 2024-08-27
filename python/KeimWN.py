import requests
from bs4 import BeautifulSoup
import os
from datetime import datetime
import time

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive'
}

# Lista de URLs de las páginas principales de las novelas en Webnovel
urls_info = [
    "https://www.webnovel.com/book/the-witch-in-love-with-the-enigmatic-butler_29894016008028505", # The Witch In Love With The Enigmatic Butler
    "https://www.webnovel.com/book/is-it-an-order_30085077508713205", # Is It An Order?
    "https://www.webnovel.com/book/i-have-the-sacred-sword_30085019700546205", # I Have The Sacred Sword?
    "https://www.webnovel.com/book/a-doctor-who-just-wants-to-paint_29497849700100405", # A Doctor Who Just Wants To Paint
    "https://www.webnovel.com/book/i-have-the-most-powerful-rank-xxx-weapons!_30368539706504305", # I Have the Most Powerful Rank XXX Weapons!
    "https://www.webnovel.com/book/cronos-tale-of-the-dark-adventurer_27541424406057005", # Cronos
    # Añade más URLs aquí
]

# Crear la carpeta para guardar la información
path = os.path.join(os.path.expanduser('~'), 'Desktop', 'Novelas_Info')
os.makedirs(path, exist_ok=True)

# Crear el archivo de texto para guardar la información
with open(os.path.join(path, 'novels_info_wn_.txt'), 'w') as f:
    # Iterar sobre cada URL en la lista
    for url_info in urls_info:
        start_time = time.time()
        print(f"Iniciando el procesamiento de la página: {url_info}")

        try:
            response_info = requests.get(url_info, headers=headers)
            response_info.raise_for_status()  # Lanza un error si la solicitud falla
        except requests.exceptions.RequestException as e:
            print(f"Error al acceder a {url_info}: {e}\n")
            continue  # Salta al siguiente ciclo si la solicitud falla

        soup_info = BeautifulSoup(response_info.text, 'html.parser')

        # Extraer información con valores predeterminados en caso de fallo
        title_tag = soup_info.find('h1', class_='pt4 pb4 pr4 oh mb4 fs36 lh40 auto_height')
        title = title_tag.text.strip() if title_tag else "Desconocido"

        author_tag = soup_info.find('div', class_='fw700 ell dib vam fs16 fw500')
        author = author_tag.find('a').text.strip() if author_tag else "Desconocido"

        details_tag = soup_info.find('div', class_='mb12 fw700 lh24 det-hd-detail c_000 fs0')
        chapters = '0 Chapters'
        views = '0 Views'
        if details_tag:
            strong_tags = details_tag.find_all('strong')
            for strong in strong_tags:
                span = strong.find('span')
                if span:
                    text = span.text.strip()
                    if 'Chapters' in text:
                        chapters = text
                    elif 'Views' in text:
                        views = text

        rating_tag = soup_info.find('p', class_='_score ell mb24 fs0')
        rating = rating_tag.find('strong').text.strip() if rating_tag else 'Rating not found'

        # Capturar sinopsis completa eliminando saltos de línea y espacios innecesarios
        synopsis_div = soup_info.find('div', class_='j_synopsis')
        if synopsis_div:
            # Extraer el texto de cada párrafo
            synopsis_paragraphs = synopsis_div.find_all('p')
            # Unir los párrafos y eliminar saltos de línea y espacios extra
            synopsis = ' '.join(p.get_text(separator=' ', strip=True) for p in synopsis_paragraphs)
            synopsis = ' '.join(synopsis.split())  # Elimina los espacios múltiples
        else:
            synopsis = 'Sinopsis no encontrada'

        # Reemplazar los caracteres inválidos en el título
        invalid_chars = "/=<>\\*?\"|:"
        title = title.translate(str.maketrans('', '', invalid_chars))

        # Escribir la información de la novela en el archivo con espaciado antes de "{ title: "
        try:
            f.write(f'                {{ title: "{title}", cover: "../novels/covers/{title}.webp", author: "{author}", chapters: "{chapters}", views: "{views}", rating: "{rating}", synopsis: "{synopsis}", url: "{url_info}" }},\n')
        except Exception as e:
            print(f"Hubo un error al escribir la información de {url_info} en el archivo: {e}\n")
            continue  # Salta al siguiente ciclo si hay un error al escribir en el archivo

        end_time = time.time()
        print(f"La página {title}, vínculo {url_info}, ha sido revisada exitosamente en {end_time - start_time} segundos.\n")

print("La información de todas las novelas ha sido escrita en el archivo 'novels_info_webnovel.txt'.")
