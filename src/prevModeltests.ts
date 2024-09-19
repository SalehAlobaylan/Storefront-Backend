// import bcrypt from 'bcrypt';
// import { product, products } from "../productsModel";
// import { user, users } from "../usersModel";
// import { order, orders } from "../ordersModel";
// import client from "../../database";

// const storeP = new products();
// const storeU = new users();
// const storeO = new orders();

// //products
// describe("Products Model exist", () => {
//     it('should have an index method', () => {
//         expect(storeP.index).toBeDefined();
//     });
//     it('should have a show method', () => {
//         expect(storeP.show).toBeDefined();
//     });

//     it('should have a create method', () => {
//         expect(storeP.create).toBeDefined();
//     });

//     let createdProductId: string;

//     // beforeAll(async () => {
//     //   // Optionally clear the products table to ensure a clean state before testing
//     //   await client.query('DELETE FROM products');
//     // });

//     const x = Math.floor((Math.random() * 50000) + 1);
//     console.log("the id created is:", x)
//     it('create method should add a product', async () => {

//       const result = await storeP.create({
//         id: `${x}`,
//         name: "Banana" ,
//         price: 25,
//         category: 'general'
//       });
//       console.log("Created Product:", result); // Debugging

//       createdProductId = result.id;
//       expect(result).toEqual({
//         id: result.id,
//         name: "Banana" ,
//         price: 25,
//         category: 'general'
//       });
//     });

//     // it("index method should return a list of products", async () => {
//     //     const result = await storeP.index();
//     //     expect(result).toEqual([]);
//     // });

//     it('show method should return the correct product', async () => {

//       console.log("Created Product ID:", createdProductId); // Debugging

//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       const queryResult = await client.query('SELECT * FROM products WHERE id = $1', [createdProductId]);
//       console.log("Query result:", queryResult.rows); // Debugging
//       const result = await storeP.show(createdProductId );
//         expect(result).toEqual({
//           id: createdProductId,
//           name: "Banana",
//           price: 25,
//           category: 'general'
//         });
//       });

// });

// //users

// describe("users Model exist", () => {
//     it('should have an index method', () => {
//       expect(storeU.index).toBeDefined();
//     });

//     it('should have a show method', () => {
//       expect(storeU.show).toBeDefined();
//     });

//     it('should have a create method', () => {
//       expect(storeU.index).toBeDefined();
//     });

//     // it("index method should return a list of users", async () => {
//     //     const result = await storeU.index();
//     //     expect(result).toEqual([]);
//     // });
//     const y = Math.floor((Math.random() * 50000) + 1);
//     const users = {
//       id: String(y),
//       firstName: "some",
//       lastName: "one",
//       password: "123"
//     } as user

//     // beforeAll(async () => {
//     //   const createUser = await storeU.create(user)
//     //   user.id = createUser.id
//     // })
//     // afterAll(async () => {
//     //   const conn = await client.connect()()
//     //   const sql = `DELETE FROM users`
//     //   await conn.query(sql)
//     //   conn.release()
//     // })

//     it('Create new  user should  return the new user in db ', async () => {

//      // console.log("User object before create:", users);

//       const createUser = await storeU.create(users);

//       //console.log("User object after create:", createUser);
//       users.id = createUser.id
//       expect(createUser.id).toBe(users.id);  //   console.log("the id expected is:", createUser.id)
//       expect(createUser.firstName).toBe(users.firstName); // console.log("the Firstname expected is:", createUser.firstName)
//       expect(createUser.lastName).toBe(users.lastName);  //  console.log("the Lastname expected is:", createUser.lastName)
//     })

//     // it('create method should add a user', async () => {
//     //   const result = await storeU.create({
//     //     id: `${x}`,
//     //     firstName: "Ahmed",
//     //     lastName: "Faisal",
//     //     password: String(password)
//     //   });
//     //   const hash = bcrypt.hashSync(password + process.env.pepper, parseInt(process.env.SALT_ROUNDS as string));
//     //   expect(result).toEqual({
//     //     id: `${x}`,
//     //     firstName: 'Ahmed',
//     //     lastName: "Faisal",
//     //     password: String(hash)
//     //   });
//     // });

//     // it('show method should return the correct user', async () => {

//     //     const result = await storeU.show((`${x}`));
//     //     const hash = bcrypt.hashSync(password + process.env.pepper, parseInt(process.env.SALT_ROUNDS as string));
//     //     expect(result).toEqual({
//     //       id: `${x}`,
//     //       firstName: "Ahmed",
//     //       lastName: "Faisal",
//     //       password: String(hash)
//     //     });
//     //   });

//     it('show method should return the correct user', async () => {
//       const showing = Math.floor((Math.random() * 50000) + 1);
//       const showuser = {
//         id: String(showing),
//         firstName: "some",
//         lastName: "one",
//         password: "123"
//       } as user
//       const createUser = await storeU.create(showuser);
//       // console.log("User object after create:", createUser);

//       const result = await storeU.show(createUser.id);
//       // console.log("User object after show:", result);

//       expect(result.id).toBe(createUser.id);
//       // console.log("Expected ID:", createUser.id);

//       expect(result.firstName).toBe(createUser.firstName);
//       // console.log("Expected Firstname:", createUser.firstName);

//       expect(result.lastName).toBe(createUser.lastName);
//       // console.log("Expected Lastname:", createUser.lastName);
//     });

// });

// //orders
// describe("orders Model", () => {
//     it('should have a current method', () => {
//       expect(storeO.currentOrder).toBeDefined();
//     });

//     it('show method should return the correct order', async () => {
//       const orders = {
//         id: '123',
//         product_id: '21342151267',
//         prod_quantity: 4,
//         user_id: '12321421567',
//         status_of_order: 'A'
//       } as order
//       client.query('INSERT INTO Products (id, name, price, category) VALUES($1, $2, $3, $4) RETURNING *', [orders.product_id,'for',1,'testing']);
//       client.query(`INSERT INTO users (id, firstName, lastName, password) VALUES($1, $2, $3, $4) RETURNING *`,[orders.user_id, 'for', 'testing', 'only'])
//       client.query('INSERT INTO Orders (id, product_id, prod_quantity, user_id, status_of_order) VALUES($1, $2, $3, $4, $5) RETURNING *',
//          [orders.id, orders.product_id, orders.prod_quantity, orders.user_id, orders.status_of_order]);
//         const result = await storeO.currentOrder(orders.user_id);
//         expect(result).toEqual({
//           id: '123',
//           product_id: orders.product_id,
//           prod_quantity: 4,
//           user_id: orders.user_id,
//           status_of_order: 'A'

//         });
//       });

//     // it('should have a completed method', () => {
//     //   expect(storeO.completed).toBeDefined();
//     // });

// });
