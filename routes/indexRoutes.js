import { Router } from "express";
import login from "../auth/login";
import login2 from "../auth/login2";
import login3 from "../auth/login3";
import employeesController from "../controller/employeesController";
import regionsController from "../controller/regionsController";
import userController from "../controller/userController";

const router = new Router();

router.get('/regions',regionsController.findAllRegions)
router.get('/regions/v2',regionsController.findAllRegionsv2)
router.get('/regions/:id',regionsController.findRowByID)
router.post('/regions/create',regionsController.createRegions)
router.patch('/regions/update/:id',regionsController.updateRegions)
router.delete('/regions/delete/:id',regionsController.deleteRegions)
router.get('/regionsCountries',regionsController.regionsCountries)

router.get('/user',userController.findUser);
router.post('/signUp',userController.signUp);
router.get('/finduser',userController.findUserWhere);
router.get('/login2',login2)

router.post('/login3', login3.login3)

router.post('/login',login)


// belajar sendiri cek lagi
router.get('/employees',login3.checkToken,employeesController.findEmployees)
router.get('/employees/where',employeesController.findWhere)

export default router