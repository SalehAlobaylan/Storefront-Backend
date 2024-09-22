// import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
// import { users } from '../usersModel';
// // import { products } from '../productsModel';
// // import { orders } from '../ordersModel';
// // import { order_products } from '../order_productsModel';
// import * as userHandler from '../../handlers/usersHandlers';
// // import * as productHandler from '../../handlers/productsHandler';
// // import * as orderHandler from '../../handlers/ordersHandlers';
// // import * as orderProductsHandler from '../../handlers/order_productsHandler';




// // users
// // const storeU = new users();

// // Mock data
// const mockUser = { id: '1', firstName: 'John', lastName: 'Doe', password: 'password123' };


// describe('User Handler', () => {
//   let req: Partial<Request>;
//   let res: Partial<Response>;
//   let usersStore: jasmine.SpyObj<users>;
//   let jsonSpy: jasmine.Spy;

//   beforeEach(() => {
//     req = {};
//     jsonSpy = jasmine.createSpy('json');
//     res = {
//       json: jsonSpy,
//       status: jasmine.createSpy('status').and.returnValue({ json: jsonSpy }),
//     };
//     usersStore = jasmine.createSpyObj('users', ['show', 'create', 'Authenticator']);
//   });

//   describe('show', () => {
//     it('should return 401 if no token is provided', async () => {
//       req.params = { user_id: '1' };
//       req.header = jasmine.createSpy('header').and.returnValue(undefined);

//       await userHandler.show(req as Request, res as Response);

//       expect(res.status).toHaveBeenCalledWith(401);
//       expect(jsonSpy).toHaveBeenCalledWith({ message: 'No token provided' });
//     });

//     it('should return user data if token is valid', async () => {
//     //   const mockUser = { id: '1', name: 'John Doe' };
//       req.params = { user_id: '1' };
//       req.header = jasmine.createSpy('header').and.returnValue('Bearer validtoken');
//       usersStore.show.and.resolveTo(mockUser);

//       spyOn(jwt, 'verify').and.returnValue({ id: '1' });

//       await userHandler.show(req as Request, res as Response);

//       expect(usersStore.show).toHaveBeenCalledWith('1');
//       expect(jsonSpy).toHaveBeenCalledWith({ user: mockUser });
//     });
//   });

//   describe('create', () => {
//     it('should create a new user and return success message', async () => {
//       const newUser = { id: '1', firstName: 'John', lastName: 'Doe', password: 'password' };
//       req.body = newUser;
//       usersStore.create.and.resolveTo(newUser);

//       await userHandler.create(req as Request, res as Response);

//       expect(usersStore.create).toHaveBeenCalledWith(newUser);
//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(jsonSpy).toHaveBeenCalledWith({
//         data: { newUser },
//         message: 'A new user has been created successfully',
//       });
//     });

//     it('should return 500 if there is an error creating user', async () => {
//       req.body = { id: '1', firstName: 'John', lastName: 'Doe', password: 'password' };
//       usersStore.create.and.rejectWith(new Error('Database error'));

//       await userHandler.create(req as Request, res as Response);

//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(jsonSpy).toHaveBeenCalledWith({ error: 'Error creating user' });
//     });
//   });

//   describe('auth', () => {
//     it('should return 401 for invalid credentials', async () => {
//       req.body = { id: '1', password: 'wrongpassword' };
//       usersStore.Authenticator.and.resolveTo(null);

//       await userHandler.auth(req as Request, res as Response);

//       expect(res.status).toHaveBeenCalledWith(401);
//       expect(jsonSpy).toHaveBeenCalledWith({ message: 'Invalid credentials' });
//     });

//     // it('should return user and token for valid credentials', async () => {
//     //   const user = { id: '1', name: 'John Doe' };
//     //   req.body = { id: '1', password: 'correctpassword' };
//     //   usersStore.Authenticator.and.resolveTo(user);

//     //   spyOn(jwt, 'sign').and.returnValue('validtoken');

//     //   await auth(req as Request, res as Response);

//     //   expect(jsonSpy).toHaveBeenCalledWith({ user, token: 'validtoken' });
//     // });
//   });
// });

// // // Products

// // // const storeP = new products();

// // describe('Products Handler', () => {
// //     let req: Partial<Request>;
// //     let res: Partial<Response>;
  
// //     beforeEach(() => {
// //       req = {};
// //       res = {
// //         json: jasmine.createSpy('json')
// //       };
// //     });
  
// //     it('should return product by id in show handler', async () => {
// //       req.params = { id: '1' };
// //       await productHandler.show(req as Request, res as Response);
// //       expect(res.json).toHaveBeenCalled();
// //     });
  
// //     it('should create a product in create handler', async () => {
// //       req.body = { id: '1', name: 'Product A', price: 100, category: 'Category 1' };
// //       await productHandler.create(req as Request, res as Response);
// //       expect(res.json).toHaveBeenCalled();
// //     });
// //   });

// // // orders

// // // const storeO = new orders();

// // describe('Orders Handler', () => {
// //     let req: Partial<Request>;
// //     let res: Partial<Response>;
  
// //     beforeEach(() => {
// //       req = {};
// //       res = {
// //         json: jasmine.createSpy('json')
// //       };
// //     });
  
// //     it('should return current order by id in current handler', async () => {
// //       req.params = { id: '1' };
// //       await orderHandler.current(req as Request, res as Response);
// //       expect(res.json).toHaveBeenCalled();
// //     });
// //   });

// // // Order Products


// // // const storeOP = new order_products();

// // describe('Order Products Handler', () => {
// //     let req: Partial<Request>;
// //     let res: Partial<Response>;
  
// //     beforeEach(() => {
// //       req = {};
// //       res = {
// //         json: jasmine.createSpy('json')
// //       };
// //     });
  
// //     it('should return all orders for a user in getOrders handler', async () => {
// //       req.params = { user_id: '1' };
// //       await orderProductsHandler.getOrders(req as Request, res as Response);
// //       expect(res.json).toHaveBeenCalled();
// //     });
// //   });














// /////////////////////////////////////////////////////////////



import supertest from 'supertest'
import { app } from '../../server'
import { product, products } from '../productsModel'
// import { user, users} from '../usersModel'
// import db from '../../database'
// import products from '../../models/products.model'

const request = supertest(app)

const storeP = new products();
// const storeO = new users();
let token: string;
 token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFjYU9NY2x0dEpZT1lxd1JUVlZXRVlab2Y4ejIiLCJ1c2VybmFtZSI6IlNhbGUiLCJlbWFpbCI6ImV4YW1wbGVzZWVlc0BnbWFpbC5jb20iLCJpYXQiOjE3MjUxMjkzNTEsImV4cCI6MTczMjkwNTM1MX0.muUxKYelAB1nMPhifac2anvW4QTNI7TYqaBPh6-y_AU'; // You need to provide or generate a valid token


    const product = {
      id: "11111",
      name: "for",
      price: 1,
      category: "tezsting"
    } as product
  
    // const user = {
    //   id: "1111",
    //   firstName: "for",
    //   lastName: "testing",
    //   password: "only"
    // } as user
  
    beforeAll(async () => {
      // const createUser = await storeO.create(user)
      // user.id = createUser.id
      const creatProduct = await storeP.create(product)
      product.id = creatProduct.id
      // describe('Lists Products END POINTS', () => {
        it('should get list of products', async () => {
          const res = await request
            .get('/products/')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-type', 'application/json')
          expect(res.status).toBe(200)
          expect(Object.keys(res.body).length).toBeGreaterThan(0);
        })
      // })

      
    })

    describe('Lists Products END POINTS', () => {

    it('should get one of the products', async () => {
      const res = await request
        .get(`/products/${product.id}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/json');
      const { name, price } = res.body;
      expect(name).toBe('for');
      expect(price).toBe(1);
  });
  })
