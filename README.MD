# Práctica WEB-API/Node.js/MongoDB

Desarrollar el API que se ejecutará en el servidor de un servicio de venta de artículos de
segunda mano llamado Nodepop.

El servicio mantiene anuncios de compra o venta de artículos y permite buscar como poner
filtros por varios criterios.

Cada anuncio tiene los siguientes datos:
- Nombre del artículo, un anuncio siempre tendrá un solo artículo
- Si el artículo se vende o se busca
- Precio. 
- Foto del artículo. Cada anuncio tendrá solo una foto.
- Tags del anuncio: work, lifestyle, motor y mobile

# Práctica WEB-API/Node.js/MongoDB AVANZADO



## Comenzando 🚀

- Clona el repositorio:  

HTTPS:  
`git clone https://github.com/Venganzaalchocolate/nodeapi.git`  

SSH:  
`git clone git@github.com:Venganzaalchocolate/nodeapi.git`  

### Pre-requisitos 📋  

Tener instalado:

- MongoDB  
- Node  

### Instalación 🔧

Debes estar dentro de la carpeta nodepop.

Instalar dependencias:  
`npm install`  

Inicializar Base de Datos con 6 anuncios de prueba y un usuario para poder facilitar el acceso.
`npm run bd`  
    - Los datos del usuario son:
      - email: user@example.com
      - password: 1234

Iniciar la aplicación:  
`npm start`  

El puerto por defecto es el 3000, para cambiarlo solo debes acceder a la carpeta bin en el archivo www.js linea 15  
`var port = normalizePort(process.env.PORT || '3000');`  

## Conexión a la base de datos

Crear un archivo en la raiz del proyecto .env copiando el contenido de .env.example

En .env.example sustituir la ruta de ejemplo por la que deseas usar


## Rutas ⚙️

Index:
`http://localhost:3000/`
- Una página (frontend) que muestra una lista de anuncios
- Cada anuncio tendrá una foto pública y su correspondiente miniatura también publica

Login:
`http://localhost:3000/login`    
- Página frontend para iniciar sesión    
`http://localhost:3000/api/login`    
- Ruta para realizar peticiones POST al API y poder iniciar sesión

API:
ATENCIÓN: Las rutas del API son privadas, se debe tener un token válido para acceder a ellas. Ejemplo: `http://localhost:3000/api/articulos?token=<tokenvalido>)`    

`http://localhost:3000/api/articulos`    
- Página que muestra una lista de anuncios en formato JSON

## Internacionalización

El frontend es multi-idioma, se puede seleccionar Castellano (ES) o Inglés (EN) en la parte superior izquiera y se cambiará automáticamente el idioma. 

El idioma por defecto es el Inglés.

### Operaciones que realiza 🔩
- Busqueda de anuncios con filtros por:
    - Tag
            - Ejemplo: `http://localhost:3000/api/articulos?tags=motor`
    - Tipo de anuncio (venta o búsqueda)
        - Venta: `venta=true` 
        - Busqueda: `venta=false`
            - Ejemplo: `http://localhost:3000/api/articulos?venta=true`
    - Precio
        - Filtrar articulo por precio exacto. `precio=<numero>`
            - Ejemplo: `http://localhost:3000/api/articulos?precio=45`
        - Filtrar articulos con un precio menor que: `precio=<numero>-`
            - Ejemplo: `http://localhost:3000/api/articulos?precio=-200`
        - Filtrar articulos con un precio mayor que: `precio=-<numero>`
            - Ejemplo: `http://localhost:3000/api/articulos?precio=200-`
        - Filtrar articulos conprendido entre: `precio=<numero>-<numero>`
            - Ejemplo: `http://localhost:3000/api/articulos?precio=20-200`

    - Nombre de artículo 
        - Puede contener solo parte del nombre, no distingue entre mayúsculas y minúsculas.  
        `nombre=<nombrearticulo>`
            - Ejemplo: `http://localhost:3000/api/articulos?nombre=Bike`
            - Ejemplo: `http://localhost:3000/api/articulos?nombre=Bi`
            - Ejemplo: `http://localhost:3000/api/articulos?nombre=bike`
    
- Artículos ordenador por:
    - skip = muestrame el resultado a partir de x
    - limit = muestrame x resultados
    - sort = ordename los resultados
    
    Las busquedas pueden estar concatenadas entre si.
            - Ejemplo: `http://localhost:3000/apiv1/anuncios?tag=mobile&venta=false&nombre=ip&precio=50-&start=0&limit=2&sort=precio`

- Lista de tags existentes. Muestra una lista de los tags existentes en la BD.  
`http://localhost:3000/api/articulos/tags`

- Creación, modificación y eliminación de artículos (Se debe tener encuenta el esquema y sus restricciones)  

- Puedes acceder a las imágenes a través de la ruta images. `/images/<nombreimagen.jpg>`  
            - Ejemplo: `http://localhost:3000/images/bike.jpg`

### Esquema del artículo ⌨️

- nombre: 
    - tipo: string
    - requerido: si
- venta:
    - tipo: booleano (true, false)
    - requerido: si
- precio: 
    - tipo: número
    - requerido: si
- foto: 
    - tipo: número
    - requerido: no

- tags: 
    - tipo: string
    - requerido: no
    - valores que se pueden introducir:
        - work
        - lifestyle
        - motor
        - mobile

## Autores ✒️

* **Elisabet D'Acosta Almirón** - (https://github.com/venganzaalchocolate)
