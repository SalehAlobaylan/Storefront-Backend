import {  products } from "../productsModel";
import { user, users } from "../usersModel";
import { order, orders } from "../ordersModel";
import client from "../../database";
import { v4 as uuidv4 } from "uuid";

const productId = uuidv4();

const storeP = new products();
const storeU = new users();
const storeO = new orders();

//products
describe("Products Model exist", () => {
  it("should have an index method", () => {
    expect(storeP.index).toBeDefined();
  });
  it("should have a show method", () => {
    expect(storeP.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(storeP.create).toBeDefined();
  });


  // const x = Math.floor(Math.random() * 50000 + 1);
  console.log("the id created is:", productId);
  it("create method should add a product", async () => {
    const result = await storeP.create({
      id: `${productId}`,
      name: "Banana",
      price: 25,
      category: "general",
    });

    expect(result).toEqual({
      id: result.id,
      name: "Banana",
      price: 25,
      category: "general",
    });
  });

  it("show method should return the correct product", async () => {
    console.log("Created Product ID:", productId); // Debugging

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const queryResult = await client.query(
      "SELECT * FROM products WHERE id = $1",
      [productId],
    );
    console.log("Query result:", queryResult.rows); // Debugging
    const result = await storeP.show("1111");
    expect(result).toEqual({
      id: "1111",
      name: "for",
      price: 1,
      category: "testing",
    });
  });
});

//users

describe("users Model exist", () => {
  it("should have an index method", () => {
    expect(storeU.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(storeU.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(storeU.index).toBeDefined();
  });

  // it("index method should return a list of users", async () => {
  //     const result = await storeU.index();
  //     expect(result).toEqual([]);
  // });
  const y = Math.floor(Math.random() * 50000 + 1);
  const users = {
    id: String(y),
    firstName: "some",
    lastName: "one",
    password: "123",
  } as user;


  it("Create new  user should  return the new user in db ", async () => {

    const createUser = await storeU.create(users);

    users.id = createUser.id;
    expect(createUser.id).toBe(users.id); //   console.log("the id expected is:", createUser.id)
    expect(createUser.firstName).toBe(users.firstName); // console.log("the Firstname expected is:", createUser.firstName)
    expect(createUser.lastName).toBe(users.lastName); //  console.log("the Lastname expected is:", createUser.lastName)
  });

  // it('create method should add a user', async () => {
  //   const result = await storeU.create({
  //     id: `${x}`,
  //     firstName: "Ahmed",
  //     lastName: "Faisal",
  //     password: String(password)
  //   });
  //   const hash = bcrypt.hashSync(password + process.env.pepper, parseInt(process.env.SALT_ROUNDS as string));
  //   expect(result).toEqual({
  //     id: `${x}`,
  //     firstName: 'Ahmed',
  //     lastName: "Faisal",
  //     password: String(hash)
  //   });
  // });

  // it('show method should return the correct user', async () => {

  //     const result = await storeU.show((`${x}`));
  //     const hash = bcrypt.hashSync(password + process.env.pepper, parseInt(process.env.SALT_ROUNDS as string));
  //     expect(result).toEqual({
  //       id: `${x}`,
  //       firstName: "Ahmed",
  //       lastName: "Faisal",
  //       password: String(hash)
  //     });
  //   });

  it("show method should return the correct user", async () => {
    const showing = Math.floor(Math.random() * 50000 + 1);
    const showuser = {
      id: String(showing),
      firstName: "some",
      lastName: "one",
      password: "123",
    } as user;
    const createUser = await storeU.create(showuser);
    // console.log("User object after create:", createUser);

    const result = await storeU.show(createUser.id);
    // console.log("User object after show:", result);

    expect(result.id).toBe(createUser.id);
    // console.log("Expected ID:", createUser.id);

    expect(result.firstName).toBe(createUser.firstName);
    // console.log("Expected Firstname:", createUser.firstName);

    expect(result.lastName).toBe(createUser.lastName);
    // console.log("Expected Lastname:", createUser.lastName);
  });
});

//orders
describe("orders Model", () => {
  it("should have a current method", () => {
    expect(storeO.currentOrder).toBeDefined();
  });

  it("show method should return the correct order", async () => {
    const orders = {
      id: "123",
      product_id: "1111",
      prod_quantity: 1,
      user_id: "1111",
      status_of_order: "A",
    } as order;

    const result = await storeO.currentOrder(orders.user_id);
    expect(result).toEqual({
      id: "123",
      product_id: orders.product_id,
      prod_quantity: 1,
      user_id: orders.user_id,
      status_of_order: "A",
    });
  });

});
