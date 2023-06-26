import "dotenv/config"
import express from "express"
// import models from "./models/init-models";
import models,{sequelize} from "./models/init-models"

import routes from "./routes/indexRoutes";

// import { Jwt } from "jsonwebtoken";
const PORT=process.env.PORT || 3001;

const app = express();

//coba jwt
// const jwt = require('jsonwebtoken');
// dotenv.config()


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((req,res,next) => {
    req.context={ models };
    next();
});

app.listen(PORT,() => {
    `server listening on port ${PORT}`
    console.log(`Success! your application is running on port ${PORT}`);
});

app.use('/eshopay',(req,res) => {
    res.send('Hello eshopayyy')
})

// kalau dubuat true di drop semua 
const dropDatabaseSync = false
sequelize.sync({force:dropDatabaseSync}).then(() => {
    //cek ada db ga
    if(!dropDatabaseSync){
        console.log("Database dont drop");
    }
})

app.use(routes)

// ubah buat jwt
// app.post("/user/generateToken", (req, res) => {
//     // Validate User Here
//     // Then generate JWT Token
  
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;
//     let data = {
//         time: Date(),
//         username: req.body.username,
//         password: req.body.password
//     }
  
//     const token = jwt.sign(data, jwtSecretKey);
  
//     res.send(token);
// });

// app.get("/user/validateToken", (req, res) => {
//     // Tokens are generally passed in the header of the request
//     // Due to security reasons.
  
//     let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
//     try {
//         const token = req.header(tokenHeaderKey);
//         const verified = jwt.verify(token, jwtSecretKey);
//         if(verified){
//             return res.send("Successfully Verified");
//         }else{
//             // Access Denied
//             return res.status(401).send(error);
//         }
//     } catch (error) {
//         // Access Denied
//         return res.status(401).send(error);
//     }
// });