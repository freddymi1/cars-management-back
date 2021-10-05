const db = require("../models");
const CarModel = db.cars;

checkIfcarsNumExist = (req, res, next) => {
    CarModel.findOne({
        matricule: req.body.matricule
    }).exec((err, cars)=>{
        if(err){
            res.send({status: 500, message: err});
            return;
        }
        if(cars){
            res.send({status: 400, message: "Erreur, cette voiture est deja existe"});
            return;
        }
        next();
    })

}



const verifyCars = {
    checkIfcarsNumExist,
}
module.exports = verifyCars;