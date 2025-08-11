# SistemProductsCategories

Bienvenido al proyecto **SistemProductsCategories**, un sistema diseñado para gestionar eficientemente las categorías de productos. Este proyecto utiliza Docker para simplificar la implementación y el despliegue.

## Requisitos

Para ejecutar este proyecto, necesitarás tener instalados los siguientes programas en tu máquina:

- **Docker**
- **Docker Compose**

## Estructura del Proyecto

El repositorio contiene las siguientes carpetas y archivos:

- **backend/**: Código fuente del servidor backend.
- **frontend/**: Código fuente de la interfaz de usuario frontend.
- **docker-compose.yaml**: Archivo de configuración que permite levantar todos los servicios con un solo comando.

## Instrucciones de Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu entorno local:

1. Clona el repositorio a tu máquina local:

   ```bash
   git clone https://github.com/Ypz22/SistemProductsCategories2.git
   cd SistemProductsCategories
   ```

2. Asegúrate de que Docker y Docker Compose estén instalados en tu sistema.

3. Levanta los servicios con el siguiente comando:

   ```bash
   docker compose up
   ```

   Este comando construirá las imágenes necesarias y levantará todos los contenedores definidos en el archivo `docker-compose.yaml`.

## Acceso a la Aplicación

Una vez que los contenedores estén en funcionamiento, podrás acceder a la aplicación a través de tu navegador en la siguiente dirección:

```
http://localhost:8080
```

## Contribuciones

Las contribuciones son bienvenidas. Si deseas colaborar en este proyecto, por favor abre un issue o envía un pull request.
