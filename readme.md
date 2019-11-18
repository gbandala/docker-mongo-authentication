# Microservicio CatClientes

_Implementación con Node Js, Express, MVC_

### Pre-requisitos 📋

_Que cosas necesitarás_

```
Framework Node Js
Docker
Editor de código (Visual Code)
Git
Postman
Cuenta en dockerHub
Cuenta en GitHub
```
### Crear estrucutura del microservicio

_Crear una estructura de carpetas independientes ligero de node js y postman_


_Estructura general_

```
apiclientes
    controllers
      admin.js
    models
      customer.js
    app.js
    keys.js
```

_cadena de conexion, cuando se prueba en local ponemos localhost, pero al pasarlo al contenedor ponemos el nombre del servidor o contenedor_

```javascript
const DbConnection='mongodb://mongoserver:27017/galeria';
```
_API get_

```javascript
app.get('/api/customers', Controller.customersInq);
```
_API post_

```javascript
app.post('/api/customers', Controller.customerAdd);
```

_En el controller el archivo admin.js, estarán las funciones_

```javascript
exports.customersInq = function (req, res) {
    Customer.find({},{_id:0,id_cliente:1,cliente:1,direccion:1,telefono:1},function (err, doc) {
        if (err) return console.log(err);
        console.log("Clientes encontrados...");
        console.log(doc);
        res.send(doc);
    }).sort({cliente:1});
};

exports.customerAdd = (req, res) => {
    client = new  Customer({
        id_cliente: req.body.id_cliente,
        cliente: req.body.cliente,
        direccion: req.body.direccion,
        telefono: req.body.telefono
        
    })
    console.log(client);
    client.save(function (err, client) {
        if (err) return console.error(err);
        res.send(client.cliente + " insertado en la coleccion ...");
    });
}
```
_Resumen de ejecución_

> * Crear el código de controller
> * Crear el código del api e invocar el controller
> * Instalar las librerías eje. npm install express body-parser
> * Hacer el npm init para documentar el servicio
> * Editar el package.json en la línea script: "start":"nodemon app.js"
> * Encender la BD mongo local
> * Ejecutar eje. node app.js y en su defecto corregir errores
> * Validar en postman la URL con los parámetros eje localhost:2000/...
> * Validar logs en el servidor de la ejecución


## Crear la imagen api_clientes del servicio apiclientes  ⚙️

_Validado que funciona el servicio, se puede crear una imagen docker_

_Crear Dockerfile_

```Dockerfile
FROM  node:9-slim
RUN mkdir /src
WORKDIR /src
COPY  package*.json ./
RUN npm install
COPY . .
EXPOSE 1500
CMD ["node","app.js"]
```

_Crear .dockerignore para no considerar la carpeta librerías (drivers)_

```
node_modules
```

_Crear Imagen Docker, estos nombres serán los mismos a user en el compose_

```Dockerfile
docker build -t api_clientes .
```

_Validar la Imagen Docker_

```Dockerfile
docker images
```

### Orquestar los servicios 🔩

_Una vez creadas las imagenes con los servicios validados, los vamos a orquestar_

_Resumen_

> * Crear el docker-compose.yml, instrucciones de armado de los contenedores
> * Corer el docker-compose.yml
> * Validar la existencia de los contenedores
> * Validar los logs de cada contenedor si están encendidos
> * Revisar los logs después de cada operación de los contenedores involucrados

_Crear docker-compose.yml al nivel del proyecto_

```
apiclientes
    controllers
      admin.js
    models
      customer.js
    app.js
    keys.js
    package.json
docker-compose.yml
```

```yml
version: '3'

#Declarar los servicios
#depends_on para ligar conexion entre contenedores
services:
  catclientes:
    container_name: apiclientes
    image: api_clientes
    build: .
    ports:
      - '1500:1500' 
    depends_on:
      - mongo
  mongo:
    container_name: mongoserver
    image: mongo
    ports:
      - '27017:27017'
```

_Crear los contenedores al correo yml_

```Dockerfile
docker-compose up -d
```

_Validar la creación_

```Dockerfile
docker ps
```

## Referencias utiles para el diseño de Microservicios 🛠️

_Microservicios es mas que contenedores, debes considerar domain drive design_

* [Arcitura](https://patterns.arcitura.com/soa-patterns/design_patterns/overview) - Patrones de arquitectura
* [Swagger](http://petstore.swagger.io/) - Swagger
* [API](https://apievangelist.com) - Artículos de API
* [Patrones](http://apistylebook.com/) - Guias de diseño de API
* [SOA](https://publications.opengroup.org/white-papers/soa) - Open group de SOA
* [Microservicios](https://martinfowler.com/articles/microservices.html) - Microservicios Martin Fowler
* [IFX](https://bms.ifxforum.org/rel2_4/content/contents.jsp) -  IFX standard
* [BIAN](https://bian.org/servicelandscape/) -  BIAN Lansdcape
* [DDD](https://martinfowler.com/tags/domain%20driven%20design.html) -  Domain Drive Design Martin Fowler


## Autor ✒️

* **Gabriel Bandala** - *Versión Inicial* - [gbandala](https://github.com/gbandala/)



