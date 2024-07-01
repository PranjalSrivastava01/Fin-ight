import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from './routes/transaction.js'
import kpiRoutes from './routes/kpi.js'
import productRoutes from './routes/product.js'
import Product from './models/Product.js'
import KPI from './models/KPI.js';
import  Transaction  from './models/Transaction.js';
import { kpis, products , transactions } from './data/data.js';
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
app.use('/product',productRoutes);
app.use("/transaction",transactionRoutes)
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
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);
}).catch((error)=>console.log(`${error} encountered`))