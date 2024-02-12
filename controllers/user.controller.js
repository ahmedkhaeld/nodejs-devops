const User = require("../models/user.model");
const bcrypt = require("bcryptjs")


exports.signUp = async(req,res) =>{
    try{
    const {username, password } = req.body

    const hashPassword = await bcrypt.hash(password, 12)

        const newUser = await User.create({
            username: username,
            password: hashPassword,
        });
        req.session.user=newUser;
        res.status(201).json({
            satatu: "success",
            data:{
                user: newUser,
            }
        })

    }catch(e){
        res.status(400).json({
            status: "fail",
        })

    }
}

exports.login = async (req, res) => {
    try{
        const {username, password } = req.body
        

        const user = await User.findOne({username})
        if (!user){
            return res.status(404).json({
                status: "fail",
                message: "user not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(isPasswordValid){
            // create a session for the logged in user
            sess = req.session
            sess.user = user
           
            res.status(200).json({
                status:"success"
            })
        } else{
            res.status(400).json({
                status:"fail",
                message: "incorrect username or password"
            })
        }


    
        }catch(e){
            res.status(400).json({
                status: "fail",
            })
    
        }

}