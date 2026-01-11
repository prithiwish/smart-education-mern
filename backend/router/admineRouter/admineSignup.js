const express=require("express");
const router=express.Router();
const signupHandler=require("../../controller/AdmineHandler/AdminSignup");
const signUpValidation=require("../../middleware/signUpValidation")
router.post("/admin/signup",signUpValidation,signupHandler);

module.exports=router;