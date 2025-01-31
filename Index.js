const express = require('express');
const { connectDb } = require('./DAL/Connection');
const authRoute = require('./Routes/UserRoutes');
const adminRoute = require('./Routes/AdminRoutes');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = 5000;

app.get('/', (req, res ) => {
    res.send("Health check!")
});

connectDb();


app.use(express.json());

app.use('/api/User', authRoute);
app.use('/api/admin', adminRoute);

app.listen(port , () => {
    console.log(`listening to port ${process.env.SERVERPORT}`)
});