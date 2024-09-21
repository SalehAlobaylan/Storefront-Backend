import client from "../database";
export type order_product = {
    product_id: string;
    user_id: string;
  };


export class order_products {

async getAllorders(user_id: string): Promise<order_product> {
    try {
        const conn = await client.connect();
        const sql = `SELECT * FROM order_products WHERE user_id=$1`;
        const result = await conn.query(sql,[user_id]);
        conn.release();
        const order_products = result.rows[0];
        return {
          product_id: order_products.product_id,
          user_id: order_products.user_id,
        };
    } catch (error) {
      throw new Error(`there is no:${(error as Error).message}`)
    }
  }
}