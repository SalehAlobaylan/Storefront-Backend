import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


// export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//     // Get the token from the request header
//     const token = req.header('Authorization')?.split(' ')[1]; // Assuming the format: "Bearer <token>"
    

//     console.log(token)
//     // If no token is provided, return an error
//     if (!token) {
//         return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
//     }

//     try {
//         // Verify the token
//         const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) ;


//         // Attach the decoded token payload to the request object
//         req.body.user = decoded ;
//         console.log(token)
//         console.log(req.body.user)


//         // Pass control to the next middleware function
//         next();
//     } catch (err) {
//         // If token verification fails, return an error
//         return res.status(400).json({ message: 'Invalid Token' });
//     }
// };

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {


    try {
        console.log("Authorization Header:", req.headers.authorization);

        const authorizationHeader = req.headers.authorization
            if (!authorizationHeader) {
            // If the header is missing, return an error
            return res.status(401).json({ message: 'Access denied, no token provided' });
        }
        console.log("header exist")
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)
        console.log("verify done")

        req.body.userID = decoded;
        console.log("decoded done")
        console.log(token);
        next();


    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }



    // const token = req.header('Authorization')?.split(' ')[1]; 
  
    // if (!token) {
    //   console.log(token)
    //     return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
    // }
  
    // try {
    //     const decoded = jwt.verify(req.body.token, process.env.TOKEN_SECRET as string);
    //     // req.body.user = decoded;
    //     console.log(token);
    //     console.log(req.body.token);

    //     next();
    // } catch (err) {
    //     console.error("JWT Verification Error:", err);
  
    //     return res.status(400).json({ message: 'Invalid Token' });
    // }
  };
  
  