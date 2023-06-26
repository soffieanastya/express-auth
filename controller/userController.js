// untuk 
// post ngirim Data dengan return dari browser masukin data
// get mengambil data tapi ga ngirim data 


import models,{ sequelize } from "../models/init-models";
import bcrypt from "bcrypt"

// ini pake fungsi bawaan
const findUser = async (req,res) => {
    const result = await req.context.models.person.findAll();
    return res.send(result);
}

const findUserWhere = async (req,res) => {
    let uname = req.body.username;
    const result = await models.person.findOne({
        where : {
            username:uname
        }
    });
    let hasil = {
        un: result.username,
        p: result.password
    }
    return hasil;
    // console.log(result.username);
    // return res.send(result);
}

const signUp = async (req,res) => {
    // await req.context.models.regions.create({
        // region_id:req.body.region_id,
        // method bcrypt, kombinasi
        const salt=bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);
        await models.person.create({
            username:req.body.username,
            password:hash
        }).then( result => {
            return res.send('OK! create user done ' + result);
        }).catch(error => {
            return res.send("tidak berhasil create user " + error);
        })
        
    // })
    // return res.send(result);
}

// // tanpa error handling
// const updateRegions = async (req,res) => {
//     const result = await req.context.models.regions.update({
//         region_name:req.body.region_name
//     },{
//         returning:true,
//         where:{region_id:req.params.id}
//     });

//     return res.send(result);
// }

async function findOneUser(callback, username){
    let data = await models.person.findOne({
        where : {
            username:username
        }
    })
    callback(data.dataValues,username);
    // return data;
}
export default{
    findUser,
    findUserWhere,
    signUp,
    findOneUser
}

// module.exports = findUserWhere;