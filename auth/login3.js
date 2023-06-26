// // import userController from "../controller/userController"

import userController from '../controller/userController';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
// import models from '../models/init-models';
// const data = require('../controller/userController');

const login3 = (req,res) => {
    let data = req.body;

    userController.findOneUser(function(item){
        // console.log(item.username);
        if(item.username){
            if(bcrypt.compareSync(data.password, item.password)){
                // delete item[0].password;
                // res.send(`Berhasil login! \n selamat datang ${item.username}`);
                delete item.password;

                let token = jwt.sign(item, process.env.SECRET_KEY, {
                    expiresIn: '24h'
                })

                res
                    .status(200)
                    .json({
                        message: "You have logged in",
                        token: token
                    })
            }else{
                res.send('wrong password');
            }
        }else{
            res.send('user not found');
        }
    }, data.username);
}

const checkToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json(`You're not authorized`)
    }else{
        let token = req.headers.authorization;

        try{
            jwt.verify(token, process.env.SECRET_KEY)
            return next();
        }catch(err){
            return res.status(401).json("invalid token");
        }
    }
}

export default {
    checkToken,
    login3
}