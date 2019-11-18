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
