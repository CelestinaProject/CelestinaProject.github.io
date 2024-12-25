import json
import os
import re
import matplotlib.pyplot as plt

# Función para cargar y corregir datos desde archivos .txt
def cargar_datos_y_corregir(directorio):
    datos = []
    for archivo in os.listdir(directorio):
        if archivo.endswith('.txt'):
            ruta_archivo = os.path.join(directorio, archivo)
            with open(ruta_archivo, 'r', encoding='utf-8', errors='replace') as f:
                contenido = f.read()
                # Intentar corregir errores comunes en el contenido
                contenido_corregido = corregir_json(contenido)
                semana = archivo.replace('.txt', '')
                datos.append((semana, contenido_corregido))
    return datos

# Función para corregir errores comunes en el contenido JSON
def corregir_json(contenido):
    # Reemplazar comillas simples por comillas dobles
    contenido = contenido.replace("'", '"')
    # Asegurar que las claves estén entre comillas dobles
    contenido = re.sub(r'(?<!")(\b\w+\b)(?=\s*:)', r'"\1"', contenido)
    # Reemplazar caracteres mal codificados
    contenido = corregir_caracteres(contenido)
    # Intentar cerrar objetos JSON incompletos
    contenido = re.sub(r'}\s*,\s*$', '}', contenido.strip())
    return contenido

# Función para corregir caracteres mal codificados
def corregir_caracteres(texto):
    reemplazos = {
        'AcciN': 'Acción',
        'FantasA': 'Fantasía',
        'Sueos': 'Sueños',
        'Aventuras, ,': 'Aventuras,',
        'Comedia, ,': 'Comedia,',
        '": ,': '": ""',  # Corrige valores vacíos sin comillas
    }
    for clave, valor in reemplazos.items():
        texto = texto.replace(clave, valor)
    return texto

# Procesar datos para obtener información por novela usando las URL como identificador
def procesar_datos(datos):
    novelas = {}
    for semana, contenido in datos:
        items = contenido.split('},')  # Dividir en cada objeto de novela
        for item in items:
            try:
                json_str = '{' + item.strip().strip(',') + '}'
                novela = json.loads(json_str)
                url = novela.get('url')
                if url:
                    if url not in novelas:
                        novelas[url] = {'title': novela['title'], 'data': []}
                    novelas[url]['data'].append({'semana': semana, 'followers': novela.get('followers', 0)})
            except Exception as e:
                print(f"Error procesando un item: {e}")
                print(f"Contenido problemático:\n{item}\n")
    return novelas

# Graficar datos de seguidores por novela
def graficar_novelas(novelas):
    for url, novela_info in novelas.items():
        semanas = [item['semana'] for item in novela_info['data']]
        seguidores = [item['followers'] for item in novela_info['data']]

        plt.figure(figsize=(10, 6))
        plt.plot(semanas, seguidores, marker='o', label=novela_info['title'])
        plt.title(f"Evolución de Seguidores: {novela_info['title']}")
        plt.xlabel("Semana")
        plt.ylabel("Seguidores")
        plt.xticks(rotation=45)
        plt.grid()
        plt.legend()
        plt.tight_layout()
        plt.show()

# Directorio con archivos .txt
directorio_txt = r'C:\Users\bgbon\Pictures\CelestinaProject.github.io\novels\info\Niadd'

# Cargar y procesar datos
datos = cargar_datos_y_corregir(directorio_txt)
novelas = procesar_datos(datos)

# Generar gráficos
graficar_novelas(novelas)
