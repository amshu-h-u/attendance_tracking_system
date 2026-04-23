const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const authRoutes=require("./routes/authRoute.js")
const batchRoute=require("./routes/batchRoutes.js")
const attendanceRoute=require("./routes/AttendanceRoute.js")
const cors=require("cors")
dotenv.config()
const app=express()
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.get("/",(req,res)=>{
    res.send("API Running")
})


const start=async(req,res)=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("Connected to DB"))
    .catch(err=>console.log(err))
}

app.use("/api/auth",authRoutes)
app.use("/api/batches",batchRoute);
app.use("/api",attendanceRoute)
app.listen(5000,()=>{
    console.log("Server Running")
    start()
})