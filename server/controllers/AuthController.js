const {getPrismaInstance} = require("../utils/PrismaClient")

const checkUser = async(req,res,next) =>{
    try {
        const {email} = req.body;
        if(!email){
            return res.json({msg:"Email is required", status: false});
        }
        const prisma = getPrismaInstance();
        const user = await prisma.user.findUnique({where: {email}});
        if(!user){
            return res.json({msg:"User Not Found", status: false});
        }
        else{
            return res.json({msg:"User Found", status: true, data: user});
        }
    } catch (error) {
        next(error)
    }
}

const onboardUser = async(req,res,next) =>{
    try {
        const {email, name, about, image:profilePicture} = req.body;
        if( !email || !name || !profilePicture) {
            return res.send('Email, Name & ProfilePicture are required')
        }
        const prisma = getPrismaInstance();
        const user = await prisma.user.create({
            data: {email, name, about, profilePicture}
        })
        return res.json({
            msg: "success",
            status: true,
            user
        })
    } catch (error) {
        next(error)
    }
}

module.exports={checkUser, onboardUser};