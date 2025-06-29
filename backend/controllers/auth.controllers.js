import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp=async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exitEmail = await User.findOne({email});
        if (exitEmail) {
            return res.status(400).json({ message: "Email already exists1" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters !" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user= await User.create({
            name,
            email,
            password: hashedPassword
        });
        const token =await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            secure: "false",
            sameSite: "strict"
        });
        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({ message: `sign up error ${error}` });
    }
}

export const Login=async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ message: "Email does not exists" });
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({ message: "Incorrect password" });
        }
       
        const token =await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            secure: "false",
            sameSite: "strict"
        });
        return res.status(200).json(user)
        
    } catch (error) {
        return res.status(500).json({ message: `login error ${error}` });
    }
}

export const logOut=async (req, res) => {
    try {
        res.clearCookie("token")
        return res.statu(200).json({message:"log out successfully"})
    } catch (error) {
        return res.status(500).json({messgae:`login error ${error}`})
    }
}