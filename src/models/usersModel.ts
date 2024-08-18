import client from "../database";
import bcrypt from 'bcrypt';


export type user = {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
}


export class users {





    async index(): Promise<user[]> {     // [token required]:
        try {
        const conn = await client.connect()
        const sql = 'SELECT * FROM users'
        const result = await conn.query(sql)
        conn.release()
        return result.rows
        } catch (err) {
            throw new Error(`Cannot get The products ${err}`)
        }
    }

// Show [token required]  
async show(): Promise<user[]> {
    try {
        const conn = await client.connect()
        const sql = 'SELECT id FROM users'
        const result = await conn.query(sql)
        conn.release()
        return result.rows
    } catch(err) {
        throw new Error(`Cannot get The products ${err}`)
    }
}
// Create N[token required]
async create(u: user): Promise<user[]> {  //reqiered token
    try {
        const conn = await client.connect()
        const sql = `INSERT INTO users (id, firstName, lastName, password) VALUES($1, $2, $3, $4) RETURNING *`
        const hash = bcrypt.hashSync(
            u.password + process.env.pepper, 
            parseInt(process.env.SALT_ROUNDS as string)
         );
        // const values = [u.id, u.firstName, u.lastName, [u.password, hash]];
        // const result = await conn.query(sql, values)
        const result = await conn.query(sql, [u.id, u.firstName, u.lastName, hash])

        conn.release()
        return result.rows[0]
    } catch(err) {
        throw new Error(`Cannot insert The user info ${err}`)
    }
}

async Authenticator(id: string, pass: string): Promise<user | null> {
    const conn = await client.connect()
    // const sql = 'SELECT password FROM users WHERE id=($1)'
    const sql = 'SELECT * FROM users WHERE id=($1)'

    const result = await conn.query(sql,[id])

    console.log(pass + process.env.pepper)

    if(result.rows.length) {
        const user = result.rows[0]
        console.log(user)

        if(bcrypt.compareSync(pass + process.env.pepper, user.password)) {
            return user
        }
    }
return null
}

}