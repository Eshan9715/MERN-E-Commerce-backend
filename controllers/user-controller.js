import User from '../models/User.js'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signup = async (req,res,next)=>{
    const {name, nickname, email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email})
    }catch(err){
        return console.log(err)
    }
    if(existingUser){
        return res.status(400).json({message:"User already exits!"})
    }
    const hashPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        nickname,
        email,
        password: hashPassword,
    });
    try{
       await user.save();
    }catch(err){
        return console.log(err)
    }
    return res.status(201).json({user})

}

export const login = async (req,res,next)=>{
    const {email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email})
    }catch(err){
        return console.log(err)
    }
    if(!existingUser){
        return res.status(404).json({message:"Couldn't find user with this mail!"})
    }
    const isCorrectPassword = bcrypt.compareSync(password, existingUser.password);
    if (!isCorrectPassword){
        return res.status(400).json({message:"Incorrect Password!"})
    }

    const accessToken = jwt.sign(
    {
        id: existingUser._id,
        isAdmin: existingUser.isAdmin,
    },
    process.env.JWT_KEY,
    {expiresIn:"3d"}
    );
    
    return res.status(200).json({message:"Login successful!", user: existingUser, token: accessToken})

}

export const jwtVerify = async (req,res,next)=>{
    const {password} = req.body
    if(password){
        const hashPassword = bcrypt.hashSync(password);
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        }, {new: true})
        res.status(200).json(updatedUser);

    } catch (err){
        res.status(500).json(err);
    }
}

export const deleteUser = async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been deleted");
    } catch(err){
        res.status(500).json(err);

    }
}

export const getUser = async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch(err){
        res.status(500).json(err);

    }
}

export const getAllUsers = async(req,res)=>{
    const query = req.query.new;
    try{
        const users = query
        ? await User.find().sort({_id:-1}).limit(1)
        : await User.find();
        res.status(200).json(users)
    } catch(err){
        res.status(500).json(err);

    }
}

export const getUserStats = async(req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1));

    try{
        const data = await User.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: lastYear
                    }
                },
                $project: {
                    month: {
                        $month: "$createdAt"
                    }
                },
                $group: {
                    _id: "$month",
                    total: {
                        $sum: 1
                    },
                }
            }
        ])
        res.status(200).json(data)

    } catch(err){
        res.status(500).json(err);
    };
}