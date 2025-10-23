import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler( async (req,res) => {

    // get user details from frontend
    const { username , email , password} = req.body

    // validation empty or not
    if (
        [username,email ,password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    
    // check if user already exists: username, email
    const existedUser = await User.findOne({
        $or: [{username},{email}]
    })

    if (existedUser) {
        throw new ApiError(409 ,"User with email or username already exists")
    }


    // create user object - create entry in db
    
    
    const user = await User.create({
        username,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if(!createdUser) {
        throw new ApiError(500 , "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User register Successfully")
    )


})

export {registerUser}