import client from "../database";

export type order = {
  id: string;
  product_id: string;
  prod_quantity: number;
  user_id: string;
  status_of_order: string;
};

export class orders {
  // <!-- - Current Order by user (args: user id)[token required] -->

  // current method
  async currentOrder(user_id: string): Promise<order> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id=$1 AND status_of_order = 'A'`;
      const result = await conn.query(sql, [user_id]);
      conn.release();
      const order = result.rows[0];
      return {
        id: order.id,
        product_id: order.product_id,
        prod_quantity: order.prod_quantity,
        user_id: order.user_id,
        status_of_order: order.status_of_order,
      };
    } catch (err) {
      throw new Error(
        `Could not get current order for user ${user_id}: ${err}`,
      );
    }
  }

  // completed method  (Still didn't use)
  async completedOrder(user_id: number): Promise<order> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id = $1 AND status_of_order = 'C'`;
      const result = await conn.query(sql, [user_id]);
      conn.release();
      const order = result.rows[0];
      return {
        id: order.id,
        product_id: order.product_id,
        prod_quantity: order.prod_quantity,
        user_id: order.user_id,
        status_of_order: order.status_of_order,
      };
    } catch (err) {
      throw new Error(
        `Could not get current order for user ${user_id}: ${err}`,
      );
    }
  }

}
