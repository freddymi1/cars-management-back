/**
 * Controller for cars
 * PostComment : for posting comment on cars details
 * getAllComment: for fetching all comment
 * AddCars: for adding cars
 * getAllCars: for fetching all cars
 * getOneCar: for fetching one car
 * Updatecar: for updating cars
 * Deletecar: for deleting a cars
 */

 const db = require('../models');

 const CarModel = db.cars;
 const CommentModel = db.comment;
 const UserModel = db.user;
 
 
 
 exports.PostComment = async (req, res) =>{
     try{
         const comment = new CommentModel({
             comment: req.body.comment,
             user: req.body.user,
             cars: req.body.cars,
         })
         const coms = await comment.save();
         res.status(200).json(coms)
     }catch(err){
         res.send({status: 500, message: "Error de creation"})
     }
 }
 
 exports.getAllComment = async (req, res) => {
     const cars = req.query.cars;
     try{
       let comments;
       if(cars){
         comments = await CommentModel.find({
             cars:{
               $in: [cars]
             }
           })
       }else{
         comments = await CommentModel.find();
       }
       res.status(200).json(comments);
     }catch(err){
         res.send({status: 500, message: "Pas de commentaire"})
     }
   }
 
 exports.DeleteComment = async (req, res) => {
     try{
         try{
             await CommentModel.findByIdAndDelete(req.params.id)
             res.status(200).json("Voiture bien supprimer");
         }catch(err){
             res.send({status: 500, message: "err"})
         }
     }catch(err){
         res.send({status: 400, message: "Cette voiture n'existe pas"});
     }
     
 }