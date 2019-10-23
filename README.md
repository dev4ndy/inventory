# inventory
Gestión de inventario de mercancías, proyecto de muestra usando NodeJS, Typescript, Express, Sequelize.

## Instrucciones

1. Cree una base de datos llamada ***inventory*** en MySQL `CREATE  DATABASE  inventory;`.
2. Abra la terminal y clone este repositorio `git clone https://github.com/dev4ndy/inventory.git`.
3. Ingrese a la carpeta clonada `cd inventory`.
4. Instale las dependencias `npm i`.
5. Cambie el ***username*** y ***password*** de la contraseña, edite esta información en el archivo /lib/config/database.ts 
6. Guarde los cambios.
7.  Inicie el servidor, ejecute este comando desde la terminal estando dentro de la carpeta ***inventory*** `npm run start`
8. Una vez el servidor se ha iniciado, las tablas de la base de datos se debieron crear.
9. Dentro de la raíz del proyecto existe un script llamador seeder.sql, este contiene los datos para hacer pruebas, ejecútelo con `mysql -u user_name -p inventory < seeder.sql`, cambie *user_name* por el usuario de MySQL.
10.  Todo listo.

## Documentación del API
La documentación del API se genero mediante Postman, a continuación dejo la un enlace de la misma.
[Documentación](https://documenter.getpostman.com/view/9221911/SVzuaLqW)

## Front-end
Una aplicación front-end que implementa esta API es [fe-inventory](https://github.com/dev4ndy/fe-inventory).
