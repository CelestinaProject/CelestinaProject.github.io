import os
from PIL import Image

# Ruta de la carpeta con las imágenes
carpeta_imagenes = r'img'

# Crear una carpeta para las imágenes convertidas
carpeta_webp = os.path.join(carpeta_imagenes, 'webp')
os.makedirs(carpeta_webp, exist_ok=True)

# Recorrer todas las imágenes en la carpeta
for nombre_archivo in os.listdir(carpeta_imagenes):
    if nombre_archivo.endswith(('.png', '.jpg', '.jpeg', '.bmp', '.tiff')):
        # Ruta completa del archivo de imagen
        ruta_imagen = os.path.join(carpeta_imagenes, nombre_archivo)
        
        # Abrir la imagen
        imagen = Image.open(ruta_imagen)
        
        # Nombre del archivo sin extensión
        nombre_sin_extension = os.path.splitext(nombre_archivo)[0]
        
        # Ruta para guardar la imagen en formato WebP
        ruta_webp = os.path.join(carpeta_webp, f'{nombre_sin_extension}.webp')
        
        # Convertir y guardar la imagen en formato WebP
        imagen.save(ruta_webp, 'webp')

print('Conversión completada.')
