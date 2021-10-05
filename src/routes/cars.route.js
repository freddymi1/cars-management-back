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
const {verifyCar} = require("../middleware")

const CarsController = require("../controllers/cars.controller")

router.post('/', [verifyCar.checkIfcarsNumExist], CarsController.AddCars)
router.get('/:id', CarsController.getOneCar)
router.get('/', CarsController.getAllCar);
router.put('/:id', CarsController.UpdateCar);
router.delete('/:id', CarsController.DeleteCar);

module.exports = router;