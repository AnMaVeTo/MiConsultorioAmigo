create database consultorio;
use consultorio;
create table paciente (
	id int,
    nombre varchar(40),
    apellido varchar(40),
    fecha_nacimiento varchar(10),
    genero varchar(10),
    direccion varchar(50), 
    telefono varchar(30),
    historialmedico varchar(120),
    seguromedico varchar(50),
	PRIMARY KEY (ID)
    );
INSERT INTO paciente (nombre, apellido, fecha_nacimiento, genero, direccion, telefono, historialmedico, seguromedico) VALUES ('Andres', 'Velasquez', '23-05-2001', 'masculino', 'Calle 39A #3AW-26 B/Santa Ines, Neiva,Huila', '3245830713', 'No aplica', 'Pijao Salud');
    
ALTER TABLE paciente MODIFY COLUMN id int auto_increment;

SHOW CREATE TABLE paciente;

CREATE TABLE `paciente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) DEFAULT NULL,
  `apellido` varchar(40) DEFAULT NULL,
  `fecha_nacimiento` varchar(10) DEFAULT NULL,
  `genero` varchar(10) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `historialmedico` varchar(120) DEFAULT NULL,
  `seguromedico` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO paciente (nombre, apellido, fecha_nacimiento, genero, direccion, telefono, historialmedico, seguromedico) VALUES ('Andres', 'Velasquez', '23-05-2001', 'masculino', 'Calle 39A #3AW-26 B/Santa Ines, Neiva,Huila', '3245830713', 'No aplica', 'Pijao Salud');
INSERT INTO paciente (nombre, apellido, fecha_nacimiento, genero, direccion, telefono, historialmedico, seguromedico) VALUES ('Fabian', 'Longas', '20-02-1984', 'masculino', 'Calle 39A #3AW-26 B/Santa Ines, Neiva,Huila', '3202450342', 'No aplica', 'Pijao Salud');
INSERT INTO paciente (nombre, apellido, fecha_nacimiento, genero, direccion, telefono, historialmedico, seguromedico) VALUES ('Martha', 'Torres', '12-07-1979', 'femenino', 'Calle 39A #3AW-26 B/Santa Ines, Neiva,Huila', '3107500423', 'No aplica', 'Pijao Salud');

SELECT * FROM paciente;