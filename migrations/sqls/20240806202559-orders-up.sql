 CREATE TABLE Orders (
    id VARCHAR(25),
    product_id VARCHAR(25),
      CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES Products(id),
    prod_quantity integer,
    user_id VARCHAR(25),
      CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id),
    status_of_order char
    )