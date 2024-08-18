import express, { Request, Response } from 'express';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// import cors from 'cors';
import products_routes from './handlers/productsHandler'
import users_routes from './handlers/usersHandlers'
import orders_routes from './handlers/ordersHandlers'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsOptions = {   // these are straightly from cors Docs
    origin: '', //white listed websites  (Foriegn domains)
    optionSuccessStatus: 200
}
// app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

// app.get('/test-cors', cors(corsOptions),function(req,res,next){
//     res.json({msg:'This is CORS-enabled with middle ware'}) 
// just testing cors as a middle ware
// })
products_routes(app);
users_routes(app);
orders_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
