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
    let conn;
    try {
      // Connect to DB
      conn = await client.connect();
      
      // Query for the hashed password
      const sql = `SELECT password FROM users WHERE id=$1`;
      const result = await conn.query(sql, [id]);
  
      // Check if user exists
      if (result.rows.length) {
        console.log("User found:", result.rows[0]);
  
        const { password: hashedPassword } = result.rows[0];
        console.log("Plain password (before peppering):", pass);
console.log("Pepper:", process.env.pepper);

        
        // Log to check the peppered password and hashedPassword
        console.log("Plain password + pepper:", pass + process.env.pepper);
        console.log("Hashed password from DB:", hashedPassword);
  
        // Compare provided password with stored hashed password
        const valid = bcrypt.compareSync(pass + process.env.pepper as string, hashedPassword);
        console.log("Is password valid:", valid);
  
        // If password is valid, return the user details
        if (valid) {
          const userQuery = `SELECT id, firstName, lastName FROM users where id=$1`;
          const userResult = await conn.query(userQuery, [id]);
          console.log("Authenticated user:", userResult.rows[0]);
  
          return userResult.rows[0]; // Return user info
        }
      }
  
      // Return null if authentication fails
      return null;
  
    } catch (err) {
      console.error("Error during authentication:", err);
      return null;
  
    } finally {
      // Ensure connection is always released
      if (conn) conn.release();
    }
  }
  


}