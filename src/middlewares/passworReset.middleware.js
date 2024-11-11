const verifyPassword = (req,res,next)=>{
    const {newPassword, confirm_password} = req.body;
    if(newPassword !== confirm_password){
        res.status(400).send("passwords do not match")
        return
    }
    next();

}

module.exports = {verifyPassword};