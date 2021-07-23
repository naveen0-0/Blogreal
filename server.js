const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose')
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');


// import Routes
const authenRoutes = require('./routes/authen');
const apiRoutes = require('./routes/api');


// MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(helmet())
app.use(morgan('tiny'))
app.use(cookieParser())
dotenv.config();


app.use(authenRoutes);
app.use(apiRoutes);


//#  MongoDB Connection
mongoose.connect(
   process.env.MONGO || "mongodb://localhost/blogSite", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
})
.then(() => { console.log("Successfull Mongodb Connection") })
.catch(() => console.log("Mongo Error"))


if (process.env.NODE_ENV === 'production') {
   app.use(express.static('client/build'));
   app.get('*', (req, res) => {
         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}
//# Listening Port
app.listen(process.env.PORT || 5000, () => {
   console.log("Server running on Port 5000");
})
