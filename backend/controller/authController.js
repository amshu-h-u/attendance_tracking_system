// const User=require("../models/User.js")
// const jwt=require("jsonwebtoken")

// exports.signUp=async(req,res)=>{
//     try{
//          const {name,email,password,role}=req.body
//          const existingUser=await User.findOne({email});
//          if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const user = await User.create({ name, email, password, role });

//     res.status(201).json(user);
//   }
//     catch(e){
    
//     res.status(500).json({ message: e.message });
//     }
// }

// exports.logIn=async(req,res)=>{
//     try{
//     const {email,password}=req.body
//     const user=await User.findOne({email})
//     if(!user){
//         return res.status(404).json({ message: "User not found" });
//     }
//     if(user.password!==password){
//         return res.status(400).json({message:"Invalid credentials"})
//     }
//     const token=jwt.sign(
//         {id:user._id,role:user.role},process.env.JWT_SECRET
//     )

// console.log("TOKEN:", token);
//     res.json({token,user})
//     }catch(e){
//       res.status(500).json({message:e.message})
//     }
// }