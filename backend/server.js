const express = require('express'); 
const errorHandler = require('./middleware/errorHandler');
const dbConnect = require('./config/dbConnection');

require('dotenv').config();


const app = express();
const api = process.env.API;


app.use(express.json());

app.use(`${api}`, require("./routes/contactRoutes"));
app.use('/api/users', require("./routes/userRoutes"));
app.use(errorHandler);

// database connection
dbConnect();

const port = process.env.PORT;
app.listen(port, ()=> {
    console.log(`Server is running port ${port}`);
})