import supertest from 'supertest'
import { app } from '../../server'
import { product, products } from '../productsModel'
import { user, users} from '../usersModel'
import { order, orders } from '../ordersModel'
import { order_product, order_products } from '../order_productsModel'
import { v4 as uuidv4 } from "uuid";

const UUID = uuidv4();

const request = supertest(app)

const storeP = new products();
const storeU = new users();
const storeO = new orders();
const storeOP = new order_products();


const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE3MjcxMjE5NDl9.OzC6hrSL7NBjIqzYr2SoDpsK0xTGMOUzraMX5dDDfEQ';

  const product = {
    id: `${UUID}`,
    name: "for",
    price: 1,
    category: "testing"
  } as product

  const user = {
    id: `${UUID}`,
    firstName: "for",
    lastName: "testing",
    password: "only"
  } as user
  const order = {
    id: '1111',
    product_id: '1111',
    prod_quantity: 1,
    user_id: '1111',
    status_of_order: 'A'
  } as order

  const order_product = {
    product_id: '1111',
    user_id: '1111'
  } as order_product
  
    beforeAll(async () => {
      const createUser = await storeU.create(user)
      user.id = createUser.id ; console.log(user.id)
      const createProduct = await storeP.create(product)
      product.id = createProduct.id ; console.log(product.id)
      const createOrder = await storeO.currentOrder(order.user_id)
      order.id = createOrder.id ; console.log(order.user_id)
      const createOrderProducts = await storeOP.getAllorders(order_product.user_id)
      order_product.user_id = createOrderProducts.user_id ; console.log(order_product.user_id)
    })
    describe('Lists Products endpoints', () => {
      it('should get list of products', async () => {
        const res = await request
          .get('/products/')
          .set('Authorization', `Bearer ${token}`)
          .set('Content-type', 'application/json')
        expect(res.status).toBe(200)
        expect(Object.keys(res.body).length).toBeGreaterThan(0);
      })
  //   it('should get one of the products', async () => {
  //     const res = await request
  //       .get(`/products/${product.id}`)
  //       .set('Authorization', `Bearer ${token}`)
  //       .set('Content-type', 'application/json');
  //     const { name, price } = res.body;
  //     expect(name).toBe('for');
  //     expect(price).toBe(1);
  // });
  })

  describe('Lists users endpoints', () => {
    it('should get list of users', async () => {
      const res = await request
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/json')
      expect(res.status).toBe(200)
      expect(Object.keys(res.body).length).toBeGreaterThan(0);
    })
//   it('should get one of the products', async () => {
//     const res = await request
//       .get(`/products/${product.id}`)
//       .set('Authorization', `Bearer ${token}`)
//       .set('Content-type', 'application/json');
//     const { name, price } = res.body;
//     expect(name).toBe('for');
//     expect(price).toBe(1);
// });
})      

describe('order endpoint', () => {
  it('should get spicefic order', async () => {
    const res = await request
      .get(`/orders/${order.user_id}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-type', 'application/json')
    expect(res.status).toBe(200)
    expect(Object.keys(res.body).length).toBeGreaterThan(0);
  })
})

describe('orderProduct endpoint', () => {
  it('should get all order for a user', async () => {
    const res = await request
      .get(`/orders/products/${order_product.user_id}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-type', 'application/json')
    expect(res.status).toBe(200)
    expect(Object.keys(res.body).length).toBeGreaterThan(0);
  })
})