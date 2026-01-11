const mongoose=require("mongoose");

const admin=mongoose.Schema({
  email:{
    type:String,
    require:true,
    unique:true,
  },
   password:{
    type:String,
    required:true,
  },
   username:{
    type:String,
    required:true,
  },
  videoes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"adminVideo"
  }]
  
})
module.exports=mongoose.model("admin",admin);