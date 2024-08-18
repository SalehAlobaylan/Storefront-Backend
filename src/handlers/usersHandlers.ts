import express, {Request, Response} from 'express';
import { user, users } from '../models/usersModel';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/JWT';


const store = new users();

const index = async (req: Request, res: Response) => {
    const theuser = await store.index();
    // var token = jwt.sign( {id: _req.body}, process.env.TOKEN_SECRET as string,{expiresIn: '90d'})

    res.json(theuser);
}
const show = async (req:Request,res:Response) => {
    const user = await store.show();
    res.json(user);
}

// const create
const create = async (req: Request,res: Response) => {

    // console.log(userId+ "no")
    const user_id = {id: req.body.id}
    const userCreds = { 
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    } 
    // console.log(userId+ "no")

    console.log(userCreds.id+" x")
    // req.body = userCreds.id
    const userId = req.body;
    // const userId = req.params.userId;


    console.log(req.body, "not object")
    console.log(userId+ "noo")

    console.log(userId," take req id only?")
    console.log(user_id," take id only")



    const newUser = await store.create(userCreds);
// const token = jwt.sign({ userID: newUser.id }, process.env.TOKEN_SECRET as string, { expiresIn: '90d' });

    // const newUser = await store.create(userCreds);
    const token = jwt.sign({ userId}, process.env.TOKEN_SECRET as string, { expiresIn: '90d' });
    // const token = jwt.sign( { id:userCredential.user.uid, username, email:validEmail }, process.env.TOKENSECRET,{expiresIn: '90d'});

    console.log(process.env.TOKEN_SECRET," sec token")

    // var token = jwt.sign(userCreds, process.env.TOKEN_SECRET as string)
    console.log("Authorization Header:", req.headers.authorization);
    console.log("Authorization Header:", req.header('Authorization'));


        const authorizationHeader = req.headers.authorization
            if (!authorizationHeader) {
            // If the header is missing, return an error
            return res.status(401).json({ message: 'The token didnt assinged on the header' });
        }
        console.log(userCreds.id)
    console.log(newUser,token)


    // try {
    //     const decoded = jwt.verify(req.body.token, process.env.TOKEN_SECRET as string);
    //     // req.body.user = decoded;
    //     console.log(req.body.token);
    // } catch (err) {
    //     console.error("JWT Verification Error:", err);
  
    //     return res.status(400).json({ message: 'Invalid Token' });
    // }

   
    res.status(200).send(
        {
            userCreds,
            token
      }
    );
    // res.json(newUser)    // these used before using tokens

   
}

// const create = async (req: Request, res: Response) => {
//     const userCreds = {
//         id: req.body.id,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         password: req.body.password
//     };
//     const token = req.body.token
//     if (!token) {
//         return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
//     }

//     try {
//         // Verify the token
//         const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

//         // Optionally, you can add any logic here to handle the decoded token
//         req.body.user = decoded; // Assuming you want to attach the decoded token to req.user
//     } catch (err) {
//         return res.status(400).json({ message: 'Invalid Token' });
//     }

//     try {
//         const newUser = await store.create(userCreds);
//         const newToken = jwt.sign({ userCreds: newUser }, process.env.TOKEN_SECRET as string, { expiresIn: '90d' });

//         // Send the token in the response
//         res.json(token);
//     } catch (err) {
//         console.error("Error creating user:", err);
//         return res.status(400).json({ message: 'Error creating user' });
//     }
// };

// const authntication
const auth = async (req: Request,res: Response) => {

    const authCreds = { 
        id: req.body.id,
        password: req.body.password
    }
    const authen = await store.Authenticator(authCreds.id,authCreds.password);
    res.json(authen)
}

const users_routes = (app: express.Application) => {
// - Index [token required]: 'Users/authenticateToken' [GET]
    app.get('/users', verifyToken, index);
// - Show [token required]  '/Users/:id' [GET]
    app.get('/users/:id', verifyToken, show);
// - Create N[token required]: '/Users' [POST]
    app.post('/users', create);
    app.post('/auth', auth);
}
export default users_routes;