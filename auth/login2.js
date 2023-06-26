// // import userController from "../controller/userController"

import userController from '../controller/userController';
import bcrypt from "bcrypt"
// import models from '../models/init-models';
// const data = require('../controller/userController');

const login2 = (req,res) => {
    let data = req.body;

    userController.findOneUser(function(item){
        // console.log(item.username);
        if(item){
            if(bcrypt.compareSync(data.password, item.password)){
                // delete item[0].password;
                res.send(`Berhasil login! \n selamat datang ${item.username}`);
                
            }else{
                res.send('wrong password');
            }
        }else{
            res.send('user not found');
        }
    }, data.username);
}

export default login2