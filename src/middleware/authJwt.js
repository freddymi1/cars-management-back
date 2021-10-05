const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if(!token){
        return res.send({
            status: 300,
            message: "Error de token"
        })
    }
    jwt.verify(token. config.secret, (err, decoded)=>{
        if(err){
            return res.send({
                status: 401,
                message: "Authorisation refuser!"
            })
        }
        req.userId = decoded.id;
        next();
    });
}

isAdmin = (req, res, next)=> {
    User.findById(req.userId).exec((err, user) => {
        if(err) {
            res.send({
                status: 500,
                message: err
            })
            return;
        }
        Role.find(
            {
                _id: {$in: user.roles}
            },
            (err, roles)=> {
                if(err){
                    res.send({
                        status: 500,
                        message: err
                    })
                    return;
                }
                for(let i = 0; i<roles.length; i++){
                    if(roles[i].name === "admin"){
                        next();
                        return;
                    }
                }
                res.send({
                    status: 403,
                    message: "Admin est necessaire!"
                });
                return;
            }
        )
    })
}

isModerator = (req, res, next) => {
    User.findById(req.userId).exec((err, user)=> {
        if(err){
            res.send({
                status: 500,
                message: err
            })
            return;
        }

        Role.find(
            {
                _id: {$in: user.roles}
            },
            (err, roles)=> {
                if(err){
                    res.send({
                        status: 500,
                        message: err
                    })
                    return;
                }
                for(let i = 0; i<roles.length; i++){
                    if(roles[i].name === "moderator"){
                        next();
                        return;
                    }
                }
                res.send({
                    status: 403,
                    message: "Moderateur est necessaire!"
                });
                return;
            }
        )
    })
}


const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
}

module.exports = authJwt;