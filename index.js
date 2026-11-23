const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();
const port = 4000;
//server
const app = express();
app.use(cors());





//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Routes Middleware
 const movieRoutes = require("./routes/movie");
 const userRoutes = require("./routes/user");


 app.use("/movies", movieRoutes);
 app.use("/users", userRoutes);

//MongoDB connection
mongoose.connect(process.env.MONGODB_STRING);

let db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection to the db failed"));
db.once("open", () => console.log("Now connected to MongoDB Atlas"))


if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}


module.exports = {app,mongoose};