const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkNameOrEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user)=>{
        if(err){
            res.send({status: 500, message: err});
            return;
        }
        if(user){
            res.send({status: 400, message: "Erreur, cette user est deja existe"});
            return;
        }

        User.findOne({
            email: req.body.email
        }).exec((err, user)=>{
            if(err){
                res.send({status: 500, message: err});
                return;
            }
            if(user){
                res.send({status: 400, message: "Erreur, cette email est deja existe"});
                return;
            }
    
            next();
        })
    })
}

checkRoleExiste = (req, res, next) => {
    if(req.body.roles){
        for(let i = 0;i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.send({
                    status: 400,
                    message: `Error! Le role ${req.body.roles[i]} existe deja`
                })
                return;
            }
        }
    }
    
    next();
};

const verifySignUp = {
    checkNameOrEmail,
    checkRoleExiste
}
module.exports = verifySignUp;