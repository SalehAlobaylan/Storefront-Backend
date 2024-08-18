import client from "../database";

export type order = {
    id: Number;
    product_id: Number;
    prod_quantity: Number;
    user_id: Number;
    status_of_order: string;
}

export class orders {
    // <!-- - Current Order by user (args: user id)[token required] -->


    async currentOrder(user_id: order): Promise<order[]> {
        try {
            const conn = await client.connect()
            const sql = `SELECT * FROM orders WHERE user_id = $1 AND status_of_order = 'A'`;
            const result = await conn.query(sql,[user_id])
            conn.release()
            return result.rows
        } catch(err) {
            throw new Error(`Could not get current order for user ${user_id}: ${err}`)
        }
    }

    // async index(): Promise<order[]> {
    //     try {
    //         const conn = await client.connect()
    //     const sql = 'SELECT * FROM orders'
    //     const result = await conn.query(sql)
    //     conn.release()
    //     return result.rows
    //     } catch (err) {
    //         throw new Error(`Cannot get The products ${err}`)
    //     }
    // }
}