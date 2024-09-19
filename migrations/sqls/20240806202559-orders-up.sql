 CREATE TABLE Orders (
    id VARCHAR(150),
    product_id VARCHAR(150),
      CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES Products(id),
    prod_quantity integer,
    user_id VARCHAR(150),
      CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id),
    status_of_order char
    );
INSERT INTO Orders(id, product_id, prod_quantity, user_id, status_of_order) VALUES('123', '1111', 1, '1111', 'A') RETURNING *;
