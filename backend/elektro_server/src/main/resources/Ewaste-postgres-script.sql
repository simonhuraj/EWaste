
CREATE TABLE state
( state_id serial
, name VARCHAR(20) NOT NULL
, CONSTRAINT state_pk PRIMARY KEY (state_id)
);

CREATE TABLE class
( class_id serial
, name VARCHAR(10) NOT NULL
, CONSTRAINT class_pk PRIMARY KEY (class_id)
);

CREATE TABLE category
( category_id serial
, name VARCHAR(100) NOT NULL
, CONSTRAINT category_pk PRIMARY KEY (category_id)
);

CREATE TABLE position
( position_id serial
, name VARCHAR(20) NOT NULL
, CONSTRAINT position_pk PRIMARY KEY (position_id)
);

CREATE TABLE person
( person_id serial
, first_name VARCHAR(40) NOT NULL
, last_name VARCHAR(40) NOT NULL
, position_id INT NULL
, email VARCHAR(30) NOT NULL
, quantity INT NOT NULL DEFAULT 0
, class_id INT NULL
, CONSTRAINT persons_pk PRIMARY KEY (person_id)
, CONSTRAINT persons_fk1 FOREIGN KEY (position_id) REFERENCES position (position_id)
, CONSTRAINT persons_fk2 FOREIGN KEY (class_id) REFERENCES class (class_id)
);

CREATE TABLE manager
( manager_id serial
, username VARCHAR(40) NOT NULL
, password VARCHAR(255) NOT NULL
, CONSTRAINT manager_pk PRIMARY KEY (manager_id)
, CONSTRAINT password_u1 UNIQUE (password)
);

CREATE TABLE delivery
( delivery_id serial
, person_id INT NOT NULL
, category_id INT NOT NULL
, delivered_product VARCHAR(80) NOT NULL
, quantity INT NOT NULL
, brand VARCHAR(50) NOT NULL
, delivery_date timestamp NOT NULL DEFAULT current_timestamp
, specifications VARCHAR(100) NOT NULL
, manager_id INT NOT NULL
, state_id INT NOT NULL
, functional boolean DEFAULT false
, CONSTRAINT delivery_pk PRIMARY KEY (delivery_id)
, CONSTRAINT delivery_fk1 FOREIGN KEY (person_id) REFERENCES person (person_id)
, CONSTRAINT delivery_fk2 FOREIGN KEY (category_id) REFERENCES category (category_id)
, CONSTRAINT delivery_fk3 FOREIGN KEY (state_id) REFERENCES state (state_id)
, constraint delivery_fk4 foreign key (manager_id) references manager (manager_id)
);

INSERT INTO state (name)
VALUES  ('Poskodene'),
		('V dobrom stave'),
		('Ciastocne poskodene');

INSERT INTO class (name)
VALUES  ('NEZARADENY'),
		('1.A'),
		('1.B'),
		('1.C'),
		('1.SA'),
		('1.SB'),
		('1.SC'),
		('2.A'),
		('2.B'),
		('2.C'),
		('2.SA'),
		('2.SB'),
		('2.SC'),
		('3.A'),
		('3.B'),
		('3.C'),
		('3.SA'),
		('3.SB'),
		('3.F'),
		('4.A'),
		('4.B'),
		('4.C'),
		('4.SA'),
		('4.SB'),
		('4.F');

INSERT INTO category (name)
VALUES  ('Velke domace spotrebice'),
		('Male domace spotrebice'),
		('IT a telekomunikacie'),
		('Osvetlenie'),
		('Naradie'),
		('Audio-video technika'),
		('Elektricke a elektronicke hracky'),
		('Solarna a bateriova technologia'),
		('Lekarska technika'),
		('Meracie a regulacne pristroje'),
		('Ine elektricke a elektronicke zariadenia');

INSERT INTO position (name)
VALUES  ('Ziak'),
		('Ucitel'),
		('Zamestnanec');

INSERT INTO person (first_name, last_name, position_id, email, quantity, class_id)
VALUES  ('Lucia', 'Rychlikova', 1, 'lucia.rychlikova@gmail.com', 10, 11),
		('Maria', 'Sandrejova', 2, 'maria.sandrejova@gmail.com', 20,  1),
		('Aneta', 'Kucharova', 1, 'aneta.kucharova@gmail.com', 6,  11),
		('Anna', 'Budisova', 2, 'anna.budisova@gmail.com', 3, 1),
		('Sona', 'Hurajova', 1, 'sona.hurajova@gmail.com', 0, 11),
		('Samuel', 'Balaz', 1, 'samuel.balaz@gmail.com', 2, 11),
		('Samuel', 'Anderko', 1, 'samuel.anderko@gmail.com', 0, 11),
		('Michal', 'Kulbaga', 2, 'michal.kulbaga@gmail.com', 32, 1),
		('Gabriela', 'Mitrova', 2, 'gabriela.mitrova@gmail.com', 50, 1),
		('Jan', 'Focko', 1, 'jan.focko@gmail.com', 1, 11),
		('Jan', 'Novak', 1, 'jan.novak@email.sk', 10, 2),
       	('Peter', 'Hruska', 1, 'peter.hruska@email.sk', 15, 2),
       	('Eva', 'Kovacova', 1, 'eva.kovacova@email.sk', 13, 2),
       	('Marek', 'Simko', 1, 'marek.simko@email.sk', 1, 2),
       	('Lucia', 'Balazova', 1, 'lucia.balazova@email.sk', 8, 2),
       	('Milan', 'Horvat', 1, 'milan.horvat@email.sk', 4, 3),
    	('Jana', 'Kovacikova', 1, 'jana.kovacikova@email.sk', 23, 3),
       	('Tomas', 'Kovac', 1, 'tomas.kovac@email.sk', 15, 3),
       	('Maria', 'Lukacova', 1, 'maria.lukacova@email.sk', 16, 3),
       	('Martin', 'Hudec', 1, 'martin.hudec@email.sk', 20, 3),
       	('Zuzana', 'Novakova', 1, 'zuzana.novakova@email.sk', 0, 3),
       	('Anton', 'Varga', 2, 'anton.varga@email.sk', 0, 1),
       	('Veronika', 'Kubikova', 3, 'veronika.kubikova@email.sk', 12, 1),
       	('Richard', 'Kovac', 3, 'richard.kovac@email.sk', 21, 1),
      	('Simona', 'Majernikova', 1, 'simona.majernikova@email.sk', 50, 2),
       	('Miroslav', 'Kovacik', 1, 'miroslav.kovacik@email.sk', 0, 3),
       	('Janka', 'Vargova', 1, 'janka.vargova@email.sk', 0, 4),
      	('Jakub', 'Kolnik', 1, 'jakub.kolnik@email.sk', 0, 4),
       	('Monika', 'Horvathova', 1, 'monika.horvathova@email.sk', 45,  4),
       	('Robert', 'Kratochvil', 3, 'robert.kratochvil@email.sk', 0, 1),
	   	('Marta', 'Vargova', 2, 'marta.vargova@email.sk', 1, 1),
      	('Lukas', 'Hlavac', 1, 'lukas.hlavac@email.sk', 5, 3),
       	('Julia', 'Kovacova', 1, 'julia.kovacova@email.sk', 12,  2),
       	('David', 'Marek', 1, 'david.marek@email.sk', 0, 2),
	   	('Peter', 'Vavra', 2, 'peter.vavra@email.sk', 0, 1),
		('Jana', 'Balogova', 3, 'jana.balogova@email.sk', 15, 1),
       	('Jakub', 'Hruska', 3, 'jakub.hruska@email.sk', 32, 1),
       	('Katarina', 'Kostalova', 1, 'katarina.kostalova@email.sk', 15, 4),
       	('Marek', 'Bartos', 1, 'marek.bartos@email.sk', 1, 2),
       	('Veronika', 'Havlickova', 1, 'veronika.havlickova@email.sk', 0, 3),
       	('Matus', 'Mikus', 1, 'matus.mikus@email.sk', 34, 7),
       	('Nikola', 'Lukacova', 1, 'nikola.lukacova@email.sk', 21, 8),
      	('Tibor', 'Krajcik', 2, 'tibor.krajcik@email.sk', 3, 1),
       	('Simona', 'Polakova', 1, 'simona.polakova@email.sk', 5, 10),
      	('Adam', 'Durco', 1, 'adam.durco@email.sk', 7, 11),
   		('Barbora', 'Kristofova', 1, 'barbora.kristofova@email.sk', 12, 4),
  		('Filip', 'Stefancik', 1, 'filip.stefancik@email.sk', 0, 13),
       	('Ema', 'Blazkova', 1, 'ema.blazkova@email.sk', 13, 14),
		('Jan', 'Janik', 1, 'jan.janik@email.sk', 12, 5),
   		('Lucia', 'Kovacova', 1, 'lucia.kovacova@email.sk', 0, 16),
       	('Peter', 'Ziak', 1, 'peter.ziak@email.sk', 1, 17),
		('Karolina', 'Drobna', 3, 'karolina.drobna@email.sk', 2, 1),
   		('Samuel', 'Pavlovic', 1, 'samuel.pavlovic@email.sk', 3, 19),
       	('Sona', 'Molnarova', 2, 'sona.molnarova@email.sk', 5, 1),
     	('Tomas', 'Cervenka', 3, 'tomas.cervenka@email.sk', 0, 1),
      	('Erik', 'Kosut', 1, 'erik.kosut@email.sk', 1, 22),
       	('Janka', 'Hruskova', 2, 'janka.hruskova@email.sk', 20, 1),
       	('Ivan', 'Marcek', 3, 'ivan.marcek@email.sk', 0, 1);

INSERT INTO manager (manager_id, username, password)
VALUES  (9, 'gabriela.mitrova', 'mitrova'),
		(4, 'anna.budisova', 'budisova'),
		(2, 'maria.sandrejova', 'sandrejova'),
		(12, 'vratnica', 'vratnica');

INSERT INTO delivery (person_id, category_id, delivered_product, quantity, brand, specifications, manager_id, state_id, functional)
VALUES  (1, 2, 'Toastovac', 3, 'Tefal', 'Model E2418HN', 2, 1, true),
		(2, 1, 'Pracka', 1, 'Whirlpool', 'Model 4796', 2, 2, true),
		(3, 3, 'Notebook', 2, 'Lenovo', 'Model ThinkPad E15', 4, 3, false),
		(4, 7, 'Stavebnica', 2, 'Lego', 'Model K1500', 4, 2, true),
		(5, 4, 'LED panel', 4, 'Berge', 'Model Optiplex 3050', 9, 3, false),
		(6, 5, 'Set naradia', 1, 'Ryobi', 'Model PIXMA TS8351', 9, 2, true),
		(7, 8, 'Mobilne solarne zariadenia', 1, 'Viking', 'Model T450BT', 2, 1, true),
		(8, 6, 'Nahladovy monitor', 2, 'Prestigio', 'Model Galaxy Tab S6', 12, 1, true),
		(9, 10, 'Multimeter', 5, 'UNI-T', 'Model C920s', 4, 1, true),
		(10, 11, 'Routery', 6, 'TP-link', 'Model Archer C6', 9, 3, true);