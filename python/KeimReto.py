import discord
from discord.ext import commands
from discord import app_commands
from datetime import datetime
import sys
from tqdm import tqdm
from colorama import Fore, Style, init
import logging
import json
import random
import requests

# Inicializar colorama
init(autoreset=True)

# Configuración de logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Cargar configuración
with open('config.json') as config_file:
    config = json.load(config_file)

APPLICATION_ID = config['APPLICATION_ID']
TOKEN = config['TOKEN']
GUILD_ID = config['GUILD_ID']
CHANNEL_ID = config['CHANNEL_ID']

# Fecha de inicio del reto diario
start_date = datetime.strptime("18/05/2023 1:11", "%d/%m/%Y %H:%M")

class MyBot(commands.Bot):
    def __init__(self, command_prefix, intents):
        super().__init__(command_prefix, intents=intents)

    async def setup_hook(self):
        # Sincronizar comandos específicos
        guild = discord.Object(id=GUILD_ID)
        await self.tree.sync(guild=guild)
        print("Comandos sincronizados.")

intents = discord.Intents.default()
intents.messages = True
intents.guilds = True
intents.message_content = True

bot = MyBot(command_prefix='!', intents=intents)

def print_title():
    title = "EXPRIMIDOR DISCORD 1.0"
    author = "Por RulerFox ♠"
    term_width = 80  
    print(Fore.MAGENTA + Style.BRIGHT + title.center(term_width))
    print(Fore.CYAN + author.center(term_width))

@bot.event
async def on_ready():
    # Imprimir título y firma antes del mensaje de conexión
    print_title()
    logger.info(f'{Fore.GREEN}{bot.user} se ha conectado a Discord!{Style.RESET_ALL}')
    
    # Cambiar estado del bot al iniciar
    await bot.change_presence(activity=discord.Game(name="Extrayendo info..."))

    # Establecer la descripción del bot
    await bot.change_presence(activity=discord.Activity(type=discord.ActivityType.playing, name="Ruler MMORPG!"))


@bot.tree.command(name="animal", description="Envía una foto adorable de un animal al azar")
@app_commands.describe(tipo="Elige el tipo de animal")
async def animal_command(interaction: discord.Interaction, tipo: str):
    images = {
        "dog": "https://i.pinimg.com/originals/2e/89/e3/2e89e38372885c6dbce100cf96c95846.jpg",
        "cat": "https://th.bing.com/th/id/R.928c1727d580fb5829ef6b5f5dd830bd?rik=Xod1%2fEepRvvp5w&pid=ImgRaw&r=0",
        "penguin": "https://th.bing.com/th/id/R.da63ba7f8561bfe8f7d46c72037297e5?rik=j4HhHarFOK3tKA&pid=ImgRaw&r=0"
    }
    url = images.get(tipo)
    if url:
        await interaction.response.send_message(url)
    else:
        await interaction.response.send_message("Animal no reconocido. Elige entre: perro, gato, pingüino.")

@bot.command(name='extraer_posts')
async def extraer_posts(ctx):
    logger.info(f'{Fore.YELLOW}Iniciando comando extraer_posts...{Style.RESET_ALL}')
    
    # Cambiar estado del bot mientras se ejecuta el comando
    await bot.change_presence(activity=discord.Game(name="Extrayendo posts..."))
    
    guild = bot.get_guild(GUILD_ID)
    if not guild:
        logger.error(f'{Fore.RED}No se pudo encontrar el servidor.{Style.RESET_ALL}')
        await ctx.send('No se pudo encontrar el servidor.')
        return

    channel = await bot.fetch_channel(CHANNEL_ID)
    if not isinstance(channel, discord.ForumChannel):
        logger.error(f'{Fore.RED}El canal no es un canal de tipo Foro.{Style.RESET_ALL}')
        await ctx.send('El canal no es un canal de tipo Foro.')
        return

    logger.info(f'{Fore.YELLOW}Extrayendo posts del canal {channel.name}, por favor espera...{Style.RESET_ALL}')
    active_threads = channel.threads
    archived_threads = []

    async for thread in channel.archived_threads(limit=100):
        archived_threads.append(thread)

    threads = active_threads + archived_threads

    posts_info = []

    # Mostrar barra de progreso
    for thread in tqdm(threads, file=sys.stdout, desc='Procesando hilos', ncols=100):
        try:
            first_message = await thread.fetch_message(thread.id)
            autor = first_message.author.name
            titulo = thread.name
            fecha = first_message.created_at.strftime('%Y-%m-%d %H:%M:%S')

            post_info = f"{{\nAutor: {autor}\nTítulo: {titulo}\nFecha: {fecha}\n}},"
            posts_info.append(post_info)
        except discord.DiscordException as e:
            logger.error(f'{Fore.RED}Error al procesar el hilo {thread.name}: {e}{Style.RESET_ALL}')

    # Guardar la información en un archivo .txt
    try:
        with open("posts_info.txt", "w", encoding="utf-8") as file:
            file.write("\n\n".join(posts_info))
        logger.info(f'{Fore.GREEN}Archivo posts_info.txt guardado exitosamente.{Style.RESET_ALL}')
    except IOError as e:
        logger.error(f'{Fore.RED}Error al guardar el archivo: {e}{Style.RESET_ALL}')
        await ctx.send(f'Hubo un error al guardar la información de los posts.')

    # Calcular el número del día del reto
    current_date = datetime.now()
    days_passed = (current_date - start_date).days + 1

    # Enviar el mensaje con el número del día del reto y el archivo .txt
    try:
        await ctx.send(content=f"**Reto Diario**: día número *{days_passed}*.", file=discord.File("posts_info.txt"))
        logger.info(f'{Fore.GREEN}Mensaje enviado con éxito.{Style.RESET_ALL}')
    except discord.DiscordException as e:
        logger.error(f'{Fore.RED}Error al enviar el mensaje: {e}{Style.RESET_ALL}')
    
    # Restablecer estado del bot al estado original
    await bot.change_presence(activity=discord.Activity(type=discord.ActivityType.playing, name="Ruler MMORPG!"))

# Comando simple que responde con un mensaje divertido
@bot.command(name='keim')
async def keim(ctx):
    try:
        await ctx.send(content=f"Lite! ✨")
        logger.info(f'{Fore.GREEN}Mensaje enviado con éxito.{Style.RESET_ALL}')
    except discord.DiscordException as e:
        logger.error(f'{Fore.RED}Error al enviar el mensaje: {e}{Style.RESET_ALL}')

# Comando para compartir un enlace a un proyecto
@bot.command(name='celestina')
async def celestina(ctx):
    try:
        await ctx.send(content=f"[**CELESTINA**](https://celestinaproject.github.io/)")
        logger.info(f'{Fore.GREEN}Mensaje enviado con éxito.{Style.RESET_ALL}')
    except discord.DiscordException as e:
        logger.error(f'{Fore.RED}Error al enviar el mensaje: {e}{Style.RESET_ALL}')

# Comando para lanzar un dado
@bot.command(name='dado')
async def dado(ctx, caras: int = 6):
    numero = random.randint(1, caras)
    await ctx.send(f"🎲 Has lanzado un dado de {caras} caras. Resultado: **{numero}**")

# Comando para enviar un mensaje motivacional aleatorio
@bot.command(name='motivar')
async def motivar(ctx):
    frases = [
        "¡Tú puedes con todo!",
        "Sigue adelante, el éxito está cerca.",
        "Cada día es una nueva oportunidad.",
        "Nunca te rindas, ¡estás en el camino correcto!"
    ]
    frase = random.choice(frases)
    await ctx.send(frase)

# Comando para mostrar los comandos disponibles
@bot.command(name='comandos')
async def comandos(ctx):
    commands_list = {
        '!extraer_posts': 'Extrae posts del canal de Foro y guarda en un archivo.',
        '!keim': 'Envía un mensaje divertido.',
        '!celestina': 'Envía un enlace a Celestina.',
        '!dado [caras]': 'Lanza un dado con el número de caras especificado.',
        '!motivar': 'Envía un mensaje motivacional aleatorio.',
        '!comandos': 'Muestra este mensaje.'
    }
    message = "Comandos disponibles:\n\n"
    for command, description in commands_list.items():
        message += f"{command}: {description}\n"
    await ctx.send(message)

bot.run(TOKEN)