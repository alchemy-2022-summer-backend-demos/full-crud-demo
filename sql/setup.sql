-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists reptiles;

CREATE table reptiles (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  family VARCHAR NOT NULL,
  genus VARCHAR NOT NULL
);

INSERT INTO reptiles (name, genus, family) VALUES
('Aligator','Alligator','Alligatoridae'),
('Green Iguana','Iguana','Iguanidae'),
('American Crocodile','Crocodylus','Crocodylidae');