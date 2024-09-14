import requests
from bs4 import BeautifulSoup
import os
import time
from datetime import datetime
from colorama import Fore, Style, init
from tqdm import tqdm
from rich.console import Console
from rich.progress import track
from rich import print as rprint

# Inicializar colorama
init()

# Inicializar rich console
console = Console()

# Lista de URLs de las páginas a procesar
urls = [
    "https://www.webnovel.com/profile/4320923922", # Axoth/Mazhira
    "https://www.webnovel.com/profile/4327668708", # Eimon Q
    # Agrega más URLs según sea necesario
]

# Encabezado de User-Agent para hacer la solicitud parecer como si proviene de un navegador
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive'
}

# Crear las carpetas si no existen
path = os.path.join(os.path.expanduser('~'), 'Desktop', 'Novelas_Info')
os.makedirs(path, exist_ok=True)

# Crear el archivo de texto
with open(os.path.join(path, 'novels_info.txt'), 'w') as f:
    # Título del programa
    console.print("\n[bold magenta]EXPRIMIDOR WEBNOVEL 1.1[/bold magenta]\n", justify="center")
    console.print("[bold cyan]Por RulerFox ♠[/bold cyan]\n", justify="center")

    # Iterar sobre cada URL en la lista con barra de progreso
    for url in track(urls, description="Procesando novelas..."):
        start_time = time.time()
        rprint(f"[cyan]Iniciando el procesamiento de la página:[/cyan] [yellow]{url}[/yellow]")

        try:
            response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            rprint(f"[red]Error al acceder a {url}:[/red] {e}\n")
            continue

        soup = BeautifulSoup(response.content, 'html.parser')

        # Extraer el nombre del autor
        autor_elem = soup.find('h1', class_="fs32 fw600 dib vam mr16")
        autor = autor_elem.get_text(strip=True) if autor_elem else "Autor no encontrado"

        # Encuentra todos los elementos 'li' con la clase 'mt24' que contienen los libros
        book_items = soup.find_all('li', class_="mt24")

        if len(book_items) == 0:
            rprint(f"[yellow]No se encontraron libros en {url}.[/yellow]")
            continue

        # Función para extraer la información de cada libro
        def extraer_informacion_libro(book_item):
            titulo_elem = book_item.find('h3', class_="mb8 pt4 g_h3 fs20 lh24 fw700 pl1 ells _2 lh24")
            titulo = titulo_elem.get_text(strip=True) if titulo_elem else "Título no encontrado"

            tags_elem = book_item.find('p', class_="c_s mb8 g_tags")
            tags = [tag.get_text(strip=True) for tag in tags_elem.find_all('a')] if tags_elem else []

            puntaje_elem = book_item.find('small', class_="mr8")
            puntaje = puntaje_elem.get_text(strip=True) if puntaje_elem else "Puntaje no encontrado"

            etiquetas_adicionales_elem = book_item.find_all('span', class_=["g_colorful_tag _pink mr4", "g_colorful_tag _orange mr4"])
            etiquetas_adicionales = [tag.get_text(strip=True) for tag in etiquetas_adicionales_elem] if etiquetas_adicionales_elem else ["none"]

            sinopsis_elem = book_item.find('div', class_="fs16 lh1.5 c_000 oh _txt mb8")
            sinopsis = sinopsis_elem.get_text(" ", strip=True) if sinopsis_elem else "Sinopsis no encontrada"
            sinopsis = sinopsis.replace('"', '')

            capitulos_elem = book_item.find('span', class_="mr4 vam dib")
            capitulos = capitulos_elem.get_text(strip=True).split()[0] if capitulos_elem else "Capítulos no encontrados"

            colecciones_elem = book_item.find('span', class_="mr8 vam dib")
            colecciones = colecciones_elem.get_text(strip=True).split()[0] if colecciones_elem else "Colecciones no encontradas"

            return {
                'Autor': autor,
                'Título': titulo,
                'Géneros': tags,
                'Puntaje': puntaje,
                'Etiquetas Adicionales': etiquetas_adicionales,
                'Sinopsis': sinopsis,
                'Capítulos': capitulos,
                'Colecciones': colecciones,
                'URL': url
            }

        libros = []

        for book_item in book_items:
            rprint(f"[cyan]Procesando libro:[/cyan] [yellow]{book_item.find('h3', class_='mb8 pt4 g_h3 fs20 lh24 fw700 pl1 ells _2 lh24').get_text(strip=True)}[/yellow]")
            libro_info = extraer_informacion_libro(book_item)
            libros.append(libro_info)
	# Reemplazar los caracteres inválidos en el título
        invalid_chars = "/=<>\\*?\"|:"
        title = title.translate(str.maketrans('', '', invalid_chars))

        # Escribir la información de los libros en el archivo
        for libro in libros:
            try:
                f.write(f'{{ title: "{libro["Título"]}", author: "{libro["Autor"]}", genre: "{", ".join(libro["Géneros"])}", rating: "{libro["Puntaje"]}", addtags: "{", ".join(libro["Etiquetas Adicionales"])}", chapters: "{libro["Capítulos"]}", collections: "{libro["Colecciones"]}", url: "{libro["URL"]}" }},\n')
            except Exception as e:
                rprint(f"[red]Hubo un error al escribir la información de {libro['Título']} en el archivo:[/red] {e}\n")
                continue

        end_time = time.time()
        rprint(f"[green]La página {url} ha sido procesada exitosamente en {end_time - start_time:.2f} segundos.[/green]\n")

rprint("[bold green]La información de todas las novelas ha sido escrita en el archivo 'novels_info_webnovel_.txt'.[/bold green]")
