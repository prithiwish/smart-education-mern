module.exports=(req,res)=>{
res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: false 
  });
  return res.json({ success: true, message: "Logged out successfully" });
}