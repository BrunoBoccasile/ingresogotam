Hasta ahora desarrollé casi en su totalidad la API, la base de datos y estoy avanzando con la parte del Frontend.
Para correr el servidor, se debe ejecutar "npm run dev" estando en el proyecto de NodeJS y para correr el FrontEnd ng serve en el proyecto de Angular.

Paquetes instalados:
  Backend:
    express
    nodemon
    mysql2
    dotenv
    express-validator

  Frontend:
    bootstrap
    sweetalert2

Sentencias SQL para la creación de la base de datos y sus tablas:

CREATE SCHEMA gotamdb;

USE gotamdb;

CREATE TABLE areas(  
id INT NOT NULL AUTO_INCREMENT,     
nombre VARCHAR(50) NOT NULL,     
CONSTRAINT pk_area PRIMARY KEY (id))

CREATE TABLE empleados(
	id INT AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    dni INT NOT NULL,
    nacimiento DATE NOT NULL,
    desarrollador BOOLEAN NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    id_area INT NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT 1,
    CONSTRAINT pk_empleado PRIMARY KEY (id),
	CONSTRAINT fk_empleado_area FOREIGN KEY (id_area) REFERENCES areas (id));
