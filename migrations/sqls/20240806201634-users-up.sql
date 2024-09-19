CREATE TABLE users(id VARCHAR(150) PRIMARY KEY, firstName VARCHAR(150), lastName VARCHAR(150), password VARCHAR(150));
INSERT INTO users(id, firstName, lastName, password) VALUES('1111','for', 'testing', 'only') RETURNING *;
