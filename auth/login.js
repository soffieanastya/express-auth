import models,{ sequelize } from "../models/init-models";
// import models,{ sequelize } from "../../models/init-models";
import bcrypt from "bcrypt"

const login = async (req,res) => {
    let uname = req.body.username;
    let cekUname = await models.person.findOne({ 
        where : { 
            username:uname
        }
    });

    // kalau uname ada
    if(cekUname){
        // cek password dgn cara mengcomparenya 
        
        let pass = await bcrypt.compareSync(req.body.password, cekUname.password) ; 
        
        if(!pass){
            return res.send("password salah");
        }else{
            return res.send(`Login success! Hi, ${cekUname.username}`);
        }
        // return res.send(req.body.password);
    }else{
        return res.send("Username not found");
    }
    // let cekPass = await models.person.findOne({ where : { password:pass}});
    // hasil
    //     .then (result => {
    //         return res.send(`Hi, ${req.body.username} ${result}` )
    //     })
    //     .catch ( error => {
    //         return res.send(`failed ${error}`)
    //     })
}

export default login