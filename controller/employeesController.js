import models, { sequelize } from "../models/init-models";

const findWhere = async (req,res) => {
    const result = await sequelize.query('SELECT * FROM employees WHERE employee_id = 100', {
        type:sequelize.QueryTypes.SELECT,
        model:models.employees,
        mapToModel:true
    })
    return res.send(result);
}

const findEmployees = async (req,res) => {
    const result = await models.employees.findAll();
    return res.send(result);
}


export default{
    findEmployees,
    findWhere,
}