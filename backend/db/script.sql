-- DROP SCHEMA dbo;

CREATE SCHEMA dbo;
-- biblioteca.dbo.autor definition

-- Drop table

-- DROP TABLE biblioteca.dbo.autor;

CREATE TABLE biblioteca.dbo.autor (
	id bigint IDENTITY(0,1) NOT NULL,
	nombre varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	apellidos varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	nacionalidad varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	CONSTRAINT autor_PK PRIMARY KEY (id)
);


-- biblioteca.dbo.usuarios definition

-- Drop table

-- DROP TABLE biblioteca.dbo.usuarios;

CREATE TABLE biblioteca.dbo.usuarios (
	id bigint IDENTITY(0,1) NOT NULL,
	identificacion bigint NOT NULL,
	nombre varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	apellidos varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	fechaNacimiento datetime NOT NULL,
	correo varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	password varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	CONSTRAINT usuarios_PK PRIMARY KEY (id)
);


-- biblioteca.dbo.genero definition

-- Drop table

-- DROP TABLE biblioteca.dbo.genero;

CREATE TABLE biblioteca.dbo.genero (
	id bigint IDENTITY(0,1) NOT NULL,
	genero varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	CONSTRAINT genero_PK PRIMARY KEY (id)
);


-- biblioteca.dbo.libros definition

-- Drop table

-- DROP TABLE biblioteca.dbo.libros;

CREATE TABLE biblioteca.dbo.libros (
	id bigint IDENTITY(0,1) NOT NULL,
	titulo varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	editorial varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	stock int NOT NULL,
	genero bigint NOT NULL,
	imagen varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
	CONSTRAINT libros_PK PRIMARY KEY (id),
	CONSTRAINT libros_FK FOREIGN KEY (genero) REFERENCES biblioteca.dbo.genero(id)
);


-- biblioteca.dbo.prestamos definition

-- Drop table

-- DROP TABLE biblioteca.dbo.prestamos;

CREATE TABLE biblioteca.dbo.prestamos (
	id bigint IDENTITY(0,1) NOT NULL,
	fecha_prestamo datetime NOT NULL,
	fecha_devolucion datetime NOT NULL,
	devuelto int NOT NULL,
	usuario_id bigint NOT NULL,
	libro_id bigint NOT NULL,
	cantidad int NOT NULL,
	CONSTRAINT prestamos_PK PRIMARY KEY (id),
	CONSTRAINT prestamos_FK FOREIGN KEY (usuario_id) REFERENCES biblioteca.dbo.usuarios(id),
	CONSTRAINT prestamos_FK_1 FOREIGN KEY (libro_id) REFERENCES biblioteca.dbo.libros(id)
);


-- biblioteca.dbo.autor_libro definition

-- Drop table

-- DROP TABLE biblioteca.dbo.autor_libro;

CREATE TABLE biblioteca.dbo.autor_libro (
	id bigint IDENTITY(0,1) NOT NULL,
	libro bigint NOT NULL,
	autor bigint NOT NULL,
	CONSTRAINT autor_libro_PK PRIMARY KEY (id),
	CONSTRAINT autor_libro_FK FOREIGN KEY (autor) REFERENCES biblioteca.dbo.autor(id),
	CONSTRAINT autor_libro_FK_1 FOREIGN KEY (libro) REFERENCES biblioteca.dbo.libros(id)
);
