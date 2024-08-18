import client from "../database";


export type product = {
    id: Number;
    name: string;
    price: Number;
    category: string;
}


export class products{
    // index
    async index(): Promise<product[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch(err) {
            throw new Error(`Cannot get The products ${err}`)
        }
    }
// show
    async show(): Promise<product[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT id FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch(err) {
            throw new Error(`Cannot get The products ${err}`)
        }
    }
    // const create
    async create(p: product): Promise<product[]> {  //reqiered token
        try {
            const conn = await client.connect()
            const sql = `INSERT INTO products (id, name, price, category) VALUES($1, $2, $3, $4) RETURNING *`
            const values = [p.id, p.name, p.price, p.category];
            const result = await conn.query(sql, values)
            conn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error(`Cannot insert The products ${err}`)
        }
    }
// const top5 SELECT name,COUNT(order.product_id) AS popular FROM products, orders ORDER BY DESC LIMIT 5 
// const category
}