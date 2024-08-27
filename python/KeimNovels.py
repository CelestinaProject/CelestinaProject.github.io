import requests
from bs4 import BeautifulSoup
import os
from datetime import datetime, timedelta
import time
from colorama import Fore, Style, init
from tqdm import tqdm
from rich.console import Console
from rich.progress import track
from rich import print as rprint

# Inicializar colorama
init()

# Inicializar rich console
console = Console()

# Lista de URLs de las páginas principales de las novelas
urls_info = [
    "https://es.niadd.com/original/10036678.html", # Tengo la espada sagrada?
    "https://es.niadd.com/original/10061483.html", # Renacer: Sueños Vivos En Un Mundo Nuevo
    "https://es.niadd.com/original/10056045.html", # Es una orden?
    "https://es.niadd.com/original/10060752.html", # Cronos: Tale Of The Dark Adventurer
    "https://es.niadd.com/original/10068644.html", # Portadores
    "https://es.niadd.com/original/10064674.html", # The Zodiacs: Disasterology
    "https://es.niadd.com/original/10068592.html", # The Zodiacs: Disasterology v.2
    "https://es.niadd.com/original/10062911.html", # El Emperador
    "https://es.niadd.com/original/10066472.html", # Génesis Mortal 
    "https://es.niadd.com/original/10065879.html", # Diamante De La Esperanza
    "https://es.niadd.com/original/10065213.html", # Mi Segunda Vida Junto A Hanae
    "https://es.niadd.com/original/10062460.html", # Los Di(IX)ez Maestros De La Espada
    "https://es.niadd.com/original/10062869.html", # Hollow
    "https://es.niadd.com/original/10069152.html", # Hollow 2
    "https://es.niadd.com/original/10068199.html", # Inverse
    "https://es.niadd.com/original/10062059.html", # Ades
    "https://es.niadd.com/original/10061990.html", # Roptura: Todo Se Quiebra
    "https://es.niadd.com/original/10060950.html", # Prédias: Maldad En Un Mundo De Dioses
    "https://es.niadd.com/original/10060448.html", # Virtud/Vicio
    "https://es.niadd.com/original/10060424.html", # Black Garden 
    "https://es.niadd.com/original/10067984.html", # Enamorado de una Villana
    "https://es.niadd.com/original/10068250.html", # Diario De La Necromorfis
    "https://es.niadd.com/original/10068798.html", # Crónicas Interestelares
    "https://es.niadd.com/original/10069030.html", # Lady of the moon
    "https://es.niadd.com/original/10069032.html", # Cuentos Cortos Para Comer
    "https://es.niadd.com/original/10069029.html", # Poemas de un loco
    "https://es.niadd.com/original/10069028.html", # Like a coffe
    "https://es.niadd.com/original/10061792.html", # Kitsune Fever
    "https://es.niadd.com/original/10069008.html", # Yoru No Naka De Odoru
    "https://es.niadd.com/original/10068130.html", # Saikoro Ga Kimeru (Los Dados Deciden)
    # Aquí van las URLS...
]

# Crear las carpetas si no existen
path = os.path.join(os.path.expanduser('~'), 'Desktop', 'Novelas_Info')
os.makedirs(path, exist_ok=True)

# Título del programa
console.print("\n[bold magenta]EXPRIMIDOR NIADD 1.9[/bold magenta]\n", justify="center")
console.print("[bold cyan]Por RulerFox ♠[/bold cyan]\n", justify="center")

# Crear el archivo de texto
with open(os.path.join(path, 'novels_info_.txt'), 'w') as f:
    # Iterar sobre cada URL en la lista con barra de progreso
    for url_info in track(urls_info, description="Procesando novelas..."):
        start_time = time.time()
        rprint(f"[cyan]Iniciando el procesamiento de la página:[/cyan] [yellow]{url_info}[/yellow]")

        try:
            response_info = requests.get(url_info)
            response_info.raise_for_status()  # Lanza un error si la solicitud falla
        except requests.exceptions.RequestException as e:
            rprint(f"[red]Error al acceder a {url_info}:[/red] {e}\n")
            continue  # Salta al siguiente ciclo si la solicitud falla

        soup_info = BeautifulSoup(response_info.text, 'html.parser')

        # Extraer información con valores predeterminados en caso de fallo
        title = soup_info.find('h1', class_='book-headline-name')
        title = title.text if title else "Desconocido"

        followers = soup_info.find('num', {'id': 'follow_num'})
        followers = int(followers.text) if followers else 0

        views = soup_info.find('span', {'itemprop': 'accessMode'})
        views = int(views.text.replace(',', '')) if views else 0

        genres = soup_info.find_all('span', {'itemprop': 'genre'})
        genres = [element.text for element in genres] if genres else ["Desconocido"]

        author_tag = soup_info.find('span', string='Autor (es):')
        author = author_tag.find_next('span').text if author_tag else 'Desconocido'

        artist_tag = soup_info.find('span', string='Artista:')
        artist = artist_tag.find_next('span').text if artist_tag else 'Desconocido'

        date = soup_info.find('span', {'itemprop': 'datePublished'})
        date = date.text if date else "2024"

        # Reemplazar los caracteres inválidos en el título
        invalid_chars = "/=<>\\*?\"|:"
        title = title.translate(str.maketrans('', '', invalid_chars))

        try:
            # URL de la página de capítulos
            url_chapters = url_info.replace('.html', '/chapters.html')
            response_chapters = requests.get(url_chapters)
            response_chapters.raise_for_status()  # Lanza un error si la solicitud falla

            soup_chapters = BeautifulSoup(response_chapters.text, 'html.parser')

            # Extraer el número de capítulos de la página de capítulos
            chapter_section = soup_chapters.find('div', class_='bookinfo-cate-section')
            chapter_list = chapter_section.find('ul', class_='chapter-list')
            chapters = chapter_list.find_all('li', class_='chp-item') if chapter_list else []
        except (requests.exceptions.RequestException, AttributeError) as e:
            rprint(f"[red]Hubo un error al extraer los capítulos de {url_info}:[/red] {e}\n")
            chapters = []

        # Extraer la fecha del último capítulo y compararla con la fecha actual
        try:
            last_chapter_date_text = chapters[0].find('span', class_='chp-time').text
        except IndexError:
            last_chapter_date_text = "Desconocido"

        if any(keyword in last_chapter_date_text for keyword in ['horas atras', 'hace minutos']):
            status = 'Activo'
        else:
            try:
                last_chapter_date = datetime.strptime(last_chapter_date_text, '%b %d, %Y')
                status = 'Activo' if (datetime.now() - last_chapter_date).days < 14 else 'Inactivo'
            except ValueError:
                status = 'Desconocido'

        # Verificar si la novela aún se está publicando
        status_tag = soup_info.find('span', class_='book-status')
        if status_tag and '(Terminado)' in status_tag.text:
            status = 'Finalizado'

        # Escribir la información de la novela en el archivo
        try:
            f.write(f'                {{ title: "{title}", cover: "../novels/covers/{title}.webp", followers: {followers}, views: {views}, chapters: {len(chapters)}, genres: "{", ".join(genres)}", author: "{author}", artist: "{artist}", date: "{date}", status: "{status}", url: "{url_info}" }},\n')
        except Exception as e:
            rprint(f"[red]Hubo un error al escribir la información de {url_info} en el archivo:[/red] {e}\n")
            continue  # Salta al siguiente ciclo si hay un error al escribir en el archivo

        end_time = time.time()
        rprint(f"[green]La página {title}, vínculo {url_info}, ha sido revisada exitosamente en {end_time - start_time:.2f} segundos.[/green]\n")

rprint("[bold green]La información de todas las novelas ha sido escrita en el archivo 'novels_info.txt'.[/bold green]")
