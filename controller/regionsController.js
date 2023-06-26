import { sequelize } from "../models/init-models";

// ini versi sql
const findAllRegions = async (req,res) => {
    const result = await sequelize.query('SELECT * FROM regions', {
        type:sequelize.QueryTypes.SELECT,
        model:req.context.models.regions,
        mapToModel:true
    }
    )
    return res.send(result);
}

// ini pake fungsi bawaan
const findAllRegionsv2 = async (req,res) => {
    const result = await req.context.models.regions.findAll();
    return res.send(result);
}

// const findEmployees = async (req,res) => {
//     const result = await req.context.models.employees.findAll();
//     return res.send(result);
// }
// console.log(findAllRegions);

// ambil data sesuai id
const findRowByID = async (req,res) => {
    const result = await req.context.models.regions.findByPk(req.params.id);
    return res.send(result);
}


const createRegions = async (req,res) => {
    const result = await req.context.models.regions.create({
        // region_id:req.body.region_id,
        region_name:req.body.region_name
    })
    return res.send(result);
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

const updateRegions = async (req,res) => {
    await req.context.models.regions.update({
        region_name:req.body.region_name
    },{
        returning:true,
        where:{region_id:req.params.id}
    })  .then ( result => {
        return res.send("OK berhasil "+result);
    })
        .catch (err=>{
            return res.send("tidak berhasil \n"+err);
        });

    // return res.send(result);
}

const deleteRegions = async (req,res) => {
    const id = req.params.id;

    await req.context.models.regions.destroy({
        where:{region_id:id}
    });
    res.send("deleted");
}

//join region dan countries
const regionsCountries = async (req,res) => {
    const result = await req.context.models.regions.findAll({
        include : [{
            model : req.context.models.countries,
            as: "countries"
        }] 
    });
    return res.send(result);
}

export default{
    findAllRegions,
    findAllRegionsv2,
    findRowByID,
    createRegions,
    updateRegions,
    deleteRegions,
    regionsCountries
    // findEmployees
}