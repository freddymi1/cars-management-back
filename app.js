const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const dbConfig = require("./config/db.config")
let http = require("http").Server(app);
let io = require("socket.io")(http);

const db = require("./src/models");
// app.set('view engine', 'ejs');

const Role = db.role;
const Comments = db.comment;


/**
 * Connexion a la base de donnee
 */

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connexion avec la base de donnee etablit");
    initial();
}).catch(err=>{
    console.log("Erreur de connexion");
    process.exit();
})

function initial(){
    Role.estimatedDocumentCount((err, count) => {
        if(!err && count === 0){
            new Role({
                name: "user"
            }).save(err => {
                if(err){
                    console.log("error", err)
                }
                console.log("User ajouter dans le role")
            });
            new Role({
                name: "moderator"
            }).save(err => {
                if(err){
                    console.log("Error", err)
                }
                console.log("moderator bien ajouter dans le role")
            });

            new Role({
                name: "admin"
            }).save(err => {
                if(err){
                    console.log("error", err)
                }
                console.log("Admin ajouter dans le role")
            });
        }
    })
}

io.on('connection',function(socket){
    socket.on('comment',function(data){
        var commentData = new Comments(data);
        commentData.save();
        socket.broadcast.emit('comment',data);  
    });
 
});

const option = {
    origin: "http://localhost:3000",
}

app.use(cors(option));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRoute = require("./src/routes/auth.route")
const userRoute = require("./src/routes/user.route")
const carsRoute = require("./src/routes/cars.route")
const commentRoute = require('./src/routes/comment.route')

app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
      "Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE"
    );
    next();
});



const PORT = process.env.PORT || 5050

app.use("/api/auth/", authRoute)
app.use("/api/users/", userRoute)
app.use("/api/cars/", carsRoute)
app.use('/api/comments/', commentRoute);


app.get("/", (req, res)=>{
    res.send("Hello world");
})

app.listen(PORT, ()=>{
    console.log("Serveur lancer sur le port: ", PORT)
})

