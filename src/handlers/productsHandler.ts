import express ,{Request, Response} from 'express'; 
import { product, products } from '../models/productsModel';
import { verifyToken } from '../middleware/JWT';

const store = new products();

const index = async (_req:Request ,res: Response) => { // _req means that not gonna be read
    const prod = await store.index();
    res.json(prod);
}

const show = async (_req:Request,res:Response) => {
    const prodID = await store.show();
    res.json(prodID);
}

// const create
const create = async (req: Request,res: Response) => {

    const prods = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    }
    const creating = await store.create(prods);
    res.json(creating)
}
// const top5
// const category

const products_routes =  (app: express.Application) => {
    app.get('/products', index);
//     - Show : 'product/:id' [GET]
    app.get('/products/:id', show);
//     - Create [token required]: 'products/authenticateToken' [POST]
    app.post('/products', verifyToken, create);
//<!-- - [OPTIONAL] Top 5 most popular products  -->
//<!-- - [OPTIONAL] Products by category (args: product category) -->
}
export default products_routes