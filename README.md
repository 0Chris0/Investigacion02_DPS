## Requisitos Previos
* **Node.js**: Versión estable recomendada (LTS).
* **Expo Go**: Instalado en tu dispositivo móvil o configurado en un emulador.

Instalación y Ejecución

Si es la primera vez que inicias el proyecto, sigue estos pasos para asegurar un funcionamiento correcto y evitar el error de *PlatformConstants*:

### 1. Configuración de compatibilidad
Para evitar errores con versiones de librerías antiguas, primero ejecuta:
`npm config set legacy-peer-deps true`

### 2. Limpieza de archivos
Estos comandos borran las carpetas que pueden causar conflictos (`node_modules` y `package-lock.json`):
* `Remove-Item -Recurse -Force node_modules`
* `Remove-Item -Force package-lock.json`

### 3. Instala las dependencias eliminadas anteriormente
Instalar las dependencias de vuelta y correr el programa:

1. **Instalar:** `npm install`
2. **Ejecutar:** `npx expo start -c`

*Si el teléfono no conecta bien, intenta con:* `npx expo start -c --lan` (Esto funciona como una red local para conectar mejor el celular).

### 4. Aclaracion de posibles errores 
en caso que no funcione, es posible ya que mis compañeros de equipo se les hizo imposible poder iniciar la aplicacion apesar que a mi me funcionaba sin errores, se debe verificar las versiones del proyecto y las de expo go ya que puede tener diferentes errores de compativilidad o instalar dependencias de funcionamiento del proyecto que son:
1. `npx expo install react-native-safe-area-context react-native-screens react-native-get-random-values`

Integrantes del Grupo
* **Enrique Alexander Solano López** — SL223188
* **Gisselle Esmeralda Rodriguez Benitez** — RB243017
* **Jessica Paola Alvarez Sanchez** — AS241238
* **Christian Augusto Maravilla Melendez** — MM250405

