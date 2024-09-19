CREATE TABLE Products (id VARCHAR(150) PRIMARY KEY, name VARCHAR(150), price INTEGER, category VARCHAR(150));
INSERT INTO Products(id, name, price, category) VALUES('1111', 'for', 1, 'testing') RETURNING *;
