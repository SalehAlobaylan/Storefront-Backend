import client from "../database";
import bcrypt from "bcrypt";

export type user = {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
};

export class users {
  async index(): Promise<user[]> {
    // [token required]:
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get The products ${err}`);
    }
  }

  // Show [token required]
  async show(user_id: string): Promise<user> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users where id = $1";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      const user = result.rows[0];
      return {
        id: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        password: user.password,
      };
    } catch (err) {
      throw new Error(`Cannot get The user id: ${err}`);
    }
  }
  // Create N[token required]
  async create(u: user): Promise<user> {
    //reqiered token
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO users (id, firstName, lastName, password) VALUES($1, $2, $3, $4) RETURNING *`;
      const hash = bcrypt.hashSync(
        u.password + process.env.pepper,
        parseInt(process.env.SALT_ROUNDS as string),
      );
      // const values = [u.id, u.firstName, u.lastName, [u.password, hash]];
      // const result = await conn.query(sql, values)
      const result = await conn.query(sql, [
        u.id,
        u.firstName,
        u.lastName,
        hash,
      ]);

      conn.release();
      const createdUser: user = {
        id: result.rows[0].id,
        firstName: result.rows[0].firstname,
        lastName: result.rows[0].lastname,
        password: result.rows[0].password,
      };

      return createdUser;
    } catch (err) {
      throw new Error(`Cannot insert The user info ${err}`);
    }
  }

  async Authenticator(id: string, pass: string): Promise<user | null> {
    try {
      const conn = await client.connect();
      // const sql = 'SELECT password FROM users WHERE id=($1)'
      const sql = `SELECT password FROM users WHERE id=$1`;

      const result = await conn.query(sql, [id]);
      console.log("The id: " + process.env.pepper);
      console.log("The password: ", pass + process.env.pepper);
      console.log("before entering result.rows.length");
      conn.release();
      if (result.rows.length) {
        console.log("entering result.rows.length why");
        console.log(result.rows[0]);

        const { password: hashedPassword } = result.rows[0];
        console.log("The hashed password: " + hashedPassword);

        const valid = bcrypt.compareSync(
          pass + process.env.pepper,
          hashedPassword,
        );
        // const valid =bcrypt.compareSync(`${pass}  ${process.env.pepper}`,hashedPassword);

        if (valid) {
          console.log("entering valid means the password is correct");
          const conn = await client.connect();
          const user = await conn.query(
            `SELECT id, firstName, lastName FROM users where id=$1`,
            [id],
          );
          conn.release();
          return user.rows[0]; // ||null
        }
      }
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // async Authenticator(id: string, pass: string): Promise<user | null> {
  //     try{
  //         const conn = await client.connect();
  //         const sql = 'SELECT * FROM users WHERE id=($1)';
  //         const result = await conn.query(sql,[id]);

  //         if(result.rows.length) {
  //             const { password: hashPassword } = result.rows[0]
  //             const isValid = bcrypt.compareSync(`${pass}${process.env.pepper}`,hashPassword)
  //         }

  //     }catch(err) {
  //         console.log(err)
  //     }
  // }
}

// async Authenticator(id: string, pass: string): Promise<user | null> {
//     const conn = await client.connect()
//     // const sql = 'SELECT password FROM users WHERE id=($1)'
//     const sql = 'SELECT * FROM users WHERE id=($1)'

//     const result = await conn.query(sql,[id])

//     console.log(pass + process.env.pepper)

//     if(result.rows.length) {
//         const user = result.rows[0]
//         console.log(user)

//         if(bcrypt.compareSync(pass + process.env.pepper, user.password)) {
//             return user
//         }
//     }
// return null
// }
