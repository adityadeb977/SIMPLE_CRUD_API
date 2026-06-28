require('dotenv').config();
const express=require('express');
const cors=require('cors');
const connectDB = require('./config/db.js')
const app=express();
const studentRoute=require('./routes/studentRoute.js')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET','POST','PUT','DELETE'],
    credentials:true
}))
app.use('/',studentRoute);

connectDB();

app.get('/',(req,res)=>{
    res.send('Server is Running');
})

try {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
} catch (error) {
    console.error(error);
}