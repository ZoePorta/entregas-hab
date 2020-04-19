drop database if exists videoclub;

create database videoclub;
use videoclub;

CREATE TABLE personas(
id int primary key auto_increment,
name varchar(100) not null
);

CREATE TABLE peliculas(
id int primary key auto_increment,
nombre varchar (100) not null,
descripcion varchar(255),
caratula varchar(255),
pegi decimal(2),
tarifa enum('antigua', 'normal', 'estreno') not null,
id_director int not null,
constraint FK_pelicula_director FOREIGN KEY (id_director) references personas(id)
);

CREATE TABLE actores(
id int primary key auto_increment,
id_pelicula int not null,
id_persona int not null,
constraint FK_actores_peliculas FOREIGN KEY (id_pelicula) REFERENCES peliculas(id),
constraint FK_actores_personas foreign key (id_persona) REFERENCES personas(id)
);

CREATE TABLE proveedores(
id int primary key auto_increment,
nombre varchar(50) not null,
tlf int,
dni varchar(9) not null,
email varchar(25)
);

CREATE TABLE copias(
id int primary key auto_increment,
id_pelicula int not null,
id_proveedor int,
tipo enum('DVD','VHS') not null,
disponible boolean not null,
constraint FK_copias_peliculas FOREIGN KEY (id_pelicula) REFERENCES peliculas(id),
constraint FK_copias_proveedores FOREIGN KEY (id_proveedor) REFERENCES proveedores(id)
);

CREATE TABLE usuarios(
id int primary key auto_increment,
nombre varchar(255) not null,
dni varchar(9) not null,
tlf int,
email varchar(25),
fecha_nacimiento date not null
);

create table alquileres(
id int primary key auto_increment,
id_copia int,
id_usuario int,
fecha_inicio datetime not null,
fecha_fin datetime,
valoracion decimal(2,1),
comentario varchar(255),
constraint FK_alquileres_copias FOREIGN KEY (id_copia) REFERENCES copias(id),
constraint FK_alquileres_usuarios FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);
