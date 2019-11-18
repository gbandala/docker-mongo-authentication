# Contenedor Express-Mongodb-Authentication

_Implementación con Node Js, Express, MVC, con acceso authenticado_

### Pre-requisitos 📋

_Que cosas necesitarás_

```
Framework Node Js

Docker
Editor de código (Visual Code)
Git
Postman
Cuenta en GitHub
```
### Crear estructura del proyecto

_Estructura general inicial_

```
apiclientes
    controllers
      admin.js
    models
      customer.js
    app.js
    keys.js

```

_cadena de conexion,considerando el usuario y password_

```javascript
const DbConnection='mongodb://apiuser:apipassword@mongoserver:27017/galeria';
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
        console.log("---------------------------------------------");
        console.log("Clientes encontrados...");
        console.log(doc);
        console.log("---------------------------------------------");
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
    console.log("---------------------------------------------");
    console.log("datos recibidos del body");
    console.log(client);
    client.save(function (err, client) {
        if (err) return console.error(err);
        console.log(client.cliente + " insertado en la coleccion ...");
        console.log("---------------------------------------------");
        res.send(client.cliente + " insertado en la coleccion ...");
    });
}
```

### Crear el archivo de inicio de la bd

_Estructura mongo-init.js_

```javascript
//crear el usuario de servicio
db.createUser({
    user:"apiuser",
    pwd:"apipassword",
    roles:[
        {
            role:"readWrite",
            db:"galeria"
        }
        
    ]
});
//heredar acceso de lectura escritura
db.grantRolesToUser( "apiuser", [ "readWrite" ] );
//habilitar uso desde shell y cadena de conexion
db.auth('apiuser', 'apipassword');
//crear la bd
db = db.getSiblingDB('galeria');
//crear colleccion y fijar creacion de bd
db.catclientes_ga.insertMany([
    {
        "id_cliente": 10001,
        "cliente": "Jorge Pedante",
        "direccion": "Calle XXXXX # 400 Col, YYYYY, CP 20040",
        "telefono": "52-5527143789"
    },
    {
        "id_cliente": 10002,
        "cliente": "Manuel Alcazar",
        "direccion": "Calle XXXXX # 400 Col, YYYYY, CP 20040",
        "telefono": "52-5527143789"
    },
    {
        "id_cliente": 10003,
        "cliente": "Pedro Torres",
        "direccion": "Calle XXXXX # 400 Col, YYYYY, CP 20040",
        "telefono": "52-5527143789"
    }
]);
```

_Resumen de creación_

> * Crear el código de controller
> * Crear el código del api e invocar el controller
> * Instalar las librerías eje. npm install express body-parser
> * Hacer el npm init para documentar el servicio
> * Editar el package.json en la línea script: "start":"node app.js"
> * Crear el archivo mongo-init.js para usuarios y carga de datos inicial
> * Crear el archivo docker-compose.yml con las instrucciones de armado


_Crear Dockerfile_

```Dockerfile
FROM  node:9-slim
RUN mkdir /src
WORKDIR /src
COPY  package*.json ./
RUN npm install
COPY . .
EXPOSE 1500
CMD ["npm","start"]
```

_Crear .dockerignore para no considerar la carpeta librerías (drivers)_

```
node_modules
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
    mongo-init.js
    package.json
    Dockerfile
    .dockerignore
    docker-compose.yml
```

```yml
version: '3'

#Declarar los servicios
#depends_on para ligar conexion entre contenedores
#environment instrucciones para el uso de bd, usuario y pass
# adicionalamente para cargar archivo de inicializacion mongo-init.js
# en settings de docker en la pestaña share drives debe estar habilitado el drive
# de no hacerlo marca error de drive no compartido
services:
  catclientes:
    container_name: apiclientes
    image: api_clientes
    build: .
    ports:
      - '1500:1500' 
    depends_on:
      - database
  database:
    container_name: mongoserver
    image: mongo
    environment:
      - MONGO_INITDB_DATABASE=galeria
      - MONGO_INITDB_ROOT_USERNAME=apiuser
      - MONGO_INITDB_ROOT_PASSWORD=apipassword
    volumes:
      - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
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



