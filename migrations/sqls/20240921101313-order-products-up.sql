 CREATE TABLE order_products (
    product_id VARCHAR(150),
      CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES Products(id),
    user_id VARCHAR(150),
      CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id)
    );
INSERT INTO order_products(product_id, user_id) VALUES('1111','1111') RETURNING *;
