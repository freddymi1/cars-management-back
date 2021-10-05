/**
 * All route for cars
 * post('/') for adding cars
 * post('/:id') for addind comment
 * get('/') for fetch all cars
 * get('/:id') for fetching one cars
 * put('/:id') for update cars
 * delete('/:id') for deleting cars
 */
const router = require("express").Router();
const {verifyCar, authJwt} = require("../middleware")

const CarsController = require("../controllers/cars.controller");
const { verifyToken } = require("../middleware/authJwt");

router.post('/', [verifyCar.checkIfcarsNumExist, authJwt.verifyToken], CarsController.AddCars)
router.get('/:id', [verifyCar.checkIfcarsNumExist, authJwt.verifyToken], CarsController.getOneCar)
router.get('/', CarsController.getAllCar);
router.put('/:id', [verifyCar.checkIfcarsNumExist, authJwt.verifyToken], CarsController.UpdateCar);
router.delete('/:id', [verifyCar.checkIfcarsNumExist, authJwt.verifyToken], CarsController.DeleteCar);

module.exports = router;