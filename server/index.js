import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from './routes/kpi.js'
import KPI from './models/KPI.js';
import { kpis } from './data/data.js';
//CONFIGURATION
dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());


//ROUTES
app.use("/kpi",kpiRoutes)

//MONGOOSE SETUP

const PORT=5000;
mongoose.connect("mongodb+srv://pranjalsrivastavwork:pranjal123@finsight.fdnywnq.mongodb.net/?retryWrites=true&w=majority&appName=FinSight",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(async()=>{
    app.listen(PORT,()=>{
        console.log(`listening at ${PORT}`)
    })
    //ADD DATA ONE TIME ONLY
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
}).catch((error)=>console.log(`${error} encountered`))